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
            'seo' => $seo
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
}
