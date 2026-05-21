<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;

#[Table('received_reports')]

#[Fillable([
    'vessel_id',
    'number',
    'created_by',
])]

class ReceivedReport extends Model
{
    public function vessel()
    {
        return $this->belongsTo(Vessel::class, 'vessel_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function movements(): MorphMany
    {
        return $this->morphMany(Movement::class, 'movementable');
    }
}
