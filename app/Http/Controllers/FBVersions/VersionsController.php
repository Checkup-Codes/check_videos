<?php

namespace App\Http\Controllers\FBVersions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FBVersions\Version;
use App\Models\FBVersions\Feature;
use App\Models\FBVersions\Bug;
use Carbon\Carbon;

class VersionsController extends Controller
{
    public function index()
    {
        $versions = $this->getAllVersionsWithDetails();

        return inertia('FBVersions/Versions/IndexVersion', [
            'isMobileSidebar' => true,
            'name' => 'versions',
            'versions' => $versions
        ]);
    }

    public function show($slug)
    {
        $version = $this->getVersionBySlug($slug);
        $versions = $this->getAllVersionsWithDetails();

        return inertia('FBVersions/Versions/ShowVersion', [
            'isMobileSidebar' => false,
            'versions' => $versions,
            'version' => $version,
            'name' => 'versions'
        ]);
    }

    public function edit($id)
    {
        $versions = $this->getAllVersionsWithDetails();
        $version = $this->getVersionById($id);

        return inertia('FBVersions/Versions/EditVersion', [
            'name' => 'versions',
            'isMobileSidebar' => false,
            'versions' => $versions,
            'version' => $version
        ]);
    }

    public function create()
    {
        $versions = $this->getAllVersionsWithDetails();

        return inertia('FBVersions/Versions/CreateVersion', [
            'name' => 'versions',
            'isMobileSidebar' => true,
            'versions' => $versions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateVersion($request);

        $version = $this->createVersion($validated);
        $this->attachFeaturesAndBugs($version, $validated);

        return redirect()->route('versions.index')->with('success', 'Yeni sürüm hayırlı olsun abi');
    }

    public function update(Request $request, $id)
    {
        $validated = $this->validateVersion($request, $id);

        $version = $this->updateVersion($id, $validated);
        $this->updateFeaturesAndBugs($version, $validated);

        return redirect()->route('versions.index')->with('success', 'Kolay gelsin, güncelleme işi tamam.');
    }

    public function destroy($id)
    {
        $this->deleteVersion($id);

        return redirect()->route('versions.index')->with('success', 'Şirket versiyonda küçültmeye gidiyor anlaşılan');
    }

    // Helper methods

    private function getAllVersionsWithDetails()
    {
        return Version::with(['version_features', 'version_bugs'])
            ->orderBy('release_date', 'desc')
            ->get()
            ->map(function ($version) {
                $version->release_date = Carbon::parse($version->release_date)->translatedFormat('d F Y');
                return $version;
            });
    }

    private function getVersionBySlug($slug)
    {
        $version = Version::with(['version_features', 'version_bugs'])
            ->where('version', $slug)
            ->firstOrFail();
        $version->release_date = Carbon::parse($version->release_date)->translatedFormat('d F Y');

        return $version;
    }

    private function getVersionById($id)
    {
        $version = Version::with(['version_features', 'version_bugs'])->findOrFail($id);
        $version->release_date = Carbon::parse($version->release_date)->translatedFormat('d F Y');

        return $version;
    }

    private function validateVersion(Request $request, $id = null)
    {
        return $request->validate([
            'version' => 'required|string|max:255|unique:version_versions,version,' . $id,
            'release_date' => 'required|date',
            'description' => 'nullable|string',
            'features' => 'required|array',
            'features.*.feature_name' => 'required|string|max:255',
            'features.*.feature_detail' => 'required|string',
            'bugs' => 'required|array',
            'bugs.*.bug_name' => 'required|string|max:255',
            'bugs.*.bug_detail' => 'required|string',
        ]);
    }

    private function createVersion(array $validated)
    {
        return Version::create([
            'version' => $validated['version'],
            'release_date' => $validated['release_date'],
            'description' => $validated['description'],
        ]);
    }

    private function updateVersion($id, array $validated)
    {
        $version = Version::findOrFail($id);
        $version->update([
            'version' => $validated['version'],
            'release_date' => $validated['release_date'],
            'description' => $validated['description'],
        ]);

        return $version;
    }

    private function attachFeaturesAndBugs(Version $version, array $validated)
    {
        $version->features()->createMany($validated['features']);
        $version->bugs()->createMany($validated['bugs']);
    }

    private function updateFeaturesAndBugs(Version $version, array $validated)
    {
        $version->features()->delete();
        $version->bugs()->delete();
        $this->attachFeaturesAndBugs($version, $validated);
    }

    private function deleteVersion($id)
    {
        $version = Version::findOrFail($id);
        $version->features()->delete();
        $version->bugs()->delete();
        $version->delete();
    }
}
