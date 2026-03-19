<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Main Domain
    |--------------------------------------------------------------------------
    |
    | The primary domain that should receive all SEO authority.
    | Parked domains will use canonical URLs pointing to this domain.
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
            'type' => 'parked',
            'index_in_google' => false,
            'features' => ['writes', 'journey', 'certificates'],
            'hidden_features' => ['workspaces', 'projects'],
            'description' => 'Park edilmiş domain - noindex, follow stratejisi',
            'seo_strategy' => 'noindex_follow',
            'canonical_target' => 'checkupcodes.com',
        ],

        'elselif.com' => [
            'name' => 'Else If',
            'type' => 'parked',
            'index_in_google' => false,
            'features' => ['writes', 'tests'],
            'hidden_features' => ['workspaces', 'projects', 'journey'],
            'description' => 'Park edilmiş domain - noindex, follow stratejisi',
            'seo_strategy' => 'noindex_follow',
            'canonical_target' => 'checkupcodes.com',
        ],

        'candundarli.com' => [
            'name' => 'Can Dündarlı',
            'type' => 'tenant',
            'index_in_google' => false,
            'features' => ['all'],
            'hidden_features' => ['workspaces', 'projects', 'journey'],
            'description' => 'Tenant domain - noindex, follow stratejisi',
            'seo_strategy' => 'noindex_follow',
            'canonical_target' => 'checkupcodes.com',
        ],

        'alperenalperen.com' => [
            'name' => 'Alperen Alperen',
            'type' => 'parked',
            'index_in_google' => false,
            'features' => ['all'],
            'description' => 'Park edilmiş domain - noindex, follow stratejisi',
            'seo_strategy' => 'noindex_follow',
            'canonical_target' => 'checkupcodes.com',
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

