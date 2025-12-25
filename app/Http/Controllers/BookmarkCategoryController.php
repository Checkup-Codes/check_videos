<?php

namespace App\Http\Controllers;

use App\Models\BookmarkCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookmarkCategoryController extends Controller
{
    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        $user = Auth::user();
        
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Bookmarks/CreateCategory', [
            'screen' => [
                'name' => 'bookmarks',
                'isMobileSidebar' => false,
            ],
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $validated['user_id'] = $user->id;
        $validated['order'] = $validated['order'] ?? 0;

        $category = BookmarkCategory::create($validated);

        return redirect()
            ->route('bookmarks.index')
            ->with('flash', ['message' => 'Kategori başarıyla oluşturuldu.']);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $category = BookmarkCategory::findOrFail($id);

        // Check if category belongs to user
        if ($category->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $validated['order'] = $validated['order'] ?? $category->order;

        $category->update($validated);

        return redirect()
            ->route('bookmarks.index')
            ->with('flash', ['message' => 'Kategori başarıyla güncellendi.']);
    }

    /**
     * Remove the specified category.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $category = BookmarkCategory::findOrFail($id);

        // Check if category belongs to user
        if ($category->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        $category->delete();

        return redirect()
            ->route('bookmarks.index')
            ->with('flash', ['message' => 'Kategori başarıyla silindi.']);
    }
}
