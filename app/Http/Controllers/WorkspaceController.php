<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use App\Models\WorkspaceProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    protected $screen = [
        'name' => 'workspace',
        'isMobileSidebar' => false,
    ];

    /**
     * Display the workspace view.
     */
    public function index()
    {
        $user = Auth::user();
        $isAdmin = $user !== null;

        // Get workspaces - if admin, show all, otherwise only published
        $workspaces = $isAdmin 
            ? Workspace::with('products')->latest()->get() 
            : Workspace::published()->with('products')->latest()->get();

        return Inertia::render('Workspace/IndexWorkspace', [
            'workspaces' => $workspaces,
            'screen' => $this->screen,
        ]);
    }

    /**
     * Show the form for creating a new workspace.
     */
    public function create()
    {
        return Inertia::render('Workspace/CreateWorkspace', [
            'screen' => $this->screen,
        ]);
    }

    /**
     * Store a newly created workspace.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'status' => 'required|in:draft,published',
            'products' => 'nullable|array',
            'products.*.name' => 'required|string|max:255',
            'products.*.features' => 'nullable|string',
            'products.*.link' => 'nullable|url|max:500',
        ]);

        // Handle multiple image uploads - domain-specific storage (same as Journey)
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store in domain-specific folder (AppServiceProvider handles this)
                $path = $image->store('workspace', 'public');
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = $imagePaths;
        $validated['user_id'] = Auth::id();

        $workspace = Workspace::create($validated);

        // Handle products
        if ($request->has('products')) {
            foreach ($request->products as $index => $product) {
                WorkspaceProduct::create([
                    'workspace_id' => $workspace->id,
                    'name' => $product['name'],
                    'features' => $product['features'] ?? null,
                    'link' => $product['link'] ?? null,
                    'order' => $index,
                ]);
            }
        }

        return redirect()
            ->route('workspace.index')
            ->with('flash', ['message' => 'Çalışma alanı başarıyla oluşturuldu.']);
    }

    /**
     * Display the specified workspace.
     */
    public function show($id)
    {
        $workspace = Workspace::with('products')->findOrFail($id);
        
        $user = Auth::user();
        $isAdmin = $user !== null;

        // If not admin and workspace is not published, return 404
        if (!$isAdmin && $workspace->status !== 'published') {
            abort(404);
        }

        return Inertia::render('Workspace/ShowWorkspace', [
            'workspace' => $workspace,
            'screen' => $this->screen,
        ]);
    }

    /**
     * Show the form for editing the specified workspace.
     */
    public function edit($id)
    {
        $workspace = Workspace::with('products')->findOrFail($id);

        return Inertia::render('Workspace/EditWorkspace', [
            'workspace' => $workspace,
            'screen' => $this->screen,
        ]);
    }

    /**
     * Update the specified workspace.
     */
    public function update(Request $request, $id)
    {
        $workspace = Workspace::findOrFail($id);

        $validated = $request->validate([
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'status' => 'required|in:draft,published',
            'products' => 'nullable|array',
            'products.*.name' => 'required|string|max:255',
            'products.*.features' => 'nullable|string',
            'products.*.link' => 'nullable|url|max:500',
        ], [
            'products.*.name.required' => 'Ürün adı gereklidir.',
            'products.*.link.url' => 'Ürün linki geçerli bir URL olmalıdır.',
        ]);

        // Handle multiple image uploads - domain-specific storage (same as Journey)
        if ($request->hasFile('images') && count($request->file('images')) > 0) {
            // Delete old images
            if ($workspace->images && is_array($workspace->images)) {
                foreach ($workspace->images as $oldImage) {
                    if ($oldImage) {
                    Storage::disk('public')->delete($oldImage);
                    }
                }
            }

            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                // Store in domain-specific folder (AppServiceProvider handles this)
                $path = $image->store('workspace', 'public');
                $imagePaths[] = $path;
            }
            $validated['images'] = $imagePaths;
        } else {
            // Keep existing images if no new images uploaded
            // Don't override images field if no new images are provided
            unset($validated['images']);
        }

        $workspace->update($validated);

        // Handle products - delete existing and create new ones
        $workspace->products()->delete();
        if ($request->has('products') && is_array($request->products) && count($request->products) > 0) {
            foreach ($request->products as $index => $product) {
                if (!empty($product['name'])) {
                    WorkspaceProduct::create([
                        'workspace_id' => $workspace->id,
                        'name' => $product['name'],
                        'features' => $product['features'] ?? null,
                        'link' => $product['link'] ?? null,
                        'order' => $index,
                    ]);
                }
            }
        }

        return redirect()
            ->route('workspace.index')
            ->with('flash', ['message' => 'Çalışma alanı başarıyla güncellendi.']);
    }

    /**
     * Remove the specified workspace.
     */
    public function destroy($id)
    {
        $workspace = Workspace::findOrFail($id);

        // Delete images if exists
        if ($workspace->images) {
            foreach ($workspace->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $workspace->delete();

        return redirect()
            ->route('workspace.index')
            ->with('flash', ['message' => 'Çalışma alanı başarıyla silindi.']);
    }
}
