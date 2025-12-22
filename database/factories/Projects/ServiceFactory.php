<?php

namespace Database\Factories\Projects;

use App\Models\Projects\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Projects\Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        $slug = Str::slug($name);

        return [
            'name' => ucfirst($name),
            'slug' => $slug,
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 100, 10000),
            'sub_category_id' => null,
        ];
    }
}
