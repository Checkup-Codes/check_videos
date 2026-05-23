<?php

namespace App\Support;

class TenantDomain
{
    public static function normalize(string $host): string
    {
        $host = preg_replace('/^www\./', '', $host);
        $host = rtrim($host, '.');
        $host = preg_replace('/:\d+$/', '', $host);

        return strtolower($host);
    }

    public static function current(): string
    {
        return self::normalize(request()->getHost());
    }

    public static function config(string $host): array
    {
        $host = self::normalize($host);
        $configured = config("domains.domains.{$host}");

        if (is_array($configured)) {
            return $configured;
        }

        if (self::hasTenantEnv($host)) {
            return [
                'name' => config('app.name', $host),
                'type' => 'tenant',
                'index_in_google' => true,
                'features' => ['all'],
            ];
        }

        $mainDomain = config('domains.main_domain', 'checkupcodes.com');

        return [
            'name' => config('app.name', $host),
            'type' => $host === $mainDomain ? 'main' : 'unknown',
            'index_in_google' => $host === $mainDomain,
            'features' => ['all'],
        ];
    }

    public static function shouldIndex(string $host): bool
    {
        return (bool) (self::config($host)['index_in_google'] ?? false);
    }

    public static function baseUrl(): string
    {
        return rtrim(config('app.url', url('/')), '/');
    }

    public static function preferredHost(): string
    {
        $parsed = parse_url(self::baseUrl());

        return $parsed['host'] ?? self::current();
    }

    public static function hasTenantEnv(string $host): bool
    {
        return file_exists(base_path("config/tenants/.env.{$host}"));
    }

    /**
     * @return list<string>
     */
    public static function hiddenFeatures(string $host): array
    {
        return self::config($host)['hidden_features'] ?? [];
    }

    public static function isFeatureHidden(string $host, string $feature): bool
    {
        return in_array($feature, self::hiddenFeatures($host), true);
    }

    /**
     * @return array<string, string>
     */
    public static function sitemapRoutes(): array
    {
        return [
            'writes' => '/writes',
            'tests' => '/tests',
            'certificates' => '/certificates',
            'categories' => '/categories',
            'workspaces' => '/workspaces',
            'journey' => '/journey',
        ];
    }
}
