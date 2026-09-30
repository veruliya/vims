<?php

namespace Tests\Feature\TransactionReport;

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

class ReceivedControllerTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_store_numbers_received_reports_by_type_sequence_not_global_id(): void
    {
        $this->travelTo(now()->setDate(2026, 9, 11)->setTime(12, 0));

        ['user' => $user, 'vessel' => $vessel, 'storeItem' => $storeItem] = $this->catalog();

        TransactionReport::factory()->used()->recycle([$vessel, $user])->create();

        $this->post(route('transaction-report.store'), [
            'storeItems' => [
                [
                    'id' => $storeItem->id,
                    'received_quantity' => 10,
                ],
            ],
        ])->assertRedirect(route('transaction-report.index'));

        $first = TransactionReport::query()
            ->where('transaction_report_type', 'RECEIVED')
            ->first();

        $this->assertNotNull($first);
        $this->assertSame('001/REC/IX/2026', $first->number);

        $this->post(route('transaction-report.store'), [
            'storeItems' => [
                [
                    'id' => $storeItem->id,
                    'received_quantity' => 4,
                ],
            ],
        ])->assertRedirect(route('transaction-report.index'));

        $second = TransactionReport::query()
            ->where('transaction_report_type', 'RECEIVED')
            ->orderByDesc('id')
            ->first();

        $this->assertSame('002/REC/IX/2026', $second->number);
    }

    public function test_store_reuses_snapshot_when_store_item_has_not_changed(): void
    {
        ['storeItem' => $storeItem] = $this->catalog();

        $payload = [
            'storeItems' => [
                [
                    'id' => $storeItem->id,
                    'received_quantity' => 10,
                ],
            ],
        ];

        $this->post(route('transaction-report.store'), $payload)->assertRedirect(route('transaction-report.index'));
        $this->post(route('transaction-report.store'), $payload)->assertRedirect(route('transaction-report.index'));

        $this->assertSame(1, Snapshot::count());
        $this->assertSame(2, Movement::count());

        $snapshot = Snapshot::query()->first();
        $this->assertSame(1, $snapshot->version);
        $this->assertTrue(Movement::query()->get()->every(
            fn (Movement $movement): bool => $movement->snapshot_id === $snapshot->id,
        ));
    }

    public function test_store_creates_a_new_snapshot_version_when_item_attributes_change(): void
    {
        ['item' => $item, 'storeItem' => $storeItem] = $this->catalog();

        $this->post(route('transaction-report.store'), [
            'storeItems' => [
                [
                    'id' => $storeItem->id,
                    'received_quantity' => 10,
                ],
            ],
        ])->assertRedirect(route('transaction-report.index'));

        $item->update(['name' => 'Renamed item']);

        $this->post(route('transaction-report.store'), [
            'storeItems' => [
                [
                    'id' => $storeItem->id,
                    'received_quantity' => 3,
                ],
            ],
        ])->assertRedirect(route('transaction-report.index'));

        $this->assertSame(2, Snapshot::count());

        $versions = Snapshot::query()
            ->where('store_item_id', $storeItem->id)
            ->orderBy('version')
            ->get();

        $this->assertSame([1, 2], $versions->pluck('version')->all());
        $this->assertSame('Renamed item', $versions->last()->item_name);

        $firstMovement = Movement::query()->orderBy('id')->first();
        $secondMovement = Movement::query()->orderByDesc('id')->first();

        $this->assertSame($versions->first()->id, $firstMovement->snapshot_id);
        $this->assertSame($versions->last()->id, $secondMovement->snapshot_id);
        $this->assertSame(MovementType::RECEIVED, $secondMovement->movement_type);
    }

    public function test_store_rejects_zero_received_quantity(): void
    {
        ['storeItem' => $storeItem] = $this->catalog();

        $this->from(route('transaction-report.create'))
            ->post(route('transaction-report.store'), [
                'storeItems' => [
                    [
                        'id' => $storeItem->id,
                        'received_quantity' => 0,
                    ],
                ],
            ])
            ->assertRedirect(route('transaction-report.create'))
            ->assertSessionHasErrors('storeItems.0.received_quantity');

        $this->assertSame(0, TransactionReport::count());
        $this->assertSame(0, Movement::count());
    }

    public function test_store_rejects_negative_received_quantity(): void
    {
        ['storeItem' => $storeItem] = $this->catalog();

        $this->from(route('transaction-report.create'))
            ->post(route('transaction-report.store'), [
                'storeItems' => [
                    [
                        'id' => $storeItem->id,
                        'received_quantity' => -5,
                    ],
                ],
            ])
            ->assertRedirect(route('transaction-report.create'))
            ->assertSessionHasErrors('storeItems.0.received_quantity');

        $this->assertSame(0, TransactionReport::count());
        $this->assertSame(0, Movement::count());
    }

    public function test_store_rejects_duplicate_store_item_ids(): void
    {
        ['storeItem' => $storeItem] = $this->catalog();

        $this->from(route('transaction-report.create'))
            ->post(route('transaction-report.store'), [
                'storeItems' => [
                    [
                        'id' => $storeItem->id,
                        'received_quantity' => 10,
                    ],
                    [
                        'id' => $storeItem->id,
                        'received_quantity' => 4,
                    ],
                ],
            ])
            ->assertRedirect(route('transaction-report.create'))
            ->assertSessionHasErrors('storeItems.0.id');

        $this->assertSame(0, TransactionReport::count());
        $this->assertSame(0, Movement::count());
    }

    /**
     * @return array{user: User, vessel: Vessel, unit: Unit, store: Store, item: Item, storeItem: StoreItem}
     */
    private function catalog(): array
    {
        $user = User::factory()->create();
        $vessel = Vessel::factory()->create();
        $unit = Unit::factory()->create();
        $store = Store::factory()->for($vessel)->create();
        $item = Item::factory()->for($unit)->create();
        $storeItem = StoreItem::factory()->for($store)->for($item)->create();

        return compact('user', 'vessel', 'unit', 'store', 'item', 'storeItem');
    }
}
