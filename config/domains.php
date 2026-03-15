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
            'description' => 'Ana domain - tüm özellikler aktif',
        ],

        'yusufdur.com' => [
            'name' => 'Yusuf Dur',
            'type' => 'parked',
            'index_in_google' => false,
            'features' => ['writes', 'journey', 'certificates'],
            'hidden_features' => ['workspaces', 'projects'],
            'description' => 'Park edilmiş domain - kişisel blog odaklı',
        ],

        'elselif.com' => [
            'name' => 'Else If',
            'type' => 'parked',
            'index_in_google' => false,
            'features' => ['writes', 'tests'],
            'hidden_features' => ['workspaces', 'projects', 'journey'],
            'description' => 'Park edilmiş domain - frontend/UI odaklı',
        ],

        'candundarli.com' => [
            'name' => 'Can Dündarlı',
            'type' => 'tenant',
            'index_in_google' => false,
            'features' => ['all'],
            'hidden_features' => ['workspaces', 'projects', 'journey'],
            'description' => 'Tenant domain',
        ],

        // Localhost için
        'localhost' => [
            'name' => 'Local Development',
            'type' => 'development',
            'index_in_google' => false,
            'features' => ['all'],
            'description' => 'Development environment',
        ],
    ],
];

