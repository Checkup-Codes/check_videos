<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\HasScreenData;
use App\Models\Journey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JourneyController extends Controller
{
    use HasScreenData;

    /**
     * Display the timeline view.
     */
    public function index()
    {
        $user = Auth::user();
        $isAdmin = $user !== null;

        // Get entries - if admin, show all, otherwise only published
        // Sort by entry_date descending (newest first) - timeline goes from top (newest) to bottom (oldest)
        $entries = $isAdmin 
            ? Journey::orderBy('entry_date', 'desc')->get() 
            : Journey::published()->orderBy('entry_date', 'desc')->get();

        // Group by year (entries are already sorted by entry_date desc)
        // After groupBy, ensure each group's entries remain sorted by entry_date desc
        $entriesByYear = $entries->groupBy(function ($item) {
            return $item->entry_date->format('Y');
        })->map(function ($group) {
            // Sort each group by entry_date descending (newest first, oldest at bottom)
            return $group->sortByDesc('entry_date')->values();
        });

        return Inertia::render('Journey/IndexJourney', [
            'entries' => $entries,
            'entriesByYear' => $entriesByYear,
            'screen' => $this->getScreenData('journey', 'Yolculuk', null, true),
        ]);
    }

    /**
     * Show the form for creating a new entry.
     */
    public function create()
    {
        return Inertia::render('Journey/CreateJourney', [
            'screen' => $this->getScreenData('journey', 'Yeni Kayıt Oluştur'),
        ]);
    }

    /**
     * Store a newly created entry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'entry_date' => 'required|date',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'status' => 'required|in:draft,published',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('journey', 'public');
            $validated['image'] = $path;
        }

        $validated['user_id'] = Auth::id();

        $journey = Journey::create($validated);

        return redirect()
            ->route('journey.index')
            ->with('flash', ['message' => 'Kayıt başarıyla oluşturuldu.']);
    }

    /**
     * Display the specified entry.
     */
    public function show($id)
    {
        $entry = Journey::findOrFail($id);
        
        $user = Auth::user();
        $isAdmin = $user !== null;

        // Get all entries
        // Sort by entry_date descending (newest first) - timeline goes from top (newest) to bottom (oldest)
        $entries = $isAdmin 
            ? Journey::orderBy('entry_date', 'desc')->get() 
            : Journey::published()->orderBy('entry_date', 'desc')->get();

        // Group by year and ensure each group's entries remain sorted by entry_date desc
        $entriesByYear = $entries->groupBy(function ($item) {
            return $item->entry_date->format('Y');
        })->map(function ($group) {
            // Sort each group by entry_date descending (newest first, oldest at bottom)
            return $group->sortByDesc('entry_date')->values();
        });

        return Inertia::render('Journey/ShowJourney', [
            'entry' => $entry,
            'entries' => $entries,
            'entriesByYear' => $entriesByYear,
            'screen' => $this->getScreenData('journey', $entry->title),
        ]);
    }

    /**
     * Show the form for editing the specified entry.
     */
    public function edit($id)
    {
        $entry = Journey::findOrFail($id);

        // Sort by entry_date descending (newest first) - timeline goes from top (newest) to bottom (oldest)
        $entries = Journey::orderBy('entry_date', 'desc')->get();
        // Group by year and ensure each group's entries remain sorted by entry_date desc
        $entriesByYear = $entries->groupBy(function ($item) {
            return $item->entry_date->format('Y');
        })->map(function ($group) {
            // Sort each group by entry_date descending (newest first, oldest at bottom)
            return $group->sortByDesc('entry_date')->values();
        });

        return Inertia::render('Journey/EditJourney', [
            'entry' => $entry,
            'entries' => $entries,
            'entriesByYear' => $entriesByYear,
            'screen' => $this->getScreenData('journey', $entry->title . ' - Düzenle'),
        ]);
    }

    /**
     * Update the specified entry.
     */
    public function update(Request $request, $id)
    {
        $entry = Journey::findOrFail($id);

        $validated = $request->validate([
            'entry_date' => 'required|date',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'status' => 'required|in:draft,published',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($entry->image) {
                Storage::disk('public')->delete($entry->image);
            }
            $path = $request->file('image')->store('journey', 'public');
            $validated['image'] = $path;
        }

        $entry->update($validated);

        return redirect()
            ->route('journey.index')
            ->with('flash', ['message' => 'Kayıt başarıyla güncellendi.']);
    }

    /**
     * Remove the specified entry.
     */
    public function destroy($id)
    {
        $entry = Journey::findOrFail($id);

        // Delete image if exists
        if ($entry->image) {
            Storage::disk('public')->delete($entry->image);
        }

        $entry->delete();

        return redirect()
            ->route('journey.index')
            ->with('flash', ['message' => 'Kayıt başarıyla silindi.']);
    }
}

