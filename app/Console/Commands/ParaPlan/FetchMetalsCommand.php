<?php

namespace App\Console\Commands\ParaPlan;

use App\Models\ParaPlan\MetalPrice;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchMetalsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'metals:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch metal prices from external API and store them in the database';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Fetching metal prices from API...');

        $symbols = config('paraplan.metals.symbols');
        if (empty($symbols)) {
            $this->error('No metal symbols configured in config/metals.php');
            return Command::FAILURE;
        }

        $baseUrl = config('paraplan.metals.api.base_url');
        $apiKey = config('paraplan.metals.api.key');
        $baseCurrency = strtoupper(config('paraplan.metals.api.base_currency'));

        if (empty($baseUrl) || empty($apiKey) || empty($baseCurrency)) {
            $this->error('METALS_API_BASE_URL, METALS_API_KEY, or METALS_API_BASE_CURRENCY is not configured in .env');
            return Command::FAILURE;
        }

        // Determine which currency codes we need from the provider response
        $currencies = [];
        foreach ($symbols as $symbolConfig) {
            foreach (['base_symbol', 'quote_currency'] as $key) {
                $code = strtoupper($symbolConfig[$key]);

                if ($code === $baseCurrency) {
                    continue;
                }

                if (!in_array($code, $currencies, true)) {
                    $currencies[] = $code;
                }
            }
        }

        $query = [
            'api_key' => $apiKey,
            'base' => $baseCurrency,
        ];

        if (!empty($currencies)) {
            $query['currencies'] = implode(',', $currencies);
        }

        try {
            // Make HTTP request to external API (MetalpriceAPI / MetalsAPI compatible structure)
            $response = Http::get($baseUrl, $query);

            if (!$response->successful()) {
                $this->error('API request failed with status: ' . $response->status());
                Log::error('Metals API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return Command::FAILURE;
            }

            $data = $response->json();

            // Debug: Log the actual API response to understand the format
            $this->info('API Response received. Status: ' . $response->status());
            Log::info('MetalpriceAPI Response', [
                'status' => $response->status(),
                'body' => $response->body(),
                'json' => $data,
            ]);

            // ============================================================
            // IMPORTANT: JSON MAPPING SECTION
            // ============================================================
            // The following code assumes a specific JSON response format.
            // You MUST adapt this section based on the actual API response
            // structure from your metals API provider.
            //
            // MetalpriceAPI format:
            // {
            //   "success": true,
            //   "timestamp": 1731920400,
            //   "base": "USD",
            //   "rates": {
            //     "XAU": 0.00043,
            //     "XAG": 0.035,
            //     "TRY": 33.2,
            //     "EUR": 0.93
            //   }
            // }
            //
            // If your API uses a different structure, modify the code below
            // accordingly. Look for the sections marked with "ADAPT THIS"
            // comments.
            // ============================================================

            // Check for success field (MetalpriceAPI uses 'success' field)
            if (isset($data['success']) && $data['success'] === false) {
                $errorMsg = $data['error']['message'] ?? $data['error']['info'] ?? 'API request failed';
                $errorCode = $data['error']['statusCode'] ?? null;

                // If error mentions specific metals requiring paid plan, log and fail
                if (str_contains(strtolower($errorMsg), 'paid plan') || str_contains(strtolower($errorMsg), 'requires')) {
                    $this->error('API Error: ' . $errorMsg);
                    $this->error('Some metals in your config require a paid plan. Please remove them from config/metals.php');
                    Log::error('MetalpriceAPI Error - Paid Plan Required', [
                        'error' => $data['error'],
                        'message' => $errorMsg,
                    ]);
                    return Command::FAILURE;
                }

                $this->error('API returned success=false: ' . $errorMsg);
                Log::error('MetalpriceAPI returned failure', ['response' => $data]);
                return Command::FAILURE;
            }

            if (!isset($data['rates']) || !is_array($data['rates'])) {
                $this->error('Invalid API response format: missing or invalid "rates" field');
                $this->error('Response keys: ' . implode(', ', array_keys($data ?? [])));
                Log::error('Invalid metals API response format', ['response' => $data]);
                return Command::FAILURE;
            }

            // Extract timestamp from response (ADAPT THIS if your API uses different field name)
            $priceTime = now();
            $timestampFields = [
                $data['timestamp'] ?? null,
                $data['meta']['timestamp'] ?? null,
            ];

            foreach ($timestampFields as $ts) {
                if (is_numeric($ts)) {
                    $priceTime = Carbon::createFromTimestamp((int) $ts);
                    break;
                }
            }

            if (isset($data['meta']['last_updated_at']) && empty($timestampFields[0]) && empty($timestampFields[1])) {
                try {
                    $priceTime = Carbon::parse($data['meta']['last_updated_at']);
                } catch (\Exception $e) {
                    // Ignore parse failures and fall back to now()
                }
            }

            $savedCount = 0;
            $skippedCount = 0;

            // Process each configured symbol
            foreach ($symbols as $symbolConfig) {
                $providerSymbol = $symbolConfig['provider_symbol'];
                $metalCode = strtoupper($symbolConfig['base_symbol']);
                $quoteCode = strtoupper($symbolConfig['quote_currency']);

                if (!isset($data['rates'][$metalCode]) || !is_numeric($data['rates'][$metalCode])) {
                    $this->warn("No valid rate returned for base symbol: {$metalCode}");
                    $skippedCount++;
                    continue;
                }

                $metalRate = (float) $data['rates'][$metalCode];

                if ($metalRate <= 0) {
                    $this->warn("Invalid (<=0) rate for {$metalCode}: {$metalRate}");
                    $skippedCount++;
                    continue;
                }

                // Determine quote currency rate relative to base currency
                $quoteRate = 1.0;
                if ($quoteCode !== $baseCurrency) {
                    if (!isset($data['rates'][$quoteCode]) || !is_numeric($data['rates'][$quoteCode])) {
                        $this->warn("No valid rate returned for quote currency: {$quoteCode}");
                        $skippedCount++;
                        continue;
                    }

                    $quoteRate = (float) $data['rates'][$quoteCode];
                }

                if ($quoteRate <= 0) {
                    $this->warn("Invalid (<=0) rate for {$quoteCode}: {$quoteRate}");
                    $skippedCount++;
                    continue;
                }

                // Provider returns amount of target currency per 1 base currency (e.g. USD -> XAU)
                // We need the price of 1 base metal unit in the quote currency:
                // (baseCurrency per metal) * (quoteCurrency per baseCurrency)
                // Note: API returns prices in troy ounces, we convert to grams
                $pricePerOunce = (1 / $metalRate) * $quoteRate;

                // Convert from troy ounce to gram (1 troy ounce = 31.1035 grams)
                $troyOunceToGram = 31.1035;
                $pricePerGram = $pricePerOunce / $troyOunceToGram;

                if (!is_finite($pricePerGram)) {
                    $this->warn("Calculated price is invalid for {$providerSymbol}");
                    $skippedCount++;
                    continue;
                }

                try {
                    // Update existing record or create a new one (price stored per gram)
                    MetalPrice::updateOrCreate(
                        [
                            'provider_symbol' => $providerSymbol,
                            'quote_currency' => $symbolConfig['quote_currency'],
                        ],
                        [
                            'base_symbol' => $symbolConfig['base_symbol'],
                            'price' => $pricePerGram,
                            'price_time' => $priceTime,
                        ]
                    );

                    $savedCount++;
                    $this->info("Saved price for {$providerSymbol}: {$pricePerGram} (per gram)");
                } catch (\Exception $e) {
                    $this->error("Failed to save price for {$providerSymbol}: " . $e->getMessage());
                    Log::error("Failed to save metal price", [
                        'symbol' => $providerSymbol,
                        'error' => $e->getMessage(),
                    ]);
                    $skippedCount++;
                }
            }

            $this->info("Successfully saved {$savedCount} metal price(s). Skipped {$skippedCount}.");
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Error fetching metal prices: ' . $e->getMessage());
            Log::error('Error in FetchMetalsCommand', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return Command::FAILURE;
        }
    }
}
