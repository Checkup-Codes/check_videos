<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\SP\SoftwareProduct;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;
use App\Models\Equipment;
use App\Models\FBVersions\Version;
use App\Models\FBVersions\Feature;
use App\Models\FBVersions\Bug;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        User::factory()->specificUser()->create();

        SoftwareProduct::factory(20)->create();

        Category::factory()->count(10)->create();

        Write::factory()->count(30)->create();

        Equipment::factory()->count(10)->create();

        Version::factory()
            ->count(5)
            ->has(Feature::factory()->count(3), 'features')
            ->has(Bug::factory()->count(2), 'bugs')
            ->create();
    }
}
