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

        Log::info('Categories listed', [
            'execution_time' => $categoriesResult['execution_time']['value'],
            'is_slow' => $categoriesResult['execution_time']['is_slow'],
            'count' => $categoriesResult['count']
        ]);

        return inertia('WritesCategories/Categories/IndexCategory', [
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'categories' => $categoriesResult['data'],
            'writes'     => $writesResult['data'],
            'isAdmin'    => $isAdmin,
            'performance' => [
                'categories_execution_time' => $categoriesResult['execution_time'],
                'writes_execution_time' => $writesResult['execution_time']
            ]
        ]);
    }

    /**
     * Display the specified category
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

        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        // Collect IDs of current category and all its children
        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);

        $writesResult = $this->writeService->getWritesByCategories($categoryIds);

        Log::info('Category viewed', [
            'slug' => $slug,
            'writes_count' => $writesResult['count'],
            'execution_time' => $writesResult['execution_time']['value'],
            'is_slow' => $writesResult['execution_time']['is_slow']
        ]);

        return inertia('WritesCategories/Categories/ShowCategory', [
            'category' => $category,
            'categories' => $categoriesResult['data'],
            'writes' => $writesResult['data'],
            'screen'     => $this->categoryService->getScreenData(isMobile: false),
            'isAdmin' => $isAdmin,
            'performance' => [
                'categories_execution_time' => $categoriesResult['execution_time'],
                'writes_execution_time' => $writesResult['execution_time']
            ]
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
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'isAdmin' => $isAdmin,
            'performance' => [
                'categories_execution_time' => $categoriesResult['execution_time']
            ]
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
            'category' => $category->load('parent'),
            'categories' => $categoriesResult['data'],
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'isAdmin' => $isAdmin,
            'performance' => [
                'categories_execution_time' => $categoriesResult['execution_time']
            ]
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

        Log::info('Category created', [
            'id' => $result['data']->id,
            'execution_time' => $result['execution_time']['value'],
            'is_slow' => $result['execution_time']['is_slow']
        ]);

        return redirect()
            ->route('categories.index')
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

        Log::info('Category updated', [
            'id' => $category->id,
            'execution_time' => $result['execution_time']['value'],
            'is_slow' => $result['execution_time']['is_slow']
        ]);

        return redirect()
            ->route('categories.index')
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

        Log::info('Category deleted', [
            'id' => $category->id,
            'execution_time' => $result['execution_time']['value'],
            'is_slow' => $result['execution_time']['is_slow']
        ]);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Kategori başarıyla silindi.');
    }

    /**
     * Display write by category
     * 
     * @param string $categorySlug
     * @param string $writeSlug
     * @return \Inertia\Response
     */
    public function showByCategory($categorySlug, $writeSlug)
    {
        $category = Category::with('children')->where('slug', $categorySlug)->firstOrFail();
        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        $writesResult = $this->writeService->getWritesByCategory($category);
        $writeResult = $this->writeService->getWriteBySlug($writeSlug);

        Log::info('Write by category viewed', [
            'category_slug' => $categorySlug,
            'write_slug' => $writeSlug,
            'writes_execution_time' => $writesResult['execution_time']['value'],
            'writes_is_slow' => $writesResult['execution_time']['is_slow'],
            'write_execution_time' => $writeResult['execution_time']['value'],
            'write_is_slow' => $writeResult['execution_time']['is_slow']
        ]);

        return inertia('WritesCategories/Categories/WriteByCategory', [
            'category' => $category,
            'writes' => $writesResult['data'],
            'write' => $writeResult['data'],
            'categories' => $categoriesResult['data'],
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'isAdmin' => $isAdmin,
            'performance' => [
                'categories_execution_time' => $categoriesResult['execution_time'],
                'writes_execution_time' => $writesResult['execution_time'],
                'write_execution_time' => $writeResult['execution_time']
            ]
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
