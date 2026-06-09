<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

use App\Models\Movement;
use App\Http\Resources\MovementResource;

use App\Sorts\TieBreakerSort;

class MovementController extends Controller
{
    public function index(Request $request)
    {
        $query = Movement::with([
            'snapshot',
        ])
            ->select(
                'movements.*',
                'snapshots.*',
            )
            ->join('snapshots', 'snapshots.movement_id', '=', 'movements.id');

        $items = QueryBuilder::for($query)
            ->allowedFilters(
                AllowedFilter::exact('movementable_id', 'movementable_id'),
                AllowedFilter::exact('type', 'type'),
                AllowedFilter::partial('name', 'snapshot.item_name'),
                AllowedFilter::exact('categories', 'snapshot.item_category'),
                AllowedFilter::exact('severities', 'snapshot.item_severity'),
                AllowedFilter::exact('subcategories', 'snapshot.item_subcategory'),
                AllowedFilter::exact('units', 'snapshot.unit_id'),
                AllowedFilter::exact('stores', 'snapshot.store_id'),
            )
            ->allowedSorts(
                AllowedSort::field('id', 'movements.id'),
                AllowedSort::custom('quantity', new TieBreakerSort('movements.id'), 'movements.quantity'),
                AllowedSort::custom('unit', new TieBreakerSort('movements.id'), 'snapshots.unit_full_name'),
                AllowedSort::custom('name', new TieBreakerSort('movements.id'), 'snapshots.item_name'),
                AllowedSort::custom('subcategory', new TieBreakerSort('movements.id'), 'snapshots.item_subcategory'),
            )
            ->defaultSort('id')
            ->cursorPaginate(20);

        return MovementResource::collection($items);
    }
}
