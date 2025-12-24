<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Get the current host and remove www. prefix if exists
        $host = request()->getHost();
        $host = preg_replace('/^www\./', '', $host);

        // Check if we're on localhost - use normal storage for localhost, multi-tenancy for production
        $isLocalhost = strpos($host, 'localhost') === 0 || 
                       strpos($host, '127.0.0.1') === 0 ||
                       $host === 'localhost' ||
                       $host === '127.0.0.1';

        if ($isLocalhost) {
            // Localhost: use normal storage paths (storage/app/public)
            // Don't override - use default Laravel storage paths
            return;
        }

        // Production: Configure dynamic storage path based on domain
        $storagePath = storage_path('multi/' . $host);
        $publicStoragePath = $storagePath . '/public';

        // Create domain-specific storage directories if they don't exist
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0755, true);
        }
        if (!file_exists($publicStoragePath)) {
            mkdir($publicStoragePath, 0755, true);
        }

        // Override storage paths for this domain
        Config::set('filesystems.disks.local.root', $storagePath);
        Config::set('filesystems.disks.public.root', $publicStoragePath);
        
        // URL stays the same - server.php handles domain-based routing
        // Files are stored in storage/multi/{domain}/public/
        // URLs are /storage/... and server.php redirects to correct domain folder

        // WARNING: Config caching should be disabled when using dynamic storage paths
        // Add this to your .env file: CONFIG_CACHE_ENABLED=false
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        setlocale(LC_TIME, 'tr_TR.UTF-8');
        Carbon::setLocale('tr');
    }
}
