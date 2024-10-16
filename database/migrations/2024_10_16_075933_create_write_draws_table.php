<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('write_draws', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('write_id');
            $table->json('elements'); // Çizim verisini JSON formatında tutmak için
            $table->integer('version')->default(1); // Çizimin versiyonu
            $table->timestamps();

            $table->foreign('write_id')->references('id')->on('writes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('write_draws');
    }
};
