<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

use App\Models\Unit;
use App\Models\Item;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = collect(json_decode(File::get(database_path('seeders/Development/data/items.json'))));

        $subcategories = collect(json_decode(File::get(database_path('seeders/Development/data/subcategories.json'))));

        $units = Unit::get();

        try {
            DB::transaction(function () use ($items, $units, $subcategories) {
                foreach ($items as $item) {

                    $unit = $units->where('short_name', $item->uom)->first();

                    $subcategory = $subcategories->where('subcategoryCode', $item->category)->first();

                    Item::create([
                        'unit_id' => $unit->id,
                        'category' => $subcategory->categoryName,
                        'subcategory' => $subcategory->subcategoryName,
                        'name' => $item->name,
                        'severity' => $subcategory->categoryName === 'ENGINE'
                            ? (rand(0, 1) === 0 ? "NON_CRITICAL" : "CRITICAL")
                            : "NON_CRITICAL",
                    ]);
                }
            });

            $this->command->info(get_class($this) . " ran successfully");
        } catch (\Exception $e) {
            $this->command->error($e->getMessage());
        }
    }
}
