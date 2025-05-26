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

        return response()->file(public_path('sitemap.xml'), [
            'Content-Type' => 'application/xml'
        ]);
    }
}
