<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\WriteImage;
use App\Models\Seo;

class IndexController extends Controller
{
    private array $screenDefault;

    public function __construct()
    {
        $this->screenDefault = $this->getScreenData(false);
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
     * 
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(bool $isMobile = false): array
    {
        $seo = Seo::first();
        $logo = WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'index',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}
