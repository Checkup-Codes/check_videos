<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('writes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug');
            $table->longText('content');
            $table->unsignedBigInteger('author_id');
            $table->string('category_id');
            $table->timestamp('published_at')->nullable();
            $table->text('summary')->nullable();
            $table->string('status')->default('draft');
            $table->integer('views_count')->default(0);
            $table->string('seo_keywords')->nullable();
            $table->string('tags')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('hasDraw')->default(0);
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('writes');
    }
}
