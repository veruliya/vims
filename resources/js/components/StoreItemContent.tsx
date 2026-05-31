import { MapPin, ChevronRight } from '@gravity-ui/icons';

import { Chip, Description, Label } from '@heroui/react';

import { Fragment } from 'react';

import type { StoreItem } from '@/types';

export function StoreItemContent({ storeItem }: { storeItem: StoreItem }) {
  return (
    <>
      <div className="flex w-full flex-col gap-1 self-start p-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Chip
              variant="soft"
              size="sm"
              color={storeItem.item.severity.chipColor}
            >
              {storeItem.item.severity.label}
            </Chip>
            <Chip
              size="sm"
              color={storeItem.item.category.chipColor}
            >
              {storeItem.item.category.label}
            </Chip>
          </div>
          <Description className="w-1/2 truncate text-right">
            {storeItem.item.subcategory}
          </Description>
        </div>
        <div className="grid grid-cols-[1fr_5rem] gap-x-1">
          <div className="flex flex-col justify-between gap-1">
            <Label className="line-clamp-2">{storeItem.item.name}</Label>
            <div className="flex items-center gap-1 text-muted">
              <MapPin className="size-3" />
              {storeItem.store.breadcrumbs.map((breadcrumb, index) => (
                <Fragment key={index}>
                  {index > 0 && <ChevronRight className="size-3" />}
                  <span
                    className={`${storeItem.store.breadcrumbs.length === index + 1 && 'font-bold text-accent'} text-xs`}
                  >
                    {breadcrumb}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Description className="text-sm font-semibold text-accent">
              {storeItem.item.unit.full_name}
            </Description>
            <Description className="text-sm font-semibold">
              {`MIN: ${storeItem.minimum_quantity}`}
            </Description>
            <Description
              className={`text-sm font-semibold ${storeItem.balance >= storeItem.minimum_quantity ? 'text-success' : 'text-danger'}`}
            >
              {`BAL: ${storeItem?.balance ?? 0}`}
            </Description>
          </div>
        </div>
      </div>
    </>
  );
}
