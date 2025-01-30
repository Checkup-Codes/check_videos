<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\IndexController;
use App\Http\Controllers\WritesCategories\WritesController;
use App\Http\Controllers\BookmarksController;
use App\Http\Controllers\EquipmentsController;
use App\Http\Controllers\WritesCategories\CategoriesController;
use App\Http\Controllers\SP\SoftwareProductsController;
use App\Http\Controllers\FBVersions\VersionsController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\Projects\ProjectsController;
use App\Http\Controllers\Projects\ServicesController;
use App\Http\Controllers\Projects\CustomersController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', [IndexController::class, 'index']);
Route::get('/factory', [IndexController::class, 'factory']);
Route::get('/typescript-tutorial', [IndexController::class, 'typescriptTutorial']);

Route::resource('/bookmarks', BookmarksController::class);
Route::resource('/software-products', SoftwareProductsController::class);

// Writes and Categories
Route::resource('/writes', WritesController::class);
Route::resource('/categories', CategoriesController::class);
Route::get('/categories/{category}/{slug}', [CategoriesController::class, 'showByCategory'])->name('categories.showByCategory');
Route::middleware('auth')->group(function () {
    Route::resource('/writes', WritesController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/categories', CategoriesController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    Route::post('/writes/{write}/draw', [WritesController::class, 'storeDraw']);
    Route::delete('/writes/{write}/draw/{version}', [WritesController::class, 'destroyDraw']);
});

Route::resource('/lessons', LessonsController::class);
Route::resource('/projects', ProjectsController::class);
Route::resource('/services', ServicesController::class);
Route::resource('/customers', CustomersController::class);

Route::middleware('auth')->group(function () {
    Route::resource('/lessons', LessonsController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/projects', ProjectsController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/services', ServicesController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/customers', CustomersController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
});

Route::resource('/equipments', EquipmentsController::class);
Route::middleware('auth')->group(function () {
    Route::resource('/equipments', EquipmentsController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
});

Route::resource('/versions', VersionsController::class);
require __DIR__ . '/auth.php';

Route::get('/excalidraw', function () {
    return Inertia::render('Excalidraw');
});

// Rendition Routes
Route::group(['prefix' => 'rendition', 'as' => 'rendition.'], function () {
    // Words
    Route::resource('words', \App\Http\Controllers\Rendition\WordController::class);
    Route::post('words/{id}/learning-status', [\App\Http\Controllers\Rendition\WordController::class, 'updateLearningStatus'])
        ->name('words.learning-status');
    Route::post('words/{id}/review-status', [\App\Http\Controllers\Rendition\WordController::class, 'updateReviewStatus'])
        ->name('words.review-status');

    // Language Packs
    Route::resource('language-packs', \App\Http\Controllers\Rendition\LanguagePackController::class);
    Route::get('language-packs/{id}/words', [\App\Http\Controllers\Rendition\LanguagePackController::class, 'words'])
        ->name('language-packs.words');
    Route::post('language-packs/{id}/words', [\App\Http\Controllers\Rendition\LanguagePackController::class, 'addWords'])
        ->name('language-packs.add-words');
    Route::delete('language-packs/{id}/words/{wordId}', [\App\Http\Controllers\Rendition\LanguagePackController::class, 'removeWord'])
        ->name('language-packs.remove-word');
});
