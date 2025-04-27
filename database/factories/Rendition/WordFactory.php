<?php

namespace Database\Factories\Rendition;

use App\Models\Rendition\Word;
use Illuminate\Database\Eloquent\Factories\Factory;

class WordFactory extends Factory
{
    protected $model = Word::class;

    public function definition(): array
    {
        $languages = ['en', 'tr'];
        $types = ['noun', 'verb', 'adjective', 'adverb'];
        $language = $this->faker->randomElement($languages);

        return [
            'id' => $this->faker->uuid(),
            'word' => $this->faker->unique()->word(),
            'meaning' => $this->faker->word(),
            'type' => $this->faker->randomElement($types),
            'language' => $language,
            'learning_status' => $this->faker->numberBetween(0, 2),
            'difficulty_level' => $this->faker->numberBetween(1, 4),
            'flag' => $this->faker->boolean(),
            'incorrect_count' => $this->faker->numberBetween(0, 10),
            'review_count' => $this->faker->numberBetween(0, 20),
            'last_review_date' => $this->faker->optional()->dateTimeThisYear(),
        ];
    }
}
