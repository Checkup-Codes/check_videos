<?php

namespace App\Http\Controllers\WritesCategories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class ImageUploadController extends Controller
{
    /**
     * Quill Editör için resim yükleme
     */
    public function upload(Request $request)
    {
        // Resim dosyası validasyonu
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB limit
        ]);

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Benzersiz dosya adı oluştur
                $fileName = 'write_' . Str::uuid() . '.' . $image->getClientOriginalExtension();

                // Resmi sakla
                $path = $image->storeAs('public/write_images', $fileName);

                // URL oluştur
                $url = asset(Storage::url($path));

                // Başarılı yanıt
                return response()->json([
                    'success' => true,
                    'url' => $url
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Resim yüklenirken bir hata oluştu.'
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Resim yüklenirken bir hata oluştu: ' . $e->getMessage()
            ], 500);
        }
    }
}
