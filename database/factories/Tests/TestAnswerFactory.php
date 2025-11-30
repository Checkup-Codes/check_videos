<?php

namespace Database\Factories\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tests\TestAnswer;
use App\Models\Tests\TestResult;
use App\Models\Tests\TestQuestion;
use App\Models\Tests\TestOption;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tests\TestAnswer>
 */
class TestAnswerFactory extends Factory
{
    protected $model = \App\Models\Tests\TestAnswer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $result = TestResult::inRandomOrder()->first();
        $question = TestQuestion::inRandomOrder()->first();
        $option = TestOption::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'result_id' => $result ? $result->id : null,
            'question_id' => $question ? $question->id : null,
            'option_id' => $option ? $option->id : null,
            'is_correct' => $option ? $option->is_correct : false,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

