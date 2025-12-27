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

        return inertia(
            'Index/Index',
            [
                'screen' => $this->screenDefault,
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
}
