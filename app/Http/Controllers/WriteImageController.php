<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class WriteImageController extends Controller
{
    public function index(Request $request)
    {
        $query = WriteImage::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('related_id') && $request->related_id) {
            $query->where('related_id', $request->related_id);
        }

        $images = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'images' => $images
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'category' => 'required|string|in:' . implode(',', array_keys(WriteImage::getCategories())),
                'related_id' => 'nullable|uuid',
                'images' => 'required|array',
                'images.*' => 'required|image|max:5120', // 5MB limit
                'titles' => 'array',
                'titles.*' => 'nullable|string|max:255',
                'alt_texts' => 'array',
                'alt_texts.*' => 'nullable|string|max:255',
            ]);

            $images = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    try {
                        // Kategori bazlı klasör yapısı
                        $folder = 'public/' . $request->category;
                        if ($request->related_id) {
                            $folder .= '/' . $request->related_id;
                        }

                        $path = $image->store($folder);

                        $writeImage = WriteImage::create([
                            'category' => $request->category,
                            'related_id' => $request->related_id,
                            'image_path' => Storage::url($path),
                            'order' => $index,
                            'alt_text' => $request->alt_texts[$index] ?? $image->getClientOriginalName(),
                            'title' => $request->titles[$index] ?? $image->getClientOriginalName(),
                        ]);

                        $images[] = $writeImage;
                    } catch (\Exception $e) {
                        Log::error('Image upload failed: ' . $e->getMessage(), [
                            'file' => $image->getClientOriginalName(),
                            'error' => $e->getMessage()
                        ]);
                        continue;
                    }
                }
            }

            if (empty($images)) {
                return response()->json([
                    'message' => 'Hiçbir resim yüklenemedi.',
                ], 422);
            }

            return response()->json([
                'message' => 'Resimler başarıyla yüklendi',
                'images' => $images
            ]);
        } catch (\Exception $e) {
            Log::error('Write image upload failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Resimler yüklenirken bir hata oluştu: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateOrder(Request $request)
    {
        try {
            $request->validate([
                'images' => 'required|array',
                'images.*.id' => 'required|exists:write_images,id',
                'images.*.order' => 'required|integer|min:0',
            ]);

            foreach ($request->images as $image) {
                WriteImage::where('id', $image['id'])->update(['order' => $image['order']]);
            }

            return response()->json(['message' => 'Sıralama güncellendi']);
        } catch (\Exception $e) {
            Log::error('Write image order update failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Sıralama güncellenirken bir hata oluştu'
            ], 500);
        }
    }

    public function destroy(WriteImage $writeImage)
    {
        try {
            // Dosyayı storage'dan sil
            $path = str_replace('/storage/', 'public/', $writeImage->image_path);
            if (Storage::exists($path)) {
                Storage::delete($path);
            }

            // Veritabanından sil
            $writeImage->delete();

            return response()->json(['message' => 'Resim silindi']);
        } catch (\Exception $e) {
            Log::error('Write image delete failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Resim silinirken bir hata oluştu'
            ], 500);
        }
    }

    public function update(Request $request, WriteImage $writeImage)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'alt_text' => 'required|string|max:255',
            ]);

            $writeImage->update([
                'title' => $request->title,
                'alt_text' => $request->alt_text,
            ]);

            return response()->json([
                'message' => 'Resim bilgileri güncellendi',
                'image' => $writeImage
            ]);
        } catch (\Exception $e) {
            Log::error('Write image update failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Resim bilgileri güncellenirken bir hata oluştu'
            ], 500);
        }
    }
}
