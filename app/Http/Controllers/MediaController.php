<?php

namespace App\Http\Controllers;

use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $writes = Write::select('id', 'title')
            ->orderBy('title')
            ->get();

        $uploadedImages = WriteImage::with('write:id,title')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Media/Index', [
            'writes' => $writes,
            'uploadedImages' => $uploadedImages,
            'categories' => WriteImage::getCategories(),
        ]);
    }
}
