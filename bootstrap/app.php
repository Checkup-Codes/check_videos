<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$basePath = dirname(__DIR__);

$app = Application::configure(basePath: $basePath)
    ->withRouting(
        web: $basePath . '/routes/web.php',
        commands: $basePath . '/routes/console.php',
        api: $basePath . '/routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        // diğer middleware ayarların...
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // exception ayarların...
    })
    ->create();

/**
 * --- Domain'e göre .env seçimi ---
 * Örn: .env.checkupcodes.com, .env.elselif.com, .env.yusufdur.com
 * Not: Bu kısım return'den ÖNCE olmalı.
 */
$host = $_SERVER['HTTP_HOST'] ?? 'local';
$host = preg_replace('/^www\./', '', $host);

$envFile = ".env.$host";
if (is_file($basePath . DIRECTORY_SEPARATOR . $envFile)) {
    // Dosya proje kökünde olduğu sürece sadece adı yeterli
    $app->loadEnvironmentFrom($envFile);
    // İstersen log düşmek için:
    // error_log("[bootstrap] Using env file: $envFile");
} else {
    // İsteğe bağlı uyarı (prod'da sessiz kalmak isteyebilirsin)
    // error_log("[bootstrap] $envFile not found, using default .env");
}

return $app;
