<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('word_pack_relations', function (Blueprint $table) {
            // Önce mevcut id sütununu kaldır
            $table->dropPrimary('id');
            $table->dropColumn('id');

            // Yeni auto-increment id sütunu ekle
            $table->id()->first();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('word_pack_relations', function (Blueprint $table) {
            // Önce auto-increment id sütununu kaldır
            $table->dropColumn('id');

            // Eski UUID id sütununu geri ekle
            $table->uuid('id')->primary()->first();
        });
    }
};
