<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('vessels')]

#[Fillable([
    'name',
])]

class Vessel extends Model
{
    public function stores()
    {
        return $this->hasMany(Store::class);
    }
}
