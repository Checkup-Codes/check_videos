<?php

namespace App\Http\Controllers;

use App\Services\SitemapGenerator;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    private $sitemapGenerator;

    public function __construct(SitemapGenerator $sitemapGenerator)
    {
        $this->sitemapGenerator = $sitemapGenerator;
    }

    public function generate()
    {
        $this->sitemapGenerator->generate();

        // Serve domain-specific sitemap
        $sitemapPath = $this->sitemapGenerator->getSitemapPath();
        
        if (!file_exists($sitemapPath)) {
            abort(404, 'Sitemap not found for this domain');
        }

        return response()->file($sitemapPath, [
            'Content-Type' => 'application/xml'
        ]);
    }
}
