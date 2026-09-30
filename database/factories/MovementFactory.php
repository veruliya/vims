<?php

namespace Database\Factories;

use App\Enums\Condition;
use App\Enums\MovementType;
use App\Models\Movement;
use App\Models\Snapshot;
use App\Models\StoreItem;
use App\Models\TransactionReport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Movement>
 */
class MovementFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'store_item_id' => StoreItem::factory(),
            'snapshot_id' => function (array $attributes) {
                $storeItemId = $attributes['store_item_id'] instanceof StoreItem
                    ? $attributes['store_item_id']->id
                    : $attributes['store_item_id'];

                return Snapshot::factory()->create([
                    'store_item_id' => $storeItemId,
                ])->id;
            },
            'quantity' => 5,
            'movement_type' => MovementType::RECEIVED,
            'condition' => Condition::NORMAL,
            'movementable_type' => TransactionReport::class,
            'movementable_id' => TransactionReport::factory(),
        ];
    }
}
