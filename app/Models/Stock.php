<?php

namespace App\Models;

use App\Enums\Condition;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('stocks')]

#[Fillable([
    'store_item_id',
    'condition',
    'quantity',
])]

class Stock extends Model
{
    protected $casts = [
        'quantity'   => 'float',
        'condition' => Condition::class,
    ];

    public function storeItem()
    {
        return $this->belongsTo(StoreItem::class, 'store_item_id', 'id');
    }
}
