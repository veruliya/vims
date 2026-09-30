<?php

namespace App\Models;

use App\Enums\Category;
use App\Enums\Severity;
use Database\Factories\SnapshotFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Table('snapshots')]

#[Fillable([
    'version',
    'store_item_id',
    'store_item_minimum_quantity',
    'store_id',
    'store_name',
    'store_breadcrumbs',
    'unit_id',
    'unit_short_name',
    'unit_full_name',
    'unit_data_type',
    'item_category',
    'item_subcategory',
    'item_name',
    'item_severity',
])]

class Snapshot extends Model
{
    /** @use HasFactory<SnapshotFactory> */
    use HasFactory;

    protected $casts = [
        'store_breadcrumbs' => 'array',
        'item_category' => Category::class,
        'item_severity' => Severity::class,
        'store_item_minimum_quantity' => 'float',
    ];

    /**
     * @return array{
     *     store_item_minimum_quantity: float,
     *     store_id: int,
     *     store_name: string,
     *     store_breadcrumbs: mixed,
     *     unit_id: int,
     *     unit_short_name: string,
     *     unit_full_name: string,
     *     unit_data_type: string,
     *     item_category: Category,
     *     item_subcategory: string,
     *     item_name: string,
     *     item_severity: Severity
     * }
     */
    public static function attributesFrom(StoreItem $storeItem): array
    {
        return [
            'store_item_minimum_quantity' => $storeItem->minimum_quantity,
            'store_id' => $storeItem->store->id,
            'store_name' => $storeItem->store->name,
            'store_breadcrumbs' => $storeItem->store->breadcrumbs,
            'unit_id' => $storeItem->item->unit->id,
            'unit_short_name' => $storeItem->item->unit->short_name,
            'unit_full_name' => $storeItem->item->unit->full_name,
            'unit_data_type' => $storeItem->item->unit->data_type,
            'item_category' => $storeItem->item->category,
            'item_subcategory' => $storeItem->item->subcategory,
            'item_name' => $storeItem->item->name,
            'item_severity' => $storeItem->item->severity,
        ];
    }

    public static function firstOrCreateVersion(StoreItem $storeItem, ?self $latest = null): self
    {
        $attributes = self::attributesFrom($storeItem);

        $latest ??= self::query()
            ->where('store_item_id', $storeItem->id)
            ->latest('version')
            ->first();

        if ($latest === null) {
            return self::create([
                'version' => 1,
                'store_item_id' => $storeItem->id,
                ...$attributes,
            ]);
        }

        $hasChanges = collect($attributes)
            ->contains(fn ($value, $key) => $latest->{$key} !== $value);

        if (! $hasChanges) {
            return $latest;
        }

        return self::create([
            'version' => $latest->version + 1,
            'store_item_id' => $storeItem->id,
            ...$attributes,
        ]);
    }

    public function storeItem()
    {
        return $this->belongsTo(StoreItem::class, 'store_item_id', 'id');
    }

    public function movements()
    {
        return $this->hasMany(Movement::class);
    }
}
