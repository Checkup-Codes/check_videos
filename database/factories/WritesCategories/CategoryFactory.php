<?php

namespace Database\Factories\WritesCategories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WritesCategories\Category>
 */
class CategoryFactory extends Factory
{

    protected $model = \App\Models\WritesCategories\Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'id' => Str::uuid(),
            'name' => $name,
            'slug' => Str::slug($name),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
