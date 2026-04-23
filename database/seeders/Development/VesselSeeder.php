<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\Vessel;

class VesselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vesselNames = [
            "Etzomer 501",
            "Etzomer 1601",
            "Suberko 01",
            "Anggrek 601",
            "Arian 4002",
            "KCT 4001",
            "S Java Sea",
            "EP Alfa",
            "Etzomer 502",
            "Etzomer 503",
            "Aldwin 3002",
            "Arkarega",
            "Etzomer 505",
            "Etzomer 504",
        ];

        try {
            DB::transaction(function () use ($vesselNames) {
                foreach ($vesselNames as $vesselName) {
                    Vessel::create([
                        'name' => $vesselName,
                    ]);
                }
            });

            $this->command->info(get_class($this) . " ran successfully");
        } catch (\Exception $e) {
            $this->command->error($e->getMessage());
        }
    }
}
