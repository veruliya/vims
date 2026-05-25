<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class TieBreakerSort implements Sort
{
    protected string $tieBreaker;

    public function __construct(string $tieBreaker)
    {
        $this->tieBreaker = $tieBreaker;
    }

    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $direction = $descending ? 'desc' : 'asc';

        $query
            ->orderBy($property, $direction)
            ->orderBy($this->tieBreaker, $direction);
    }
}
