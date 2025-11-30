<?php

namespace Database\Factories\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tests\TestCategory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tests\TestCategory>
 */
class TestCategoryFactory extends Factory
{
    protected $model = \App\Models\Tests\TestCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'id' => Str::uuid(),
            'name' => $name,
            'slug' => Str::slug($name),
            'parent_id' => null,
            'status' => $this->faker->randomElement(['public', 'private']),
            'description' => $this->faker->optional()->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

