<?php

namespace App\Services;

use App\Models\WritesCategories\Category;
use Carbon\Carbon;
use Illuminate\Support\Facades\URL;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url as SitemapUrl;

class SitemapGenerator
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('app.url'), '/');
    }

    public function generate(): void
    {
        $sitemap = Sitemap::create();
        $now = Carbon::now();

        // Ana sayfa
        $sitemap->add(
            SitemapUrl::create($this->baseUrl)
                ->setLastModificationDate($now)
                ->setChangeFrequency('daily')
                ->setPriority(1.0)
        );

        // Ana başlıklar
        $mainPages = [
            '/writes' => 0.9,
            '/categories' => 0.9,
            '/versions' => 0.9,
        ];

        foreach ($mainPages as $page => $priority) {
            $sitemap->add(
                SitemapUrl::create($this->baseUrl . $page)
                    ->setLastModificationDate($now)
                    ->setChangeFrequency('daily')
                    ->setPriority($priority)
            );
        }

        // Kategoriler
        Category::with('writes')->chunk(100, function ($categories) use ($sitemap, $now) {
            foreach ($categories as $category) {
                $sitemap->add(
                    SitemapUrl::create($this->baseUrl . '/categories/' . $category->slug)
                        ->setLastModificationDate($category->updated_at ?? $now)
                        ->setChangeFrequency('weekly')
                        ->setPriority(0.8)
                );

                // Her kategorinin yazıları
                foreach ($category->writes as $write) {
                    $sitemap->add(
                        SitemapUrl::create($this->baseUrl . '/writes/' . $write->slug)
                            ->setLastModificationDate($write->updated_at ?? $now)
                            ->setChangeFrequency('monthly')
                            ->setPriority(0.6)
                    );
                }
            }
        });

        // Sitemap'i kaydet
        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
