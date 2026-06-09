<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;

use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

use App\Models\ReceivedReport;
use App\Http\Resources\ReceivedReportResource;

use App\Sorts\TieBreakerSort;

class ReceivedReportController extends Controller
{
    public function index(Request $request)
    {
        $query = ReceivedReport::with([
            'createdBy',
        ])
            ->select(
                'received_reports.*',
                'users.name as creator_name',
            )
            ->join('users', 'users.id', '=', 'received_reports.created_by')
            ->where('vessel_id', 1);

        $items = QueryBuilder::for($query)
            ->allowedFilters(
                AllowedFilter::partial('name', 'createdBy.name'),
                AllowedFilter::exact('number', 'id'),
                AllowedFilter::callback('from', function ($query, $value) {
                    $query->where(
                        'received_reports.created_at',
                        '>=',
                        Carbon::parse($value)->startOfDay()
                    );
                }),

                AllowedFilter::callback('to', function ($query, $value) {
                    $query->where(
                        'received_reports.created_at',
                        '<=',
                        Carbon::parse($value)->endOfDay()
                    );
                }),
            )
            ->allowedSorts(
                'id',
                'created_at',
                AllowedSort::custom('name', new TieBreakerSort('received_reports.id'), 'creator_name'),
            )
            ->defaultSort('-created_at')
            ->cursorPaginate(20);

        return ReceivedReportResource::collection($items);
    }
}
