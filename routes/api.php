<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ParaPlan API endpoints - All require API key authentication
Route::prefix('paraplan')->middleware(\App\Http\Middleware\ParaPlan\ValidateApiKey::class)->group(function () {
    // Metals latest prices endpoint with rate limiting (60 requests per minute)
    Route::get('/metals/latest', [\App\Http\Controllers\ParaPlan\MetalPriceController::class, 'latest'])
        ->middleware('throttle:60,1');

    // Feedback endpoint with rate limiting (5 requests per minute)
    Route::post('/feedback', [\App\Http\Controllers\ParaPlan\FeedbackController::class, 'store'])
        ->middleware('throttle:5,1');
});
