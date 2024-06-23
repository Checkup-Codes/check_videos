<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class WriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'First Example Post',
            'content' => 'This is the content of the first example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'first-example-post',
            'summary' => 'Summary of the first example post.',
            'status' => 'published',
            'cover_image' => 'path/to/image.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Second Example Post',
            'content' => 'This is the content of the second example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'second-example-post',
            'summary' => 'Summary of the second example post.',
            'status' => 'draft',
            'cover_image' => 'path/to/image2.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Third Example Post',
            'content' => 'This is the content of the third example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'third-example-post',
            'summary' => 'Summary of the third example post.',
            'status' => 'published',
            'cover_image' => 'path/to/image3.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Fourth Example Post',
            'content' => 'This is the content of the fourth example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'fourth-example-post',
            'summary' => 'Summary of the fourth example post.',
            'status' => 'draft',
            'cover_image' => 'path/to/image4.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Fifth Example Post',
            'content' => 'This is the content of the fifth example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'fifth-example-post',
            'summary' => 'Summary of the fifth example post.',
            'status' => 'published',
            'cover_image' => 'path/to/image5.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Sixth Example Post',
            'content' => 'This is the content of the sixth example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'sixth-example-post',
            'summary' => 'Summary of the sixth example post.',
            'status' => 'draft',
            'cover_image' => 'path/to/image6.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Seventh Example Post',
            'content' => 'This is the content of the seventh example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'seventh-example-post',
            'summary' => 'Summary of the seventh example post.',
            'status' => 'published',
            'cover_image' => 'path/to/image7.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Eighth Example Post',
            'content' => 'This is the content of the eighth example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'eighth-example-post',
            'summary' => 'Summary of the eighth example post.',
            'status' => 'draft',
            'cover_image' => 'path/to/image8.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Ninth Example Post',
            'content' => 'This is the content of the ninth example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'ninth-example-post',
            'summary' => 'Summary of the ninth example post.',
            'status' => 'published',
            'cover_image' => 'path/to/image9.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('writes')->insert([
            'id' => (string) Str::uuid(),
            'title' => 'Tenth Example Post',
            'content' => 'This is the content of the tenth example post.',
            'author_id' => 1,
            'published_at' => now(),
            'slug' => 'tenth-example-post',
            'summary' => 'Summary of the tenth example post.',
            'status' => 'draft',
            'cover_image' => 'path/to/image10.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
