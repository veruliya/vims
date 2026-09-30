<?php

namespace App\Models;

use Database\Factories\VesselFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Table('vessels')]

#[Fillable([
    'name',
])]

class Vessel extends Model
{
    /** @use HasFactory<VesselFactory> */
    use HasFactory;

    public function stores()
    {
        return $this->hasMany(Store::class);
    }
}
