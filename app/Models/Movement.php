<?php

namespace App\Models;

use App\Enums\Condition;
use App\Enums\MovementType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;

#[Table('movements')]

#[Fillable([
    'store_item_id',
    'quantity',
    'type',
    'condition',
    'movementable_type',
    'movementable_id',
])]

class Movement extends Model
{
    protected function casts(): array
    {
        return [
            'quantity'   => 'float',
            'type' => MovementType::class,
            'condition' => Condition::class,
        ];
    }

    public function storeItem()
    {
        return $this->belongsTo(StoreItem::class, 'store_item_id', 'id');
    }

    public function snapshot()
    {
        return $this->hasOne(Snapshot::class);
    }

    public function movementable(): MorphTo
    {
        return $this->morphTo();
    }
}
