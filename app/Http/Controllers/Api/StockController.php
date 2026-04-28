<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Stock;
use App\Http\Resources\StockResource;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $items = Stock::with([
            'store',
            'item.unit'
        ])
            ->orderBy('id')
            ->cursorPaginate(20);

        return StockResource::collection($items);
    }
}
