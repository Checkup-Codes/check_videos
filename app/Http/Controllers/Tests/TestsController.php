<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Tests\Test;
use App\Models\Tests\TestCategory;
use App\Services\Tests\TestService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TestsController extends Controller
{
    private $testService;

    public function __construct(TestService $testService)
    {
        $this->testService = $testService;
    }

    public function index()
    {
        $testsResult = $this->testService->getTests();
        $isAdmin = Auth::check();

        return inertia('TestCategories/Tests/IndexTest', [
            'tests'     => $testsResult['data'],
            'screen'     => $this->testService->getScreenData('Testler', true),
            'isAdmin'    => $isAdmin
        ]);
    }

    public function create()
    {
        $isAdmin = Auth::check();
        $testsResult = $this->testService->getAllTests();
        $categoriesResult = $this->testService->getCategories();

        return inertia('TestCategories/Tests/CreateTest', [
            'tests'     => $testsResult['data'],
            'categories' => $categoriesResult['data'],
            'screen'     => $this->testService->getScreenData('Yeni Test'),
            'isAdmin'    => $isAdmin
        ]);
    }

    public function show($slug)
    {
        $categoriesResult = $this->testService->getCategories();
        $testsResult = $this->testService->getTests();
        $testResult = $this->testService->getTestBySlug($slug);
        $isAdmin = Auth::check();

        // Generate structured data for quiz
        $seoService = app(\App\Services\SeoService::class);
        $test = $testResult['data'];
        
        $structuredData = [
            $seoService->getQuizSchema([
                'title' => $test->title,
                'description' => $test->description ?? '',
                'url' => route('tests.show', $test->slug),
                'published_at' => $test->published_at?->toIso8601String(),
                'created_at' => $test->created_at->toIso8601String(),
                'updated_at' => $test->updated_at->toIso8601String(),
                'total_questions' => $test->total_questions,
                'time_limit' => $test->time_limit,
            ]),
        ];

        // Add breadcrumb schema
        $breadcrumbs = [
            ['name' => 'Ana Sayfa', 'url' => url('/')],
            ['name' => 'Testler', 'url' => route('tests.index')],
        ];
        
        if ($test->category) {
            $breadcrumbs[] = ['name' => $test->category->name, 'url' => route('test-categories.show', $test->category->slug)];
        }
        
        $breadcrumbs[] = ['name' => $test->title, 'url' => route('tests.show', $test->slug)];
        
        $structuredData[] = $seoService->getBreadcrumbSchema($breadcrumbs);

        return inertia('TestCategories/Tests/ShowTest', [
            'tests'     => $testsResult['data'],
            'test'      => $test,
            'categories' => $categoriesResult['data'],
            'screen'     => $this->testService->getScreenData($test->title),
            'isAdmin'    => $isAdmin,
            'structuredData' => $structuredData,
        ]);
    }

    public function edit(Test $test)
    {
        $isAdmin = Auth::check();
        $categoriesResult = $this->testService->getCategories();
        $testsResult = $this->testService->getTests();

        return inertia('TestCategories/Tests/EditTest', [
            'tests'     => $testsResult['data'],
            'test'      => $test->load(['questions.options']),
            'categories' => $categoriesResult['data'],
            'screen'     => $this->testService->getScreenData($test->title . ' - Düzenle'),
            'isAdmin'    => $isAdmin
        ]);
    }

    public function destroy(Test $test)
    {
        $result = $this->testService->deleteTest($test);

        return redirect()
            ->route('tests.index')
            ->with('success', 'Test başarıyla silindi.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:tests,slug',
            'description'  => 'nullable|string',
            'published_at' => 'nullable|date',
            'status'       => 'required|in:draft,published,private',
            'category_id'  => 'nullable|exists:test_categories,id',
            'time_limit'   => 'nullable|integer|min:0',
            'questions'    => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.question_type' => 'required|string|in:single_choice,multiple_choice,true_false',
            'questions.*.points' => 'nullable|integer|min:1',
            'questions.*.explanation' => 'nullable|string',
            'questions.*.correct_answer' => 'nullable', // For true_false questions
            'questions.*.options' => 'required_if:questions.*.question_type,single_choice,multiple_choice|array|min:2',
            'questions.*.options.*.option_text' => 'required_with:questions.*.options|string',
            'questions.*.options.*.is_correct' => 'required_with:questions.*.options|boolean',
        ]);

        $data = $request->all();
        $data['author_id'] = Auth::id();

        $test = $this->testService->createTest($data);
        
        // Save questions
        if (isset($data['questions'])) {
            $this->testService->saveTestQuestions($test['data'], $data['questions']);
        }

        return redirect()
            ->route('tests.show', ['test' => $test['data']->slug])
            ->with('success', 'Test başarıyla oluşturuldu.');
    }

    public function update(Request $request, Test $test)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:tests,slug,' . $test->id,
            'description'  => 'nullable|string',
            'published_at' => 'nullable|date',
            'status'       => 'required|in:draft,published,private',
            'category_id'  => 'nullable|exists:test_categories,id',
            'time_limit'   => 'nullable|integer|min:0',
            'questions'    => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.question_type' => 'required|string|in:single_choice,multiple_choice,true_false',
            'questions.*.points' => 'nullable|integer|min:1',
            'questions.*.explanation' => 'nullable|string',
            'questions.*.correct_answer' => 'nullable', // For true_false questions
            'questions.*.options' => 'required_if:questions.*.question_type,single_choice,multiple_choice|array|min:2',
            'questions.*.options.*.option_text' => 'required_with:questions.*.options|string',
            'questions.*.options.*.is_correct' => 'required_with:questions.*.options|boolean',
        ]);

        try {
            $result = $this->testService->updateTest($test, $validated);
            
            // Update questions
            if (isset($validated['questions'])) {
                $this->testService->saveTestQuestions($test, $validated['questions']);
            }

            return redirect()
                ->route('tests.show', ['test' => $test->slug])
                ->with('success', 'Test başarıyla güncellendi.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Güncelleme sırasında bir hata oluştu.']);
        }
    }

    public function take($slug)
    {
        $testResult = $this->testService->getTestBySlug($slug);
        $isAdmin = Auth::check();

        if (!$isAdmin && $testResult['data']->status !== 'published') {
            abort(404);
        }

        return inertia('TestCategories/Tests/TakeTest', [
            'test'      => $testResult['data'],
            'screen'     => $this->testService->getScreenData($testResult['data']->title . ' - Test'),
            'isAdmin'    => $isAdmin
        ]);
    }

    public function submit(Request $request, $slug)
    {
        $testResult = $this->testService->getTestBySlug($slug);
        $test = $testResult['data'];
        $isLoggedIn = Auth::check();

        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:test_questions,id',
            'answers.*.option_ids' => 'nullable|array',
            'answers.*.option_ids.*' => 'exists:test_options,id',
            'answers.*.answer_text' => 'nullable|string',
            'participant_name' => 'nullable|string|max:255',
            'time_taken' => 'nullable|integer|min:0',
        ]);

        $result = $this->testService->submitTestResult(
            $test,
            $validated['answers'],
            $validated['participant_name'] ?? null,
            $validated['time_taken'] ?? null,
            $isLoggedIn // Only save to DB if logged in
        );

        // If logged in, redirect to result page
        if ($result['saved'] && $result['data']->id) {
            return redirect()
                ->route('tests.result', ['result' => $result['data']->id])
                ->with('success', 'Test tamamlandı!');
        }

        // For guests, show result page with shareable message
        return inertia('TestCategories/Tests/TestResult', [
            'result' => $result['data'],
            'screen' => $this->testService->getScreenData('Test Sonucu'),
            'isAdmin' => $isLoggedIn,
            'isGuest' => true,
        ]);
    }

    public function result($resultId)
    {
        $result = $this->testService->getTestResult($resultId);
        $isAdmin = Auth::check();

        return inertia('TestCategories/Tests/TestResult', [
            'result'     => $result['data'],
            'screen'     => $this->testService->getScreenData('Test Sonucu'),
            'isAdmin'    => $isAdmin
        ]);
    }

    /**
     * Bulk store tests from JSON
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:tests,slug',
            'description'  => 'nullable|string',
            'status'       => 'nullable|in:draft,published,private',
            'category_id'  => 'nullable|exists:test_categories,id',
            'questions'    => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.question_type' => 'required|in:single_choice,multiple_choice,true_false',
            'questions.*.points' => 'nullable|integer|min:0',
            'questions.*.order' => 'nullable|integer|min:0',
            'questions.*.explanation' => 'nullable|string',
            'questions.*.options' => 'required_if:questions.*.question_type,single_choice,multiple_choice|array',
            'questions.*.options.*.option_text' => 'required_with:questions.*.options|string',
            'questions.*.options.*.is_correct' => 'required_with:questions.*.options|boolean',
            'questions.*.correct_answer' => 'required_if:questions.*.question_type,true_false',
        ]);

        try {
            $result = $this->testService->bulkCreateTest($request->all());

            return redirect()
                ->route('tests.show', $result['data']->slug)
                ->with('success', 'Test başarıyla oluşturuldu!');
        } catch (\Exception $e) {
            Log::error('Bulk test creation failed: ' . $e->getMessage());
            
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Test oluşturulurken bir hata oluştu: ' . $e->getMessage()]);
        }
    }
}

