<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use Illuminate\Support\Facades\Cache;

class CategoryService
{
    private const CACHE_TTL = 60;

    /**
     * Tüm kategorileri cache üzerinden veya veritabanından çeker
     */
    public function getCategories()
    {
        return Cache::remember('categories', self::CACHE_TTL, function () {
            return Category::withCount('writes')->get();
        });
    }

    /**
     * Bir kategori oluşturur
     */
    public function createCategory(array $data)
    {
        $category = Category::create($data);
        $this->clearCache();
        return $category;
    }

    /**
     * Bir kategoriyi günceller
     */
    public function updateCategory(Category $category, array $data)
    {
        $category->update($data);
        $this->clearCache();
        return $category;
    }

    /**
     * Bir kategoriyi siler
     */
    public function deleteCategory(Category $category)
    {
        $result = $category->delete();
        $this->clearCache();
        return $result;
    }

    /**
     * Kategoriye ait cache'i temizler
     */
    public function clearCache()
    {
        Cache::forget('categories');
    }
}
