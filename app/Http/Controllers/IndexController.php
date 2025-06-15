<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\WriteImage;

class IndexController extends Controller
{
    public function index()
    {
        // Write image'den kategorisi logo olanını al
        $logo = WriteImage::where('category', 'logo')->first();

        return inertia(
            'Index/Index',
            [
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
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
