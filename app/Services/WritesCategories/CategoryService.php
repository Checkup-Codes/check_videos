<?php

namespace App\Services\WritesCategories;

use App\Models\WritesCategories\Category;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CategoryService
{
    private const CACHE_TTL = 60;

    /**
     * Tüm kategorileri cache üzerinden veya veritabanından çeker
     */
    public function getCategories()
    {
        // Cache'leme işlemini tekrar aktif et, çünkü artık doğru çalışıyor
        return Cache::remember('categories', self::CACHE_TTL, function () {
            // Admin mi kontrolü
            $isAdmin = Auth::check();

            // Önce tüm kategorileri al (admin değilse sadece public olanları)
            $categories = Category::with(['children' => function ($query) use ($isAdmin) {
                // Sadece admin ise gizli kategorileri göster
                if (!$isAdmin) {
                    $query->where('status', 'public');
                }
            }])
                ->when(!$isAdmin, function ($query) {
                    // Admin değilse sadece public kategorileri göster
                    $query->where('status', 'public');
                })
                ->get();

            // Gizli üst kategorilerin alt kategorileri için gizlilik durumunu ayarla (bu sadece görsel için)
            $this->setChildrenHiddenStatus($categories);

            // Her kategori için yazı sayısını doğru bir şekilde hesapla
            foreach ($categories as $category) {
                // Her kategoriye ait benzersiz yazı ID'lerini toplayalım
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

                // İki listeyi birleştirip benzersiz hale getir
                $uniqueWriteIds = array_unique(array_merge($categoryWritesInRelationTable, $categoryWritesInMainTable));

                // Benzersiz yazı sayısını kategori özelliği olarak ayarla
                $category->writes_count = count($uniqueWriteIds);

                // Alt kategorilerin yazı sayılarını da ekle
                if ($category->children->count() > 0) {
                    $this->calculateChildCategoriesWritesCount($category, $isAdmin);
                }
            }

            return $categories;
        });
    }

    /**
     * Gizli üst kategorilerin alt kategorileri için gizlilik durumunu ayarla
     * Bu görsel anlamda (frontend'de kilit simgesi) için kullanılacak
     */
    private function setChildrenHiddenStatus($categories)
    {
        foreach ($categories as $category) {
            if ($category->status === 'hidden' && $category->children->count() > 0) {
                foreach ($category->children as $child) {
                    // Alt kategorinin "parent_hidden" özelliğini true olarak ayarla
                    $child->parent_hidden = true;

                    // Alt kategorinin kendi alt kategorileri için de aynı işlemi yap
                    if ($child->children->count() > 0) {
                        $this->setChildrenHiddenStatus([$child]);
                    }
                }
            }
        }
    }

    /**
     * Alt kategorilerin yazı sayılarını hesaplayan yardımcı metot
     */
    private function calculateChildCategoriesWritesCount($category, $isAdmin = false)
    {
        foreach ($category->children as $child) {
            // Her alt kategoriye ait benzersiz yazı ID'lerini toplayalım
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

            // İki listeyi birleştirip benzersiz hale getir
            $childUniqueWriteIds = array_unique(array_merge($childWritesInRelationTable, $childWritesInMainTable));

            // Alt kategorinin kendi yazı sayısını ayarla - ana kategoriye ekleme!
            $child->writes_count = count($childUniqueWriteIds);

            // Daha da alt kategoriler için tekrar hesapla
            if ($child->children->count() > 0) {
                $this->calculateChildCategoriesWritesCount($child, $isAdmin);
            }
        }
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
