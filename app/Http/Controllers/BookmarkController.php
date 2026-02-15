<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\HasScreenData;
use App\Models\Bookmark;
use App\Models\BookmarkCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    use HasScreenData;

    /**
     * Display the bookmarks view.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Get selected category from request
        $selectedCategoryId = $request->get('category');

        // If user is logged in, show only their bookmarks
        // If user is not logged in, show all bookmarks (public)
        if ($user) {
            // Get ALL categories with bookmarks for the current user (always show all categories in sidebar)
            $categories = BookmarkCategory::where('user_id', $user->id)
                ->with(['bookmarks' => function ($query) {
                    $query->orderBy('order');
                }])
                ->orderBy('order')
                ->get();

            // Get all bookmarks for the user (for flat display)
            $bookmarksQuery = Bookmark::where('user_id', $user->id)
                ->with('category');

            // If category filter is set, filter bookmarks by category
            if ($selectedCategoryId) {
                $bookmarksQuery->where('bookmark_category_id', $selectedCategoryId);
            }

            $allBookmarks = $bookmarksQuery
                ->orderBy('order')
                ->get();
        } else {
            // Public view: show all bookmarks from all users
            // Get ALL categories (always show all categories in sidebar)
            $categories = BookmarkCategory::query()
                ->with(['bookmarks' => function ($query) {
                    $query->orderBy('order');
                }])
                ->orderBy('order')
                ->get();

            // Get all bookmarks (for flat display)
            $bookmarksQuery = Bookmark::query()
                ->with('category');

            // If category filter is set, filter bookmarks by category
            if ($selectedCategoryId) {
                $bookmarksQuery->where('bookmark_category_id', $selectedCategoryId);
            }

            $allBookmarks = $bookmarksQuery
                ->orderBy('order')
                ->get();
        }

        return Inertia::render('Bookmarks/IndexBookmarks', [
            'categories' => $categories,
            'allBookmarks' => $allBookmarks,
            'screen' => $this->getScreenData('bookmarks', 'Yer İmleri', null, true),
        ]);
    }

    /**
     * Show the form for creating a new bookmark.
     */
    public function create()
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $categories = BookmarkCategory::where('user_id', $user->id)
            ->orderBy('order')
            ->get();

        return Inertia::render('Bookmarks/CreateBookmark', [
            'categories' => $categories,
            'screen' => $this->getScreenData('bookmarks', 'Yeni Yer İmi'),
        ]);
    }

    /**
     * Store a newly created bookmark.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'my_comment' => 'nullable|string',
            'extended_comment_link' => 'nullable|url|max:500',
            'link' => 'required|url|max:500',
            'preview_image' => 'nullable|url|max:500',
            'bookmark_category_id' => 'required|exists:bookmarks_categories,id',
            'order' => 'nullable|integer',
        ], [
            'name.required' => 'İsim alanı gereklidir.',
            'link.required' => 'Link alanı gereklidir.',
            'link.url' => 'Link geçerli bir URL olmalıdır.',
            'extended_comment_link.url' => 'Genişletilmiş yorum linki geçerli bir URL olmalıdır.',
            'preview_image.url' => 'Ön izleme resmi geçerli bir URL olmalıdır.',
            'bookmark_category_id.required' => 'Kategori seçimi gereklidir.',
            'bookmark_category_id.exists' => 'Seçilen kategori bulunamadı.',
        ]);

        $validated['user_id'] = $user->id;
        $validated['order'] = $validated['order'] ?? 0;

        $bookmark = Bookmark::create($validated);

        return redirect()
            ->route('bookmarks.index')
            ->with('flash', ['message' => 'Yer imi başarıyla oluşturuldu.']);
    }

    /**
     * Display the specified bookmark.
     */
    public function show($id)
    {
        $user = Auth::user();

        $bookmark = Bookmark::with('category')->findOrFail($id);

        // If user is logged in, they can see their own bookmarks
        // If user is not logged in, they can see all bookmarks (public)
        if ($user) {
            // Logged in users can see their own bookmarks
            // For now, we allow all bookmarks to be public
            // If you want to restrict, uncomment the following:
            // if ($bookmark->user_id !== $user->id) {
            //     abort(403, 'Unauthorized');
            // }
        }

        // Get categories for sidebar (user's categories if logged in, all if not)
        if ($user) {
            $categories = BookmarkCategory::where('user_id', $user->id)
                ->with(['bookmarks' => function ($query) {
                    $query->orderBy('order');
                }])
                ->orderBy('order')
                ->get();
        } else {
            $categories = BookmarkCategory::with(['bookmarks' => function ($query) {
                $query->orderBy('order');
            }])
                ->orderBy('order')
                ->get();
        }

        return Inertia::render('Bookmarks/ShowBookmark', [
            'bookmark' => $bookmark,
            'categories' => $categories,
            'screen' => $this->getScreenData('bookmarks', $bookmark->name),
        ]);
    }

    /**
     * Show the form for editing the specified bookmark.
     */
    public function edit($id)
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $bookmark = Bookmark::findOrFail($id);

        // Check if bookmark belongs to user
        if ($bookmark->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        $categories = BookmarkCategory::where('user_id', $user->id)
            ->orderBy('order')
            ->get();

        return Inertia::render('Bookmarks/EditBookmark', [
            'bookmark' => $bookmark,
            'categories' => $categories,
            'screen' => $this->getScreenData('bookmarks', $bookmark->name . ' - Düzenle'),
        ]);
    }

    /**
     * Update the specified bookmark.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $bookmark = Bookmark::findOrFail($id);

        // Check if bookmark belongs to user
        if ($bookmark->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'my_comment' => 'nullable|string',
            'extended_comment_link' => 'nullable|url|max:500',
            'link' => 'required|url|max:500',
            'preview_image' => 'nullable|url|max:500',
            'bookmark_category_id' => 'required|exists:bookmarks_categories,id',
            'order' => 'nullable|integer',
        ], [
            'name.required' => 'İsim alanı gereklidir.',
            'link.required' => 'Link alanı gereklidir.',
            'link.url' => 'Link geçerli bir URL olmalıdır.',
            'extended_comment_link.url' => 'Genişletilmiş yorum linki geçerli bir URL olmalıdır.',
            'preview_image.url' => 'Ön izleme resmi geçerli bir URL olmalıdır.',
            'bookmark_category_id.required' => 'Kategori seçimi gereklidir.',
            'bookmark_category_id.exists' => 'Seçilen kategori bulunamadı.',
        ]);

        $validated['order'] = $validated['order'] ?? $bookmark->order;

        $bookmark->update($validated);

        return redirect()
            ->route('bookmarks.index')
            ->with('flash', ['message' => 'Yer imi başarıyla güncellendi.']);
    }

    /**
     * Remove the specified bookmark.
     */
    public function destroy($id)
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $bookmark = Bookmark::findOrFail($id);

        // Check if bookmark belongs to user
        if ($bookmark->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        $bookmark->delete();

        return redirect()
            ->route('bookmarks.index')
            ->with('flash', ['message' => 'Yer imi başarıyla silindi.']);
    }
}
