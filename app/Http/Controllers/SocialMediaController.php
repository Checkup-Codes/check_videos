<?php

namespace App\Http\Controllers;

use App\Models\UserSocialMedia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class SocialMediaController extends Controller
{
    public function index()
    {
        return Inertia::render('SocialMedia/Index', [
            'socialMedia' => UserSocialMedia::orderBy('order')
                ->get(),
            'screen' => $this->getScreenData(false)
        ]);
    }

    public function getAll(): JsonResponse
    {
        try {
            $socialMedia = UserSocialMedia::where('is_active', true)
                ->orderBy('order')
                ->get();

            return response()->json($socialMedia);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Sosyal medya linkleri yüklenirken bir hata oluştu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'platform' => 'required|string|max:255',
                'url' => 'required|url|max:255',
                'is_active' => 'boolean',
                'order' => 'integer'
            ]);

            $validated['platform'] = Str::ucfirst(strtolower($validated['platform']));

            $socialMedia = UserSocialMedia::create($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Sosyal medya linki başarıyla eklendi.',
                    'socialMedia' => $socialMedia
                ]);
            }

            return redirect()->back()
                ->with('message', 'Sosyal medya linki başarıyla eklendi.');
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Sosyal medya linki eklenirken bir hata oluştu.',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->with('error', 'Sosyal medya linki eklenirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    public function update(Request $request, UserSocialMedia $socialMedia)
    {
        try {
            $validated = $request->validate([
                'platform' => 'required|string|max:255',
                'url' => 'required|url|max:255',
                'is_active' => 'boolean',
                'order' => 'integer'
            ]);

            $validated['platform'] = Str::ucfirst(strtolower($validated['platform']));

            $socialMedia->update($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Sosyal medya linki başarıyla güncellendi.',
                    'socialMedia' => $socialMedia
                ]);
            }

            return redirect()->back()
                ->with('message', 'Sosyal medya linki başarıyla güncellendi.');
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Sosyal medya linki güncellenirken bir hata oluştu.',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->with('error', 'Sosyal medya linki güncellenirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    public function destroy(Request $request, UserSocialMedia $socialMedia)
    {
        try {
            $socialMedia->delete();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Sosyal medya linki başarıyla silindi.'
                ]);
            }

            return redirect()->back()
                ->with('message', 'Sosyal medya linki başarıyla silindi.');
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Sosyal medya linki silinirken bir hata oluştu.',
                    'error' => $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->with('error', 'Sosyal medya linki silinirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    /**
     * Get screen data for social media pages
     * Uses SeoService for centralized data management
     * 
     * @param string|null $pageTitle
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'social-media',
            $pageTitle ?? 'Sosyal Medya',
            null,
            $isMobile
        );
    }
}
