<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Category;
use App\Enums\Severity;

#[Table('items')]

#[Fillable([
    'unit_id',
    'category',
    'subcategory',
    'name',
    'severity',
])]

class Item extends Model
{
    protected $casts = [
        'category' => Category::class,
        'severity' => Severity::class,
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id', 'id');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
