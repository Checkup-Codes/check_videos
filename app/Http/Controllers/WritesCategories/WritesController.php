<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class WritesController extends Controller
{
    private const CACHE_TTL = 60;


    private array $screenDefault = [
        'isMobileSidebar' => false,
        'name' => 'writes'
    ];


    public function index()
    {
        $categories = $this->getCategories();
        $writes = $this->getWrites();

        return inertia('WritesCategories/Writes/IndexWrite', [
            'screen'     => [
                'isMobileSidebar' => true,
                'name'            => 'writes'
            ],
            'writes'     => $writes,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return inertia('WritesCategories/Writes/CreateWrite', [
            'writes'     => $this->getAllWrites(),
            'categories' => $this->getCategories(),
            'screen'     => $this->screenDefault
        ]);
    }

    public function show($slug)
    {
        $categories = $this->getCategories();
        $writes     = $this->getWrites();

        $write = Write::with(['writeDraws' => function ($query) {
            $query->orderBy('version', 'desc')->latest();
        }])->where('slug', $slug)->firstOrFail();

        $write->increment('views_count');

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes'     => $writes,
            'write'      => $write,
            'categories' => $categories,
            'screen'     => $this->screenDefault,
            'showDraw'   => filter_var(request()->query('showDraw', false), FILTER_VALIDATE_BOOLEAN)
        ]);
    }


    public function edit(Write $write)
    {
        return inertia('WritesCategories/Writes/EditWrite', [
            'write'      => $write,
            'writes'     => $this->getAllWrites(),
            'categories' => $this->getCategories(),
            'screen'     => $this->screenDefault
        ]);
    }

    /**
     * Yazıyı silme
     */
    public function destroy(Write $write)
    {

        $write->delete();
        $this->clearCache();

        return redirect()
            ->route('writes.index')
            ->with('success', 'Çöp, bir yazı daha kazandı!');
    }

    /**
     * Yeni yazı kaydetme
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:writes,slug',
            'content'      => 'required',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private',
            'cover_image'  => 'nullable|string|max:255',
            'category_id'  => 'required|exists:categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
        ]);

        $write = new Write();
        $write->title        = $request->title;
        $write->slug         = $request->slug;
        $write->content      = $request->input('content');
        $write->published_at = $request->published_at;
        $write->summary      = $request->summary;
        $write->status       = $request->status;
        $write->cover_image  = $request->cover_image;
        $write->category_id  = $request->category_id;
        $write->author_id    = Auth::id();
        $write->seo_keywords = $request->seo_keywords;
        $write->tags         = $request->tags;
        $write->hasDraw      = $request->hasDraw;
        $write->save();

        $this->clearCache();

        return redirect()
            ->route('writes.index')
            ->with('success', 'Nur topu gibi bir yazınız daha oldu.');
    }

    /**
     * Var olan yazıyı güncelleme
     */
    public function update(Request $request, Write $write)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:writes,slug,' . $write->id,
            'content'      => 'required',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private',
            'cover_image'  => 'nullable|string|max:255',
            'category_id'  => 'required|exists:categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
        ]);

        $write->title        = $request->title;
        $write->slug         = $request->slug;
        $write->content      = $request->input('content');
        $write->published_at = $request->published_at;
        $write->summary      = $request->summary;
        $write->status       = $request->status;
        $write->cover_image  = $request->cover_image;
        $write->category_id  = $request->category_id;
        $write->seo_keywords = $request->seo_keywords;
        $write->tags         = $request->tags;
        $write->hasDraw      = $request->hasDraw;
        $write->save();

        $this->clearCache();

        return redirect()
            ->route('writes.index')
            ->with('success', 'Yazıyı modifiye ettik.');
    }

    /**
     * Yazıya ait Draw (çizim) kaydetme
     */
    public function storeDraw(Request $request, $writeId)
    {
        $write = Write::findOrFail($writeId);

        $latestVersion = $write->writeDraws()->max('version') ?? 0;

        $writeDraw = $write->writeDraws()->create([
            'elements' => $request->input('elements'),
            'version'  => $latestVersion + 1,
        ]);

        return response()->json($writeDraw);
    }

    /**
     * Bir Draw versiyonunu silme
     */
    public function destroyDraw($writeId, $drawId)
    {
        $write = Write::findOrFail($writeId);

        $writeDraw = $write->writeDraws()->findOrFail($drawId);
        $writeDraw->delete();

        $this->clearCache();

        return response()->json(['message' => 'Versiyon başarıyla silindi.']);
    }

    /**
     * Tüm kategorileri cache üzerinden veya veritabanından çeker.
     */
    private function getCategories()
    {
        return Cache::remember('categories', self::CACHE_TTL, function () {
            return Category::all();
        });
    }

    /**
     * Ziyaretçiye (veya auth durumuna) göre yazıları çeker.
     * - Auth varsa sadece published'ları çekiyorsa, ihtiyacınıza göre düzenleyebilirsiniz.
     */
    private function getWrites()
    {
        /*
        if (Auth::check()) {
            // Eğer üye girişi varsa, sadece published göstermek yerine hepsini göstermek isterseniz burayı değiştirin.
            return Write::select('views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->where('status', 'published')
                ->orderByDesc('created_at')
                ->get();
        }
        */

        // Ziyaretçi için cache'le
        return Cache::remember('writes', self::CACHE_TTL, function () {
            return Write::select('views_count', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at')
                ->where('status', 'published')
                ->orderByDesc('created_at')
                ->get();
        });
    }

    /**
     * Tüm yazıları çeker (örneğin create vb. yerlerde lazım olabilir).
     */
    private function getAllWrites()
    {
        // Tekrarlamamak adına cache kullanabilirsiniz ama bu kez "tüm yazılar" demek
        // istenmeyen sonuçlara sebep olabilir. Duruma göre dilediğiniz gibi uyarlayın.
        return Cache::remember('writes_all', self::CACHE_TTL, function () {
            return Write::all();
        });
    }

    /**
     * Cache temizleme metodu (tekrarları önlemek için).
     */
    private function clearCache()
    {
        Cache::forget('categories');
        Cache::forget('writes');
        Cache::forget('writes_all');
    }
}
