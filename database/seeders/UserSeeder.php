<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Elselif',
            'email' => 'cekapcheck@gmail.com',
            'password' => Hash::make('123qwe123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
