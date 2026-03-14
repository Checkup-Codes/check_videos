<?php

namespace App\Services\Tests;

use App\Models\Tests\Test;
use App\Models\Tests\TestCategory;
use App\Models\Tests\TestQuestion;
use App\Models\Tests\TestOption;
use App\Models\Tests\TestResult;
use App\Models\Tests\TestAnswer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Services\Tests\TestCategoryService;
use Illuminate\Support\Facades\Cache;

class TestService
{
    private const SLOW_OPERATION_THRESHOLD = 0.5;

    public function getCategories()
    {
        return app(TestCategoryService::class)->getCategories();
    }

    private function isSlowOperation($executionTime)
    {
        return $executionTime > self::SLOW_OPERATION_THRESHOLD;
    }

    private function formatExecutionTime($executionTime)
    {
        return [
            'value' => round($executionTime, 4) . ' seconds',
            'is_slow' => $this->isSlowOperation($executionTime)
        ];
    }

    public function getTests()
    {
        $isAdmin = Auth::check();
        if (!$isAdmin) {
            return Cache::remember('public_tests_list', 60 * 60, function () {
                $tests = Test::select('id', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at', 'total_questions', 'total_points')
                    ->where('status', 'published')
                    ->orderByDesc('published_at')
                    ->get();
                return [
                    'data' => $tests,
                    'count' => $tests->count()
                ];
            });
        }
        $tests = Test::select('id', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at', 'total_questions', 'total_points')
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $tests,
            'count' => $tests->count()
        ];
    }

    public function getAllTests()
    {
        $isAdmin = Auth::check();
        if (!$isAdmin) {
            return Cache::remember('public_tests_list', 60 * 60, function () {
                $tests = Test::select('id', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at', 'total_questions', 'total_points')
                    ->where('status', 'published')
                    ->orderByDesc('published_at')
                    ->get();
                return [
                    'data' => $tests,
                    'count' => $tests->count()
                ];
            });
        }
        $tests = Test::select('id', 'title', 'created_at', 'slug', 'status', 'updated_at', 'published_at', 'total_questions', 'total_points')
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $tests,
            'count' => $tests->count()
        ];
    }

    public function getTestsByCategory(TestCategory $category)
    {
        $isAdmin = Auth::check();
        $tests = Test::where('category_id', $category->id)
            ->when(!$isAdmin, function ($query) {
                $query->where('status', 'published');
            })
            ->select(
                'id',
                'title',
                'slug',
                'status',
                'published_at',
                'created_at',
                'updated_at',
                'description',
                'total_questions',
                'total_points'
            )
            ->orderByDesc('published_at')
            ->get();
        return [
            'data' => $tests,
            'count' => $tests->count()
        ];
    }

    public function getTestBySlug($slug)
    {
        $isAdmin = Auth::check();
        $query = Test::with([
            'questions.options',
            'category',
            'author'
        ])->where('slug', $slug);
        
        if (!$isAdmin) {
            $query->where('status', 'published');
        }
        
        $test = $query->firstOrFail();
        return [
            'data' => $test
        ];
    }

    public function createTest(array $data)
    {
        DB::beginTransaction();
        try {
            if (!isset($data['author_id']) || empty($data['author_id'])) {
                $data['author_id'] = Auth::id();
            }
            $test = Test::create($data);
            DB::commit();
            Cache::forget('public_tests_list');
            return [
                'data' => $test
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateTest(Test $test, array $data)
    {
        DB::beginTransaction();
        try {
            $test->update($data);
            DB::commit();
            Cache::forget('public_tests_list');
            return [
                'data' => $test
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteTest(Test $test)
    {
        DB::beginTransaction();
        try {
            // Delete test results and answers
            foreach ($test->results as $result) {
                $result->answers()->delete();
                $result->delete();
            }
            
            // Delete test questions and options
            foreach ($test->questions as $question) {
                $question->options()->delete();
                $question->delete();
            }
            
            // Delete the test itself
            $result = $test->delete();
            
            DB::commit();
            Cache::forget('public_tests_list');
            return [
                'success' => $result
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function saveTestQuestions(Test $test, array $questions)
    {
        DB::beginTransaction();
        try {
            // Delete existing questions
            $test->questions()->delete();
            
            $totalQuestions = 0;
            $totalPoints = 0;
            
            foreach ($questions as $questionData) {
                $question = $test->questions()->create([
                    'question_text' => $questionData['question_text'],
                    'question_type' => $questionData['question_type'] ?? 'single_choice',
                    'order' => $questionData['order'] ?? $totalQuestions,
                    'points' => $questionData['points'] ?? 20,
                    'explanation' => $questionData['explanation'] ?? null,
                    'correct_answer' => $questionData['correct_answer'] ?? null, // For true_false questions
                ]);
                
                $totalPoints += $question->points;
                $totalQuestions++;
                
                // Save options for single_choice and multiple_choice
                if (isset($questionData['options']) && is_array($questionData['options'])) {
                    foreach ($questionData['options'] as $index => $optionData) {
                        $question->options()->create([
                            'option_text' => $optionData['option_text'],
                            'is_correct' => $optionData['is_correct'] ?? false,
                            'order' => $optionData['order'] ?? $index,
                        ]);
                    }
                }
            }
            
            // Update test totals
            $test->update([
                'total_questions' => $totalQuestions,
                'total_points' => $totalPoints,
            ]);
            
            DB::commit();
            Cache::forget('public_tests_list');
            return [
                'data' => $test->fresh(['questions.options'])
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function submitTestResult(Test $test, array $answers, $participantName = null, $timeTaken = null, $saveToDb = true)
    {
        $correctAnswers = 0;
        $totalQuestions = $test->questions()->count();
        
        // Process answers to calculate score
        $processedAnswers = [];
        foreach ($answers as $answerData) {
            $question = TestQuestion::findOrFail($answerData['question_id']);
            
            $isCorrect = false;
            $selectedOptions = [];
            
            // Handle single choice and multiple choice with option IDs
            if (isset($answerData['option_ids']) && is_array($answerData['option_ids'])) {
                $selectedOptions = TestOption::whereIn('id', $answerData['option_ids'])->get();
                
                // Get all correct options for this question
                $correctOptions = $question->options()->where('is_correct', true)->pluck('id')->toArray();
                $selectedOptionIds = collect($selectedOptions)->pluck('id')->toArray();
                
                // Check if selected options match correct options exactly
                sort($correctOptions);
                sort($selectedOptionIds);
                $isCorrect = $correctOptions === $selectedOptionIds;
                
                if ($isCorrect) {
                    $correctAnswers++;
                }
            }
            // Handle true/false questions
            elseif (isset($answerData['answer_text'])) {
                if ($question->question_type === 'true_false') {
                    $userAnswer = $answerData['answer_text'] === 'true' || $answerData['answer_text'] === true;
                    $correctAnswer = $question->correct_answer === true || $question->correct_answer === 'true' || $question->correct_answer === 1;
                    $isCorrect = $userAnswer === $correctAnswer;
                    
                    if ($isCorrect) {
                        $correctAnswers++;
                    }
                }
            }
            
            $processedAnswers[] = [
                'question' => $question,
                'options' => $selectedOptions,
                'answer_text' => $answerData['answer_text'] ?? null,
                'is_correct' => $isCorrect,
            ];
        }
        
        // Calculate score (100 üzerinden)
        $score = $totalQuestions > 0 ? ($correctAnswers / $totalQuestions) * 100 : 0;
        
        // Only save to DB if user is logged in
        if ($saveToDb && Auth::check()) {
            DB::beginTransaction();
            try {
                $userId = Auth::id();
                
                // Create result
                $result = TestResult::create([
                    'test_id' => $test->id,
                    'user_id' => $userId,
                    'participant_name' => $participantName,
                    'total_questions' => $totalQuestions,
                    'completed_at' => now(),
                    'time_taken' => $timeTaken,
                    'correct_answers' => $correctAnswers,
                    'score' => round($score, 2),
                ]);
                
                // Process answers and save to DB
                foreach ($processedAnswers as $answerData) {
                    // For multiple choice with multiple answers, save each selected option
                    if (!empty($answerData['options'])) {
                        foreach ($answerData['options'] as $option) {
                            TestAnswer::create([
                                'result_id' => $result->id,
                                'question_id' => $answerData['question']->id,
                                'option_id' => $option->id,
                                'answer_text' => null,
                                'is_correct' => $answerData['is_correct'],
                            ]);
                        }
                    }
                    // For text-based answers
                    else {
                        TestAnswer::create([
                            'result_id' => $result->id,
                            'question_id' => $answerData['question']->id,
                            'option_id' => null,
                            'answer_text' => $answerData['answer_text'],
                            'is_correct' => $answerData['is_correct'],
                        ]);
                    }
                }
                
                DB::commit();
                return [
                    'data' => $result->fresh(['test', 'answers.question.options', 'answers.option']),
                    'saved' => true,
                ];
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
        
        // For guests, return result data without saving to DB
        $guestAnswers = [];
        foreach ($processedAnswers as $index => $answerData) {
            if (!empty($answerData['options'])) {
                // Multiple choice with multiple answers
                foreach ($answerData['options'] as $optIndex => $option) {
                    $guestAnswers[] = (object)[
                        'id' => 'guest-answer-' . $index . '-' . $optIndex,
                        'question' => $answerData['question']->load('options'),
                        'option' => $option,
                        'option_id' => $option->id,
                        'answer_text' => null,
                        'is_correct' => $answerData['is_correct'],
                    ];
                }
            } else {
                // Text-based answers
                $guestAnswers[] = (object)[
                    'id' => 'guest-answer-' . $index,
                    'question' => $answerData['question']->load('options'),
                    'option' => null,
                    'option_id' => null,
                    'answer_text' => $answerData['answer_text'],
                    'is_correct' => $answerData['is_correct'],
                ];
            }
        }
        
        return [
            'data' => (object)[
                'test' => $test->load(['questions.options']),
                'correct_answers' => $correctAnswers,
                'total_questions' => $totalQuestions,
                'score' => round($score, 2),
                'time_taken' => $timeTaken,
                'participant_name' => $participantName,
                'completed_at' => now(),
                'answers' => $guestAnswers,
            ],
            'saved' => false,
        ];
    }

    public function getTestResult($resultId)
    {
        $result = TestResult::with([
            'test.questions.options',
            'answers.question.options',
            'answers.option',
            'user'
        ])->findOrFail($resultId);
        
        return [
            'data' => $result
        ];
    }

    public function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'tests',
            $pageTitle,
            null,
            $isMobile
        );
    }

    /**
     * Bulk create test from JSON data
     */
    public function bulkCreateTest(array $data)
    {
        $startTime = microtime(true);

        DB::beginTransaction();
        try {
            // Create test
            $test = Test::create([
                'title' => $data['title'],
                'slug' => $data['slug'],
                'description' => $data['description'] ?? null,
                'status' => $data['status'] ?? 'draft',
                'category_id' => $data['category_id'] ?? null,
                'author_id' => Auth::id() ?? 1, // Add author_id
                'published_at' => $data['status'] === 'published' ? now() : null,
                'total_questions' => count($data['questions']),
                'total_points' => array_sum(array_column($data['questions'], 'points')),
            ]);

            // Create questions and options
            foreach ($data['questions'] as $index => $questionData) {
                $question = TestQuestion::create([
                    'test_id' => $test->id,
                    'question_text' => $questionData['question_text'],
                    'question_type' => $questionData['question_type'],
                    'points' => $questionData['points'] ?? 10,
                    'order' => $questionData['order'] ?? ($index + 1),
                    'explanation' => $questionData['explanation'] ?? null,
                    'correct_answer' => $questionData['correct_answer'] ?? null,
                ]);

                // Create options for single_choice and multiple_choice questions
                if (($questionData['question_type'] === 'single_choice' || $questionData['question_type'] === 'multiple_choice') && isset($questionData['options'])) {
                    foreach ($questionData['options'] as $optionIndex => $optionData) {
                        TestOption::create([
                            'question_id' => $question->id,
                            'option_text' => $optionData['option_text'],
                            'is_correct' => $optionData['is_correct'] ?? false,
                            'order' => $optionIndex + 1,
                        ]);
                    }
                }
            }

            DB::commit();

            $executionTime = microtime(true) - $startTime;

            return [
                'success' => true,
                'data' => $test->fresh()->load(['questions.options']),
                'execution_time' => $this->formatExecutionTime($executionTime),
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}

