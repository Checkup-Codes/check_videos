<?php

namespace Database\Factories\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tests\TestOption;
use App\Models\Tests\TestQuestion;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tests\TestOption>
 */
class TestOptionFactory extends Factory
{
    protected $model = \App\Models\Tests\TestOption::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $question = TestQuestion::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'question_id' => $question ? $question->id : null,
            'option_text' => $this->faker->sentence(),
            'is_correct' => false,
            'order' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the option is correct.
     */
    public function correct(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_correct' => true,
        ]);
    }
}

