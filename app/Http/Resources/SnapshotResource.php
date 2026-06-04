<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SnapshotResource extends JsonResource
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
            'store_name' => $this->store_name,
            'store_breadcrumbs' => $this->store_breadcrumbs,
            'unit_short_name' => $this->unit_short_name,
            'unit_full_name' => $this->unit_full_name,
            'unit_data_type' => $this->unit_data_type,
            'item_category' => [
                'value' => $this->item_category->value,
                'label' => $this->item_category->label(),
                'chipColor' => $this->item_category->chipColor(),
            ],
            'item_subcategory' => $this->item_subcategory,
            'item_name' => $this->item_name,
            'item_severity' => [
                'value' => $this->item_severity->value,
                'label' => $this->item_severity->label(),
                'chipColor' => $this->item_severity->chipColor(),
            ],
            'store_item_minimum_quantity' => $this->store_item_minimum_quantity,
        ];
    }
}
