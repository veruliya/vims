<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreItemResource extends JsonResource
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
            'balance' => $this->balance,
            'item' => new ItemResource($this->whenLoaded('item')),
            'store' => new StoreResource($this->whenLoaded('store')),
        ];
    }
}
