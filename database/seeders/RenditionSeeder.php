<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rendition\Word;
use App\Models\Rendition\ExampleSentence;
use App\Models\Rendition\LanguagePack;
use App\Models\Rendition\Synonym;
use App\Models\Rendition\WordPackRelation;

class RenditionSeeder extends Seeder
{
    public function run(): void
    {
        // Create Language Packs
        $languagePacks = [
            ['name' => 'Essential English Words', 'description' => 'Basic English vocabulary pack', 'language' => 'en'],
            ['name' => 'Business English', 'description' => 'Professional English vocabulary', 'language' => 'en'],
            ['name' => 'Academic Turkish', 'description' => 'Academic Turkish vocabulary', 'language' => 'tr'],
            ['name' => 'Daily Conversations', 'description' => 'Everyday English phrases', 'language' => 'en'],
            ['name' => 'Technical Terms', 'description' => 'Technical and scientific vocabulary', 'language' => 'en'],
        ];

        foreach ($languagePacks as $pack) {
            LanguagePack::create($pack);
        }

        // Create Words
        $words = [
            // English Words
            [
                'word' => 'book',
                'meaning' => 'kitap',
                'type' => 'noun',
                'language' => 'en',
                'learning_status' => 0,
                'difficulty_level' => 1,
            ],
            [
                'word' => 'write',
                'meaning' => 'yazmak',
                'type' => 'verb',
                'language' => 'en',
                'learning_status' => 1,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'computer',
                'meaning' => 'bilgisayar',
                'type' => 'noun',
                'language' => 'en',
                'learning_status' => 2,
                'difficulty_level' => 1,
            ],
            [
                'word' => 'develop',
                'meaning' => 'geliştirmek',
                'type' => 'verb',
                'language' => 'en',
                'learning_status' => 1,
                'difficulty_level' => 3,
            ],
            [
                'word' => 'algorithm',
                'meaning' => 'algoritma',
                'type' => 'noun',
                'language' => 'en',
                'learning_status' => 0,
                'difficulty_level' => 4,
            ],
            [
                'word' => 'implement',
                'meaning' => 'uygulamak',
                'type' => 'verb',
                'language' => 'en',
                'learning_status' => 1,
                'difficulty_level' => 3,
            ],
            [
                'word' => 'database',
                'meaning' => 'veritabanı',
                'type' => 'noun',
                'language' => 'en',
                'learning_status' => 2,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'optimize',
                'meaning' => 'optimize etmek',
                'type' => 'verb',
                'language' => 'en',
                'learning_status' => 0,
                'difficulty_level' => 4,
            ],
            [
                'word' => 'interface',
                'meaning' => 'arayüz',
                'type' => 'noun',
                'language' => 'en',
                'learning_status' => 1,
                'difficulty_level' => 3,
            ],
            [
                'word' => 'debug',
                'meaning' => 'hata ayıklamak',
                'type' => 'verb',
                'language' => 'en',
                'learning_status' => 2,
                'difficulty_level' => 3,
            ],

            // Turkish Words
            [
                'word' => 'kalem',
                'meaning' => 'pencil',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 0,
                'difficulty_level' => 1,
            ],
            [
                'word' => 'programlama',
                'meaning' => 'programming',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 1,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'geliştirici',
                'meaning' => 'developer',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 2,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'yazılım',
                'meaning' => 'software',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 1,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'değişken',
                'meaning' => 'variable',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 0,
                'difficulty_level' => 3,
            ],
            [
                'word' => 'fonksiyon',
                'meaning' => 'function',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 2,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'sınıf',
                'meaning' => 'class',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 1,
                'difficulty_level' => 3,
            ],
            [
                'word' => 'nesne',
                'meaning' => 'object',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 0,
                'difficulty_level' => 3,
            ],
            [
                'word' => 'metot',
                'meaning' => 'method',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 2,
                'difficulty_level' => 2,
            ],
            [
                'word' => 'döngü',
                'meaning' => 'loop',
                'type' => 'noun',
                'language' => 'tr',
                'learning_status' => 1,
                'difficulty_level' => 3,
            ],
        ];

        $examples = [
            'en' => [
                'book' => [
                    'I read a book every week.' => 'Her hafta bir kitap okurum.',
                    'This is my favorite book.' => 'Bu benim favori kitabım.',
                ],
                'write' => [
                    'I write code every day.' => 'Her gün kod yazarım.',
                    'She writes beautiful stories.' => 'O güzel hikayeler yazar.',
                ],
                'computer' => [
                    'I work on my computer.' => 'Bilgisayarımda çalışıyorum.',
                    'The computer is running slow.' => 'Bilgisayar yavaş çalışıyor.',
                ],
                'develop' => [
                    'We develop web applications.' => 'Web uygulamaları geliştiriyoruz.',
                    'They are developing new features.' => 'Yeni özellikler geliştiriyorlar.',
                ],
                'algorithm' => [
                    'This algorithm is very efficient.' => 'Bu algoritma çok verimli.',
                    'We need a better algorithm.' => 'Daha iyi bir algoritmaya ihtiyacımız var.',
                ],
            ],
            'tr' => [
                'kalem' => [
                    'Kalem masanın üstünde.' => 'The pencil is on the table.',
                    'Bu benim en sevdiğim kalem.' => 'This is my favorite pencil.',
                ],
                'programlama' => [
                    'Programlama öğrenmek zevkli.' => 'Learning programming is fun.',
                    'İleri seviye programlama.' => 'Advanced programming.',
                ],
                'yazılım' => [
                    'Yazılım geliştirme süreci.' => 'Software development process.',
                    'Yazılım mühendisliği.' => 'Software engineering.',
                ],
            ],
        ];

        $synonyms = [
            'book' => ['novel', 'text', 'publication'],
            'write' => ['compose', 'author', 'record'],
            'computer' => ['pc', 'laptop', 'machine'],
            'develop' => ['create', 'build', 'construct'],
            'algorithm' => ['procedure', 'process', 'method'],
            'implement' => ['execute', 'perform', 'accomplish'],
            'database' => ['datastore', 'repository', 'warehouse'],
            'optimize' => ['improve', 'enhance', 'streamline'],
            'interface' => ['connection', 'interaction', 'gateway'],
            'debug' => ['troubleshoot', 'fix', 'repair'],
        ];

        foreach ($words as $wordData) {
            $baseWordData = [
                'flag' => false,
                'correct_count' => 0,
                'incorrect_count' => 0,
                'review_count' => 0,
            ];

            $word = Word::create(array_merge($wordData, $baseWordData));

            // Create Example Sentences
            if (isset($examples[$word->language][$word->word])) {
                foreach ($examples[$word->language][$word->word] as $sentence => $translation) {
                    ExampleSentence::create([
                        'word_id' => $word->id,
                        'sentence' => $sentence,
                        'translation' => $translation,
                        'language' => $word->language,
                    ]);
                }
            } else {
                // Default example if not specified
                ExampleSentence::create([
                    'word_id' => $word->id,
                    'sentence' => "Example using the word '{$word->word}'.",
                    'translation' => "'{$word->word}' kelimesini kullanan örnek.",
                    'language' => $word->language,
                ]);
            }

            // Create Synonyms for English words
            if ($word->language === 'en' && isset($synonyms[$word->word])) {
                foreach ($synonyms[$word->word] as $synonym) {
                    Synonym::create([
                        'word_id' => $word->id,
                        'synonym' => $synonym,
                        'language' => $word->language,
                    ]);
                }
            }

            // Create Word Pack Relations
            $packId = LanguagePack::where('language', $word->language)
                ->inRandomOrder()
                ->first()
                ->id;

            WordPackRelation::create([
                'word_id' => $word->id,
                'pack_id' => $packId,
            ]);
        }
    }
}
