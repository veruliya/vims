<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Store;
use App\Models\StoreItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StoreItem>
 */
class StoreItemFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'item_id' => Item::factory(),
            'minimum_quantity' => 1,
        ];
    }
}
