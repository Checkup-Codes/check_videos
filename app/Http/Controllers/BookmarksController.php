<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;
use App\Models\BookmarkCategory;

class BookmarksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookmarkCategories = BookmarkCategory::all();

        return inertia(
            'Bookmarks/IndexBookmarks',
            [
                'bookmarkCategories' => $bookmarkCategories,
            ]

        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Bookmarks/CreateBookmarks');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:content_writes,slug',
            'content' => 'required',
            'author_id' => 'required|exists:users,id',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
        ]);

        Bookmark::create($request->all());

        return redirect()->route('writes.index')->with('success', 'Bookmark created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $bookmarkCategories = BookmarkCategory::all();
        $category = BookmarkCategory::where('slug', $slug)->firstOrFail();
        $bookmarks = $category->bookmarks;
        return inertia('Bookmarks/ShowBookmarks', [
            'bookmarkCategories' => $bookmarkCategories,
            'category' => $category,
            'bookmarks' => $bookmarks,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $write = Bookmark::findOrFail($id);
        return inertia('Bookmarks/EditBookmarks', ['write' => $write]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:content_writes,slug,' . $id,
            'content' => 'required',
            'author_id' => 'required|exists:users,id',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $write = Bookmark::findOrFail($id);
        $write->update($request->all());

        return redirect()->route('writes.index')->with('success', 'Bookmark created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $write = Bookmark::findOrFail($id);
        $write->delete();

        return redirect()->route('writes.index')->with('success', 'Bookmark deleted successfully.');
    }
}
