<?php

namespace App\Http\Controllers\ParaPlan;

use App\Http\Controllers\Controller;
use App\Models\ParaPlan\MetalPrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MetalPriceController extends Controller
{
    /**
     * Get the latest metal prices.
     *
     * Supports optional filtering by symbols query parameter.
     * Example: /api/metals/latest?symbols=XAUTRYG,XAGUSD
     *
     * This endpoint always returns the most recent successful price records
     * from the database. If the API fetch fails, no new records are created,
     * and this endpoint naturally returns the previous successful values.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function latest(Request $request): JsonResponse
    {
        // Get all configured symbols
        $symbols = config('paraplan.metals.symbols', []);

        // Filter by requested symbols if provided
        $requestedSymbols = $request->query('symbols');
        if ($requestedSymbols) {
            $requestedSymbolsArray = explode(',', $requestedSymbols);
            $requestedSymbolsArray = array_map('trim', $requestedSymbolsArray);

            // Filter symbols config to only include requested provider_symbols
            $symbols = array_filter($symbols, function ($symbol) use ($requestedSymbolsArray) {
                return in_array($symbol['provider_symbol'], $requestedSymbolsArray);
            });
        }

        $results = [];

        $unit = 'gram';

        // Get latest price for each symbol
        foreach ($symbols as $symbolConfig) {
            $providerSymbol = $symbolConfig['provider_symbol'];

            // Get the most recent price record for this provider_symbol
            $latestPrice = MetalPrice::where('provider_symbol', $providerSymbol)
                ->orderBy('price_time', 'desc')
                ->orderBy('created_at', 'desc')
                ->first();

            if ($latestPrice) {
                $results[] = [
                    'base_symbol' => $latestPrice->base_symbol,
                    'quote_currency' => $latestPrice->quote_currency,
                    'provider_symbol' => $latestPrice->provider_symbol,
                    'price' => (string) $latestPrice->price,
                    'price_time' => $latestPrice->price_time?->toIso8601String(),
                    'updated_at' => $latestPrice->created_at->toIso8601String(),
                    'unit' => $unit,
                ];
            }
        }

        // Build supported units/metals metadata for clients
        $supportedMetals = array_values(array_unique(array_map(
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

        return response()->json([
            'data' => $results,
            'meta' => [
                'unit' => $unit,
                'supported_metals' => $supportedMetals,
                'supported_quote_currencies' => $supportedQuoteCurrencies,
                'supported_provider_symbols' => $supportedProviderSymbols,
            ],
        ]);
    }
}
