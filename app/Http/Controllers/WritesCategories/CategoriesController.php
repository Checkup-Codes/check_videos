<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use App\Services\WritesCategories\CategoryService;
use App\Services\WritesCategories\WriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CategoriesController extends Controller
{
    private $categoryService;
    private $writeService;

    public function __construct(CategoryService $categoryService, WriteService $writeService)
    {
        $this->categoryService = $categoryService;
        $this->writeService = $writeService;
    }

    /**
     * Display a listing of categories
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        $categoriesResult = $this->categoryService->getCategories();
        $writesResult = $this->writeService->getWrites();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Categories/IndexCategory', [
            'categories' => $categoriesResult['data'],
            'screen'     => $this->categoryService->getScreenData('Kategoriler', true),
            'writes'     => $writesResult['data'],
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Display the specified category
     * Sidebar verileri store'dan gelir, sadece kategori ve kategoriye ait yazılar gönderilir
     * 
     * @param string $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $category = Category::with('children')->where('slug', $slug)->firstOrFail();

        // If category is hidden and user is not admin, return 404
        if ($category->status === 'hidden' && !Auth::check()) {
            abort(404);
        }

        $isAdmin = Auth::check();

        // Collect IDs of current category and all its children
        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);

        $writesResult = $this->writeService->getWritesByCategories($categoryIds);

        return inertia('WritesCategories/Categories/ShowCategory', [
            'categories' => [], // Store'dan gelecek
            'category' => $category,
            'writes' => $writesResult['data'], // Bu kategoriye ait yazılar (sidebar için değil, içerik için)
            'screen'     => $this->categoryService->getScreenData($category->name),
            'isAdmin' => $isAdmin
        ]);
    }


    /**
     * Show the form for creating a new category
     * 
     * @return \Inertia\Response
     */
    public function create()
    {
        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Categories/CreateCategory', [
            'categories' => $categoriesResult['data'],
            'screen'     => $this->categoryService->getScreenData('Yeni Kategori', true),
            'isAdmin' => $isAdmin
        ]);
    }


    /**
     * Show the form for editing the specified category
     * 
     * @param Category $category
     * @return \Inertia\Response
     */
    public function edit(Category $category)
    {
        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Categories/EditCategory', [
            'categories' => $categoriesResult['data'],
            'category' => $category->load('parent'),
            'screen'     => $this->categoryService->getScreenData($category->name . ' - Düzenle', true),
            'isAdmin' => $isAdmin
        ]);
    }

    /**
     * Store a newly created category
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:content_categories,slug',
            'parent_id' => 'nullable|string|exists:content_categories,id',
            'description' => 'nullable|string',
            'status' => 'required|in:public,hidden',
        ]);

        $result = $this->categoryService->createCategory($request->all());
        $category = $result['data'];

        return redirect()
            ->route('categories.show', ['category' => $category->slug])
            ->with('success', 'Kategori başarıyla oluşturuldu.');
    }



    /**
     * Update the specified category
     * 
     * @param Request $request
     * @param Category $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:content_categories,slug,' . $category->id,
            'parent_id' => 'nullable|string|exists:content_categories,id|different:id',
            'description' => 'nullable|string',
            'status' => 'required|in:public,hidden',
        ]);

        // Prevent a category from being its own child's parent
        if ($request->filled('parent_id')) {
            $childIds = collect();
            $this->getChildCategoryIds($category, $childIds);

            if ($childIds->contains($request->parent_id)) {
                return back()->withErrors(['parent_id' => 'Bir kategori kendi alt kategorisinin altına yerleştirilemez.']);
            }
        }

        $result = $this->categoryService->updateCategory($category, $request->all());
        $updatedCategory = $result['data'];

        return redirect()
            ->route('categories.show', ['category' => $updatedCategory->slug])
            ->with('success', 'Kategori başarıyla güncellendi.');
    }

    /**
     * Remove the specified category from storage
     * 
     * @param Category $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Category $category)
    {
        $result = $this->categoryService->deleteCategory($category);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Kategori başarıyla silindi.');
    }

    /**
     * Display write by category
     * Two-phase loading: Basic info first (instant), content via AJAX (lazy)
     * 
     * @param string $categorySlug
     * @param string $writeSlug
     * @return \Inertia\Response
     */
    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Category::with('children')->where('slug', $categorySlug)->firstOrFail();
        $isAdmin = Auth::check();

        // Phase 1: Get minimal write data for instant page load
        $writeBasic = $this->writeService->getWriteBasicBySlug($writeSlug);

        return inertia('WritesCategories/Categories/WriteByCategory', [
            'categories' => [], // Will be loaded via sidebar lazy loading
            'category' => $category,
            'writes' => [], // Will be loaded via sidebar lazy loading
            'write' => $writeBasic['data'],
            'screen'     => $this->categoryService->getScreenData($writeBasic['data']->title),
            'isAdmin' => $isAdmin
        ]);
    }

    /**
     * Get writes for a category with pagination (API endpoint)
     * 
     * @param string $categorySlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWrites($categorySlug)
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();
        
        // Collect IDs of current category and all its children
        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);
        
        $page = request()->get('page', 1);
        $perPage = 10;
        
        $writes = Write::whereIn('category_id', $categoryIds)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
        
        return response()->json([
            'writes' => $writes->items(),
            'hasMore' => $writes->hasMorePages(),
            'currentPage' => $writes->currentPage(),
            'lastPage' => $writes->lastPage(),
        ]);
    }

    /**
     * Helper method to collect child category IDs
     * 
     * @param Category $category
     * @param \Illuminate\Support\Collection $categoryIds
     * @return void
     */
    private function getChildCategoryIds($category, &$categoryIds)
    {
        foreach ($category->children as $child) {
            $categoryIds->push($child->id);
            if ($child->children->count() > 0) {
                $this->getChildCategoryIds($child, $categoryIds);
            }
        }
    }
}
