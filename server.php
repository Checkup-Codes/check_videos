<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// Get the current host and remove www. prefix
$host = $_SERVER['HTTP_HOST'] ?? '';
$host = preg_replace('/^www\./', '', $host);

// Get port information
$port = $_SERVER['SERVER_PORT'] ?? '8000';

// Eklenen kod: /storage/ URL'lerini domain bazlı dizine yönlendirme
if (strpos($uri, '/storage/') === 0) {
    // Eğer localhost ise eski mantığı kullan
    if (strpos($host, 'localhost') === 0) {
        $storagePath = __DIR__ . '/storage/app/public' . str_replace('/storage', '', $uri);
    } else {
        // Domain bazlı storage path oluştur
        $storagePath = __DIR__ . '/storage/multi/' . $host . '/public' . str_replace('/storage', '', $uri);

        // Eğer domain'e özel dosya yoksa, eski storage'ı dene
        if (!file_exists($storagePath)) {
            $oldPath = __DIR__ . '/storage/app/public' . str_replace('/storage', '', $uri);
            error_log(":{$port} [storage] File not found in domain storage, trying old path: " . $oldPath);
            $storagePath = $oldPath;
        }
    }

    // Debug log with port information
    error_log(":{$port} [storage] Requested URI: " . $uri);
    error_log(":{$port} [storage] Host: " . $host);
    error_log(":{$port} [storage] Looking for file at: " . $storagePath);

    if (file_exists($storagePath)) {
        error_log(":{$port} [storage] File found at: " . $storagePath);
        header('Content-Type: ' . mime_content_type($storagePath));
        header('Cache-Control: public, max-age=31536000'); // 1 yıl cache
        readfile($storagePath);
        exit;
    } else {
        error_log(":{$port} [storage] File not found at any location");
        header("HTTP/1.0 404 Not Found");
        exit;
    }
}

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(__DIR__ . '/public' . $uri)) {
    return false;
}

require_once __DIR__ . '/public/index.php';
