<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ClearCacheOnAuth
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        try {
            // Temizlenecek spesifik cache anahtarlarını belirtiyoruz
            $cacheKeys = [
                'categories',
                'writes',
                'writes_all'
            ];

            // Belirtilen cache anahtarlarını temizle
            foreach ($cacheKeys as $key) {
                Cache::forget($key);
            }

            // İşlem tipini belirle
            $actionType = ($event instanceof Login) ? 'Login' : 'Logout';

            // Log oluştur
            Log::info("{$actionType} işlemi sırasında cache temizlendi.");
        } catch (\Exception $e) {
            Log::error("Cache temizlenirken hata oluştu: " . $e->getMessage());
        }
    }
}
