import { Tray, MapPin, ChevronRight } from '@gravity-ui/icons';

import {
  Collection,
  Chip,
  Description,
  EmptyState,
  Label,
  ListBox,
  ListBoxLoadMoreItem,
  Spinner,
} from '@heroui/react';
import type { Selection } from '@heroui/react';

import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import type { StoreItem } from '@/types';

import { useSelected } from '../contexts/SelectedContext';
import { useSelection } from '../contexts/SelectionContext';

import type { StoreItemWithUpdatedQuantity } from '../types';

export function SelectionListBox() {
  const { selectedKeys, form } = useSelected();
  const { http, storeItems, hasMore, loadMore, storeItemsMap } = useSelection();

  function handleSelectionChange(keys: Selection) {
    if (keys === 'all') {
      return;
    }

    form.setData(
      'storeItems',
      Array.from(keys)
        .map((key) => {
          if (form.data.storeItems.map((storeItem) => storeItem.id).includes(Number(key))) {
            return form.data.storeItems.find((storeItem) => storeItem.id === Number(key));
          }

          return {
            ...storeItemsMap.get(String(key)),
            updated_quantity: 0,
          };
        })
        .filter(Boolean) as StoreItemWithUpdatedQuantity[],
    );
  }

  return (
    <ListBox
      aria-label="Selection Store Items"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      renderEmptyState={() => (
        <>
          {!http.processing && (
            <EmptyState className="flex h-24 flex-col items-center justify-center gap-4">
              <Tray className="size-8" />
              <span>No data available.</span>
            </EmptyState>
          )}
        </>
      )}
      className="absolute h-full overflow-y-auto pr-4"
    >
      <Collection items={storeItems}>
        {(storeItem) => (
          <ListBox.Item
            id={storeItem.id}
            textValue={storeItem.item.name}
            className={cn(
              'h-40 rounded-xl border border-transparent bg-surface shadow-md transition-all',
              'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10',
              'data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10',
            )}
          >
            <ListBoxItemContent storeItem={storeItem} />
          </ListBox.Item>
        )}
      </Collection>
      {hasMore && (
        <ListBoxLoadMoreItem
          isLoading={http.processing}
          onLoadMore={loadMore}
          scrollOffset={0.2}
        >
          <div className="flex items-center justify-center gap-2 py-2">
            <Spinner size="sm" />
            <span className="muted text-sm">Loading more...</span>
          </div>
        </ListBoxLoadMoreItem>
      )}
    </ListBox>
  );
}

function ListBoxItemContent({ storeItem }: { storeItem: StoreItem }) {
  return (
    <>
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
      <ListBox.ItemIndicator />
    </>
  );
}
