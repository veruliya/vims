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

import type { Stock } from '@/types';

import { useSelected } from '../contexts/SelectedContext';
import { useSelection } from '../contexts/SelectionContext';

import type { StockWithUpdatedQuantity } from '../types';

export function SelectionListBox() {
  const { selectedKeys, form } = useSelected();
  const { http, stocks, hasMore, loadMore, stocksMap } = useSelection();

  function handleSelectionChange(keys: Selection) {
    if (keys === 'all') {
      return;
    }

    form.setData(
      'stocks',
      Array.from(keys)
        .map((key) => {
          if (form.data.stocks.map((stock) => stock.id).includes(Number(key))) {
            return form.data.stocks.find((stock) => stock.id === Number(key));
          }

          return {
            ...stocksMap.get(String(key)),
            updated_quantity: 0,
          };
        })
        .filter(Boolean) as StockWithUpdatedQuantity[],
    );
  }

  return (
    <ListBox
      aria-label="Stocks"
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
      <Collection items={stocks}>
        {(stock) => (
          <ListBox.Item
            id={stock.id}
            textValue={stock.item.name}
            className={cn(
              'h-40 rounded-xl border border-transparent bg-surface shadow-md transition-all',
              'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10',
              'data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10',
            )}
          >
            <ListBoxItemContent stock={stock} />
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

function ListBoxItemContent({ stock }: { stock: Stock }) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-1">
          <Chip
            variant="soft"
            size="sm"
            color={stock.item.severity.color}
          >
            {stock.item.severity.label}
          </Chip>
          <Chip
            size="sm"
            color={stock.item.category.color}
          >
            {stock.item.category.label}
          </Chip>
        </div>
        <Description>{stock.item.subcategory}</Description>
        <Label>{stock.item.name}</Label>
        <div className="flex items-center gap-1 text-sm text-muted">
          <MapPin className="size-3" />
          {stock.store.breadcrumbs.map((breadcrumb, index) => (
            <Fragment key={index}>
              {index > 0 && <ChevronRight className="size-3" />}
              <span
                className={`${stock.store.breadcrumbs.length === index + 1 && 'font-bold'} text-sm`}
              >
                {breadcrumb}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Chip
          size="sm"
          variant="soft"
          color={stock.condition.color}
        >
          {stock.condition.label}
        </Chip>
        <Description className="text-sm font-semibold">
          {stock.item.unit.full_name}
        </Description>
        <Description className="text-sm font-semibold text-accent">
          {`MIN: ${stock.minimum_quantity}`}
        </Description>
        <Description
          className={`text-sm font-semibold ${stock.available_quantity >= stock.minimum_quantity ? 'text-success' : 'text-danger'}`}
        >
          {`AVL: ${stock.available_quantity}`}
        </Description>
      </div>
      <ListBox.ItemIndicator />
    </>
  );
}
