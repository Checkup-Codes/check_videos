<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\Category;

class WritesController extends Controller
{
    protected const CACHE_TTL = 60;

    public function index()
    {
        $categories = $this->getCategories();
        $writes = $this->getWrites();

        return inertia('WritesCategories/Writes/IndexWrite', [
            'writes' => $writes,
            'categories' => $categories,
            'screen' => [
                'isMobileSidebar' => true,
                'name' => 'writes'
            ]
        ]);
    }

    public function create()
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::all();
        });
        $screen = [
            'isMobileSidebar' => false,
            'name' => 'writes'
        ];

        return inertia('WritesCategories/Writes/CreateWrite', [
            'writes' => $writes,
            'categories' => $categories,
            'screen' => $screen
        ]);
    }

    public function show($slug)
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::select('views_count', 'title', 'created_at', 'slug')->get();
        });

        $write = Write::with(['writeDraws' => function ($query) {
            $query->orderBy('version', 'desc')->latest();
        }])->where('slug', $slug)->firstOrFail();

        $screen = [
            'isMobileSidebar' => false,
            'name' => 'writes'
        ];

        // Sorgu parametresini al ve boolean değere dönüştür
        $showDraw = filter_var(request()->query('showDraw', false), FILTER_VALIDATE_BOOLEAN);

        $write->increment('views_count');

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes' => $writes,
            'write' => $write,
            'categories' => $categories,
            'screen' => $screen,
            'showDraw' => $showDraw
        ]);
    }



    public function edit($id)
    {
        $categories = Cache::remember('categories', 60, function () {
            return Category::all();
        });

        $writes = Cache::remember('writes', 60, function () {
            return Write::all();
        });

        $write = Write::findOrFail($id);
        $screen = [
            'isMobileSidebar' => false,
            'name' => 'writes'
        ];

        return inertia('WritesCategories/Writes/EditWrite', [
            'write' => $write,
            'writes' => $writes,
            'categories' => $categories,
            'screen' => $screen
        ]);
    }

    public function destroy($id)
    {
        $write = Write::findOrFail($id);
        $write->delete();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('writes.index')->with('success', 'Çöp, bir yazı daha kazandı !');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug',
            'content' => 'required',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags' => 'nullable|string|max:255',
            'hasDraw' => 'required|boolean',
        ]);

        $write = new Write();
        $write->title = $request->title;
        $write->slug = $request->slug;
        $write->content = $request->input('content');
        $write->published_at = $request->published_at;
        $write->summary = $request->summary;
        $write->status = $request->status;
        $write->cover_image = $request->cover_image;
        $write->category_id = $request->category_id;
        $write->author_id = Auth::id();
        $write->seo_keywords = $request->seo_keywords;
        $write->tags = $request->tags;
        $write->hasDraw = $request->hasDraw;
        $write->save();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('writes.index')->with('success', 'Nur topu gibi bir yazınız daha oldu.');
    }

    public function update(Request $request, Write $write)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug,' . $write->id,
            'content' => 'required',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags' => 'nullable|string|max:255',
            'hasDraw' => 'required|boolean',
        ]);

        $write->title = $request->title;
        $write->slug = $request->slug;
        $write->content = $request->input('content');
        $write->published_at = $request->published_at;
        $write->summary = $request->summary;
        $write->status = $request->status;
        $write->cover_image = $request->cover_image;
        $write->category_id = $request->category_id;
        $write->seo_keywords = $request->seo_keywords;
        $write->tags = $request->tags;
        $write->hasDraw = $request->hasDraw;
        $write->save();

        Cache::forget('categories');
        Cache::forget('writes');

        return redirect()->route('writes.index')->with('success', 'Yazıyı modifiye ettik.');
    }

    public function storeDraw(Request $request, $writeId)
    {
        $write = Write::findOrFail($writeId);

        $latestVersion = $write->writeDraws()->max('version') ?? 0;

        $writeDraw = $write->writeDraws()->create([
            'elements' => $request->input('elements'),
            'version' => $latestVersion + 1,
        ]);

        return response()->json($writeDraw);
    }

    public function destroyDraw($writeId, $drawId)
    {
        $write = Write::findOrFail($writeId);

        $writeDraw = $write->writeDraws()->findOrFail($drawId);
        $writeDraw->delete();

        Cache::forget('writes');

        return response()->json(['message' => 'Versiyon başarıyla silindi.']);
    }


    private function getCategories()
    {
        return Cache::remember('categories', self::CACHE_TTL, function () {
            return Category::all();
        });
    }

    private function getWrites()
    {
        return Cache::remember('writes', self::CACHE_TTL, function () {
            return Write::select('views_count', 'title', 'created_at', 'slug', 'updated_at')
                ->orderByDesc('created_at')
                ->get();
        });
    }

    private function clearCache()
    {
        Cache::forget('categories');
        Cache::forget('writes');
    }
}
