<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Show tenant management page (only on main domain)
     */
    public function index()
    {
        // Only accessible on main domain
        $currentDomain = request()->getHost();
        $mainDomain = config('domains.main_domain', 'checkupcodes.com');
        
        if ($currentDomain !== $mainDomain && !str_contains($currentDomain, 'localhost')) {
            abort(404);
        }

        $tenants = $this->getAllTenants();
        $stats = $this->getSystemStats();

        return Inertia::render('Tenants/Index', [
            'tenants' => $tenants,
            'stats' => $stats,
            'mainDomain' => $mainDomain,
        ]);
    }

    /**
     * Get all tenants with their stats
     */
    private function getAllTenants(): array
    {
        $tenants = [];
        $domains = config('domains.domains', []);
        
        foreach ($domains as $domain => $config) {
            // Skip main domain and localhost
            if ($config['type'] === 'main' || $config['type'] === 'development') {
                continue;
            }

            $envFile = base_path(".env.{$domain}");
            $exists = File::exists($envFile);
            
            if (!$exists) {
                continue;
            }

            $tenant = [
                'domain' => $domain,
                'name' => $config['name'] ?? $domain,
                'type' => $config['type'] ?? 'unknown',
                'status' => 'active',
                'env_exists' => true,
                'database' => $this->getDatabaseInfo($domain),
                'storage' => $this->getStorageInfo($domain),
                'created_at' => File::lastModified($envFile),
            ];

            $tenants[] = $tenant;
        }

        return $tenants;
    }


    /**
     * Get database information for a tenant
     */
    private function getDatabaseInfo(string $domain): array
    {
        try {
            // Get database name from .env file
            $envFile = base_path(".env.{$domain}");
            $envContent = File::get($envFile);
            
            preg_match('/DB_DATABASE=(.*)/', $envContent, $matches);
            $dbName = $matches[1] ?? str_replace(['.', '-'], '_', $domain);
            
            // Check if database exists
            $result = DB::select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [$dbName]);
            
            if (empty($result)) {
                return [
                    'name' => $dbName,
                    'exists' => false,
                    'size' => 0,
                    'tables' => 0,
                ];
            }

            // Get database size
            $sizeResult = DB::select("
                SELECT 
                    SUM(data_length + index_length) as size,
                    COUNT(DISTINCT table_name) as tables
                FROM information_schema.TABLES 
                WHERE table_schema = ?
            ", [$dbName]);

            $size = $sizeResult[0]->size ?? 0;
            $tables = $sizeResult[0]->tables ?? 0;

            return [
                'name' => $dbName,
                'exists' => true,
                'size' => $size,
                'size_formatted' => $this->formatBytes($size),
                'tables' => $tables,
            ];

        } catch (\Exception $e) {
            return [
                'name' => 'unknown',
                'exists' => false,
                'size' => 0,
                'tables' => 0,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get storage information for a tenant
     */
    private function getStorageInfo(string $domain): array
    {
        $storagePath = storage_path("multi/{$domain}");
        
        if (!File::exists($storagePath)) {
            return [
                'exists' => false,
                'size' => 0,
                'files' => 0,
            ];
        }

        try {
            $size = 0;
            $files = 0;

            $iterator = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($storagePath, \RecursiveDirectoryIterator::SKIP_DOTS)
            );

            foreach ($iterator as $file) {
                if ($file->isFile()) {
                    $size += $file->getSize();
                    $files++;
                }
            }

            return [
                'exists' => true,
                'path' => $storagePath,
                'size' => $size,
                'size_formatted' => $this->formatBytes($size),
                'files' => $files,
            ];

        } catch (\Exception $e) {
            return [
                'exists' => true,
                'size' => 0,
                'files' => 0,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get system-wide stats
     */
    private function getSystemStats(): array
    {
        $tenants = $this->getAllTenants();
        
        $totalDbSize = 0;
        $totalStorageSize = 0;
        $totalFiles = 0;
        
        foreach ($tenants as $tenant) {
            $totalDbSize += $tenant['database']['size'] ?? 0;
            $totalStorageSize += $tenant['storage']['size'] ?? 0;
            $totalFiles += $tenant['storage']['files'] ?? 0;
        }

        return [
            'total_tenants' => count($tenants),
            'active_tenants' => count(array_filter($tenants, fn($t) => $t['status'] === 'active')),
            'total_db_size' => $totalDbSize,
            'total_db_size_formatted' => $this->formatBytes($totalDbSize),
            'total_storage_size' => $totalStorageSize,
            'total_storage_size_formatted' => $this->formatBytes($totalStorageSize),
            'total_files' => $totalFiles,
            'total_size' => $totalDbSize + $totalStorageSize,
            'total_size_formatted' => $this->formatBytes($totalDbSize + $totalStorageSize),
        ];
    }

    /**
     * Format bytes to human readable
     */
    private function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }


    /**
     * Create a new tenant
     */
    public function store(Request $request)
    {
        $request->validate([
            'domain' => 'required|string|regex:/^[a-z0-9.-]+\.[a-z]{2,}$/i',
            'copy_users' => 'boolean',
            'db_name' => 'nullable|string',
            'db_user' => 'nullable|string',
            'db_pass' => 'nullable|string',
        ]);

        try {
            $domain = $this->sanitizeDomain($request->domain);
            
            // Check if tenant already exists
            $envFile = base_path(".env.{$domain}");
            if (File::exists($envFile)) {
                return response()->json([
                    'success' => false,
                    'message' => "Tenant {$domain} already exists",
                ], 422);
            }

            // Build artisan command
            $command = "tenant:setup {$domain}";
            
            if ($request->copy_users) {
                $command .= " --copy-users";
            }
            
            if ($request->db_name) {
                $command .= " --db-name={$request->db_name}";
            }
            
            if ($request->db_user) {
                $command .= " --db-user={$request->db_user}";
            }
            
            if ($request->db_pass) {
                $command .= " --db-pass={$request->db_pass}";
            }

            // Run artisan command
            Artisan::call($command);
            $output = Artisan::output();

            // Clear cache
            Artisan::call('config:clear');
            Artisan::call('cache:clear');

            return response()->json([
                'success' => true,
                'message' => "Tenant {$domain} created successfully",
                'output' => $output,
                'tenant' => $this->getTenantInfo($domain),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create tenant: ' . $e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a tenant
     */
    public function destroy(string $domain)
    {
        try {
            $domain = $this->sanitizeDomain($domain);
            
            // Prevent deleting main domain
            $mainDomain = config('domains.main_domain', 'checkupcodes.com');
            if ($domain === $mainDomain) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete main domain',
                ], 422);
            }

            $deleted = [];
            $errors = [];

            // Delete .env file
            $envFile = base_path(".env.{$domain}");
            if (File::exists($envFile)) {
                File::delete($envFile);
                $deleted[] = ".env.{$domain}";
            }

            // Delete storage directory
            $storagePath = storage_path("multi/{$domain}");
            if (File::exists($storagePath)) {
                File::deleteDirectory($storagePath);
                $deleted[] = "storage/multi/{$domain}";
            }

            // Delete database (optional, commented out for safety)
            // $dbName = str_replace(['.', '-'], '_', $domain);
            // DB::statement("DROP DATABASE IF EXISTS `{$dbName}`");
            // $deleted[] = "database: {$dbName}";

            return response()->json([
                'success' => true,
                'message' => "Tenant {$domain} deleted successfully",
                'deleted' => $deleted,
                'note' => 'Database was not deleted for safety. Delete manually if needed.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete tenant: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get single tenant info
     */
    private function getTenantInfo(string $domain): array
    {
        $config = config("domains.domains.{$domain}", []);
        
        return [
            'domain' => $domain,
            'name' => $config['name'] ?? $domain,
            'type' => $config['type'] ?? 'unknown',
            'database' => $this->getDatabaseInfo($domain),
            'storage' => $this->getStorageInfo($domain),
        ];
    }

    /**
     * Sanitize domain name
     */
    private function sanitizeDomain(string $domain): string
    {
        $domain = preg_replace('#^https?://#', '', $domain);
        $domain = preg_replace('/^www\./', '', $domain);
        $domain = rtrim($domain, '.');
        $domain = preg_replace('/:\d+$/', '', $domain);
        $domain = rtrim($domain, '/');
        
        return strtolower($domain);
    }

    /**
     * Cleanup dot folders
     */
    public function cleanupDots()
    {
        try {
            Artisan::call('tenant:cleanup-dots');
            $output = Artisan::output();

            return response()->json([
                'success' => true,
                'message' => 'Cleanup completed',
                'output' => $output,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cleanup failed: ' . $e->getMessage(),
            ], 500);
        }
    }
}

