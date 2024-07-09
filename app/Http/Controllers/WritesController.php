<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWriteRequest;
use App\Http\Requests\UpdateWriteRequest;
use Illuminate\Http\Request;
use App\Models\Write;
use Illuminate\Support\Facades\Auth;
use App\Models\Categories;

class WritesController extends Controller
{
    public function index()
    {

        $categories = Categories::all();

        $writes = Write::all();
        return inertia('Writes/IndexWrite', [
            'writes' => $writes,
            'categories' => $categories
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
        $categories = Categories::all();

        return inertia('Writes/CreateWrite', [
            'writes' => $writes,
            'categories' => $categories
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
            'category_id' => 'required|exists:categories,id' // Ensure category_id exists in categories table
        ]);

        $write = new Write();
        $write->title = $request->title;
        $write->slug = $request->slug;
        $write->content = $request->content;
        $write->published_at = $request->published_at;
        $write->summary = $request->summary;
        $write->status = $request->status;
        $write->cover_image = $request->cover_image;
        $write->category_id = $request->category_id;
        $write->author_id = Auth::id();
        $write->save();

        return redirect()->route('writes.index')->with('success', 'Write created successfully.');
    }


    public function show($slug)
    {
        $writes = Write::all();
        $write = Write::where('slug', $slug)->firstOrFail();
        $categories = Categories::all();

        return inertia('Writes/ShowWrite', [
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories
        ]);
    }


    public function edit($id)
    {
        $writes = Write::all();
        $write = Write::findOrFail($id);
        $categories = Categories::all();

        return inertia('Writes/EditWrite', ['write' => $write, 'writes' => $writes, 'categories' => $categories]);
    }

    public function update(Request $request, Write $write)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug,' . $write->id,
            'content' => 'required',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $write->title = $request->title;
        $write->slug = $request->slug;
        $write->content = $request->content;
        $write->published_at = $request->published_at;
        $write->summary = $request->summary;
        $write->status = $request->status;
        $write->cover_image = $request->cover_image;
        $write->category_id = $request->category_id;

        $write->save();

        return redirect()->route('writes.index')->with('success', 'Write updated successfully.');
    }


    public function destroy($id)
    {
        $write = Write::findOrFail($id);
        $write->delete();

        return redirect()->route('writes.index')->with('success', 'Write deleted successfully.');
    }
}
