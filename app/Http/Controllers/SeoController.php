<?php

namespace App\Http\Controllers;

use App\Models\Seo;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    protected $seoService;

    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    public function index()
    {
        $seo = Seo::where('route', 'home')->firstOrFail();
        return Inertia::render('Seo/Edit', [
            'seo' => $seo
        ]);
    }

    public function update(Request $request, Seo $seo)
    {
        if ($seo->route !== 'home') {
            return redirect()->route('seo.index')
                ->with('error', 'Sadece home route\'u düzenlenebilir.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'keywords' => 'nullable|string',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|string',
            'canonical_url' => 'nullable|string',
            'robots' => 'nullable|string',
            'schema_org' => 'nullable|json',
        ]);

        $this->seoService->createOrUpdateSeo($seo->route, $validated);

        return redirect()->route('seo.index')
            ->with('message', 'SEO verisi başarıyla güncellendi.');
    }

    public function getHomeSeo()
    {
        $seo = Seo::where('route', 'home')->first();

        if (!$seo) {
            return response()->json([
                'title' => 'Checkup Codes',
                'description' => 'Yazılım dünyasında size yardımcı olacak içerikler'
            ]);
        }

        return response()->json([
            'title' => $seo->title,
            'description' => $seo->description
        ]);
    }
}
