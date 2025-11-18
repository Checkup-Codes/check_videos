<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ParaPlan API endpoints
Route::prefix('paraplan')->group(function () {
    Route::get('/metals/latest', [\App\Http\Controllers\ParaPlan\MetalPriceController::class, 'latest']);
});
