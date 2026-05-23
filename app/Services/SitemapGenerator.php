<?php

namespace App\Services;

use App\Models\WritesCategories\Category;
use App\Support\TenantDomain;
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url as SitemapUrl;

class SitemapGenerator
{
    private string $baseUrl;
    private string $domain;

    public function __construct()
    {
        $this->domain = TenantDomain::current();
        $this->baseUrl = TenantDomain::baseUrl();
    }

    public function generate(): void
    {
        $sitemap = Sitemap::create();
        $now = Carbon::now();

        $sitemap->add(
            SitemapUrl::create($this->baseUrl)
                ->setLastModificationDate($now)
                ->setChangeFrequency('daily')
                ->setPriority(1.0)
        );

        foreach (TenantDomain::sitemapRoutes() as $feature => $path) {
            if (TenantDomain::isFeatureHidden($this->domain, $feature)) {
                continue;
            }

            $sitemap->add(
                SitemapUrl::create($this->baseUrl . $path)
                    ->setLastModificationDate($now)
                    ->setChangeFrequency('daily')
                    ->setPriority(0.9)
            );
        }

        if (!TenantDomain::isFeatureHidden($this->domain, 'writes')) {
            $this->addWrites($sitemap, $now);
        }

        if (!TenantDomain::isFeatureHidden($this->domain, 'tests')) {
            $this->addTests($sitemap, $now);
        }

        if (!TenantDomain::isFeatureHidden($this->domain, 'certificates')) {
            $this->addCertificates($sitemap, $now);
        }

        if (!TenantDomain::isFeatureHidden($this->domain, 'workspaces')) {
            $this->addWorkspaces($sitemap, $now);
        }

        $sitemap->writeToFile($this->getSitemapPath());
    }

    private function addWrites(Sitemap $sitemap, Carbon $now): void
    {
        try {
            Category::with('writes')->chunk(100, function ($categories) use ($sitemap, $now) {
                foreach ($categories as $category) {
                    $sitemap->add(
                        SitemapUrl::create($this->baseUrl . '/categories/' . $category->slug)
                            ->setLastModificationDate($category->updated_at ?? $now)
                            ->setChangeFrequency('weekly')
                            ->setPriority(0.7)
                    );

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
            // Categories might not exist for this tenant DB
        }
    }

    private function addTests(Sitemap $sitemap, Carbon $now): void
    {
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
    }

    private function addCertificates(Sitemap $sitemap, Carbon $now): void
    {
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
    }

    private function addWorkspaces(Sitemap $sitemap, Carbon $now): void
    {
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
    }

    private function getSitemapFilename(): string
    {
        if (in_array($this->domain, ['localhost', '127.0.0.1', '::1'], true)) {
            return 'sitemap.xml';
        }

        $safeDomain = str_replace(['.', ':'], '_', $this->domain);

        return "sitemap_{$safeDomain}.xml";
    }

    public function getSitemapPath(): string
    {
        return public_path($this->getSitemapFilename());
    }

    public function getPublicSitemapFilename(): string
    {
        return $this->getSitemapFilename();
    }
}
