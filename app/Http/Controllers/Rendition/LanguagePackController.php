<?php

namespace App\Http\Controllers\Rendition;

use App\Http\Controllers\Controller;
use App\Models\Rendition\LanguagePack;
use Illuminate\Http\Request;

class LanguagePackController extends Controller
{
    public function index()
    {
        $languagePacks = LanguagePack::withCount('words')->get();
        return view('pages.rendition.language-packs.index', compact('languagePacks'));
    }

    public function create()
    {
        return view('pages.rendition.language-packs.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'language' => 'required|string|size:2',
        ]);

        LanguagePack::create($request->all());

        return redirect()->route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla oluşturuldu.');
    }

    public function edit($id)
    {
        $languagePack = LanguagePack::findOrFail($id);
        return view('pages.rendition.language-packs.edit', compact('languagePack'));
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

        return redirect()->route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->delete();

        return redirect()->route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla silindi.');
    }

    public function words($id)
    {
        $languagePack = LanguagePack::with('words')->findOrFail($id);
        return view('pages.rendition.language-packs.words', compact('languagePack'));
    }

    public function addWords(Request $request, $id)
    {
        $request->validate([
            'word_ids' => 'required|array',
            'word_ids.*' => 'exists:words,id'
        ]);

        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->words()->attach($request->word_ids);

        return redirect()->route('rendition.language-packs.words', $id)
            ->with('success', 'Kelimeler pakete başarıyla eklendi.');
    }

    public function removeWord(Request $request, $id, $wordId)
    {
        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->words()->detach($wordId);

        return response()->json(['success' => true]);
    }
}
