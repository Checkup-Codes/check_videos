<?php

namespace Database\Factories;

use App\Models\Journey;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class JourneyFactory extends Factory
{
    protected $model = Journey::class;

    public function definition(): array
    {
        $titles = [
            'İlk Adımlar',
            'Yeni Başlangıçlar',
            'Öğrenme Yolculuğu',
            'Kod Yazma Serüveni',
            'Proje Tamamlandı',
            'Yeni Teknolojiler',
            'Büyük Dönüm Noktası',
            'Ekip Çalışması',
            'Başarılı Lansman',
            'Yıl Sonu Değerlendirmesi',
            'Yeni Hedefler',
            'İlham Veren Anlar',
        ];

        $descriptions = [
            'Bugün harika bir gündü. Yeni şeyler öğrendim ve kendimi geliştirdim.',
            'Zorlu bir süreçten geçtik ama sonunda başardık. Ekip olarak muhteşem bir iş çıkardık.',
            'Bu proje bana çok şey öğretti. Hem teknik hem de kişisel anlamda büyüdüm.',
            'Yeni teknolojileri keşfetmek her zaman heyecan verici. Bugün de öyle oldu.',
            'Bazen küçük adımlar büyük değişimlere yol açar. Bugün attığım adım da öyle.',
            'Takım arkadaşlarımla birlikte çalışmak motivasyonumu artırıyor.',
            'Hedeflerime bir adım daha yaklaştım. Bu yolculuk devam ediyor.',
            'Bugün kendime zaman ayırdım ve düşüncelerimi topladım.',
        ];

        return [
            'entry_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'title' => $this->faker->randomElement($titles),
            'description' => $this->faker->randomElement($descriptions),
            'image' => null, // Görseller manuel eklenebilir
            'icon' => 'circle',
            'color' => $this->faker->randomElement(['primary', 'blue', 'green', 'purple', 'orange']),
            'status' => $this->faker->randomElement(['published', 'published', 'published', 'draft']), // %75 published
            'user_id' => User::first()?->id,
        ];
    }

    /**
     * Published state
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Draft state
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }
}

