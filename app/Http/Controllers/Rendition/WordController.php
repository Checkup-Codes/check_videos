<?php

namespace App\Http\Controllers\Rendition;

use App\Http\Controllers\Controller;
use App\Models\Rendition\Word;
use App\Models\Rendition\LanguagePack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;

class WordController extends Controller
{

    public function index()
    {
        try {
            // Get query parameters
            $search = request()->input('search');
            $language = request()->input('language');
            $status = request()->input('status');
            $perPage = 10; // Number of words per page

            // Start building the query
            $query = Word::query();

            // Apply filters
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('word', 'like', "%{$search}%")
                        ->orWhere('meaning', 'like', "%{$search}%");
                });
            }

            if ($language) {
                $query->where('language', $language);
            }

            if ($status !== null && $status !== '') {
                $query->where('learning_status', $status);
            }

            // Execute query with pagination
            $words = $query->with(['exampleSentences', 'synonyms', 'meanings'])
                ->orderBy('word')
                ->paginate($perPage);

            // Debug logging
            Log::info('WordController@index - Pagination Debug:', [
                'total_words' => $words->total(),
                'current_page' => $words->currentPage(),
                'last_page' => $words->lastPage(),
                'per_page' => $words->perPage(),
                'items_count' => $words->count(),
                'from' => $words->firstItem(),
                'to' => $words->lastItem(),
            ]);

            // Test if pagination is working
            Log::info('Pagination test:', [
                'is_paginator' => $words instanceof \Illuminate\Pagination\LengthAwarePaginator,
                'has_items' => $words->items() ? 'yes' : 'no',
                'items_count' => count($words->items()),
            ]);

            // Add meaning property for backward compatibility
            $words->through(function ($word) {
                if (!property_exists($word, 'meaning') || !$word->meaning) {
                    $primaryMeaning = $word->meanings->first(function ($meaning) {
                        return $meaning->is_primary;
                    });

                    if ($primaryMeaning) {
                        $word->meaning = $primaryMeaning->meaning;
                    } else if ($word->meanings->count() > 0) {
                        $word->meaning = $word->meanings->first()->meaning;
                    } else {
                        $word->meaning = '';
                    }
                }
                return $word;
            });

            Log::info('After through method - items count:', ['count' => count($words->items())]);

            // Get language packs for the sidebar
            $languagePacks = DB::table('lang_language_packs')->select([
                'lang_language_packs.id',
                'lang_language_packs.name',
                'lang_language_packs.slug',
                'lang_language_packs.language',
                DB::raw('COUNT(lang_words.id) as word_count')
            ])
                ->leftJoin('lang_word_pack_relations', 'lang_language_packs.id', '=', 'lang_word_pack_relations.pack_id')
                ->leftJoin('lang_words', 'lang_word_pack_relations.word_id', '=', 'lang_words.id')
                ->groupBy('lang_language_packs.id', 'lang_language_packs.name', 'lang_language_packs.slug', 'lang_language_packs.language')
                ->orderBy('lang_language_packs.language')
                ->get();

            // Test pagination data
            $paginationData = [
                'current_page' => $words->currentPage(),
                'last_page' => $words->lastPage(),
                'per_page' => $words->perPage(),
                'total' => $words->total(),
                'from' => $words->firstItem(),
                'to' => $words->lastItem(),
            ];

            Log::info('Pagination Data:', $paginationData);
            Log::info('Words count:', ['count' => count($words->items())]);
            Log::info('Total words:', ['total' => $words->total()]);
            Log::info('Last page:', ['last_page' => $words->lastPage()]);

            return Inertia::render('Rendition/Words/IndexWord', [
                'words' => $words->items(),
                'pagination' => $paginationData,
                'filters' => [
                    'search' => $search,
                    'language' => $language,
                    'status' => $status,
                ],
                'languagePacks' => $languagePacks,
                'screen' => [
                    'isMobileSidebar' => true,
                    'name' => 'words'
                ]
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error in WordController@index: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            Log::info('Falling back to empty dataset due to exception');

            // Fall back to returning an empty dataset
            return Inertia::render('Rendition/Words/IndexWord', [
                'words' => [],
                'pagination' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => 10,
                    'total' => 0,
                    'from' => 0,
                    'to' => 0,
                ],
                'filters' => [
                    'search' => $search ?? '',
                    'language' => $language ?? '',
                    'status' => $status ?? '',
                ],
                'languagePacks' => [],
                'screen' => [
                    'isMobileSidebar' => true,
                    'name' => 'words'
                ],
                'error' => 'Verileri yüklerken bir hata oluştu.'
            ]);
        }
    }

    public function show($slug)
    {
        try {
            // Tüm dil paketlerini getir
            $languagePacks = DB::table('lang_language_packs')->select([
                'lang_language_packs.id',
                'lang_language_packs.name',
                'lang_language_packs.slug',
                'lang_language_packs.language'
            ])
                ->selectRaw('(SELECT COUNT(*) FROM lang_word_pack_relations WHERE lang_word_pack_relations.pack_id = lang_language_packs.id) as word_count')
                ->orderBy('lang_language_packs.language')
                ->orderBy('lang_language_packs.name')
                ->get();

            // Slug'a göre istenen paket ve kelimeleri getir
            $languagePack = LanguagePack::with([
                'words' => function ($query) {
                    $query->with(['exampleSentences', 'synonyms', 'meanings'])
                        ->orderBy('word');
                }
            ])
                ->where('slug', $slug)
                ->firstOrFail();

            // Add meaning property for backward compatibility
            if ($languagePack->words) {
                foreach ($languagePack->words as $word) {
                    if (!property_exists($word, 'meaning') || !$word->meaning) {
                        $primaryMeaning = $word->meanings->first(function ($meaning) {
                            return $meaning->is_primary;
                        });

                        if ($primaryMeaning) {
                            $word->meaning = $primaryMeaning->meaning;
                        } else if ($word->meanings->count() > 0) {
                            $word->meaning = $word->meanings->first()->meaning;
                        } else {
                            $word->meaning = '';
                        }
                    }
                }
            }

            // Kelimelerin yüklendiğini kontrol et
            if (!$languagePack->words || $languagePack->words->isEmpty()) {
                Log::warning("No words found for language pack: {$slug}");
            } else {
                Log::info("Found {$languagePack->words->count()} words for language pack: {$slug}");
            }

            return Inertia::render('Rendition/Words/ShowWord', [
                'words' => $languagePack->words,
                'languagePacks' => $languagePacks,
                'pack' => [
                    'id' => $languagePack->id,
                    'name' => $languagePack->name,
                    'slug' => $languagePack->slug,
                    'language' => $languagePack->language,
                ],
                'screen' => [
                    'isMobileSidebar' => false,
                    'name' => 'words'
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error in WordController@show: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Inertia::render('Rendition/Words/ShowWord', [
                'words' => [],
                'languagePacks' => [],
                'pack' => null,
                'screen' => [
                    'isMobileSidebar' => false,
                    'name' => 'words'
                ],
                'error' => 'Verileri yüklerken bir hata oluştu: ' . $e->getMessage()
            ]);
        }
    }


    public function create()
    {
        $languagePacks = DB::table('lang_language_packs')->select([
            'lang_language_packs.id',
            'lang_language_packs.name',
            'lang_language_packs.slug',
            'lang_language_packs.language',
            DB::raw('COUNT(lang_words.id) as word_count')
        ])
            ->leftJoin('lang_word_pack_relations', 'lang_language_packs.id', '=', 'lang_word_pack_relations.pack_id')
            ->leftJoin('lang_words', 'lang_word_pack_relations.word_id', '=', 'lang_words.id')
            ->groupBy('lang_language_packs.id', 'lang_language_packs.name', 'lang_language_packs.slug', 'lang_language_packs.language')
            ->orderBy('lang_language_packs.language')
            ->orderBy('lang_language_packs.name')
            ->get();

        return Inertia::render('Rendition/Words/CreateWord', [
            'languagePacks' => $languagePacks,
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'words'
            ]
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Word form data:', $request->all());

        try {
            $request->validate([
                'word' => [
                    'required',
                    'string',
                    'max:255',
                    function ($attribute, $value, $fail) use ($request) {
                        $exists = Word::where('word', $value)
                            ->where('language', $request->language)
                            ->where('type', $request->type)
                            ->exists();
                        if ($exists) {
                            $fail('Bu kelime (' . $value . ') ve tür (' . $request->type . ') kombinasyonu zaten veritabanında mevcut.');
                        }
                    }
                ],
                'meanings' => 'required|array|min:1',
                'meanings.*.meaning' => 'required|string',
                'meanings.*.is_primary' => 'boolean',
                'type' => 'required|string',
                'language' => 'required|string|size:2',
                'difficulty_level' => 'required|integer|min:1|max:4',
                'language_pack_ids' => 'required|array',
                'language_pack_ids.*' => 'exists:lang_language_packs,id',
                'learning_status' => 'integer|min:0|max:2',
                'flag' => 'boolean',
                'example_sentences' => 'nullable|array',
                'example_translations' => 'nullable|array',
                'synonyms' => 'nullable|array',
            ]);

            DB::beginTransaction();

            $word = Word::create([
                'word' => $request->word,
                'type' => $request->type,
                'language' => $request->language,
                'learning_status' => $request->learning_status ?? 0,
                'flag' => $request->flag ?? false,
                'difficulty_level' => $request->difficulty_level,
                'incorrect_count' => 0,
                'review_count' => 0,
            ]);

            // Save word meanings
            $hasPrimary = false;
            foreach ($request->meanings as $index => $meaningData) {
                // If this is the first meaning and no primary is set, make it primary
                $isPrimary = isset($meaningData['is_primary']) ? $meaningData['is_primary'] : false;

                // If it's explicitly set to primary or no primary exists yet and it's the first item
                if ($isPrimary || (!$hasPrimary && $index === 0)) {
                    $isPrimary = true;
                    $hasPrimary = true;
                }

                $word->meanings()->create([
                    'meaning' => $meaningData['meaning'],
                    'is_primary' => $isPrimary,
                    'display_order' => $index,
                ]);
            }

            // İlişkili dil paketlerini ekle
            $word->languagePacks()->attach($request->language_pack_ids);

            // Örnek cümleleri ekle
            if ($request->has('example_sentences') && is_array($request->example_sentences)) {
                foreach ($request->example_sentences as $index => $sentence) {
                    if (!empty($sentence)) {
                        $word->exampleSentences()->create([
                            'sentence' => $sentence,
                            'translation' => $request->example_translations[$index] ?? null,
                            'language' => $word->language,
                        ]);
                    }
                }
            }

            // Eş anlamlıları ekle
            if ($request->has('synonyms') && is_array($request->synonyms)) {
                foreach ($request->synonyms as $synonym) {
                    if (!empty($synonym)) {
                        $word->synonyms()->create([
                            'synonym' => $synonym,
                            'language' => $word->language,
                        ]);
                    }
                }
            }

            DB::commit();

            return Redirect::route('rendition.words.index')
                ->with('success', 'Kelime başarıyla eklendi.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Word creation error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Redirect::back()
                ->withInput()
                ->with('error', 'Kelime eklenirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $word = Word::with(['exampleSentences', 'synonyms', 'languagePacks', 'meanings'])->findOrFail($id);

        $languagePacks = DB::table('lang_language_packs')->select([
            'lang_language_packs.id',
            'lang_language_packs.name',
            'lang_language_packs.slug',
            'lang_language_packs.language',
            DB::raw('COUNT(lang_words.id) as word_count')
        ])
            ->leftJoin('lang_word_pack_relations', 'lang_language_packs.id', '=', 'lang_word_pack_relations.pack_id')
            ->leftJoin('lang_words', 'lang_word_pack_relations.word_id', '=', 'lang_words.id')
            ->groupBy('lang_language_packs.id', 'lang_language_packs.name', 'lang_language_packs.slug', 'lang_language_packs.language')
            ->orderBy('lang_language_packs.language')
            ->orderBy('lang_language_packs.name')
            ->get();

        return Inertia::render('Rendition/Words/EditWord', [
            'word' => $word,
            'languagePacks' => $languagePacks,
            'screen' => [
                'isMobileSidebar' => true,
                'name' => 'words'
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'word' => [
                    'required',
                    'string',
                    'max:255',
                    function ($attribute, $value, $fail) use ($request, $id) {
                        $exists = Word::where('word', $value)
                            ->where('language', $request->language)
                            ->where('type', $request->type)
                            ->where('id', '!=', $id)
                            ->exists();
                        if ($exists) {
                            $fail('Bu kelime (' . $value . ') ve tür (' . $request->type . ') kombinasyonu zaten veritabanında mevcut.');
                        }
                    }
                ],
                'meanings' => 'required|array|min:1',
                'meanings.*.meaning' => 'required|string',
                'meanings.*.is_primary' => 'boolean',
                'type' => 'required|string',
                'language' => 'required|string|size:2',
                'difficulty_level' => 'required|integer|min:1|max:4',
                'language_pack_ids' => 'required|array',
                'language_pack_ids.*' => 'exists:lang_language_packs,id',
                'learning_status' => 'integer|min:0|max:2',
                'flag' => 'boolean',
                'example_sentences' => 'nullable|array',
                'example_translations' => 'nullable|array',
                'synonyms' => 'nullable|array',
            ]);

            $word = Word::findOrFail($id);
            $word->update([
                'word' => $request->word,
                'type' => $request->type,
                'language' => $request->language,
                'learning_status' => $request->learning_status,
                'flag' => $request->flag,
                'difficulty_level' => $request->difficulty_level,
            ]);

            // İlişkili dil paketlerini güncelle
            $word->languagePacks()->sync($request->language_pack_ids);

            // Örnek cümleleri güncelle
            $word->exampleSentences()->delete();
            if ($request->has('example_sentences') && is_array($request->example_sentences)) {
                foreach ($request->example_sentences as $index => $sentence) {
                    if (!empty($sentence)) {
                        $word->exampleSentences()->create([
                            'sentence' => $sentence,
                            'translation' => $request->example_translations[$index] ?? null,
                            'language' => $word->language,
                        ]);
                    }
                }
            }

            // Eş anlamlıları güncelle
            $word->synonyms()->delete();
            if ($request->has('synonyms') && is_array($request->synonyms)) {
                foreach ($request->synonyms as $synonym) {
                    if (!empty($synonym)) {
                        $word->synonyms()->create([
                            'synonym' => $synonym,
                            'language' => $word->language,
                        ]);
                    }
                }
            }

            // Save word meanings
            $word->meanings()->delete();
            foreach ($request->meanings as $index => $meaningData) {
                $word->meanings()->create([
                    'meaning' => $meaningData['meaning'],
                    'is_primary' => isset($meaningData['is_primary']) ? $meaningData['is_primary'] : false,
                    'display_order' => $index,
                ]);
            }

            return Redirect::route('rendition.words.index')
                ->with('success', 'Kelime başarıyla güncellendi.');
        } catch (\Exception $e) {
            Log::error('Error in WordController@update: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Redirect::back()
                ->withInput()
                ->with('error', 'Kelime güncellenirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $word = Word::findOrFail($id);
            $word->delete();

            return Redirect::route('rendition.words.index')
                ->with('success', 'Kelime başarıyla silindi.');
        } catch (\Exception $e) {
            Log::error('Error in WordController@destroy: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Redirect::route('rendition.words.index')
                ->with('error', 'Kelime silinirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    public function updateLearningStatus(Request $request, $id)
    {
        $request->validate([
            'learning_status' => 'required|integer|min:0|max:2'
        ]);

        $word = Word::findOrFail($id);
        $word->update([
            'learning_status' => $request->learning_status
        ]);

        return Response::json(['success' => true]);
    }

    public function updateReviewStatus(Request $request, $id)
    {
        $request->validate([
            'is_correct' => 'required|boolean'
        ]);

        $word = Word::findOrFail($id);

        if (!$request->is_correct) {
            $word->increment('incorrect_count');
        }


        $word->increment('review_count');
        $word->update(['last_review_date' => now()]);

        return Response::json(['success' => true]);
    }

    public function updateWords(Request $request)
    {

        if (!Auth::check()) {
            return Redirect::back()->with('error', 'You must be logged in to update words.');
        }

        $words = $request->input('words');

        DB::beginTransaction();
        try {
            foreach ($words as $wordData) {
                Word::where('id', $wordData['word_id'])->update([
                    'review_count' => DB::raw("review_count + " . ($wordData['review_count'] ?? 0)),
                    'incorrect_count' => DB::raw("incorrect_count + " . ($wordData['incorrect_count'] ?? 0)),
                    'last_review_date' => Carbon::now(), // Güncel tarih eklendi
                ]);
            }
            DB::commit();

            return Redirect::back()->with('message', 'Words updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->with('error', 'Database update failed');
        }
    }

    /**
     * Kelime arama fonksiyonu - Google benzeri arama
     */
    public function searchWord(Request $request)
    {
        try {
            $searchTerm = $request->input('search');

            if (empty($searchTerm)) {
                return Response::json([
                    'success' => false,
                    'message' => 'Arama terimi gerekli'
                ]);
            }

            // Kelimeyi bul
            $word = Word::with([
                'meanings',
                'exampleSentences',
                'synonyms',
                'languagePacks'
            ])
                ->where('word', 'like', "%{$searchTerm}%")
                ->orWhereHas('meanings', function ($query) use ($searchTerm) {
                    $query->where('meaning', 'like', "%{$searchTerm}%");
                })
                ->first();

            if (!$word) {
                return Response::json([
                    'success' => false,
                    'message' => 'Kelime bulunamadı'
                ]);
            }

            // Add meaning property for backward compatibility
            if (!property_exists($word, 'meaning') || !$word->meaning) {
                $primaryMeaning = $word->meanings->first(function ($meaning) {
                    return $meaning->is_primary;
                });

                if ($primaryMeaning) {
                    $word->meaning = $primaryMeaning->meaning;
                } else if ($word->meanings->count() > 0) {
                    $word->meaning = $word->meanings->first()->meaning;
                } else {
                    $word->meaning = '';
                }
            }

            // Dil paketlerini getir
            $languagePacks = $word->languagePacks->map(function ($pack) {
                return [
                    'id' => $pack->id,
                    'name' => $pack->name,
                    'slug' => $pack->slug,
                    'language' => $pack->language
                ];
            });

            // Örnek cümleleri getir
            $exampleSentences = $word->exampleSentences->map(function ($sentence) {
                return [
                    'sentence' => $sentence->sentence,
                    'translation' => $sentence->translation,
                    'language' => $sentence->language
                ];
            });

            // Eş anlamlıları getir
            $synonyms = $word->synonyms->map(function ($synonym) {
                return [
                    'synonym' => $synonym->synonym,
                    'language' => $synonym->language
                ];
            });

            // Anlamları getir
            $meanings = $word->meanings->map(function ($meaning) {
                return [
                    'meaning' => $meaning->meaning,
                    'is_primary' => $meaning->is_primary,
                    'display_order' => $meaning->display_order
                ];
            });

            return Response::json([
                'success' => true,
                'word' => [
                    'id' => $word->id,
                    'word' => $word->word,
                    'meaning' => $word->meaning,
                    'type' => $word->type,
                    'language' => $word->language,
                    'difficulty_level' => $word->difficulty_level,
                    'learning_status' => $word->learning_status,
                    'review_count' => $word->review_count,
                    'incorrect_count' => $word->incorrect_count,
                    'last_review_date' => $word->last_review_date,
                    'flag' => $word->flag,
                    'language_packs' => $languagePacks,
                    'example_sentences' => $exampleSentences,
                    'synonyms' => $synonyms,
                    'meanings' => $meanings
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error in WordController@searchWord: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Response::json([
                'success' => false,
                'message' => 'Arama sırasında bir hata oluştu: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Belirli bir dil paketine eklenebilecek kelimeleri getirir
     * (Pakette henüz olmayan kelimeler)
     */
    public function availableForPack($packId)
    {
        // Dil paketini bul
        $languagePack = LanguagePack::findOrFail($packId);

        // Pakette olmayan kelimeleri getir
        $words = Word::whereDoesntHave('languagePacks', function ($query) use ($packId) {
            $query->where('language_packs.id', $packId);
        })
            ->where('language', $languagePack->language) // Aynı dildeki kelimeleri getir
            ->select('id', 'word', 'meaning', 'type', 'language', 'difficulty_level')
            ->orderBy('word')
            ->get();

        return Response::json($words);
    }
}
