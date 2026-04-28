<?php

namespace Database\Seeders\Development;

use Illuminate\Database\Seeder;

class DevelopmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * php artisan db:seed --class=Database\Seeders\Development\DevelopmentSeeder
     */
    public function run(): void
    {
        $this->call([
            UnitSeeder::class,
            VesselSeeder::class,
            StoreSeeder::class,
            ItemSeeder::class,
            StoreItemSeeder::class,
            StockSeeder::class,
        ]);
    }
}
