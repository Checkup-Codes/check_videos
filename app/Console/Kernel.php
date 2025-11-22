<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('sitemap:generate')->daily();

        // Fetch metal prices multiple times per day for fresh data
        // Schedule at 09:00, 13:00, and 17:00 daily
        $schedule->command('metals:fetch')
            ->dailyAt('09:00')
            ->onFailure(function () {
                \Illuminate\Support\Facades\Log::error('Metal prices fetch failed at 09:00');
            });

        $schedule->command('metals:fetch')
            ->dailyAt('13:00')
            ->onFailure(function () {
                \Illuminate\Support\Facades\Log::error('Metal prices fetch failed at 13:00');
            });

        $schedule->command('metals:fetch')
            ->dailyAt('17:00')
            ->onFailure(function () {
                \Illuminate\Support\Facades\Log::error('Metal prices fetch failed at 17:00');
            });

        // Note: If you prefer using system cron instead of Laravel scheduler,
        // you can comment out the above and use:
        // 0 9,13,17 * * * /usr/bin/php /path/to/artisan metals:fetch
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
    }
}
