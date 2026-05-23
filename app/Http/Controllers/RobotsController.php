<?php

namespace App\Http\Controllers;

use App\Support\TenantDomain;
use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function generate(): Response
    {
        $host = TenantDomain::current();
        $baseUrl = TenantDomain::baseUrl();

        if (!TenantDomain::shouldIndex($host)) {
            $content = implode("\n", [
                'User-agent: *',
                'Disallow: /',
            ]);

            return response($content, 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
        }

        $lines = [
            'User-agent: *',
            'Allow: /',
            'Disallow: /dashboard',
            'Disallow: /login',
            'Disallow: /register',
            'Disallow: /profile',
            'Disallow: /seo',
            'Disallow: /media',
            'Disallow: /tenants',
            'Disallow: /api/',
            '',
            "Sitemap: {$baseUrl}/sitemap.xml",
        ];

        return response(implode("\n", $lines), 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
