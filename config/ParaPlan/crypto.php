<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Crypto API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the external crypto API integration.
    | Uses the same API as metals but filters for cryptocurrency symbols.
    |
    */

    'api' => [
        'base_url' => env('METALS_API_BASE_URL'),
        'key' => env('METALS_API_KEY'),
        'base_currency' => env('METALS_API_BASE_CURRENCY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Supported Cryptocurrency Symbols
    |--------------------------------------------------------------------------
    |
    | List of supported cryptocurrency symbols with their base symbol, quote currency,
    | and provider symbol mapping.
    |
    | To add a new crypto/currency pair, simply add a new entry to this array.
    | No code changes are required elsewhere.
    |
    */

    'symbols' => [
        // BTC - Bitcoin
        ['base_symbol' => 'BTC', 'quote_currency' => 'TRY', 'provider_symbol' => 'BTCTRY'],
        ['base_symbol' => 'BTC', 'quote_currency' => 'USD', 'provider_symbol' => 'BTCUSD'],

        // ETH - Ethereum
        ['base_symbol' => 'ETH', 'quote_currency' => 'TRY', 'provider_symbol' => 'ETHTRY'],
        ['base_symbol' => 'ETH', 'quote_currency' => 'USD', 'provider_symbol' => 'ETHUSD'],

        // ADA - Cardano
        ['base_symbol' => 'ADA', 'quote_currency' => 'TRY', 'provider_symbol' => 'ADATRY'],
        ['base_symbol' => 'ADA', 'quote_currency' => 'USD', 'provider_symbol' => 'ADAUSD'],

        // DOT - Polkadot
        ['base_symbol' => 'DOT', 'quote_currency' => 'TRY', 'provider_symbol' => 'DOTTRY'],
        ['base_symbol' => 'DOT', 'quote_currency' => 'USD', 'provider_symbol' => 'DOTUSD'],

        // SOL - Solana
        ['base_symbol' => 'SOL', 'quote_currency' => 'TRY', 'provider_symbol' => 'SOLTRY'],
        ['base_symbol' => 'SOL', 'quote_currency' => 'USD', 'provider_symbol' => 'SOLUSD'],

        // LTC - Litecoin
        ['base_symbol' => 'LTC', 'quote_currency' => 'TRY', 'provider_symbol' => 'LTCTRY'],
        ['base_symbol' => 'LTC', 'quote_currency' => 'USD', 'provider_symbol' => 'LTCUSD'],

        // BNB - Binance Coin
        ['base_symbol' => 'BNB', 'quote_currency' => 'TRY', 'provider_symbol' => 'BNBTRY'],
        ['base_symbol' => 'BNB', 'quote_currency' => 'USD', 'provider_symbol' => 'BNBUSD'],

        // LINK - Chainlink
        ['base_symbol' => 'LINK', 'quote_currency' => 'TRY', 'provider_symbol' => 'LINKTRY'],
        ['base_symbol' => 'LINK', 'quote_currency' => 'USD', 'provider_symbol' => 'LINKUSD'],

        // XRP - Ripple
        ['base_symbol' => 'XRP', 'quote_currency' => 'TRY', 'provider_symbol' => 'XRPTRY'],
        ['base_symbol' => 'XRP', 'quote_currency' => 'USD', 'provider_symbol' => 'XRPUSD'],

        // DOGE - Dogecoin
        ['base_symbol' => 'DOGE', 'quote_currency' => 'TRY', 'provider_symbol' => 'DOGETRY'],
        ['base_symbol' => 'DOGE', 'quote_currency' => 'USD', 'provider_symbol' => 'DOGEUSD'],
    ],
];

