<?php

namespace App\Enums;

enum MovementType: string
{
    case RECEIVED = 'RECEIVED';
    case USED = 'USED';
    case TRANSFER = 'TRANSFER';
    case ASSESSMENT = 'ASSESSMENT';

    public function label(): string
    {
        return match ($this) {
            self::RECEIVED => 'Received',
            self::USED => 'Used',
            self::TRANSFER => 'Transfer',
            self::ASSESSMENT => 'Assessment',
        };
    }
}
