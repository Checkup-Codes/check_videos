<?php

namespace Database\Factories\Rendition;

use App\Models\Rendition\Synonym;
use App\Models\Rendition\Word;
use Illuminate\Database\Eloquent\Factories\Factory;

class SynonymFactory extends Factory
{
    protected $model = Synonym::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'word_id' => Word::factory(),
            'synonym' => $this->faker->word(),
            'language' => $this->faker->randomElement(['en', 'tr']),
        ];
    }
}
