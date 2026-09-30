<?php

namespace Database\Factories;

use App\Enums\TransactionReportType;
use App\Models\TransactionReport;
use App\Models\User;
use App\Models\Vessel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TransactionReport>
 */
class TransactionReportFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vessel_id' => Vessel::factory(),
            'created_by' => User::factory(),
            'number' => '001/REC/I/2026',
            'transaction_report_type' => TransactionReportType::RECEIVED,
        ];
    }

    public function used(): static
    {
        return $this->state(fn (array $attributes): array => [
            'number' => '001/USED/I/2026',
            'transaction_report_type' => TransactionReportType::USED,
        ]);
    }
}
