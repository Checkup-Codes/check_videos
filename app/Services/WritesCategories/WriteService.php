<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Services\WritesCategories\CategoryService;

class WriteService
{
    private const CACHE_TTL = 60;

    // Define threshold for slow operations in seconds
    private const SLOW_OPERATION_THRESHOLD = 0.5;

    /**
     * Get all categories through CategoryService
     * 
     * @return array Associated array with data and execution time
     */
    public function getCategories()
    {
        // Use CategoryService method directly
        return app(CategoryService::class)->getCategories();
    }

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
     * Get writes based on visitor's auth status
     * 
     * @return array Associated array with data and execution time
     */
    public function getWrites()
    {
        $startTime = microtime(true);
        $isAdmin = Auth::check();

        // If admin, bypass cache for fresh data
        if ($isAdmin) {
            $writes = Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->orderByDesc('published_at')
                ->get();
        } else {
            // For regular users, use cache for better performance
            $writes = Cache::remember('content_writes', self::CACHE_TTL, function () {
                return Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                    ->where('status', 'published')
                    ->orderByDesc('published_at')
                    ->get();
            });
        }

        $executionTime = microtime(true) - $startTime;

        return [
            'data' => $writes,
            'execution_time' => $this->formatExecutionTime($executionTime),
            'count' => $writes->count()
        ];
    }

    /**
     * Get all writes (for create/edit forms)
     * 
     * @return array Associated array with data and execution time
     */
    public function getAllWrites()
    {
        $startTime = microtime(true);
        $isAdmin = Auth::check();

        // If admin, bypass cache for fresh data
        if ($isAdmin) {
            $writes = Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->orderByDesc('published_at')
                ->get();
        } else {
            // For regular users, use cache for better performance
            $writes = Cache::remember('content_writes_all', self::CACHE_TTL, function () {
                return Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                    ->where('status', 'published')
                    ->orderByDesc('published_at')
                    ->get();
            });
        }

        $executionTime = microtime(true) - $startTime;

        return [
            'data' => $writes,
            'execution_time' => $this->formatExecutionTime($executionTime),
            'count' => $writes->count()
        ];
    }

    /**
     * Get writes by multiple categories
     * 
     * @param Collection $categoryIds
     * @return array Associated array with data and execution time
     */
    public function getWritesByCategories(Collection $categoryIds)
    {
        $startTime = microtime(true);
        $isAdmin = Auth::check();

        // Direct category_id writes
        $writesFromMainTable = Write::whereIn('category_id', $categoryIds)
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'published');
            })
            ->select(
                'id',
                'title',
                'slug',
                'author_id',
                'category_id',
                'published_at',
                'status',
                'views_count',
                'seo_keywords',
                'tags',
                'meta_description',
                'cover_image',
                'created_at',
                'updated_at'
            );

        // Writes from relationship table
        $writesFromRelationTable = Write::whereHas('categories', function ($query) use ($categoryIds) {
            $query->whereIn('category_id', $categoryIds);
        })
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'published');
            })
            ->select(
                'id',
                'title',
                'slug',
                'author_id',
                'category_id',
                'published_at',
                'status',
                'views_count',
                'seo_keywords',
                'tags',
                'meta_description',
                'cover_image',
                'created_at',
                'updated_at'
            );

        // Combine both queries and ensure each write appears only once
        $writes = $writesFromMainTable->union($writesFromRelationTable)
            ->orderByDesc('published_at')
            ->get();

        $executionTime = microtime(true) - $startTime;

        return [
            'data' => $writes,
            'execution_time' => $this->formatExecutionTime($executionTime),
            'count' => $writes->count()
        ];
    }

    /**
     * Get writes by specific category
     * 
     * @param Category $category
     * @return array Associated array with data and execution time
     */
    public function getWritesByCategory(Category $category)
    {
        $startTime = microtime(true);
        $isAdmin = Auth::check();

        $writes = Write::where('category_id', $category->id)
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'published');
            })
            ->select(
                'id',
                'title',
                'slug',
                'author_id',
                'category_id',
                'published_at',
                'summary',
                'status',
                'views_count',
                'seo_keywords',
                'tags',
                'meta_description',
                'cover_image',
                'created_at',
                'updated_at'
            )
            ->orderByDesc('published_at')
            ->get();

        $executionTime = microtime(true) - $startTime;

        return [
            'data' => $writes,
            'execution_time' => $this->formatExecutionTime($executionTime),
            'count' => $writes->count()
        ];
    }

    /**
     * Get write by slug
     * 
     * @param string $slug
     * @return array Associated array with data and execution time
     */
    public function getWriteBySlug($slug)
    {
        $startTime = microtime(true);
        $isAdmin = Auth::check();

        $query = Write::with(['writeDraws' => function ($query) {
            $query->orderBy('version', 'desc')->latest();
        }])->where('slug', $slug);

        // Admin can view all writes, non-admin can only see published
        if (!$isAdmin) {
            $query->where('status', 'published');
        }

        $write = $query->firstOrFail();

        $executionTime = microtime(true) - $startTime;

        return [
            'data' => $write,
            'execution_time' => $this->formatExecutionTime($executionTime)
        ];
    }

    /**
     * Increment view count for a write
     * 
     * @param Write $write
     * @return boolean
     */
    public function incrementViewCount(Write $write)
    {
        return $write->increment('views_count');
    }

    /**
     * Create a new write
     * 
     * @param array $data
     * @return array Associated array with data and execution time
     */
    public function createWrite(array $data)
    {
        $startTime = microtime(true);

        DB::beginTransaction();
        try {
            // If author_id isn't set, use authenticated user ID
            if (!isset($data['author_id']) || empty($data['author_id'])) {
                $data['author_id'] = Auth::id();
            }

            $write = Write::create($data);

            // Add category relationship to content_category_write table
            if (isset($data['category_id']) && !empty($data['category_id'])) {
                $write->categories()->attach($data['category_id']);
            }

            DB::commit();
            $this->clearCache();

            $executionTime = microtime(true) - $startTime;

            return [
                'data' => $write,
                'execution_time' => $this->formatExecutionTime($executionTime)
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Update an existing write
     * 
     * @param Write $write
     * @param array $data
     * @return array Associated array with data and execution time
     */
    public function updateWrite(Write $write, array $data)
    {
        $startTime = microtime(true);

        DB::beginTransaction();
        try {
            // Update category relationship if changed
            if (isset($data['category_id']) && $write->category_id != $data['category_id']) {
                // First remove old relationships
                $write->categories()->detach();

                // Add new category relationship
                if (!empty($data['category_id'])) {
                    $write->categories()->attach($data['category_id']);
                }
            }

            $write->update($data);

            DB::commit();
            $this->clearCache();

            $executionTime = microtime(true) - $startTime;

            return [
                'data' => $write,
                'execution_time' => $this->formatExecutionTime($executionTime)
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Delete a write
     * 
     * @param Write $write
     * @return array Associated array with result and execution time
     */
    public function deleteWrite(Write $write)
    {
        $startTime = microtime(true);

        DB::beginTransaction();
        try {
            // Remove from relationship table
            $write->categories()->detach();

            $result = $write->delete();

            DB::commit();
            $this->clearCache();

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
     * Add drawing to a write
     * 
     * @param Write $write
     * @param array $data
     * @return array Associated array with data and execution time
     */
    public function addDraw(Write $write, array $data)
    {
        $startTime = microtime(true);

        $latestVersion = $write->writeDraws()->max('version') ?? 0;
        $writeDraw = $write->writeDraws()->create([
            'elements' => $data['elements'],
            'version'  => $latestVersion + 1,
        ]);

        $executionTime = microtime(true) - $startTime;

        return [
            'data' => $writeDraw,
            'execution_time' => $this->formatExecutionTime($executionTime)
        ];
    }

    /**
     * Delete a drawing
     * 
     * @param Write $write
     * @param int $drawId
     * @return array Associated array with result and execution time
     */
    public function deleteDraw(Write $write, $drawId)
    {
        $startTime = microtime(true);

        $writeDraw = $write->writeDraws()->findOrFail($drawId);
        $result = $writeDraw->delete();

        $executionTime = microtime(true) - $startTime;

        return [
            'success' => $result,
            'execution_time' => $this->formatExecutionTime($executionTime)
        ];
    }

    /**
     * Clear cache (to prevent duplication)
     */
    public function clearCache()
    {
        Cache::forget('content_categories');
        Cache::forget('content_writes');
        Cache::forget('content_writes_all');
    }
}
