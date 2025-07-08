<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Seo;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Support\Facades\Cache;

class CategoryService
{
    // Define threshold for slow operations in seconds
    private const SLOW_OPERATION_THRESHOLD = 0.5;

    /**
     * Check if operation is slow based on execution time
     * 
     * @param float $executionTime
     * @return bool
     */
    private function isSlowOperation($executionTime)
    {
        return $executionTime > self::SLOW_OPERATION_THRESHOLD;
    }

    /**
     * Format execution time with performance indicators
     * 
     * @param float $executionTime
     * @return array
     */
    private function formatExecutionTime($executionTime)
    {
        return [
            'value' => round($executionTime, 4) . ' seconds',
            'is_slow' => $this->isSlowOperation($executionTime)
        ];
    }

    /**
     * Get all categories from database
     * 
     * @return array Associated array with data and execution time
     */
    public function getCategories()
    {
        $isAdmin = Auth::check();
        if (!$isAdmin) {
            // Cache for 60 minutes for guests
            return Cache::remember('public_categories_list', 60 * 60, function () {
                $categories = $this->fetchCategoriesFromDatabase(false);
                return [
                    'data' => $categories,
                    'count' => $categories->count()
                ];
            });
        }
        // Admin: always fresh
        $categories = $this->fetchCategoriesFromDatabase(true);
        return [
            'data' => $categories,
            'count' => $categories->count()
        ];
    }

    /**
     * Fetch categories directly from database
     * 
     * @param bool $isAdmin
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function fetchCategoriesFromDatabase($isAdmin)
    {
        // Get all categories (only public ones for non-admin users)
        $categories = Category::with(['children' => function ($query) use ($isAdmin) {
            // Only show hidden categories to admin
            if (!$isAdmin) {
                $query->where('status', 'public');
            }
        }])
            ->when(!$isAdmin, function ($query) {
                // Only show public categories to non-admin users
                $query->where('status', 'public');
            })
            ->get();

        // Set hidden status for children of hidden parent categories (for UI purposes)
        $this->setChildrenHiddenStatus($categories);

        // Calculate write count for each category
        foreach ($categories as $category) {
            // Get unique write IDs for each category
            $categoryWritesInRelationTable = DB::table('content_category_write')
                ->join('content_writes', 'content_category_write.write_id', '=', 'content_writes.id')
                ->where('content_category_write.category_id', $category->id)
                ->when(!$isAdmin, function ($query) {
                    $query->where('content_writes.status', 'published');
                })
                ->pluck('content_category_write.write_id')
                ->toArray();

            $categoryWritesInMainTable = DB::table('content_writes')
                ->where('category_id', $category->id)
                ->when(!$isAdmin, function ($query) {
                    $query->where('status', 'published');
                })
                ->pluck('id')
                ->toArray();

            // Combine lists and remove duplicates
            $uniqueWriteIds = array_unique(array_merge($categoryWritesInRelationTable, $categoryWritesInMainTable));

            // Set unique write count as category property
            $category->writes_count = count($uniqueWriteIds);

            // Calculate write counts for child categories
            if ($category->children->count() > 0) {
                $this->calculateChildCategoriesWritesCount($category, $isAdmin);
            }
        }

        return $categories;
    }

    /**
     * Set hidden status for children of hidden parent categories
     * Used for visual indication in the frontend (lock icon)
     * 
     * @param \Illuminate\Database\Eloquent\Collection $categories
     * @return void
     */
    private function setChildrenHiddenStatus($categories)
    {
        foreach ($categories as $category) {
            if ($category->status === 'hidden' && $category->children->count() > 0) {
                foreach ($category->children as $child) {
                    // Set child's "parent_hidden" property to true
                    $child->parent_hidden = true;

                    // Apply the same process to the child's children
                    if ($child->children->count() > 0) {
                        $this->setChildrenHiddenStatus($child->children);
                    }
                }
            }
        }
    }

    /**
     * Calculate write counts for child categories
     * 
     * @param Category $category
     * @param bool $isAdmin
     * @return void
     */
    private function calculateChildCategoriesWritesCount($category, $isAdmin = false)
    {
        foreach ($category->children as $child) {
            // Get unique write IDs for each child category
            $childWritesInRelationTable = DB::table('content_category_write')
                ->join('content_writes', 'content_category_write.write_id', '=', 'content_writes.id')
                ->where('content_category_write.category_id', $child->id)
                ->when(!$isAdmin, function ($query) {
                    $query->where('content_writes.status', 'published');
                })
                ->pluck('content_category_write.write_id')
                ->toArray();

            $childWritesInMainTable = DB::table('content_writes')
                ->where('category_id', $child->id)
                ->when(!$isAdmin, function ($query) {
                    $query->where('status', 'published');
                })
                ->pluck('id')
                ->toArray();

            // Combine lists and remove duplicates
            $childUniqueWriteIds = array_unique(array_merge($childWritesInRelationTable, $childWritesInMainTable));

            // Set the child category's own write count - don't add to parent category!
            $child->writes_count = count($childUniqueWriteIds);

            // Calculate for deeper child categories
            if ($child->children->count() > 0) {
                $this->calculateChildCategoriesWritesCount($child, $isAdmin);
            }
        }
    }

    /**
     * Create a new category
     * 
     * @param array $data
     * @return array Associated array with data and execution time
     */
    public function createCategory(array $data)
    {
        $startTime = microtime(true);
        DB::beginTransaction();
        try {
            $category = Category::create($data);
            DB::commit();
            // Invalidate cache
            Cache::forget('public_categories_list');
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

    /**
     * Update an existing category
     * 
     * @param Category $category
     * @param array $data
     * @return array Associated array with data and execution time
     */
    public function updateCategory(Category $category, array $data)
    {
        $startTime = microtime(true);
        DB::beginTransaction();
        try {
            $category->update($data);
            DB::commit();
            // Invalidate cache
            Cache::forget('public_categories_list');
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

    /**
     * Delete a category
     * 
     * @param Category $category
     * @return array Associated array with result and execution time
     */
    public function deleteCategory(Category $category)
    {
        $startTime = microtime(true);
        DB::beginTransaction();
        try {
            $result = $category->delete();
            DB::commit();
            // Invalidate cache
            Cache::forget('public_categories_list');
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

    public function getScreenData(bool $isMobile = false): array
    {
        $seo = Seo::first();
        $logo = WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'categories',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}
