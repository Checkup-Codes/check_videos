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

    private array $screenDefault = [
        'isMobileSidebar' => false,
        'name' => 'versions'
    ];

    public function index()
    {
        $versions = $this->getAllVersionsWithDetails();

        return inertia('FBVersions/Versions/IndexVersion', [
            'screen'     => $this->getScreenData(true),
            'versions' => $versions
        ]);
    }

    public function show($slug)
    {
        $version = $this->getVersionBySlug($slug);
        $versions = $this->getAllVersionsWithDetails();

        return inertia('FBVersions/Versions/ShowVersion', [
            'versions' => $versions,
            'version' => $version,
            'screen' => $this->getScreenData(false),
        ]);
    }

    public function edit($id)
    {
        $versions = $this->getAllVersionsWithDetails();
        $version = $this->getVersionById($id);

        return inertia('FBVersions/Versions/EditVersion', [
            'versions' => $versions,
            'version' => $version,
            'screen' => $this->getScreenData(false),
        ]);
    }

    public function create()
    {
        $versions = $this->getAllVersionsWithDetails();

        return inertia('FBVersions/Versions/CreateVersion', [
            'versions' => $versions,
            'screen' => $this->getScreenData(false),
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
        return Version::with(['features', 'bugs'])
            ->orderBy('release_date', 'desc')
            ->get()
            ->map(function ($version) {
                $version->release_date = Carbon::parse($version->release_date)->translatedFormat('d F Y');
                return $version;
            });
    }

    private function getVersionBySlug($slug)
    {
        $version = Version::with(['features', 'bugs'])
            ->where('version', $slug)
            ->firstOrFail();
        $version->release_date = Carbon::parse($version->release_date)->translatedFormat('d F Y');

        return $version;
    }

    private function getVersionById($id)
    {
        $version = Version::with(['features', 'bugs'])->where('id', $id)->firstOrFail();
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
        $version = Version::where('id', $id)->firstOrFail();
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
        $version = Version::where('id', $id)->firstOrFail();
        $version->features()->delete();
        $version->bugs()->delete();
        $version->delete();
    }

    /**
     * Get screen data for versions pages
     * 
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(bool $isMobile = false): array
    {
        $seo = \App\Models\Seo::first();
        $logo = \App\Models\WritesCategories\WriteImage::where('category', 'logo')->first();

        return [
            'isMobileSidebar' => $isMobile,
            'name' => 'versions',
            'seo' => [
                'title' => $seo->title ?? 'Seo Title',
                'description' => $seo->description ?? 'Seo Description',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ],
        ];
    }
}
