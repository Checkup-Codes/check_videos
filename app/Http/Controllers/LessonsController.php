<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LessonsController extends Controller
{
    private $screen;

    public function __construct()
    {
        $this->screen = [
            'isMobileSidebar' => false,
            'name' => 'lessons'
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = $this->getCachedLessons();

        return inertia('Lessons/IndexLesson', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => true]),
            'lessons' => $lessons
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lessons = $this->getCachedLessons();

        return inertia('Lessons/CreateLesson', [
            'screen' => $this->screen,
            'lessons' => $lessons
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:lessons,slug',
            'playlist_id' => 'required|string|max:255',
        ]);

        Lesson::create($validated);
        Cache::forget('lessons');

        return redirect()->route('lessons.index')->with('success', 'Yeni ders eklendi H.O.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $lesson = Lesson::where('slug', $slug)->firstOrFail();

        return inertia('Lessons/ShowLesson', [
            'lessons' => $this->getCachedLessons(),
            'lesson' => $lesson,
            'screen' => $this->screen
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        return inertia('Lessons/EditLesson', [
            'lessons' => $this->getCachedLessons(),
            'lesson' => $lesson,
            'screen' => $this->screen
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:lessons,slug,' . $lesson->id,
            'playlist_id' => 'required|string|max:255',
        ]);

        $lesson->update($validated);
        Cache::forget('lessons');

        return redirect()->route('lessons.index')->with('success', 'Ders başarıyla güncellendi H.O.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();
        Cache::forget('lessons');

        return redirect()->route('lessons.index')->with('success', 'Çöp bir ders daha kazandı.');
    }

    /**
     * Retrieve cached lessons.
     */
    private function getCachedLessons()
    {
        return Cache::remember('lessons', 60, function () {
            return Lesson::select('title', 'slug', 'playlist_id', 'created_at')->get();
        });
    }
}
