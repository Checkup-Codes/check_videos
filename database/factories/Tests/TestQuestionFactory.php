<?php

namespace Database\Factories\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tests\TestQuestion;
use App\Models\Tests\Test;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tests\TestQuestion>
 */
class TestQuestionFactory extends Factory
{
    protected $model = \App\Models\Tests\TestQuestion::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $test = Test::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'test_id' => $test ? $test->id : null,
            'question_text' => $this->faker->sentence() . '?',
            'question_type' => 'multiple_choice',
            'order' => 0,
            'points' => 20,
            'explanation' => $this->faker->optional(0.5)->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

