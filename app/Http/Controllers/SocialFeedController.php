<?php

namespace App\Http\Controllers;

use App\Services\SocialFeedService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SocialFeedController extends Controller
{
    protected SocialFeedService $socialFeedService;

    public function __construct(SocialFeedService $socialFeedService)
    {
        $this->socialFeedService = $socialFeedService;
    }

    /**
     * Tüm sosyal medya feedlerini getir
     */
    public function index(): JsonResponse
    {
        try {
            $feeds = $this->socialFeedService->getAllFeeds();
            
            return response()->json([
                'success' => true,
                'data' => $feeds,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sosyal medya feedleri yüklenirken bir hata oluştu.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Belirli bir platform feedini getir
     */
    public function show(string $platform): JsonResponse
    {
        try {
            $method = 'get' . ucfirst($platform) . 'Feed';
            
            if (!method_exists($this->socialFeedService, $method)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Geçersiz platform.',
                ], 404);
            }

            $feed = $this->socialFeedService->$method();
            
            return response()->json([
                'success' => true,
                'data' => $feed,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Feed yüklenirken bir hata oluştu.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cache'i temizle
     */
    public function clearCache(Request $request): JsonResponse
    {
        try {
            $platform = $request->input('platform');
            $this->socialFeedService->clearCache($platform);
            
            return response()->json([
                'success' => true,
                'message' => 'Cache başarıyla temizlendi.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cache temizlenirken bir hata oluştu.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
