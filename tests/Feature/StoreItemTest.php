<?php

namespace Tests\Feature;

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
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class StoreItemTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_store_items_cannot_duplicate_store_and_item(): void
    {
        $vessel = Vessel::factory()->create();
        $store = Store::factory()->for($vessel)->create();
        $item = Item::factory()->create();

        StoreItem::factory()->for($store)->for($item)->create();

        $this->expectException(QueryException::class);

        StoreItem::factory()->for($store)->for($item)->create();
    }

    public function test_index_returns_balance_from_with_balance_scope(): void
    {
        $user = User::factory()->create();
        $vessel = Vessel::factory()->create();
        $this->assertSame(1, $vessel->id);

        $unit = Unit::factory()->create();
        $store = Store::factory()->for($vessel)->create();
        $item = Item::factory()->for($unit)->create();
        $storeItem = StoreItem::factory()->for($store)->for($item)->create();

        $report = TransactionReport::factory()->recycle([$vessel, $user])->create();
        $snapshot = Snapshot::firstOrCreateVersion($storeItem->load(['store', 'item.unit']));

        Movement::factory()->create([
            'store_item_id' => $storeItem->id,
            'snapshot_id' => $snapshot->id,
            'quantity' => 12.5,
            'movement_type' => MovementType::RECEIVED,
            'movementable_type' => TransactionReport::class,
            'movementable_id' => $report->id,
        ]);

        $this->getJson('/api/store-items')
            ->assertOk()
            ->assertJsonPath('data.0.id', $storeItem->id)
            ->assertJsonPath('data.0.balance', 12.5);
    }
}
