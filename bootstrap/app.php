<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Determine environment file for CLI commands
$envFile = null;
if (php_sapi_name() === 'cli') {
    // For CLI, check APP_ENV or default to checkupcodes.com
    $appEnv = $_ENV['APP_ENV'] ?? getenv('APP_ENV');
    if ($appEnv === 'checkupcodes.com' || empty($appEnv)) {
        $envFile = '.env.checkupcodes.com';
    }
}

$app = Application::configure(basePath: dirname(__DIR__));

// Load environment file if specified
if ($envFile && file_exists(dirname(__DIR__) . '/' . $envFile)) {
    $app->loadEnvironmentFrom($envFile);
}

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
