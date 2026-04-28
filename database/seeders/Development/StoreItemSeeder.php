<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\Item;
use App\Models\Store;
use App\Models\StoreItem;

use App\Services\SeederUtility;

class StoreItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(SeederUtility $seederUtility): void
    {
        $items = Item::get();

        $stores = Store::get();

        try {
            DB::transaction(function () use ($items, $stores, $seederUtility) {
                foreach ($stores as $store) {
                    $category = strtoupper($store->breadcrumbs[0]);

                    $randomItems = $items->where('category', $category)->random(rand(15, 25));

                    foreach ($randomItems as $item) {

                        $dataType = $item->unit->data_type;

                        StoreItem::create([
                            'item_id' => $item->id,
                            'store_id' => $store->id,
                            'minimum_quantity' => $seederUtility->randomQuantity($dataType),
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
