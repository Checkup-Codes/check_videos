<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWriteRequest;
use App\Http\Requests\UpdateWriteRequest;
use Illuminate\Http\Request;
use App\Models\Write;
use Illuminate\Support\Facades\Auth;

class WritesController extends Controller
{
    public function index()
    {
        $writes = Write::all();
        return inertia('Writes/IndexWrite', [
            'writes' => $writes,
        ]);
    }

    public function indexApi()
    {
        $writes = Write::all();

        return response()->json([
            'writes' => $writes,
        ]);
    }

    public function create()
    {
        $writes = Write::all();
        return inertia('Writes/CreateWrite', [
            'writes' => $writes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug',
            'content' => 'required',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
        ]);

        Write::create(array_merge(
            $request->all(),
            ['author_id' => Auth::id()]
        ));

        return redirect()->route('writes.index')->with('success', 'Write created successfully.');
    }

    public function show($slug)
    {
        $writes = Write::all();
        $write = Write::where('slug', $slug)->firstOrFail();
        return inertia('Writes/ShowWrite', [
            'writes' => $writes,
            'write' => $write,
        ]);
    }

    public function edit($id)
    {
        $writes = Write::all();
        $write = Write::findOrFail($id);
        return inertia('Writes/EditWrite', ['write' => $write, 'writes' => $writes]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug,' . $id,
            'content' => 'required',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $write = Write::findOrFail($id);
        $write->update($request->all());

        return redirect()->route('writes.index')->with('success', 'Write updated successfully.');
    }

    public function destroy($id)
    {
        $write = Write::findOrFail($id);
        $write->delete();

        return redirect()->route('writes.index')->with('success', 'Write deleted successfully.');
    }
}
