<?php

namespace Database\Factories\Rendition;

use App\Models\Rendition\ExampleSentence;
use App\Models\Rendition\Word;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExampleSentenceFactory extends Factory
{
    protected $model = ExampleSentence::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'word_id' => Word::factory(),
            'sentence' => $this->faker->sentence(),
            'translation' => $this->faker->sentence(),
            'language' => $this->faker->randomElement(['en', 'tr']),
        ];
    }
}
