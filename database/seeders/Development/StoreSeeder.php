<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\Vessel;
use App\Models\Store;

class StoreSeeder extends Seeder
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

                    $locations = array_map(function ($name) use ($vessel) {
                        return Store::create([
                            'vessel_id' => $vessel->id,
                            'parent_id' => null,
                            'name' => $name,
                            'breadcrumbs' => [$name],
                        ]);
                    }, ['Deck', 'Engine']);

                    foreach ($locations as $location) {

                        for ($i = 1; $i < rand(2, 3); $i++) {
                            $roomName = 'Room-' . $i;

                            $room = Store::create([
                                'vessel_id' => $vessel->id,
                                'parent_id' => $location->id,
                                'name' => $roomName,
                                'breadcrumbs' => [$location->name, $roomName],
                            ]);

                            for ($j = 1; $j < rand(3, 4); $j++) {
                                $shelfName = 'Shelf-' . $j;

                                Store::create([
                                    'vessel_id' => $vessel->id,
                                    'parent_id' => $room->id,
                                    'name' => $shelfName,
                                    'breadcrumbs' => [$location->name, $room->name, $shelfName],
                                ]);
                            }
                        }
                    }
                }
            });

            $this->command->info(get_class($this) . " ran successfully");
        } catch (\Exception $e) {
            $this->command->error($e->getMessage());
        }
    }
}
