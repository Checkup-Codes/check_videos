<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        $writes = Write::all();
        return inertia('WritesCategories/Categories/IndexCategory', [
            'writes' => $writes,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('WritesCategories/Categories/CreateCategory', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->save();

        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $categories = Category::all();

        $writes = Write::where('category_id', $category->id)->get();

        return inertia('WritesCategories/Categories/ShowCategory', [
            'category' => $category,
            'categories' => $categories,
            'writes' => $writes
        ]);
    }

    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();
        $writes = Write::where('category_id', $category->id)->get();
        $write = Write::where('slug', $writeSlug)->firstOrFail();
        $categories = Category::all();

        return inertia('WritesCategories/Categories/ShowByCategory/ShowWriteByCategory', [
            'category' => $category,
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categories = Category::all();
        // find for slug
        $category = Category::where('slug', $id)->firstOrFail();
        return inertia('WritesCategories/Categories/EditCategory', [
            'categories' => $categories,
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $id,
        ]);

        $category = Category::where('id', $id)->firstOrFail();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->save();

        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index');
    }
}
