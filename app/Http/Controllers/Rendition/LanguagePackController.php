<?php

namespace App\Http\Controllers\Rendition;

use App\Http\Controllers\Controller;
use App\Models\Rendition\LanguagePack;
use App\Models\Rendition\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class LanguagePackController extends Controller
{
    public function index(Request $request)
    {
        $languagePacks = LanguagePack::with(['words' => function ($query) {
            $query->with(['meanings', 'exampleSentences', 'synonyms']);
        }])->get();

        // her paketin relation'dan toplam kelime sayısını al
        foreach ($languagePacks as $languagePack) {
            $languagePack->word_count = $languagePack->words()->count();
        }
        
        // Index sayfasında zaten languagePacks var ve word_count ekleniyor
        // Sidebar için de aynı veriyi kullanabiliriz, duplicate key hatası olmaması için
        // languagePacks'i hem index hem sidebar için kullanıyoruz
        
        return Inertia::render('Rendition/LanguagePacks/IndexLanguagePacks', [
            'languagePacks' => $languagePacks,
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ],
        ]);
    }

    // public function show(Request $request)
    // {

    //     $languagePacks = LanguagePack::with('words')->get();
    //     dd($request);

    //     return Inertia::render('Rendition/LanguagePacks/ShowLanguagePacks', [
    //         'languagePacks' => $languagePacks,
    //         'languagePack' => $words,
    //         'screen' => [
    //             'isMobileSidebar' => false,
    //             'name' => 'packs'
    //         ]
    //     ]);
    // }
    public function create()
    {
        // Load sidebar data
        $languagePacks = \DB::table('lang_language_packs')->select([
            'lang_language_packs.id',
            'lang_language_packs.name',
            'lang_language_packs.slug',
            'lang_language_packs.language',
            \DB::raw('COUNT(lang_words.id) as word_count')
        ])
            ->leftJoin('lang_word_pack_relations', 'lang_language_packs.id', '=', 'lang_word_pack_relations.pack_id')
            ->leftJoin('lang_words', 'lang_word_pack_relations.word_id', '=', 'lang_words.id')
            ->groupBy('lang_language_packs.id', 'lang_language_packs.name', 'lang_language_packs.slug', 'lang_language_packs.language')
            ->orderBy('lang_language_packs.language')
            ->get();
        
        return Inertia::render('Rendition/LanguagePacks/CreateLanguagePacks', [
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ],
            'languagePacks' => $languagePacks,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'language' => 'required|string|size:2',
            'import_file' => 'nullable|file|mimes:json',
        ]);

        $languagePack = LanguagePack::create($request->except('import_file'));

        // JSON dosyası yüklendiyse kelimeleri içe aktar
        if ($request->hasFile('import_file')) {
            $jsonData = json_decode(file_get_contents($request->file('import_file')->getPathname()), true);

            if (isset($jsonData['words']) && is_array($jsonData['words'])) {
                $now = now();
                $newWordIds = [];
                $existingWordIds = [];

                foreach ($jsonData['words'] as $wordData) {
                    // Kelime ve türüne göre var mı kontrol et
                    $existingWord = Word::where('word', $wordData['word'])
                        ->where('type', $wordData['type'])
                        ->where('language', $wordData['language'])
                        ->first();

                    if ($existingWord) {
                        // Kelime zaten varsa, ID'sini kaydet
                        $existingWordIds[] = $existingWord->id;
                    } else {
                        // Yeni kelime oluştur
                        $word = Word::create([
                            'word' => $wordData['word'],
                            'type' => $wordData['type'],
                            'language' => $wordData['language'],
                            'learning_status' => $wordData['learning_status'] ?? 0,
                            'flag' => $wordData['flag'] ?? false,
                            'difficulty_level' => $wordData['difficulty_level'],
                            'incorrect_count' => 0,
                            'review_count' => 0,
                            'last_review_date' => $now,
                        ]);

                        // Anlamları ekle
                        if (isset($wordData['meanings']) && is_array($wordData['meanings'])) {
                            foreach ($wordData['meanings'] as $index => $meaningData) {
                                $word->meanings()->create([
                                    'meaning' => $meaningData['meaning'],
                                    'is_primary' => $meaningData['is_primary'] ?? ($index === 0),
                                    'display_order' => $meaningData['display_order'] ?? $index,
                                ]);
                            }
                        }

                        // Örnek cümleleri ekle
                        if (isset($wordData['example_sentences']) && is_array($wordData['example_sentences'])) {
                            foreach ($wordData['example_sentences'] as $sentence) {
                                $word->exampleSentences()->create([
                                    'sentence' => $sentence['sentence'],
                                    'translation' => $sentence['translation'],
                                    'language' => $sentence['language'],
                                ]);
                            }
                        }

                        // Eş anlamlıları ekle
                        if (isset($wordData['synonyms']) && is_array($wordData['synonyms'])) {
                            foreach ($wordData['synonyms'] as $synonym) {
                                $word->synonyms()->create([
                                    'synonym' => $synonym['synonym'],
                                    'language' => $synonym['language'],
                                ]);
                            }
                        }

                        $newWordIds[] = $word->id;
                    }
                }

                // Yeni kelimeleri pakete ekle
                if (!empty($newWordIds)) {
                    $languagePack->words()->attach($newWordIds);
                }

                // Var olan kelimeleri pakete ekle
                if (!empty($existingWordIds)) {
                    $languagePack->words()->attach($existingWordIds);
                }

                // Başarı mesajını güncelle
                $message = 'Dil paketi başarıyla oluşturuldu.';
                if (!empty($existingWordIds)) {
                    $message .= ' ' . count($existingWordIds) . ' kelime zaten mevcuttu ve pakete eklendi.';
                }
                if (!empty($newWordIds)) {
                    $message .= ' ' . count($newWordIds) . ' yeni kelime eklendi.';
                }

                return Redirect::route('rendition.language-packs.index')
                    ->with('success', $message);
            }
        }

        return Redirect::route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla oluşturuldu.');
    }

    public function edit($id)
    {
        $languagePack = LanguagePack::findOrFail($id);

        // Load sidebar data
        $languagePacks = \DB::table('lang_language_packs')->select([
            'lang_language_packs.id',
            'lang_language_packs.name',
            'lang_language_packs.slug',
            'lang_language_packs.language',
            \DB::raw('COUNT(lang_words.id) as word_count')
        ])
            ->leftJoin('lang_word_pack_relations', 'lang_language_packs.id', '=', 'lang_word_pack_relations.pack_id')
            ->leftJoin('lang_words', 'lang_word_pack_relations.word_id', '=', 'lang_words.id')
            ->groupBy('lang_language_packs.id', 'lang_language_packs.name', 'lang_language_packs.slug', 'lang_language_packs.language')
            ->orderBy('lang_language_packs.language')
            ->get();

        return Inertia::render('Rendition/LanguagePacks/EditLanguagePacks', [
            'languagePack' => $languagePack,
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ],
            'languagePacks' => $languagePacks,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'language' => 'required|string|size:2',
        ]);

        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->update($request->all());

        return Redirect::route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $languagePack = LanguagePack::findOrFail($id);

        // Model seviyesindeki cascade delete otomatik olarak çalışacak
        $languagePack->delete();

        return Redirect::route('rendition.language-packs.index')
            ->with('success', 'Dil paketi ve tüm ilişkili veriler başarıyla silindi.');
    }

    public function words($id)
    {
        $languagePack = LanguagePack::with('words')->findOrFail($id);

        return Inertia::render('Rendition/LanguagePacks/Words', [
            'languagePack' => $languagePack,
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ]
        ]);
    }

    public function addWords(Request $request, $id)
    {
        $request->validate([
            'word_ids' => 'required|array',
            'word_ids.*' => 'exists:lang_words,id'
        ]);

        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->words()->attach($request->word_ids);

        return Redirect::route('rendition.language-packs.words', $id)
            ->with('success', 'Kelimeler pakete başarıyla eklendi.');
    }

    public function removeWord($id, $wordId)
    {
        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->words()->detach($wordId);

        return Redirect::route('rendition.language-packs.words', $id)
            ->with('success', 'Kelime paketten başarıyla kaldırıldı.');
    }

    public function export($id)
    {
        $languagePack = LanguagePack::with(['words.exampleSentences', 'words.synonyms', 'words.meanings'])->findOrFail($id);
        $now = now();

        $exportData = [
            'name' => $languagePack->name,
            'slug' => $languagePack->slug,
            'description' => $languagePack->description,
            'language' => $languagePack->language,
            'words' => $languagePack->words->map(function ($word) use ($now) {
                return [
                    'id' => $word->id,
                    'word' => $word->word,
                    'type' => $word->type,
                    'language' => $word->language,
                    'learning_status' => $word->learning_status,
                    'flag' => $word->flag,
                    'difficulty_level' => $word->difficulty_level,
                    'incorrect_count' => 0,
                    'review_count' => 0,
                    'last_review_date' => $now->toDateTimeString(),
                    'created_at' => $now->toDateTimeString(),
                    'updated_at' => $now->toDateTimeString(),
                    'meanings' => $word->meanings->map(function ($meaning) {
                        return [
                            'meaning' => $meaning->meaning,
                            'is_primary' => $meaning->is_primary,
                            'display_order' => $meaning->display_order
                        ];
                    }),
                    'example_sentences' => $word->exampleSentences->map(function ($sentence) {
                        return [
                            'sentence' => $sentence->sentence,
                            'translation' => $sentence->translation,
                            'language' => $sentence->language
                        ];
                    }),
                    'synonyms' => $word->synonyms->map(function ($synonym) {
                        return [
                            'synonym' => $synonym->synonym,
                            'language' => $synonym->language
                        ];
                    })
                ];
            })
        ];

        $filename = "{$languagePack->slug}-export-{$now->format('Y-m-d')}.json";

        return Response::json($exportData, 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => "attachment; filename=\"{$filename}\""
        ]);
    }
}
