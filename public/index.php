<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__ . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// Get the current host and remove www. prefix if exists
$host = $_SERVER['HTTP_HOST'] ?? '';
$host = preg_replace('/^www\./', '', $host);

// Define custom .env file path based on domain
$envFile = __DIR__ . '/../config/domains/.env.' . $host;

// Load domain-specific .env file if exists, otherwise fallback to default .env
if (file_exists($envFile)) {
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    $app->loadEnvironmentFrom('config/domains/.env.' . $host);
} else {
    $app = require_once __DIR__ . '/../bootstrap/app.php';
}

// Bootstrap Laravel and handle the request...
$app->handleRequest(Request::capture());
