<?php

namespace App\Http\Controllers;

use App\Models\Journey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JourneyController extends Controller
{
    protected $screen = [
        'name' => 'journey',
        'isMobileSidebar' => false,
    ];

    /**
     * Display the timeline view.
     */
    public function index()
    {
        $user = Auth::user();
        $isAdmin = $user !== null;

        // Get entries - if admin, show all, otherwise only published
        // Sort by entry_date ascending (oldest first) - timeline goes from top (oldest) to bottom (newest)
        $entries = $isAdmin 
            ? Journey::orderBy('entry_date', 'asc')->get() 
            : Journey::published()->orderBy('entry_date', 'asc')->get();

        // Group by year for sidebar (entries are already sorted by entry_date asc)
        // After groupBy, ensure each group's entries remain sorted by entry_date asc
        $entriesByYear = $entries->groupBy(function ($item) {
            return $item->entry_date->format('Y');
        })->map(function ($group) {
            // Sort each group by entry_date ascending (oldest first, newest at bottom)
            return $group->sortBy('entry_date')->values();
        });

        return Inertia::render('Journey/IndexJourney', [
            'entries' => $entries,
            'entriesByYear' => $entriesByYear,
            'screen' => array_merge($this->screen, ['isMobileSidebar' => true]),
        ]);
    }

    /**
     * Show the form for creating a new entry.
     */
    public function create()
    {
        return Inertia::render('Journey/CreateJourney', [
            'screen' => $this->screen,
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

        // Get all entries for sidebar
        // Sort by entry_date ascending (oldest first) - timeline goes from top (oldest) to bottom (newest)
        $entries = $isAdmin 
            ? Journey::orderBy('entry_date', 'asc')->get() 
            : Journey::published()->orderBy('entry_date', 'asc')->get();

        // Group by year and ensure each group's entries remain sorted by entry_date asc
        $entriesByYear = $entries->groupBy(function ($item) {
            return $item->entry_date->format('Y');
        })->map(function ($group) {
            // Sort each group by entry_date ascending (oldest first, newest at bottom)
            return $group->sortBy('entry_date')->values();
        });

        return Inertia::render('Journey/ShowJourney', [
            'entry' => $entry,
            'entries' => $entries,
            'entriesByYear' => $entriesByYear,
            'screen' => $this->screen,
        ]);
    }

    /**
     * Show the form for editing the specified entry.
     */
    public function edit($id)
    {
        $entry = Journey::findOrFail($id);

        // Sort by entry_date ascending (oldest first) - timeline goes from top (oldest) to bottom (newest)
        $entries = Journey::orderBy('entry_date', 'asc')->get();
        // Group by year and ensure each group's entries remain sorted by entry_date asc
        $entriesByYear = $entries->groupBy(function ($item) {
            return $item->entry_date->format('Y');
        })->map(function ($group) {
            // Sort each group by entry_date ascending (oldest first, newest at bottom)
            return $group->sortBy('entry_date')->values();
        });

        return Inertia::render('Journey/EditJourney', [
            'entry' => $entry,
            'entries' => $entries,
            'entriesByYear' => $entriesByYear,
            'screen' => $this->screen,
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

