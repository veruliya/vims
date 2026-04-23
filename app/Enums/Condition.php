<?php

namespace App\Enums;

enum Condition: string
{
    case NORMAL = 'NORMAL';
    case DEGRADED = 'DEGRADED';
    case INOPERABLE = 'INOPERABLE';

    public function label(): string
    {
        return match ($this) {
            self::NORMAL => 'Normal',
            self::DEGRADED => 'Degraded',
            self::INOPERABLE => 'Inoperable',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::NORMAL => 'success',
            self::DEGRADED => 'warning',
            self::INOPERABLE => 'danger',
        };
    }
}
