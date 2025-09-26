<?php
// public/index.php

// --- 1) STORAGE ÖN-CHECK: /storage/ isteklerini Laravel boot'undan önce servis et ---
// (server.php'deki logic burada, ama güvenli ve realpath ile)
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
$host = $_SERVER['HTTP_HOST'] ?? '';
$host = preg_replace('/^www\./', '', $host);

if (strpos($uri, '/storage/') === 0) {
    // /storage/ sonrası göreli yol
    $rel = substr($uri, strlen('/storage/'));
    // Güvenlik: traversal / null byte kontrolü
    if ($rel === null || strpos($rel, '..') !== false || strpos($rel, "\0") !== false) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    // İlk denenecek yol: domain bazlı (multi/host/public/...)
    if (stripos($host, 'localhost') === 0 || $host === '127.0.0.1') {
        $candidate = __DIR__ . '/../storage/app/public/' . $rel;
    } else {
        $candidate = __DIR__ . '/../storage/multi/' . $host . '/public/' . $rel;
        if (!file_exists($candidate)) {
            // fallback eski storage
            $candidate = __DIR__ . '/../storage/app/public/' . $rel;
            error_log("[storage] fallback used for host {$host}: {$candidate}");
        }
    }

    // realpath ile güvenli hale getirme
    $real = realpath($candidate);
    if ($real && is_file($real)) {
        // MIME ve cache header
        $mime = @mime_content_type($real) ?: 'application/octet-stream';
        header('Content-Type: ' . $mime);
        header('Cache-Control: public, max-age=31536000');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime($real) ?: time()) . ' GMT');
        readfile($real);
        exit;
    }

    header("HTTP/1.0 404 Not Found");
    exit;
}

// --- 2) Laravel normal bootstrap ---
// (maintenance check, autoload, app bootstrap, request handle)
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__ . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// NOTE: Domain'e göre .env seçimini bootstrap/app.php içinde yapıyoruz (DOĞRU yer).
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Handle the request
$app->handleRequest(Request::capture());
