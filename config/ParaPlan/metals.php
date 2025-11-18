<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Metals API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the external metals API integration.
    |
    */

    'api' => [
        'base_url' => env('METALS_API_BASE_URL'),
        'key' => env('METALS_API_KEY'),
        'base_currency' => env('METALS_API_BASE_CURRENCY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Supported Metal Symbols
    |--------------------------------------------------------------------------
    |
    | List of supported metal symbols with their base symbol, quote currency,
    | and provider symbol mapping.
    |
    | To add a new metal/currency pair, simply add a new entry to this array.
    | No code changes are required elsewhere.
    |
    */

    'symbols' => [
        // XAU - Altın (Gold)
        ['base_symbol' => 'XAU', 'quote_currency' => 'TRY', 'provider_symbol' => 'XAUTRY'],
        ['base_symbol' => 'XAU', 'quote_currency' => 'USD', 'provider_symbol' => 'XAUUSD'],

        // XAG - Gümüş (Silver)
        ['base_symbol' => 'XAG', 'quote_currency' => 'TRY', 'provider_symbol' => 'XAGTRY'],
        ['base_symbol' => 'XAG', 'quote_currency' => 'USD', 'provider_symbol' => 'XAGUSD'],

        // XPT - Platin (Platinum)
        ['base_symbol' => 'XPT', 'quote_currency' => 'TRY', 'provider_symbol' => 'XPTTRY'],
        ['base_symbol' => 'XPT', 'quote_currency' => 'USD', 'provider_symbol' => 'XPTUSD'],

        // XPD - Paladyum (Palladium)
        ['base_symbol' => 'XPD', 'quote_currency' => 'TRY', 'provider_symbol' => 'XPDTRY'],
        ['base_symbol' => 'XPD', 'quote_currency' => 'USD', 'provider_symbol' => 'XPDUSD'],

        // ============================================================
        // BELOW METALS REQUIRE PAID PLAN - Commented out for free tier
        // Uncomment these when you upgrade to a paid plan
        // ============================================================

        // XCU - Bakır (Copper) - Requires paid plan
        // ['base_symbol' => 'XCU', 'quote_currency' => 'TRY', 'provider_symbol' => 'XCUTRY'],
        // ['base_symbol' => 'XCU', 'quote_currency' => 'USD', 'provider_symbol' => 'XCUUSD'],

        // XRH - Rodyum (Rhodium) - Requires paid plan
        // ['base_symbol' => 'XRH', 'quote_currency' => 'TRY', 'provider_symbol' => 'XRHTRY'],
        // ['base_symbol' => 'XRH', 'quote_currency' => 'USD', 'provider_symbol' => 'XRHUSD'],

        // XIR - İridyum (Iridium) - Requires paid plan
        // ['base_symbol' => 'XIR', 'quote_currency' => 'TRY', 'provider_symbol' => 'XIRTRY'],
        // ['base_symbol' => 'XIR', 'quote_currency' => 'USD', 'provider_symbol' => 'XIRUSD'],

        // XRU - Rutenyum (Ruthenium) - Requires paid plan
        // ['base_symbol' => 'XRU', 'quote_currency' => 'TRY', 'provider_symbol' => 'XRUTRY'],
        // ['base_symbol' => 'XRU', 'quote_currency' => 'USD', 'provider_symbol' => 'XRUUSD'],

        // XOS - Osmiyum (Osmium) - Requires paid plan
        // ['base_symbol' => 'XOS', 'quote_currency' => 'TRY', 'provider_symbol' => 'XOSTRY'],
        // ['base_symbol' => 'XOS', 'quote_currency' => 'USD', 'provider_symbol' => 'XOSUSD'],

        // XRE - Renyum (Rhenium) - Requires paid plan
        // ['base_symbol' => 'XRE', 'quote_currency' => 'TRY', 'provider_symbol' => 'XRETRY'],
        // ['base_symbol' => 'XRE', 'quote_currency' => 'USD', 'provider_symbol' => 'XREUSD'],

        // XTA - Tantal (Tantalum) - Requires paid plan
        // ['base_symbol' => 'XTA', 'quote_currency' => 'TRY', 'provider_symbol' => 'XTATRY'],
        // ['base_symbol' => 'XTA', 'quote_currency' => 'USD', 'provider_symbol' => 'XTAUSD'],

        // XMO - Molibden (Molybdenum) - Requires paid plan
        // ['base_symbol' => 'XMO', 'quote_currency' => 'TRY', 'provider_symbol' => 'XMOTRY'],
        // ['base_symbol' => 'XMO', 'quote_currency' => 'USD', 'provider_symbol' => 'XMOUSD'],

        // XNI - Nikel (Nickel) - Requires paid plan
        // ['base_symbol' => 'XNI', 'quote_currency' => 'TRY', 'provider_symbol' => 'XNITRY'],
        // ['base_symbol' => 'XNI', 'quote_currency' => 'USD', 'provider_symbol' => 'XNIUSD'],

        // XZN - Çinko (Zinc) - Requires paid plan
        // ['base_symbol' => 'XZN', 'quote_currency' => 'TRY', 'provider_symbol' => 'XZNTRY'],
        // ['base_symbol' => 'XZN', 'quote_currency' => 'USD', 'provider_symbol' => 'XZNUSD'],

        // XPB - Kurşun (Lead) - Requires paid plan
        // ['base_symbol' => 'XPB', 'quote_currency' => 'TRY', 'provider_symbol' => 'XPBTRY'],
        // ['base_symbol' => 'XPB', 'quote_currency' => 'USD', 'provider_symbol' => 'XPBUSD'],

        // XAL - Alüminyum (Aluminum) - Requires paid plan
        // ['base_symbol' => 'XAL', 'quote_currency' => 'TRY', 'provider_symbol' => 'XALTRY'],
        // ['base_symbol' => 'XAL', 'quote_currency' => 'USD', 'provider_symbol' => 'XALUSD'],

        // XSN - Kalay (Tin) - Requires paid plan
        // ['base_symbol' => 'XSN', 'quote_currency' => 'TRY', 'provider_symbol' => 'XSNTRY'],
        // ['base_symbol' => 'XSN', 'quote_currency' => 'USD', 'provider_symbol' => 'XSNUSD'],

        // XCO - Kobalt (Cobalt) - Requires paid plan
        // ['base_symbol' => 'XCO', 'quote_currency' => 'TRY', 'provider_symbol' => 'XCOTRY'],
        // ['base_symbol' => 'XCO', 'quote_currency' => 'USD', 'provider_symbol' => 'XCOUSD'],

        // XMN - Mangan (Manganese) - Requires paid plan
        // ['base_symbol' => 'XMN', 'quote_currency' => 'TRY', 'provider_symbol' => 'XMNTRY'],
        // ['base_symbol' => 'XMN', 'quote_currency' => 'USD', 'provider_symbol' => 'XMNUSD'],

        // XCR - Krom (Chromium) - Requires paid plan
        // ['base_symbol' => 'XCR', 'quote_currency' => 'TRY', 'provider_symbol' => 'XCRTRY'],
        // ['base_symbol' => 'XCR', 'quote_currency' => 'USD', 'provider_symbol' => 'XCRUSD'],
    ],
];
