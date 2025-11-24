<?php

namespace App\Http\Controllers\ParaPlan;

use App\Http\Controllers\Controller;
use App\Models\ParaPlan\CryptoPrice;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CryptoPriceController extends Controller
{
    /**
     * Maximum age of price data in hours before warning
     */
    private const MAX_DATA_AGE_HOURS = 24;

    public function latest(Request $request): JsonResponse
    {
        // Get all configured symbols
        $symbols = config('paraplan.crypto.symbols', []);

        // Filter by requested symbols if provided
        $requestedSymbols = $request->query('symbols');
        if ($requestedSymbols) {
            $requestedSymbolsArray = array_map('trim', explode(',', $requestedSymbols));

            $symbols = array_filter($symbols, function ($symbol) use ($requestedSymbolsArray) {
                return in_array($symbol['provider_symbol'], $requestedSymbolsArray);
            });
        }

        // Create cache key based on requested symbols
        $cacheKey = 'crypto_prices_latest_' . md5(json_encode($symbols));

        // Cache for 5 minutes to reduce database load
        $results = Cache::remember($cacheKey, 300, function () use ($symbols, $request) {
            return $this->fetchLatestPrices($symbols, $request);
        });

        $supportedCryptos = array_values(array_unique(array_map(
            static fn($symbol) => $symbol['base_symbol'],
            $symbols
        )));

        $supportedQuoteCurrencies = array_values(array_unique(array_map(
            static fn($symbol) => $symbol['quote_currency'],
            $symbols
        )));

        $supportedProviderSymbols = array_values(array_unique(array_map(
            static fn($symbol) => $symbol['provider_symbol'],
            $symbols
        )));

        // Check if any data is stale
        $hasStaleData = false;
        $oldestDataAge = null;

        foreach ($results as $result) {
            if (isset($result['data_age_hours'])) {
                if ($result['data_age_hours'] > self::MAX_DATA_AGE_HOURS) {
                    $hasStaleData = true;
                }
                if ($oldestDataAge === null || $result['data_age_hours'] > $oldestDataAge) {
                    $oldestDataAge = $result['data_age_hours'];
                }
            }
        }

        return response()->json([
            'data' => array_map(function ($item) {
                // Remove internal data_age_hours from response, keep only is_stale flag
                unset($item['data_age_hours']);
                return $item;
            }, $results),
            'meta' => [
                'unit'                      => 'unit',
                'supported_cryptos'         => $supportedCryptos,
                'supported_quote_currencies' => $supportedQuoteCurrencies,
                'supported_provider_symbols' => $supportedProviderSymbols,
                'has_stale_data'            => $hasStaleData,
                'oldest_data_age_hours'     => $oldestDataAge,
                'max_data_age_hours'        => self::MAX_DATA_AGE_HOURS,
            ],
        ]);
    }

    /**
     * Fetch latest prices from database
     */
    private function fetchLatestPrices(array $symbols, ?Request $request = null): array
    {
        $results = [];
        $now = Carbon::now();

        foreach ($symbols as $symbolConfig) {
            $providerSymbol = $symbolConfig['provider_symbol'];

            $query = CryptoPrice::where('provider_symbol', $providerSymbol);

            // Filter by source if provided
            $requestedSource = $request?->query('source');
            if ($requestedSource) {
                $query->where('source', $requestedSource);
            }

            $latestPrice = $query
                ->orderBy('price_time', 'desc')
                ->orderBy('updated_at', 'desc')
                ->first();

            if ($latestPrice) {
                // Calculate data age
                $priceTime = $latestPrice->price_time ?? $latestPrice->updated_at;
                $dataAgeHours = $priceTime ? $now->diffInHours($priceTime) : null;
                $isStale = $dataAgeHours !== null && $dataAgeHours > self::MAX_DATA_AGE_HOURS;

                $results[] = [
                    'base_symbol'      => $latestPrice->base_symbol,
                    'quote_currency'   => $latestPrice->quote_currency,
                    'provider_symbol'  => $latestPrice->provider_symbol,
                    'price'            => (string) $latestPrice->price,
                    'price_time'       => $latestPrice->price_time?->toIso8601String(),
                    'price_time_unix'  => $latestPrice->price_time?->timestamp,
                    'updated_at'       => $latestPrice->updated_at?->toIso8601String(),
                    'unit'             => 'unit',
                    'source'           => $latestPrice->source ?? 'metalpriceapi',
                    'data_age_hours'   => $dataAgeHours,
                    'is_stale'         => $isStale,
                ];
            }
        }

        return $results;
    }
}
