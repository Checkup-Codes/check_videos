<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Main Domain
    |--------------------------------------------------------------------------
    |
    | Platform owner domain. Each tenant domain is indexed independently
    | with its own DB, sitemap and canonical URLs.
    |
    */
    'main_domain' => env('MAIN_DOMAIN', 'checkupcodes.com'),

    /*
    |--------------------------------------------------------------------------
    | Domain Configuration
    |--------------------------------------------------------------------------
    |
    | Configure each domain's behavior, features, and SEO settings.
    |
    */
    'domains' => [
        'checkupcodes.com' => [
            'name' => 'Check-up Codes',
            'type' => 'main',
            'index_in_google' => true,
            'features' => ['all'],
            'description' => 'Ana domain - Google\'da indexlenir',
            'seo_strategy' => 'index_follow',
        ],

        'yusufdur.com' => [
            'name' => 'Yusuf Dur',
            'type' => 'tenant',
            'index_in_google' => true,
            'features' => ['writes', 'journey', 'certificates'],
            'hidden_features' => ['workspaces', 'projects'],
            'description' => 'Tenant domain - bağımsız SEO',
        ],

        'elselif.com' => [
            'name' => 'Else If',
            'type' => 'tenant',
            'index_in_google' => true,
            'features' => ['writes', 'tests'],
            'hidden_features' => ['workspaces', 'projects', 'journey'],
            'description' => 'Tenant domain - bağımsız SEO',
        ],

        'candundarli.com' => [
            'name' => 'Can Dündarlı',
            'type' => 'tenant',
            'index_in_google' => true,
            'features' => ['all'],
            'hidden_features' => ['workspaces', 'projects', 'journey'],
            'description' => 'Tenant domain - bağımsız SEO',
        ],

        'alperenalperen.com' => [
            'name' => 'Alperen Alperen',
            'type' => 'tenant',
            'index_in_google' => true,
            'features' => ['all'],
            'description' => 'Tenant domain - bağımsız SEO',
        ],

        // Localhost için
        'localhost' => [
            'name' => 'Local Development',
            'type' => 'development',
            'index_in_google' => false,
            'features' => ['all'],
            'description' => 'Development environment',
            'seo_strategy' => 'noindex_nofollow',
        ],
    ],
];

