<?php

namespace Database\Factories\FBVersions;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FBVersions\Version;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FBVersions\Version>
 */
class VersionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Version::class;

    public function definition()
    {
        return [
            'release_date' => $this->faker->date(),
            'version' => $this->faker->unique()->numerify('1.#.#'),
            'description' => $this->faker->paragraph
        ];
    }
}
