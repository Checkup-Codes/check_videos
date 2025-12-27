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
            $seo = Seo::first();
            $logo = WriteImage::where('category', 'logo')->first();

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
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
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
     * Multi-tenancy için tenant_id eklenebilir
     */
    private function getCacheKey(): string
    {
        // TODO: Multi-tenancy için tenant context ekle
        // $tenantId = app('tenant')->id ?? 'default';
        // return "seo_data_{$tenantId}";
        
        return 'seo_data_global';
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
}
