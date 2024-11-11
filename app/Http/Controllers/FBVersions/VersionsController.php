<?php

namespace App\Http\Controllers\FBVersions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FBVersions\Version;
use App\Models\FBVersions\Feature;
use App\Models\FBVersions\Bug;

class VersionsController extends Controller
{
    public function index()
    {
        $versions = Version::with(['features', 'bugs'])
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('FBVersions/Versions/IndexVersion', [
            'isMobileSidebar' => true,
            'versions' => $versions
        ]);
    }


    public function create()
    {
        return inertia('FBVersions/Versions/CreateVersion');
    }

    public function store(Request $request)
    {
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

        $version = Version::create([
            'version' => $validated['version'],
            'release_date' => $validated['release_date'],
            'description' => $validated['description'],
        ]);

        $version->features()->createMany($validated['features']);
        $version->bugs()->createMany($validated['bugs']);

        return redirect()->route('versions.index')->with('success', 'Yeni sürüm hayırlı olsun abi');
    }

    public function show($slug)
    {
        $version = Version::with(relations: ['features', 'bugs'])->where('version', $slug)->firstOrFail();
        $versions = Version::with(['features', 'bugs'])->orderBy('created_at', 'desc')->get();

        return inertia('FBVersions/Versions/ShowVersion', [
            'isMobileSidebar' => false,
            'versions' => $versions,
            'version' => $version
        ]);
    }

    public function edit($id)
    {
        $version = Version::with(['features', 'bugs'])->findOrFail($id);

        return inertia('FBVersions/Versions/EditVersion', [
            'isMobileSidebar' => false,
            'version' => $version
        ]);
    }

    public function update(Request $request, $id)
    {

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

        $version = Version::findOrFail($id);
        $version->update([
            'version' => $validated['version'],
            'release_date' => $validated['release_date'],
            'description' => $validated['description'],
        ]);

        $version->features()->delete();
        $version->features()->createMany($validated['features']);

        $version->bugs()->delete();
        $version->bugs()->createMany($validated['bugs']);

        return redirect()->route('versions.index')->with('success', 'Kolay gelsin, güncelleme işi tamam.');
    }


    public function destroy($id)
    {
        $version = Version::findOrFail($id);
        $version->features()->delete();
        $version->bugs()->delete();
        $version->delete();

        return redirect()->route('versions.index')->with('success', 'Şirket versiyonda küçültmeye gidiyor anlaşılan');
    }
}
