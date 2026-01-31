<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\Category;
use App\Services\WritesCategories\WriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class WritesController extends Controller
{
    private $writeService;

    public function __construct(WriteService $writeService)
    {
        $this->writeService = $writeService;
    }

    /**
     * Display a listing of writes
     * Index sayfası sidebar verilerini de gönderir (ilk yükleme için cache'lenir)
     * 
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $searchQuery = $request->get('search', '');
        $isAdmin = Auth::check();
        
        // If there's a search query, show search results page
        if ($searchQuery) {
            return $this->searchResults($request);
        }
        
        $writesResult = $this->writeService->getWrites();
        $categoriesResult = $this->writeService->getCategories();

        return inertia('WritesCategories/Writes/IndexWrite', [
            'writes'     => $writesResult['data'],
            'categories' => $categoriesResult['data'],
            'screen'     => $this->writeService->getScreenData('Yazılar', true),
            'isAdmin'    => $isAdmin
        ]);
    }
    
    /**
     * Show search results page
     * 
     * @param Request $request
     * @return \Inertia\Response
     */
    private function searchResults(Request $request)
    {
        $searchQuery = $request->get('search', '');
        $isAdmin = Auth::check();
        
        // Perform search
        $articlesQuery = Write::where(function ($q) use ($searchQuery) {
            $q->where('title', 'LIKE', "%{$searchQuery}%")
                ->orWhere('summary', 'LIKE', "%{$searchQuery}%")
                ->orWhere('content', 'LIKE', "%{$searchQuery}%")
                ->orWhere('tags', 'LIKE', "%{$searchQuery}%");
        });

        // Filter by status based on login status
        if ($isAdmin) {
            $articlesQuery->whereIn('status', ['published', 'draft', 'private', 'link_only']);
        } else {
            $articlesQuery->where('status', 'published');
        }

        $articles = $articlesQuery
            ->with('category')
            ->paginate(12)
            ->through(function ($write) {
                return [
                    'id' => $write->id,
                    'title' => $write->title,
                    'slug' => $write->slug,
                    'summary' => $write->summary,
                    'excerpt' => $write->summary ?: Str::limit(strip_tags($write->content), 150),
                    'published_at' => $write->published_at,
                    'category' => $write->category ? [
                        'id' => $write->category->id,
                        'name' => $write->category->name,
                        'slug' => $write->category->slug,
                    ] : null,
                    'url' => route('writes.show', $write->slug)
                ];
            });

        // Search categories
        $categoriesQuery = Category::where('name', 'LIKE', "%{$searchQuery}%");
        
        if ($isAdmin) {
            $categoriesQuery->whereIn('status', ['public', 'private', 'link_only']);
        } else {
            $categoriesQuery->where('status', 'public');
        }

        $categories = $categoriesQuery
            ->limit(10)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'url' => route('categories.show', $category->slug)
                ];
            });

        return inertia('WritesCategories/Writes/SearchResults', [
            'searchQuery' => $searchQuery,
            'articles' => $articles,
            'categories' => $categories,
            'screen' => $this->writeService->getScreenData("Arama: {$searchQuery}", true),
            'isAdmin' => $isAdmin
        ]);
    }

    /**
     * Show the form for creating a new write
     * 
     * @return \Inertia\Response
     */
    public function create()
    {
        $isAdmin = Auth::check();
        $writesResult = $this->writeService->getAllWrites();
        $categoriesResult = $this->writeService->getCategories();

        return inertia('WritesCategories/Writes/CreateWrite', [
            'writes'     => $writesResult['data'],
            'categories' => $categoriesResult['data'],
            'screen'     => $this->writeService->getScreenData('Yeni Yazı'),
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Display the specified write
     * Two-phase loading: Basic info first (instant), content via AJAX (lazy)
     * 
     * @param string $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $isAdmin = Auth::check();
        
        // Phase 1: Get minimal write data for instant page load (SEO + basic info)
        $writeBasic = $this->writeService->getWriteBasicBySlug($slug);
        
        // Get sidebar data (writes and categories)
        $writesResult = $this->writeService->getWrites();
        $categoriesResult = $this->writeService->getCategories();
        
        // Increment view count asynchronously (doesn't block page load)
        $this->writeService->incrementViewCount($writeBasic['data']);

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes'     => $writesResult['data'], // Sidebar data
            'write'      => $writeBasic['data'],
            'categories' => $categoriesResult['data'], // All categories for breadcrumb and sidebar
            'screen'     => $this->writeService->getScreenData($writeBasic['data']->title),
            'showDraw'   => filter_var(request()->query('showDraw', false), FILTER_VALIDATE_BOOLEAN),
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Get write content for lazy loading (AJAX endpoint)
     * 
     * @param string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWriteContent($slug)
    {
        try {
            $writeResult = $this->writeService->getWriteBySlug($slug);
            $write = $writeResult['data'];
            
            return response()->json([
                'success' => true,
                'content' => $write->content,
                'writeDraws' => $write->writeDraws,
                'hasDraw' => $write->hasDraw,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching write content: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'İçerik yüklenirken bir hata oluştu.'
            ], 500);
        }
    }

    /**
     * Get sidebar data for lazy loading (AJAX endpoint)
     * Returns writes list and categories for sidebar
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSidebarData()
    {
        try {
            $categoriesResult = $this->writeService->getCategories();
            $writesResult = $this->writeService->getWrites();
            
            return response()->json([
                'success' => true,
                'categories' => $categoriesResult['data'],
                'writes' => $writesResult['data'],
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching sidebar data: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Sidebar verileri yüklenirken bir hata oluştu.'
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified write
     * 
     * @param Write $write
     * @return \Inertia\Response
     */
    public function edit(Write $write)
    {
        $isAdmin = Auth::check();
        $categoriesResult = $this->writeService->getCategories();
        $writesResult = $this->writeService->getWrites();

        return inertia('WritesCategories/Writes/EditWrite', [
            'writes'     => $writesResult['data'],
            'write'      => $write,
            'categories' => $categoriesResult['data'],
            'screen'     => $this->writeService->getScreenData($write->title . ' - Düzenle'),
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Remove the specified write from storage
     * 
     * @param Write $write
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Write $write)
    {
        $result = $this->writeService->deleteWrite($write);

        return redirect()
            ->route('writes.index')
            ->with('success', 'Yazı başarıyla silindi.');
    }

    /**
     * Store a newly created write
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:content_writes,slug',
            'content'      => 'required|string',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private,link_only',
            'category_id'  => 'required|exists:content_categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
            'youtube_url'  => 'nullable|url|max:500',
        ]);

        $data = $request->all();
        $data['author_id'] = Auth::id();

        $result = $this->writeService->createWrite($data);
        $write = $result['data'];

        return redirect()
            ->route('writes.show', ['write' => $write->slug])
            ->with('success', 'Yazı başarıyla oluşturuldu.');
    }

    /**
     * Update the specified write
     * 
     * @param Request $request
     * @param mixed $writeId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $writeId)
    {
        // Find write by ID or slug
        $write = is_numeric($writeId)
            ? Write::findOrFail($writeId)
            : Write::where('slug', $writeId)->firstOrFail();

        // Validate request
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:content_writes,slug,' . $write->id,
            'content'      => 'required|string',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private,link_only',
            'category_id'  => 'required|exists:content_categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
            'youtube_url'  => 'nullable|url|max:500',
        ]);

        try {
            $result = $this->writeService->updateWrite($write, $validated);
            $updatedWrite = $result['data'];

            return redirect()
                ->route('writes.show', ['write' => $updatedWrite->slug])
                ->with('success', 'Yazı başarıyla güncellendi.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Güncelleme sırasında bir hata oluştu.']);
        }
    }

    /**
     * Store a drawing associated with write
     * 
     * @param Request $request
     * @param int $writeId
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeDraw(Request $request, $writeId)
    {
        $write = Write::where('id', $writeId)->firstOrFail();

        $result = $this->writeService->addDraw($write, [
            'elements' => $request->input('elements'),
            'files' => $request->input('files'),
        ]);

        return response()->json([
            'data' => $result['data']
        ]);
    }

    /**
     * Remove drawing version from storage
     * 
     * @param int $writeId
     * @param int $drawId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyDraw($writeId, $drawId)
    {
        $write = Write::where('id', $writeId)->firstOrFail();
        $result = $this->writeService->deleteDraw($write, $drawId);

        return response()->json([
            'message' => 'Versiyon başarıyla silindi.'
        ]);
    }

    /**
     * Search articles and categories
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        try {
            $query = $request->get('q', '');
            $type = $request->get('type', 'articles,categories');
            $isLoggedIn = Auth::check();

            Log::info('Search request', ['query' => $query, 'type' => $type, 'is_logged_in' => $isLoggedIn]);

            if (strlen($query) < 2) {
                return response()->json([
                    'articles' => [],
                    'categories' => []
                ]);
            }

            $results = [
                'articles' => [],
                'categories' => []
            ];

            // Search articles if requested
            if (str_contains($type, 'articles')) {
                $articlesQuery = Write::where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                        ->orWhere('summary', 'LIKE', "%{$query}%")
                        ->orWhere('content', 'LIKE', "%{$query}%")
                        ->orWhere('tags', 'LIKE', "%{$query}%");
                });

                // Filter by status based on login status
                if ($isLoggedIn) {
                    // Logged in users can see all articles
                    $articlesQuery->whereIn('status', ['published', 'draft', 'private', 'link_only']);
                } else {
                    // Non-logged in users can only see published articles
                    $articlesQuery->where('status', 'published');
                }

                $articles = $articlesQuery
                    ->with('category')
                    ->limit(5)
                    ->get()
                    ->map(function ($write) {
                        return [
                            'id' => $write->id,
                            'title' => $write->title,
                            'excerpt' => $write->summary ?: Str::limit(strip_tags($write->content), 100),
                            'url' => route('writes.show', $write->slug),
                            'category' => $write->category ? $write->category->name : null
                        ];
                    });

                $results['articles'] = $articles;
            }

            // Search categories if requested
            if (str_contains($type, 'categories')) {
                $categoriesQuery = Category::where('name', 'LIKE', "%{$query}%");

                // Filter by status based on login status
                if ($isLoggedIn) {
                    // Logged in users can see all categories (public, private, link_only)
                    $categoriesQuery->whereIn('status', ['public', 'private', 'link_only']);
                } else {
                    // Non-logged in users can only see public categories
                    $categoriesQuery->where('status', 'public');
                }

                $categories = $categoriesQuery
                    ->limit(5)
                    ->get()
                    ->map(function ($category) {
                        return [
                            'id' => $category->id,
                            'name' => $category->name,
                            'description' => 'Category description',
                            'url' => route('categories.show', $category->slug)
                        ];
                    });

                $results['categories'] = $categories;
            }

            Log::info('Search results', [
                'articles_count' => count($results['articles']),
                'categories_count' => count($results['categories']),
                'is_logged_in' => $isLoggedIn
            ]);

            return response()->json($results);
        } catch (\Exception $e) {
            Log::error('Search error: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
                'articles' => [],
                'categories' => []
            ], 500);
        }
    }
}
