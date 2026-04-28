<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\Stock;
use App\Models\StoreItem;

use App\Enums\Condition;

use App\Services\SeederUtility;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(SeederUtility $seederUtility): void
    {
        $storeItems = StoreItem::get();

        $conditions = Condition::cases();

        try {
            DB::transaction(function () use ($storeItems, $conditions, $seederUtility) {

                foreach ($storeItems as $storeItem) {

                    $randomConditions = collect($conditions)->random(rand(1, 3));

                    $dataType = $storeItem->item->unit->data_type;

                    foreach ($randomConditions as $condition) {
                        Stock::create([
                            'store_item_id' => $storeItem->id,
                            'condition' => $condition,
                            'quantity' => $seederUtility->randomQuantity($dataType),
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
