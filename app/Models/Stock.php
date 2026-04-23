<?php

namespace App\Models;

use App\Enums\Condition;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('stocks')]

#[Fillable([
    'item_id',
    'store_id',
    'condition',
    'minimum_quantity',
    'available_quantity',
])]

class Stock extends Model
{
    protected $casts = [
        'minimum_quantity'   => 'float',
        'available_quantity'   => 'float',
        'condition' => Condition::class,
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }
}
