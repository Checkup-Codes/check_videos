<?php

namespace Database\Factories\FBVersions;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FBVersions\Feature;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feature>
 */
class FeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Feature::class;

    public function definition()
    {
        return [
            'version_id' => \App\Models\FBVersions\Version::factory(),
            'feature_name' => $this->faker->sentence,
            'feature_detail' => $this->faker->paragraph
        ];
    }
}
