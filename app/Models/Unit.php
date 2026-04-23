<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('units')]

#[Fillable([
    'short_name',
    'full_name',
    'data_type',
])]

class Unit extends Model
{
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
