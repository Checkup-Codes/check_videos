<?php

namespace Database\Factories\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tests\Test;
use App\Models\Tests\TestCategory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tests\Test>
 */
class TestFactory extends Factory
{
    protected $model = \App\Models\Tests\Test::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(4);
        $category = TestCategory::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->optional()->paragraph(),
            'category_id' => $category ? $category->id : null,
            'author_id' => $user ? $user->id : 1,
            'status' => $this->faker->randomElement(['draft', 'published', 'private']),
            'time_limit' => $this->faker->optional()->numberBetween(10, 120), // 10-120 dakika
            'total_questions' => 0, // Sorular eklendikçe güncellenecek
            'total_points' => 100,
            'published_at' => $this->faker->optional(0.7)->dateTimeThisYear,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

