<?php

namespace Database\Factories\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tests\TestResult;
use App\Models\Tests\Test;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tests\TestResult>
 */
class TestResultFactory extends Factory
{
    protected $model = \App\Models\Tests\TestResult::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $test = Test::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();
        $totalQuestions = $test ? $test->total_questions : 5;
        $correctAnswers = $this->faker->numberBetween(0, $totalQuestions);
        $score = $totalQuestions > 0 ? ($correctAnswers / $totalQuestions) * 100 : 0;

        return [
            'id' => Str::uuid(),
            'test_id' => $test ? $test->id : null,
            'user_id' => $this->faker->optional(0.7)->randomElement([$user ? $user->id : null, null]),
            'participant_name' => $this->faker->optional(0.3)->name(),
            'score' => round($score, 2),
            'correct_answers' => $correctAnswers,
            'total_questions' => $totalQuestions,
            'completed_at' => $this->faker->dateTimeThisYear,
            'time_taken' => $this->faker->optional()->numberBetween(60, 3600), // 1 dakika - 1 saat
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

