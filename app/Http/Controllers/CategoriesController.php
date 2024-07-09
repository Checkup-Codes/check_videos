<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Write;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categories::all();

        $writes = Write::all();
        return inertia('Categories/IndexCategory', [
            'writes' => $writes,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categories::all();
        return inertia('Categories/CreateCategory', [
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

        $category = new Categories();
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
        $category = Categories::where('slug', $slug)->firstOrFail();
        $categories = Categories::all();

        $writes = Write::where('category_id', $category->id)->get();

        return inertia('Categories/ShowCategory', [
            'category' => $category,
            'categories' => $categories,
            'writes' => $writes
        ]);
    }

    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Categories::where('slug', $categorySlug)->firstOrFail();
        $writes = Write::where('category_id', $category->id)->get();
        $write = Write::where('slug', $writeSlug)->firstOrFail();
        $categories = Categories::all();

        return inertia('Categories/ShowByCategory/ShowWriteByCategory', [
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
        $categories = Categories::all();
        // find for slug
        $category = Categories::where('slug', $id)->firstOrFail();
        return inertia('Categories/EditCategory', [
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

        $category = Categories::where('id', $id)->firstOrFail();
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
        $category = Categories::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index');
    }
}
