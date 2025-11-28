<?php

// Security: Only allow execution from CLI (cronjob), not from web browser
if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    die('Access denied. This script can only be executed from command line.');
}

$path = '/home/u807351145/domains/checkupcodes.com/public_html';

// Switch to project directory
chdir($path);

// Prevent accidental rapid re-execution (runs only once every 55 minutes)
$lockDir = $path . '/storage/cron';
$lockFile = $lockDir . '/run_prices.lock';
$minInterval = 55 * 60; // seconds

if (!is_dir($lockDir)) {
    mkdir($lockDir, 0755, true);
}

$now = time();
if (file_exists($lockFile)) {
    $lastRun = (int) file_get_contents($lockFile);
    if ($lastRun && ($now - $lastRun) < $minInterval) {
        $remaining = $minInterval - ($now - $lastRun);
        $message = sprintf(
            "[%s] Skipped run_prices.php - last run %d seconds ago, %d seconds remaining.\n",
            date('Y-m-d H:i:s', $now),
            $now - $lastRun,
            $remaining
        );
        file_put_contents($path . '/cron_prices.log', $message . "\n", FILE_APPEND);
        exit;
    }
}

// Set required environment variable
putenv('APP_TENANT=checkupcodes.com');

// Execute artisan command and capture output & errors
$output = shell_exec('/usr/bin/php artisan prices:fetch 2>&1');

// Update lock file timestamp after execution
file_put_contents($lockFile, (string) time());

// Optional: Save output to a log file for debugging
file_put_contents($path . '/cron_prices.log', date("Y-m-d H:i:s") . "\n" . $output . "\n\n", FILE_APPEND);

echo $output;
