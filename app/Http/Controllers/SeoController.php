<?php

namespace App\Http\Controllers;

use App\Models\Seo;
use App\Models\WritesCategories\WriteImage;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SeoController extends Controller
{
    /**
     * Display SEO settings page (edit mode)
     */
    public function edit()
    {
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

        return Inertia::render('Seo/Edit', [
            'seo' => $seo,
            'logo' => $logo,
            'screen' => $this->getScreenData('SEO Ayarları'),
            'currentDomain' => $domain,
        ]);
    }

    /**
     * Update SEO settings
     */
    public function update(Request $request)
    {
        $domain = request()->getHost();

        $validated = $request->validate([
            // Site Identity
            'site_name' => 'required|string|max:100',
            'logo' => 'nullable|string|max:500',
            'tagline' => 'nullable|string|max:255',
            'title' => 'required|string|max:70',
            'description' => 'required|string|max:160',
            'keywords' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:100',
            'language' => 'required|string|max:5',
            'locale' => 'required|string|max:10',
            
            // Open Graph
            'og_title' => 'nullable|string|max:70',
            'og_description' => 'nullable|string|max:200',
            'og_image' => 'nullable|string|max:500',
            
            // Twitter Card
            'twitter_card' => 'nullable|string|in:summary,summary_large_image,app,player',
            'twitter_site' => 'nullable|string|max:50',
            'twitter_creator' => 'nullable|string|max:50',
            
            // Icons
            'favicon' => 'nullable|string|max:500',
            'apple_touch_icon' => 'nullable|string|max:500',
            'theme_color' => 'nullable|string|max:7',
            
            // Technical SEO
            'canonical_url' => 'nullable|url|max:500',
            'robots' => 'nullable|string|max:100',
            'schema_org' => 'nullable',
            
            // Verification & Analytics
            'google_verification' => 'nullable|string|max:100',
            'bing_verification' => 'nullable|string|max:100',
            'yandex_verification' => 'nullable|string|max:100',
            'google_analytics_id' => 'nullable|string|max:50',
            'google_tag_manager_id' => 'nullable|string|max:50',
        ]);

        // Handle schema_org JSON
        if (isset($validated['schema_org']) && is_string($validated['schema_org'])) {
            $validated['schema_org'] = json_decode($validated['schema_org'], true);
        }

        // Ensure domain and route are set
        $validated['domain'] = $domain;
        $validated['route'] = 'home';

        // Use updateOrCreate to prevent duplicates
        Seo::updateOrCreate(
            ['domain' => $domain, 'route' => 'home'],
            $validated
        );

        // Clear SEO cache
        app(SeoService::class)->clearCache();

        return redirect()->back()->with('success', 'SEO ayarları başarıyla güncellendi.');
    }

    /**
     * Upload logo
     */
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpg,jpeg,png,svg,webp|max:2048',
        ]);

        $path = $request->file('logo')->store('seo', 'public');
        
        $domain = request()->getHost();
        
        // Use updateOrCreate to prevent duplicates
        Seo::updateOrCreate(
            ['domain' => $domain, 'route' => 'home'],
            ['logo' => '/storage/' . $path]
        );

        app(SeoService::class)->clearCache();

        return response()->json(['path' => '/storage/' . $path]);
    }

    /**
     * Upload favicon
     */
    public function uploadFavicon(Request $request)
    {
        $request->validate([
            'favicon' => 'required|image|mimes:ico,png,svg|max:512',
        ]);

        $path = $request->file('favicon')->store('seo', 'public');
        
        $domain = request()->getHost();
        
        // Use updateOrCreate to prevent duplicates
        Seo::updateOrCreate(
            ['domain' => $domain, 'route' => 'home'],
            ['favicon' => '/storage/' . $path]
        );

        app(SeoService::class)->clearCache();

        return response()->json(['path' => '/storage/' . $path]);
    }

    /**
     * Upload OG image
     */
    public function uploadOgImage(Request $request)
    {
        $request->validate([
            'og_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $path = $request->file('og_image')->store('seo', 'public');
        
        $domain = request()->getHost();
        
        // Use updateOrCreate to prevent duplicates
        Seo::updateOrCreate(
            ['domain' => $domain, 'route' => 'home'],
            ['og_image' => '/storage/' . $path]
        );

        app(SeoService::class)->clearCache();

        return response()->json(['path' => '/storage/' . $path]);
    }

    /**
     * Upload Apple Touch Icon
     */
    public function uploadAppleTouchIcon(Request $request)
    {
        $request->validate([
            'apple_touch_icon' => 'required|image|mimes:png|max:512',
        ]);

        $path = $request->file('apple_touch_icon')->store('seo', 'public');
        
        $domain = request()->getHost();
        
        // Use updateOrCreate to prevent duplicates
        Seo::updateOrCreate(
            ['domain' => $domain, 'route' => 'home'],
            ['apple_touch_icon' => '/storage/' . $path]
        );

        app(SeoService::class)->clearCache();

        return response()->json(['path' => '/storage/' . $path]);
    }

    /**
     * Get screen data
     */
    private function getScreenData(?string $pageTitle = null): array
    {
        return app(SeoService::class)->getScreenSeo('seo', $pageTitle);
    }
}
