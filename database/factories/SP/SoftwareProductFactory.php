<?php

namespace Database\Factories\SP;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SoftwareProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid,
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->slug,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->numberBetween(1000, 100000),
            'stock' => $this->faker->numberBetween(0, 100),
            'category' => $this->faker->randomElement(['Utility', 'Entertainment', 'Productivity', 'Development']),
            'version' => $this->faker->randomElement(['1.0', '2.0', '3.0', '4.0']),
            'platform' => $this->faker->randomElement(['Windows', 'Mac', 'Linux', 'Web', 'Mobile']),
            'license_key' => Str::upper(Str::random(16)),
            'is_subscription' => $this->faker->boolean,
            'subscription_duration' => $this->faker->boolean ? $this->faker->numberBetween(1, 24) : null,
            'download_url' => $this->faker->url,
            'system_requirements' => json_encode([
                'OS' => $this->faker->randomElement(['Windows 10', 'macOS Big Sur', 'Ubuntu 20.04']),
                'RAM' => $this->faker->randomElement(['4 GB', '8 GB', '16 GB']),
                'Storage' => $this->faker->randomElement(['256 GB', '512 GB', '1 TB']),
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
