<?php

use Dotenv\Dotenv;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Determine environment file based on context (CLI or Web)
$basePath = dirname(__DIR__);
$envFile = null;

if (php_sapi_name() === 'cli') {
    // For CLI, check APP_TENANT first, then APP_ENV, or default to checkupcodes.com
    $tenant = $_ENV['APP_TENANT'] ?? getenv('APP_TENANT');
    $tenant ??= $_ENV['APP_ENV'] ?? getenv('APP_ENV');

    if (!empty($tenant)) {
        $envFile = '.env.' . $tenant;
    } else {
        // Default to checkupcodes.com if no tenant/env specified
        $envFile = '.env.checkupcodes.com';
    }
} else {
    // For Web, use HTTP_HOST to determine environment file
    $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? '';
    
    // Remove www. prefix
    $host = preg_replace('/^www\./', '', $host);
    
    // Remove port number if present (e.g., checkupcodes.com:80 -> checkupcodes.com)
    $host = preg_replace('/:\d+$/', '', $host);

    if (!empty($host)) {
        $envFile = '.env.' . $host;
    }
}

// Load environment file if specified and exists, otherwise use default .env
$resolvedEnvFile = '.env';
if ($envFile && file_exists($basePath . '/' . $envFile)) {
    $resolvedEnvFile = $envFile;
} elseif (!file_exists($basePath . '/' . $resolvedEnvFile)) {
    // If default .env doesn't exist, try the determined env file anyway
    $resolvedEnvFile = $envFile ?? '.env';
}

// Debug logging for troubleshooting (can be removed in production)
if (php_sapi_name() !== 'cli') {
    $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'unknown';
    error_log("[ENV] Host: {$host}, Determined env file: {$envFile}, Resolved: {$resolvedEnvFile}, Exists: " . (file_exists($basePath . '/' . $resolvedEnvFile) ? 'yes' : 'no'));
}

// Load environment variables before Application::configure()
// Only load if file exists, otherwise Dotenv will throw an exception
if (file_exists($basePath . '/' . $resolvedEnvFile)) {
    Dotenv::createMutable($basePath, $resolvedEnvFile)->load();
} else {
    // If no env file exists, log warning but don't fail
    // Environment variables may be set externally (e.g., via server config)
    error_log("Warning: Environment file not found: {$resolvedEnvFile} at {$basePath}. Using system environment variables.");
}

$app = Application::configure(basePath: $basePath);

return $app
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
