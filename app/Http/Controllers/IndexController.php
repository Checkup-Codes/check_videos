<?php

namespace App\Http\Controllers;

class IndexController extends Controller
{
    public function index()
    {
        return inertia(
            'Index/Index',
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
