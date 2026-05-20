<?php

namespace App\Support;

class Randomizer
{
    public static function randomQuantity(string $dataType): int | float
    {
        return $dataType === 'INTEGER'
            ? rand(0, 100)
            : self::randomDecimal(rand(1, 5), rand(6, 12));
    }

    public static function randomDecimal(int $min, int $max, int $decimals = 2): float
    {
        $scale = pow(10, $decimals);
        return mt_rand($min * $scale, $max * $scale) / $scale;
    }
}
