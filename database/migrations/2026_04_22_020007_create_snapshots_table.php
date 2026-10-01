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
        Schema::create('snapshots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('version');
            $table->foreignId('store_item_id')->constrained('store_items')->restrictOnDelete();
            $table->decimal('store_item_minimum_quantity');
            $table->unsignedBigInteger('store_id');
            $table->string('store_name');
            $table->json('store_breadcrumbs');
            $table->unsignedBigInteger('unit_id');
            $table->string('unit_short_name');
            $table->string('unit_full_name');
            $table->string('unit_data_type');
            $table->string('item_category');
            $table->string('item_subcategory');
            $table->string('item_name');
            $table->string('item_severity');
            $table->timestamps();

            $table->unique(['store_item_id', 'version']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('snapshots');
    }
};
