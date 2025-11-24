<?php

namespace App\Console\Commands\ParaPlan;

use App\Services\ParaPlan\PriceDataService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class FetchPricesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'prices:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch commodity, crypto, and fiat prices from external API and store them in the database';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Fetching prices from API...');
        $this->info('Will fetch from both USD and TRY base currencies and merge the data.');

        // Check configuration
        $baseUrl = config('paraplan.commodities.api.base_url');
        $apiKey = config('paraplan.commodities.api.key');

        if (empty($baseUrl) || empty($apiKey)) {
            $this->error('API configuration is missing. Please check METALS_API_BASE_URL and METALS_API_KEY in .env');
            return Command::FAILURE;
        }

        try {
            $service = new PriceDataService();
            $stats = $service->fetchAndSaveAll();

            // Display results
            $this->info('✓ Commodities: ' . $stats['commodities']['saved'] . ' saved, ' . $stats['commodities']['skipped'] . ' skipped');
            $this->info('✓ Crypto: ' . $stats['crypto']['saved'] . ' saved, ' . $stats['crypto']['skipped'] . ' skipped');
            $this->info('✓ Fiat: ' . $stats['fiat']['saved'] . ' saved, ' . $stats['fiat']['skipped'] . ' skipped');

            // Show errors if any
            if (!empty($stats['errors'])) {
                foreach ($stats['errors'] as $error) {
                    $this->error('✗ Error: ' . $error);
                }
                $this->sendFailureNotification($stats['errors']);
                return Command::FAILURE;
            }

            // Check if all categories have data
            $totalSaved = $stats['commodities']['saved'] + $stats['crypto']['saved'] + $stats['fiat']['saved'];
            if ($totalSaved === 0) {
                $this->warn('⚠ No data was saved. Please check your configuration and API response.');
                return Command::FAILURE;
            }

            $this->info('✓ Successfully fetched and saved prices!');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Error fetching prices: ' . $e->getMessage());
            $this->sendFailureNotification([$e->getMessage()]);
            return Command::FAILURE;
        }
    }

    /**
     * Send failure notification email to admin
     */
    private function sendFailureNotification(array $errors): void
    {
        try {
            $adminEmail = config('mail.from.address');

            if (!$adminEmail) {
                $this->warn('No admin email configured. Skipping notification.');
                return;
            }

            $subject = 'Price Fetch Failed - ' . config('app.name');
            $body = "The price fetch command has failed.\n\n";
            $body .= "Errors:\n";
            foreach ($errors as $error) {
                $body .= "- {$error}\n";
            }
            $body .= "\nTime: " . now()->toDateTimeString() . "\n";
            $body .= "Please check the logs for more details.\n\n";
            $body .= "Log file: " . storage_path('logs/laravel.log');

            Mail::raw($body, function ($mail) use ($adminEmail, $subject) {
                $mail->to($adminEmail)
                    ->subject($subject);
            });

            $this->info('Failure notification email sent to ' . $adminEmail);
        } catch (\Exception $e) {
            // Log email error but don't fail the command
            $this->warn('Failed to send notification email: ' . $e->getMessage());
        }
    }
}
