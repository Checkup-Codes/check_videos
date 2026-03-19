<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function generate()
    {
        // Get current domain and configuration
        $domain = request()->getHost();
        $domainConfig = config("domains.domains.{$domain}", []);
        $indexInGoogle = $domainConfig['index_in_google'] ?? false;
        $mainDomain = config('domains.main_domain', 'checkupcodes.com');
        $baseUrl = rtrim(request()->getSchemeAndHttpHost(), '/');
        
        // Sanitize domain for filename
        $safeDomain = str_replace(['.', ':'], '_', $domain);
        
        // Determine sitemap filename based on domain
        $sitemapFilename = in_array($domain, ['localhost', '127.0.0.1', '::1']) 
            ? 'sitemap.xml' 
            : "sitemap_{$safeDomain}.xml";
        
        // Park edilmiş domainler için (Google'da indexlenmeyecek AMA crawl edilecek)
        // Strateji: noindex, follow - Link juice ana domain'e akar
        if (!$indexInGoogle) {
            $content = "# Parked domain - Content visible but not indexed\n";
            $content .= "# Main site: https://{$mainDomain}\n";
            $content .= "# All pages use canonical URLs pointing to main domain\n";
            $content .= "# This allows link equity to flow to main domain\n\n";
            $content .= "User-agent: *\n";
            $content .= "Allow: /\n\n";
            $content .= "# Sitemap for crawling (pages have noindex meta tag)\n";
            $content .= "Sitemap: {$baseUrl}/{$sitemapFilename}\n\n";
            $content .= "# Disallow admin and private routes\n";
            $content .= "Disallow: /admin/\n";
            $content .= "Disallow: /private/\n";
            $content .= "Disallow: /api/\n";
            
            return response($content)->header('Content-Type', 'text/plain');
        }
        
        // Ana domain için (Google'da indexlenecek)
        $content = "# Main domain - indexed by search engines\n\n";
        $content .= "User-agent: *\n";
        $content .= "Allow: /\n\n";
        $content .= "Sitemap: {$baseUrl}/{$sitemapFilename}\n\n";
        $content .= "# Disallow admin and private routes\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /private/\n";
        $content .= "Disallow: /api/\n";

        return response($content)
            ->header('Content-Type', 'text/plain');
    }
}
