<?php

namespace Tests\Feature\Api;

use App\Enums\MovementType;
use App\Models\Item;
use App\Models\Movement;
use App\Models\Snapshot;
use App\Models\Store;
use App\Models\StoreItem;
use App\Models\TransactionReport;
use App\Models\Unit;
use App\Models\User;
use App\Models\Vessel;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class MovementControllerTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_index_returns_movements_joined_by_snapshot_id_and_filters_by_movement_type(): void
    {
        $user = User::factory()->create();
        $vessel = Vessel::factory()->create();
        $unit = Unit::factory()->create();
        $store = Store::factory()->for($vessel)->create();
        $item = Item::factory()->for($unit)->create();
        $otherItem = Item::factory()->for($unit)->create(['name' => 'Other item']);
        $storeItem = StoreItem::factory()->for($store)->for($item)->create();
        $otherStoreItem = StoreItem::factory()->for($store)->for($otherItem)->create();

        $report = TransactionReport::factory()->recycle([$vessel, $user])->create();

        Snapshot::firstOrCreateVersion($otherStoreItem->load(['store', 'item.unit']));

        $snapshot = Snapshot::firstOrCreateVersion($storeItem->load(['store', 'item.unit']));

        $movement = Movement::factory()->create([
            'store_item_id' => $storeItem->id,
            'snapshot_id' => $snapshot->id,
            'movement_type' => MovementType::RECEIVED,
            'movementable_type' => TransactionReport::class,
            'movementable_id' => $report->id,
        ]);

        Movement::factory()->create([
            'store_item_id' => $storeItem->id,
            'snapshot_id' => $snapshot->id,
            'movement_type' => MovementType::USED,
            'movementable_type' => TransactionReport::class,
            'movementable_id' => $report->id,
        ]);

        $this->assertNotEquals($snapshot->id, $movement->id);

        $this->getJson('/api/movements?'.http_build_query([
            'filter' => [
                'movementable_id' => $report->id,
                'type' => 'RECEIVED',
            ],
        ]))
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $movement->id)
            ->assertJsonPath('data.0.snapshot.id', $snapshot->id)
            ->assertJsonPath('data.0.movement_type.value', MovementType::RECEIVED->value);
    }
}
