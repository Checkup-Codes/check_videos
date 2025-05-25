<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class WriteImageController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'category' => 'required|string|in:' . implode(',', array_keys(WriteImage::getCategories())),
                'related_id' => 'nullable|uuid',
                'images' => 'required|array',
                'images.*' => 'required|image|max:5120', // 5MB limit
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
                            'alt_text' => $image->getClientOriginalName(),
                            'title' => $image->getClientOriginalName(),
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
}
