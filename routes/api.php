<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SeoController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// SEO Routes
Route::get('/seo/home', [SeoController::class, 'getHomeSeo']);
Route::get('/seo/{route}', [SeoController::class, 'getSeoByRoute']);
