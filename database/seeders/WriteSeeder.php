<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;


class WriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Existing category and author IDs
        $categoryIds = DB::table('categories')->pluck('id')->toArray();
        $authorIds = DB::table('users')->pluck('id')->toArray();

        // Ensure that categoryIds and authorIds are not empty
        if (empty($categoryIds) || empty($authorIds)) {
            $this->command->info('No categories or users found, please run the CategoriesSeeder and UsersSeeder first.');
            return;
        }

        foreach (range(1, 50) as $index) {
            DB::table('writes')->insert([
                'id' => Str::uuid(),
                'title' => $faker->sentence,
                'slug' => Str::slug($faker->sentence),
                'content' => $faker->paragraphs(rand(3, 7), true),
                'author_id' => $faker->randomElement($authorIds),
                'category_id' => $faker->randomElement($categoryIds),
                'published_at' => $faker->optional()->dateTimeThisYear,
                'summary' => $faker->optional()->text(200),
                'status' => $faker->randomElement(['draft', 'published', 'archived']),
                'views_count' => rand(0, 1000),
                'seo_keywords' => $faker->words(5, true),
                'tags' => $faker->words(5, true),
                'meta_description' => $faker->optional()->text(160),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
