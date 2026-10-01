<?php

namespace App\Models;

use App\Enums\TransactionReportType;
use App\Support\RomanMonth;
use Carbon\Carbon;
use Database\Factories\TransactionReportFactory;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

#[Table('transaction_reports')]

#[Fillable([
    'vessel_id',
    'created_by',
    'number',
    'transaction_report_type',
])]

#[Appends(['formatted_created_at'])]

class TransactionReport extends Model
{
    /** @use HasFactory<TransactionReportFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'transaction_report_type' => TransactionReportType::class,
        ];
    }

    public static function nextNumber(TransactionReportType $type, int $vesselId): string
    {
        $code = match ($type) {
            TransactionReportType::RECEIVED => 'REC',
            TransactionReportType::USED => 'USED',
        };

        $now = now();

        $latestNumbers = static::query()
            ->where('vessel_id', $vesselId)
            ->where('transaction_report_type', $type)
            ->lockForUpdate()
            ->pluck('number');

        $next = (int) ($latestNumbers
            ->map(fn (string $number) => (int) Str::before($number, '/'))
            ->max() ?? 0) + 1;

        return str_pad((string) $next, 3, '0', STR_PAD_LEFT)
            .'/'
            .$code
            .'/'
            .RomanMonth::from($now->month)
            .'/'
            .$now->year;
    }

    protected function formattedCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::parse($this->created_at)->format('d F Y H.i'),
        );
    }

    public function vessel()
    {
        return $this->belongsTo(Vessel::class, 'vessel_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function movements(): MorphMany
    {
        return $this->morphMany(Movement::class, 'movementable');
    }
}
