<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Services\SeoService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
            ],
            'app' => fn() => $this->getAppData(),
            'workspaceCount' => fn() => \App\Models\Workspace::published()->count(),
            'bookmarkCount' => fn() => \App\Models\Bookmark::count(),
        ];
    }

    /**
     * Get global app data including SEO and logo
     * Uses SeoService for centralized data management
     */
    private function getAppData(): array
    {
        $seoService = app(SeoService::class);
        $globalSeo = $seoService->getGlobalSeo();

        return [
            'name' => config('app.name'),
            'seo' => [
                'title' => $globalSeo['siteName'],
                'siteName' => $globalSeo['siteName'],
                'description' => $globalSeo['siteDescription'],
                'logo' => $globalSeo['logo'],
            ],
        ];
    }
}
