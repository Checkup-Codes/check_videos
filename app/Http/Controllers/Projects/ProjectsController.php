<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\Project;
use App\Models\Projects\Service;
use App\Models\Projects\Customer;
use App\Models\Projects\Project_Service;
use App\Models\WritesCategories\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectsController extends Controller
{
    private $screen;

    public function __construct()
    {
        $this->screen = [
            'isMobileSidebar' => false,
            'name' => 'projects'
        ];
    }

    public function index()
    {
        $projects = Project::with(['services', 'customer'])->get();
        $services = Service::all();
        $customers = Customer::all();
        
        return Inertia::render('Projects/Project/IndexProject', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => true]),
            'projects' => $projects,
            'services' => $services,
            'customers' => $customers,
        ]);
    }

    public function create()
    {
        $services = Service::all();
        $customers = Customer::all();
        $categories = Category::where('status', '!=', 'hidden')->get();

        // Load sidebar data
        $projects = Project::with(['customer'])->get();

        return Inertia::render('Projects/Project/CreateProject', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => false]),
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
                'service_start_date' => $serviceData['service_start_date'] ?? null,
                'service_end_date' => $serviceData['service_end_date'] ?? null,
            ];
        }

        $project->services()->sync($servicesData);

        return redirect()->route('projects.index')->with('success', 'Project and services created successfully.');
    }

    public function show($id)
    {
        $project = Project::with(['services', 'customer', 'category', 'payments.service'])->findOrFail($id);
        
        // Load project_services pivot data with all fields and todos
        $project->load(['services' => function ($query) use ($id) {
            $query->withPivot([
                'price',
                'status',
                'payment_status',
                'notes',
                'service_start_date',
                'service_end_date',
            ]);
        }]);
        
        // Load todos for each service in this project
        foreach ($project->services as $service) {
            $service->load(['todos' => function ($query) use ($id) {
                $query->where('project_id', $id)->orderBy('created_at', 'desc');
            }]);
        }

        // Load sidebar data
        $services = Service::all();
        $projects = Project::with(['customer'])->get();
        $customers = Customer::all();

        return Inertia::render('Projects/Project/ShowProject', [
            'screen' => $this->screen,
            'project' => $project,
            'services' => $services,
            'projects' => $projects,
            'customers' => $customers,
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
                'service_start_date',
                'service_end_date',
            ]);
        }, 'services.todos' => function ($query) use ($id) {
            $query->where('project_id', $id)->orderBy('created_at', 'desc');
        }])->findOrFail($id);
        $services = Service::all();
        $customers = Customer::all();
        $categories = Category::where('status', '!=', 'hidden')->get();

        // Load sidebar data
        $projects = Project::with(['customer'])->get();

        return Inertia::render('Projects/Project/EditProject', [
            'screen' => $this->screen,
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
        $project->services()->detach();
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
