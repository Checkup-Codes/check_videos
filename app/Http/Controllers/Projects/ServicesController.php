<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController extends Controller
{
    private $screen;

    public function __construct()
    {
        $this->screen = [
            'isMobileSidebar' => false,
            'name' => 'proj_services'
        ];
    }


    public function index()
    {
        $services = Service::all();

        return Inertia::render('Projects/Services/IndexService', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => false]),
            'services' => $services
        ]);
    }



    public function show($slug)
    {
        $service = Service::where('slug', $slug)
            ->with(['subCategories', 'parentCategory'])
            ->firstOrFail();

        return Inertia::render('Projects/Services/ShowService', [
            'service' => $service,
            'screen' => array_merge($this->screen, ['isMobileSidebar' => false]),
        ]);
    }



    public function create()
    {
        $services = Service::all();

        return Inertia::render('Projects/Services/CreateService', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => false]),
            'services' => $services
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'string|max:255',
            'description' => 'string|max:255',
            'price' => 'nullable|numeric',
            'parent_id' => 'nullable|exists:proj_services,id',
        ]);

        Service::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'price' => $request->price,
            'sub_category_id' => $request->parent_id,
        ]);

        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }


    public function edit($slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();
        $services = Service::all();

        return Inertia::render('Projects/Services/EditService', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => false]),
            'service' => $service,
            'services' => $services
        ]);
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:proj_services,slug,' . $id,
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'parent_id' => 'nullable|exists:proj_services,id',
        ]);

        $service = Service::findOrFail($id);
        $service->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'price' => $request->price,
            'sub_category_id' => $request->parent_id,
        ]);

        return redirect()->route('services.index')->with('success', 'Service updated successfully.');
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
