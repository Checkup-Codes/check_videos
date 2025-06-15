<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\WriteImage;
use App\Models\Seo;

class IndexController extends Controller
{
    private array $screenDefault;

    public function __construct()
    {
        $seo = Seo::first();
        $logo = WriteImage::where('category', 'logo')->first();
        $this->screenDefault = [
            'isMobileSidebar' => false,
            'name' => 'Index',
            'seo' => [
                'title' => $seo->title ?? 'Checkup Codes',
                'description' => $seo->description ?? 'Checkup Codes',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
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
}
