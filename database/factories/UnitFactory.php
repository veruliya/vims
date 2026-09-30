<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Unit>
 */
class UnitFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'short_name' => fake()->unique()->lexify('???'),
            'full_name' => fake()->unique()->words(2, true),
            'data_type' => 'INTEGER',
        ];
    }
}
