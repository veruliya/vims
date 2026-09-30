<?php

namespace Database\Factories;

use App\Enums\Category;
use App\Enums\Severity;
use App\Models\Item;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unit_id' => Unit::factory(),
            'category' => Category::DECK,
            'subcategory' => 'Paint',
            'name' => fake()->unique()->words(3, true),
            'severity' => Severity::NON_CRITICAL,
        ];
    }
}
