<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
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
            'name' => $this->name,
            'category' => [
                'value' => $this->category->value,
                'label' => $this->category->label(),
                'color' => $this->category->color(),
            ],
            'subcategory' => $this->subcategory,
            'severity' => [
                'value' => $this->severity->value,
                'label' => $this->severity->label(),
                'color' => $this->severity->color(),
            ],
            'unit' => new UnitResource($this->whenLoaded('unit')),
        ];
    }
}
