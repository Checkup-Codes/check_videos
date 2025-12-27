<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $writes = Write::select('id', 'title')
            ->orderBy('title')
            ->get();

        $uploadedImages = WriteImage::with('write:id,title')
            ->orderBy('created_at', 'desc')
            ->get();

        $logo = WriteImage::where('category', WriteImage::CATEGORY_LOGO)
            ->latest()
            ->first();

        return Inertia::render('Media/Index', [
            'writes' => $writes,
            'uploadedImages' => $uploadedImages,
            'categories' => WriteImage::getCategories(),
            'logo' => $logo,
            'screen' => $this->getScreenData(false),
        ]);
    }

    public function getLogo()
    {
        $logo = WriteImage::where('category', WriteImage::CATEGORY_LOGO)
            ->latest()
            ->first();

        /*
        if (!$logo) {
            return response()->json([
                'image_path' => '/images/checkup_codes_logo.png',
                'alt_text' => 'Default Logo',
            ]);
        }
        */

        return response()->json([
            'image_path' => $logo->image_path,
            'alt_text' => $logo->alt_text,
        ]);
    }

    /**
     * Get screen data for media pages
     * Uses SeoService for centralized data management
     * 
     * @param string|null $pageTitle
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'media',
            $pageTitle ?? 'Medya',
            null,
            $isMobile
        );
    }
}
