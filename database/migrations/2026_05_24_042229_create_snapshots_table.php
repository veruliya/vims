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
            $table->foreignId('movement_id')->constrained('movements');
            $table->string('store_name');
            $table->json('store_breadcrumbs');
            $table->string('unit_short_name');
            $table->string('unit_full_name');
            $table->string('unit_data_type');
            $table->string('item_category');
            $table->string('item_subcategory');
            $table->string('item_name');
            $table->string('item_severity');
            $table->decimal('store_item_minimum_quantity');
            $table->timestamps();
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
