<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
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
            'minimum_quantity' => $this->minimum_quantity,
            'available_quantity' => $this->available_quantity,
            'condition' => [
                'value' => $this->condition->value,
                'label' => $this->condition->label(),
                'color' => $this->condition->color(),
            ],
            'item' => new ItemResource($this->whenLoaded('item')),
            'store' => new StoreResource($this->whenLoaded('store')),
        ];
    }
}
