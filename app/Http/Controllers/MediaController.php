<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\WriteImage;
use App\Models\Journey;
use App\Models\Certificate;
use App\Models\Workspace;
use App\Models\Seo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $writes = Write::select('id', 'title')
            ->orderBy('title')
            ->get();

        // WriteImage tablosundan resimler
        $writeImages = WriteImage::orderBy('created_at', 'desc')
            ->get()
            ->map(function ($image) {
                // Sadece 'writes' kategorisindeki resimler için ilişkili yazıyı yükle
                $relatedTitle = null;
                if ($image->category === WriteImage::CATEGORY_WRITES && $image->related_id) {
                    $write = Write::select('id', 'title')->find($image->related_id);
                    $relatedTitle = $write?->title;
                }
                
                return [
                    'id' => $image->id,
                    'source' => 'write_images',
                    'source_label' => 'Medya',
                    'category' => $image->category,
                    'category_label' => WriteImage::getCategories()[$image->category] ?? $image->category,
                    'image_path' => $image->image_path,
                    'full_url' => $image->full_url,
                    'title' => $image->title,
                    'alt_text' => $image->alt_text,
                    'related_title' => $relatedTitle,
                    'created_at' => $image->created_at,
                    'deletable' => true,
                    'editable' => true,
                ];
            });

        // Journey tablosundan resimler
        $journeyImages = Journey::whereNotNull('image')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($journey) {
                return [
                    'id' => 'journey_' . $journey->id,
                    'source' => 'journey',
                    'source_label' => 'Yolculuk',
                    'category' => 'journey',
                    'category_label' => 'Yolculuk',
                    'image_path' => '/storage/' . $journey->image,
                    'full_url' => url('/storage/' . $journey->image),
                    'title' => $journey->title,
                    'alt_text' => $journey->title,
                    'related_title' => $journey->title,
                    'created_at' => $journey->created_at,
                    'deletable' => false,
                    'editable' => false,
                ];
            });

        // Workspace tablosundan resimler
        $workspaceImages = collect();
        $workspaces = Workspace::whereNotNull('images')
            ->orderBy('created_at', 'desc')
            ->get();
        
        foreach ($workspaces as $workspace) {
            if (is_array($workspace->images)) {
                foreach ($workspace->images as $index => $imagePath) {
                    $workspaceImages->push([
                        'id' => 'workspace_' . $workspace->id . '_' . $index,
                        'source' => 'workspace',
                        'source_label' => 'Çalışma Alanı',
                        'category' => 'workspace',
                        'category_label' => 'Çalışma Alanı',
                        'image_path' => '/storage/' . $imagePath,
                        'full_url' => url('/storage/' . $imagePath),
                        'title' => 'Workspace #' . ($index + 1),
                        'alt_text' => 'Workspace Image',
                        'related_title' => 'Workspace #' . $workspace->id,
                        'created_at' => $workspace->created_at,
                        'deletable' => false,
                        'editable' => false,
                    ]);
                }
            }
        }

        // SEO tablosundan resimler
        $seoImages = collect();
        $seo = Seo::first();
        if ($seo) {
            if ($seo->favicon && $seo->favicon !== '/favicon.ico') {
                $seoImages->push([
                    'id' => 'seo_favicon',
                    'source' => 'seo',
                    'source_label' => 'SEO',
                    'category' => 'seo',
                    'category_label' => 'SEO',
                    'image_path' => $seo->favicon,
                    'full_url' => url($seo->favicon),
                    'title' => 'Favicon',
                    'alt_text' => 'Site Favicon',
                    'related_title' => 'SEO Ayarları',
                    'created_at' => $seo->updated_at,
                    'deletable' => false,
                    'editable' => false,
                ]);
            }
            if ($seo->og_image) {
                $seoImages->push([
                    'id' => 'seo_og_image',
                    'source' => 'seo',
                    'source_label' => 'SEO',
                    'category' => 'seo',
                    'category_label' => 'SEO',
                    'image_path' => $seo->og_image,
                    'full_url' => url($seo->og_image),
                    'title' => 'OG Image',
                    'alt_text' => 'Open Graph Image',
                    'related_title' => 'SEO Ayarları',
                    'created_at' => $seo->updated_at,
                    'deletable' => false,
                    'editable' => false,
                ]);
            }
            if ($seo->apple_touch_icon) {
                $seoImages->push([
                    'id' => 'seo_apple_touch',
                    'source' => 'seo',
                    'source_label' => 'SEO',
                    'category' => 'seo',
                    'category_label' => 'SEO',
                    'image_path' => $seo->apple_touch_icon,
                    'full_url' => url($seo->apple_touch_icon),
                    'title' => 'Apple Touch Icon',
                    'alt_text' => 'Apple Touch Icon',
                    'related_title' => 'SEO Ayarları',
                    'created_at' => $seo->updated_at,
                    'deletable' => false,
                    'editable' => false,
                ]);
            }
        }

        // Certificates tablosundan resimler
        $certificateImages = Certificate::whereNotNull('image')
            ->orderBy('issue_date', 'desc')
            ->get()
            ->map(function ($certificate) {
                return [
                    'id' => 'certificate_' . $certificate->id,
                    'source' => 'certificates',
                    'source_label' => 'Sertifikalar',
                    'category' => 'awards',
                    'category_label' => 'Ödüller',
                    'image_path' => $certificate->image,
                    'full_url' => url($certificate->image),
                    'title' => $certificate->title,
                    'alt_text' => $certificate->title . ' - ' . $certificate->issuer,
                    'related_title' => $certificate->issuer,
                    'created_at' => $certificate->created_at,
                    'deletable' => false,
                    'editable' => false,
                ];
            });

        // Tüm resimleri birleştir ve tarihe göre sırala
        $allImages = $writeImages
            ->concat($journeyImages)
            ->concat($workspaceImages)
            ->concat($seoImages)
            ->concat($certificateImages)
            ->sortByDesc('created_at')
            ->values();

        $logo = WriteImage::where('category', WriteImage::CATEGORY_LOGO)
            ->latest()
            ->first();

        // Kaynak filtreleri için
        $sources = [
            'write_images' => 'Medya',
            'journey' => 'Yolculuk',
            'workspace' => 'Çalışma Alanı',
            'certificates' => 'Sertifikalar',
            'seo' => 'SEO',
        ];

        return Inertia::render('Media/Index', [
            'writes' => $writes,
            'uploadedImages' => $allImages,
            'categories' => WriteImage::getCategories(),
            'sources' => $sources,
            'logo' => $logo,
            'screen' => $this->getScreenData('Medya'),
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
