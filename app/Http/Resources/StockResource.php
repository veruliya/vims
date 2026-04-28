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
            'quantity' => $this->available_quantity,
            'condition' => [
                'value' => $this->condition->value,
                'label' => $this->condition->label(),
                'color' => $this->condition->color(),
            ],
            'store_item' => new StoreItemResource($this->whenLoaded('storeItem')),
        ];
    }
}
