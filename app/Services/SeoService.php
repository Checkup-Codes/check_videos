<?php

namespace App\Services;

use App\Models\Seo;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class SeoService
{
    private const CACHE_PREFIX = 'seo_';
    private const CACHE_TTL = 3600; // 1 hour

    public function getSeoData(string $route, array $parameters = []): array
    {
        $cacheKey = self::CACHE_PREFIX . md5($route . json_encode($parameters));

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($route, $parameters) {
            $seo = Seo::where('route', $route)->first();

            if (!$seo) {
                return [];
            }

            return [
                'title' => $this->replacePlaceholders($seo->title, $parameters),
                'description' => $this->replacePlaceholders($seo->description, $parameters),
                'keywords' => $seo->keywords,
                'og_title' => $this->replacePlaceholders($seo->og_title ?? $seo->title, $parameters),
                'og_description' => $this->replacePlaceholders($seo->og_description ?? $seo->description, $parameters),
                'og_image' => $seo->og_image,
                'canonical_url' => $this->replacePlaceholders($seo->canonical_url ?? url()->current(), $parameters),
                'robots' => $seo->robots ?? 'index, follow',
                'schema_org' => $seo->schema_org ?? null,
            ];
        });
    }

    public function createOrUpdateSeo(string $route, array $data): Seo
    {
        if ($route !== 'home') {
            throw new \Exception('Sadece home route\'u için SEO verisi düzenlenebilir.');
        }

        $seo = Seo::updateOrCreate(
            ['route' => $route],
            [
                'title' => $data['title'],
                'description' => $data['description'],
                'keywords' => $data['keywords'] ?? null,
                'og_title' => $data['og_title'] ?? null,
                'og_description' => $data['og_description'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'canonical_url' => $data['canonical_url'] ?? null,
                'robots' => $data['robots'] ?? 'index, follow',
                'schema_org' => $data['schema_org'] ?? null,
            ]
        );

        $this->clearCache();
        return $seo;
    }

    public function deleteSeo(string $route): bool
    {
        if ($route === 'home') {
            throw new \Exception('Home route\'u silinemez.');
        }

        $deleted = Seo::where('route', $route)->delete();
        if ($deleted) {
            $this->clearCache();
        }
        return $deleted;
    }

    public function getAllSeoData(): array
    {
        return Cache::remember(self::CACHE_PREFIX . 'all', self::CACHE_TTL, function () {
            return Seo::all()->map(function ($seo) {
                return [
                    'id' => $seo->id,
                    'route' => $seo->route,
                    'title' => $seo->title,
                    'description' => $seo->description,
                    'keywords' => $seo->keywords,
                    'og_title' => $seo->og_title,
                    'og_description' => $seo->og_description,
                    'og_image' => $seo->og_image,
                    'canonical_url' => $seo->canonical_url,
                    'robots' => $seo->robots,
                    'schema_org' => $seo->schema_org,
                    'created_at' => $seo->created_at,
                    'updated_at' => $seo->updated_at,
                ];
            })->toArray();
        });
    }

    private function replacePlaceholders(string $text, array $parameters): string
    {
        foreach ($parameters as $key => $value) {
            $text = str_replace('{' . $key . '}', $value, $text);
        }
        return $text;
    }

    public function clearCache(): void
    {
        // Tüm SEO cache'lerini temizle
        Cache::forget(self::CACHE_PREFIX . 'all');

        // Home route için cache'i temizle
        Cache::forget(self::CACHE_PREFIX . md5('home'));

        // Diğer potansiyel cache'leri temizle
        foreach (Cache::get(self::CACHE_PREFIX . 'keys', []) as $key) {
            Cache::forget($key);
        }
    }
}
