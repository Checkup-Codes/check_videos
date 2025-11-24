<?php

namespace App\Http\Controllers\ParaPlan;

use App\Http\Controllers\Controller;
use App\Models\ParaPlan\FiatPrice;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FiatPriceController extends Controller
{
    /**
     * Maximum age of price data in hours before warning
     */
    private const MAX_DATA_AGE_HOURS = 24;

    public function latest(Request $request): JsonResponse
    {
        // Get all configured pairs
        $pairs = config('paraplan.fiat.pairs', []);

        // Filter by requested symbols if provided
        $requestedSymbols = $request->query('symbols');
        if ($requestedSymbols) {
            $requestedSymbolsArray = array_map('trim', explode(',', $requestedSymbols));

            $pairs = array_filter($pairs, function ($pair) use ($requestedSymbolsArray) {
                return in_array($pair['provider_symbol'], $requestedSymbolsArray);
            });
        }

        // Create cache key based on requested pairs
        $cacheKey = 'fiat_prices_latest_' . md5(json_encode($pairs));

        // Cache for 5 minutes to reduce database load
        $results = Cache::remember($cacheKey, 300, function () use ($pairs, $request) {
            return $this->fetchLatestRates($pairs, $request);
        });

        $supportedBaseCurrencies = array_values(array_unique(array_map(
            static fn($pair) => $pair['base_currency'],
            $pairs
        )));

        $supportedQuoteCurrencies = array_values(array_unique(array_map(
            static fn($pair) => $pair['quote_currency'],
            $pairs
        )));

        $supportedProviderSymbols = array_values(array_unique(array_map(
            static fn($pair) => $pair['provider_symbol'],
            $pairs
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
                'unit'                      => 'rate',
                'supported_base_currencies' => $supportedBaseCurrencies,
                'supported_quote_currencies' => $supportedQuoteCurrencies,
                'supported_provider_symbols' => $supportedProviderSymbols,
                'has_stale_data'            => $hasStaleData,
                'oldest_data_age_hours'     => $oldestDataAge,
                'max_data_age_hours'        => self::MAX_DATA_AGE_HOURS,
            ],
        ]);
    }

    /**
     * Fetch latest rates from database
     */
    private function fetchLatestRates(array $pairs, ?Request $request = null): array
    {
        $results = [];
        $now = Carbon::now();

        foreach ($pairs as $pairConfig) {
            $providerSymbol = $pairConfig['provider_symbol'];

            $query = FiatPrice::where('provider_symbol', $providerSymbol);

            // Filter by source if provided
            $requestedSource = $request?->query('source');
            if ($requestedSource) {
                $query->where('source', $requestedSource);
            }

            $latestRate = $query
                ->orderBy('price_time', 'desc')
                ->orderBy('updated_at', 'desc')
                ->first();

            if ($latestRate) {
                // Calculate data age
                $priceTime = $latestRate->price_time ?? $latestRate->updated_at;
                $dataAgeHours = $priceTime ? $now->diffInHours($priceTime) : null;
                $isStale = $dataAgeHours !== null && $dataAgeHours > self::MAX_DATA_AGE_HOURS;

                $results[] = [
                    'base_currency'    => $latestRate->base_currency,
                    'quote_currency'   => $latestRate->quote_currency,
                    'provider_symbol'  => $latestRate->provider_symbol,
                    'rate'             => (string) $latestRate->rate,
                    'price_time'       => $latestRate->price_time?->toIso8601String(),
                    'price_time_unix'  => $latestRate->price_time?->timestamp,
                    'updated_at'       => $latestRate->updated_at?->toIso8601String(),
                    'unit'             => 'rate',
                    'source'           => $latestRate->source ?? 'metalpriceapi',
                    'data_age_hours'   => $dataAgeHours,
                    'is_stale'         => $isStale,
                ];
            }
        }

        return $results;
    }
}
