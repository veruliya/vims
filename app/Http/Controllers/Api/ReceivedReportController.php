<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\QueryBuilder;

use App\Models\ReceivedReport;
use App\Http\Resources\ReceivedReportResource;

class ReceivedReportController extends Controller
{
    public function index(Request $request)
    {
        $query = ReceivedReport::with([
            'createdBy',
        ]);

        $items = QueryBuilder::for($query)
            ->allowedFilters()
            ->allowedSorts('created_at')
            ->defaultSort('-created_at')
            ->cursorPaginate(20);

        return ReceivedReportResource::collection($items);
    }
}
