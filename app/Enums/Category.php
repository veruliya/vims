<?php

namespace App\Enums;

enum Category: string
{
    case DECK = 'DECK';
    case ENGINE = 'ENGINE';

    public function label(): string
    {
        return match ($this) {
            self::DECK => 'Deck',
            self::ENGINE => 'Engine',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::DECK => 'danger',
            self::ENGINE => 'accent',
        };
    }
}
