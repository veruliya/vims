<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Vessel;
use App\Models\StoreItem;
use App\Models\ReceivedReport;
use App\Models\Movement;
use App\Models\Snapshot;

use App\Enums\MovementType;
use App\Enums\Condition;

use App\Support\Randomizer;
use App\Support\RomanMonth;

class ReceivedReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vessels = Vessel::get();

        $now = now();

        try {
            DB::transaction(function () use ($vessels, $now) {

                foreach ($vessels as $vessel) {
                    $receivedReportMaxId = ReceivedReport::max('id');

                    $number = str_pad($receivedReportMaxId + 1, 3, '0', STR_PAD_LEFT) . '/' . 'REC' . '/' . RomanMonth::from($now->month) . '/' .  $now->year;

                    $receivedReport = ReceivedReport::create([
                        'vessel_id' => $vessel->id,
                        'number' => $number,
                        'created_by' => User::first()->id,
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

                        $movement = Movement::create([
                            'store_item_id' => $storeItem->id,
                            'quantity' => Randomizer::randomQuantity($storeItem->item->unit->data_type),
                            'type' => MovementType::RECEIVED,
                            'condition' => Condition::NORMAL,
                            'movementable_type' => ReceivedReport::class,
                            'movementable_id' => $receivedReport->id,
                        ]);

                        Snapshot::create([
                            'movement_id' => $movement->id,
                            'store_id' => $storeItem->store->id,
                            'store_name' => $storeItem->store->name,
                            'store_breadcrumbs' => $storeItem->store->breadcrumbs,
                            'unit_id' => $storeItem->item->unit->id,
                            'unit_short_name' => $storeItem->item->unit->short_name,
                            'unit_full_name' => $storeItem->item->unit->full_name,
                            'unit_data_type' => $storeItem->item->unit->data_type,
                            'item_category' => $storeItem->item->category,
                            'item_subcategory' => $storeItem->item->subcategory,
                            'item_name' => $storeItem->item->name,
                            'item_severity' => $storeItem->item->severity,
                            'store_item_minimum_quantity' => $storeItem->minimum_quantity,
                        ]);
                    }
                }
            });

            $this->command->info(get_class($this) . " ran successfully");
        } catch (\Exception $e) {

            $this->command->error($e->getMessage());
        }
    }
}
