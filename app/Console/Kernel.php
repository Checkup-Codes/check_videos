<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('sitemap:generate')->daily();

        // metals:fetch is now handled directly by cron job
        // Cron: 0 9 * * * /usr/bin/php /home/u807351145/check_videos/artisan metals:fetch
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
    }
}
