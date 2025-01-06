<?php

namespace App\Services;

use App\Models\Seo;
use Illuminate\Support\Facades\Cache;

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
                return $this->getDefaultSeoData();
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

    private function getDefaultSeoData(): array
    {
        return [
            'title' => 'Checkup Codes',
            'description' => 'Yazılım dünyasında size yardımcı olacak içerikler',
            'keywords' => 'yazılım, programlama, web geliştirme',
            'og_title' => 'Checkup Codes',
            'og_description' => 'Yazılım dünyasında size yardımcı olacak içerikler',
            'og_image' => asset('images/og-default.jpg'),
            'canonical_url' => url()->current(),
            'robots' => 'index, follow',
            'schema_org' => null,
        ];
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
        Cache::tags([self::CACHE_PREFIX])->flush();
    }
}
