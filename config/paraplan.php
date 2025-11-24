<?php

return [
    'commodities' => require __DIR__ . '/ParaPlan/commodities.php',
    'crypto' => require __DIR__ . '/ParaPlan/crypto.php',
    'fiat' => require __DIR__ . '/ParaPlan/fiat.php',

    /*
    |--------------------------------------------------------------------------
    | Data Source Reliability
    |--------------------------------------------------------------------------
    |
    | Reliability levels for different data sources.
    | Higher number = more reliable (used when timestamps are equal)
    | 
    | When the same symbol exists from multiple sources:
    | 1. More recent timestamp wins
    | 2. If timestamps are equal, higher reliability wins
    |
    */
    'source_reliability' => [
        'metalpriceapi' => 100, // Highest reliability (most trusted)
        // Add other sources as needed:
        // 'xapi' => 80,
        // 'othersource' => 50,
    ],
];
