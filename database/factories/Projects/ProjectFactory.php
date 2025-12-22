<?php

namespace Database\Factories\Projects;

use App\Models\Projects\Project;
use App\Models\Projects\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Projects\Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_name' => $this->faker->words(3, true) . ' Projesi',
            'customer_id' => Customer::factory(),
            'category_id' => null,
        ];
    }
}
