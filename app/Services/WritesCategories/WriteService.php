<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;
use App\Services\WritesCategories\CategoryService;

class WriteService
{
    private const CACHE_TTL = 60;

    /**
     * Tüm kategorileri cache üzerinden veya veritabanından çeker.
     */
    public function getCategories()
    {
        // CategoryService içindeki metodu doğrudan kullan
        return app(CategoryService::class)->getCategories();
    }

    /**
     * Ziyaretçiye (veya auth durumuna) göre yazıları çeker.
     */
    public function getWrites()
    {
        return Cache::remember('content_writes', self::CACHE_TTL, function () {
            return Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->when(!Auth::check(), function ($query) {
                    $query->where('status', 'published');
                })
                ->orderByDesc('published_at')
                ->get();
        });
    }

    /**
     * Tüm yazıları çeker (örneğin create vb. yerlerde lazım olabilir).
     */
    public function getAllWrites()
    {
        return Cache::remember('content_writes_all', self::CACHE_TTL, function () {
            return Write::select('id', 'views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->when(!Auth::check(), function ($query) {
                    $query->where('status', 'published');
                })
                ->orderByDesc('published_at')
                ->get();
        });
    }

    /**
     * Belirli kategorilere ait yazıları çeker
     */
    public function getWritesByCategories(Collection $categoryIds)
    {
        // Doğrudan category_id'ye sahip yazılar
        $writesFromMainTable = Write::whereIn('category_id', $categoryIds)
            ->when(!Auth::check(), function ($query) {
                $query->where('status', 'published');
            })
            ->select('id', 'title', 'slug', 'author_id', 'category_id', 'published_at', 'status', 'views_count', 'seo_keywords', 'tags', 'meta_description', 'cover_image', 'created_at', 'updated_at');

        // İlişki tablosundan gelen yazılar
        $writesFromRelationTable = Write::whereHas('categories', function ($query) use ($categoryIds) {
            $query->whereIn('category_id', $categoryIds);
        })
            ->when(!Auth::check(), function ($query) {
                $query->where('status', 'published');
            })
            ->select('id', 'title', 'slug', 'author_id', 'category_id', 'published_at', 'status', 'views_count', 'seo_keywords', 'tags', 'meta_description', 'cover_image', 'created_at', 'updated_at');

        // İki sorguyu birleştirip, her yazının yalnızca bir kez gelmesini sağlama
        return $writesFromMainTable->union($writesFromRelationTable)
            ->orderByDesc('published_at')
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
            ->orderByDesc('published_at')
            ->get();
    }

    /**
     * Slug'a göre yazı çeker
     */
    public function getWriteBySlug($slug)
    {
        // Admin ise tüm yazıları görebilir
        if (Auth::check()) {
            return Write::with(['writeDraws' => function ($query) {
                $query->orderBy('version', 'desc')->latest();
            }])
                ->where('slug', $slug)
                ->firstOrFail();
        }

        // Admin değilse sadece yayındaki yazıları döndür
        return Write::with(['writeDraws' => function ($query) {
            $query->orderBy('version', 'desc')->latest();
        }])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
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
        // Eğer author_id yoksa, Auth::id() ile doldur
        if (!isset($data['author_id']) || empty($data['author_id'])) {
            $data['author_id'] = Auth::id();
        }

        $write = Write::create($data);

        // Kategori ilişkisini content_category_write tablosuna da ekle
        if (isset($data['category_id']) && !empty($data['category_id'])) {
            $write->categories()->attach($data['category_id']);
        }

        $this->clearCache();
        return $write;
    }

    /**
     * Yazıyı günceller
     */
    public function updateWrite(Write $write, array $data)
    {
        // Kategori değişmişse ilişkiyi güncelle
        if (isset($data['category_id']) && $write->category_id != $data['category_id']) {
            // Önce eski ilişkileri kaldır
            $write->categories()->detach();

            // Yeni kategori ilişkisini ekle
            if (!empty($data['category_id'])) {
                $write->categories()->attach($data['category_id']);
            }
        }

        $write->update($data);
        $this->clearCache();
        return $write;
    }

    /**
     * Yazıyı siler
     */
    public function deleteWrite(Write $write)
    {
        // İlişki tablosundan da kaydı sil
        $write->categories()->detach();

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
        Cache::forget('content_categories');
        Cache::forget('content_writes');
        Cache::forget('content_writes_all');
    }
}
