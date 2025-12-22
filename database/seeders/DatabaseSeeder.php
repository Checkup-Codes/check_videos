<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SP\SoftwareProduct;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use App\Models\Equipment;
use App\Models\FBVersions\Version;
use App\Models\FBVersions\Feature;
use App\Models\FBVersions\Bug;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Temel kullanıcı
        $existingUser = User::where('email', 'cekapykp@gmail.com')->first();
        if (!$existingUser) {
            User::factory()->specificUser()->create();
        }

        // Diğer modeller
        SoftwareProduct::factory(20)->create();
        Equipment::factory()->count(10)->create();

        // Önce kategorileri oluştur (ana kategoriler)
        $mainCategories = [
            ['name' => 'Programlama', 'slug' => 'programlama'],
            ['name' => 'Web Geliştirme', 'slug' => 'web-gelistirme'],
            ['name' => 'Mobil Uygulama', 'slug' => 'mobil-uygulama'],
            ['name' => 'Veritabanı', 'slug' => 'veritabani'],
            ['name' => 'DevOps', 'slug' => 'devops'],
        ];

        foreach ($mainCategories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
        }

        // Kalan kategorileri rassal oluştur
        Category::factory()->count(5)->create();

        // Önceden belirlenmiş popüler kategoriler için daha fazla yazı oluştur
        $popularCategories = Category::whereIn('slug', ['programlama', 'web-gelistirme'])->get();

        foreach ($popularCategories as $category) {
            // Her popüler kategori için 10 yazı oluştur
            Write::factory()->count(10)->create([
                'category_id' => $category->id,
            ])->each(function ($write) {
                // Önce ilişkinin var olup olmadığını kontrol et
                $exists = DB::table('content_category_write')
                    ->where('write_id', $write->id)
                    ->where('category_id', $write->category_id)
                    ->exists();

                // İlişki yoksa ekle
                if (!$exists) {
                    try {
                        $write->categories()->attach($write->category_id);
                    } catch (\Exception $e) {
                        Log::error("Seed sırasında ilişki hatası: " . $e->getMessage());
                    }
                }
            });
        }

        // Diğer kategoriler için yazı oluştur (factory içindeki afterCreating metodunu kullanacak)
        Write::factory()->count(20)->create();

        // Version ve ilgili modeller
        Version::factory()
            ->count(5)
            ->has(Feature::factory()->count(3), 'features')
            ->has(Bug::factory()->count(2), 'bugs')
            ->create();

        // Rendition seeder
        $this->call([
            RenditionSeeder::class,
        ]);

        // Test seeder
        $this->call([
            TestSeeder::class,
        ]);

        // İlişki tablosunu güncelle
        $this->command->info('Yazı-kategori ilişkileri güncelleniyor...');
        Artisan::call('writes:update-relations');
        $this->command->info('İlişkiler güncellendi.');

        $this->call([
            DefaultSeoSeeder::class,
            ProjectsSeeder::class,
        ]);
    }
}
