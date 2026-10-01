<?php

namespace App\Models;

use Database\Factories\StoreItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Table('store_items')]

#[Fillable([
    'store_id',
    'item_id',
    'minimum_quantity',
])]

class StoreItem extends Model
{
    /** @use HasFactory<StoreItemFactory> */
    use HasFactory;

    protected $casts = [
        'minimum_quantity' => 'float',
        'balance' => 'float',
    ];

    /**
     * @param  Builder<StoreItem>  $query
     * @return Builder<StoreItem>
     */
    public function scopeWithBalance(Builder $query): Builder
    {
        return $query->addSelect([
            'balance' => Movement::query()
                ->selectRaw('COALESCE(SUM(quantity), 0)')
                ->whereColumn('store_item_id', 'store_items.id'),
        ]);
    }

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }

    public function movements()
    {
        return $this->hasMany(Movement::class);
    }

    public function snapshots()
    {
        return $this->hasMany(Snapshot::class);
    }
}
