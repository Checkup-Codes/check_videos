<?php

namespace App\Services\Tests;

use App\Models\Tests\TestCategory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Seo;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Support\Facades\Cache;

class TestCategoryService
{
    private const SLOW_OPERATION_THRESHOLD = 0.5;

    private function isSlowOperation($executionTime)
    {
        return $executionTime > self::SLOW_OPERATION_THRESHOLD;
    }

    private function formatExecutionTime($executionTime)
    {
        return [
            'value' => round($executionTime, 4) . ' seconds',
            'is_slow' => $this->isSlowOperation($executionTime)
        ];
    }

    public function getCategories()
    {
        $isAdmin = Auth::check();
        if (!$isAdmin) {
            return Cache::remember('public_test_categories_list', 60 * 60, function () {
                $categories = $this->fetchCategoriesFromDatabase(false);
                return [
                    'data' => $categories,
                    'count' => $categories->count()
                ];
            });
        }
        $categories = $this->fetchCategoriesFromDatabase(true);
        return [
            'data' => $categories,
            'count' => $categories->count()
        ];
    }

    private function fetchCategoriesFromDatabase($isAdmin)
    {
        $categories = TestCategory::with(['children' => function ($query) use ($isAdmin) {
            if (!$isAdmin) {
                $query->where('status', 'public');
            }
        }])
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'public');
            })
            ->get();

        $this->setChildrenHiddenStatus($categories);

        foreach ($categories as $category) {
            $category->tests_count = $category->tests()
                ->when(!$isAdmin, function ($query) {
                    $query->where('status', 'published');
                })
                ->count();

            if ($category->children->count() > 0) {
                $this->calculateChildCategoriesTestsCount($category, $isAdmin);
            }
        }

        return $categories;
    }

    private function setChildrenHiddenStatus($categories)
    {
        foreach ($categories as $category) {
            if ($category->status === 'hidden' && $category->children->count() > 0) {
                foreach ($category->children as $child) {
                    $child->parent_hidden = true;
                    if ($child->children->count() > 0) {
                        $this->setChildrenHiddenStatus($child->children);
                    }
                }
            }
        }
    }

    private function calculateChildCategoriesTestsCount($category, $isAdmin = false)
    {
        foreach ($category->children as $child) {
            $child->tests_count = $child->tests()
                ->when(!$isAdmin, function ($query) {
                    $query->where('status', 'published');
                })
                ->count();

            if ($child->children->count() > 0) {
                $this->calculateChildCategoriesTestsCount($child, $isAdmin);
            }
        }
    }

    public function createCategory(array $data)
    {
        $startTime = microtime(true);
        DB::beginTransaction();
        try {
            $category = TestCategory::create($data);
            DB::commit();
            Cache::forget('public_test_categories_list');
            $executionTime = microtime(true) - $startTime;
            return [
                'data' => $category,
                'execution_time' => $this->formatExecutionTime($executionTime)
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateCategory(TestCategory $category, array $data)
    {
        $startTime = microtime(true);
        DB::beginTransaction();
        try {
            $category->update($data);
            DB::commit();
            Cache::forget('public_test_categories_list');
            $executionTime = microtime(true) - $startTime;
            return [
                'data' => $category,
                'execution_time' => $this->formatExecutionTime($executionTime)
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteCategory(TestCategory $category)
    {
        $startTime = microtime(true);
        DB::beginTransaction();
        try {
            // Get all child category IDs recursively (including current category)
            $allCategoryIds = collect([$category->id]);
            $this->getChildCategoryIds($category, $allCategoryIds);
            
            // Delete all tests in this category and all child categories
            $tests = \App\Models\Tests\Test::whereIn('category_id', $allCategoryIds)->get();
            foreach ($tests as $test) {
                // Delete test results and answers
                foreach ($test->results as $result) {
                    $result->answers()->delete();
                    $result->delete();
                }
                // Delete test questions and options
                foreach ($test->questions as $question) {
                    $question->options()->delete();
                    $question->delete();
                }
                $test->delete();
            }
            
            // Delete all child categories recursively (from deepest to shallowest)
            $this->deleteChildCategories($category);
            
            // Delete the category itself
            $result = $category->delete();
            
            DB::commit();
            Cache::forget('public_test_categories_list');
            $executionTime = microtime(true) - $startTime;
            return [
                'success' => $result,
                'execution_time' => $this->formatExecutionTime($executionTime)
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    
    /**
     * Recursively delete child categories (children are deleted first, then parent)
     */
    private function deleteChildCategories(TestCategory $category)
    {
        foreach ($category->children as $child) {
            // Recursively delete grandchildren first
            if ($child->children->count() > 0) {
                $this->deleteChildCategories($child);
            }
            
            // Delete the child category (tests already deleted above)
            $child->delete();
        }
    }
    
    /**
     * Get all child category IDs recursively
     */
    private function getChildCategoryIds(TestCategory $category, &$categoryIds)
    {
        foreach ($category->children as $child) {
            $categoryIds->push($child->id);
            if ($child->children->count() > 0) {
                $this->getChildCategoryIds($child, $categoryIds);
            }
        }
    }

    public function getScreenData(bool $isMobile = false): array
    {
        $seo = Seo::first();
        $logo = WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'test_categories',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}

