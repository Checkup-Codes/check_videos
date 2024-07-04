<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CreateSoftwareProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('software_products', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('price');
            $table->unsignedInteger('stock');
            $table->string('category')->nullable();
            $table->string('version');
            $table->enum('platform', ['Windows', 'Mac', 'Linux', 'Web', 'Mobile'])->nullable();
            $table->string('license_key')->unique();
            $table->boolean('is_subscription')->default(false);
            $table->unsignedInteger('subscription_duration')->nullable();
            $table->string('download_url')->nullable();
            $table->json('system_requirements')->nullable();

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
        Schema::dropIfExists('software_products');
    }
}
