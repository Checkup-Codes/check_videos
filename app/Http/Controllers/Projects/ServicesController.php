<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HasScreenData;
use App\Models\Projects\Service;
use App\Models\Projects\Project;
use App\Models\Projects\Customer;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServicesController extends Controller
{
    use HasScreenData;

    public function index()
    {
        $isGuest = !Auth::check();
        $services = Service::with('images')->get();

        $projectQuery = Project::query();
        if (!$isGuest) {
            $projectQuery->with('customer');
        }

        return Inertia::render('Projects/Services/IndexService', [
            'screen' => $this->getScreenData('proj_services', 'Hizmetler', null, true),
            'services' => $services,
            'projects' => $projectQuery->get(),
            'customers' => $isGuest ? [] : Customer::all(),
            'isGuestView' => $isGuest,
        ]);
    }



    public function show($id)
    {
        $isGuest = !Auth::check();
        $service = Service::with(['subCategories.images', 'parentCategory', 'images'])
            ->findOrFail($id);

        $services = Service::with('images')->get();
        $projectQuery = Project::query();
        if (!$isGuest) {
            $projectQuery->with('customer');
        }

        return Inertia::render('Projects/Services/ShowService', [
            'service' => $service,
            'screen' => $this->getScreenData('proj_services', $service->name),
            'services' => $services,
            'projects' => $projectQuery->get(),
            'customers' => $isGuest ? [] : Customer::all(),
            'isGuestView' => $isGuest,
        ]);
    }



    public function create()
    {
        $services = Service::with('images')->get();

        // Load sidebar data
        $projects = Project::with(['customer'])->get();
        $customers = Customer::all();

        return Inertia::render('Projects/Services/CreateService', [
            'screen' => $this->getScreenData('proj_services', 'Yeni Hizmet'),
            'services' => $services,
            'projects' => $projects,
            'customers' => $customers,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:proj_services,slug',
            'description' => 'nullable|string|max:65535',
            'price' => 'nullable|numeric',
            'parent_id' => 'nullable|exists:proj_services,id',
        ]);

        // Auto-generate slug if not provided
        $slug = $request->slug;
        if (!$slug) {
            $slug = \Illuminate\Support\Str::slug($request->name);
            // Ensure uniqueness
            $originalSlug = $slug;
            $counter = 1;
            while (Service::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        $service = Service::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'price' => $request->price,
            'sub_category_id' => $request->parent_id,
        ]);

        return redirect()
            ->route('services.edit', $service->id)
            ->with('success', 'Hizmet oluşturuldu. Görselleri ekleyebilirsiniz.');
    }


    public function edit($id)
    {
        $service = Service::with('images')->findOrFail($id);
        $services = Service::with('images')->get();

        // Load sidebar data
        $projects = Project::with(['customer'])->get();
        $customers = Customer::all();

        return Inertia::render('Projects/Services/EditService', [
            'screen' => $this->getScreenData('proj_services', $service->name . ' - Düzenle'),
            'service' => $service,
            'services' => $services,
            'projects' => $projects,
            'customers' => $customers,
        ]);
    }



    public function update(Request $request, $id)
    {
        try {
            // Validate parent_id separately to handle UUID properly
            $parentId = $request->input('parent_id');
            if ($parentId && $parentId !== 'null' && $parentId !== '' && $parentId !== null) {
                $exists = Service::where('id', $parentId)->exists();
                if (!$exists) {
                    return redirect()->back()->withErrors(['parent_id' => 'Seçilen üst kategori bulunamadı.'])->withInput();
                }
            }

            $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:proj_services,slug,' . $id . ',id',
                'description' => 'nullable|string|max:65535',
                'price' => 'nullable|numeric|min:0',
            ]);

            $service = Service::findOrFail($id);
            
            // Auto-generate slug if not provided
            $slug = $request->input('slug');
            if (empty($slug) || $slug === 'null' || $slug === '') {
                $slug = \Illuminate\Support\Str::slug($request->input('name'));
                // Ensure uniqueness
                $originalSlug = $slug;
                $counter = 1;
                while (Service::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                    $slug = $originalSlug . '-' . $counter;
                    $counter++;
                }
            }

            // Prepare update data
            $updateData = [
                'name' => $request->input('name'),
                'slug' => $slug,
            ];

            // Handle description
            if ($request->has('description')) {
                $updateData['description'] = $request->input('description') ?: null;
            }

            // Handle price
            if ($request->has('price')) {
                $price = $request->input('price');
                if ($price !== null && $price !== '' && $price !== 'null') {
                    $updateData['price'] = (float) $price;
                } else {
                    $updateData['price'] = null;
                }
            }

            // Handle parent_id
            if ($parentId && $parentId !== 'null' && $parentId !== '' && $parentId !== null) {
                $updateData['sub_category_id'] = $parentId;
            } else {
                $updateData['sub_category_id'] = null;
            }

            // Update the service
            $service->fill($updateData);
            $service->save();

            return redirect()->route('services.index')->with('success', 'Hizmet başarıyla güncellendi.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Service update error: ' . $e->getMessage(), [
                'id' => $id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->with('error', 'Hizmet güncellenirken bir hata oluştu: ' . $e->getMessage())->withInput();
        }
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        WriteImage::where('category', WriteImage::CATEGORY_SERVICES)
            ->where('related_id', $service->id)
            ->get()
            ->each(function (WriteImage $image) {
                $path = str_replace('/storage/', 'public/', $image->image_path);
                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
                $image->delete();
            });

        $service->delete();

        return redirect()->route('services.index')->with('success', 'Hizmet başarıyla silindi.');
    }
}
