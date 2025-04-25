<?php

namespace App\Http\Controllers\Rendition;

use App\Http\Controllers\Controller;
use App\Models\Rendition\LanguagePack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class LanguagePackController extends Controller
{
    public function index(Request $request)
    {
        $languagePacks = LanguagePack::with('words')->get();

        // her paketin relation'dan toplam kelime sayısını al ve dd et
        foreach ($languagePacks as $languagePack) {
            $languagePack->word_count = $languagePack->words()->count();
        }
        return Inertia::render('Rendition/LanguagePacks/IndexLanguagePacks', [
            'languagePacks' => $languagePacks,
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ]
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
        return Inertia::render('Rendition/LanguagePacks/CreateLanguagePacks', [
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'language' => 'required|string|size:2',
        ]);

        LanguagePack::create($request->all());

        return Redirect::route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla oluşturuldu.');
    }

    public function edit($id)
    {
        $languagePack = LanguagePack::findOrFail($id);

        return Inertia::render('Rendition/LanguagePacks/EditLanguagePacks', [
            'languagePack' => $languagePack,
            'screen' => [
                'isMobileSidebar' => false,
                'name' => 'packs'
            ]
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
        $languagePack->delete();

        return Redirect::route('rendition.language-packs.index')
            ->with('success', 'Dil paketi başarıyla silindi.');
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
            'word_ids.*' => 'exists:words,id'
        ]);

        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->words()->attach($request->word_ids);

        return Redirect::route('rendition.language-packs.words', $id)
            ->with('success', 'Kelimeler pakete başarıyla eklendi.');
    }

    public function removeWord(Request $request, $id, $wordId)
    {
        $languagePack = LanguagePack::findOrFail($id);
        $languagePack->words()->detach($wordId);

        return Response::json(['success' => true]);
    }
}
