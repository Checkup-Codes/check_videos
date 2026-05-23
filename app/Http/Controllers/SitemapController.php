<?php

namespace App\Http\Controllers;

use App\Services\SitemapGenerator;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __construct(private SitemapGenerator $sitemapGenerator) {}

    public function generate(): Response
    {
        $xml = $this->sitemapGenerator->generate();

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
