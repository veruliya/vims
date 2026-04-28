<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\StoreItem;
use App\Http\Resources\StoreItemResource;

class StoreItemController extends Controller
{
    public function index(Request $request)
    {
        $items = StoreItem::with([
            'store',
            'item.unit',
        ])
            ->withSum('stocks as available_quantity', 'quantity')
            ->orderBy('id')
            ->cursorPaginate(20);

        return StoreItemResource::collection($items);
    }
}
