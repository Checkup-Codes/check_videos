<?php

namespace App\Support;

use Illuminate\Http\Request;

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
        return self::normalize(self::httpRequest()->getHost());
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
        $appUrl = rtrim((string) config('app.url', ''), '/');
        $configHost = parse_url($appUrl, PHP_URL_HOST);

        if ($configHost && !self::isLocalHost($configHost)) {
            return $appUrl;
        }

        if (!app()->runningInConsole()) {
            $request = self::httpRequest();
            if ($request->getHost()) {
                $scheme = $request->isSecure() ? 'https' : 'http';

                return $scheme . '://' . $request->getHost();
            }
        }

        $host = self::current();
        if (self::hasTenantEnv($host)) {
            $tenantUrl = self::readAppUrlFromTenantEnv($host);
            if ($tenantUrl) {
                return rtrim($tenantUrl, '/');
            }
        }

        return $appUrl !== '' ? $appUrl : 'http://localhost';
    }

    public static function isLocalHost(string $host): bool
    {
        return in_array(self::normalize($host), ['localhost', '127.0.0.1', '::1'], true);
    }

    public static function tenantAppUrl(string $host): ?string
    {
        return self::readAppUrlFromTenantEnv(self::normalize($host));
    }

    private static function readAppUrlFromTenantEnv(string $host): ?string
    {
        $envFile = base_path("config/tenants/.env.{$host}");
        if (!file_exists($envFile)) {
            return null;
        }

        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        foreach ($lines as $line) {
            if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) {
                continue;
            }

            [$key, $value] = explode('=', $line, 2);
            if (trim($key) === 'APP_URL') {
                return trim($value, " \t\n\r\0\x0B\"'");
            }
        }

        return null;
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

    private static function httpRequest(): Request
    {
        return app(Request::class);
    }
}
