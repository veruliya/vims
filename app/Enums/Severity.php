<?php

namespace App\Enums;

use App\Traits\HasOptions;

enum Severity: string
{
    use HasOptions;

    case CRITICAL = 'CRITICAL';
    case NON_CRITICAL = 'NON_CRITICAL';

    public function label(): string
    {
        return match ($this) {
            self::CRITICAL => 'Critical',
            self::NON_CRITICAL => 'Non-Critical',
        };
    }

    public function chipColor(): string
    {
        return match ($this) {
            self::CRITICAL => 'danger',
            self::NON_CRITICAL => 'accent',
        };
    }
}
