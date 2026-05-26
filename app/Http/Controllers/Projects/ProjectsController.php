<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HasScreenData;
use App\Models\Projects\Project;
use App\Models\Projects\Service;
use App\Models\Projects\Customer;
use App\Models\Projects\Project_Service;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectsController extends Controller
{
    use HasScreenData;

    public function index()
    {
        $isGuest = !Auth::check();

        $projectQuery = Project::with(['services', 'images']);
        if (!$isGuest) {
            $projectQuery->with('customer');
        }
        $projects = $projectQuery->get();

        $services = Service::with('images')->get();

        return Inertia::render('Projects/Project/IndexProject', [
            'screen' => $this->getScreenData('projects', 'Projeler', null, true),
            'projects' => $projects,
            'services' => $services,
            'customers' => $isGuest ? [] : Customer::all(),
            'isGuestView' => $isGuest,
        ]);
    }

    public function create()
    {
        $services = Service::with('images')->get();
        $customers = Customer::all();
        $categories = Category::where('status', '!=', 'hidden')->get();

        // Load sidebar data
        $projects = Project::with(['customer'])->get();

        return Inertia::render('Projects/Project/CreateProject', [
            'screen' => $this->getScreenData('projects', 'Yeni Proje'),
            'services' => $services,
            'customers' => $customers,
            'categories' => $categories,
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_name' => 'required|string|max:255',
            'customer_id' => 'required|exists:proj_customers,id',
            'category_id' => 'nullable|exists:content_categories,id',
            'services' => 'required|array',
            'services.*.id' => 'required|exists:proj_services,id',
            'services.*.price' => 'nullable|numeric|min:0',
            'services.*.status' => 'nullable|in:pending,active,completed,cancelled',
            'services.*.payment_status' => 'nullable|in:unpaid,partial,paid',
            'services.*.notes' => 'nullable|string',
            'services.*.guest_description' => 'nullable|string',
            'services.*.service_start_date' => 'nullable|date',
            'services.*.service_end_date' => 'nullable|date',
        ]);

        $project = Project::create([
            'id' => (string) Str::uuid(),
            'project_name' => $request->project_name,
            'customer_id' => $request->customer_id,
            'category_id' => $request->category_id,
        ]);

        // Sync services with pivot data
        $servicesData = [];
        foreach ($request->services as $serviceData) {
            $servicesData[$serviceData['id']] = [
                'price' => $serviceData['price'] ?? null,
                'status' => $serviceData['status'] ?? 'pending',
                'payment_status' => $serviceData['payment_status'] ?? 'unpaid',
                'notes' => $serviceData['notes'] ?? null,
                'guest_description' => $serviceData['guest_description'] ?? null,
                'service_start_date' => $serviceData['service_start_date'] ?? null,
                'service_end_date' => $serviceData['service_end_date'] ?? null,
            ];
        }

        $project->services()->sync($servicesData);

        return redirect()
            ->route('projects.edit', $project->id)
            ->with('success', 'Proje oluşturuldu. Görselleri ekleyebilirsiniz.');
    }

    public function show($id)
    {
        $isGuest = !Auth::check();

        $relations = ['services', 'category', 'images'];
        if (!$isGuest) {
            $relations[] = 'customer';
            $relations[] = 'payments.service';
        }

        $project = Project::with($relations)->findOrFail($id);

        if ($isGuest) {
            $project->load(['services' => function ($query) {
                $query->withPivot(['guest_description']);
            }]);
        } else {
            $project->load(['services' => function ($query) use ($id) {
                $query->withPivot([
                    'price',
                    'status',
                    'payment_status',
                    'notes',
                    'guest_description',
                    'service_start_date',
                    'service_end_date',
                ]);
            }]);

            foreach ($project->services as $service) {
                $service->load(['todos' => function ($query) use ($id) {
                    $query->where('project_id', $id)->orderBy('created_at', 'desc');
                }]);
            }
        }

        $services = Service::with('images')->get();
        $projectSidebarQuery = Project::query();
        if (!$isGuest) {
            $projectSidebarQuery->with('customer');
        }
        $projects = $projectSidebarQuery->get();

        return Inertia::render('Projects/Project/ShowProject', [
            'screen' => $this->getScreenData('projects', $project->project_name),
            'isGuestView' => $isGuest,
            'project' => $project,
            'services' => $services,
            'projects' => $projects,
            'customers' => $isGuest ? [] : Customer::all(),
        ]);
    }

    public function edit($id)
    {
        $project = Project::with(['services' => function ($query) {
            $query->withPivot([
                'price',
                'status',
                'payment_status',
                'notes',
                'guest_description',
                'service_start_date',
                'service_end_date',
            ]);
        }, 'services.todos' => function ($query) use ($id) {
            $query->where('project_id', $id)->orderBy('created_at', 'desc');
        }, 'images'])->findOrFail($id);
        $services = Service::with('images')->get();
        $customers = Customer::all();
        $categories = Category::where('status', '!=', 'hidden')->get();

        // Load sidebar data
        $projects = Project::with(['customer'])->get();

        return Inertia::render('Projects/Project/EditProject', [
            'screen' => $this->getScreenData('projects', $project->project_name . ' - Düzenle'),
            'project' => $project,
            'services' => $services,
            'customers' => $customers,
            'categories' => $categories,
            'projects' => $projects,
        ]);
    }

    public function update(Request $request, $projectId)
    {
        $request->validate([
            'project_name' => 'required|string|max:255',
            'customer_id' => 'required|exists:proj_customers,id',
            'category_id' => 'nullable|exists:content_categories,id',
            'services' => 'required|array',
            'services.*.id' => 'required|exists:proj_services,id',
            'services.*.price' => 'nullable|numeric|min:0',
            'services.*.status' => 'nullable|in:pending,active,completed,cancelled',
            'services.*.payment_status' => 'nullable|in:unpaid,partial,paid',
            'services.*.notes' => 'nullable|string',
            'services.*.guest_description' => 'nullable|string',
            'services.*.service_start_date' => 'nullable|date',
            'services.*.service_end_date' => 'nullable|date',
        ]);

        $project = Project::findOrFail($projectId);
        $project->update([
            'project_name' => $request->project_name,
            'customer_id' => $request->customer_id,
            'category_id' => $request->category_id,
        ]);

        // Sync services with pivot data
        $servicesData = [];
        foreach ($request->services as $serviceData) {
            $servicesData[$serviceData['id']] = [
                'price' => $serviceData['price'] ?? null,
                'status' => $serviceData['status'] ?? 'pending',
                'payment_status' => $serviceData['payment_status'] ?? 'unpaid',
                'notes' => $serviceData['notes'] ?? null,
                'guest_description' => $serviceData['guest_description'] ?? null,
                'service_start_date' => $serviceData['service_start_date'] ?? null,
                'service_end_date' => $serviceData['service_end_date'] ?? null,
            ];
        }

        $project->services()->sync($servicesData);

        return redirect()->route('projects.show', $projectId)->with('success', 'Project and services updated successfully.');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        WriteImage::where('category', WriteImage::CATEGORY_PROJECTS)
            ->where('related_id', $project->id)
            ->get()
            ->each(function (WriteImage $image) {
                $path = str_replace('/storage/', 'public/', $image->image_path);
                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
                $image->delete();
            });

        $project->services()->detach();
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
