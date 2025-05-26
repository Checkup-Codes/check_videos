<?php

namespace Database\Seeders;

use App\Models\Seo;
use Illuminate\Database\Seeder;

class DefaultSeoSeeder extends Seeder
{
    public function run(): void
    {
        // Önce tüm SEO verilerini temizle
        Seo::truncate();

        // Sadece home route'u için varsayılan veriyi ekle
        Seo::create([
            'id' => '16e81f79-6c41-4799-9d00-ab5f2ca6103b',
            'route' => 'home',
            'title' => 'Checkup Codes',
            'description' => 'Yazılım dünyasında size yardımcı olacak içerikler',
            'keywords' => 'yazılım, programlama, web geliştirme',
            'og_title' => 'Checkup Codes',
            'og_description' => 'Yazılım dünyasında size yardımcı olacak içerikler',
            'og_image' => 'images/og-default.jpg',
            'canonical_url' => config('app.url'),
            'robots' => 'index, follow',
            'schema_org' => null,
        ]);
    }
}
