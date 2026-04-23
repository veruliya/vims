<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('stores')]

#[Fillable([
    'vessel_id',
    'parent_id',
    'name',
    'breadcrumbs',
])]

class Store extends Model
{
    protected function casts(): array
    {
        return [
            'breadcrumbs' => 'array',
        ];
    }

    public function vessel()
    {
        return $this->belongsTo(Vessel::class, 'vessel_id', 'id');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }

    public function parent()
    {
        return $this->belongsTo(Store::class, 'parent_id', 'id');
    }

    public function children()
    {
        return $this->hasMany(Store::class, 'parent_id', 'id');
    }
}
