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
            $table->uuid('id')->primary(); // UUID olarak ayarlanmış birincil anahtar
            $table->string('title');
            $table->string('slug');
            $table->text('content');
            $table->unsignedBigInteger('author_id');
            $table->timestamp('published_at')->nullable();
            $table->text('summary')->nullable();
            $table->string('status')->default('draft');
            $table->string('cover_image')->nullable();
            $table->timestamps();
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
