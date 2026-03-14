<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function generate()
    {
        // Get current domain
        $domain = request()->getHost();
        $baseUrl = rtrim(request()->getSchemeAndHttpHost(), '/');
        
        // Sanitize domain for filename
        $safeDomain = str_replace(['.', ':'], '_', $domain);
        
        // Determine sitemap filename based on domain
        $sitemapFilename = in_array($domain, ['localhost', '127.0.0.1', '::1']) 
            ? 'sitemap.xml' 
            : "sitemap_{$safeDomain}.xml";

        $content = "User-agent: *\nAllow: /\n\n";
        $content .= "Sitemap: {$baseUrl}/{$sitemapFilename}\n\n";
        $content .= "# Disallow admin and private routes\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /private/\n";
        $content .= "Disallow: /api/\n";

        return response($content)
            ->header('Content-Type', 'text/plain');
    }
}
