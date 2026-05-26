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

            // İstatistikler - Son 365 gün
            $stats = $this->getActivityStats();

            return Inertia::render('Rendition/Words/IndexWord', [
                'words' => $words->items(),
                'pagination' => $paginationData,
                'filters' => [
                    'search' => $search,
                    'language' => $language,
                    'status' => $status,
                ],
                'languagePacks' => $languagePacks,
                'stats' => $stats,
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
                'stats' => [
                    'wordsAdded' => [],
                    'wordsReviewed' => [],
                    'summary' => [
                        'totalWordsAdded' => 0,
                        'avgWordsAddedPerDay' => 0,
                        'totalWordsReviewed' => 0,
                        'avgWordsReviewedPerDay' => 0,
                    ]
                ],
                'screen' => [
                    'isMobileSidebar' => true,
                    'name' => 'words'
                ],
                'error' => 'Verileri yüklerken bir hata oluştu.'
            ]);
        }
    }

    /**
     * Yılın tamamının aktivite istatistiklerini getir
     * Gelecek günler de dahil (kilitli olarak gösterilmek üzere)
     */
    private function getActivityStats()
    {
        // Mevcut yılın başlangıcı (1 Ocak)
        $startDate = now()->startOfYear();
        // Mevcut yılın sonu (31 Aralık)
        $endDate = now()->endOfYear();
        // Bugün (gün sonu dahil)
        $today = now()->endOfDay();

        // Günlük eklenen kelime sayıları
        $wordsAdded = DB::table('lang_words')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->whereBetween('created_at', [$startDate, $today])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date')
            ->map(fn($item) => (int) $item->count)
            ->toArray();

        // Günlük review edilen kelime sayıları (last_review_date kullanarak)
        $wordsReviewed = DB::table('lang_words')
            ->select(DB::raw('DATE(last_review_date) as date'), DB::raw('COUNT(*) as count'))
            ->whereNotNull('last_review_date')
            ->whereBetween('last_review_date', [$startDate, $today])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date')
            ->map(fn($item) => (int) $item->count)
            ->toArray();

        // Tüm günleri doldur (Ocak'tan Aralık'a kadar - gelecek günler dahil)
        $allDates = [];
        $currentDate = $startDate->copy();
        $todayDate = now()->format('Y-m-d');
        
        while ($currentDate <= $endDate) {
            $dateStr = $currentDate->format('Y-m-d');
            $isFuture = $dateStr > $todayDate; // Bugünden sonrası gelecek
            
            $allDates[$dateStr] = [
                'date' => $dateStr,
                'added' => $isFuture ? null : ($wordsAdded[$dateStr] ?? 0),
                'reviewed' => $isFuture ? null : ($wordsReviewed[$dateStr] ?? 0),
                'is_future' => $isFuture,
            ];
            $currentDate->addDay();
        }

        // Özet istatistikler (sadece geçmiş günler)
        $pastDates = array_filter($allDates, fn($day) => !$day['is_future']);
        $totalWordsAdded = array_sum(array_column($pastDates, 'added'));
        $totalWordsReviewed = array_sum(array_column($pastDates, 'reviewed'));
        $daysWithActivity = count(array_filter($pastDates, fn($day) => $day['added'] > 0));
        $daysWithReview = count(array_filter($pastDates, fn($day) => $day['reviewed'] > 0));

        return [
            'data' => array_values($allDates),
            'summary' => [
                'totalWordsAdded' => $totalWordsAdded,
                'avgWordsAddedPerDay' => $daysWithActivity > 0 ? round($totalWordsAdded / $daysWithActivity, 1) : 0,
                'totalWordsReviewed' => $totalWordsReviewed,
                'avgWordsReviewedPerDay' => $daysWithReview > 0 ? round($totalWordsReviewed / $daysWithReview, 1) : 0,
                'currentStreak' => $this->calculateStreak($allDates, 'added'),
                'longestStreak' => $this->calculateLongestStreak($allDates, 'added'),
            ]
        ];
    }

    /**
     * Mevcut streak'i hesapla (bugünden geriye doğru)
     * Gelecek günleri hariç tutar
     */
    private function calculateStreak($allDates, $type = 'added')
    {
        $streak = 0;
        $dates = array_reverse($allDates);
        
        foreach ($dates as $day) {
            // Gelecek günleri atla
            if (isset($day['is_future']) && $day['is_future']) {
                continue;
            }
            
            if ($day[$type] > 0) {
                $streak++;
            } else {
                break;
            }
        }
        
        return $streak;
    }

    /**
     * En uzun streak'i hesapla
     * Gelecek günleri hariç tutar
     */
    private function calculateLongestStreak($allDates, $type = 'added')
    {
        $maxStreak = 0;
        $currentStreak = 0;
        
        foreach ($allDates as $day) {
            // Gelecek günleri atla
            if (isset($day['is_future']) && $day['is_future']) {
                continue;
            }
            
            if ($day[$type] > 0) {
                $currentStreak++;
                $maxStreak = max($maxStreak, $currentStreak);
            } else {
                $currentStreak = 0;
            }
        }
        
        return $maxStreak;
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

            // Slug'a göre istenen paket ve kelimeleri getir (tüm kelimeler - complete ve incomplete)
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

        // Debug: Gerçek yarım kalan kelime sayısını logla
        $totalIncomplete = Word::incomplete()->count();
        Log::info('Incomplete words count:', [
            'total' => $totalIncomplete,
            'shown' => $incompleteWords->count(),
            'words' => $incompleteWords->pluck('word')->toArray()
        ]);

        return Inertia::render('Rendition/Words/CreateWord', [
            'languagePacks' => $languagePacks,
            'incompleteWords' => $incompleteWords,
            'incompleteWordsCount' => $totalIncomplete, // Toplam sayı
            'screen' => $this->getScreenData('Yeni Kelime')
        ]);
    }

    /**
     * Toplu kelime ekleme (Bulk import)
     * JSON formatında birden fazla kelime ekler
     */
    public function bulkStore(Request $request)
    {
        $this->normalizeBulkWordInput($request);

        $validated = $request->validate(
            [
                'words' => 'required|array|min:1',
                'words.*.word' => 'required|string|max:255',
                'words.*.definition' => 'nullable|string',
                'words.*.meaning' => 'nullable|string',
                'words.*.meanings' => 'nullable|array',
                'words.*.meanings.*.meaning' => 'nullable|string',
                'words.*.meanings.*.is_primary' => 'nullable|boolean',
                'words.*.type' => 'nullable|string|max:50',
                'words.*.language' => 'required|string|size:2',
                'words.*.difficulty_level' => 'nullable|integer|min:1|max:4',
                'words.*.learning_status' => 'nullable|integer|min:0|max:2',
                'words.*.flag' => 'nullable|boolean',
                'words.*.example_sentences' => 'nullable|array',
                'words.*.example_translations' => 'nullable|array',
                'words.*.synonyms' => 'nullable|array',
                'language_pack_ids' => 'nullable|array',
                'language_pack_ids.*' => 'exists:lang_language_packs,id',
            ],
            $this->bulkWordValidationMessages()
        );

        try {
            DB::beginTransaction();

            $results = [
                'success' => [],
                'updated' => [],
                'linked' => [],
                'incomplete' => [],
                'duplicates' => [],
                'errors' => [],
            ];

            $languagePackIds = $validated['language_pack_ids'] ?? [];

            foreach ($validated['words'] as $index => $wordData) {
                try {
                    // Duplicate kontrolü
                    $existingWord = Word::where('word', $wordData['word'])
                        ->where('language', $wordData['language'])
                        ->where(function ($query) use ($wordData) {
                            if (isset($wordData['type']) && $wordData['type']) {
                                $query->where('type', $wordData['type']);
                            } else {
                                $query->whereNull('type');
                            }
                        })
                        ->with('languagePacks')
                        ->first();

                    if ($existingWord) {
                        if (!$existingWord->is_complete && $this->wordDataHasMeaning($wordData)) {
                            $this->applyBulkWordRelations(
                                $existingWord,
                                $wordData,
                                $languagePackIds
                            );

                            $results['updated'][] = [
                                'index' => $index,
                                'word' => $wordData['word'],
                                'id' => $existingWord->id,
                            ];
                            continue;
                        }

                        if (!empty($languagePackIds)) {
                            $existingWord->languagePacks()->syncWithoutDetaching($languagePackIds);

                            $results['linked'][] = [
                                'index' => $index,
                                'word' => $wordData['word'],
                                'id' => $existingWord->id,
                            ];
                            continue;
                        }

                        $currentPacks = $existingWord->languagePacks->pluck('name')->toArray();

                        $results['duplicates'][] = [
                            'index' => $index,
                            'word' => $wordData['word'],
                            'id' => $existingWord->id,
                            'current_packs' => $currentPacks,
                            'can_add_to_packs' => false,
                        ];
                        continue;
                    }

                    $hasMeaning = $this->wordDataHasMeaning($wordData);

                    $word = Word::create([
                        'word' => $wordData['word'],
                        'definition' => $wordData['definition'] ?? null,
                        'type' => $wordData['type'] ?? null,
                        'language' => $wordData['language'],
                        'is_complete' => $hasMeaning,
                        'learning_status' => $wordData['learning_status'] ?? 0,
                        'flag' => $wordData['flag'] ?? false,
                        'difficulty_level' => $wordData['difficulty_level'] ?? 2,
                        'incorrect_count' => 0,
                        'review_count' => 0,
                    ]);

                    $this->applyBulkWordRelations(
                        $word,
                        $wordData,
                        $languagePackIds
                    );

                    $entry = [
                        'index' => $index,
                        'word' => $wordData['word'],
                        'id' => $word->id,
                    ];

                    if ($word->is_complete) {
                        $results['success'][] = $entry;
                    } else {
                        $results['incomplete'][] = $entry;
                    }
                } catch (\Exception $e) {
                    Log::warning('Bulk word row failed', [
                        'index' => $index,
                        'word' => $wordData['word'] ?? null,
                        'error' => $e->getMessage(),
                    ]);

                    $results['errors'][] = [
                        'index' => $index,
                        'word' => $wordData['word'] ?? 'Unknown',
                        'error' => $e->getMessage(),
                    ];
                }
            }

            DB::commit();

            $addedCount = count($results['success']);
            $updatedCount = count($results['updated']);
            $linkedCount = count($results['linked']);
            $incompleteCount = count($results['incomplete']);
            $duplicateCount = count($results['duplicates']);
            $errorCount = count($results['errors']);
            $processedCount = $addedCount + $updatedCount + $linkedCount;

            $message = $this->buildBulkImportMessage(
                $addedCount,
                $updatedCount,
                $linkedCount,
                $incompleteCount,
                $duplicateCount,
                $errorCount
            );

            if ($processedCount === 0) {
                return Redirect::back()
                    ->withInput()
                    ->with('error', $message)
                    ->with('bulkResults', $results);
            }

            return Redirect::route('rendition.words.index')
                ->with('success', $message)
                ->with('bulkResults', $results);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Bulk word creation error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Redirect::back()
                ->withInput()
                ->with('error', 'Toplu kelime eklenirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    /**
     * Duplicate kelimeleri seçilen paketlere ekle
     */
    public function bulkAddToPacks(Request $request)
    {
        try {
            $request->validate([
                'word_ids' => 'required|array',
                'word_ids.*' => 'exists:lang_words,id',
                'pack_ids' => 'required|array',
                'pack_ids.*' => 'exists:lang_language_packs,id',
            ]);

            DB::beginTransaction();

            $addedCount = 0;
            foreach ($request->word_ids as $wordId) {
                $word = Word::find($wordId);
                if ($word) {
                    // Mevcut paketleri al
                    $currentPackIds = $word->languagePacks()->pluck('lang_language_packs.id')->toArray();
                    
                    // Yeni paketleri ekle (duplicate olmadan)
                    $newPackIds = array_diff($request->pack_ids, $currentPackIds);
                    
                    if (count($newPackIds) > 0) {
                        $word->languagePacks()->attach($newPackIds);
                        $addedCount++;
                    }
                }
            }

            DB::commit();

            // Session'dan duplicate bilgisini temizle
            session()->forget('bulk_import_duplicates');

            return Redirect::route('rendition.words.index')
                ->with('success', "{$addedCount} kelime seçilen paketlere eklendi.");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Bulk add to packs error: ' . $e->getMessage());

            return Redirect::back()
                ->with('error', 'Kelimeler paketlere eklenirken bir hata oluştu: ' . $e->getMessage());
        }
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
                'definition' => $request->definition,
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
                'definition' => $request->definition,
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

            // Kelimeyi bul - önce tam eşleşme, sonra kısmi eşleşme
            $word = Word::query()
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
                    'is_complete' => $word->is_complete,
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
     * Kelime kontrolü - Aynı kelime + dil + tür kombinasyonu var mı?
     * Frontend'den AJAX ile çağrılır
     */
    public function checkDuplicate(Request $request)
    {
        try {
            $word = $request->input('word');
            $language = $request->input('language');
            $type = $request->input('type');
            $excludeId = $request->input('exclude_id'); // Edit sırasında mevcut kelimeyi hariç tut

            if (empty($word) || empty($language)) {
                return Response::json([
                    'exists' => false,
                    'message' => 'Kelime ve dil gerekli'
                ]);
            }

            // Aynı kelime + dil + tür kombinasyonunu ara
            $query = Word::where('word', $word)
                ->where('language', $language);

            // Tür kontrolü
            if ($type) {
                $query->where('type', $type);
            } else {
                $query->whereNull('type');
            }

            // Edit sırasında mevcut kelimeyi hariç tut
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }

            $existingWord = $query->with(['meanings'])->first();

            if ($existingWord) {
                // Kelime mevcut - detaylarını döndür
                return Response::json([
                    'exists' => true,
                    'word' => [
                        'id' => $existingWord->id,
                        'word' => $existingWord->word,
                        'type' => $existingWord->type,
                        'language' => $existingWord->language,
                        'is_complete' => $existingWord->is_complete,
                        'edit_url' => route('rendition.words.edit', $existingWord->id)
                    ],
                    'message' => $type 
                        ? "Bu kelime ({$word}) ve tür ({$type}) kombinasyonu zaten mevcut."
                        : "Bu kelime ({$word}) zaten mevcut."
                ]);
            }

            return Response::json([
                'exists' => false,
                'message' => 'Kelime mevcut değil'
            ]);
        } catch (\Exception $e) {
            Log::error('Error in WordController@checkDuplicate: ' . $e->getMessage());
            return Response::json([
                'exists' => false,
                'error' => 'Kontrol sırasında bir hata oluştu'
            ], 500);
        }
    }

    /**
     * Toplu kelime isteğindeki alanları normalize et.
     */
    private function normalizeBulkWordInput(Request $request): void
    {
        $words = collect($request->input('words', []))
            ->filter(fn ($word) => is_array($word))
            ->map(function (array $word) {
                if (isset($word['language']) && is_string($word['language'])) {
                    $word['language'] = strtolower(substr(trim($word['language']), 0, 2));
                }

                if (empty($word['meanings']) && !empty($word['meaning']) && is_string($word['meaning'])) {
                    $word['meanings'] = [
                        ['meaning' => trim($word['meaning']), 'is_primary' => true],
                    ];
                }

                if (isset($word['meanings']) && is_array($word['meanings'])) {
                    $word['meanings'] = collect($word['meanings'])
                        ->map(function ($meaning, $index) {
                            if (is_string($meaning)) {
                                return [
                                    'meaning' => trim($meaning),
                                    'is_primary' => $index === 0,
                                ];
                            }

                            if (is_array($meaning) && !empty($meaning['meaning'])) {
                                return $meaning;
                            }

                            return null;
                        })
                        ->filter()
                        ->values()
                        ->all();
                }

                if (array_key_exists('difficulty_level', $word)) {
                    if ($word['difficulty_level'] === '' || $word['difficulty_level'] === null) {
                        unset($word['difficulty_level']);
                    } else {
                        $word['difficulty_level'] = (int) $word['difficulty_level'];
                    }
                }

                if (array_key_exists('learning_status', $word)) {
                    if ($word['learning_status'] === '' || $word['learning_status'] === null) {
                        unset($word['learning_status']);
                    } else {
                        $word['learning_status'] = (int) $word['learning_status'];
                    }
                }

                return $word;
            })
            ->values()
            ->all();

        $request->merge(['words' => $words]);
    }

    /**
     * @return array<string, string>
     */
    private function bulkWordValidationMessages(): array
    {
        return [
            'words.required' => 'En az bir kelime gönderilmelidir.',
            'words.array' => 'Kelime listesi geçerli bir dizi olmalıdır.',
            'words.min' => 'En az bir kelime gönderilmelidir.',
            'words.*.word.required' => ':attribute kelimesi için "word" alanı zorunludur.',
            'words.*.word.max' => ':attribute kelimesi en fazla 255 karakter olabilir.',
            'words.*.language.required' => ':attribute kelimesi için "language" alanı zorunludur.',
            'words.*.language.size' => ':attribute kelimesinde dil kodu tam 2 harf olmalıdır (örn: en, tr).',
            'words.*.difficulty_level.integer' => ':attribute kelimesinde zorluk seviyesi sayı olmalıdır.',
            'words.*.difficulty_level.min' => ':attribute kelimesinde zorluk seviyesi 1 ile 4 arasında olmalıdır.',
            'words.*.difficulty_level.max' => ':attribute kelimesinde zorluk seviyesi 1 ile 4 arasında olmalıdır.',
            'words.*.learning_status.integer' => ':attribute kelimesinde öğrenme durumu sayı olmalıdır.',
            'words.*.learning_status.min' => ':attribute kelimesinde öğrenme durumu 0 ile 2 arasında olmalıdır.',
            'words.*.learning_status.max' => ':attribute kelimesinde öğrenme durumu 0 ile 2 arasında olmalıdır.',
            'language_pack_ids.*.exists' => 'Seçilen dil paketlerinden biri geçersiz.',
        ];
    }

    private function wordDataHasMeaning(array $wordData): bool
    {
        if (!isset($wordData['meanings']) || !is_array($wordData['meanings'])) {
            return false;
        }

        foreach ($wordData['meanings'] as $meaningData) {
            if (!empty($meaningData['meaning'])) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param  list<string>|null  $languagePackIds
     */
    private function applyBulkWordRelations(Word $word, array $wordData, ?array $languagePackIds = []): void
    {
        $hasMeaning = $this->wordDataHasMeaning($wordData);

        $word->update([
            'definition' => $wordData['definition'] ?? $word->definition,
            'type' => $wordData['type'] ?? $word->type,
            'learning_status' => $wordData['learning_status'] ?? $word->learning_status,
            'flag' => $wordData['flag'] ?? $word->flag,
            'difficulty_level' => $wordData['difficulty_level'] ?? $word->difficulty_level,
            'is_complete' => $hasMeaning ?: $word->is_complete,
        ]);

        if ($hasMeaning) {
            $word->meanings()->delete();

            $hasPrimary = false;
            $meaningIndex = 0;

            foreach ($wordData['meanings'] as $meaningData) {
                if (empty($meaningData['meaning'])) {
                    continue;
                }

                $isPrimary = !empty($meaningData['is_primary']);
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

        if (!empty($languagePackIds)) {
            $word->languagePacks()->syncWithoutDetaching($languagePackIds);
        }

        if (isset($wordData['example_sentences']) && is_array($wordData['example_sentences'])) {
            foreach ($wordData['example_sentences'] as $sentenceIndex => $sentence) {
                if (!empty($sentence)) {
                    $word->exampleSentences()->create([
                        'sentence' => $sentence,
                        'translation' => $wordData['example_translations'][$sentenceIndex] ?? null,
                        'language' => $word->language,
                    ]);
                }
            }
        }

        if (isset($wordData['synonyms']) && is_array($wordData['synonyms'])) {
            foreach ($wordData['synonyms'] as $synonym) {
                if (!empty($synonym)) {
                    $word->synonyms()->create([
                        'synonym' => $synonym,
                        'language' => $word->language,
                    ]);
                }
            }
        }
    }

    private function buildBulkImportMessage(
        int $addedCount,
        int $updatedCount,
        int $linkedCount,
        int $incompleteCount,
        int $duplicateCount,
        int $errorCount
    ): string {
        if ($addedCount === 0 && $updatedCount === 0 && $linkedCount === 0 && $duplicateCount === 0 && $errorCount === 0) {
            return 'Hiçbir kelime işlenemedi. JSON formatını kontrol edin.';
        }

        $parts = [];

        if ($addedCount > 0) {
            $parts[] = "{$addedCount} yeni kelime eklendi";
        }

        if ($updatedCount > 0) {
            $parts[] = "{$updatedCount} yarım kelime tamamlandı";
        }

        if ($linkedCount > 0) {
            $parts[] = "{$linkedCount} mevcut kelime pakete bağlandı";
        }

        if ($incompleteCount > 0) {
            $parts[] = "{$incompleteCount} kelime anlamsız eklendi (aramada görünmez, anlam girin)";
        }

        if ($duplicateCount > 0) {
            $parts[] = "{$duplicateCount} kelime zaten vardı — pakete eklemek için dil paketi seçin";
        }

        if ($errorCount > 0) {
            $parts[] = "{$errorCount} kelime eklenemedi";
        }

        return implode(', ', $parts) . '.';
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
