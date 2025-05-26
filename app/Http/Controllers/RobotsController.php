<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function generate()
    {
        $baseUrl = rtrim(config('app.url'), '/');

        $content = "User-agent: *\nAllow: /\n\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n\n";
        $content .= "# Disallow admin and private routes\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /private/\n";
        $content .= "Disallow: /api/\n";

        return response($content)
            ->header('Content-Type', 'text/plain');
    }
}
