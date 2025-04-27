<?php

namespace Database\Factories\Rendition;

use App\Models\Rendition\WordPackRelation;
use App\Models\Rendition\Word;
use App\Models\Rendition\LanguagePack;
use Illuminate\Database\Eloquent\Factories\Factory;

class WordPackRelationFactory extends Factory
{
    protected $model = WordPackRelation::class;

    public function definition(): array
    {
        return [
            'word_id' => Word::factory(),
            'pack_id' => LanguagePack::factory(),
        ];
    }
}
