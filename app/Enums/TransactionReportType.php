<?php

namespace App\Enums;

enum TransactionReportType: string
{
    case RECEIVED = 'RECEIVED';
    case USED = 'USED';

    public function label(): string
    {
        return match ($this) {
            self::RECEIVED => 'Received',
            self::USED => 'Used',
        };
    }
}
