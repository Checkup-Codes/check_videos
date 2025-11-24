<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Fiat Currency API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the external fiat currency API integration.
    | Uses the same API as metals but filters for fiat currency pairs.
    |
    */

    'api' => [
        'base_url' => env('METALS_API_BASE_URL'),
        'key' => env('METALS_API_KEY'),
        'base_currency' => env('METALS_API_BASE_CURRENCY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Supported Fiat Currency Pairs
    |--------------------------------------------------------------------------
    |
    | List of supported fiat currency pairs with their base currency, quote currency,
    | and provider symbol mapping.
    |
    | To add a new currency pair, simply add a new entry to this array.
    | No code changes are required elsewhere.
    |
    */

    'pairs' => [
        // TRY pairs
        ['base_currency' => 'TRY', 'quote_currency' => 'USD', 'provider_symbol' => 'TRYUSD'],
        ['base_currency' => 'TRY', 'quote_currency' => 'EUR', 'provider_symbol' => 'TRYEUR'],
        ['base_currency' => 'TRY', 'quote_currency' => 'GBP', 'provider_symbol' => 'TRYGBP'],

        // USD pairs
        ['base_currency' => 'USD', 'quote_currency' => 'TRY', 'provider_symbol' => 'USDTRY'],
        ['base_currency' => 'USD', 'quote_currency' => 'EUR', 'provider_symbol' => 'USDEUR'],
        ['base_currency' => 'USD', 'quote_currency' => 'GBP', 'provider_symbol' => 'USDGBP'],

        // EUR pairs
        ['base_currency' => 'EUR', 'quote_currency' => 'TRY', 'provider_symbol' => 'EURTRY'],
        ['base_currency' => 'EUR', 'quote_currency' => 'USD', 'provider_symbol' => 'EURUSD'],
        ['base_currency' => 'EUR', 'quote_currency' => 'GBP', 'provider_symbol' => 'EURGBP'],

        // GBP pairs
        ['base_currency' => 'GBP', 'quote_currency' => 'TRY', 'provider_symbol' => 'GBPTRY'],
        ['base_currency' => 'GBP', 'quote_currency' => 'USD', 'provider_symbol' => 'GBPUSD'],
        ['base_currency' => 'GBP', 'quote_currency' => 'EUR', 'provider_symbol' => 'GBPEUR'],

        // Other major currencies
        ['base_currency' => 'JPY', 'quote_currency' => 'TRY', 'provider_symbol' => 'JPYTRY'],
        ['base_currency' => 'JPY', 'quote_currency' => 'USD', 'provider_symbol' => 'JPYUSD'],
        ['base_currency' => 'CHF', 'quote_currency' => 'TRY', 'provider_symbol' => 'CHFTRY'],
        ['base_currency' => 'CHF', 'quote_currency' => 'USD', 'provider_symbol' => 'CHFUSD'],
        ['base_currency' => 'CAD', 'quote_currency' => 'TRY', 'provider_symbol' => 'CADTRY'],
        ['base_currency' => 'CAD', 'quote_currency' => 'USD', 'provider_symbol' => 'CADUSD'],
    ],
];

