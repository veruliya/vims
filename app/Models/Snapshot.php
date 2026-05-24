<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Category;
use App\Enums\Severity;

#[Table('snapshots')]

#[Fillable([
    'movement_id',
    'store_name',
    'store_breadcrumbs',
    'unit_short_name',
    'unit_full_name',
    'unit_data_type',
    'item_category',
    'item_subcategory',
    'item_name',
    'item_severity',
    'store_item_minimum_quantity',
])]

class Snapshot extends Model
{
    protected $casts = [
        'store_breadcrumbs' => 'array',
        'item_category' => Category::class,
        'item_severity' => Severity::class,
        'store_item_minimum_quantity'   => 'float',
    ];

    public function movement()
    {
        return $this->belongsTo(Movement::class, 'movement_id', 'id');
    }
}
