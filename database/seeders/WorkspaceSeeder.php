<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Workspace;
use App\Models\WorkspaceProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkspaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            $this->command->warn('Kullanıcı bulunamadı. Workspace seeder çalıştırılamadı.');
            return;
        }

        // Workspace 1
        $workspace1 = Workspace::create([
            'images' => null,
            'status' => 'published',
            'user_id' => $user->id,
        ]);

        WorkspaceProduct::create([
            'workspace_id' => $workspace1->id,
            'name' => 'MacBook Pro 16"',
            'features' => 'M3 Max çip, 32GB RAM, 1TB SSD',
            'link' => 'https://www.apple.com/tr/macbook-pro/',
            'order' => 0,
        ]);

        WorkspaceProduct::create([
            'workspace_id' => $workspace1->id,
            'name' => 'Logitech MX Master 3S',
            'features' => 'Kablosuz, ergonomik tasarım, çoklu cihaz desteği',
            'link' => 'https://www.logitech.com/',
            'order' => 1,
        ]);

        WorkspaceProduct::create([
            'workspace_id' => $workspace1->id,
            'name' => 'Keychron K8',
            'features' => 'Mekanik klavye, Bluetooth, RGB aydınlatma',
            'link' => 'https://www.keychron.com/',
            'order' => 2,
        ]);

        // Workspace 2
        $workspace2 = Workspace::create([
            'images' => null,
            'status' => 'published',
            'user_id' => $user->id,
        ]);

        WorkspaceProduct::create([
            'workspace_id' => $workspace2->id,
            'name' => 'Dell UltraSharp U2720Q',
            'features' => '27 inç, 4K UHD, USB-C bağlantı',
            'link' => 'https://www.dell.com/',
            'order' => 0,
        ]);

        WorkspaceProduct::create([
            'workspace_id' => $workspace2->id,
            'name' => 'Herman Miller Aeron',
            'features' => 'Ergonomik ofis koltuğu, ayarlanabilir sırt desteği',
            'link' => 'https://www.hermanmiller.com/',
            'order' => 1,
        ]);

        // Workspace 3
        $workspace3 = Workspace::create([
            'images' => null,
            'status' => 'draft',
            'user_id' => $user->id,
        ]);

        WorkspaceProduct::create([
            'workspace_id' => $workspace3->id,
            'name' => 'iPad Pro 12.9"',
            'features' => 'M2 çip, 256GB depolama, Apple Pencil desteği',
            'link' => 'https://www.apple.com/tr/ipad-pro/',
            'order' => 0,
        ]);

        $this->command->info('3 workspace ve 6 ürün oluşturuldu.');
    }
}
