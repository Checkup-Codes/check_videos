<?php

use App\Http\Controllers\WriteController;
use Illuminate\Support\Facades\Route;

Route::get('v1/writes', [WriteController::class, 'index']);
