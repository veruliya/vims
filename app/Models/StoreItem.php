<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('store_items')]

#[Fillable([
    'store_id',
    'item_id',
    'minimum_quantity',
])]

class StoreItem extends Model
{
    protected $casts = [
        'minimum_quantity'   => 'float',
        'balance'   => 'float',
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

    public function movements()
    {
        return $this->hasMany(Movement::class);
    }

    public function snapshot()
    {
        return $this->hasOne(Snapshot::class);
    }
}
