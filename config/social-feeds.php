<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Social Media Feed Configuration
    |--------------------------------------------------------------------------
    |
    | Bu dosya sosyal medya platformlarından feed çekmek için gerekli
    | API anahtarlarını ve ayarları içerir.
    |
    */

    'youtube' => [
        'enabled' => env('YOUTUBE_FEED_ENABLED', false),
        'api_key' => env('YOUTUBE_API_KEY'),
        'channel_id' => env('YOUTUBE_CHANNEL_ID'),
        'max_results' => 3,
        'cache_ttl' => 3600, // 1 saat
    ],

    'instagram' => [
        'enabled' => env('INSTAGRAM_FEED_ENABLED', false),
        'access_token' => env('INSTAGRAM_ACCESS_TOKEN'),
        'user_id' => env('INSTAGRAM_USER_ID'),
        'max_results' => 6,
        'cache_ttl' => 3600,
    ],

    'twitter' => [
        'enabled' => env('TWITTER_FEED_ENABLED', false),
        'username' => env('TWITTER_USERNAME'),
        'max_results' => 5,
        'cache_ttl' => 1800, // 30 dakika
        
        // RSS Feed Yöntemi (Twitter API artık paralı olduğu için)
        // Seçenekler: 'rsshub', 'nitter', 'custom'
        'rss_method' => env('TWITTER_RSS_METHOD', 'rsshub'),
        
        // RSSHub instance (kendi instance'ınızı host edebilirsiniz)
        'rsshub_instance' => env('TWITTER_RSSHUB_INSTANCE', 'https://rsshub.app'),
        
        // Nitter instance (kendi instance'ınızı host edebilirsiniz)
        'nitter_instance' => env('TWITTER_NITTER_INSTANCE', 'https://nitter.net'),
        
        // Özel RSS URL (rss_method = 'custom' ise)
        'custom_rss_url' => env('TWITTER_CUSTOM_RSS_URL'),
        
        // İstatistikler için manuel değerler (RSS'den alınamıyor)
        'followers_count' => env('TWITTER_FOLLOWERS_COUNT', 0),
        'tweets_count' => env('TWITTER_TWEETS_COUNT', 0),
        'following_count' => env('TWITTER_FOLLOWING_COUNT', 0),
    ],

    'github' => [
        'enabled' => env('GITHUB_FEED_ENABLED', false),
        'username' => env('GITHUB_USERNAME'),
        'max_results' => 5,
        'cache_ttl' => 3600,
    ],

    'medium' => [
        'enabled' => env('MEDIUM_FEED_ENABLED', false),
        'username' => env('MEDIUM_USERNAME'),
        'max_results' => 3,
        'cache_ttl' => 7200, // 2 saat
    ],

    'linkedin' => [
        'enabled' => env('LINKEDIN_FEED_ENABLED', false),
        'access_token' => env('LINKEDIN_ACCESS_TOKEN'),
        'max_results' => 3,
        'cache_ttl' => 3600,
    ],

    // RSS Feed desteği
    'rss' => [
        'enabled' => env('RSS_FEED_ENABLED', false),
        'feeds' => [
            // 'blog' => 'https://yourblog.com/feed',
        ],
        'cache_ttl' => 3600,
    ],

    // Global ayarlar
    'cache_enabled' => env('SOCIAL_FEEDS_CACHE_ENABLED', true),
    'timeout' => 10, // API istekleri için timeout (saniye)
];
