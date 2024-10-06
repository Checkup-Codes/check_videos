<?php

namespace App\Http\Controllers\FBVersions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FBVersions\Version;
use App\Models\FBVersions\Feature;
use App\Models\FBVersions\Bug;

class VersionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $versions = Version::with(['features', 'bugs'])->get();

        return inertia('FBVersions/Versions/IndexVersion', [
            'isMobileSidebar' => true,
            'versions' => $versions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('FBVersions/Versions/CreateVersion');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasyon
        $validated = $request->validate([
            'version' => 'required|string|max:255|unique:versions,version',
            'release_date' => 'required|date',
            'description' => 'nullable|string',
            'features' => 'required|array',
            'features.*.feature_name' => 'required|string|max:255',
            'features.*.feature_detail' => 'required|string|max:255',
            'bugs' => 'required|array',
            'bugs.*.bug_name' => 'required|string|max:255',
            'bugs.*.bug_detail' => 'required|string|max:255',
        ]);

        // Yeni versiyon oluştur
        $version = Version::create([
            'version' => $validated['version'],
            'release_date' => $validated['release_date'],
            'description' => $validated['description'],
        ]);

        // Features ve Bugs ekle
        $version->features()->createMany($validated['features']);
        $version->bugs()->createMany($validated['bugs']);

        return redirect()->route('versions.index')->with('success', 'Yeni sürüm hayırlı olsun abi');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        // Slug'a göre versiyonu bul
        $version = Version::with(['features', 'bugs'])->where('version', $slug)->firstOrFail();
        $versions = Version::with(['features', 'bugs'])->get();

        return inertia('FBVersions/Versions/ShowVersion', [
            'isMobileSidebar' => true,
            'versions' => $versions,
            'version' => $version
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */


    public function edit($id)
    {
        // İlgili versiyonu bul
        $version = Version::with(['features', 'bugs'])->findOrFail($id);

        // Inertia ile veriyi Vue.js frontend'e gönder
        return inertia('FBVersions/Versions/EditVersion', [
            'isMobileSidebar' => true,
            'version' => $version
        ]);
    }

    // Versiyon güncelleme işlemi
    public function update(Request $request, $id)
    {
        // Validasyon
        $validated = $request->validate([
            'version' => 'required|string|max:255|unique:versions,version,' . $id,
            'release_date' => 'required|date',
            'description' => 'nullable|string',
            'features' => 'required|array',
            'features.*.feature_name' => 'required|string|max:255',
            'features.*.feature_detail' => 'required|string|max:255',
            'bugs' => 'required|array',
            'bugs.*.bug_name' => 'required|string|max:255',
            'bugs.*.bug_detail' => 'required|string|max:255',
        ]);

        // İlgili versiyonu bul ve güncelle
        $version = Version::findOrFail($id);
        $version->update([
            'version' => $validated['version'],
            'release_date' => $validated['release_date'],
            'description' => $validated['description'],
        ]);

        // Eski feature ve bug kayıtlarını silip yenilerini ekle
        $version->features()->delete();
        $version->features()->createMany($validated['features']);

        $version->bugs()->delete();
        $version->bugs()->createMany($validated['bugs']);

        return redirect()->route('versions.index')->with('success', 'Kolay gelsin, güncelleme işi tamam.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $version = Version::findOrFail($id);
        $version->features()->delete();
        $version->bugs()->delete();
        $version->delete();

        return redirect()->route('versions.index')->with('success', 'Şirket versiyonda küçültmeye gidiyor anlaşılan');
    }
}
