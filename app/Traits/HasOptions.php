<?php

namespace App\Traits;

trait HasOptions
{
    public static function options(): array
    {
        return array_map(
            fn($case) => array_filter([
                'value' => $case->value,
                'label' => $case->label(),
                'chipColor' => method_exists($case, 'chipColor') ? $case->chipColor() : null,
            ], fn($v) => $v !== null),
            self::cases()
        );
    }
}