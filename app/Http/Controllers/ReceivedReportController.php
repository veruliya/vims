<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

use Inertia\Inertia;

use Illuminate\Support\Facades\DB;

use App\Enums\Severity;
use App\Enums\Category;

use App\Http\Requests\CreateReceivedReportRequest;

use App\Models\Item;
use App\Models\Unit;
use App\Models\Store;
use App\Models\StoreItem;
use App\Models\ReceivedReport;
use App\Models\Movement;
use App\Models\User;

use App\Enums\MovementType;
use App\Enums\Condition;

use App\Support\RomanMonth;

class ReceivedReportController extends Controller
{
    public function index()
    {
        return Inertia::render('received-report/index');
    }

    public function create()
    {
        $props = [
            'filterOptions' => [
                'categories' => Category::options(),
                'severities' => Severity::options(),
                'subcategories' => Item::select('subcategory')
                    ->distinct()
                    ->orderBy('subcategory')
                    ->get()
                    ->map(function ($item) {
                        return [
                            'value' => $item->subcategory,
                            'label' => $item->subcategory,
                        ];
                    }),
                'units' => Unit::select('id', 'full_name')
                    ->orderBy('full_name')
                    ->get()
                    ->map(function ($unit) {
                        return [
                            'value' => $unit->id,
                            'label' => $unit->full_name,
                        ];
                    }),
                'stores' => Store::select('id', 'name', 'parent_id')
                    ->with('descendants')
                    ->where('vessel_id', 1)
                    ->whereNull('parent_id')
                    ->get(),
            ],
        ];

        return Inertia::render('received-report/create', $props);
    }

    public function store(CreateReceivedReportRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validatedStoreItems = collect($validated['storeItems']);

        $storeItems = StoreItem::with([
            'store',
            'item.unit',
        ])
            ->whereIn('id', $validatedStoreItems->pluck('id'))
            ->get()
            ->keyBy('id');

        DB::transaction(function () use ($validatedStoreItems, $storeItems): void {
            $now = now();

            $receivedReportMaxId = ReceivedReport::max('id');

            $number = str_pad($receivedReportMaxId + 1, 3, '0', STR_PAD_LEFT)
                . '/REC/'
                . RomanMonth::from($now->month)
                . '/'
                . $now->year;

            $receivedReport = ReceivedReport::create([
                'vessel_id' => 1,
                'number' => $number,
                'created_by' => User::first()->id,
            ]);

            foreach ($validatedStoreItems as $validatedStoreItem) {
                $storeItem = $storeItems->get($validatedStoreItem['id']);

                Movement::create([
                    'store_item_id' => $storeItem->id,
                    'store_item_snapshot' => [
                        'store_name' => $storeItem->store->name,
                        'store_breadcrumbs' => $storeItem->store->breadcrumbs,
                        'unit_short_name' => $storeItem->item->unit->short_name,
                        'unit_full_name' => $storeItem->item->unit->full_name,
                        'unit_data_type' => $storeItem->item->unit->data_type,
                        'item_category' => $storeItem->item->category,
                        'item_subcategory' => $storeItem->item->subcategory,
                        'item_name' => $storeItem->item->name,
                        'item_severity' => $storeItem->item->severity,
                        'store_item_minimum_quantity' => $storeItem->minimum_quantity,
                    ],
                    'quantity' => (float) $validatedStoreItem['received_quantity'],
                    'type' => MovementType::RECEIVED,
                    'condition' => Condition::NORMAL,
                    'movementable_type' => ReceivedReport::class,
                    'movementable_id' => $receivedReport->id,
                ]);
            }
        });

        return to_route('report.received.index');
    }
}
