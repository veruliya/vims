import { Tray, MapPin, ChevronRight } from '@gravity-ui/icons';
import {
  ListBox,
  ListBoxLoadMoreItem,
  EmptyState,
  Collection,
  Spinner,
  Typography,
  Chip,
} from '@heroui/react';

import { useHttp } from '@inertiajs/react';
import { useState, Fragment } from 'react';

import type { Movement } from '@/types';

import type { HttpRequest, HttpResponse } from '../types';

import { index } from '@/actions/App/Http/Controllers/Api/MovementController';

export function ShowListBox({
  movementableId,
  movementType,
}: {
  movementableId: number;
  movementType: string;
}) {
  const initialFilter = {
    movementable_id: movementableId.toString(),
    type: movementType,
  };

  const http = useHttp<HttpRequest>({
    cursor: null,
    filter: initialFilter,
  });

  const [movements, setMovements] = useState<Movement[]>([]);

  const [hasMore, setHasMore] = useState(true);

  function loadMore() {
    if (http.processing || !hasMore) {
      return;
    }

    http.get(index.url(), {
      onSuccess: (response) => {
        const { data, meta } = response as HttpResponse;

        setMovements((prev) => [...prev, ...data]);

        http.setData('cursor', meta.next_cursor);

        if (!meta.next_cursor) {
          setHasMore(false);
        }
      },
    });
  }

  return (
    <ListBox
      aria-label="Movements"
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
      className="absolute inset-0 w-full overflow-y-auto p-0"
    >
      <Collection items={movements}>
        {(movement) => (
          <ListBox.Item
            id={movement.id}
            textValue={movement.snapshot.item_name}
            className="h-26 rounded-none border-b"
          >
            <ListBoxItemContent movement={movement} />
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

function ListBoxItemContent({ movement }: { movement: Movement }) {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_5rem] px-1">
      <div className="flex flex-col justify-between gap-y-1">
        <div className="flex items-center gap-x-1.5">
          <Chip
            variant="soft"
            size="sm"
            color={movement.snapshot.item_category.chipColor}
          >
            {movement.snapshot.item_category.label}
          </Chip>
          <span>&bull;</span>
          <Typography
            type="body-xs"
            weight="medium"
            className="line-clamp-1 text-muted"
          >
            {movement.snapshot.item_subcategory}
          </Typography>
        </div>
        <Typography
          type="body-sm"
          weight="medium"
          className="line-clamp-2 h-12"
        >
          {movement.snapshot.item_name}
        </Typography>

        <div className="flex items-center gap-1 text-muted">
          <MapPin className="size-3" />
          {movement.snapshot.store_breadcrumbs.map((breadcrumb, index) => (
            <Fragment key={index}>
              {index > 0 && <ChevronRight className="size-3" />}
              <span
                className={`${movement.snapshot.store_breadcrumbs.length === index + 1 && 'font-bold text-accent'} text-xs`}
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
          color={movement.snapshot.item_severity.chipColor}
        >
          {movement.snapshot.item_severity.label}
        </Chip>
        <div>
          <Typography
            weight="bold"
            type="body"
            className="text-right text-success"
          >
            {`+${movement.snapshot.store_item_minimum_quantity}`}
          </Typography>
          <Typography
            weight="bold"
            type="body-xs"
            className="text-right"
          >
            {movement.snapshot.unit_full_name}
          </Typography>
        </div>
      </div>
    </div>
  );
}
