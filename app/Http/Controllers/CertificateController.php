<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::ordered()->get();

        return Inertia::render('Certificates/IndexCertificate', [
            'certificates' => $certificates,
            'screen' => $this->getScreenData('Sertifikalar', true)
        ]);
    }

    public function create()
    {
        $certificates = Certificate::ordered()->get();
        
        return Inertia::render('Certificates/CreateCertificate', [
            'certificates' => $certificates,
            'screen' => $this->getScreenData('Yeni Sertifika', true)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:500',
            'skills' => 'nullable|array',
            'status' => 'required|in:active,expired,draft',
            'display_order' => 'nullable|integer',
        ]);

        // Handle image upload to WriteImage table with 'awards' category
        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('awards', 'public');
            
            // Create WriteImage record
            $writeImage = WriteImage::create([
                'image_path' => '/storage/' . $path,
                'title' => $validated['title'],
                'alt_text' => $validated['title'] . ' - ' . $validated['issuer'],
                'category' => WriteImage::CATEGORY_AWARDS,
                'related_id' => null, // Will be updated after certificate creation
            ]);
            
            $imagePath = $writeImage->image_path;
        }

        // Generate slug
        $validated['slug'] = Str::slug($validated['title']);
        $validated['image'] = $imagePath;

        $certificate = Certificate::create($validated);

        // Update WriteImage related_id
        if ($imagePath) {
            WriteImage::where('image_path', $imagePath)
                ->where('category', WriteImage::CATEGORY_AWARDS)
                ->update(['related_id' => $certificate->id]);
        }

        return Redirect::route('certificates.index')
            ->with('success', 'Sertifika başarıyla eklendi.');
    }

    public function show($slug)
    {
        $certificate = Certificate::where('slug', $slug)->firstOrFail();
        $certificates = Certificate::ordered()->get();

        return Inertia::render('Certificates/ShowCertificate', [
            'certificate' => $certificate,
            'certificates' => $certificates,
            'screen' => $this->getScreenData($certificate->title, true)
        ]);
    }

    public function edit($id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificates = Certificate::ordered()->get();

        return Inertia::render('Certificates/EditCertificate', [
            'certificate' => $certificate,
            'certificates' => $certificates,
            'screen' => $this->getScreenData('Sertifika Düzenle', true)
        ]);
    }

    public function update(Request $request, $id)
    {
        $certificate = Certificate::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:500',
            'skills' => 'nullable|array',
            'status' => 'required|in:active,expired,draft',
            'display_order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old WriteImage record
            if ($certificate->image) {
                $oldWriteImage = WriteImage::where('image_path', $certificate->image)
                    ->where('category', WriteImage::CATEGORY_AWARDS)
                    ->first();
                if ($oldWriteImage) {
                    // Delete physical file
                    $path = str_replace('/storage/', '', $oldWriteImage->image_path);
                    Storage::disk('public')->delete($path);
                    $oldWriteImage->delete();
                }
            }
            
            // Upload new image
            $image = $request->file('image');
            $path = $image->store('awards', 'public');
            
            // Create new WriteImage record
            $writeImage = WriteImage::create([
                'image_path' => '/storage/' . $path,
                'title' => $validated['title'],
                'alt_text' => $validated['title'] . ' - ' . $validated['issuer'],
                'category' => WriteImage::CATEGORY_AWARDS,
                'related_id' => $certificate->id,
            ]);
            
            $validated['image'] = $writeImage->image_path;
        }

        // Update slug if title changed
        if ($validated['title'] !== $certificate->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $certificate->update($validated);

        return Redirect::route('certificates.index')
            ->with('success', 'Sertifika başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $certificate = Certificate::findOrFail($id);

        // Delete WriteImage record
        if ($certificate->image) {
            $writeImage = WriteImage::where('image_path', $certificate->image)
                ->where('category', WriteImage::CATEGORY_AWARDS)
                ->first();
            if ($writeImage) {
                // Delete physical file
                $path = str_replace('/storage/', '', $writeImage->image_path);
                Storage::disk('public')->delete($path);
                $writeImage->delete();
            }
        }

        $certificate->delete();

        return Redirect::route('certificates.index')
            ->with('success', 'Sertifika başarıyla silindi.');
    }

    /**
     * Get screen data for certificate pages
     */
    private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'certificates',
            $pageTitle,
            null,
            $isMobile
        );
    }
}
