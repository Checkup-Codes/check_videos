<?php

namespace App\Http\Controllers;

class IndexController extends Controller
{
    private array $screenDefault;

    public function __construct()
    {
        $this->screenDefault = $this->getScreenData();
    }

    public function index()
    {
        $seoService = app(\App\Services\SeoService::class);
        
        // Get recent content for structured data
        $contentSummary = $this->getRecentContentForSchema();
        
        // Generate homepage schema with all content types
        $schemas = $seoService->getHomepageSchema($contentSummary);

        return inertia(
            'Index/Index',
            [
                'screen' => $this->screenDefault,
                'structuredData' => $schemas, // Pass to frontend for rendering
            ]
        );
    }

    public function factory()
    {
        return inertia('Index/Factory');
    }

    public function typescriptTutorial()
    {
        return inertia('Category/TypescriptTutorial');
    }

    public function vueTutorial()
    {
        return inertia('Category/VueTutorial');
    }

    /**
     * Get screen data for index page
     * Uses SeoService for centralized data management
     * 
     * @param string|null $pageTitle
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'index',
            $pageTitle,
            null,
            $isMobile
        );
    }

    /**
     * Get recent content for structured data schema
     * Returns top items from each content type for Google indexing
     */
    private function getRecentContentForSchema(): array
    {
        $baseUrl = url('/');
        $contentSummary = [];

        // Get recent writes (articles)
        try {
            $writes = \App\Models\WritesCategories\Write::where('status', 'published')
                ->orderBy('published_at', 'desc')
                ->limit(10)
                ->get(['id', 'title', 'slug', 'excerpt', 'featured_image'])
                ->map(function ($write) use ($baseUrl) {
                    return [
                        'name' => $write->title,
                        'url' => $baseUrl . '/writes/' . $write->slug,
                        'description' => $write->excerpt ?? '',
                        'image' => $write->featured_image ? url($write->featured_image) : null,
                    ];
                })->toArray();

            if (!empty($writes)) {
                $contentSummary['writes'] = $writes;
            }
        } catch (\Exception $e) {
            // Table might not exist in some environments
        }

        // Get recent tests
        try {
            $tests = \App\Models\Tests\Test::where('status', 'published')
                ->orderBy('published_at', 'desc')
                ->limit(10)
                ->get(['id', 'title', 'slug', 'description'])
                ->map(function ($test) use ($baseUrl) {
                    return [
                        'name' => $test->title,
                        'url' => $baseUrl . '/tests/' . $test->slug,
                        'description' => $test->description ?? '',
                    ];
                })->toArray();

            if (!empty($tests)) {
                $contentSummary['tests'] = $tests;
            }
        } catch (\Exception $e) {
            // Table might not exist
        }

        // Get recent certificates
        try {
            $certificates = \App\Models\Certificate::orderBy('created_at', 'desc')
                ->limit(10)
                ->get(['id', 'title', 'slug', 'description', 'image'])
                ->map(function ($cert) use ($baseUrl) {
                    return [
                        'name' => $cert->title,
                        'url' => $baseUrl . '/certificates/' . $cert->slug,
                        'description' => $cert->description ?? '',
                        'image' => $cert->image ? url($cert->image) : null,
                    ];
                })->toArray();

            if (!empty($certificates)) {
                $contentSummary['certificates'] = $certificates;
            }
        } catch (\Exception $e) {
            // Table might not exist
        }

        // Get workspaces
        try {
            $workspaces = \App\Models\Workspace::orderBy('created_at', 'desc')
                ->limit(10)
                ->get(['id', 'name', 'slug', 'description'])
                ->map(function ($workspace) use ($baseUrl) {
                    return [
                        'name' => $workspace->name,
                        'url' => $baseUrl . '/workspaces/' . $workspace->slug,
                        'description' => $workspace->description ?? '',
                    ];
                })->toArray();

            if (!empty($workspaces)) {
                $contentSummary['workspaces'] = $workspaces;
            }
        } catch (\Exception $e) {
            // Table might not exist
        }

        return $contentSummary;
    }
}
