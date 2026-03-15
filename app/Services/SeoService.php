<?php

namespace App\Services;

use App\Models\Seo;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Support\Facades\Cache;

/**
 * SeoService - Merkezi SEO veri yönetimi
 * 
 * Tüm SEO verilerini tek bir yerden yönetir.
 * Request-scope cache ile aynı request'te tekrar sorgu atmaz.
 * Multi-tenancy desteği için tenant context eklenebilir.
 */
class SeoService
{
    private static ?array $cachedData = null;
    
    // Cache TTL (saniye) - production'da artırılabilir
    private const CACHE_TTL = 300; // 5 dakika

    /**
     * Global SEO verilerini getir (site geneli)
     * Request içinde cache'lenir, tekrar sorgu atmaz
     */
    public function getGlobalSeo(): array
    {
        if (self::$cachedData !== null) {
            return self::$cachedData;
        }

        // Laravel cache ile DB sorgularını minimize et
        self::$cachedData = Cache::remember($this->getCacheKey(), self::CACHE_TTL, function () {
            $domain = request()->getHost();
            
            // Get or create SEO data for current domain
            $seo = Seo::firstOrCreate(
                ['domain' => $domain, 'route' => 'home'],
                [
                    'site_name' => config('app.name'),
                    'title' => config('app.name'),
                    'description' => 'Site açıklaması',
                    'language' => 'tr',
                    'locale' => 'tr_TR',
                    'robots' => 'index, follow',
                ]
            );
            
            $logo = WriteImage::where('category', 'logo')->first();
            
            // Safely get logo - handle case where column might not exist yet
            $logoPath = '/images/checkup_codes_logo.png'; // default
            try {
                $logoPath = $seo->logo ?? ($logo?->image_path ?? $logoPath);
            } catch (\Exception $e) {
                // Column might not exist yet, use fallback
                $logoPath = $logo?->image_path ?? $logoPath;
            }

            return [
                // Site Identity
                'siteName' => $seo->site_name ?? $seo->title ?? config('app.name', 'Check-up Codes'),
                'tagline' => $seo->tagline ?? '',
                'siteDescription' => $seo->description ?? '',
                'keywords' => $seo->keywords ?? '',
                'author' => $seo->author ?? '',
                'language' => $seo->language ?? 'tr',
                'locale' => $seo->locale ?? 'tr_TR',
                
                // Images
                'logo' => $logoPath,
                'favicon' => $seo->favicon ?? '/favicon.ico',
                'appleTouchIcon' => $seo->apple_touch_icon ?? null,
                'ogImage' => $seo->og_image ?? null,
                'themeColor' => $seo->theme_color ?? '#000000',
                
                // Open Graph
                'ogTitle' => $seo->og_title ?? $seo->site_name ?? config('app.name'),
                'ogDescription' => $seo->og_description ?? $seo->description ?? '',
                
                // Twitter
                'twitterCard' => $seo->twitter_card ?? 'summary_large_image',
                'twitterSite' => $seo->twitter_site ?? null,
                'twitterCreator' => $seo->twitter_creator ?? null,
                
                // Technical
                'canonicalUrl' => $seo->canonical_url ?? null,
                'robots' => $seo->robots ?? 'index, follow',
                'schemaOrg' => $seo->schema_org ?? null,
                
                // Verification & Analytics
                'googleVerification' => $seo->google_verification ?? null,
                'bingVerification' => $seo->bing_verification ?? null,
                'yandexVerification' => $seo->yandex_verification ?? null,
                'googleAnalyticsId' => $seo->google_analytics_id ?? null,
                'googleTagManagerId' => $seo->google_tag_manager_id ?? null,
            ];
        });

        return self::$cachedData;
    }

    /**
     * Sayfa bazlı SEO verisi oluştur
     * 
     * @param string $screenName Sayfa adı (route/screen identifier)
     * @param string|null $pageTitle Sayfa başlığı (browser tab için, opsiyonel)
     * @param string|null $pageDescription Sayfa açıklaması (opsiyonel)
     * @param bool $isMobileSidebar Mobil sidebar gösterilsin mi
     */
    public function getScreenSeo(
        string $screenName,
        ?string $pageTitle = null,
        ?string $pageDescription = null,
        bool $isMobileSidebar = false
    ): array {
        $global = $this->getGlobalSeo();

        return [
            'name' => $screenName,
            'isMobileSidebar' => $isMobileSidebar,
            'seo' => [
                // Browser tab title: "PageTitle | SiteName" veya sadece "SiteName"
                'title' => $pageTitle 
                    ? "{$pageTitle} | {$global['siteName']}" 
                    : $global['siteName'],
                'pageTitle' => $pageTitle, // Sadece sayfa başlığı (opsiyonel)
                'siteName' => $global['siteName'], // Header'da gösterilecek site adı
                'tagline' => $global['tagline'],
                'description' => $pageDescription ?? $global['siteDescription'],
                'keywords' => $global['keywords'],
                'author' => $global['author'],
                'language' => $global['language'],
                'locale' => $global['locale'],
                
                // Images
                'logo' => $global['logo'],
                'favicon' => $global['favicon'],
                'appleTouchIcon' => $global['appleTouchIcon'],
                'ogImage' => $global['ogImage'],
                'themeColor' => $global['themeColor'],
                
                // Open Graph
                'ogTitle' => $pageTitle ?? $global['ogTitle'],
                'ogDescription' => $pageDescription ?? $global['ogDescription'],
                
                // Twitter
                'twitterCard' => $global['twitterCard'],
                'twitterSite' => $global['twitterSite'],
                'twitterCreator' => $global['twitterCreator'],
                
                // Technical
                'robots' => $global['robots'],
                
                // Analytics
                'googleAnalyticsId' => $global['googleAnalyticsId'],
                'googleTagManagerId' => $global['googleTagManagerId'],
            ],
        ];
    }

    /**
     * Tam SEO meta verilerini al (blade template için)
     */
    public function getFullMeta(?string $pageTitle = null, ?string $pageDescription = null): array
    {
        $global = $this->getGlobalSeo();
        
        $title = $pageTitle 
            ? "{$pageTitle} | {$global['siteName']}" 
            : $global['siteName'];

        return [
            'title' => $title,
            'description' => $pageDescription ?? $global['siteDescription'],
            'keywords' => $global['keywords'],
            'author' => $global['author'],
            'robots' => $global['robots'],
            'language' => $global['language'],
            'locale' => $global['locale'],
            
            // Images
            'logo' => $global['logo'],
            
            // Open Graph
            'og' => [
                'title' => $pageTitle ?? $global['ogTitle'],
                'description' => $pageDescription ?? $global['ogDescription'],
                'image' => $global['ogImage'],
                'type' => 'website',
                'locale' => $global['locale'],
                'site_name' => $global['siteName'],
            ],
            
            // Twitter
            'twitter' => [
                'card' => $global['twitterCard'],
                'site' => $global['twitterSite'],
                'creator' => $global['twitterCreator'],
                'title' => $pageTitle ?? $global['ogTitle'],
                'description' => $pageDescription ?? $global['ogDescription'],
                'image' => $global['ogImage'],
            ],
            
            // Icons
            'favicon' => $global['favicon'],
            'appleTouchIcon' => $global['appleTouchIcon'],
            'themeColor' => $global['themeColor'],
            
            // Verification
            'verification' => [
                'google' => $global['googleVerification'],
                'bing' => $global['bingVerification'],
                'yandex' => $global['yandexVerification'],
            ],
            
            // Analytics
            'analytics' => [
                'googleAnalyticsId' => $global['googleAnalyticsId'],
                'googleTagManagerId' => $global['googleTagManagerId'],
            ],
            
            // Schema.org
            'schemaOrg' => $global['schemaOrg'],
        ];
    }

    /**
     * Cache key oluştur
     * Multi-tenancy için domain kullan
     */
    private function getCacheKey(): string
    {
        $domain = request()->getHost();
        return "seo_data_{$domain}";
    }

    /**
     * Cache'i temizle (SEO güncellendiğinde çağrılmalı)
     */
    public function clearCache(): void
    {
        Cache::forget($this->getCacheKey());
        self::$cachedData = null;
    }

    /**
     * Request-scope cache'i temizle (test için)
     */
    public static function resetRequestCache(): void
    {
        self::$cachedData = null;
    }

    /**
     * Generate Organization Schema for the site
     */
    public function getOrganizationSchema(): array
    {
        $global = $this->getGlobalSeo();
        $baseUrl = url('/');

        return [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => $global['siteName'],
            'url' => $baseUrl,
            'logo' => url($global['logo']),
            'description' => $global['siteDescription'],
            'sameAs' => array_filter([
                $global['twitterSite'] ? 'https://twitter.com/' . ltrim($global['twitterSite'], '@') : null,
            ]),
        ];
    }

    /**
     * Generate WebSite Schema with SearchAction
     */
    public function getWebSiteSchema(): array
    {
        $global = $this->getGlobalSeo();
        $baseUrl = url('/');

        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => $global['siteName'],
            'url' => $baseUrl,
            'description' => $global['siteDescription'],
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => [
                    '@type' => 'EntryPoint',
                    'urlTemplate' => $baseUrl . '/search?q={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ],
        ];
    }

    /**
     * Generate ItemList Schema for content collections
     * 
     * @param string $listName Name of the list (e.g., "Yazılar", "Testler")
     * @param array $items Array of items with 'name', 'url', 'description', 'image'
     */
    public function getItemListSchema(string $listName, array $items): array
    {
        $listItems = [];
        foreach ($items as $index => $item) {
            $listItem = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'item' => [
                    '@type' => 'Thing',
                    'name' => $item['name'],
                    'url' => $item['url'],
                ],
            ];

            if (!empty($item['description'])) {
                $listItem['item']['description'] = $item['description'];
            }

            if (!empty($item['image'])) {
                $listItem['item']['image'] = $item['image'];
            }

            $listItems[] = $listItem;
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'name' => $listName,
            'numberOfItems' => count($items),
            'itemListElement' => $listItems,
        ];
    }

    /**
     * Generate Article Schema for blog posts/writes
     */
    public function getArticleSchema(array $article): array
    {
        $global = $this->getGlobalSeo();
        
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $article['title'],
            'description' => $article['description'] ?? '',
            'url' => $article['url'],
            'datePublished' => $article['published_at'] ?? $article['created_at'],
            'dateModified' => $article['updated_at'] ?? $article['created_at'],
            'author' => [
                '@type' => 'Person',
                'name' => $article['author_name'] ?? $global['author'] ?? $global['siteName'],
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => $global['siteName'],
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => url($global['logo']),
                ],
            ],
        ];

        if (!empty($article['image'])) {
            $schema['image'] = $article['image'];
        }

        return $schema;
    }

    /**
     * Generate Course/Quiz Schema for tests
     */
    public function getQuizSchema(array $quiz): array
    {
        $global = $this->getGlobalSeo();

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Quiz',
            'name' => $quiz['title'],
            'description' => $quiz['description'] ?? '',
            'url' => $quiz['url'],
            'datePublished' => $quiz['published_at'] ?? $quiz['created_at'],
            'dateModified' => $quiz['updated_at'] ?? $quiz['created_at'],
            'author' => [
                '@type' => 'Organization',
                'name' => $global['siteName'],
            ],
        ];

        if (!empty($quiz['total_questions'])) {
            $schema['numberOfQuestions'] = $quiz['total_questions'];
        }

        if (!empty($quiz['time_limit'])) {
            $schema['timeRequired'] = 'PT' . $quiz['time_limit'] . 'M';
        }

        return $schema;
    }

    /**
     * Generate EducationalOccupationalCredential Schema for certificates
     */
    public function getCertificateSchema(array $certificate): array
    {
        $global = $this->getGlobalSeo();

        return [
            '@context' => 'https://schema.org',
            '@type' => 'EducationalOccupationalCredential',
            'name' => $certificate['title'],
            'description' => $certificate['description'] ?? '',
            'url' => $certificate['url'],
            'credentialCategory' => 'certificate',
            'recognizedBy' => [
                '@type' => 'Organization',
                'name' => $global['siteName'],
            ],
        ];
    }

    /**
     * Generate BreadcrumbList Schema
     */
    public function getBreadcrumbSchema(array $breadcrumbs): array
    {
        $listItems = [];
        foreach ($breadcrumbs as $index => $crumb) {
            $listItems[] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $crumb['name'],
                'item' => $crumb['url'],
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $listItems,
        ];
    }

    /**
     * Generate combined schema for homepage with all content types
     */
    public function getHomepageSchema(array $contentSummary = []): array
    {
        $schemas = [
            $this->getOrganizationSchema(),
            $this->getWebSiteSchema(),
        ];

        // Add ItemList for each content type if provided
        if (!empty($contentSummary['writes'])) {
            $schemas[] = $this->getItemListSchema('Yazılar', $contentSummary['writes']);
        }

        if (!empty($contentSummary['tests'])) {
            $schemas[] = $this->getItemListSchema('Testler', $contentSummary['tests']);
        }

        if (!empty($contentSummary['certificates'])) {
            $schemas[] = $this->getItemListSchema('Sertifikalar', $contentSummary['certificates']);
        }

        if (!empty($contentSummary['workspaces'])) {
            $schemas[] = $this->getItemListSchema('Çalışma Alanları', $contentSummary['workspaces']);
        }

        return $schemas;
    }

    /**
     * Get canonical URL for current page
     * 
     * Park edilmiş domainler ana domain'e işaret eder.
     * Bu duplicate content cezasını önler.
     * 
     * @param string|null $path Custom path (opsiyonel, default: current path)
     * @return string Full canonical URL
     */
    public function getCanonicalUrl(?string $path = null): string
    {
        $currentDomain = request()->getHost();
        $mainDomain = config('domains.main_domain', 'checkupcodes.com');
        $domainConfig = config("domains.domains.{$currentDomain}", []);
        
        // Eğer bu domain Google'da indexlenecekse, kendi URL'ini kullan
        // Değilse (parked domain), ana domain'e yönlendir
        $shouldUseMainDomain = !($domainConfig['index_in_google'] ?? false);
        
        $targetDomain = $shouldUseMainDomain ? $mainDomain : $currentDomain;
        
        // Path belirtilmemişse, mevcut path'i kullan
        if ($path === null) {
            $path = request()->path();
        }
        
        // Path'i temizle
        $path = ltrim($path, '/');
        
        // Eğer path boşsa (homepage), sadece domain döndür
        if (empty($path) || $path === '/') {
            return "https://{$targetDomain}";
        }
        
        return "https://{$targetDomain}/{$path}";
    }

    /**
     * Check if current domain should be indexed by Google
     * 
     * @return bool
     */
    public function shouldIndexInGoogle(): bool
    {
        $currentDomain = request()->getHost();
        $domainConfig = config("domains.domains.{$currentDomain}", []);
        
        return $domainConfig['index_in_google'] ?? false;
    }

    /**
     * Get domain configuration
     * 
     * @return array
     */
    public function getDomainConfig(): array
    {
        $currentDomain = request()->getHost();
        return config("domains.domains.{$currentDomain}", [
            'name' => config('app.name'),
            'type' => 'unknown',
            'index_in_google' => true,
            'features' => ['all'],
        ]);
    }
}
