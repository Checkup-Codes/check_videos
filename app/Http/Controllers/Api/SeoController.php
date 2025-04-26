<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SeoService;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    protected $seoService;

    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    public function getHomeSeo()
    {
        $seoData = $this->seoService->getSeoData('home');
        return response()->json($seoData);
    }

    public function getSeoByRoute(Request $request, $route)
    {
        $seoData = $this->seoService->getSeoData($route, $request->all());
        return response()->json($seoData);
    }
}
