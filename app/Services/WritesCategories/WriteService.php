<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Services\WritesCategories\CategoryService;
use App\Models\Seo;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Support\Facades\Cache;

class WriteService
{
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
        $isAdmin = Auth::check();
        if (!$isAdmin) {
            // Cache for 60 minutes for guests
            return Cache::remember('public_writes_list', 60 * 60, function () {
                $writes = Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                    ->where('status', 'published')
                    ->orderByDesc('published_at')
                    ->get();
                return [
                    'data' => $writes,
                    'count' => $writes->count()
                ];
            });
        }
        // Admin: always fresh
        $writes = Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $writes,
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
        $isAdmin = Auth::check();
        if (!$isAdmin) {
            // Cache for 60 minutes for guests
            return Cache::remember('public_writes_list', 60 * 60, function () {
                $writes = Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                    ->where('status', 'published')
                    ->orderByDesc('published_at')
                    ->get();
                return [
                    'data' => $writes,
                    'count' => $writes->count()
                ];
            });
        }
        // Admin: always fresh
        $writes = Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $writes,
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
        $isAdmin = Auth::check();
        $writes = Write::whereIn('category_id', $categoryIds)
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'published');
            })
            ->select(
                'id',
                'title',
                'slug',
                'status',
                'published_at',
                'created_at',
                'updated_at',
                'meta_description',
                'summary',
                'cover_image'
            )
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $writes,
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
        $isAdmin = Auth::check();
        $writes = Write::where('category_id', $category->id)
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'published');
            })
            ->select(
                'id',
                'title',
                'slug',
                'status',
                'published_at',
                'created_at',
                'updated_at',
                'meta_description',
                'summary',
                'cover_image'
            )
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $writes,
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
        $isAdmin = Auth::check();
        $query = Write::with(['writeDraws' => function ($query) {
            $query->orderBy('version', 'desc')->latest();
        }])->where('slug', $slug);
        if (!$isAdmin) {
            $query->where(function ($q) {
                $q->where('status', 'published')
                    ->orWhere('status', Write::STATUS_LINK_ONLY);
            });
        }
        $write = $query->firstOrFail();
        return [
            'data' => $write
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
        DB::beginTransaction();
        try {
            if (!isset($data['author_id']) || empty($data['author_id'])) {
                $data['author_id'] = Auth::id();
            }
            $write = Write::create($data);
            if (isset($data['category_id']) && !empty($data['category_id'])) {
                $write->categories()->attach($data['category_id']);
            }
            DB::commit();
            // Invalidate cache
            Cache::forget('public_writes_list');
            return [
                'data' => $write
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
        DB::beginTransaction();
        try {
            if (isset($data['category_id']) && $write->category_id != $data['category_id']) {
                $write->categories()->detach();
                if (!empty($data['category_id'])) {
                    $write->categories()->attach($data['category_id']);
                }
            }
            $write->update($data);
            DB::commit();
            // Invalidate cache
            Cache::forget('public_writes_list');
            return [
                'data' => $write
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
        DB::beginTransaction();
        try {
            $write->categories()->detach();
            $result = $write->delete();
            DB::commit();
            // Invalidate cache
            Cache::forget('public_writes_list');
            return [
                'success' => $result
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
        $latestVersion = $write->writeDraws()->max('version') ?? 0;
        $writeDraw = $write->writeDraws()->create([
            'elements' => $data['elements'],
            'version'  => $latestVersion + 1,
        ]);
        return [
            'data' => $writeDraw
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
        $writeDraw = $write->writeDraws()->findOrFail($drawId);
        $result = $writeDraw->delete();
        return [
            'success' => $result
        ];
    }

    public function getScreenData(bool $isMobile = false): array
    {
        $seo = Seo::first();
        $logo = WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'writes',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}
