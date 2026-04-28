<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('store_items')]

#[Fillable([
    'store_id',
    'item_id',
    'minimal_quantity',
])]

class StoreItem extends Model
{
    protected $casts = [
        'minimal_quantity'   => 'float',
        'available_quantity'   => 'float',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
