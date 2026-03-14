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
    private string $domain;

    public function __construct()
    {
        // Get current domain from request or config
        $this->domain = request()->getHost() ?? parse_url(config('app.url'), PHP_URL_HOST) ?? 'localhost';
        $this->baseUrl = rtrim(request()->getSchemeAndHttpHost(), '/');
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

        // Ana sayfalar (Sitelinks için önemli!)
        $mainPages = [
            '/writes' => 0.9,
            '/tests' => 0.9,
            '/certificates' => 0.9,
            '/categories' => 0.8,
            '/workspaces' => 0.8,
        ];

        foreach ($mainPages as $page => $priority) {
            try {
                $sitemap->add(
                    SitemapUrl::create($this->baseUrl . $page)
                        ->setLastModificationDate($now)
                        ->setChangeFrequency('daily')
                        ->setPriority($priority)
                );
            } catch (\Exception $e) {
                // Page might not exist
            }
        }

        // Kategoriler ve Yazılar
        try {
            Category::with('writes')->chunk(100, function ($categories) use ($sitemap, $now) {
                foreach ($categories as $category) {
                    $sitemap->add(
                        SitemapUrl::create($this->baseUrl . '/categories/' . $category->slug)
                            ->setLastModificationDate($category->updated_at ?? $now)
                            ->setChangeFrequency('weekly')
                            ->setPriority(0.7)
                    );

                    // Her kategorinin yazıları
                    foreach ($category->writes as $write) {
                        if ($write->status === 'published') {
                            $sitemap->add(
                                SitemapUrl::create($this->baseUrl . '/writes/' . $write->slug)
                                    ->setLastModificationDate($write->updated_at ?? $now)
                                    ->setChangeFrequency('monthly')
                                    ->setPriority(0.6)
                            );
                        }
                    }
                }
            });
        } catch (\Exception $e) {
            // Categories might not exist
        }

        // Testler
        try {
            \App\Models\Tests\Test::where('status', 'published')
                ->chunk(100, function ($tests) use ($sitemap, $now) {
                    foreach ($tests as $test) {
                        $sitemap->add(
                            SitemapUrl::create($this->baseUrl . '/tests/' . $test->slug)
                                ->setLastModificationDate($test->updated_at ?? $now)
                                ->setChangeFrequency('monthly')
                                ->setPriority(0.7)
                        );
                    }
                });
        } catch (\Exception $e) {
            // Tests might not exist
        }

        // Sertifikalar
        try {
            \App\Models\Certificate::chunk(100, function ($certificates) use ($sitemap, $now) {
                foreach ($certificates as $certificate) {
                    $sitemap->add(
                        SitemapUrl::create($this->baseUrl . '/certificates/' . $certificate->slug)
                            ->setLastModificationDate($certificate->updated_at ?? $now)
                            ->setChangeFrequency('yearly')
                            ->setPriority(0.6)
                    );
                }
            });
        } catch (\Exception $e) {
            // Certificates might not exist
        }

        // Çalışma Alanları
        try {
            \App\Models\Workspace::chunk(100, function ($workspaces) use ($sitemap, $now) {
                foreach ($workspaces as $workspace) {
                    $sitemap->add(
                        SitemapUrl::create($this->baseUrl . '/workspaces/' . $workspace->slug)
                            ->setLastModificationDate($workspace->updated_at ?? $now)
                            ->setChangeFrequency('monthly')
                            ->setPriority(0.5)
                    );
                }
            });
        } catch (\Exception $e) {
            // Workspaces might not exist
        }

        // Domain-specific sitemap dosyası
        $filename = $this->getSitemapFilename();
        $sitemap->writeToFile(public_path($filename));
    }

    /**
     * Get domain-specific sitemap filename
     */
    private function getSitemapFilename(): string
    {
        // Sanitize domain for filename
        $safeDomain = str_replace(['.', ':'], '_', $this->domain);
        
        // For localhost or default, use sitemap.xml
        if (in_array($this->domain, ['localhost', '127.0.0.1', '::1'])) {
            return 'sitemap.xml';
        }
        
        // For production domains, use domain-specific filename
        return "sitemap_{$safeDomain}.xml";
    }

    /**
     * Get sitemap path for current domain
     */
    public function getSitemapPath(): string
    {
        return public_path($this->getSitemapFilename());
    }

    /**
     * Get public sitemap filename (for URL)
     */
    public function getPublicSitemapFilename(): string
    {
        return $this->getSitemapFilename();
    }
}
