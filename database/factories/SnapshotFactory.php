<?php

namespace Database\Factories;

use App\Enums\Category;
use App\Enums\Severity;
use App\Models\Snapshot;
use App\Models\Store;
use App\Models\StoreItem;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Snapshot>
 */
class SnapshotFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'version' => 1,
            'store_item_id' => StoreItem::factory(),
            'store_item_minimum_quantity' => 1,
            'store_id' => Store::factory(),
            'store_name' => 'Store',
            'store_breadcrumbs' => ['DECK'],
            'unit_id' => Unit::factory(),
            'unit_short_name' => 'PCS',
            'unit_full_name' => 'Pieces',
            'unit_data_type' => 'INTEGER',
            'item_category' => Category::DECK,
            'item_subcategory' => 'Paint',
            'item_name' => 'Item',
            'item_severity' => Severity::NON_CRITICAL,
        ];
    }
}
