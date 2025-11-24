<?php

namespace App\Http\Controllers\ParaPlan;

use App\Http\Controllers\Controller;
use App\Services\ParaPlan\PriceDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FetchPricesController extends Controller
{
    /**
     * Manually trigger price fetch (for admin/testing purposes)
     */
    public function fetch(Request $request): JsonResponse
    {
        try {
            $service = new PriceDataService();
            $stats = $service->fetchAndSaveAll();

            return response()->json([
                'success' => true,
                'message' => 'Prices fetched and saved successfully',
                'data' => [
                    'commodities' => [
                        'saved' => $stats['commodities']['saved'],
                        'skipped' => $stats['commodities']['skipped'],
                    ],
                    'crypto' => [
                        'saved' => $stats['crypto']['saved'],
                        'skipped' => $stats['crypto']['skipped'],
                    ],
                    'fiat' => [
                        'saved' => $stats['fiat']['saved'],
                        'skipped' => $stats['fiat']['skipped'],
                    ],
                ],
                'errors' => $stats['errors'] ?? [],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch prices: ' . $e->getMessage(),
            ], 500);
        }
    }
}

