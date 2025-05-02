<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;

class WriteService
{
    private const CACHE_TTL = 60;

    /**
     * Tüm kategorileri cache üzerinden veya veritabanından çeker.
     */
    public function getCategories()
    {
        return Cache::remember('categories', self::CACHE_TTL, function () {
            return Category::all();
        });
    }

    /**
     * Ziyaretçiye (veya auth durumuna) göre yazıları çeker.
     */
    public function getWrites()
    {
        return Cache::remember('writes', self::CACHE_TTL, function () {
            return Write::select('views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->where('status', 'published')
                ->orderByDesc('created_at')
                ->get();
        });
    }

    /**
     * Tüm yazıları çeker (örneğin create vb. yerlerde lazım olabilir).
     */
    public function getAllWrites()
    {
        return Cache::remember('writes_all', self::CACHE_TTL, function () {
            return Write::all();
        });
    }

    /**
     * Belirli kategorilere ait yazıları çeker
     */
    public function getWritesByCategories(Collection $categoryIds)
    {
        return Write::whereIn('category_id', $categoryIds)
            ->when(!Auth::check(), function ($query) {
                $query->where('status', 'published');
            })
            ->select('id', 'title', 'slug', 'author_id', 'category_id', 'published_at', 'status', 'views_count', 'seo_keywords', 'tags', 'meta_description', 'cover_image', 'created_at', 'updated_at')
            ->get();
    }

    /**
     * Belirli bir kategoriye ait yazıları çeker
     */
    public function getWritesByCategory(Category $category)
    {
        return Write::where('category_id', $category->id)
            ->when(!Auth::check(), function ($query) {
                $query->where('status', 'published');
            })
            ->select('id', 'title', 'slug', 'author_id', 'category_id', 'published_at', 'summary', 'status', 'views_count', 'seo_keywords', 'tags', 'meta_description', 'cover_image', 'created_at', 'updated_at')
            ->get();
    }

    /**
     * Slug'a göre yazı çeker
     */
    public function getWriteBySlug($slug)
    {
        return Write::with(['writeDraws' => function ($query) {
            $query->orderBy('version', 'desc')->latest();
        }])->where('slug', $slug)->firstOrFail();
    }

    /**
     * Yazı görüntülenme sayısını arttırır
     */
    public function incrementViewCount(Write $write)
    {
        return $write->increment('views_count');
    }

    /**
     * Yeni yazı oluşturur
     */
    public function createWrite(array $data)
    {
        $write = Write::create($data);
        $this->clearCache();
        return $write;
    }

    /**
     * Yazıyı günceller
     */
    public function updateWrite(Write $write, array $data)
    {
        $write->update($data);
        $this->clearCache();
        return $write;
    }

    /**
     * Yazıyı siler
     */
    public function deleteWrite(Write $write)
    {
        $result = $write->delete();
        $this->clearCache();
        return $result;
    }

    /**
     * Çizim ekler
     */
    public function addDraw(Write $write, array $data)
    {
        $latestVersion = $write->writeDraws()->max('version') ?? 0;
        return $write->writeDraws()->create([
            'elements' => $data['elements'],
            'version'  => $latestVersion + 1,
        ]);
    }

    /**
     * Çizimi siler
     */
    public function deleteDraw(Write $write, $drawId)
    {
        $writeDraw = $write->writeDraws()->findOrFail($drawId);
        return $writeDraw->delete();
    }

    /**
     * Cache temizleme metodu (tekrarları önlemek için).
     */
    public function clearCache()
    {
        Cache::forget('categories');
        Cache::forget('writes');
        Cache::forget('writes_all');
    }
}
