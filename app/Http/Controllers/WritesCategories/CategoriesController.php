<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::all();
        });

        $screen = [
            'isMobileSidebar' => true,
            'name' => 'categories'
        ];

        return inertia('WritesCategories/Categories/IndexCategory', [
            'writes' => $writes,
            'categories' => $categories,
            'screen' => $screen
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $screen = [
            'isMobileSidebar' => false,
            'name' => 'categories'
        ];

        return inertia('WritesCategories/Categories/CreateCategory', [
            'categories' => $categories,
            'screen' => $screen
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

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Write::where('category_id', $category->id)
            ->select('id', 'title', 'slug', 'author_id', 'category_id', 'published_at', 'status', 'views_count', 'seo_keywords', 'tags', 'meta_description', 'cover_image', 'created_at', 'updated_at')
            ->get()
            ->map(function ($write) {
                return Cache::remember("write_{$write->id}", 60, function () use ($write) {
                    return $write;
                });
            });

        $screen = [
            'isMobileSidebar' => false,
            'name' => 'categories'
        ];

        return inertia('WritesCategories/Categories/ShowCategory', [
            'category' => $category,
            'categories' => $categories,
            'writes' => $writes,
            'screen' => $screen
        ]);
    }


    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Write::where('category_id', $category->id)
            ->select('id', 'title', 'slug', 'author_id', 'category_id', 'published_at', 'summary', 'status', 'views_count', 'seo_keywords', 'tags', 'meta_description', 'cover_image', 'created_at', 'updated_at')
            ->get()
            ->map(function ($write) {
                return Cache::remember("write_{$write->id}", 60, function () use ($write) {
                    return $write;
                });
            });

        $write = Write::where('slug', $writeSlug)->firstOrFail();

        $screen = [
            'isMobileSidebar' => false,
            'name' => 'categories'
        ];

        return inertia('WritesCategories/Categories/WriteByCategory', [
            'category' => $category,
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories,
            'screen' => $screen
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $category = Category::where('slug', $id)->firstOrFail();

        $screen = [
            'isMobileSidebar' => false,
            'name' => 'categories'
        ];

        return inertia('WritesCategories/Categories/EditCategory', [
            'categories' => $categories,
            'category' => $category,
            'screen' => $screen
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

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('categories.index');
    }
}
