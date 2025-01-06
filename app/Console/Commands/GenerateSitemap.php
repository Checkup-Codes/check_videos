<?php

namespace App\Console\Commands;

use App\Services\SitemapGenerator;
use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap';

    public function handle(SitemapGenerator $sitemapGenerator): void
    {
        $this->info('Generating sitemap...');
        $sitemapGenerator->generate();
        $this->info('Sitemap generated successfully!');
    }
}
