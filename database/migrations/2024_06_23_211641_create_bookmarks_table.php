<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug');
            $table->string('link');
            $table->uuid('bookmark_category_id');
            $table->timestamps();

            $table->foreign('bookmark_category_id')->references('id')->on('bookmark_categories')->onDelete('cascade');
        });

        DB::statement('ALTER TABLE bookmarks ALTER COLUMN id SET DEFAULT (UUID())');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
