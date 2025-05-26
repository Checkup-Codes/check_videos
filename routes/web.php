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
use App\Http\Controllers\Rendition\WordController;
use App\Http\Controllers\Rendition\LanguagePackController;
use App\Http\Middleware\CheckWriteAccess;
use App\Http\Controllers\WritesCategories\ImageUploadController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WritesCategories\WriteController;
use App\Http\Controllers\WritesCategories\CategoryController;
use App\Http\Controllers\WriteImageController;
use App\Http\Controllers\MediaController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

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
Route::resource('/writes', WritesController::class)->middleware(CheckWriteAccess::class);
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

    // WORDS özel işlemler
    Route::post('words/{id}/learning-status', [WordController::class, 'updateLearningStatus'])
        ->name('words.learning-status');

    Route::post('words/{id}/review-status', [WordController::class, 'updateReviewStatus'])
        ->name('words.review-status');

    Route::get('words/available-for-pack/{packId}', [WordController::class, 'availableForPack'])
        ->name('words.available-for-pack');

    // LANGUAGE PACKS özel işlemler
    Route::get('language-packs/{id}/words', [LanguagePackController::class, 'words'])
        ->name('language-packs.words');

    Route::post('language-packs/{id}/words', [LanguagePackController::class, 'addWords'])
        ->name('language-packs.add-words');

    Route::delete('language-packs/{id}/words/{wordId}', [LanguagePackController::class, 'removeWord'])
        ->name('language-packs.remove-word');

    Route::get('language-packs/{id}/export', [LanguagePackController::class, 'export'])
        ->name('language-packs.export');

    // RESOURCE ROUTELAR en sona!

    // Words resource
    Route::resource('words', WordController::class);

    // Language Packs resource
    Route::resource('language-packs', LanguagePackController::class);
});

Route::post('/update-words', [\App\Http\Controllers\Rendition\WordController::class, 'updateWords']);

// Resim yükleme için route ekliyorum
Route::post('/image-upload', [\App\Http\Controllers\WritesCategories\ImageUploadController::class, 'upload'])
    ->middleware(['auth'])
    ->name('image.upload');

Route::middleware(['auth', 'verified'])->group(function () {
    // ... existing routes ...

    // Media Management Routes
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');

    // Write Image Routes
    Route::post('/write-images', [WriteImageController::class, 'store'])->name('write-images.store');
    Route::post('/write-images/order', [WriteImageController::class, 'updateOrder'])->name('write-images.updateOrder');
    Route::delete('/write-images/{writeImage}', [WriteImageController::class, 'destroy'])->name('write-images.destroy');
    Route::put('/write-images/{writeImage}', [WriteImageController::class, 'update'])->name('write-images.update');
});
