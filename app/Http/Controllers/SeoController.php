<?php

namespace App\Http\Controllers;

use App\Models\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    public function edit()
    {
        $seo = Seo::first();

        return Inertia::render('Seo/Edit', [
            'seo' => $seo,
            'screen' => $this->getScreenData(false)
        ]);
    }

    public function update(Request $request)
    {
        $seo = Seo::first();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'keywords' => 'nullable|string|max:255',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|string|max:255',
            'robots' => 'nullable|string|max:255',
            'schema_org' => 'nullable|json'
        ]);

        $seo->update($validated);

        return redirect()->back()->with('success', 'SEO ayarları başarıyla güncellendi.');
    }

    /**
     * Get screen data for SEO pages
     * 
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(bool $isMobile = false): array
    {
        $seo = Seo::first();
        $logo = \App\Models\WritesCategories\WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'seo',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}
