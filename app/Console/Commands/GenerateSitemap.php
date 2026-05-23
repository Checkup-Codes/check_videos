<?php

namespace App\Console\Commands;

use App\Services\SitemapGenerator;
use App\Support\TenantDomain;
use Dotenv\Dotenv;
use Illuminate\Console\Command;
use Illuminate\Http\Request;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate {--domain=* : Specific domain(s) to generate sitemap for}';
    protected $description = 'Generate sitemaps for all tenant domains or specific domain(s)';

    public function handle(): void
    {
        $domains = $this->option('domain');

        if (empty($domains)) {
            $configuredDomains = config('domains.domains') ?? [];
            $domains = array_values(array_filter(
                array_keys($configuredDomains),
                fn (string $domain) => $domain !== 'localhost'
            ));
        }

        foreach ($domains as $domain) {
            $domain = TenantDomain::normalize($domain);
            $this->loadTenantEnvironment($domain);

            $baseUrl = TenantDomain::tenantAppUrl($domain) ?? ('https://' . $domain);
            $preferredHost = parse_url($baseUrl, PHP_URL_HOST) ?: $domain;

            $this->info("Generating sitemap for domain: {$domain} ({$baseUrl})");

            app()->instance('request', Request::create(
                $baseUrl,
                'GET',
                [],
                [],
                [],
                ['HTTP_HOST' => $preferredHost, 'HTTPS' => 'on']
            ));

            $sitemapGenerator = app(SitemapGenerator::class);
            $sitemapGenerator->generate();

            $this->info('✓ Sitemap generated: ' . $sitemapGenerator->getSitemapPath());
        }

        $this->info('All sitemaps generated successfully!');
    }

    private function loadTenantEnvironment(string $domain): void
    {
        $envFile = base_path("config/tenants/.env.{$domain}");
        if (!file_exists($envFile)) {
            $this->warn("Tenant env not found: config/tenants/.env.{$domain}");
            return;
        }

        Dotenv::createMutable(base_path('config/tenants'), ".env.{$domain}")->load();

        config([
            'app.url' => env('APP_URL'),
            'app.name' => env('APP_NAME'),
            'database.connections.mysql.host' => env('DB_HOST'),
            'database.connections.mysql.database' => env('DB_DATABASE'),
            'database.connections.mysql.username' => env('DB_USERNAME'),
            'database.connections.mysql.password' => env('DB_PASSWORD'),
        ]);
    }
}
