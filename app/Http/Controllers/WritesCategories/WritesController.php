<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Write;
use App\Services\WritesCategories\WriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WritesController extends Controller
{
    private $writeService;

    private array $screenDefault = [
        'isMobileSidebar' => false,
        'name' => 'writes'
    ];

    public function __construct(WriteService $writeService)
    {
        $this->writeService = $writeService;
    }

    public function index()
    {
        $writes = $this->writeService->getWrites();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Writes/IndexWrite', [
            'screen'     => [
                'isMobileSidebar' => true,
                'name'            => 'writes'
            ],
            'writes'     => $writes,
            'isAdmin'    => $isAdmin
        ]);
    }

    public function create()
    {
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Writes/CreateWrite', [
            'writes'     => $this->writeService->getAllWrites(),
            'categories' => $this->writeService->getCategories(),
            'screen'     => $this->screenDefault,
            'isAdmin'    => $isAdmin
        ]);
    }

    public function show($slug)
    {
        $categories = $this->writeService->getCategories();
        $writes     = $this->writeService->getWrites();
        $write      = $this->writeService->getWriteBySlug($slug);
        $isAdmin    = Auth::check();

        $this->writeService->incrementViewCount($write);

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes'     => $writes,
            'write'      => $write,
            'categories' => $categories,
            'screen'     => $this->screenDefault,
            'showDraw'   => filter_var(request()->query('showDraw', false), FILTER_VALIDATE_BOOLEAN),
            'isAdmin'    => $isAdmin
        ]);
    }

    public function edit(Write $write)
    {
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Writes/EditWrite', [
            'write'      => $write,
            'writes'     => $this->writeService->getAllWrites(),
            'categories' => $this->writeService->getCategories(),
            'screen'     => $this->screenDefault,
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Yazıyı silme
     */
    public function destroy(Write $write)
    {
        $this->writeService->deleteWrite($write);

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
            'slug'         => 'required|string|max:255|unique:content_writes,slug',
            'content'      => 'required|string',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private',
            'cover_image'  => 'nullable|string|max:255',
            'category_id'  => 'required|exists:content_categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
        ]);

        $data = $request->all();
        $data['author_id'] = Auth::id();

        $this->writeService->createWrite($data);

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
            'slug'         => 'required|string|max:255|unique:content_writes,slug,' . $write->id,
            'content'      => 'required|string',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private',
            'cover_image'  => 'nullable|string|max:255',
            'category_id'  => 'required|exists:content_categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
        ]);

        $this->writeService->updateWrite($write, $request->all());

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
        $writeDraw = $this->writeService->addDraw($write, [
            'elements' => $request->input('elements')
        ]);

        return response()->json($writeDraw);
    }

    /**
     * Bir Draw versiyonunu silme
     */
    public function destroyDraw($writeId, $drawId)
    {
        $write = Write::findOrFail($writeId);
        $this->writeService->deleteDraw($write, $drawId);

        return response()->json(['message' => 'Versiyon başarıyla silindi.']);
    }
}
