<?php

namespace App\Console\Commands\ParaPlan;

use App\Models\ParaPlan\MetalPrice;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

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
     * Maximum number of retry attempts for API calls
     */
    private const MAX_RETRIES = 3;

    /**
     * Delay between retries in seconds
     */
    private const RETRY_DELAY = 5;

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
            // Make HTTP request to external API with retry mechanism
            $response = $this->fetchWithRetry($baseUrl, $query);

            if (!$response) {
                $this->error('API request failed after ' . self::MAX_RETRIES . ' attempts');
                $this->sendFailureNotification('API request failed after multiple retry attempts');
                return Command::FAILURE;
            }

            if (!$response->successful()) {
                $this->error('API request failed with status: ' . $response->status());
                Log::error('Metals API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                $this->sendFailureNotification('API request failed with status: ' . $response->status());
                return Command::FAILURE;
            }

            $data = $response->json();

            // Debug: Log the actual API response to understand the format
            $this->info('API Response received. Status: ' . $response->status());

            // Extract and log timestamp information
            $apiTimestamp = $data['timestamp'] ?? null;
            $apiBase = $data['base'] ?? 'unknown';
            $timestampInfo = [];

            if ($apiTimestamp) {
                try {
                    $parsedTimestamp = Carbon::createFromTimestamp((int) $apiTimestamp);
                    $timestampInfo = [
                        'raw_timestamp' => $apiTimestamp,
                        'parsed_datetime' => $parsedTimestamp->toIso8601String(),
                        'human_readable' => $parsedTimestamp->format('Y-m-d H:i:s'),
                        'timezone' => $parsedTimestamp->timezone->getName(),
                    ];
                } catch (\Exception $e) {
                    $timestampInfo = ['raw_timestamp' => $apiTimestamp, 'parse_error' => $e->getMessage()];
                }
            }

            $this->info('API Base Currency: ' . $apiBase);
            if ($apiTimestamp) {
                $this->info('API Timestamp: ' . ($timestampInfo['human_readable'] ?? $apiTimestamp));
            } else {
                $this->warn('⚠️  No timestamp found in API response!');
            }

            Log::info('MetalpriceAPI Response', [
                'status' => $response->status(),
                'base_currency' => $apiBase,
                'timestamp' => $timestampInfo,
                'rates_count' => isset($data['rates']) ? count($data['rates']) : 0,
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
            $timestampSource = 'current_time'; // Track where timestamp came from

            $timestampFields = [
                'timestamp' => $data['timestamp'] ?? null,
                'meta.timestamp' => $data['meta']['timestamp'] ?? null,
            ];

            foreach ($timestampFields as $source => $ts) {
                if (is_numeric($ts)) {
                    try {
                        $priceTime = Carbon::createFromTimestamp((int) $ts);
                        $timestampSource = $source;
                        $this->info("Using timestamp from {$source}: {$ts} (" . $priceTime->toDateTimeString() . ")");
                        Log::info('Metal prices timestamp extracted', [
                            'source' => $source,
                            'timestamp' => $ts,
                            'parsed_time' => $priceTime->toIso8601String(),
                        ]);
                        break;
                    } catch (\Exception $e) {
                        $this->warn("Failed to parse timestamp from {$source}: " . $e->getMessage());
                    }
                }
            }

            // Fallback to last_updated_at if timestamp not found
            if ($timestampSource === 'current_time' && isset($data['meta']['last_updated_at'])) {
                try {
                    $priceTime = Carbon::parse($data['meta']['last_updated_at']);
                    $timestampSource = 'meta.last_updated_at';
                    $this->info("Using last_updated_at: " . $priceTime->toDateTimeString());
                } catch (\Exception $e) {
                    $this->warn("Failed to parse last_updated_at: " . $e->getMessage());
                    Log::warning('Using current time as price_time - no valid timestamp found in API response', [
                        'response_keys' => array_keys($data),
                        'timestamp_fields' => $timestampFields,
                    ]);
                }
            }

            // Log final timestamp being used
            if ($timestampSource === 'current_time') {
                $this->warn("⚠️  No timestamp found in API response, using current time: " . $priceTime->toDateTimeString());
            } else {
                $this->info("✓ Price time from API: " . $priceTime->toDateTimeString() . " (source: {$timestampSource})");
            }

            $savedCount = 0;
            $skippedCount = 0;

            // Process each configured symbol
            foreach ($symbols as $symbolConfig) {
                $providerSymbol = $symbolConfig['provider_symbol'];
                $metalCode = strtoupper($symbolConfig['base_symbol']);
                $quoteCode = strtoupper($symbolConfig['quote_currency']);

                // Try to use direct combination first (e.g., TRYXAU, USDXAU)
                // This is more accurate and faster than calculating
                $directKey = $quoteCode . $metalCode;
                $pricePerOunce = null;

                if (isset($data['rates'][$directKey]) && is_numeric($data['rates'][$directKey])) {
                    // Direct combination found (e.g., TRYXAU = 170893 means 1 XAU = 170893 TRY)
                    $pricePerOunce = (float) $data['rates'][$directKey];
                    $this->info("Using direct rate for {$directKey}: {$pricePerOunce}");
                } else {
                    // Fallback to calculation method
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
                }

                if ($pricePerOunce <= 0 || !is_finite($pricePerOunce)) {
                    $this->warn("Invalid price per ounce for {$providerSymbol}: {$pricePerOunce}");
                    $skippedCount++;
                    continue;
                }

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
                    $metalPrice = MetalPrice::updateOrCreate(
                        [
                            'provider_symbol' => $providerSymbol,
                            'quote_currency' => $symbolConfig['quote_currency'],
                        ],
                        [
                            'base_symbol' => $symbolConfig['base_symbol'],
                            'price' => $pricePerGram,
                            'price_time' => $priceTime, // API'nin verdiği fiyat zamanı
                            'updated_at' => now(), // Veritabanı kayıt zamanı
                        ]
                    );

                    $savedCount++;
                    $this->info("Saved price for {$providerSymbol}: {$pricePerGram} TRY/gram (price_time: {$priceTime->toDateTimeString()})");

                    Log::info('Metal price saved', [
                        'provider_symbol' => $providerSymbol,
                        'price_per_gram' => $pricePerGram,
                        'price_time' => $priceTime->toIso8601String(),
                        'price_time_source' => $timestampSource,
                    ]);
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

    /**
     * Fetch data from API with retry mechanism
     *
     * @param string $baseUrl
     * @param array $query
     * @return \Illuminate\Http\Client\Response|null
     */
    private function fetchWithRetry(string $baseUrl, array $query): ?\Illuminate\Http\Client\Response
    {
        $attempt = 0;
        $lastException = null;

        while ($attempt < self::MAX_RETRIES) {
            $attempt++;

            try {
                $this->info("API request attempt {$attempt}/" . self::MAX_RETRIES);

                $response = Http::timeout(30)->get($baseUrl, $query);

                if ($response->successful()) {
                    return $response;
                }

                // If it's a server error (5xx), retry
                if ($response->status() >= 500 && $attempt < self::MAX_RETRIES) {
                    $this->warn("Server error ({$response->status()}), retrying in " . self::RETRY_DELAY . " seconds...");
                    sleep(self::RETRY_DELAY);
                    continue;
                }

                // If it's a client error (4xx), don't retry
                if ($response->status() >= 400 && $response->status() < 500) {
                    return $response;
                }

                // For other errors, retry
                if ($attempt < self::MAX_RETRIES) {
                    $this->warn("Request failed with status {$response->status()}, retrying in " . self::RETRY_DELAY . " seconds...");
                    sleep(self::RETRY_DELAY);
                }
            } catch (\Exception $e) {
                $lastException = $e;
                $this->warn("Exception on attempt {$attempt}: " . $e->getMessage());

                if ($attempt < self::MAX_RETRIES) {
                    $this->warn("Retrying in " . self::RETRY_DELAY . " seconds...");
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

    /**
     * Send failure notification email to admin
     *
     * @param string $message
     * @return void
     */
    private function sendFailureNotification(string $message): void
    {
        try {
            $adminEmail = config('mail.from.address');

            if (!$adminEmail) {
                $this->warn('No admin email configured. Skipping notification.');
                return;
            }

            $subject = 'Metal Prices Fetch Failed - ' . config('app.name');
            $body = "The metal prices fetch command has failed.\n\n";
            $body .= "Error: {$message}\n\n";
            $body .= "Time: " . now()->toDateTimeString() . "\n";
            $body .= "Please check the logs for more details.\n\n";
            $body .= "Log file: " . storage_path('logs/laravel.log');

            Mail::raw($body, function ($mail) use ($adminEmail, $subject) {
                $mail->to($adminEmail)
                    ->subject($subject);
            });

            $this->info('Failure notification email sent to ' . $adminEmail);
        } catch (\Exception $e) {
            // Log email error but don't fail the command
            Log::warning('Failed to send failure notification email', [
                'error' => $e->getMessage(),
                'original_error' => $message,
            ]);
            $this->warn('Failed to send notification email: ' . $e->getMessage());
        }
    }
}
