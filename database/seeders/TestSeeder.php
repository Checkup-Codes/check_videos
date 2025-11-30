<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tests\TestCategory;
use App\Models\Tests\Test;
use App\Models\Tests\TestQuestion;
use App\Models\Tests\TestOption;
use App\Models\Tests\TestResult;
use App\Models\Tests\TestAnswer;
use App\Models\User;
use Illuminate\Support\Str;

class TestSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = \Faker\Factory::create('tr_TR');
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Önce kategorileri oluştur
        $mainCategories = [
            ['name' => 'Genel Kültür', 'slug' => 'genel-kultur', 'description' => 'Genel kültür testleri'],
            ['name' => 'Matematik', 'slug' => 'matematik', 'description' => 'Matematik testleri'],
            ['name' => 'Tarih', 'slug' => 'tarih', 'description' => 'Tarih testleri'],
            ['name' => 'Coğrafya', 'slug' => 'cografya', 'description' => 'Coğrafya testleri'],
            ['name' => 'Edebiyat', 'slug' => 'edebiyat', 'description' => 'Edebiyat testleri'],
        ];

        $createdCategories = [];
        foreach ($mainCategories as $category) {
            $createdCategories[] = TestCategory::firstOrCreate(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'description' => $category['description'],
                    'status' => 'public',
                ]
            );
        }

        // Alt kategoriler oluştur
        $subCategories = [
            ['name' => 'Türk Tarihi', 'slug' => 'turk-tarihi', 'parent' => 'tarih'],
            ['name' => 'Dünya Tarihi', 'slug' => 'dunya-tarihi', 'parent' => 'tarih'],
            ['name' => 'Cebir', 'slug' => 'cebir', 'parent' => 'matematik'],
            ['name' => 'Geometri', 'slug' => 'geometri', 'parent' => 'matematik'],
        ];

        foreach ($subCategories as $subCategory) {
            $parent = TestCategory::where('slug', $subCategory['parent'])->first();
            if ($parent) {
                TestCategory::firstOrCreate(
                    ['slug' => $subCategory['slug']],
                    [
                        'name' => $subCategory['name'],
                        'parent_id' => $parent->id,
                        'status' => 'public',
                    ]
                );
            }
        }

        // Rastgele kategoriler oluştur
        TestCategory::factory()->count(3)->create();

        // Testler oluştur
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create();
        }

        // Her kategori için birkaç test oluştur
        foreach ($createdCategories as $category) {
            // Her kategori için 2-3 test oluştur
            $tests = Test::factory()->count(rand(2, 3))->create([
                'category_id' => $category->id,
                'author_id' => $user->id,
                'status' => 'published',
                'published_at' => now(),
            ]);

            // Her test için 5 soru oluştur
            foreach ($tests as $test) {
                $totalPoints = 0;
                $questions = [];

                for ($i = 1; $i <= 5; $i++) {
                    $points = 20; // Her soru 20 puan
                    $totalPoints += $points;

                    $question = TestQuestion::create([
                        'test_id' => $test->id,
                        'question_text' => $this->getQuestionText($category->slug, $i),
                        'question_type' => 'multiple_choice',
                        'order' => $i,
                        'points' => $points,
                        'explanation' => $this->getExplanation($category->slug, $i),
                    ]);

                    // Her soru için 4 şık oluştur (1 doğru, 3 yanlış)
                    $correctOptionIndex = rand(0, 3);
                    for ($j = 0; $j < 4; $j++) {
                        TestOption::create([
                            'question_id' => $question->id,
                            'option_text' => $this->getOptionText($category->slug, $i, $j),
                            'is_correct' => $j === $correctOptionIndex,
                            'order' => $j,
                        ]);
                    }

                    $questions[] = $question;
                }

                // Test'in toplam soru sayısını ve puanını güncelle
                $test->update([
                    'total_questions' => 5,
                    'total_points' => $totalPoints,
                ]);
            }
        }

        // Ekstra testler oluştur (rastgele kategorilerle)
        $extraTests = Test::factory()->count(5)->create([
            'author_id' => $user->id,
            'status' => 'published',
            'published_at' => now(),
        ]);

        foreach ($extraTests as $test) {
            $totalPoints = 0;
            for ($i = 1; $i <= 5; $i++) {
                $points = 20;
                $totalPoints += $points;

                $question = TestQuestion::create([
                    'test_id' => $test->id,
                    'question_text' => $this->faker->sentence() . '?',
                    'question_type' => 'multiple_choice',
                    'order' => $i,
                    'points' => $points,
                    'explanation' => $this->faker->optional(0.5)->sentence(),
                ]);

                $correctOptionIndex = rand(0, 3);
                for ($j = 0; $j < 4; $j++) {
                    TestOption::create([
                        'question_id' => $question->id,
                        'option_text' => $this->faker->sentence(),
                        'is_correct' => $j === $correctOptionIndex,
                        'order' => $j,
                    ]);
                }
            }

            $test->update([
                'total_questions' => 5,
                'total_points' => $totalPoints,
            ]);
        }

        // Birkaç test sonucu oluştur (opsiyonel)
        $publishedTests = Test::where('status', 'published')->get();
        if ($publishedTests->count() > 0) {
            foreach ($publishedTests->take(3) as $test) {
                $result = TestResult::factory()->create([
                    'test_id' => $test->id,
                    'user_id' => $user->id,
                    'total_questions' => $test->total_questions,
                ]);

                // Sonuç için cevaplar oluştur
                foreach ($test->questions as $question) {
                    $selectedOption = $question->options->random();
                    TestAnswer::create([
                        'result_id' => $result->id,
                        'question_id' => $question->id,
                        'option_id' => $selectedOption->id,
                        'is_correct' => $selectedOption->is_correct,
                    ]);
                }
            }
        }
    }

    /**
     * Kategoriye göre soru metni döndür
     */
    private function getQuestionText(string $categorySlug, int $questionNumber): string
    {
        $questions = [
            'genel-kultur' => [
                'Türkiye\'nin başkenti neresidir?',
                'Dünyanın en büyük okyanusu hangisidir?',
                'İstanbul\'un eski adı nedir?',
                'Türkiye\'nin en yüksek dağı hangisidir?',
                'Türkiye\'nin en uzun nehri hangisidir?',
            ],
            'matematik' => [
                '2 + 2 kaçtır?',
                'Bir dairenin çevresi nasıl hesaplanır?',
                'Bir üçgenin iç açıları toplamı kaçtır?',
                '5 x 5 kaçtır?',
                'Bir karenin alanı nasıl hesaplanır?',
            ],
            'tarih' => [
                'Osmanlı İmparatorluğu ne zaman kuruldu?',
                'Türkiye Cumhuriyeti ne zaman kuruldu?',
                'İstanbul ne zaman fethedildi?',
                'Kurtuluş Savaşı ne zaman başladı?',
                'Atatürk ne zaman doğdu?',
            ],
            'cografya' => [
                'Türkiye hangi kıtalarda yer alır?',
                'Türkiye\'nin en büyük gölü hangisidir?',
                'Türkiye\'nin en kalabalık şehri hangisidir?',
                'Türkiye\'nin en doğusundaki il hangisidir?',
                'Türkiye\'nin en batısındaki il hangisidir?',
            ],
            'edebiyat' => [
                'Türk edebiyatının en ünlü şairi kimdir?',
                'Divan edebiyatının en önemli temsilcisi kimdir?',
                'Türk romanının ilk örneği hangisidir?',
                'Nazım Hikmet hangi edebi akıma dahildir?',
                'Yunus Emre hangi dönemde yaşamıştır?',
            ],
        ];

        return $questions[$categorySlug][$questionNumber - 1] ?? fake()->sentence() . '?';
    }

    /**
     * Kategoriye göre şık metni döndür
     */
    private function getOptionText(string $categorySlug, int $questionNumber, int $optionIndex): string
    {
        $options = [
            'genel-kultur' => [
                1 => ['Ankara', 'İstanbul', 'İzmir', 'Bursa'],
                2 => ['Pasifik', 'Atlantik', 'Hint', 'Arktik'],
                3 => ['Konstantinopolis', 'Byzantion', 'İstanbul', 'Stambul'],
                4 => ['Ağrı Dağı', 'Erciyes', 'Uludağ', 'Kaçkar'],
                5 => ['Kızılırmak', 'Fırat', 'Dicle', 'Sakarya'],
            ],
            'matematik' => [
                1 => ['4', '3', '5', '6'],
                2 => ['2πr', 'πr²', '2r', 'πd'],
                3 => ['180°', '90°', '360°', '270°'],
                4 => ['25', '20', '30', '15'],
                5 => ['a²', '2a', '4a', 'a×b'],
            ],
            'tarih' => [
                1 => ['1299', '1453', '1923', '1071'],
                2 => ['1923', '1920', '1919', '1922'],
                3 => ['1453', '1299', '1071', '1517'],
                4 => ['1919', '1920', '1921', '1922'],
                5 => ['1881', '1880', '1882', '1879'],
            ],
            'cografya' => [
                1 => ['Asya ve Avrupa', 'Sadece Asya', 'Sadece Avrupa', 'Afrika'],
                2 => ['Van Gölü', 'Tuz Gölü', 'Beyşehir Gölü', 'Eğirdir Gölü'],
                3 => ['İstanbul', 'Ankara', 'İzmir', 'Bursa'],
                4 => ['Iğdır', 'Kars', 'Ardahan', 'Ağrı'],
                5 => ['Çanakkale', 'İstanbul', 'Edirne', 'Tekirdağ'],
            ],
            'edebiyat' => [
                1 => ['Yunus Emre', 'Nazım Hikmet', 'Orhan Veli', 'Cahit Sıtkı'],
                2 => ['Fuzuli', 'Nedim', 'Baki', 'Nabi'],
                3 => ['Taaşşuk-ı Talat ve Fitnat', 'Araba Sevdası', 'İntibah', 'Zehra'],
                4 => ['Toplumcu Gerçekçilik', 'Garip', 'İkinci Yeni', 'Servet-i Fünun'],
                5 => ['13. yüzyıl', '14. yüzyıl', '12. yüzyıl', '15. yüzyıl'],
            ],
        ];

        if (isset($options[$categorySlug][$questionNumber][$optionIndex])) {
            return $options[$categorySlug][$questionNumber][$optionIndex];
        }

        return $this->faker->sentence();
    }

    /**
     * Kategoriye göre açıklama döndür
     */
    private function getExplanation(string $categorySlug, int $questionNumber): string
    {
        $explanations = [
            'genel-kultur' => [
                'Ankara, 1923 yılından beri Türkiye\'nin başkentidir.',
                'Pasifik Okyanusu dünyanın en büyük okyanusudur.',
                'İstanbul\'un eski adı Konstantinopolis\'tir.',
                'Ağrı Dağı Türkiye\'nin en yüksek dağıdır.',
                'Kızılırmak Türkiye\'nin en uzun nehridir.',
            ],
        ];

        if (isset($explanations[$categorySlug][$questionNumber - 1])) {
            return $explanations[$categorySlug][$questionNumber - 1];
        }

        return $this->faker->optional(0.5)->sentence() ?? '';
    }
}

