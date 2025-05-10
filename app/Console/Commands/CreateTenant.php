<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class CreateTenant extends Command
{
    protected $signature = 'tenant:create 
        {domain : Tenant domain adresi}
        {email : Tenant email adresi}
        {name : Tenant adı}
        {--database= : Kullanılacak veritabanı adı}
        {--connection=mysql : Veritabanı bağlantı tipi}
        {--host=127.0.0.1 : Veritabanı host adresi}
        {--port=3306 : Veritabanı port numarası}
        {--username=root : Veritabanı kullanıcı adı}
        {--password= : Veritabanı şifresi}';

    protected $description = 'Yeni bir tenant oluşturur ve veritabanını hazırlar';

    public function handle()
    {
        // Veritabanı adı parametresi
        $databaseName = $this->option('database') ?: 'tenant_' . str_replace(['.', '-'], '_', $this->argument('domain'));

        try {
            // Veritabanı bağlantı bilgilerini ayarla
            $connection = $this->option('connection');
            $host = $this->option('host');
            $port = $this->option('port');
            $username = $this->option('username');
            $password = $this->option('password');

            // Tenant'ı oluştur
            $tenant = Tenant::create([
                'name' => $this->argument('name'),
                'email' => $this->argument('email'),
                'domain' => $this->argument('domain'),
                'database' => $databaseName,
            ]);

            // Domain'i ilişkilendir
            $tenant->domains()->create(['domain' => $this->argument('domain')]);

            // Tenant'a özel .env dosyası oluştur
            $envPath = storage_path("tenants/{$tenant->id}/.env");
            if (!file_exists(dirname($envPath))) {
                mkdir(dirname($envPath), 0755, true);
            }

            $envContent = <<<EOT
DB_CONNECTION={$connection}
DB_HOST={$host}
DB_PORT={$port}
DB_DATABASE={$databaseName}
DB_USERNAME={$username}
DB_PASSWORD={$password}
EOT;

            file_put_contents($envPath, $envContent);

            // Veritabanını oluştur (eğer yoksa)
            $this->info('Veritabanı oluşturuluyor...');
            DB::statement("CREATE DATABASE IF NOT EXISTS `{$databaseName}`");

            // Tenant'ın veritabanı bağlantısını yapılandır
            config([
                'database.connections.tenant' => [
                    'driver' => $connection,
                    'host' => $host,
                    'port' => $port,
                    'database' => $databaseName,
                    'username' => $username,
                    'password' => $password,
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'strict' => true,
                    'engine' => null,
                ]
            ]);

            DB::purge('tenant');

            $this->info('Veritabanı oluşturuldu: ' . $databaseName);

            // Migration'ları çalıştır
            $this->info('Migration\'lar çalıştırılıyor...');
            Artisan::call('tenants:migrate', [
                '--tenants' => [$tenant->id]
            ]);

            $this->info('Migration\'lar başarıyla çalıştırıldı.');
            $this->info('Tenant başarıyla oluşturuldu! ID: ' . $tenant->id);

            // Bağlantı bilgilerini göster
            $this->table(
                ['Parametre', 'Değer'],
                [
                    ['Domain', $this->argument('domain')],
                    ['Database', $databaseName],
                    ['Connection', $connection],
                    ['Host', $host],
                    ['Port', $port],
                    ['Username', $username],
                ]
            );
        } catch (\Exception $e) {
            $this->error('Hata oluştu: ' . $e->getMessage());
            // Hata durumunda tenant'ı sil
            $tenant->delete();
            return 1;
        }
    }
}
