<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectServiceTodo;
use Illuminate\Http\Request;

class ProjectServiceTodoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:proj_projects,id',
            'service_id' => 'required|exists:proj_services,id',
            'title' => 'required|string|max:255',
        ]);

        $todo = ProjectServiceTodo::create([
            'project_id' => $request->project_id,
            'service_id' => $request->service_id,
            'title' => $request->title,
            'is_completed' => false,
        ]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $todo = ProjectServiceTodo::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'is_completed' => 'sometimes|required|boolean',
        ]);

        $data = $request->only(['title', 'is_completed']);

        // If marking as completed, set completed_at
        if (isset($data['is_completed']) && $data['is_completed'] && !$todo->is_completed) {
            $data['completed_at'] = now();
        } elseif (isset($data['is_completed']) && !$data['is_completed'] && $todo->is_completed) {
            $data['completed_at'] = null;
        }

        $todo->update($data);

        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = ProjectServiceTodo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully'], 200);
    }
}
