<?php

namespace Database\Seeders\Development\TransactionReport;

use App\Enums\Condition;
use App\Enums\MovementType;
use App\Enums\TransactionReportType;
use App\Models\Movement;
use App\Models\Snapshot;
use App\Models\StoreItem;
use App\Models\TransactionReport;
use App\Models\User;
use App\Models\Vessel;
use App\Support\Randomizer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReceivedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vessels = Vessel::get();

        try {
            DB::transaction(function () use ($vessels) {

                foreach ($vessels as $vessel) {
                    $received = TransactionReport::create([
                        'vessel_id' => $vessel->id,
                        'number' => TransactionReport::nextNumber(TransactionReportType::RECEIVED),
                        'created_by' => User::first()->id,
                        'transaction_report_type' => TransactionReportType::RECEIVED,
                    ]);

                    $storeItems = StoreItem::with([
                        'store',
                        'item.unit',
                    ])
                        ->whereRelation('store', 'vessel_id', $vessel->id)
                        ->get();

                    $randomStoreItems = $storeItems
                        ->random(rand(
                            round($storeItems->count() * 8 / 10),
                            round($storeItems->count() * 9 / 10)
                        ));

                    foreach ($randomStoreItems as $storeItem) {

                        $snapshot = Snapshot::firstOrCreateVersion($storeItem);

                        Movement::create([
                            'snapshot_id' => $snapshot->id,
                            'store_item_id' => $storeItem->id,
                            'quantity' => Randomizer::randomQuantity($storeItem->item->unit->data_type),
                            'movement_type' => MovementType::RECEIVED,
                            'condition' => Condition::NORMAL,
                            'movementable_type' => TransactionReport::class,
                            'movementable_id' => $received->id,
                        ]);

                    }
                }
            });

            $this->command->info(get_class($this).' ran successfully');
        } catch (\Exception $e) {

            $this->command->error($e->getMessage());
        }
    }
}
