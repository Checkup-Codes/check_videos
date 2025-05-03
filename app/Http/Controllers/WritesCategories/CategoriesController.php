<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use App\Services\WritesCategories\CategoryService;
use App\Services\WritesCategories\WriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{
    private $categoryService;
    private $writeService;

    private array $screenDefault = [
        'isMobileSidebar' => false,
        'name' => 'categories'
    ];

    public function __construct(CategoryService $categoryService, WriteService $writeService)
    {
        $this->categoryService = $categoryService;
        $this->writeService = $writeService;
    }

    public function index()
    {
        $categories = $this->categoryService->getCategories();
        $writes = $this->writeService->getWrites();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Categories/IndexCategory', [
            'screen'     => [
                'isMobileSidebar' => true,
                'name'            => 'categories'
            ],
            'categories' => $categories,
            'writes'     => $writes,
            'isAdmin'    => $isAdmin
        ]);
    }

    public function show($slug)
    {
        $category = Category::with('children')->where('slug', $slug)->firstOrFail();

        // Eğer kategori gizli ve kullanıcı admin değilse 404 hatası döndür
        if ($category->status === 'hidden' && !Auth::check()) {
            abort(404);
        }

        $categories = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        // Mevcut kategori ve tüm alt kategorilerin ID'lerini toplama
        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);

        $writes = $this->writeService->getWritesByCategories($categoryIds);

        // Artık kategorilerin yazı sayıları CategoryService üzerinden doğru hesaplanıyor
        // Burada tekrar hesaplamaya gerek yok
        // $category->writes_count = $writes->count();

        return inertia('WritesCategories/Categories/ShowCategory', [
            'category' => $category,
            'categories' => $categories,
            'writes' => $writes,
            'screen' => $this->screenDefault,
            'isAdmin' => $isAdmin
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
        $categories = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Categories/CreateCategory', [
            'categories' => $categories,
            'screen' => $this->screenDefault,
            'isAdmin' => $isAdmin
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:content_categories,slug',
            'parent_id' => 'nullable|string|exists:content_categories,id',
            'description' => 'nullable|string',
            'status' => 'required|in:public,hidden',
        ]);

        $category = $this->categoryService->createCategory($request->all());

        return redirect()
            ->route('categories.index')
            ->with('success', 'Kategori başarıyla oluşturuldu.');
    }

    public function edit(Category $category)
    {
        $categories = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Categories/EditCategory', [
            'category' => $category->load('parent'),
            'categories' => $categories,
            'screen'   => $this->screenDefault,
            'isAdmin' => $isAdmin
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:content_categories,slug,' . $category->id,
            'parent_id' => 'nullable|string|exists:content_categories,id|different:id',
            'description' => 'nullable|string',
            'status' => 'required|in:public,hidden',
        ]);

        // Kendisininin alt kategorisi olmasını engelle
        if ($request->filled('parent_id')) {
            $childIds = collect();
            $this->getChildCategoryIds($category, $childIds);

            if ($childIds->contains($request->parent_id)) {
                return back()->withErrors(['parent_id' => 'Bir kategori kendi alt kategorisinin altına yerleştirilemez.']);
            }
        }

        $this->categoryService->updateCategory($category, $request->all());

        return redirect()
            ->route('categories.index')
            ->with('success', 'Kategori başarıyla güncellendi.');
    }

    public function destroy(Category $category)
    {
        $this->categoryService->deleteCategory($category);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Kategori başarıyla silindi.');
    }

    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Category::with('children')->where('slug', $categorySlug)->firstOrFail();
        $categories = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        $writes = $this->writeService->getWritesByCategory($category);
        $write = $this->writeService->getWriteBySlug($writeSlug);

        return inertia('WritesCategories/Categories/WriteByCategory', [
            'category' => $category,
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories,
            'screen' => $this->screenDefault,
            'isAdmin' => $isAdmin
        ]);
    }
}
