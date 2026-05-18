<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Enums\Severity;
use App\Enums\Category;

use App\Models\Item;
use App\Models\Unit;
use App\Models\Store;

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
}
