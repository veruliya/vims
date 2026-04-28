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

import type { Stock } from '@/types';

import { useSelected } from '../contexts/SelectedContext';
import { SelectedModal } from './SelectedModal';

export function SelectedListBox() {
  const { form } = useSelected();

  function removeStock(id: Stock['id']) {
    form.setData((data) => ({
      ...data,
      stocks: data.stocks.filter((stock) => stock.id !== id),
    }));
  }

  return (
    <ListBox
      aria-label="Stocks"
      renderEmptyState={() => (
        <EmptyState className="flex h-24 flex-col items-center justify-center gap-4">
          <Tray className="size-8" />
          <span>No data available.</span>
        </EmptyState>
      )}
      className="gap-4"
    >
      <Collection items={form.data.stocks}>
        {(stock) => (
          <ListBox.Item
            id={stock.id}
            textValue={stock.item.name}
            className={cn(
              stock.updated_quantity !== 0 && 'border-success bg-success/10',
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
              </div>
              <div className="flex justify-between">
                <SelectedModal stock={stock} />
                <div className="flex flex-row items-center gap-2">
                  <span className="text-success text-base font-semibold">
                    {`+${stock.updated_quantity}`}
                  </span>
                  <ArrowRight />
                  <span className="text-accent text-base font-semibold">
                    {Number(stock.available_quantity + stock.updated_quantity).toFixed(2)}
                  </span>
                </div>
                <Button
                  isIconOnly
                  variant="danger"
                  className="shrink-0"
                  onPress={() => removeStock(stock.id)}
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
