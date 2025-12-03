<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ParaPlan API endpoints - All require API key authentication
Route::prefix('paraplan')->middleware(\App\Http\Middleware\ParaPlan\ValidateApiKey::class)->group(function () {
    // Commodities latest prices endpoint with rate limiting (60 requests per minute)
    Route::get('/commodities/latest', [\App\Http\Controllers\ParaPlan\CommodityPriceController::class, 'latest'])
        ->middleware('throttle:60,1');

    // Crypto latest prices endpoint with rate limiting (60 requests per minute)
    Route::get('/crypto/latest', [\App\Http\Controllers\ParaPlan\CryptoPriceController::class, 'latest'])
        ->middleware('throttle:60,1');

    // Fiat currency rates endpoint with rate limiting (60 requests per minute)
    Route::get('/fiat/latest', [\App\Http\Controllers\ParaPlan\FiatPriceController::class, 'latest'])
        ->middleware('throttle:60,1');

    // Manual price fetch endpoint (admin/testing) - Very strict rate limiting (5 requests per hour)
    Route::post('/fetch', [\App\Http\Controllers\ParaPlan\FetchPricesController::class, 'fetch'])
        ->middleware('throttle:5,60');

    // Feedback endpoint with rate limiting (5 requests per minute)
    Route::post('/feedback', [\App\Http\Controllers\ParaPlan\FeedbackController::class, 'store'])
        ->middleware('throttle:5,1');

    // Feedback requests status endpoint with rate limiting (30 requests per minute)
    Route::post('/feedback/requests', [\App\Http\Controllers\ParaPlan\FeedbackController::class, 'getRequestsStatus'])
        ->middleware('throttle:30,1');

    // Admin message update endpoint with rate limiting (10 requests per minute)
    Route::put('/feedback/{id}/admin-message', [\App\Http\Controllers\ParaPlan\FeedbackController::class, 'updateAdminMessage'])
        ->middleware('throttle:10,1');
});
