<?php

namespace Database\Factories\FBVersions;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FBVersions\Bug;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bug>
 */
class BugFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Bug::class;

    public function definition()
    {
        return [
            'version_id' => \App\Models\FBVersions\Version::factory(),
            'bug_name' => $this->faker->sentence,
            'bug_detail' => $this->faker->paragraph
        ];
    }
}
