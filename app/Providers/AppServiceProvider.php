<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use App\Services\WritesCategories\WriteService;
use App\Services\WritesCategories\CategoryService;
use Illuminate\Support\Facades\Log;

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

        // Configure dynamic storage path based on domain
        $storagePath = storage_path('multi/' . $host);

        // Create domain-specific storage directory if it doesn't exist
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0755, true);
        }

        // Override storage path for this domain
        Config::set('filesystems.disks.local.root', $storagePath);

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

        // Tüm inertia response'lara yazı listesini ekle
        Inertia::share('writes', function () {
            return app(WriteService::class)->getWrites()['data'];
        });

        // Tüm inertia response'lara kategori listesini ekle
        Inertia::share('categories', function () {
            $cats = app(CategoryService::class)->getCategories()['data'];
            return $cats;
        });
    }
}
