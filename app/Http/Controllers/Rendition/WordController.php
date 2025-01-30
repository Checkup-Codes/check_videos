<?php

namespace App\Http\Controllers\Rendition;

use App\Http\Controllers\Controller;
use App\Models\Rendition\Word;
use App\Models\Rendition\LanguagePack;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WordController extends Controller
{
    public function index()
    {
        $words = Word::with(['exampleSentences', 'synonyms', 'languagePacks'])->get();

        return inertia('Rendition/Words/IndexWord', [
            'words' => $words,
            'screen' => [
                'isMobileSidebar' => true,
                'name' => 'words'
            ]
        ]);
    }

    public function create()
    {
        $languagePacks = LanguagePack::all();
        return view('pages.rendition.words.create', compact('languagePacks'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string',
            'type' => 'required|string',
            'language' => 'required|string|size:2',
            'difficulty_level' => 'required|integer|min:1|max:4',
            'language_pack_ids' => 'required|array',
            'example_sentences' => 'array',
            'example_translations' => 'array',
            'synonyms' => 'array',
        ]);

        $word = Word::create([
            'word' => $request->word,
            'meaning' => $request->meaning,
            'type' => $request->type,
            'language' => $request->language,
            'learning_status' => 0,
            'flag' => false,
            'difficulty_level' => $request->difficulty_level,
            'correct_count' => 0,
            'incorrect_count' => 0,
            'review_count' => 0,
        ]);

        // İlişkili dil paketlerini ekle
        $word->languagePacks()->attach($request->language_pack_ids);

        // Örnek cümleleri ekle
        if ($request->has('example_sentences')) {
            foreach ($request->example_sentences as $index => $sentence) {
                $word->exampleSentences()->create([
                    'sentence' => $sentence,
                    'translation' => $request->example_translations[$index] ?? null,
                    'language' => $word->language,
                ]);
            }
        }

        // Eş anlamlıları ekle
        if ($request->has('synonyms')) {
            foreach ($request->synonyms as $synonym) {
                $word->synonyms()->create([
                    'synonym' => $synonym,
                    'language' => $word->language,
                ]);
            }
        }

        return redirect()->route('rendition.words.index')
            ->with('success', 'Kelime başarıyla eklendi.');
    }

    public function edit($id)
    {
        $word = Word::with(['exampleSentences', 'synonyms', 'languagePacks'])->findOrFail($id);
        $languagePacks = LanguagePack::all();
        return view('pages.rendition.words.edit', compact('word', 'languagePacks'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string',
            'type' => 'required|string',
            'language' => 'required|string|size:2',
            'difficulty_level' => 'required|integer|min:1|max:4',
            'language_pack_ids' => 'required|array',
            'example_sentences' => 'array',
            'example_translations' => 'array',
            'synonyms' => 'array',
        ]);

        $word = Word::findOrFail($id);
        $word->update([
            'word' => $request->word,
            'meaning' => $request->meaning,
            'type' => $request->type,
            'language' => $request->language,
            'difficulty_level' => $request->difficulty_level,
        ]);

        // İlişkili dil paketlerini güncelle
        $word->languagePacks()->sync($request->language_pack_ids);

        // Örnek cümleleri güncelle
        $word->exampleSentences()->delete();
        if ($request->has('example_sentences')) {
            foreach ($request->example_sentences as $index => $sentence) {
                $word->exampleSentences()->create([
                    'sentence' => $sentence,
                    'translation' => $request->example_translations[$index] ?? null,
                    'language' => $word->language,
                ]);
            }
        }

        // Eş anlamlıları güncelle
        $word->synonyms()->delete();
        if ($request->has('synonyms')) {
            foreach ($request->synonyms as $synonym) {
                $word->synonyms()->create([
                    'synonym' => $synonym,
                    'language' => $word->language,
                ]);
            }
        }

        return redirect()->route('rendition.words.index')
            ->with('success', 'Kelime başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $word = Word::findOrFail($id);
        $word->delete();

        return redirect()->route('rendition.words.index')
            ->with('success', 'Kelime başarıyla silindi.');
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

        return response()->json(['success' => true]);
    }

    public function updateReviewStatus(Request $request, $id)
    {
        $request->validate([
            'is_correct' => 'required|boolean'
        ]);

        $word = Word::findOrFail($id);

        if ($request->is_correct) {
            $word->increment('correct_count');
        } else {
            $word->increment('incorrect_count');
        }

        $word->increment('review_count');
        $word->update(['last_review_date' => now()]);

        return response()->json(['success' => true]);
    }
}
