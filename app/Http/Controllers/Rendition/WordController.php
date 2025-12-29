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

            // Start building the query - sadece tamamlanmış kelimeler
            $query = Word::complete();

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
                'screen' => $this->getScreenData('Kelimeler', true)
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

            // Slug'a göre istenen paket ve kelimeleri getir (sadece tamamlanmış kelimeler)
            $languagePack = LanguagePack::with([
                'words' => function ($query) {
                    $query->complete()
                        ->with(['exampleSentences', 'synonyms', 'meanings'])
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
                'screen' => $this->getScreenData($languagePack->name)
            ]);
        } catch (\Exception $e) {
            Log::error('Error in WordController@show: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Inertia::render('Rendition/Words/ShowWord', [
                'words' => [],
                'languagePacks' => [],
                'pack' => null,
                'screen' => $this->getScreenData('Kelimeler'),
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

        // Yarım kalan kelimeleri getir
        $incompleteWords = Word::incomplete()
            ->with(['meanings'])
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get()
            ->map(function ($word) {
                return [
                    'id' => $word->id,
                    'word' => $word->word,
                    'language' => $word->language,
                    'type' => $word->type,
                    'created_at' => $word->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('Rendition/Words/CreateWord', [
            'languagePacks' => $languagePacks,
            'incompleteWords' => $incompleteWords,
            'screen' => $this->getScreenData('Yeni Kelime')
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Word form data:', $request->all());

        try {
            // Basitleştirilmiş validation - sadece kelime ve dil zorunlu
            $rules = [
                'word' => [
                    'required',
                    'string',
                    'max:255',
                ],
                'language' => 'required|string|size:2',
                'type' => 'nullable|string',
                'difficulty_level' => 'nullable|integer|min:1|max:4',
                'language_pack_ids' => 'nullable|array',
                'language_pack_ids.*' => 'exists:lang_language_packs,id',
                'learning_status' => 'nullable|integer|min:0|max:2',
                'flag' => 'nullable|boolean',
                'meanings' => 'nullable|array',
                'meanings.*.meaning' => 'nullable|string',
                'meanings.*.is_primary' => 'nullable|boolean',
                'example_sentences' => 'nullable|array',
                'example_translations' => 'nullable|array',
                'synonyms' => 'nullable|array',
            ];

            // Eğer aynı kelime + dil + tür varsa hata ver (sadece tür doluysa kontrol et)
            if ($request->type) {
                $rules['word'][] = function ($attribute, $value, $fail) use ($request) {
                    $exists = Word::where('word', $value)
                        ->where('language', $request->language)
                        ->where('type', $request->type)
                        ->exists();
                    if ($exists) {
                        $fail('Bu kelime (' . $value . ') ve tür (' . $request->type . ') kombinasyonu zaten mevcut.');
                    }
                };
            } else {
                // Tür yoksa sadece kelime + dil kontrolü
                $rules['word'][] = function ($attribute, $value, $fail) use ($request) {
                    $exists = Word::where('word', $value)
                        ->where('language', $request->language)
                        ->whereNull('type')
                        ->exists();
                    if ($exists) {
                        $fail('Bu kelime (' . $value . ') zaten mevcut.');
                    }
                };
            }

            $request->validate($rules);

            DB::beginTransaction();

            // is_complete: anlam varsa true, yoksa false
            $hasMeaning = false;
            if ($request->has('meanings') && is_array($request->meanings)) {
                foreach ($request->meanings as $meaningData) {
                    if (!empty($meaningData['meaning'])) {
                        $hasMeaning = true;
                        break;
                    }
                }
            }

            $word = Word::create([
                'word' => $request->word,
                'type' => $request->type ?: null,
                'language' => $request->language,
                'is_complete' => $hasMeaning,
                'learning_status' => $request->learning_status ?? 0,
                'flag' => $request->flag ?? false,
                'difficulty_level' => $request->difficulty_level ?? 2,
                'incorrect_count' => 0,
                'review_count' => 0,
            ]);

            // Save word meanings (sadece dolu olanları kaydet)
            if ($request->has('meanings') && is_array($request->meanings)) {
                $hasPrimary = false;
                $meaningIndex = 0;
                foreach ($request->meanings as $meaningData) {
                    if (!empty($meaningData['meaning'])) {
                        $isPrimary = isset($meaningData['is_primary']) ? $meaningData['is_primary'] : false;

                        if ($isPrimary || (!$hasPrimary && $meaningIndex === 0)) {
                            $isPrimary = true;
                            $hasPrimary = true;
                        }

                        $word->meanings()->create([
                            'meaning' => $meaningData['meaning'],
                            'is_primary' => $isPrimary,
                            'display_order' => $meaningIndex,
                        ]);
                        $meaningIndex++;
                    }
                }
            }

            // İlişkili dil paketlerini ekle (sadece seçilmişse)
            if ($request->has('language_pack_ids') && is_array($request->language_pack_ids) && count($request->language_pack_ids) > 0) {
                $word->languagePacks()->attach($request->language_pack_ids);
            }

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

            $message = $hasMeaning 
                ? 'Kelime başarıyla eklendi.' 
                : 'Kelime kaydedildi. Daha sonra tamamlayabilirsiniz.';

            return Redirect::route('rendition.words.index')
                ->with('success', $message);
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
            'screen' => $this->getScreenData($word->word . ' - Düzenle', true)
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            // Basitleştirilmiş validation
            $request->validate([
                'word' => 'required|string|max:255',
                'language' => 'required|string|size:2',
                'type' => 'nullable|string',
                'difficulty_level' => 'nullable|integer|min:1|max:4',
                'language_pack_ids' => 'nullable|array',
                'language_pack_ids.*' => 'exists:lang_language_packs,id',
                'learning_status' => 'nullable|integer|min:0|max:2',
                'flag' => 'nullable|boolean',
                'meanings' => 'nullable|array',
                'meanings.*.meaning' => 'nullable|string',
                'meanings.*.is_primary' => 'nullable|boolean',
                'example_sentences' => 'nullable|array',
                'example_translations' => 'nullable|array',
                'synonyms' => 'nullable|array',
            ]);

            $word = Word::findOrFail($id);

            // is_complete: anlam varsa true, yoksa false
            $hasMeaning = false;
            if ($request->has('meanings') && is_array($request->meanings)) {
                foreach ($request->meanings as $meaningData) {
                    if (!empty($meaningData['meaning'])) {
                        $hasMeaning = true;
                        break;
                    }
                }
            }

            $word->update([
                'word' => $request->word,
                'type' => $request->type ?: null,
                'language' => $request->language,
                'is_complete' => $hasMeaning,
                'learning_status' => $request->learning_status ?? 0,
                'flag' => $request->flag ?? false,
                'difficulty_level' => $request->difficulty_level ?? 2,
            ]);

            // İlişkili dil paketlerini güncelle
            if ($request->has('language_pack_ids') && is_array($request->language_pack_ids)) {
                $word->languagePacks()->sync($request->language_pack_ids);
            } else {
                $word->languagePacks()->detach();
            }

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

            // Anlamları güncelle
            $word->meanings()->delete();
            if ($request->has('meanings') && is_array($request->meanings)) {
                $hasPrimary = false;
                $meaningIndex = 0;
                foreach ($request->meanings as $meaningData) {
                    if (!empty($meaningData['meaning'])) {
                        $isPrimary = isset($meaningData['is_primary']) ? $meaningData['is_primary'] : false;
                        if ($isPrimary || (!$hasPrimary && $meaningIndex === 0)) {
                            $isPrimary = true;
                            $hasPrimary = true;
                        }
                        $word->meanings()->create([
                            'meaning' => $meaningData['meaning'],
                            'is_primary' => $isPrimary,
                            'display_order' => $meaningIndex,
                        ]);
                        $meaningIndex++;
                    }
                }
            }

            $message = $hasMeaning 
                ? 'Kelime başarıyla güncellendi.' 
                : 'Kelime kaydedildi. Anlam ekleyerek tamamlayabilirsiniz.';

            return Redirect::route('rendition.words.index')
                ->with('success', $message);
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

            // Kelimeyi bul - sadece tamamlanmış kelimeler, önce tam eşleşme, sonra kısmi eşleşme
            $word = Word::complete()
                ->with([
                    'meanings',
                    'exampleSentences',
                    'synonyms',
                    'languagePacks'
                ])
                ->where(function ($query) use ($searchTerm) {
                    // Önce tam eşleşme (büyük/küçük harf duyarsız)
                    $query->whereRaw('LOWER(word) = ?', [strtolower($searchTerm)])
                        // Sonra kısmi eşleşme (büyük/küçük harf duyarsız)
                        ->orWhereRaw('LOWER(word) LIKE ?', ['%' . strtolower($searchTerm) . '%'])
                        // Anlamlarda arama (büyük/küçük harf duyarsız)
                        ->orWhereHas('meanings', function ($q) use ($searchTerm) {
                            $q->whereRaw('LOWER(meaning) LIKE ?', ['%' . strtolower($searchTerm) . '%']);
                        });
                })
                ->orderByRaw('CASE WHEN LOWER(word) = ? THEN 1 ELSE 2 END', [strtolower($searchTerm)])
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

    /**
     * Get screen data for rendition words pages
     * Uses SeoService for centralized data management
     * 
     * @param string|null $pageTitle
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'words',
            $pageTitle,
            null,
            $isMobile
        );
    }
}
