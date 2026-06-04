<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\SnapshotResource;

class MovementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'type' => [
                'value' => $this->type->value,
                'label' => $this->type->label(),
            ],
            'condition' => [
                'value' => $this->condition->value,
                'label' => $this->condition->label(),
            ],
            'snapshot' => new SnapshotResource($this->whenLoaded('snapshot')),
        ];
    }
}
