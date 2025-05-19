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

    private array $screenDefault = [
        'isMobileSidebar' => false,
        'name' => 'writes'
    ];

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

        Log::info('Writes listed', [
            'execution_time' => $writesResult['execution_time']['value'],
            'is_slow' => $writesResult['execution_time']['is_slow'],
            'count' => $writesResult['count']
        ]);

        return inertia('WritesCategories/Writes/IndexWrite', [
            'screen'     => [
                'isMobileSidebar' => true,
                'name'            => 'writes'
            ],
            'writes'     => $writesResult['data'],
            'isAdmin'    => $isAdmin,
            'performance' => [
                'execution_time' => $writesResult['execution_time'],
                'count' => $writesResult['count']
            ]
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
            'screen'     => $this->screenDefault,
            'isAdmin'    => $isAdmin,
            'performance' => [
                'writes_execution_time' => $writesResult['execution_time'],
                'categories_execution_time' => $categoriesResult['execution_time']
            ]
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

        Log::info('Write viewed', [
            'slug' => $slug,
            'execution_time' => $writeResult['execution_time']['value'],
            'is_slow' => $writeResult['execution_time']['is_slow']
        ]);

        return inertia('WritesCategories/Writes/ShowWrite', [
            'writes'     => $writesResult['data'],
            'write'      => $writeResult['data'],
            'categories' => $categoriesResult['data'],
            'screen'     => $this->screenDefault,
            'showDraw'   => filter_var(request()->query('showDraw', false), FILTER_VALIDATE_BOOLEAN),
            'isAdmin'    => $isAdmin,
            'performance' => [
                'write_execution_time' => $writeResult['execution_time'],
                'writes_execution_time' => $writesResult['execution_time'],
                'categories_execution_time' => $categoriesResult['execution_time']
            ]
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
        $writesResult = $this->writeService->getAllWrites();
        $categoriesResult = $this->writeService->getCategories();

        return inertia('WritesCategories/Writes/EditWrite', [
            'write'      => $write,
            'writes'     => $writesResult['data'],
            'categories' => $categoriesResult['data'],
            'screen'     => $this->screenDefault,
            'isAdmin'    => $isAdmin,
            'performance' => [
                'writes_execution_time' => $writesResult['execution_time'],
                'categories_execution_time' => $categoriesResult['execution_time']
            ]
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

        Log::info('Write deleted', [
            'id' => $write->id,
            'execution_time' => $result['execution_time']['value'],
            'is_slow' => $result['execution_time']['is_slow']
        ]);

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
            'status'       => 'required|in:draft,published,private',
            'category_id'  => 'required|exists:content_categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
        ]);

        $data = $request->all();
        $data['author_id'] = Auth::id();

        $result = $this->writeService->createWrite($data);

        Log::info('Write created', [
            'id' => $result['data']->id,
            'execution_time' => $result['execution_time']['value'],
            'is_slow' => $result['execution_time']['is_slow']
        ]);

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

        $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:content_writes,slug,' . $write->id,
            'content'      => 'required|string',
            'published_at' => 'nullable|date',
            'summary'      => 'nullable|string',
            'status'       => 'required|in:draft,published,private',
            'category_id'  => 'required|exists:content_categories,id',
            'seo_keywords' => 'nullable|string|max:255',
            'tags'         => 'nullable|string|max:255',
            'hasDraw'      => 'required|boolean',
        ]);

        $result = $this->writeService->updateWrite($write, $request->all());

        Log::info('Write updated', [
            'id' => $write->id,
            'execution_time' => $result['execution_time']['value'],
            'is_slow' => $result['execution_time']['is_slow']
        ]);

        return redirect()
            ->route('writes.index')
            ->with('success', 'Yazıyı modifiye ettik.');
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
            'data' => $result['data'],
            'performance' => [
                'execution_time' => $result['execution_time']
            ]
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
            'message' => 'Versiyon başarıyla silindi.',
            'performance' => [
                'execution_time' => $result['execution_time']
            ]
        ]);
    }
}
