<?php

use Dotenv\Dotenv;

$basePath = dirname(__DIR__);
$defaultEnvFile = '.env';
$resolvedEnvFile = $defaultEnvFile;

$normalizeHost = static function (?string $host): ?string {
    if (!$host) {
        return null;
    }

    $host = strtolower(trim($host));
    $host = preg_replace('/^www\./', '', $host);

    return $host ?: null;
};

$candidateFromHost = static function (string $basePath, string $host): ?string {
    $envFile = ".env.{$host}";
    return is_file($basePath . DIRECTORY_SEPARATOR . $envFile) ? $envFile : null;
};

if (PHP_SAPI === 'cli') {
    $tenant = $_SERVER['APP_TENANT'] ?? $_ENV['APP_TENANT'] ?? getenv('APP_TENANT') ?: null;
    $tenant ??= $_SERVER['APP_ENV'] ?? $_ENV['APP_ENV'] ?? getenv('APP_ENV') ?: null;
    if ($tenant) {
        $tenantEnv = $candidateFromHost($basePath, $tenant);
        if ($tenantEnv) {
            $resolvedEnvFile = $tenantEnv;
        }
    }
} else {
    $host = $normalizeHost($_SERVER['HTTP_HOST'] ?? null);
    if ($host) {
        $hostEnv = $candidateFromHost($basePath, $host);
        if ($hostEnv) {
            $resolvedEnvFile = $hostEnv;
        }
    }
}

if (!is_file($basePath . DIRECTORY_SEPARATOR . $resolvedEnvFile)) {
    $resolvedEnvFile = $defaultEnvFile;
}

Dotenv::createMutable($basePath, $resolvedEnvFile)->load();

// Ensure APP_ENV reflects the resolved environment file if not explicitly set.
if (!isset($_ENV['APP_ENV'], $_SERVER['APP_ENV']) && $resolvedEnvFile !== $defaultEnvFile) {
    $envName = substr($resolvedEnvFile, strlen('.env.'));
    if ($envName !== false && $envName !== '') {
        $_ENV['APP_ENV'] = $_SERVER['APP_ENV'] = $envName;
    }
}

