import {
  ArrowRight,
  Tray,
  TrashBin,
} from '@gravity-ui/icons';

import {
  Button,
  Collection,
  EmptyState,
  ListBox,
} from '@heroui/react';

import { cn } from '@/lib/utils';

import type { StoreItem } from '@/types';

import { StoreItemContent } from "@/components/StoreItemContent";

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
      className="gap-2 px-0 pb-2"
    >
      <Collection items={form.data.storeItems}>
        {(storeItem) => (
          <ListBox.Item
            id={storeItem.id}
            textValue={storeItem.item.name}
            className={cn(
              storeItem.received_quantity !== 0 &&
                'border-success bg-success/10',
              'h-40 rounded-xl border shadow-md transition-all',
            )}
          >
            <div className="flex h-full w-full flex-col justify-between gap-1">
              <StoreItemContent storeItem={storeItem} />
              <div className="flex justify-between">
                <SelectedModal storeItem={storeItem} />
                <div className="flex flex-row items-center gap-2">
                  <span className="text-base font-semibold text-success">
                    {`+${storeItem.received_quantity}`}
                  </span>
                  <ArrowRight />
                  <span className="text-base font-semibold text-accent">
                    {Number(
                      storeItem.balance + storeItem.received_quantity,
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
