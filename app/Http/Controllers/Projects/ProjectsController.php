<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\Project;
use App\Models\Projects\Service;
use App\Models\Projects\Customer;
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
        return Inertia::render('Projects/Project/IndexProject', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => true]),
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        $services = Service::all();
        $customers = Customer::all();

        return Inertia::render('Projects/Project/CreateProject', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => false]),
            'services' => $services,
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_name' => 'required|string|max:255',
            'customer_id' => 'required|exists:customers,id',
            'services' => 'required|array',
            'services.*' => 'exists:services,id',
        ]);

        $project = Project::create([
            'id' => (string) Str::uuid(),
            'project_name' => $request->project_name,
            'customer_id' => $request->customer_id,
        ]);

        $project->services()->sync($request->services);

        return redirect()->route(route: 'projects.index')->with('success', 'Project and services created successfully.');
    }

    public function show($id)
    {
        $project = Project::with(['services', 'customer'])->findOrFail($id);

        return Inertia::render('Projects/Project/ShowProject', [
            'screen' => $this->screen,
            'project' => $project
        ]);
    }

    public function edit($id)
    {
        $project = Project::with('services')->findOrFail($id);
        $services = Service::all();
        $customers = Customer::all();

        return Inertia::render('Projects/Project/EditProject', [
            'screen' => $this->screen,
            'project' => $project,
            'services' => $services,
            'customers' => $customers,
        ]);
    }

    public function update(Request $request, $projectId)
    {
        $request->validate([
            'project_name' => 'required|string|max:255',
            'customer_id' => 'required|exists:customers,id',
            'services' => 'required|array',
            'services.*' => 'exists:services,id',
        ]);

        $project = Project::findOrFail($projectId);
        $project->update([
            'project_name' => $request->project_name,
            'customer_id' => $request->customer_id,
        ]);


        $project->services()->sync($request->services);

        return redirect()->route('projects.index')->with('success', 'Project and services updated successfully.');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->services()->detach();
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
