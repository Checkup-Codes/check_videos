<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SocialFeedService
{
    /**
     * Tüm aktif sosyal medya feedlerini getir
     */
    public function getAllFeeds(): array
    {
        $feeds = [];

        if (config('social-feeds.youtube.enabled')) {
            $feeds['youtube'] = $this->getYoutubeFeed();
        }

        if (config('social-feeds.instagram.enabled')) {
            $feeds['instagram'] = $this->getInstagramFeed();
        }

        if (config('social-feeds.twitter.enabled')) {
            $feeds['twitter'] = $this->getTwitterFeed();
        }

        if (config('social-feeds.github.enabled')) {
            $feeds['github'] = $this->getGithubFeed();
        }

        if (config('social-feeds.medium.enabled')) {
            $feeds['medium'] = $this->getMediumFeed();
        }

        return $feeds;
    }

    /**
     * Tüm sosyal medya istatistiklerini getir
     */
    public function getAllStats(): array
    {
        $stats = [];

        if (config('social-feeds.youtube.enabled')) {
            $stats['youtube'] = $this->getYoutubeStats();
        }

        if (config('social-feeds.instagram.enabled')) {
            $stats['instagram'] = $this->getInstagramStats();
        }

        if (config('social-feeds.twitter.enabled')) {
            $stats['twitter'] = $this->getTwitterStats();
        }

        if (config('social-feeds.github.enabled')) {
            $stats['github'] = $this->getGithubStats();
        }

        if (config('social-feeds.medium.enabled')) {
            $stats['medium'] = $this->getMediumStats();
        }

        return $stats;
    }

    /**
     * YouTube kanal istatistikleri
     */
    public function getYoutubeStats(): array
    {
        $cacheKey = 'social_stats_youtube';
        $cacheTtl = config('social-feeds.youtube.cache_ttl', 3600);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $apiKey = config('social-feeds.youtube.api_key');
            $channelId = config('social-feeds.youtube.channel_id');

            if (!$apiKey || !$channelId) {
                return $this->emptyStats('youtube');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get('https://www.googleapis.com/youtube/v3/channels', [
                    'key' => $apiKey,
                    'id' => $channelId,
                    'part' => 'statistics,snippet',
                ]);

            if (!$response->successful()) {
                Log::warning('YouTube Stats API error', ['status' => $response->status()]);
                return $this->emptyStats('youtube');
            }

            $data = $response->json();
            $channel = $data['items'][0] ?? null;

            if (!$channel) {
                return $this->emptyStats('youtube');
            }

            $result = [
                'platform' => 'youtube',
                'username' => $channel['snippet']['title'] ?? '',
                'profile_url' => "https://www.youtube.com/channel/{$channelId}",
                'followers' => (int) ($channel['statistics']['subscriberCount'] ?? 0),
                'total_posts' => (int) ($channel['statistics']['videoCount'] ?? 0),
                'total_views' => (int) ($channel['statistics']['viewCount'] ?? 0),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('YouTube stats error', ['error' => $e->getMessage()]);
            return $this->emptyStats('youtube');
        }
    }

    /**
     * Instagram istatistikleri
     */
    public function getInstagramStats(): array
    {
        $cacheKey = 'social_stats_instagram';
        $cacheTtl = config('social-feeds.instagram.cache_ttl', 3600);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $accessToken = config('social-feeds.instagram.access_token');

            if (!$accessToken) {
                return $this->emptyStats('instagram');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get('https://graph.instagram.com/me', [
                    'fields' => 'id,username,account_type,media_count',
                    'access_token' => $accessToken,
                ]);

            if (!$response->successful()) {
                return $this->emptyStats('instagram');
            }

            $data = $response->json();

            $result = [
                'platform' => 'instagram',
                'username' => $data['username'] ?? '',
                'profile_url' => 'https://www.instagram.com/' . ($data['username'] ?? ''),
                'followers' => 0, // Basic Display API doesn't provide follower count
                'total_posts' => (int) ($data['media_count'] ?? 0),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Instagram stats error', ['error' => $e->getMessage()]);
            return $this->emptyStats('instagram');
        }
    }

    /**
     * Twitter istatistikleri
     * RSS feed'den tam istatistik alamadığımız için manuel girilen değerleri kullanıyoruz
     */
    public function getTwitterStats(): array
    {
        $cacheKey = 'social_stats_twitter';
        $cacheTtl = config('social-feeds.twitter.cache_ttl', 1800);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $username = config('social-feeds.twitter.username');

            if (!$username) {
                return $this->emptyStats('twitter');
            }

            // RSS'den tam istatistik alamadığımız için config'den manuel değerleri kullanıyoruz
            // Alternatif: Web scraping ile profil sayfasından çekebilirsiniz
            $result = [
                'platform' => 'twitter',
                'username' => $username,
                'profile_url' => "https://twitter.com/{$username}",
                'followers' => (int) config('social-feeds.twitter.followers_count', 0),
                'total_posts' => (int) config('social-feeds.twitter.tweets_count', 0),
                'following' => (int) config('social-feeds.twitter.following_count', 0),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Twitter stats error', ['error' => $e->getMessage()]);
            return $this->emptyStats('twitter');
        }
    }

    /**
     * GitHub istatistikleri
     */
    public function getGithubStats(): array
    {
        $cacheKey = 'social_stats_github';
        $cacheTtl = config('social-feeds.github.cache_ttl', 3600);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $username = config('social-feeds.github.username');

            if (!$username) {
                return $this->emptyStats('github');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->withHeaders(['Accept' => 'application/vnd.github.v3+json'])
                ->get("https://api.github.com/users/{$username}");

            if (!$response->successful()) {
                return $this->emptyStats('github');
            }

            $data = $response->json();

            $result = [
                'platform' => 'github',
                'username' => $data['login'] ?? '',
                'profile_url' => $data['html_url'] ?? '',
                'followers' => (int) ($data['followers'] ?? 0),
                'total_posts' => (int) ($data['public_repos'] ?? 0),
                'following' => (int) ($data['following'] ?? 0),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('GitHub stats error', ['error' => $e->getMessage()]);
            return $this->emptyStats('github');
        }
    }

    /**
     * Medium istatistikleri
     */
    public function getMediumStats(): array
    {
        $cacheKey = 'social_stats_medium';
        $cacheTtl = config('social-feeds.medium.cache_ttl', 7200);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $username = config('social-feeds.medium.username');

            if (!$username) {
                return $this->emptyStats('medium');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get("https://medium.com/feed/@{$username}");

            if (!$response->successful()) {
                return $this->emptyStats('medium');
            }

            $xml = simplexml_load_string($response->body());
            if (!$xml) {
                return $this->emptyStats('medium');
            }

            $totalPosts = count($xml->channel->item);

            $result = [
                'platform' => 'medium',
                'username' => $username,
                'profile_url' => "https://medium.com/@{$username}",
                'followers' => 0, // RSS doesn't provide follower count
                'total_posts' => $totalPosts,
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Medium stats error', ['error' => $e->getMessage()]);
            return $this->emptyStats('medium');
        }
    }

    /**
     * YouTube son videolar
     */
    public function getYoutubeFeed(): array
    {
        $cacheKey = 'social_feed_youtube';
        $cacheTtl = config('social-feeds.youtube.cache_ttl', 3600);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $apiKey = config('social-feeds.youtube.api_key');
            $channelId = config('social-feeds.youtube.channel_id');
            $maxResults = config('social-feeds.youtube.max_results', 3);

            if (!$apiKey || !$channelId) {
                return $this->emptyFeed('youtube');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get('https://www.googleapis.com/youtube/v3/search', [
                    'key' => $apiKey,
                    'channelId' => $channelId,
                    'part' => 'snippet',
                    'order' => 'date',
                    'maxResults' => $maxResults,
                    'type' => 'video',
                ]);

            if (!$response->successful()) {
                Log::warning('YouTube API error', ['status' => $response->status()]);
                return $this->emptyFeed('youtube');
            }

            $data = $response->json();
            $items = collect($data['items'] ?? [])->map(function ($item) {
                return [
                    'id' => $item['id']['videoId'] ?? null,
                    'title' => $item['snippet']['title'] ?? '',
                    'description' => $item['snippet']['description'] ?? '',
                    'thumbnail' => $item['snippet']['thumbnails']['medium']['url'] ?? '',
                    'published_at' => $item['snippet']['publishedAt'] ?? null,
                    'url' => 'https://www.youtube.com/watch?v=' . ($item['id']['videoId'] ?? ''),
                ];
            })->toArray();

            $result = [
                'platform' => 'youtube',
                'items' => $items,
                'count' => count($items),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('YouTube feed error', ['error' => $e->getMessage()]);
            return $this->emptyFeed('youtube');
        }
    }

    /**
     * Instagram son gönderiler (Basic Display API)
     */
    public function getInstagramFeed(): array
    {
        $cacheKey = 'social_feed_instagram';
        $cacheTtl = config('social-feeds.instagram.cache_ttl', 3600);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $accessToken = config('social-feeds.instagram.access_token');
            $maxResults = config('social-feeds.instagram.max_results', 6);

            if (!$accessToken) {
                return $this->emptyFeed('instagram');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get('https://graph.instagram.com/me/media', [
                    'fields' => 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
                    'access_token' => $accessToken,
                    'limit' => $maxResults,
                ]);

            if (!$response->successful()) {
                Log::warning('Instagram API error', ['status' => $response->status()]);
                return $this->emptyFeed('instagram');
            }

            $data = $response->json();
            $items = collect($data['data'] ?? [])->map(function ($item) {
                return [
                    'id' => $item['id'] ?? null,
                    'caption' => $item['caption'] ?? '',
                    'media_type' => $item['media_type'] ?? 'IMAGE',
                    'media_url' => $item['media_url'] ?? '',
                    'thumbnail' => $item['thumbnail_url'] ?? $item['media_url'] ?? '',
                    'published_at' => $item['timestamp'] ?? null,
                    'url' => $item['permalink'] ?? '',
                ];
            })->toArray();

            $result = [
                'platform' => 'instagram',
                'items' => $items,
                'count' => count($items),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Instagram feed error', ['error' => $e->getMessage()]);
            return $this->emptyFeed('instagram');
        }
    }

    /**
     * Twitter son tweetler (RSS via Nitter or RSSHub)
     * Twitter API artık paralı olduğu için RSS feed kullanıyoruz
     */
    public function getTwitterFeed(): array
    {
        $cacheKey = 'social_feed_twitter';
        $cacheTtl = config('social-feeds.twitter.cache_ttl', 1800);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $username = config('social-feeds.twitter.username');
            $rssMethod = config('social-feeds.twitter.rss_method', 'rsshub'); // 'rsshub' or 'nitter'
            $maxResults = config('social-feeds.twitter.max_results', 5);

            if (!$username) {
                return $this->emptyFeed('twitter');
            }

            // RSS URL'ini belirle
            $rssUrl = $this->getTwitterRssUrl($username, $rssMethod);
            
            if (!$rssUrl) {
                return $this->emptyFeed('twitter');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get($rssUrl);

            if (!$response->successful()) {
                Log::warning('Twitter RSS feed error', ['status' => $response->status(), 'url' => $rssUrl]);
                return $this->emptyFeed('twitter');
            }

            $xml = simplexml_load_string($response->body());
            if (!$xml) {
                return $this->emptyFeed('twitter');
            }

            $items = collect($xml->channel->item ?? $xml->entry ?? [])
                ->take($maxResults)
                ->map(function ($item) use ($username) {
                    // RSS ve Atom formatlarını destekle
                    $title = (string) ($item->title ?? '');
                    $description = (string) ($item->description ?? $item->summary ?? '');
                    $link = (string) ($item->link ?? $item->link['href'] ?? '');
                    $pubDate = (string) ($item->pubDate ?? $item->published ?? '');
                    
                    // Tweet ID'yi link'ten çıkar
                    preg_match('/status\/(\d+)/', $link, $matches);
                    $tweetId = $matches[1] ?? null;

                    return [
                        'id' => $tweetId,
                        'text' => strip_tags($description ?: $title),
                        'title' => $title,
                        'published_at' => $pubDate,
                        'url' => $link ?: "https://twitter.com/{$username}",
                    ];
                })->toArray();

            $result = [
                'platform' => 'twitter',
                'items' => $items,
                'count' => count($items),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Twitter feed error', ['error' => $e->getMessage()]);
            return $this->emptyFeed('twitter');
        }
    }

    /**
     * Twitter için RSS URL oluştur
     */
    private function getTwitterRssUrl(string $username, string $method): ?string
    {
        switch ($method) {
            case 'rsshub':
                // RSSHub - Kendi instance'ınızı host edebilir veya public instance kullanabilirsiniz
                $rsshubInstance = config('social-feeds.twitter.rsshub_instance', 'https://rsshub.app');
                return "{$rsshubInstance}/twitter/user/{$username}";
                
            case 'nitter':
                // Nitter instance - Kendi instance'ınızı host edebilir veya public instance kullanabilirsiniz
                $nitterInstance = config('social-feeds.twitter.nitter_instance', 'https://nitter.net');
                return "{$nitterInstance}/{$username}/rss";
                
            case 'custom':
                // Özel RSS URL
                return config('social-feeds.twitter.custom_rss_url');
                
            default:
                return null;
        }
    }

    /**
     * GitHub son aktiviteler
     */
    public function getGithubFeed(): array
    {
        $cacheKey = 'social_feed_github';
        $cacheTtl = config('social-feeds.github.cache_ttl', 3600);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $username = config('social-feeds.github.username');
            $maxResults = config('social-feeds.github.max_results', 5);

            if (!$username) {
                return $this->emptyFeed('github');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->withHeaders(['Accept' => 'application/vnd.github.v3+json'])
                ->get("https://api.github.com/users/{$username}/events/public", [
                    'per_page' => $maxResults,
                ]);

            if (!$response->successful()) {
                return $this->emptyFeed('github');
            }

            $data = $response->json();
            $items = collect($data)->map(function ($item) {
                return [
                    'id' => $item['id'] ?? null,
                    'type' => $item['type'] ?? '',
                    'repo' => $item['repo']['name'] ?? '',
                    'published_at' => $item['created_at'] ?? null,
                    'url' => 'https://github.com/' . ($item['repo']['name'] ?? ''),
                    'payload' => $item['payload'] ?? [],
                ];
            })->toArray();

            $result = [
                'platform' => 'github',
                'items' => $items,
                'count' => count($items),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('GitHub feed error', ['error' => $e->getMessage()]);
            return $this->emptyFeed('github');
        }
    }

    /**
     * Medium son yazılar (RSS)
     */
    public function getMediumFeed(): array
    {
        $cacheKey = 'social_feed_medium';
        $cacheTtl = config('social-feeds.medium.cache_ttl', 7200);

        if (config('social-feeds.cache_enabled') && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $username = config('social-feeds.medium.username');
            $maxResults = config('social-feeds.medium.max_results', 3);

            if (!$username) {
                return $this->emptyFeed('medium');
            }

            $response = Http::timeout(config('social-feeds.timeout', 10))
                ->get("https://medium.com/feed/@{$username}");

            if (!$response->successful()) {
                return $this->emptyFeed('medium');
            }

            $xml = simplexml_load_string($response->body());
            if (!$xml) {
                return $this->emptyFeed('medium');
            }

            $items = collect($xml->channel->item)
                ->take($maxResults)
                ->map(function ($item) {
                    return [
                        'title' => (string) $item->title,
                        'description' => strip_tags((string) $item->description),
                        'url' => (string) $item->link,
                        'published_at' => (string) $item->pubDate,
                        'thumbnail' => $this->extractImageFromContent((string) $item->description),
                    ];
                })->toArray();

            $result = [
                'platform' => 'medium',
                'items' => $items,
                'count' => count($items),
                'last_updated' => now()->toIso8601String(),
            ];

            if (config('social-feeds.cache_enabled')) {
                Cache::put($cacheKey, $result, $cacheTtl);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Medium feed error', ['error' => $e->getMessage()]);
            return $this->emptyFeed('medium');
        }
    }

    /**
     * Cache'i temizle
     */
    public function clearCache(?string $platform = null): void
    {
        if ($platform) {
            Cache::forget("social_feed_{$platform}");
        } else {
            $platforms = ['youtube', 'instagram', 'twitter', 'github', 'medium'];
            foreach ($platforms as $p) {
                Cache::forget("social_feed_{$p}");
            }
        }
    }

    /**
     * Boş feed döndür
     */
    private function emptyFeed(string $platform): array
    {
        return [
            'platform' => $platform,
            'items' => [],
            'count' => 0,
            'last_updated' => now()->toIso8601String(),
        ];
    }

    /**
     * Boş istatistik döndür
     */
    private function emptyStats(string $platform): array
    {
        return [
            'platform' => $platform,
            'username' => '',
            'profile_url' => '',
            'followers' => 0,
            'total_posts' => 0,
            'last_updated' => now()->toIso8601String(),
        ];
    }

    /**
     * HTML içeriğinden ilk resmi çıkar
     */
    private function extractImageFromContent(string $content): ?string
    {
        preg_match('/<img[^>]+src="([^">]+)"/', $content, $matches);
        return $matches[1] ?? null;
    }
}
