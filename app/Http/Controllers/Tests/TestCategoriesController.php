<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Tests\TestCategory;
use App\Models\Tests\Test;
use App\Services\Tests\TestCategoryService;
use App\Services\Tests\TestService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TestCategoriesController extends Controller
{
    private $categoryService;
    private $testService;

    public function __construct(TestCategoryService $categoryService, TestService $testService)
    {
        $this->categoryService = $categoryService;
        $this->testService = $testService;
    }

    public function index()
    {
        $categoriesResult = $this->categoryService->getCategories();
        $testsResult = $this->testService->getTests();
        $isAdmin = Auth::check();

        return inertia('TestCategories/Categories/IndexCategory', [
            'categories' => $categoriesResult['data'],
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'tests'     => $testsResult['data'],
            'isAdmin'    => $isAdmin
        ]);
    }

    public function show($slug)
    {
        $category = TestCategory::where('slug', $slug)->firstOrFail();

        if ($category->status === 'hidden' && !Auth::check()) {
            abort(404);
        }

        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        $categoryIds = collect([$category->id]);
        $this->getChildCategoryIds($category, $categoryIds);

        $testsResult = $this->testService->getTestsByCategory($category);

        return inertia('TestCategories/Categories/ShowCategory', [
            'categories' => $categoriesResult['data'],
            'category' => $category,
            'tests' => $testsResult['data'],
            'screen'     => $this->categoryService->getScreenData(isMobile: false),
            'isAdmin' => $isAdmin
        ]);
    }

    public function create()
    {
        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        return inertia('TestCategories/Categories/CreateCategory', [
            'categories' => $categoriesResult['data'],
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'isAdmin' => $isAdmin
        ]);
    }

    public function edit(TestCategory $category)
    {
        $categoriesResult = $this->categoryService->getCategories();
        $isAdmin = Auth::check();

        // Load parent relationship and ensure all attributes are included
        $category->load('parent');

        return inertia('TestCategories/Categories/EditCategory', [
            'categories' => $categoriesResult['data'],
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'parent_id' => $category->parent_id,
                'status' => $category->status,
                'description' => $category->description,
                'parent' => $category->parent ? [
                    'id' => $category->parent->id,
                    'name' => $category->parent->name,
                    'slug' => $category->parent->slug,
                ] : null,
            ],
            'screen'     => $this->categoryService->getScreenData(isMobile: true),
            'isAdmin' => $isAdmin
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:test_categories,slug',
            'parent_id' => 'nullable|exists:test_categories,id',
            'status' => 'required|in:public,private,hidden',
            'description' => 'nullable|string',
        ]);

        $data = $request->all();
        // Convert empty string to null for parent_id
        if (isset($data['parent_id']) && $data['parent_id'] === '') {
            $data['parent_id'] = null;
        }

        $result = $this->categoryService->createCategory($data);
        $category = $result['data'];

        return redirect()
            ->route('test-categories.show', ['test_category' => $category->slug])
            ->with('success', 'Kategori başarıyla oluşturuldu.');
    }

    public function update(Request $request, TestCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:test_categories,slug,' . $category->id,
            'parent_id' => 'nullable|exists:test_categories,id',
            'status' => 'required|in:public,private,hidden',
            'description' => 'nullable|string',
        ]);

        // Convert empty string to null for parent_id
        if (isset($validated['parent_id']) && $validated['parent_id'] === '') {
            $validated['parent_id'] = null;
        }

        try {
            $result = $this->categoryService->updateCategory($category, $validated);

            return redirect()
                ->route('test-categories.show', ['test_category' => $category->slug])
                ->with('success', 'Kategori başarıyla güncellendi.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Güncelleme sırasında bir hata oluştu.']);
        }
    }

    public function destroy(TestCategory $category)
    {
        $result = $this->categoryService->deleteCategory($category);

        return redirect()
            ->route('test-categories.index')
            ->with('success', 'Kategori başarıyla silindi.');
    }

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

