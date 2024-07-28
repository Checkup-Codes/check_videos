<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\Category;

class WritesController extends Controller
{
    public function index()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::select('views_count', 'title', 'created_at', 'slug')->get();
        });

        $screen = [
            'isMobileSidebar' => true,
            'name' => 'writes'
        ];

        return inertia('WritesCategories/Writes/IndexWrite', [
            'writes' => $writes,
            'categories' => $categories,
            'screen' => $screen
        ]);
    }

    public function create()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::all();
        });

        $screen = [
            'isMobileSidebar' => false,
            'name' => 'writes'
        ];

        return inertia('WritesCategories/Writes/CreateWrite', [
            'writes' => $writes,
            'categories' => $categories,
            'screen' => $screen
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
            'category_id' => 'required|exists:categories,id'
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

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('writes.index')->with('success', 'Write created successfully.');
    }

    public function show($slug)
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::select('views_count', 'title', 'created_at', 'slug')->get();
        });

        $write = Write::where('slug', $slug)->firstOrFail();
        $screen = [
            'isMobileSidebar' => false,
            'name' => 'writes'
        ];

        $write->increment('views_count');

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories,
            'screen' => $screen
        ]);
    }


    public function edit($id)
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::all();
        });

        $write = Write::findOrFail($id);
        $screen = [
            'isMobileSidebar' => false,
            'name' => 'writes'
        ];

        return inertia('WritesCategories/Writes/EditWrite', [
            'write' => $write,
            'writes' => $writes,
            'categories' => $categories,
            'screen' => $screen
        ]);
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

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('writes.index')->with('success', 'Write updated successfully.');
    }

    public function destroy($id)
    {
        $write = Write::findOrFail($id);
        $write->delete();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('writes.index')->with('success', 'Write deleted successfully.');
    }
}
