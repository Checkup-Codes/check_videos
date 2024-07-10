<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\SP\SoftwareProduct;
use App\Models\WritesCategories\Category;
use App\Models\WritesCategories\Write;

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

        Write::factory()->count(50)->create();
    }
}
