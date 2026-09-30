<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\Vessel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Store>
 */
class StoreFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);

        return [
            'vessel_id' => Vessel::factory(),
            'parent_id' => null,
            'name' => $name,
            'breadcrumbs' => ['DECK', $name],
        ];
    }
}
