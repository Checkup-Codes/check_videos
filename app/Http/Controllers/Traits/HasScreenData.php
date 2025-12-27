<?php

namespace App\Http\Controllers\Traits;

use App\Services\SeoService;

/**
 * Trait HasScreenData
 * 
 * Provides consistent screen data (SEO, logo) for all controllers.
 * Uses SeoService for centralized SEO data management.
 * This is essential for SSR and multi-tenancy support.
 * 
 * Usage:
 * 1. Add `use HasScreenData;` to your controller
 * 2. Call `$this->getScreenData('screen-name', $pageTitle, $isMobileSidebar)` in your methods
 * 
 * @package App\Http\Controllers\Traits
 */
trait HasScreenData
{
    /**
     * Get screen data with SEO information
     * 
     * @param string $screenName The name of the screen (e.g., 'journey', 'workspace')
     * @param string|null $pageTitle Page-specific title (will be: "PageTitle | SiteName")
     * @param string|null $pageDescription Page-specific description
     * @param bool $isMobileSidebar Whether to show mobile sidebar
     * @return array
     */
    protected function getScreenData(
        string $screenName,
        ?string $pageTitle = null,
        ?string $pageDescription = null,
        bool $isMobileSidebar = false
    ): array {
        return app(SeoService::class)->getScreenSeo(
            $screenName,
            $pageTitle,
            $pageDescription,
            $isMobileSidebar
        );
    }
}
