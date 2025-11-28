<?php

$path = '/home/u807351145/domains/checkupcodes.com/public_html';

// Switch to project directory
chdir($path);

// Set required environment variable
putenv('APP_TENANT=checkupcodes.com');

// Execute artisan command and capture output & errors
$output = shell_exec('/usr/bin/php artisan prices:fetch 2>&1');

// Optional: Save output to a log file for debugging
file_put_contents($path . '/cron_prices.log', date("Y-m-d H:i:s") . "\n" . $output . "\n\n", FILE_APPEND);

echo $output;
