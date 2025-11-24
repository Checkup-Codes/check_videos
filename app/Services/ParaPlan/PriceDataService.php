<?php

namespace App\Services\ParaPlan;

use App\Models\ParaPlan\CryptoPrice;
use App\Models\ParaPlan\FiatPrice;
use App\Models\ParaPlan\CommodityPrice;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PriceDataService
{
    /**
     * Track commodity symbols already handled via configured list
     *
     * @var array<string, bool>
     */
    private array $processedCommoditySymbols = [];
    /**
     * Maximum number of retry attempts for API calls
     */
    private const MAX_RETRIES = 3;

    /**
     * Delay between retries in seconds
     */
    private const RETRY_DELAY = 5;

    /**
     * Troy ounce to gram conversion factor
     */
    private const TROY_OUNCE_TO_GRAM = 31.1035;

    /**
     * Base unit used when persisting commodity prices
     */
    private const BASE_UNIT = 'gram';

    /**
     * Unit weights (in grams) for local gold products
     */
    private const UNIT_WEIGHTS = [
        'gram' => 1.0,
        'troy_ounce' => self::TROY_OUNCE_TO_GRAM,
        'full_coin' => 7.0,
        'half_coin' => 3.5,
        'quarter_coin' => 1.75,
        'unit' => 1.0,
    ];

    /**
     * Human-readable labels for each unit type
     */
    private const UNIT_LABELS = [
        'gram' => 'gram',
        'troy_ounce' => 'troy_ounce',
        'full_coin' => 'full',
        'half_coin' => 'half',
        'quarter_coin' => 'quarter',
        'unit' => 'unit',
    ];

    /**
     * Supported base currencies for API calls
     */
    private const BASE_CURRENCIES = ['USD', 'TRY'];

    /**
     * Data source identifier
     */
    private const DATA_SOURCE = 'metalpriceapi';

    /**
     * Turkey timezone (UTC+3)
     */
    private const TURKEY_TIMEZONE = 'Europe/Istanbul';

    /**
     * Get reliability score for a data source
     * Higher number = more reliable
     */
    private function getSourceReliability(string $source): int
    {
        return config("paraplan.source_reliability.{$source}", 0);
    }

    /**
     * Fetch and save all price data (commodities, crypto, fiat)
     * Fetches data from both USD and TRY base currencies and merges them
     *
     * @return array Statistics about saved data
     */
    public function fetchAndSaveAll(): array
    {
        // Reset processed tracker for each fetch cycle
        $this->processedCommoditySymbols = [];

        $stats = [
            'commodities' => ['saved' => 0, 'skipped' => 0],
            'crypto' => ['saved' => 0, 'skipped' => 0],
            'fiat' => ['saved' => 0, 'skipped' => 0],
            'errors' => [],
        ];

        // Get API configuration
        $baseUrl = config('paraplan.commodities.api.base_url');
        $apiKey = config('paraplan.commodities.api.key');

        if (empty($baseUrl) || empty($apiKey)) {
            $stats['errors'][] = 'API configuration is missing';
            return $stats;
        }

        // Fetch data from both base currencies and merge
        $mergedRates = [];
        $rateTimestamps = [];
        $priceTime = null;
        $hasData = false;

        foreach (self::BASE_CURRENCIES as $baseCurrency) {
            $response = $this->fetchWithRetry($baseUrl, [
                'api_key' => $apiKey,
                'base' => $baseCurrency,
            ]);

            if (!$response || !$response->successful()) {
                $stats['errors'][] = "Failed to fetch data from API with base currency: {$baseCurrency}";
                continue;
            }

            $data = $response->json();

            if (!isset($data['rates']) || !is_array($data['rates'])) {
                $stats['errors'][] = "Invalid API response format for base currency: {$baseCurrency}";
                continue;
            }

            // Extract timestamp for this batch (Turkey time)
            $responseTime = $this->extractTimestamp($data);

            // Merge rates and track timestamp per rate
            foreach ($data['rates'] as $rateKey => $rateValue) {
                $normalizedKey = strtoupper($rateKey);
                $mergedRates[$normalizedKey] = $rateValue;
                $rateTimestamps[$normalizedKey] = $responseTime->copy();
            }

            // Track the most recent timestamp overall as fallback
            if ($priceTime === null || $responseTime->gt($priceTime)) {
                $priceTime = $responseTime->copy();
            }

            $hasData = true;
        }

        if (!$hasData) {
            $stats['errors'][] = 'No data fetched from any base currency';
            return $stats;
        }

        // Ensure we have a fallback price time
        if ($priceTime === null) {
            $priceTime = $this->getTurkeyTime();
        }

        // Process each category with merged rates
        // Use USD as default base currency for calculations (fallback)
        $defaultBaseCurrency = 'USD';

        // Process configured symbols (existing behavior)
        $stats['commodities'] = $this->processCommodities($mergedRates, $priceTime, $defaultBaseCurrency, $rateTimestamps);
        $stats['crypto'] = $this->processCrypto($mergedRates, $priceTime, $defaultBaseCurrency, $rateTimestamps);
        $stats['fiat'] = $this->processFiat($mergedRates, $priceTime, $defaultBaseCurrency, $rateTimestamps);

        // Process all available data from API (auto-detect and save)
        $autoStats = $this->processAllAvailableData($mergedRates, $priceTime, $defaultBaseCurrency, $rateTimestamps);

        // Merge auto-detected stats with configured stats
        $stats['commodities']['saved'] += $autoStats['commodities']['saved'];
        $stats['commodities']['skipped'] += $autoStats['commodities']['skipped'];
        $stats['crypto']['saved'] += $autoStats['crypto']['saved'];
        $stats['crypto']['skipped'] += $autoStats['crypto']['skipped'];
        $stats['fiat']['saved'] += $autoStats['fiat']['saved'];
        $stats['fiat']['skipped'] += $autoStats['fiat']['skipped'];

        return $stats;
    }

    /**
     * Extract unit from provider symbol
     * Supports two formats:
     * 1. XAUTRYG (METAL+QUOTE+UNIT) -> gram
     * 2. TRYXAU (QUOTE+METAL) -> gram (default, converted from troy ounce)
     */
    /**
     * Check if provider symbol has unit suffix (G, T, H, Q)
     */
    private function hasUnitSuffix(string $providerSymbol): bool
    {
        $symbol = strtoupper($providerSymbol);
        $lastChar = substr($symbol, -1);

        // Check if last character is a unit suffix
        if (in_array($lastChar, ['G', 'T', 'H', 'Q']) && strlen($symbol) > 3) {
            // Make sure it's not just a currency code ending
            $secondLast = substr($symbol, -2, 1);
            if ($lastChar === 'G' && in_array($secondLast, ['R', 'S', 'D', 'U', 'E'])) {
                // Could be currency ending, check more carefully
                // For now, if it ends with G and has currency-like pattern, assume it's unit
                return true;
            }
            return true;
        }

        return false;
    }

    private function extractUnitFromSymbol(string $providerSymbol): string
    {
        $symbol = strtoupper($providerSymbol);

        // Check for unit suffix at the end: G=gram, T=full coin, H=half coin, Q=quarter coin
        if (str_ends_with($symbol, 'G') && strlen($symbol) > 3) {
            return 'gram';
        } elseif (str_ends_with($symbol, 'T') && strlen($symbol) > 3) {
            return 'full_coin';
        } elseif (str_ends_with($symbol, 'H') && strlen($symbol) > 3) {
            return 'half_coin';
        } elseif (str_ends_with($symbol, 'Q') && strlen($symbol) > 3) {
            return 'quarter_coin';
        }

        // Default: precious metals use troy ounce, others stay as generic unit
        return str_starts_with($symbol, 'X') ? 'troy_ounce' : 'unit';
    }

    /**
     * Convert price expressed in an arbitrary unit into gram-based price
     */
    private function convertPriceToGram(float $price, string $unitKey): float
    {
        $normalized = strtolower($unitKey);
        $weight = self::UNIT_WEIGHTS[$normalized] ?? 1.0;

        if ($weight <= 0) {
            return $price;
        }

        return $price / $weight;
    }

    /**
     * Get weight multiplier (in grams) for a unit key
     */
    private function getUnitWeight(string $unitKey): float
    {
        $normalized = strtolower($unitKey);
        return self::UNIT_WEIGHTS[$normalized] ?? 1.0;
    }

    /**
     * Convert unit key to API-friendly label
     */
    private function formatUnitLabel(string $unitKey): string
    {
        $normalized = strtolower($unitKey);
        return self::UNIT_LABELS[$normalized] ?? $normalized;
    }

    /**
     * Parse commodity symbol from API key
     * Returns: ['commodity' => 'XAU', 'quote' => 'TRY', 'unit' => 'gram', 'format' => 'COMMODITY_QUOTE_UNIT'|'QUOTE_COMMODITY']
     */
    private function parseCommodityKey(string $key): ?array
    {
        $keyUpper = strtoupper($key);
        // All commodity symbols (metals + other commodities)
        $commoditySymbols = [
            // Precious metals (X prefix)
            'XAU',
            'XAG',
            'XPT',
            'XPD',
            'XCU',
            'XRH',
            'XIR',
            'XRU',
            'XOS',
            'XRE',
            'XTA',
            'XMO',
            'XNI',
            'XZN',
            'XPB',
            'XAL',
            'XSN',
            'XCO',
            'XMN',
            'XCR',
            // Base metals and other commodities
            'ALU', // Alüminyum
            'ZNC', // Çinko
        ];
        $quotes = ['TRY', 'USD', 'EUR', 'GBP'];

        // Format 1: XAUTRYG (COMMODITY + QUOTE + UNIT)
        foreach ($commoditySymbols as $commodity) {
            if (str_starts_with($keyUpper, $commodity)) {
                $remaining = substr($keyUpper, strlen($commodity));
                foreach ($quotes as $quote) {
                    if (str_starts_with($remaining, $quote)) {
                        $unit = $this->extractUnitFromSymbol($keyUpper);
                        return [
                            'commodity' => $commodity,
                            'quote' => $quote,
                            'unit' => $unit,
                            'format' => 'COMMODITY_QUOTE_UNIT',
                        ];
                    }
                }
            }
        }

        // Format 2: TRYXAU, TRYALU (QUOTE + COMMODITY)
        foreach ($quotes as $quote) {
            if (str_starts_with($keyUpper, $quote)) {
                $remaining = substr($keyUpper, strlen($quote));
                foreach ($commoditySymbols as $commodity) {
                    if ($remaining === $commodity) {
                        // Determine unit based on commodity type
                        // Precious metals (X prefix) without unit suffix = tam (troy ounce)
                        // Other commodities = unit
                        $unit = str_starts_with($commodity, 'X') ? 'troy_ounce' : 'unit';
                        return [
                            'commodity' => $commodity,
                            'quote' => $quote,
                            'unit' => $unit,
                            'format' => 'QUOTE_COMMODITY',
                        ];
                    }
                }
            }
        }

        return null;
    }

    /**
     * Process and save commodity prices
     */
    private function processCommodities(array $rates, Carbon $priceTime, string $baseCurrency, array $rateTimestamps): array
    {
        $saved = 0;
        $skipped = 0;
        $symbols = config('paraplan.commodities.symbols', []);

        foreach ($symbols as $symbolConfig) {
            $providerSymbol = $symbolConfig['provider_symbol'];
            $symbolPriceTime = $rateTimestamps[$providerSymbol] ?? $priceTime;
            $metalCode = strtoupper($symbolConfig['base_symbol']);
            $quoteCode = strtoupper($symbolConfig['quote_currency']);

            // Try direct combination first (e.g., TRYXAU, USDXAU, XAUTRYG)
            // With merged rates, we have both TRYXAU and USDXAU available
            $directKey = $quoteCode . $metalCode;
            $pricePerOunce = null;
            $unitKey = $this->extractUnitFromSymbol($providerSymbol);
            $unit = $this->formatUnitLabel($unitKey);
            $pricePerGram = null;
            $price = null;

            // Check for unit-specific key first (e.g., XAUTRYG, XAUTRYT)
            // Format: COMMODITY+QUOTE+UNIT (e.g., XAUTRYG)
            $parsed = $this->parseCommodityKey($providerSymbol);
            if ($parsed && isset($rates[$providerSymbol]) && is_numeric($rates[$providerSymbol])) {
                // Unit-specific key found (e.g., XAUTRYG = gram price directly)
                $unitKey = $parsed['unit'];
                $unit = $this->formatUnitLabel($unitKey);
                $pricePerGram = $this->convertPriceToGram((float) $rates[$providerSymbol], $unitKey);
                $symbolPriceTime = $rateTimestamps[$providerSymbol] ?? $symbolPriceTime;
            } elseif (isset($rates[$directKey]) && is_numeric($rates[$directKey])) {
                // Direct key found (e.g., TRYXAU = 171630 means 1 XAU = 171630 TRY)
                $pricePerOunce = (float) $rates[$directKey];
                $pricePerGram = $this->convertPriceToGram($pricePerOunce, str_starts_with($metalCode, 'X') ? 'troy_ounce' : 'unit');
                $symbolPriceTime = $rateTimestamps[$directKey] ?? $symbolPriceTime;
            } else {
                // Fallback to calculation
                if (!isset($rates[$metalCode]) || !is_numeric($rates[$metalCode])) {
                    $skipped++;
                    continue;
                }

                $metalRate = (float) $rates[$metalCode];
                if ($metalRate <= 0) {
                    $skipped++;
                    continue;
                }

                $quoteRate = 1.0;
                if ($quoteCode !== $baseCurrency) {
                    if (!isset($rates[$quoteCode]) || !is_numeric($rates[$quoteCode])) {
                        $skipped++;
                        continue;
                    }
                    $quoteRate = (float) $rates[$quoteCode];
                }

                if ($quoteRate <= 0) {
                    $skipped++;
                    continue;
                }

                $pricePerOunce = (1 / $metalRate) * $quoteRate;
                if (str_starts_with($metalCode, 'X')) {
                    $pricePerGram = $pricePerOunce / self::TROY_OUNCE_TO_GRAM;
                } else {
                    $pricePerGram = $pricePerOunce;
                    $unitKey = 'unit';
                    $unit = $this->formatUnitLabel($unitKey);
                }
            }

            if ($pricePerGram !== null) {
                if ($pricePerGram <= 0 || !is_finite($pricePerGram)) {
                    $skipped++;
                    continue;
                }

                if (str_starts_with($metalCode, 'X')) {
                    $weight = $this->getUnitWeight($unitKey);
                    if ($weight <= 0) {
                        $weight = 1.0;
                        $unitKey = 'gram';
                        $unit = $this->formatUnitLabel($unitKey);
                    }
                    $price = $pricePerGram * $weight;
                } else {
                    $price = $pricePerGram;
                }

                $unit = $this->formatUnitLabel($unitKey);
            } else {
                $skipped++;
                continue;
            }

            try {
                $this->saveCommodityPrice(
                    $providerSymbol,
                    $symbolConfig['quote_currency'],
                    $symbolConfig['base_symbol'],
                    $price,
                    $unit,
                    $symbolPriceTime
                );
                $saved++;
                $this->processedCommoditySymbols[strtoupper($providerSymbol)] = true;
            } catch (\Exception $e) {
                Log::error('Failed to save commodity price', [
                    'symbol' => $providerSymbol,
                    'error' => $e->getMessage(),
                ]);
                $skipped++;
            }
        }

        return ['saved' => $saved, 'skipped' => $skipped];
    }

    /**
     * Process and save crypto prices
     */
    private function processCrypto(array $rates, Carbon $priceTime, string $baseCurrency, array $rateTimestamps): array
    {
        $saved = 0;
        $skipped = 0;
        $symbols = config('paraplan.crypto.symbols', []);

        foreach ($symbols as $symbolConfig) {
            $providerSymbol = $symbolConfig['provider_symbol'];
            $cryptoCode = strtoupper($symbolConfig['base_symbol']);
            $quoteCode = strtoupper($symbolConfig['quote_currency']);

            // Try direct combination first (e.g., TRYBTC, USDBTC)
            // With merged rates, we have both TRYBTC and USDBTC available
            $directKey = $quoteCode . $cryptoCode;
            $price = null;
            $symbolPriceTime = $priceTime;

            if (isset($rates[$directKey]) && is_numeric($rates[$directKey])) {
                // Direct key found (e.g., TRYBTC = 2850000 means 1 BTC = 2850000 TRY)
                $price = (float) $rates[$directKey];
                $symbolPriceTime = $rateTimestamps[$directKey] ?? $priceTime;
            } else {
                // Fallback to calculation
                if (!isset($rates[$cryptoCode]) || !is_numeric($rates[$cryptoCode])) {
                    $skipped++;
                    continue;
                }

                $cryptoRate = (float) $rates[$cryptoCode];
                if ($cryptoRate <= 0) {
                    $skipped++;
                    continue;
                }

                $quoteRate = 1.0;
                if ($quoteCode !== $baseCurrency) {
                    if (!isset($rates[$quoteCode]) || !is_numeric($rates[$quoteCode])) {
                        $skipped++;
                        continue;
                    }
                    $quoteRate = (float) $rates[$quoteCode];
                }

                if ($quoteRate <= 0) {
                    $skipped++;
                    continue;
                }

                // 1 crypto = (1 / cryptoRate) * quoteRate
                $price = (1 / $cryptoRate) * $quoteRate;
            }

            if ($price <= 0 || !is_finite($price)) {
                $skipped++;
                continue;
            }

            $symbolPriceTime = $symbolPriceTime ?? $priceTime;

            try {
                $this->saveCryptoPrice(
                    $providerSymbol,
                    $symbolConfig['quote_currency'],
                    $symbolConfig['base_symbol'],
                    $price,
                    $symbolPriceTime
                );
                $saved++;
            } catch (\Exception $e) {
                Log::error('Failed to save crypto price', [
                    'symbol' => $providerSymbol,
                    'error' => $e->getMessage(),
                ]);
                $skipped++;
            }
        }

        return ['saved' => $saved, 'skipped' => $skipped];
    }

    /**
     * Process and save fiat currency rates
     */
    private function processFiat(array $rates, Carbon $priceTime, string $baseCurrency, array $rateTimestamps): array
    {
        $saved = 0;
        $skipped = 0;
        $pairs = config('paraplan.fiat.pairs', []);

        foreach ($pairs as $pairConfig) {
            $providerSymbol = $pairConfig['provider_symbol'];
            $baseCode = strtoupper($pairConfig['base_currency']);
            $quoteCode = strtoupper($pairConfig['quote_currency']);

            // Try direct combination first (e.g., TRYUSD, USDTRY)
            // With merged rates, we have both TRYUSD and USDTRY available
            $directKey = $baseCode . $quoteCode;
            $rate = null;

            $symbolPriceTime = $priceTime;

            if (isset($rates[$directKey]) && is_numeric($rates[$directKey])) {
                // Direct key found: 1 base = X quote (e.g., TRYUSD = 0.0235 means 1 TRY = 0.0235 USD)
                $rate = (float) $rates[$directKey];
                $symbolPriceTime = $rateTimestamps[$directKey] ?? $symbolPriceTime;
            } else {
                // Fallback to calculation
                // If base is the API base currency, use quote rate directly
                if ($baseCode === $baseCurrency) {
                    if (!isset($rates[$quoteCode]) || !is_numeric($rates[$quoteCode])) {
                        $skipped++;
                        continue;
                    }
                    $rate = (float) $rates[$quoteCode];
                } else {
                    // Need to calculate: (1 / baseRate) * quoteRate
                    if (!isset($rates[$baseCode]) || !is_numeric($rates[$baseCode])) {
                        $skipped++;
                        continue;
                    }

                    $baseRate = (float) $rates[$baseCode];
                    if ($baseRate <= 0) {
                        $skipped++;
                        continue;
                    }

                    $quoteRate = 1.0;
                    if ($quoteCode !== $baseCurrency) {
                        if (!isset($rates[$quoteCode]) || !is_numeric($rates[$quoteCode])) {
                            $skipped++;
                            continue;
                        }
                        $quoteRate = (float) $rates[$quoteCode];
                    }

                    if ($quoteRate <= 0) {
                        $skipped++;
                        continue;
                    }

                    // 1 base = (1 / baseRate) * quoteRate
                    $rate = (1 / $baseRate) * $quoteRate;
                }
            }

            if ($rate <= 0 || !is_finite($rate)) {
                $skipped++;
                continue;
            }

            try {
                $this->saveFiatPrice(
                    $providerSymbol,
                    $pairConfig['quote_currency'],
                    $pairConfig['base_currency'],
                    $rate,
                    $symbolPriceTime
                );
                $saved++;
            } catch (\Exception $e) {
                Log::error('Failed to save fiat rate', [
                    'symbol' => $providerSymbol,
                    'error' => $e->getMessage(),
                ]);
                $skipped++;
            }
        }

        return ['saved' => $saved, 'skipped' => $skipped];
    }

    /**
     * Process all available data from API (auto-detect commodities, crypto, fiat)
     * This method automatically detects and saves all available data from API response
     */
    private function processAllAvailableData(array $rates, Carbon $priceTime, string $baseCurrency, array $rateTimestamps): array
    {
        $stats = [
            'commodities' => ['saved' => 0, 'skipped' => 0],
            'crypto' => ['saved' => 0, 'skipped' => 0],
            'fiat' => ['saved' => 0, 'skipped' => 0],
        ];

        // Known commodity symbols
        // Metals (starting with X): XAU, XAG, XPT, XPD, XCU, etc.
        // Other commodities: ALU (Alüminyum), ZNC (Çinko), etc.
        $commoditySymbols = [
            // Precious metals (X prefix)
            'XAU',
            'XAG',
            'XPT',
            'XPD',
            'XCU',
            'XRH',
            'XIR',
            'XRU',
            'XOS',
            'XRE',
            'XTA',
            'XMO',
            'XNI',
            'XZN',
            'XPB',
            'XAL',
            'XSN',
            'XCO',
            'XMN',
            'XCR',
            // Base metals and other commodities
            'ALU', // Alüminyum (Aluminum)
            'ZNC', // Çinko (Zinc)
            // Add more commodity symbols as needed
        ];

        // Known crypto symbols
        $cryptoSymbols = ['BTC', 'ETH', 'ADA', 'DOT', 'SOL', 'LTC', 'BNB', 'LINK', 'XRP', 'DOGE', 'USDC', 'USDT'];

        // Known fiat currencies (major ones)
        $fiatCurrencies = ['TRY', 'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'SGD', 'HKD', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'RUB', 'CNY', 'INR', 'KRW', 'THB', 'MYR', 'IDR', 'PHP', 'VND', 'AED', 'SAR', 'QAR', 'ILS', 'EGP', 'ZAR', 'BRL', 'MXN', 'ARS', 'CLP', 'COP', 'PEN', 'UYU', 'BOB', 'PYG', 'VES'];

        // Track already processed symbols to avoid duplicates
        $processedCommodities = [];
        $processedCrypto = [];
        $processedFiat = [];

        foreach ($rates as $key => $value) {
            if (!is_numeric($value) || $value <= 0) {
                continue;
            }

            $keyUpper = strtoupper($key);

            if (isset($this->processedCommoditySymbols[$keyUpper])) {
                continue;
            }
            $priceTimeForKey = $rateTimestamps[$keyUpper] ?? $priceTime;

            // Skip ASK/BID variants
            if (str_ends_with($keyUpper, '-ASK') || str_ends_with($keyUpper, '-BID')) {
                continue;
            }

            // Check for direct combinations (e.g., TRYXAU, TRYBTC, TRYUSD)
            // Format: QUOTEBASE (e.g., TRYXAU means 1 XAU = X TRY)
            foreach (['TRY', 'USD'] as $quote) {
                if (!str_starts_with($keyUpper, $quote)) {
                    continue;
                }

                $baseSymbol = substr($keyUpper, strlen($quote));

                // Check if it's a commodity - try parsing the key
                $parsed = $this->parseCommodityKey($keyUpper);
                if ($parsed && !isset($processedCommodities[$keyUpper])) {
                    $commodity = $parsed['commodity'];
                    $quote = $parsed['quote'];
                    $unit = $parsed['unit'];
                    $price = null;

                    if ($parsed['format'] === 'COMMODITY_QUOTE_UNIT') {
                        $price = $this->convertPriceToGram((float) $value, $parsed['unit']);
                    } else {
                        if (str_starts_with($commodity, 'X')) {
                            $pricePerOunce = (float) $value;
                            $price = $pricePerOunce / self::TROY_OUNCE_TO_GRAM;
                        } else {
                            $price = (float) $value;
                        }
                    }

                    if (is_finite($price) && $price > 0) {
                        try {
                            $this->saveCommodityPrice(
                                $keyUpper,
                                $quote,
                                $commodity,
                                $price,
                                self::BASE_UNIT,
                                $priceTimeForKey
                            );
                            $stats['commodities']['saved']++;
                            $processedCommodities[$keyUpper] = true;
                        } catch (\Exception $e) {
                            $stats['commodities']['skipped']++;
                        }
                    }
                    continue 2; // Continue to next rate key
                }

                // Also check if baseSymbol is a known commodity (already in list)
                // This handles cases where parseCommodityKey didn't match but symbol is known
                if (in_array($baseSymbol, $commoditySymbols) && !isset($processedCommodities[$keyUpper])) {
                    if (str_starts_with($baseSymbol, 'X')) {
                        $pricePerOunce = (float) $value;
                        $price = $pricePerOunce / self::TROY_OUNCE_TO_GRAM;
                    } else {
                        $price = (float) $value;
                    }

                    if (is_finite($price) && $price > 0) {
                        try {
                            $this->saveCommodityPrice(
                                $keyUpper,
                                $quote,
                                $baseSymbol,
                                $price,
                                self::BASE_UNIT,
                                $priceTimeForKey
                            );
                            $stats['commodities']['saved']++;
                            $processedCommodities[$keyUpper] = true;
                        } catch (\Exception $e) {
                            $stats['commodities']['skipped']++;
                        }
                    }
                    continue 2; // Continue to next rate key
                }

                // Auto-detect other commodities: If it's not crypto, not fiat, and starts with X or is a known commodity pattern
                // This catches any commodity symbols we might have missed
                if (
                    !in_array($baseSymbol, $cryptoSymbols) &&
                    !in_array($baseSymbol, $fiatCurrencies) &&
                    !isset($processedCommodities[$keyUpper]) &&
                    !isset($processedCrypto[$keyUpper]) &&
                    !isset($processedFiat[$keyUpper])
                ) {

                    // Check if it looks like a commodity (X prefix or known patterns)
                    if (
                        str_starts_with($baseSymbol, 'X') ||
                        in_array($baseSymbol, ['ALU', 'ZNC', 'NI'])
                    ) { // Known commodity patterns

                        $price = (float) $value;

                        if (is_finite($price) && $price > 0) {
                            if (str_starts_with($baseSymbol, 'X')) {
                                $pricePerOunce = $price;
                                $price = $pricePerOunce / self::TROY_OUNCE_TO_GRAM;
                            }

                            try {
                                $this->saveCommodityPrice(
                                    $keyUpper,
                                    $quote,
                                    $baseSymbol,
                                    $price,
                                    self::BASE_UNIT,
                                    $priceTimeForKey
                                );
                                $stats['commodities']['saved']++;
                                $processedCommodities[$keyUpper] = true;
                            } catch (\Exception $e) {
                                $stats['commodities']['skipped']++;
                            }
                        }
                        continue 2; // Continue to next rate key
                    }
                }

                // Check if it's a crypto
                if (in_array($baseSymbol, $cryptoSymbols) && !isset($processedCrypto[$baseSymbol . $quote])) {
                    $price = (float) $value;

                    if (is_finite($price) && $price > 0) {
                        try {
                            $this->saveCryptoPrice(
                                $keyUpper,
                                $quote,
                                $baseSymbol,
                                $price,
                                $priceTimeForKey
                            );
                            $stats['crypto']['saved']++;
                            $processedCrypto[$baseSymbol . $quote] = true;
                        } catch (\Exception $e) {
                            $stats['crypto']['skipped']++;
                        }
                    }
                    continue 2; // Continue to next rate key
                }

                // Check if it's a fiat pair (both base and quote are fiat currencies)
                if (in_array($baseSymbol, $fiatCurrencies) && !isset($processedFiat[$baseSymbol . $quote])) {
                    $rate = (float) $value;

                    if (is_finite($rate) && $rate > 0) {
                        try {
                            $this->saveFiatPrice(
                                $keyUpper,
                                $quote,
                                $baseSymbol,
                                $rate,
                                $priceTimeForKey
                            );
                            $stats['fiat']['saved']++;
                            $processedFiat[$baseSymbol . $quote] = true;
                        } catch (\Exception $e) {
                            $stats['fiat']['skipped']++;
                        }
                    }
                    continue 2; // Continue to next rate key
                }
            }
        }

        return $stats;
    }

    /**
     * Get current time in Turkey timezone (UTC+3)
     */
    private function getTurkeyTime(): Carbon
    {
        return Carbon::now(self::TURKEY_TIMEZONE);
    }

    /**
     * Save commodity price with reliability check
     * Only updates if new data is more recent or more reliable
     */
    private function saveCommodityPrice(string $providerSymbol, string $quoteCurrency, string $baseSymbol, float $price, string $unit, Carbon $priceTime): void
    {
        CommodityPrice::updateOrCreate(
            [
                'provider_symbol' => $providerSymbol,
                'quote_currency' => $quoteCurrency,
            ],
            [
                'base_symbol' => $baseSymbol,
                'price' => $price,
                'unit' => $unit,
                'source' => self::DATA_SOURCE,
                'price_time' => $priceTime,
                'updated_at' => $this->getTurkeyTime(),
            ]
        );
    }

    /**
     * Save crypto price with reliability check
     * Only updates if new data is more recent or more reliable
     */
    private function saveCryptoPrice(string $providerSymbol, string $quoteCurrency, string $baseSymbol, float $price, Carbon $priceTime): void
    {
        CryptoPrice::updateOrCreate(
            [
                'provider_symbol' => $providerSymbol,
                'quote_currency' => $quoteCurrency,
            ],
            [
                'base_symbol' => $baseSymbol,
                'price' => $price,
                'source' => self::DATA_SOURCE,
                'price_time' => $priceTime,
                'updated_at' => $this->getTurkeyTime(),
            ]
        );
    }

    /**
     * Save fiat price with reliability check
     * Only updates if new data is more recent or more reliable
     */
    private function saveFiatPrice(string $providerSymbol, string $quoteCurrency, string $baseCurrency, float $rate, Carbon $priceTime): void
    {
        FiatPrice::updateOrCreate(
            [
                'provider_symbol' => $providerSymbol,
                'quote_currency' => $quoteCurrency,
            ],
            [
                'base_currency' => $baseCurrency,
                'rate' => $rate,
                'source' => self::DATA_SOURCE,
                'price_time' => $priceTime,
                'updated_at' => $this->getTurkeyTime(),
            ]
        );
    }

    /**
     * Extract timestamp from API response and convert to Turkey timezone
     */
    private function extractTimestamp(array $data): Carbon
    {
        $priceTime = $this->getTurkeyTime();
        $timestampSource = 'current_time';

        $timestampFields = [
            'timestamp' => $data['timestamp'] ?? null,
            'meta.timestamp' => $data['meta']['timestamp'] ?? null,
        ];

        foreach ($timestampFields as $source => $ts) {
            if (is_numeric($ts)) {
                try {
                    // Parse timestamp and convert to Turkey timezone
                    $priceTime = Carbon::createFromTimestamp((int) $ts, 'UTC')
                        ->setTimezone(self::TURKEY_TIMEZONE);
                    $timestampSource = $source;
                    break;
                } catch (\Exception $e) {
                    // Continue to next field
                }
            }
        }

        // Fallback to last_updated_at if timestamp not found
        if ($timestampSource === 'current_time' && isset($data['meta']['last_updated_at'])) {
            try {
                $priceTime = Carbon::parse($data['meta']['last_updated_at'], 'UTC')
                    ->setTimezone(self::TURKEY_TIMEZONE);
                $timestampSource = 'meta.last_updated_at';
            } catch (\Exception $e) {
                Log::warning('Using current time as price_time - no valid timestamp found in API response', [
                    'response_keys' => array_keys($data),
                    'timestamp_fields' => $timestampFields,
                ]);
            }
        }

        if ($timestampSource === 'current_time') {
            Log::warning('No timestamp found in API response, using current Turkey time', [
                'timestamp' => $priceTime->toIso8601String(),
            ]);
        }

        return $priceTime;
    }

    /**
     * Fetch data from API with retry mechanism
     */
    private function fetchWithRetry(string $baseUrl, array $query): ?\Illuminate\Http\Client\Response
    {
        $attempt = 0;
        $lastException = null;

        while ($attempt < self::MAX_RETRIES) {
            $attempt++;

            try {
                $response = Http::timeout(30)->get($baseUrl, $query);

                if ($response->successful()) {
                    return $response;
                }

                // If it's a server error (5xx), retry
                if ($response->status() >= 500 && $attempt < self::MAX_RETRIES) {
                    Log::warning("Server error ({$response->status()}), retrying in " . self::RETRY_DELAY . " seconds...");
                    sleep(self::RETRY_DELAY);
                    continue;
                }

                // If it's a client error (4xx), don't retry
                if ($response->status() >= 400 && $response->status() < 500) {
                    return $response;
                }

                // For other errors, retry
                if ($attempt < self::MAX_RETRIES) {
                    Log::warning("Request failed with status {$response->status()}, retrying in " . self::RETRY_DELAY . " seconds...");
                    sleep(self::RETRY_DELAY);
                }
            } catch (\Exception $e) {
                $lastException = $e;
                Log::warning("Exception on attempt {$attempt}: " . $e->getMessage());

                if ($attempt < self::MAX_RETRIES) {
                    sleep(self::RETRY_DELAY);
                }
            }
        }

        if ($lastException) {
            Log::error('All retry attempts failed', [
                'exception' => $lastException->getMessage(),
                'trace' => $lastException->getTraceAsString(),
            ]);
        }

        return null;
    }
}
