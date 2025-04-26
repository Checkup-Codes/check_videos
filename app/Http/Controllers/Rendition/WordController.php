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
            // Use with eager loading but add error handling
            $words = Word::with(['exampleSentences', 'synonyms', 'languagePacks'])->get();

            // SQL sorgusunun Eloquent versiyonu - Alternative approach to avoid GROUP BY issues
            $languagePacks = LanguagePack::select([
                'language_packs.id',
                'language_packs.name',
                'language_packs.slug',
                'language_packs.language'
            ])
                ->selectRaw('(SELECT COUNT(*) FROM word_pack_relations WHERE word_pack_relations.pack_id = language_packs.id) as word_count')
                ->orderBy('language_packs.language')
                ->orderBy('language_packs.name')
                ->get();

            return Inertia::render('Rendition/Words/IndexWord', [
                'words' => $words,
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

            // Fall back to returning an empty dataset
            return Inertia::render('Rendition/Words/IndexWord', [
                'words' => [],
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
            $languagePacks = LanguagePack::select([
                'language_packs.id',
                'language_packs.name',
                'language_packs.slug',
                'language_packs.language'
            ])
                ->selectRaw('(SELECT COUNT(*) FROM word_pack_relations WHERE word_pack_relations.pack_id = language_packs.id) as word_count')
                ->orderBy('language_packs.language')
                ->orderBy('language_packs.name')
                ->get();

            // Slug'a göre istenen paket ve kelimeleri getir
            $languagePack = LanguagePack::with([
                'words' => function ($query) {
                    $query->with(['exampleSentences', 'synonyms'])
                        ->orderBy('word');
                }
            ])
                ->where('slug', $slug)
                ->firstOrFail();

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
        $languagePacks = LanguagePack::select([
            'language_packs.id',
            'language_packs.name',
            'language_packs.slug',
            'language_packs.language',
            DB::raw('COUNT(words.id) as word_count')
        ])
            ->leftJoin('word_pack_relations', 'language_packs.id', '=', 'word_pack_relations.pack_id')
            ->leftJoin('words', 'word_pack_relations.word_id', '=', 'words.id')
            ->groupBy('language_packs.id', 'language_packs.name', 'language_packs.slug', 'language_packs.language')
            ->orderBy('language_packs.language')
            ->orderBy('language_packs.name')
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
                'meaning' => 'required|string',
                'type' => 'required|string',
                'language' => 'required|string|size:2',
                'difficulty_level' => 'required|integer|min:1|max:4',
                'language_pack_ids' => 'required|array',
                'language_pack_ids.*' => 'exists:language_packs,id',
                'learning_status' => 'integer|min:0|max:2',
                'flag' => 'boolean',
                'example_sentences' => 'nullable|array',
                'example_translations' => 'nullable|array',
                'synonyms' => 'nullable|array',
            ]);

            $word = Word::create([
                'word' => $request->word,
                'meaning' => $request->meaning,
                'type' => $request->type,
                'language' => $request->language,
                'learning_status' => $request->learning_status ?? 0,
                'flag' => $request->flag ?? false,
                'difficulty_level' => $request->difficulty_level,
                'incorrect_count' => 0,
                'review_count' => 0,
            ]);

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

            return Redirect::route('rendition.words.index')
                ->with('success', 'Kelime başarıyla eklendi.');
        } catch (\Exception $e) {
            Log::error('Word creation error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return Redirect::back()
                ->withInput()
                ->with('error', 'Kelime eklenirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $word = Word::with(['exampleSentences', 'synonyms', 'languagePacks'])->findOrFail($id);

        $languagePacks = LanguagePack::select([
            'language_packs.id',
            'language_packs.name',
            'language_packs.slug',
            'language_packs.language',
            DB::raw('COUNT(words.id) as word_count')
        ])
            ->leftJoin('word_pack_relations', 'language_packs.id', '=', 'word_pack_relations.pack_id')
            ->leftJoin('words', 'word_pack_relations.word_id', '=', 'words.id')
            ->groupBy('language_packs.id', 'language_packs.name', 'language_packs.slug', 'language_packs.language')
            ->orderBy('language_packs.language')
            ->orderBy('language_packs.name')
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
                'meaning' => 'required|string',
                'type' => 'required|string',
                'language' => 'required|string|size:2',
                'difficulty_level' => 'required|integer|min:1|max:4',
                'language_pack_ids' => 'required|array',
                'language_pack_ids.*' => 'exists:language_packs,id',
                'learning_status' => 'integer|min:0|max:2',
                'flag' => 'boolean',
                'example_sentences' => 'nullable|array',
                'example_translations' => 'nullable|array',
                'synonyms' => 'nullable|array',
            ]);

            $word = Word::findOrFail($id);
            $word->update([
                'word' => $request->word,
                'meaning' => $request->meaning,
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
