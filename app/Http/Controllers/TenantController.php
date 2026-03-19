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
     * Show tenant management page
     */
    public function index()
    {
        $tenants = $this->getAllTenants();
        $stats = $this->getSystemStats();
        $mainDomain = config('domains.main_domain', 'checkupcodes.com');

        return Inertia::render('Tenants/Index', [
            'tenants' => $tenants,
            'stats' => $stats,
            'mainDomain' => $mainDomain,
        ]);
    }

    /**
     * Show detailed tenant information
     */
    public function show(string $domain)
    {
        $domain = $this->sanitizeDomain($domain);
        
        $tenant = [
            'domain' => $domain,
            'name' => config("domains.domains.{$domain}.name", $domain),
            'type' => config("domains.domains.{$domain}.type", 'unknown'),
            'database' => $this->getDetailedDatabaseInfo($domain),
            'storage' => $this->getDetailedStorageInfo($domain),
            'env' => $this->getEnvInfo($domain),
        ];

        return Inertia::render('Tenants/Show', [
            'tenant' => $tenant,
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

            // Check new path first, then fallback to old path
            $envFile = base_path("config/tenants/.env.{$domain}");
            if (!File::exists($envFile)) {
                $envFile = base_path(".env.{$domain}"); // Fallback to old location
            }
            
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
            $envFile = base_path("config/tenants/.env.{$domain}");
            if (!File::exists($envFile)) {
                $envFile = base_path(".env.{$domain}"); // Fallback to old location
            }
            
            if (!File::exists($envFile)) {
                return [
                    'name' => 'unknown',
                    'exists' => false,
                    'size' => 0,
                    'tables' => 0,
                ];
            }
            
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
     * Get detailed database information with table breakdown
     */
    private function getDetailedDatabaseInfo(string $domain): array
    {
        $basicInfo = $this->getDatabaseInfo($domain);
        
        if (!$basicInfo['exists']) {
            return $basicInfo;
        }

        try {
            $dbName = $basicInfo['name'];
            
            // Get table details
            $tables = DB::select("
                SELECT 
                    table_name,
                    table_rows,
                    data_length,
                    index_length,
                    (data_length + index_length) as total_size
                FROM information_schema.TABLES 
                WHERE table_schema = ?
                ORDER BY total_size DESC
            ", [$dbName]);

            $tableDetails = array_map(function($table) {
                return [
                    'name' => $table->table_name,
                    'rows' => (int) $table->table_rows,
                    'data_size' => (int) $table->data_length,
                    'index_size' => (int) $table->index_length,
                    'total_size' => (int) $table->total_size,
                    'total_size_formatted' => $this->formatBytes($table->total_size),
                ];
            }, $tables);

            return array_merge($basicInfo, [
                'table_details' => $tableDetails,
            ]);

        } catch (\Exception $e) {
            return array_merge($basicInfo, [
                'error' => $e->getMessage(),
            ]);
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
     * Get detailed storage information with folder breakdown
     */
    private function getDetailedStorageInfo(string $domain): array
    {
        $basicInfo = $this->getStorageInfo($domain);
        
        if (!$basicInfo['exists']) {
            return $basicInfo;
        }

        try {
            $storagePath = storage_path("multi/{$domain}");
            $folders = [];
            
            // Get public folder structure
            $publicPath = $storagePath . '/public';
            if (File::exists($publicPath)) {
                $directories = File::directories($publicPath);
                
                foreach ($directories as $dir) {
                    $folderName = basename($dir);
                    $folderInfo = $this->getFolderInfo($dir);
                    
                    $folders[] = [
                        'name' => $folderName,
                        'path' => str_replace(storage_path(), '', $dir),
                        'size' => $folderInfo['size'],
                        'size_formatted' => $this->formatBytes($folderInfo['size']),
                        'files' => $folderInfo['files'],
                        'images' => $folderInfo['images'],
                    ];
                }
            }

            // Sort by size
            usort($folders, fn($a, $b) => $b['size'] <=> $a['size']);

            return array_merge($basicInfo, [
                'folders' => $folders,
            ]);

        } catch (\Exception $e) {
            return array_merge($basicInfo, [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Get folder information (size, files, images)
     */
    private function getFolderInfo(string $path): array
    {
        $size = 0;
        $files = 0;
        $images = 0;
        
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];

        try {
            $iterator = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS)
            );

            foreach ($iterator as $file) {
                if ($file->isFile()) {
                    $size += $file->getSize();
                    $files++;
                    
                    $extension = strtolower($file->getExtension());
                    if (in_array($extension, $imageExtensions)) {
                        $images++;
                    }
                }
            }
        } catch (\Exception $e) {
            // Ignore errors
        }

        return [
            'size' => $size,
            'files' => $files,
            'images' => $images,
        ];
    }

    /**
     * Get .env file information
     */
    private function getEnvInfo(string $domain): array
    {
        $envFile = base_path("config/tenants/.env.{$domain}");
        if (!File::exists($envFile)) {
            $envFile = base_path(".env.{$domain}"); // Fallback
        }
        
        if (!File::exists($envFile)) {
            return [
                'exists' => false,
            ];
        }

        try {
            $content = File::get($envFile);
            $lines = explode("\n", $content);
            
            $config = [];
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || str_starts_with($line, '#')) {
                    continue;
                }
                
                if (strpos($line, '=') !== false) {
                    [$key, $value] = explode('=', $line, 2);
                    $key = trim($key);
                    $value = trim($value);
                    
                    // Mask sensitive values
                    if (in_array($key, ['DB_PASSWORD', 'APP_KEY', 'MAIL_PASSWORD'])) {
                        $value = '••••••••';
                    }
                    
                    $config[$key] = $value;
                }
            }

            return [
                'exists' => true,
                'path' => str_replace(base_path(), '', $envFile),
                'size' => File::size($envFile),
                'size_formatted' => $this->formatBytes(File::size($envFile)),
                'modified_at' => File::lastModified($envFile),
                'config' => $config,
            ];

        } catch (\Exception $e) {
            return [
                'exists' => true,
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
            
            // Check if tenant already exists (check both paths)
            $envFile = base_path("config/tenants/.env.{$domain}");
            $envFileOld = base_path(".env.{$domain}");
            
            if (File::exists($envFile) || File::exists($envFileOld)) {
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

