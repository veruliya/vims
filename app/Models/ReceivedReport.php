<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

#[Table('received_reports')]

#[Fillable([
    'vessel_id',
    'number',
    'created_by',
])]

#[Appends(['formatted_created_at'])]

class ReceivedReport extends Model
{
    protected function formattedCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::parse($this->created_at)->format('d F Y H.i'),
        );
    }

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
