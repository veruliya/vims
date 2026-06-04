<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

use App\Models\Movement;
use App\Http\Resources\MovementResource;

class MovementController extends Controller
{
    public function index(Request $request)
    {
        $query = Movement::with([
            'snapshot',
        ]);

        $items = QueryBuilder::for($query)
            ->allowedFilters(
                AllowedFilter::exact('movementable_id', 'movementable_id'),
                AllowedFilter::exact('type', 'type'),
            )
            ->allowedSorts('id')
            ->defaultSort('id')
            ->cursorPaginate(20);

        return MovementResource::collection($items);
    }
}
