import { Tray } from '@gravity-ui/icons';

import {
  Collection,
  EmptyState,
  ListBox,
  ListBoxLoadMoreItem,
  Spinner,
  Checkbox,
} from '@heroui/react';
import type { Selection } from '@heroui/react';

import { cn } from '@/lib/utils';

import type { StoreItem } from '@/types';

import { useSelected } from '../contexts/SelectedContext';
import { useSelection } from '../contexts/SelectionContext';

import { StoreItemContent } from "@/components/StoreItemContent";

import type { StoreItemWithReceivedQuantity } from '../types';

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
            received_quantity: 0,
          };
        })
        .filter(Boolean) as StoreItemWithReceivedQuantity[],
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
      className="absolute h-full overflow-y-auto p-0"
    >
      <Collection items={storeItems}>
        {(storeItem) => (
          <ListBox.Item
            id={storeItem.id}
            textValue={storeItem.item.name}
            className={cn(
              'h-28 rounded-xl border border-transparent bg-surface shadow-md transition-all',
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
      <ListBox.ItemIndicator>
        {({ isSelected }) => (
          <Checkbox id={storeItem.id.toString()} isSelected={isSelected} variant="secondary" className="self-start">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
        )}
      </ListBox.ItemIndicator>
      <StoreItemContent storeItem={storeItem} />
    </>
  );
}
