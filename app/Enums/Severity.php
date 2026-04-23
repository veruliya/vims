<?php

namespace App\Enums;

enum Severity: string
{
    case CRITICAL = 'CRITICAL';
    case NON_CRITICAL = 'NON_CRITICAL';

    public function label(): string
    {
        return match ($this) {
            self::CRITICAL => 'Critical',
            self::NON_CRITICAL => 'Non-Critical',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::CRITICAL => 'danger',
            self::NON_CRITICAL => 'accent',
        };
    }
}
