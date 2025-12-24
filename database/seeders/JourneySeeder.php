<?php

namespace Database\Seeders;

use App\Models\Journey;
use Illuminate\Database\Seeder;

class JourneySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Belirli tarihlerle anlamlı kayıtlar oluştur
        $entries = [
            [
                'entry_date' => '2023-01-15',
                'title' => 'Yeni Yıl, Yeni Hedefler',
                'description' => '2023 yılına büyük umutlarla başladım. Bu yıl kendimi geliştirmek ve yeni projeler üretmek için planlar yaptım. Öğrenme yolculuğum devam ediyor.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2023-04-20',
                'title' => 'İlk Büyük Proje',
                'description' => 'Uzun süredir üzerinde çalıştığım proje nihayet tamamlandı. Bu süreçte çok şey öğrendim. Takım çalışmasının önemi bir kez daha ortaya çıktı.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2023-08-10',
                'title' => 'Yaz Dönemi Değerlendirmesi',
                'description' => 'Yılın yarısı geride kaldı. Hedeflerimin çoğuna ulaştım ama hala yapılacak çok iş var. Motivasyonumu yüksek tutmaya devam ediyorum.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2023-12-25',
                'title' => 'Yıl Sonu Muhasebesi',
                'description' => '2023 benim için verimli bir yıl oldu. Hem profesyonel hem de kişisel anlamda büyüdüm. Yeni yıla hazırım.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2024-03-05',
                'title' => 'Yeni Teknolojiler',
                'description' => 'Vue.js ve Laravel ile çalışmaya başladım. Modern web geliştirme araçları gerçekten etkileyici. Her gün yeni bir şey öğreniyorum.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2024-06-15',
                'title' => 'Ekip Büyüyor',
                'description' => 'Takıma yeni arkadaşlar katıldı. Birlikte daha büyük projelere imza atacağız. İşbirliği ve iletişim her zamankinden önemli.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2024-09-20',
                'title' => 'Başarılı Lansman',
                'description' => 'Aylardır üzerinde çalıştığımız ürün sonunda yayınlandı. Kullanıcılardan olumlu geri dönüşler alıyoruz. Bu başarı tüm ekibin eseri.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2024-12-01',
                'title' => 'Geleceğe Bakış',
                'description' => 'Yeni yıl için planlar yapıyorum. Daha fazla öğrenmek, daha fazla üretmek ve daha fazla paylaşmak istiyorum. Yolculuk devam ediyor.',
                'status' => 'published',
            ],
            [
                'entry_date' => '2024-12-20',
                'title' => 'Yıl Sonu Notları',
                'description' => '2024 muhteşem bir yıldı. Çok çalıştık, çok öğrendik ve çok eğlendik. Şimdi biraz dinlenme zamanı.',
                'status' => 'draft', // Taslak örneği
            ],
        ];

        foreach ($entries as $entry) {
            Journey::create(array_merge($entry, [
                'user_id' => \App\Models\User::first()?->id,
                'icon' => 'circle',
                'color' => 'primary',
            ]));
        }

        $this->command->info('9 journey kaydı oluşturuldu.');
    }
}

