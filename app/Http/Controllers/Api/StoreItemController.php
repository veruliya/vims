<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreItemResource;
use App\Models\StoreItem;
use App\Sorts\TieBreakerSort;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class StoreItemController extends Controller
{
    public function index(Request $request)
    {
        $query = StoreItem::with([
            'store',
            'item.unit',
        ])
            ->select(
                'store_items.*',
                'items.name as item_name',
                'items.subcategory as item_subcategory',
                'units.full_name as unit_full_name',
            )
            ->withBalance()
            ->join('items', 'items.id', '=', 'store_items.item_id')
            ->join('units', 'units.id', '=', 'items.unit_id')
            ->whereRelation('store', 'vessel_id', 1);

        $items = QueryBuilder::for($query)
            ->allowedFilters(
                AllowedFilter::partial('name', 'item.name'),
                AllowedFilter::exact('categories', 'item.category'),
                AllowedFilter::exact('severities', 'item.severity'),
                AllowedFilter::exact('subcategories', 'item.subcategory'),
                AllowedFilter::exact('units', 'item.unit_id'),
                AllowedFilter::exact('stores', 'store_id'),
            )
            ->allowedSorts(
                AllowedSort::field('id', 'store_items.id'),
                AllowedSort::custom('balance', new TieBreakerSort('store_items.id'), 'balance'),
                AllowedSort::custom('unit', new TieBreakerSort('store_items.id'), 'unit_full_name'),
                AllowedSort::custom('name', new TieBreakerSort('store_items.id'), 'item_name'),
                AllowedSort::custom('subcategory', new TieBreakerSort('store_items.id'), 'item_subcategory'),
            )
            ->defaultSort('id')
            ->cursorPaginate(20);

        return StoreItemResource::collection($items);
    }
}
