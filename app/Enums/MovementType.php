<?php

namespace App\Enums;

/**
 * Movement quantity is a signed ledger amount.
 *
 * RECEIVED stores positive quantities. Future depleting types (USED, and
 * similarly TRANSFER/ASSESSMENT when implemented) must store negative
 * quantities so balance remains SUM(movements.quantity).
 */
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
