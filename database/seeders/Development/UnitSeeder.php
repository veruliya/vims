<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use App\Models\Unit;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = [
            ["short_name" => "VOL", "full_name" => "Volume", "data_type" => "DECIMAL"],
            ["short_name" => "CTN", "full_name" => "Carton", "data_type" => "INTEGER"],
            ["short_name" => "KIT", "full_name" => "Kit", "data_type" => "INTEGER"],
            ["short_name" => "DOZ", "full_name" => "Dozen", "data_type" => "INTEGER"],
            ["short_name" => "BOX", "full_name" => "Box", "data_type" => "INTEGER"],
            ["short_name" => "TIM", "full_name" => "Time/Hour", "data_type" => "DECIMAL"],
            ["short_name" => "PKT", "full_name" => "Packet", "data_type" => "INTEGER"],
            ["short_name" => "BAL", "full_name" => "Ball", "data_type" => "INTEGER"],
            ["short_name" => "TUB", "full_name" => "Tub", "data_type" => "INTEGER"],
            ["short_name" => "BTL", "full_name" => "Bottle", "data_type" => "INTEGER"],
            ["short_name" => "PKG", "full_name" => "Package", "data_type" => "INTEGER"],
            ["short_name" => "CL", "full_name" => "Centiliter", "data_type" => "DECIMAL"],
            ["short_name" => "LGH", "full_name" => "Length", "data_type" => "DECIMAL"],
            ["short_name" => "SET", "full_name" => "Set", "data_type" => "INTEGER"],
            ["short_name" => "CAN", "full_name" => "Can", "data_type" => "INTEGER"],
            ["short_name" => "CS", "full_name" => "Case", "data_type" => "INTEGER"],
            ["short_name" => "LTR", "full_name" => "Liter", "data_type" => "DECIMAL"],
            ["short_name" => "M3", "full_name" => "Cubic Meter", "data_type" => "DECIMAL"],
            ["short_name" => "PCS", "full_name" => "Pieces", "data_type" => "INTEGER"],
            ["short_name" => "CYL", "full_name" => "Cylinder", "data_type" => "INTEGER"],
            ["short_name" => "CT", "full_name" => "Carton/Count", "data_type" => "INTEGER"],
            ["short_name" => "TON", "full_name" => "Ton", "data_type" => "DECIMAL"],
            ["short_name" => "DRM", "full_name" => "Drum", "data_type" => "INTEGER"],
            ["short_name" => "MTR", "full_name" => "Meter", "data_type" => "DECIMAL"],
            ["short_name" => "PAK", "full_name" => "Pack", "data_type" => "INTEGER"],
            ["short_name" => "PRS", "full_name" => "Pairs", "data_type" => "INTEGER"],
            ["short_name" => "SPL", "full_name" => "Spool", "data_type" => "INTEGER"],
            ["short_name" => "SHT", "full_name" => "Sheet", "data_type" => "INTEGER"],
            ["short_name" => "BDL", "full_name" => "Bundle", "data_type" => "INTEGER"],
            ["short_name" => "RLS", "full_name" => "Rolls", "data_type" => "INTEGER"],
            ["short_name" => "JAR", "full_name" => "Jar", "data_type" => "INTEGER"],
            ["short_name" => "KEG", "full_name" => "Keg", "data_type" => "INTEGER"],
            ["short_name" => "BAG", "full_name" => "Bag", "data_type" => "INTEGER"],
            ["short_name" => "HNK", "full_name" => "Hank", "data_type" => "DECIMAL"],
            ["short_name" => "CUP", "full_name" => "Cup", "data_type" => "DECIMAL"],
            ["short_name" => "BKT", "full_name" => "Bucket", "data_type" => "INTEGER"],
            ["short_name" => "PAD", "full_name" => "Pad", "data_type" => "INTEGER"],
            ["short_name" => "TIN", "full_name" => "Tin", "data_type" => "INTEGER"],
            ["short_name" => "BCH", "full_name" => "Bunch", "data_type" => "INTEGER"],
            ["short_name" => "TAB", "full_name" => "Tablets", "data_type" => "INTEGER"],
            ["short_name" => "GRS", "full_name" => "Gross", "data_type" => "INTEGER"],
            ["short_name" => "KGS", "full_name" => "Kilograms", "data_type" => "DECIMAL"],
        ];

        try {
            DB::transaction(function () use ($units) {
                foreach ($units as $unit) {
                    Unit::create([
                        'short_name' => $unit['short_name'],
                        'full_name' => $unit['full_name'],
                        'data_type' => $unit['data_type'],
                    ]);
                }
            });

            $this->command->info(get_class($this) . " ran successfully");
        } catch (\Exception $e) {
            $this->command->error($e->getMessage());
        }
    }
}
