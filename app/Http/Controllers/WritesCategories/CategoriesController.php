<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::with('children')->get();
        });

        $writes = Cache::remember('writes', 60, function () {
            if (Auth::check()) {
                return Write::all();
            }

            return Write::where('status', 'published')->get();
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

    public function show($slug)
    {
        $category = Category::with('children')->where('slug', $slug)->firstOrFail();

        $categories = Cache::remember('categories', 60, function () {
            return Category::with('children')->get();
        });

        // Mevcut kategori ve tüm alt kategorilerin ID'lerini toplama
        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);

        $writes = Write::whereIn('category_id', $categoryIds)
            ->when(!Auth::check(), function ($query) {
                $query->where('status', 'published');
            })
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

    // Alt kategorilerin ID'lerini toplayan yardımcı metod
    private function getChildCategoryIds($category, &$categoryIds)
    {
        foreach ($category->children as $child) {
            $categoryIds->push($child->id);
            if ($child->children->count() > 0) {
                $this->getChildCategoryIds($child, $categoryIds);
            }
        }
    }

    public function create()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::with('children')->get();
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->parent_id = $request->parent_id;
        $category->save();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('categories.index')->with('success', 'Yeni bir kategori eklendi!');
    }

    public function edit($id)
    {
        $categories = Category::with('children')->get();

        $category = Category::where('id', $id)->with('parent')->firstOrFail(); // Üst kategori bilgisiyle al

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


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $id,
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->parent_id = $request->parent_id;
        $category->save();

        Cache::forget('categories');

        return redirect()->route('categories.index')->with('success', 'Kategori başarı ile güncellendi!');
    }


    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('categories.index')->with('success', 'Kategori silindi!');
    }

    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Category::with('children')->where('slug', $categorySlug)->firstOrFail();

        $categories = Cache::remember('categories', 60, function () {
            return Category::with('children')->get();
        });

        $writes = Write::where('category_id', $category->id)
            ->when(!Auth::check(), function ($query) {
                $query->where('status', 'published');
            })
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
}
