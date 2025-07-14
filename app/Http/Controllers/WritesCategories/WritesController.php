<?php

namespace App\Http\Controllers\WritesCategories;

use App\Http\Controllers\Controller;
use App\Models\WritesCategories\Write;
use App\Services\WritesCategories\WriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WritesController extends Controller
{
    private $writeService;

    public function __construct(WriteService $writeService)
    {
        $this->writeService = $writeService;
    }

    /**
     * Display a listing of writes
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        $writesResult = $this->writeService->getWrites();
        $isAdmin = Auth::check();

        return inertia('WritesCategories/Writes/IndexWrite', [
            'writes'     => $writesResult['data'],
            'screen'     => $this->writeService->getScreenData(isMobile: true),
            'isAdmin'    => $isAdmin
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
            'screen'     => $this->writeService->getScreenData(false),
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Display the specified write
     * 
     * @param string $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $categoriesResult = $this->writeService->getCategories();
        $writesResult = $this->writeService->getWrites();
        $writeResult = $this->writeService->getWriteBySlug($slug);
        $isAdmin = Auth::check();

        $this->writeService->incrementViewCount($writeResult['data']);

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes'     => $writesResult['data'],
            'write'      => $writeResult['data'],
            'screen'     => $this->writeService->getScreenData(false),
            'showDraw'   => filter_var(request()->query('showDraw', false), FILTER_VALIDATE_BOOLEAN),
            'isAdmin'    => $isAdmin
        ]);
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
            'screen'     => $this->writeService->getScreenData(false),
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
            ->with('success', 'Çöp, bir yazı daha kazandı!');
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
        ]);

        $data = $request->all();
        $data['author_id'] = Auth::id();

        $result = $this->writeService->createWrite($data);

        return redirect()
            ->route('writes.index')
            ->with('success', 'Nur topu gibi bir yazınız daha oldu.');
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
        ]);

        try {
            $result = $this->writeService->updateWrite($write, $validated);

            return redirect()
                ->route('writes.index')
                ->with('success', 'Yazıyı modifiye ettik.');
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
            'elements' => $request->input('elements')
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
}
