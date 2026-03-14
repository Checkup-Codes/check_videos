<?php

namespace App\Console\Commands;

use App\Services\SitemapGenerator;
use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate {--domain=* : Specific domain(s) to generate sitemap for}';
    protected $description = 'Generate the sitemap for all domains or specific domain(s)';

    public function handle(): void
    {
        $domains = $this->option('domain');
        
        // If no specific domains provided, use configured domains
        if (empty($domains)) {
            $domains = config('app.domains', ['localhost']);
        }

        foreach ($domains as $domain) {
            $this->info("Generating sitemap for domain: {$domain}");
            
            // Temporarily set the domain in the request
            request()->headers->set('Host', $domain);
            
            $sitemapGenerator = app(SitemapGenerator::class);
            $sitemapGenerator->generate();
            
            $filename = $sitemapGenerator->getPublicSitemapFilename();
            $this->info("✓ Sitemap generated: public/{$filename}");
        }

        $this->info('All sitemaps generated successfully!');
    }
}
