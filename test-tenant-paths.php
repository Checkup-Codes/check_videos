#!/usr/bin/env php
<?php

/**
 * Tenant Path Test Script
 * 
 * Bu script tenant .env dosyalarının doğru yolda olup olmadığını kontrol eder
 */

echo "🔍 Tenant Path Test Script\n";
echo "==========================\n\n";

// Base path
$basePath = __DIR__;

// Check config/tenants directory
$tenantsDir = $basePath . '/config/tenants';
echo "📁 Checking config/tenants directory...\n";

if (!is_dir($tenantsDir)) {
    echo "❌ Directory does not exist: {$tenantsDir}\n";
    echo "   Creating directory...\n";
    mkdir($tenantsDir, 0755, true);
    echo "✅ Directory created\n\n";
} else {
    echo "✅ Directory exists: {$tenantsDir}\n\n";
}

// List .env files in config/tenants
echo "📋 .env files in config/tenants/:\n";
$envFiles = glob($tenantsDir . '/.env.*');

if (empty($envFiles)) {
    echo "❌ No .env files found in config/tenants/\n\n";
    
    // Check old location
    echo "🔍 Checking old location (root directory)...\n";
    $oldEnvFiles = glob($basePath . '/.env.*');
    
    if (!empty($oldEnvFiles)) {
        echo "✅ Found .env files in old location:\n";
        foreach ($oldEnvFiles as $file) {
            $filename = basename($file);
            echo "   - {$filename}\n";
        }
        
        echo "\n⚠️  Migration needed! Run:\n";
        echo "   mv .env.* config/tenants/\n\n";
    } else {
        echo "❌ No .env files found in old location either\n\n";
    }
} else {
    echo "✅ Found " . count($envFiles) . " .env files:\n";
    foreach ($envFiles as $file) {
        $filename = basename($file);
        $size = filesize($file);
        $readable = is_readable($file) ? '✅' : '❌';
        echo "   {$readable} {$filename} ({$size} bytes)\n";
    }
    echo "\n";
}

// Check domains.php config
echo "⚙️  Checking config/domains.php...\n";
$domainsConfig = $basePath . '/config/domains.php';

if (!file_exists($domainsConfig)) {
    echo "❌ config/domains.php not found\n\n";
} else {
    echo "✅ config/domains.php exists\n";
    
    // Try to parse domains
    $config = include $domainsConfig;
    
    if (isset($config['domains']) && is_array($config['domains'])) {
        $domains = $config['domains'];
        $tenantCount = 0;
        
        echo "📊 Configured domains:\n";
        foreach ($domains as $domain => $settings) {
            $type = $settings['type'] ?? 'unknown';
            $name = $settings['name'] ?? $domain;
            
            if ($type !== 'main' && $type !== 'development') {
                $tenantCount++;
                
                // Check if .env file exists for this tenant
                $envFile = $tenantsDir . '/.env.' . $domain;
                $exists = file_exists($envFile) ? '✅' : '❌';
                
                echo "   {$exists} {$domain} ({$name}) - {$type}\n";
            }
        }
        
        echo "\n📈 Summary:\n";
        echo "   Total domains: " . count($domains) . "\n";
        echo "   Tenant domains: {$tenantCount}\n";
        echo "   .env files: " . count($envFiles) . "\n";
        
        if ($tenantCount !== count($envFiles)) {
            echo "\n⚠️  Mismatch! Some tenants may be missing .env files\n";
        } else {
            echo "\n✅ All tenants have .env files\n";
        }
    }
}

echo "\n";
echo "==========================\n";
echo "✅ Test completed\n";
