<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;

use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

use App\Models\TransactionReport;
use App\Http\Resources\TransactionReportResource;

use App\Sorts\TieBreakerSort;

class TransactionReportController extends Controller
{
    public function index(Request $request)
    {
        $query = TransactionReport::with([
            'createdBy',
        ])
            ->select(
                'transaction_reports.*',
                'users.name as creator_name',
            )
            ->join('users', 'users.id', '=', 'transaction_reports.created_by')
            ->where('vessel_id', 1);

        $items = QueryBuilder::for($query)
            ->allowedFilters(
                AllowedFilter::exact('type', 'transaction_report_type'),
                AllowedFilter::partial('name', 'createdBy.name'),
                AllowedFilter::exact('number', 'id'),
                AllowedFilter::callback('from', function ($query, $value) {
                    $query->where(
                        'transaction_reports.created_at',
                        '>=',
                        Carbon::parse($value)->startOfDay()
                    );
                }),

                AllowedFilter::callback('to', function ($query, $value) {
                    $query->where(
                        'transaction_reports.created_at',
                        '<=',
                        Carbon::parse($value)->endOfDay()
                    );
                }),
            )
            ->allowedSorts(
                'id',
                'created_at',
                AllowedSort::custom('name', new TieBreakerSort('transaction_reports.id'), 'creator_name'),
            )
            ->defaultSort('-created_at')
            ->cursorPaginate(20);

        return TransactionReportResource::collection($items);
    }
}
