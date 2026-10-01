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
            'transaction_report_type' => TransactionReportType::RECEIVED,
            'number' => function (array $attributes): string {
                $vesselId = $attributes['vessel_id'] instanceof Vessel
                    ? $attributes['vessel_id']->id
                    : $attributes['vessel_id'];

                $type = $attributes['transaction_report_type'] ?? TransactionReportType::RECEIVED;

                if (is_string($type)) {
                    $type = TransactionReportType::from($type);
                }

                return TransactionReport::nextNumber($type, (int) $vesselId);
            },
        ];
    }

    public function used(): static
    {
        return $this->state(fn (array $attributes): array => [
            'transaction_report_type' => TransactionReportType::USED,
        ]);
    }
}
