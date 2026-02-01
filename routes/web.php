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
use App\Http\Controllers\Projects\ProjectServiceTodoController;
use App\Http\Controllers\Rendition\WordController;
use App\Http\Controllers\Rendition\LanguagePackController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WriteImageController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\Tests\TestsController;
use App\Http\Controllers\Tests\TestCategoriesController;
use App\Http\Controllers\JourneyController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\BookmarkCategoryController;
use App\Http\Middleware\CheckWriteAccess;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SeoController;

// Public Routes
Route::get('/', [IndexController::class, 'index']);
Route::get('/factory', [IndexController::class, 'factory']);
Route::get('/join-us', function () {
    return Inertia::render('JoinUs/Index');
});
Route::get('/typescript-tutorial', [IndexController::class, 'typescriptTutorial']);

// Writes & Categories Routes (Public)
Route::resource('/writes', WritesController::class);
Route::post('/writes/{write}/draw', [WritesController::class, 'storeDraw']);
Route::delete('/writes/{write}/draw/{version}', [WritesController::class, 'destroyDraw']);
Route::resource('/categories', CategoriesController::class);
Route::get('/categories/{category}/{slug}', [CategoriesController::class, 'showByCategory'])->name('categories.showByCategory');

// Tests & Test Categories Routes (Public)
Route::resource('/tests', TestsController::class);
Route::get('/tests/{test}/take', [TestsController::class, 'take'])->name('tests.take');
Route::post('/tests/{test}/submit', [TestsController::class, 'submit'])->name('tests.submit');
Route::get('/tests/result/{result}', [TestsController::class, 'result'])->name('tests.result');
Route::resource('/test-categories', TestCategoriesController::class);

// Journey Routes (Public - View only index, show is below with proper order)
Route::get('/journey', [JourneyController::class, 'index'])->name('journey.index');

// Equipments Routes (Public - View Only)
Route::get('/equipments', [EquipmentsController::class, 'index'])->name('equipments.index');
Route::get('/equipments/{equipment}', [EquipmentsController::class, 'show'])->name('equipments.show');

// Equipments CRUD Routes (Authenticated Only)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/equipments/create', [EquipmentsController::class, 'create'])->name('equipments.create');
    Route::post('/equipments', [EquipmentsController::class, 'store'])->name('equipments.store');
    Route::get('/equipments/{equipment}/edit', [EquipmentsController::class, 'edit'])->name('equipments.edit');
    Route::put('/equipments/{equipment}', [EquipmentsController::class, 'update'])->name('equipments.update');
    Route::delete('/equipments/{equipment}', [EquipmentsController::class, 'destroy'])->name('equipments.destroy');
});

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
    Route::post('/update-words', [WordController::class, 'updateWords'])->name('update-words');

    // Social Media Management
    Route::get('/social-media', [SocialMediaController::class, 'index'])->name('social-media.index');
    Route::post('/social-media', [SocialMediaController::class, 'store'])->name('social-media.store');
    Route::put('/social-media/{socialMedia}', [SocialMediaController::class, 'update'])->name('social-media.update');
    Route::delete('/social-media/{socialMedia}', [SocialMediaController::class, 'destroy'])->name('social-media.destroy');

    // Project Management
    Route::resource('/projects', ProjectsController::class);
    Route::resource('/services', ServicesController::class);
    Route::resource('/customers', CustomersController::class);
    
    // Project Service Todos
    Route::post('/project-service-todos', [ProjectServiceTodoController::class, 'store'])->name('project-service-todos.store');
    Route::put('/project-service-todos/{id}', [ProjectServiceTodoController::class, 'update'])->name('project-service-todos.update');
    Route::delete('/project-service-todos/{id}', [ProjectServiceTodoController::class, 'destroy'])->name('project-service-todos.destroy');

    // Other Resources
    Route::resource('/lessons', LessonsController::class);
    Route::resource('/software-products', SoftwareProductsController::class);
    Route::resource('/versions', VersionsController::class);

    // Journey CRUD (Admin only)
    Route::get('/journey/create', [JourneyController::class, 'create'])->name('journey.create');
    Route::post('/journey', [JourneyController::class, 'store'])->name('journey.store');
    Route::get('/journey/{id}/edit', [JourneyController::class, 'edit'])->name('journey.edit');
    Route::put('/journey/{id}', [JourneyController::class, 'update'])->name('journey.update');
    Route::delete('/journey/{id}', [JourneyController::class, 'destroy'])->name('journey.destroy');

    // Workspace CRUD (Admin only)
    Route::get('/workspace/create', [WorkspaceController::class, 'create'])->name('workspace.create');
    Route::post('/workspace', [WorkspaceController::class, 'store'])->name('workspace.store');
    Route::get('/workspace/{id}/edit', [WorkspaceController::class, 'edit'])->name('workspace.edit');
    Route::put('/workspace/{id}', [WorkspaceController::class, 'update'])->name('workspace.update');
    Route::delete('/workspace/{id}', [WorkspaceController::class, 'destroy'])->name('workspace.destroy');

    // Bookmarks CRUD (Create/Edit/Delete requires auth, index is public)
    Route::get('/bookmarks/create', [BookmarkController::class, 'create'])->name('bookmarks.create');
    Route::post('/bookmarks', [BookmarkController::class, 'store'])->name('bookmarks.store');
    Route::get('/bookmarks/{id}/edit', [BookmarkController::class, 'edit'])->name('bookmarks.edit');
    Route::put('/bookmarks/{id}', [BookmarkController::class, 'update'])->name('bookmarks.update');
    Route::delete('/bookmarks/{id}', [BookmarkController::class, 'destroy'])->name('bookmarks.destroy');

    // Bookmark Categories CRUD (User only)
    Route::get('/bookmark-categories/create', [BookmarkCategoryController::class, 'create'])->name('bookmark-categories.create');
    Route::post('/bookmark-categories', [BookmarkCategoryController::class, 'store'])->name('bookmark-categories.store');
    Route::put('/bookmark-categories/{id}', [BookmarkCategoryController::class, 'update'])->name('bookmark-categories.update');
    Route::delete('/bookmark-categories/{id}', [BookmarkCategoryController::class, 'destroy'])->name('bookmark-categories.destroy');

    // SEO Management
    Route::get('/seo', [SeoController::class, 'edit'])->name('seo.edit');
    Route::put('/seo', [SeoController::class, 'update'])->name('seo.update');
    Route::post('/seo/favicon', [SeoController::class, 'uploadFavicon'])->name('seo.upload-favicon');
    Route::post('/seo/og-image', [SeoController::class, 'uploadOgImage'])->name('seo.upload-og-image');
    Route::post('/seo/apple-touch-icon', [SeoController::class, 'uploadAppleTouchIcon'])->name('seo.upload-apple-touch-icon');

    // Theme Management
    Route::get('/theme-management', function () {
        return Inertia::render('ThemeManagement');
    })->name('theme.management');
});

// Journey Show (Public - must be after /journey/create to avoid route conflict)
Route::get('/journey/{id}', [JourneyController::class, 'show'])->name('journey.show');

// Workspace Routes (Public index, show - must be after /workspace/create to avoid route conflict)
Route::get('/workspace', [WorkspaceController::class, 'index'])->name('workspace.index');
Route::get('/workspace/{id}', [WorkspaceController::class, 'show'])->name('workspace.show');

// Bookmarks Routes (Public - must be after /bookmarks/create to avoid route conflict)
Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');
Route::get('/bookmarks/{id}', [BookmarkController::class, 'show'])->name('bookmarks.show');

// Rendition Routes
Route::group(['prefix' => 'rendition', 'as' => 'rendition.'], function () {
    // Words Management
    Route::post('words/bulk-store', [WordController::class, 'bulkStore'])->name('words.bulk-store');
    Route::post('words/bulk-add-to-packs', [WordController::class, 'bulkAddToPacks'])->name('words.bulk-add-to-packs');
    Route::post('words/check-duplicate', [WordController::class, 'checkDuplicate'])->name('words.check-duplicate');
    Route::post('words/search', [WordController::class, 'searchWord'])->name('words.search');
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
Route::get('/api/categories/{category}/writes', [CategoriesController::class, 'getWrites'])->name('api.categories.writes');
Route::get('/api/search', [WritesController::class, 'search'])->name('api.search');
Route::get('/api/write-images', [WriteImageController::class, 'index'])->name('api.write-images.index');

// Write Lazy Loading API Routes (Performance optimization)
Route::get('/api/writes/{slug}/content', [WritesController::class, 'getWriteContent'])->name('api.writes.content');
Route::get('/api/writes/sidebar-data', [WritesController::class, 'getSidebarData'])->name('api.writes.sidebar');

// SEO Routes
Route::get('/robots.txt', [App\Http\Controllers\RobotsController::class, 'generate']);
Route::get('/sitemap.xml', [App\Http\Controllers\SitemapController::class, 'generate']);

// Excalidraw Route
Route::get('/excalidraw', function () {
    return Inertia::render('Excalidraw');
});

require __DIR__ . '/auth.php';
