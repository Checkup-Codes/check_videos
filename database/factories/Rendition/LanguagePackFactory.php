<?php

namespace Database\Factories\Rendition;

use App\Models\Rendition\LanguagePack;
use Illuminate\Database\Eloquent\Factories\Factory;

class LanguagePackFactory extends Factory
{
    protected $model = LanguagePack::class;

    public function definition(): array
    {
        $languages = ['en', 'tr'];
        $language = $this->faker->randomElement($languages);
        $name = $this->faker->unique()->words(3, true);

        return [
            'id' => $this->faker->uuid(),
            'name' => $name,
            'slug' => strtolower(str_replace(' ', '-', $name)),
            'description' => $this->faker->sentence(),
            'language' => $language,
        ];
    }
}
