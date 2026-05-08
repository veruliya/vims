<?php

namespace App\Enums;

use App\Traits\HasOptions;

enum Category: string
{
    use HasOptions;
    
    case DECK = 'DECK';
    case ENGINE = 'ENGINE';

    public function label(): string
    {
        return match ($this) {
            self::DECK => 'Deck',
            self::ENGINE => 'Engine',
        };
    }

    public function chipColor(): string
    {
        return match ($this) {
            self::DECK => 'accent',
            self::ENGINE => 'danger',
        };
    }
}
