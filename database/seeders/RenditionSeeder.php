<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rendition\Word;
use App\Models\Rendition\ExampleSentence;
use App\Models\Rendition\LanguagePack;
use App\Models\Rendition\Synonym;
use App\Models\Rendition\WordPackRelation;
use Database\Factories\Rendition\WordFactory;
use Database\Factories\Rendition\LanguagePackFactory;
use Database\Factories\Rendition\ExampleSentenceFactory;
use Database\Factories\Rendition\SynonymFactory;
use Database\Factories\Rendition\WordPackRelationFactory;
use Faker\Factory as FakerFactory;

class RenditionSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = FakerFactory::create();
    }

    public function run(): void
    {
        // Create Language Packs
        $languagePacks = [
            ['name' => '150 Word Demo Pack', 'slug' => 'demo-150', 'description' => 'Demo vocabulary pack with 150 words', 'language' => 'en'],
            ['name' => '20 Word Quick Start', 'slug' => 'quick-20', 'description' => 'Quick start vocabulary pack with 20 words', 'language' => 'en'],
        ];

        foreach ($languagePacks as $pack) {
            LanguagePack::firstOrCreate(
                ['slug' => $pack['slug']],
                $pack
            );
        }

        // Create 150 demo words
        $demoPack = LanguagePack::where('slug', 'demo-150')->first();
        $words = [];

        // Common English words
        $commonWords = [
            'ability',
            'able',
            'about',
            'above',
            'accept',
            'according',
            'account',
            'across',
            'act',
            'action',
            'activity',
            'actually',
            'add',
            'address',
            'administration',
            'admit',
            'adult',
            'affect',
            'after',
            'again',
            'against',
            'age',
            'agency',
            'agent',
            'ago',
            'agree',
            'agreement',
            'ahead',
            'air',
            'all',
            'allow',
            'almost',
            'alone',
            'along',
            'already',
            'also',
            'although',
            'always',
            'American',
            'among',
            'amount',
            'analysis',
            'and',
            'animal',
            'another',
            'answer',
            'any',
            'anyone',
            'anything',
            'appear',
            'apply',
            'approach',
            'area',
            'argue',
            'arm',
            'around',
            'arrive',
            'art',
            'article',
            'artist',
            'as',
            'ask',
            'assume',
            'at',
            'attack',
            'attention',
            'attorney',
            'audience',
            'author',
            'authority',
            'available',
            'avoid',
            'away',
            'baby',
            'back',
            'bad',
            'bag',
            'ball',
            'bank',
            'bar',
            'base',
            'be',
            'beat',
            'beautiful',
            'because',
            'become',
            'bed',
            'before',
            'begin',
            'behavior',
            'behind',
            'believe',
            'benefit',
            'best',
            'better',
            'between',
            'beyond',
            'big',
            'bill',
            'billion',
            'bit',
            'black',
            'blood',
            'blue',
            'board',
            'body',
            'book',
            'born',
            'both',
            'box',
            'boy',
            'break',
            'bring',
            'brother',
            'budget',
            'build',
            'building',
            'business',
            'but',
            'buy',
            'by',
            'call',
            'camera',
            'campaign',
            'can',
            'cancer',
            'candidate',
            'capital',
            'car',
            'card',
            'care',
            'career',
            'carry',
            'case',
            'catch',
            'cause',
            'cell',
            'center',
            'central',
            'century'
        ];

        foreach ($commonWords as $word) {
            $words[] = [
                'word' => $word,
                'meaning' => $this->generateMeaning($word),
                'type' => $this->getRandomType(),
                'language' => 'en',
                'learning_status' => 0,
                'difficulty_level' => $this->faker->numberBetween(1, 4),
            ];
        }

        foreach ($words as $wordData) {
            $baseWordData = [
                'word' => $wordData['word'],
                'type' => $wordData['type'],
                'language' => $wordData['language'],
                'learning_status' => $wordData['learning_status'],
                'difficulty_level' => $wordData['difficulty_level'],
                'is_complete' => true, // Anlam ekliyoruz, bu yüzden complete
                'flag' => false,
                'incorrect_count' => 0,
                'review_count' => 0,
            ];

            $word = Word::create($baseWordData);

            // Create the primary meaning
            $word->meanings()->create([
                'meaning' => $wordData['meaning'],
                'is_primary' => true,
                'display_order' => 0,
            ]);

            // Create example sentences
            ExampleSentence::factory()->count(2)->create([
                'word_id' => $word->id,
                'language' => $word->language,
            ]);

            // Create synonyms for English words
            if ($word->language === 'en') {
                Synonym::factory()->count(2)->create([
                    'word_id' => $word->id,
                    'language' => $word->language,
                ]);
            }

            // Add word to demo pack
            WordPackRelation::firstOrCreate([
                'word_id' => $word->id,
                'pack_id' => $demoPack->id,
            ]);
        }

        // Create 20 quick start words
        $quickStartPack = LanguagePack::where('slug', 'quick-20')->first();
        $quickStartWords = [
            'hello',
            'goodbye',
            'please',
            'thank you',
            'sorry',
            'yes',
            'no',
            'maybe',
            'help',
            'understand',
            'speak',
            'learn',
            'teach',
            'work',
            'play',
            'eat',
            'drink',
            'sleep',
            'love',
            'hate'
        ];

        foreach ($quickStartWords as $word) {
            $wordData = [
                'word' => $word,
                'type' => $this->getRandomType(),
                'language' => 'en',
                'learning_status' => 0,
                'difficulty_level' => 1,
                'is_complete' => true, // Anlam ekliyoruz, bu yüzden complete
                'flag' => false,
                'incorrect_count' => 0,
                'review_count' => 0,
            ];

            $wordObj = Word::create($wordData);

            // Create the primary meaning
            $wordObj->meanings()->create([
                'meaning' => $this->generateQuickStartMeaning($word),
                'is_primary' => true,
                'display_order' => 0,
            ]);

            // Create example sentences
            ExampleSentence::factory()->count(2)->create([
                'word_id' => $wordObj->id,
                'language' => $wordObj->language,
            ]);

            // Create synonyms for English words
            if ($wordObj->language === 'en') {
                Synonym::factory()->count(2)->create([
                    'word_id' => $wordObj->id,
                    'language' => $wordObj->language,
                ]);
            }

            // Add word to quick start pack
            WordPackRelation::firstOrCreate([
                'word_id' => $wordObj->id,
                'pack_id' => $quickStartPack->id,
            ]);
        }
    }

    private function generateQuickStartMeaning($word)
    {
        $meanings = [
            'hello' => 'merhaba',
            'goodbye' => 'hoşça kal',
            'please' => 'lütfen',
            'thank you' => 'teşekkür ederim',
            'sorry' => 'özür dilerim',
            'yes' => 'evet',
            'no' => 'hayır',
            'maybe' => 'belki',
            'help' => 'yardım',
            'understand' => 'anlamak',
            'speak' => 'konuşmak',
            'learn' => 'öğrenmek',
            'teach' => 'öğretmek',
            'work' => 'çalışmak',
            'play' => 'oynamak',
            'eat' => 'yemek',
            'drink' => 'içmek',
            'sleep' => 'uyumak',
            'love' => 'sevmek',
            'hate' => 'nefret etmek'
        ];

        return $meanings[$word] ?? $this->faker->word();
    }

    private function generateMeaning($word)
    {
        // Simple meaning generator - in a real app, you'd want to use a dictionary API
        $meanings = [
            'ability' => 'yetenek',
            'able' => 'yapabilmek',
            'about' => 'hakkında',
            'above' => 'üstünde',
            'accept' => 'kabul etmek',
            'according' => 'göre',
            'account' => 'hesap',
            'across' => 'karşısında',
            'act' => 'hareket etmek',
            'action' => 'eylem',
            'activity' => 'aktivite',
            'actually' => 'aslında',
            'add' => 'eklemek',
            'address' => 'adres',
            'administration' => 'yönetim',
            'admit' => 'kabul etmek',
            'adult' => 'yetişkin',
            'affect' => 'etkilemek',
            'after' => 'sonra',
            'again' => 'tekrar',
            'against' => 'karşı',
            'age' => 'yaş',
            'agency' => 'ajans',
            'agent' => 'ajan',
            'ago' => 'önce',
            'agree' => 'katılmak',
            'agreement' => 'anlaşma',
            'ahead' => 'ileri',
            'air' => 'hava',
            'all' => 'tüm',
            'allow' => 'izin vermek',
            'almost' => 'neredeyse',
            'alone' => 'yalnız',
            'along' => 'boyunca',
            'already' => 'zaten',
            'also' => 'ayrıca',
            'although' => 'rağmen',
            'always' => 'her zaman',
            'American' => 'Amerikalı',
            'among' => 'arasında',
            'amount' => 'miktar',
            'analysis' => 'analiz',
            'and' => 've',
            'animal' => 'hayvan',
            'another' => 'başka',
            'answer' => 'cevap',
            'any' => 'herhangi',
            'anyone' => 'herhangi biri',
            'anything' => 'herhangi bir şey',
            'appear' => 'görünmek',
            'apply' => 'uygulamak',
            'approach' => 'yaklaşmak',
            'area' => 'alan',
            'argue' => 'tartışmak',
            'arm' => 'kol',
            'around' => 'etrafında',
            'arrive' => 'varmak',
            'art' => 'sanat',
            'article' => 'makale',
            'artist' => 'sanatçı',
            'as' => 'olarak',
            'ask' => 'sormak',
            'assume' => 'varsaymak',
            'at' => 'de/da',
            'attack' => 'saldırmak',
            'attention' => 'dikkat',
            'attorney' => 'avukat',
            'audience' => 'izleyici',
            'author' => 'yazar',
            'authority' => 'otorite',
            'available' => 'mevcut',
            'avoid' => 'kaçınmak',
            'away' => 'uzakta',
            'baby' => 'bebek',
            'back' => 'geri',
            'bad' => 'kötü',
            'bag' => 'çanta',
            'ball' => 'top',
            'bank' => 'banka',
            'bar' => 'bar',
            'base' => 'temel',
            'be' => 'olmak',
            'beat' => 'dövmek',
            'beautiful' => 'güzel',
            'because' => 'çünkü',
            'become' => 'olmak',
            'bed' => 'yatak',
            'before' => 'önce',
            'begin' => 'başlamak',
            'behavior' => 'davranış',
            'behind' => 'arkasında',
            'believe' => 'inanmak',
            'benefit' => 'fayda',
            'best' => 'en iyi',
            'better' => 'daha iyi',
            'between' => 'arasında',
            'beyond' => 'ötesinde',
            'big' => 'büyük',
            'bill' => 'fatura',
            'billion' => 'milyar',
            'bit' => 'biraz',
            'black' => 'siyah',
            'blood' => 'kan',
            'blue' => 'mavi',
            'board' => 'tahta',
            'body' => 'vücut',
            'book' => 'kitap',
            'born' => 'doğmak',
            'both' => 'her ikisi',
            'box' => 'kutu',
            'boy' => 'erkek çocuk',
            'break' => 'kırmak',
            'bring' => 'getirmek',
            'brother' => 'erkek kardeş',
            'budget' => 'bütçe',
            'build' => 'inşa etmek',
            'building' => 'bina',
            'business' => 'iş',
            'but' => 'ama',
            'buy' => 'satın almak',
            'by' => 'tarafından',
            'call' => 'aramak',
            'camera' => 'kamera',
            'campaign' => 'kampanya',
            'can' => 'yapabilmek',
            'cancer' => 'kanser',
            'candidate' => 'aday',
            'capital' => 'başkent',
            'car' => 'araba',
            'card' => 'kart',
            'care' => 'bakım',
            'career' => 'kariyer',
            'carry' => 'taşımak',
            'case' => 'durum',
            'catch' => 'yakalamak',
            'cause' => 'neden',
            'cell' => 'hücre',
            'center' => 'merkez',
            'central' => 'merkezi',
            'century' => 'yüzyıl'
        ];

        return $meanings[$word] ?? $this->faker->word();
    }

    private function getRandomType()
    {
        $types = ['noun', 'verb', 'adjective', 'adverb'];
        return $types[array_rand($types)];
    }
}
