<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\WritesCategories\WritesController;
use App\Http\Controllers\WritesCategories\CategoriesController;
use App\Http\Controllers\WritesCategories\ImageUploadController;
use App\Http\Controllers\BookmarksController;
use App\Http\Controllers\EquipmentsController;
use App\Http\Controllers\SP\SoftwareProductsController;
use App\Http\Controllers\FBVersions\VersionsController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\Projects\ProjectsController;
use App\Http\Controllers\Projects\ServicesController;
use App\Http\Controllers\Projects\CustomersController;
use App\Http\Controllers\Rendition\WordController;
use App\Http\Controllers\Rendition\LanguagePackController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WriteImageController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Middleware\CheckWriteAccess;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SeoController;

// Public Routes
Route::get('/', [IndexController::class, 'index']);
Route::get('/factory', [IndexController::class, 'factory']);
Route::get('/typescript-tutorial', [IndexController::class, 'typescriptTutorial']);

// Writes & Categories Routes (Public)
Route::resource('/writes', WritesController::class);
Route::post('/writes/{write}/draw', [WritesController::class, 'storeDraw']);
Route::delete('/writes/{write}/draw/{version}', [WritesController::class, 'destroyDraw']);
Route::resource('/categories', CategoriesController::class);
Route::get('/categories/{category}/{slug}', [CategoriesController::class, 'showByCategory'])->name('categories.showByCategory');

// Welcome Page
Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authentication Required Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Media Management
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::post('/image-upload', [ImageUploadController::class, 'upload'])->name('image.upload');
    Route::post('/write-images', [WriteImageController::class, 'store'])->name('write-images.store');
    Route::post('/write-images/order', [WriteImageController::class, 'updateOrder'])->name('write-images.updateOrder');
    Route::delete('/write-images/{writeImage}', [WriteImageController::class, 'destroy'])->name('write-images.destroy');
    Route::put('/write-images/{writeImage}', [WriteImageController::class, 'update'])->name('write-images.update');

    // Social Media Management
    Route::get('/social-media', [SocialMediaController::class, 'index'])->name('social-media.index');
    Route::post('/social-media', [SocialMediaController::class, 'store'])->name('social-media.store');
    Route::put('/social-media/{socialMedia}', [SocialMediaController::class, 'update'])->name('social-media.update');
    Route::delete('/social-media/{socialMedia}', [SocialMediaController::class, 'destroy'])->name('social-media.destroy');

    // Project Management
    Route::resource('/projects', ProjectsController::class);
    Route::resource('/services', ServicesController::class);
    Route::resource('/customers', CustomersController::class);

    // Other Resources
    Route::resource('/bookmarks', BookmarksController::class);
    Route::resource('/equipments', EquipmentsController::class);
    Route::resource('/lessons', LessonsController::class);
    Route::resource('/software-products', SoftwareProductsController::class);
    Route::resource('/versions', VersionsController::class);

    // SEO Management
    Route::get('/seo', [SeoController::class, 'edit'])->name('seo.edit');
    Route::put('/seo', [SeoController::class, 'update'])->name('seo.update');
});

// Rendition Routes
Route::group(['prefix' => 'rendition', 'as' => 'rendition.'], function () {
    // Words Management
    Route::post('words/{id}/learning-status', [WordController::class, 'updateLearningStatus'])->name('words.learning-status');
    Route::post('words/{id}/review-status', [WordController::class, 'updateReviewStatus'])->name('words.review-status');
    Route::get('words/available-for-pack/{packId}', [WordController::class, 'availableForPack'])->name('words.available-for-pack');
    Route::resource('words', WordController::class);

    // Language Packs Management
    Route::get('language-packs/{id}/words', [LanguagePackController::class, 'words'])->name('language-packs.words');
    Route::post('language-packs/{id}/words', [LanguagePackController::class, 'addWords'])->name('language-packs.add-words');
    Route::delete('language-packs/{id}/words/{wordId}', [LanguagePackController::class, 'removeWord'])->name('language-packs.remove-word');
    Route::get('language-packs/{id}/export', [LanguagePackController::class, 'export'])->name('language-packs.export');
    Route::resource('language-packs', LanguagePackController::class);
});

// Public API Routes
Route::get('/api/social-media', [SocialMediaController::class, 'getAll'])->name('social-media.all');
Route::get('/api/logo', [MediaController::class, 'getLogo'])->name('api.logo');

// SEO Routes
Route::get('/robots.txt', [App\Http\Controllers\RobotsController::class, 'generate']);
Route::get('/sitemap.xml', [App\Http\Controllers\SitemapController::class, 'generate']);

// Excalidraw Route
Route::get('/excalidraw', function () {
    return Inertia::render('Excalidraw');
});

require __DIR__ . '/auth.php';
