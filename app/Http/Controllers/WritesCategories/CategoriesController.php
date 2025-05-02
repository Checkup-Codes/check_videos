<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use App\Services\WritesCategories\CategoryService;
use App\Services\WritesCategories\WriteService;
use Illuminate\Http\Request;

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


        return inertia('WritesCategories/Categories/IndexCategory', [
            'screen'     => [
                'isMobileSidebar' => true,
                'name'            => 'categories'
            ],
            'categories' => $categories,
            'writes'     => $writes,
        ]);
    }

    public function show($slug)
    {
        $category = Category::with('children')->where('slug', $slug)->firstOrFail();
        $categories = $this->categoryService->getCategories();

        // Mevcut kategori ve tüm alt kategorilerin ID'lerini toplama
        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);

        $writes = $this->writeService->getWritesByCategories($categoryIds);

        // Kategori için yazı sayısını hesapla
        $category->writes_count = $writes->count();

        return inertia('WritesCategories/Categories/ShowCategory', [
            'category' => $category,
            'categories' => $categories,
            'writes' => $writes,
            'screen' => $this->screenDefault
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

        return inertia('WritesCategories/Categories/CreateCategory', [
            'categories' => $categories,
            'screen' => $this->screenDefault
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'parent_id' => 'nullable|string|exists:categories,id',
            'description' => 'nullable|string',
        ]);

        $category = $this->categoryService->createCategory($request->all());

        return redirect()
            ->route('categories.index')
            ->with('success', 'Kategori başarıyla oluşturuldu.');
    }

    public function edit(Category $category)
    {
        $categories = $this->categoryService->getCategories();

        return inertia('WritesCategories/Categories/EditCategory', [
            'category' => $category->load('parent'),
            'categories' => $categories,
            'screen'   => $this->screenDefault
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
            'parent_id' => 'nullable|string|exists:categories,id|different:id',
            'description' => 'nullable|string',
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

        $writes = $this->writeService->getWritesByCategory($category);
        $write = $this->writeService->getWriteBySlug($writeSlug);

        return inertia('WritesCategories/Categories/WriteByCategory', [
            'category' => $category,
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories,
            'screen' => $this->screenDefault
        ]);
    }
}
