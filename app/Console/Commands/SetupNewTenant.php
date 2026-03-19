<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class SetupNewTenant extends Command
{
    protected $signature = 'tenant:setup 
                            {domain : The domain name (e.g., candundar.com)}
                            {--db-name= : Custom database name (optional)}
                            {--db-user= : Database username (optional)}
                            {--db-pass= : Database password (optional)}
                            {--copy-users : Copy users from main database}';

    protected $description = 'Setup a new tenant with database, env file, and storage';

    public function handle()
    {
        $domain = $this->argument('domain');
        $domain = $this->sanitizeDomain($domain);
        
        $this->info("🚀 Setting up new tenant: {$domain}");
        $this->newLine();

        // Step 1: Create .env file
        if (!$this->createEnvFile($domain)) {
            return 1;
        }

        // Step 2: Create database
        if (!$this->createDatabase($domain)) {
            return 1;
        }

        // Step 3: Run migrations
        if (!$this->runMigrations($domain)) {
            return 1;
        }

        // Step 4: Seed basic data
        if (!$this->seedData($domain)) {
            return 1;
        }

        // Step 5: Create storage directories
        if (!$this->createStorageDirectories($domain)) {
            return 1;
        }

        // Step 6: Update domain config
        if (!$this->updateDomainConfig($domain)) {
            return 1;
        }

        $this->newLine();
        $this->info("✅ Tenant setup completed successfully!");
        $this->newLine();
        $this->displayNextSteps($domain);

        return 0;
    }


    private function sanitizeDomain(string $domain): string
    {
        // Remove protocol
        $domain = preg_replace('#^https?://#', '', $domain);
        
        // Remove www.
        $domain = preg_replace('/^www\./', '', $domain);
        
        // Remove trailing dots
        $domain = rtrim($domain, '.');
        
        // Remove port
        $domain = preg_replace('/:\d+$/', '', $domain);
        
        // Remove trailing slash
        $domain = rtrim($domain, '/');
        
        return strtolower($domain);
    }

    private function createEnvFile(string $domain): bool
    {
        $this->info("📝 Step 1: Creating .env file...");
        
        // Use new path: config/tenants/
        $envFile = base_path("config/tenants/.env.{$domain}");
        
        // Ensure directory exists
        $envDir = dirname($envFile);
        if (!File::exists($envDir)) {
            File::makeDirectory($envDir, 0755, true);
            $this->line("   Created directory: {$envDir}");
        }
        
        if (File::exists($envFile)) {
            if (!$this->confirm("⚠️  .env.{$domain} already exists. Overwrite?", false)) {
                $this->warn("Skipped .env file creation");
                return true;
            }
        }

        // Get database credentials
        $dbName = $this->option('db-name') ?? str_replace(['.', '-'], '_', $domain);
        $dbUser = $this->option('db-user') ?? env('DB_USERNAME', 'root');
        $dbPass = $this->option('db-pass') ?? env('DB_PASSWORD', '');

        // Read main .env as template (check both paths)
        $mainEnvPath = base_path('config/tenants/.env.example');
        if (!File::exists($mainEnvPath)) {
            $mainEnvPath = base_path('.env.example');
        }
        if (!File::exists($mainEnvPath)) {
            $mainEnvPath = base_path('.env');
        }
        
        $mainEnv = File::get($mainEnvPath);
        
        // Replace database settings
        $newEnv = preg_replace('/DB_DATABASE=.*/', "DB_DATABASE={$dbName}", $mainEnv);
        $newEnv = preg_replace('/DB_USERNAME=.*/', "DB_USERNAME={$dbUser}", $newEnv);
        $newEnv = preg_replace('/DB_PASSWORD=.*/', "DB_PASSWORD={$dbPass}", $newEnv);
        
        // Update APP_NAME
        $appName = ucwords(str_replace(['.', '-', '_'], ' ', explode('.', $domain)[0]));
        $newEnv = preg_replace('/APP_NAME=.*/', "APP_NAME=\"{$appName}\"", $newEnv);
        
        // Add MAIN_DOMAIN if not exists
        if (!str_contains($newEnv, 'MAIN_DOMAIN=')) {
            $mainDomain = config('domains.main_domain', 'checkupcodes.com');
            $newEnv .= "\n\n# Multi-tenant configuration\n";
            $newEnv .= "MAIN_DOMAIN={$mainDomain}\n";
        }

        File::put($envFile, $newEnv);
        
        $this->info("✅ Created: config/tenants/.env.{$domain}");
        $this->line("   Database: {$dbName}");
        $this->line("   User: {$dbUser}");
        
        return true;
    }

    private function createDatabase(string $domain): bool
    {
        $this->info("📦 Step 2: Creating database...");
        
        $dbName = $this->option('db-name') ?? str_replace(['.', '-'], '_', $domain);
        
        try {
            // Connect to MySQL without database
            $connection = DB::connection()->getPdo();
            
            // Check if database exists
            $result = DB::select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [$dbName]);
            
            if (!empty($result)) {
                if (!$this->confirm("⚠️  Database '{$dbName}' already exists. Drop and recreate?", false)) {
                    $this->warn("Skipped database creation");
                    return true;
                }
                
                DB::statement("DROP DATABASE `{$dbName}`");
                $this->line("   Dropped existing database");
            }
            
            // Create database
            DB::statement("CREATE DATABASE `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            
            $this->info("✅ Created database: {$dbName}");
            return true;
            
        } catch (\Exception $e) {
            $this->error("❌ Failed to create database: " . $e->getMessage());
            return false;
        }
    }

    private function runMigrations(string $domain): bool
    {
        $this->info("🔄 Step 3: Running migrations...");
        
        try {
            // Set environment for this tenant
            putenv("APP_TENANT={$domain}");
            
            $exitCode = Artisan::call('migrate', [
                '--force' => true,
            ]);
            
            if ($exitCode === 0) {
                $this->info("✅ Migrations completed");
                return true;
            } else {
                $this->error("❌ Migrations failed");
                return false;
            }
            
        } catch (\Exception $e) {
            $this->error("❌ Migration error: " . $e->getMessage());
            return false;
        }
    }


    private function seedData(string $domain): bool
    {
        $this->info("🌱 Step 4: Seeding data...");
        
        try {
            // Set environment for this tenant
            putenv("APP_TENANT={$domain}");
            
            // Copy users from main database if requested
            if ($this->option('copy-users')) {
                $this->copyUsers($domain);
            } else {
                // Run default seeder
                Artisan::call('db:seed', [
                    '--class' => 'UserSeeder',
                    '--force' => true,
                ]);
            }
            
            // Run default SEO seeder
            Artisan::call('db:seed', [
                '--class' => 'DefaultSeoSeeder',
                '--force' => true,
            ]);
            
            $this->info("✅ Data seeded");
            return true;
            
        } catch (\Exception $e) {
            $this->error("❌ Seeding error: " . $e->getMessage());
            return false;
        }
    }

    private function copyUsers(string $domain): void
    {
        $this->line("   Copying users from main database...");
        
        // Get users from main database
        $mainDb = config('database.connections.mysql.database');
        $users = DB::connection('mysql')->table('users')->get();
        
        // Switch to tenant database
        $dbName = $this->option('db-name') ?? str_replace(['.', '-'], '_', $domain);
        config(['database.connections.mysql.database' => $dbName]);
        DB::purge('mysql');
        DB::reconnect('mysql');
        
        // Insert users
        foreach ($users as $user) {
            DB::table('users')->insert((array) $user);
        }
        
        $this->line("   Copied {$users->count()} users");
    }

    private function createStorageDirectories(string $domain): bool
    {
        $this->info("📁 Step 5: Creating storage directories...");
        
        $storagePath = storage_path("multi/{$domain}");
        $publicPath = "{$storagePath}/public";
        
        $directories = [
            $storagePath,
            $publicPath,
            "{$publicPath}/images",
            "{$publicPath}/uploads",
            "{$publicPath}/media",
        ];
        
        foreach ($directories as $dir) {
            if (!File::exists($dir)) {
                File::makeDirectory($dir, 0755, true);
                $this->line("   Created: {$dir}");
            }
        }
        
        $this->info("✅ Storage directories created");
        return true;
    }

    private function updateDomainConfig(string $domain): bool
    {
        $this->info("⚙️  Step 6: Updating domain configuration...");
        
        $configFile = config_path('domains.php');
        
        if (!File::exists($configFile)) {
            $this->warn("⚠️  config/domains.php not found, skipping");
            return true;
        }
        
        $config = File::get($configFile);
        
        // Check if domain already exists in config
        if (str_contains($config, "'{$domain}'")) {
            $this->line("   Domain already in config");
            return true;
        }
        
        // Add new domain before the closing bracket
        $appName = ucwords(str_replace(['.', '-', '_'], ' ', explode('.', $domain)[0]));
        
        $newDomain = "\n        '{$domain}' => [\n";
        $newDomain .= "            'name' => '{$appName}',\n";
        $newDomain .= "            'type' => 'tenant',\n";
        $newDomain .= "            'index_in_google' => false,\n";
        $newDomain .= "            'features' => ['all'],\n";
        $newDomain .= "            'description' => 'Tenant domain',\n";
        $newDomain .= "        ],\n";
        
        // Insert before the last closing bracket
        $config = preg_replace('/(\s+)\],\s*\];/', $newDomain . '$1],\n];', $config, 1);
        
        File::put($configFile, $config);
        
        $this->info("✅ Domain configuration updated");
        return true;
    }

    private function displayNextSteps(string $domain): void
    {
        $this->info("📋 Next Steps:");
        $this->newLine();
        
        $this->line("1. 🌐 Domain Setup (Hostinger):");
        $this->line("   - Buy domain: {$domain}");
        $this->line("   - Park it to: " . config('domains.main_domain', 'checkupcodes.com'));
        $this->newLine();
        
        $this->line("2. 🔧 Server Configuration:");
        $this->line("   - Ensure config/tenants/.env.{$domain} is readable");
        $this->line("   - Test: http://{$domain}");
        $this->newLine();
        
        $this->line("3. 🎨 Customize:");
        $this->line("   - Upload logo: http://{$domain}/seo");
        $this->line("   - Update SEO settings");
        $this->line("   - Add content");
        $this->newLine();
        
        $this->line("4. 🧹 Cleanup (Optional):");
        $this->line("   - Remove empty dot folders:");
        $this->line("     rm -rf storage/multi/*.{$domain}.");
    }
}

