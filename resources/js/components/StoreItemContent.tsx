import { MapPin, ChevronRight } from '@gravity-ui/icons';

import { Chip, Typography } from '@heroui/react';

import { Fragment } from 'react';

import type { StoreItem } from '@/types';

export function StoreItemContent({ storeItem }: { storeItem: StoreItem }) {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_5rem] pr-1 gap-x-2">
      <div className="flex flex-col justify-between gap-y-1">
        <div className="flex items-center gap-x-1.5">
          <Chip
            variant="soft"
            size="sm"
            color={storeItem.item.category.chipColor}
          >
            {storeItem.item.category.label}
          </Chip>
          <span>&bull;</span>
          <Typography
            type="body-xs"
            weight="medium"
            className="line-clamp-1 text-muted"
          >
            {storeItem.item.subcategory}
          </Typography>
        </div>
        <Typography
          type="body-sm"
          weight="medium"
          className="line-clamp-2 h-12"
        >
          {storeItem.item.name}
        </Typography>

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
      <div className="flex flex-col items-end justify-between">
        <Chip
          variant="soft"
          size="sm"
          color={storeItem.item.severity.chipColor}
        >
          {storeItem.item.severity.label}
        </Chip>
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-[24px_1fr] w-full">
            <Typography type="body-sm" className="text-muted">MIN</Typography>
            <Typography type="body-sm" weight="semibold" className="text-right">{storeItem.minimum_quantity}</Typography>
            <Typography type="body-sm" className="text-muted">BAL</Typography>
            <Typography type="body-sm" weight="semibold" className={`text-right ${storeItem.balance >= storeItem.minimum_quantity ? 'text-success' : 'text-danger'}`}>{storeItem.balance}</Typography>
          </div>
          <Typography
            weight="bold"
            type="body-xs"
            className="text-right"
          >
            {storeItem.item.unit.full_name}
          </Typography>
        </div>
      </div>
    </div>
  );
}
