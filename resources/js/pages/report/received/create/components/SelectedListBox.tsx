import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Tray,
  TrashBin,
} from '@gravity-ui/icons';

import {
  Button,
  Chip,
  Collection,
  Description,
  EmptyState,
  Label,
  ListBox,
} from '@heroui/react';

import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import type { StoreItem } from '@/types';

import { useSelected } from '../contexts/SelectedContext';
import { SelectedModal } from './SelectedModal';

export function SelectedListBox() {
  const { form } = useSelected();

  function removeStoreItem(id: StoreItem['id']) {
    form.setData((data) => ({
      ...data,
      storeItems: data.storeItems.filter((storeItem) => storeItem.id !== id),
    }));
  }

  return (
    <ListBox
      aria-label="Selected Store Items"
      renderEmptyState={() => (
        <EmptyState className="flex h-24 flex-col items-center justify-center gap-4">
          <Tray className="size-8" />
          <span>No data available.</span>
        </EmptyState>
      )}
      className="gap-4"
    >
      <Collection items={form.data.storeItems}>
        {(storeItem) => (
          <ListBox.Item
            id={storeItem.id}
            textValue={storeItem.item.name}
            className={cn(
              storeItem.updated_quantity !== 0 &&
                'border-success bg-success/10',
              'h-52 rounded-xl border shadow-md transition-all',
            )}
          >
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex flex-row gap-2 pt-2">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <Chip
                      variant="soft"
                      size="sm"
                      color={storeItem.item.severity.color}
                    >
                      {storeItem.item.severity.label}
                    </Chip>
                    <Chip
                      size="sm"
                      color={storeItem.item.category.color}
                    >
                      {storeItem.item.category.label}
                    </Chip>
                  </div>
                  <Description>{storeItem.item.subcategory}</Description>
                  <Label>{storeItem.item.name}</Label>
                  <div className="flex items-center gap-1 text-sm text-muted">
                    <MapPin className="size-3" />
                    {storeItem.store.breadcrumbs.map((breadcrumb, index) => (
                      <Fragment key={index}>
                        {index > 0 && <ChevronRight className="size-3" />}
                        <span
                          className={`${storeItem.store.breadcrumbs.length === index + 1 && 'font-bold'} text-sm`}
                        >
                          {breadcrumb}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Description className="text-sm font-semibold">
                    {storeItem.item.unit.full_name}
                  </Description>
                  <Description className="text-sm font-semibold text-accent">
                    {`MIN: ${storeItem.minimum_quantity}`}
                  </Description>
                  <Description
                    className={`text-sm font-semibold ${storeItem.available_quantity >= storeItem.minimum_quantity ? 'text-success' : 'text-danger'}`}
                  >
                    {`AVL: ${storeItem.available_quantity}`}
                  </Description>
                </div>
              </div>
              <div className="flex justify-between">
                <SelectedModal storeItem={storeItem} />
                <div className="flex flex-row items-center gap-2">
                  <span className="text-base font-semibold text-success">
                    {`+${storeItem.updated_quantity}`}
                  </span>
                  <ArrowRight />
                  <span className="text-base font-semibold text-accent">
                    {Number(
                      storeItem.available_quantity + storeItem.updated_quantity,
                    ).toFixed(2)}
                  </span>
                </div>
                <Button
                  isIconOnly
                  variant="danger"
                  className="shrink-0"
                  onPress={() => removeStoreItem(storeItem.id)}
                >
                  <TrashBin />
                </Button>
              </div>
            </div>
          </ListBox.Item>
        )}
      </Collection>
    </ListBox>
  );
}
