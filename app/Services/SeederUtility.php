<?php

namespace App\Services;

class SeederUtility
{
    public function randomQuantity(string $dataType): int | float
    {
        return $dataType === 'INTEGER'
            ? rand(0, 100)
            : $this->randomDecimal(rand(1, 5), rand(6, 12));
    }

    private function randomDecimal(int $min, int $max, int $decimals = 2): float
    {
        $scale = pow(10, $decimals);
        return mt_rand($min * $scale, $max * $scale) / $scale;
    }
}
