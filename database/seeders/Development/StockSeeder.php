<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\Stock;
use App\Models\Item;
use App\Models\Store;

use App\Enums\Condition;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = Item::get();

        $stores = Store::get();

        $conditions = Condition::cases();

        try {
            DB::transaction(function () use ($items, $stores, $conditions) {
                foreach ($stores as $store) {
                    $category = strtoupper($store->breadcrumbs[0]);

                    $randomItems = $items->where('category', $category)->random(rand(15, 25));

                    foreach ($randomItems as $item) {

                        $condition = $conditions[rand(0, 2)]->value;

                        $dataType = $item->unit->data_type;

                        Stock::create([
                            'item_id' => $item->id,
                            'store_id' => $store->id,
                            'condition' => $condition,
                            'minimum_quantity' => $this->randomQuantity($dataType),
                            'available_quantity' => $this->randomQuantity($dataType),
                        ]);
                    }
                }
            });

            $this->command->info(get_class($this) . " ran successfully");
        } catch (\Exception $e) {
            $this->command->error($e->getMessage());
        }
    }

    private function randomQuantity($dataType)
    {
        return $dataType === 'INTEGER'
            ? rand(0, 100)
            : $this->randomDecimal(rand(1, 5), rand(6, 12));
    }

    private function randomDecimal($min, $max, $decimals = 2)
    {
        $scale = pow(10, $decimals);
        return mt_rand($min * $scale, $max * $scale) / $scale;
    }
}
