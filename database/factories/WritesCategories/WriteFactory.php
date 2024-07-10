<?php

namespace Database\Factories\WritesCategories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Illuminate\Support\Str;
use App\Models\WritesCategories\Category;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WritesCategories\Write>
 */
class WriteFactory extends Factory
{
    protected $model = \App\Models\WritesCategories\Write::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'title' => $this->faker->sentence,
            'slug' => Str::slug($this->faker->sentence),
            'content' => $this->faker->paragraphs(rand(3, 7), true),
            'author_id' => User::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'published_at' => $this->faker->optional()->dateTimeThisYear,
            'summary' => $this->faker->optional()->text(200),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'views_count' => rand(0, 1000),
            'seo_keywords' => $this->faker->words(5, true),
            'tags' => $this->faker->words(5, true),
            'meta_description' => $this->faker->optional()->text(160),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
