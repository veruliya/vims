<?php

namespace App\Http\Controllers\View\TransactionReport;

use App\Enums\Category;
use App\Enums\Condition;
use App\Enums\MovementType;
use App\Enums\Severity;
use App\Enums\TransactionReportType;
use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionReport\CreateReceivedRequest;
use App\Http\Resources\TransactionReportResource;
use App\Models\Item;
use App\Models\Movement;
use App\Models\Snapshot;
use App\Models\Store;
use App\Models\StoreItem;
use App\Models\TransactionReport;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReceivedController extends Controller
{
    public function index()
    {
        $props = [
            'backUrl' => null,
            'breadcrumbs' => [
                [
                    'url' => '/',
                    'title' => 'Home',
                ],
                [
                    'url' => '#/transaction-report',
                    'title' => 'Transaction Report',
                ],
                [
                    'url' => '/transaction-report/received',
                    'title' => 'Received',
                ],
            ],
        ];

        return Inertia::render('transaction-report/index', $props);
    }

    public function create()
    {
        $props = [
            'backUrl' => '/transaction-report/received',
            'breadcrumbs' => [
                [
                    'url' => '/',
                    'title' => 'Home',
                ],
                [
                    'url' => '#/transaction-report',
                    'title' => 'Transaction Report',
                ],
                [
                    'url' => '/transaction-report/received',
                    'title' => 'Received',
                ],
                [
                    'url' => '/transaction-report/received/create',
                    'title' => 'Create',
                ],
            ],
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

        return Inertia::render('transaction-report/create', $props);
    }

    public function store(CreateReceivedRequest $request): RedirectResponse
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
            StoreItem::whereIn('id', $storeItems->keys())->lockForUpdate()->get();

            $receivedReport = TransactionReport::create([
                'vessel_id' => 1,
                'number' => TransactionReport::nextNumber(TransactionReportType::RECEIVED),
                'created_by' => User::first()->id,
                'transaction_report_type' => TransactionReportType::RECEIVED,
            ]);

            $latestByStoreItemId = Snapshot::query()
                ->whereIn('store_item_id', $storeItems->keys())
                ->orderByDesc('version')
                ->get()
                ->unique('store_item_id')
                ->keyBy('store_item_id');

            foreach ($validatedStoreItems as $validatedStoreItem) {
                $storeItem = $storeItems->get($validatedStoreItem['id']);

                $snapshot = Snapshot::firstOrCreateVersion(
                    $storeItem,
                    $latestByStoreItemId->get($storeItem->id),
                );

                $latestByStoreItemId->put($storeItem->id, $snapshot);

                Movement::create([
                    'snapshot_id' => $snapshot->id,
                    'store_item_id' => $storeItem->id,
                    'quantity' => (float) $validatedStoreItem['received_quantity'],
                    'movement_type' => MovementType::RECEIVED,
                    'condition' => Condition::NORMAL,
                    'movementable_type' => TransactionReport::class,
                    'movementable_id' => $receivedReport->id,
                ]);
            }
        });

        return to_route('transaction-report.index');
    }

    public function show(string $id)
    {
        $receivedReport = TransactionReport::with(['createdBy'])->findOrFail($id);

        $props = [
            'backUrl' => '/transaction-report/received',
            'breadcrumbs' => [
                [
                    'url' => '/',
                    'title' => 'Home',
                ],
                [
                    'url' => '#/transaction-report',
                    'title' => 'Transaction Report',
                ],
                [
                    'url' => '/transaction-report/received',
                    'title' => 'Received',
                ],
                [
                    'url' => '/transaction-report/received/show'."/{$receivedReport->id}",
                    'title' => $receivedReport->number,
                ],
            ],
            'receivedReport' => (new TransactionReportResource($receivedReport))->resolve(),
            'movementsCount' => $receivedReport->movements()->count(),
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

        return Inertia::render('transaction-report/show', $props);
    }
}
