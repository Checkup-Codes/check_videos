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
     * 
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(bool $isMobile = false): array
    {
        $seo = \App\Models\Seo::first();
        $logo = \App\Models\WritesCategories\WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'media',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}
