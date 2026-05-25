import {
  Tray,
  ArrowRightToSquare,
  CircleChevronRightFill,
} from '@gravity-ui/icons';
import {
  ListBox,
  ListBoxLoadMoreItem,
  EmptyState,
  Collection,
  Label,
  Description,
  Spinner,
} from '@heroui/react';

import { router, useHttp } from '@inertiajs/react';

import { useState } from 'react';

import { show } from '@/actions/App/Http/Controllers/ReceivedReportController';

import { ReceivedReport } from '@/types';

import { HttpRequest, HttpResponse } from '../types';

import { index } from '@/actions/App/Http/Controllers/Api/ReceivedReportController';

export function IndexListBox() {
  const http = useHttp<HttpRequest>({
    cursor: null,
    filter: {},
    sort: '-created_at',
  });

  const [receivedReports, setReceivedReports] = useState<ReceivedReport[]>([]);

  const [hasMore, setHasMore] = useState(true);

  function loadMore() {
    if (http.processing || !hasMore) {
      return;
    }

    http.get(index.url(), {
      onSuccess: (response) => {
        const { data, meta } = response as HttpResponse;

        setReceivedReports((prev) => [...prev, ...data]);

        http.setData('cursor', meta.next_cursor);

        if (!meta.next_cursor) {
          setHasMore(false);
        }
      },
    });
  }

  return (
    <ListBox
      aria-label="Received Reports"
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
      onAction={(key) => router.get(show(key))}
      className="absolute h-full overflow-y-auto pr-4"
    >
      <Collection items={receivedReports}>
        {(receivedReport) => (
          <ListBox.Item
            id={receivedReport.id}
            textValue={receivedReport.number}
          >
            <ListBoxItemContent receivedReport={receivedReport} />
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

function ListBoxItemContent({
  receivedReport,
}: {
  receivedReport: ReceivedReport;
}) {
  return (
    <>
      <ArrowRightToSquare className="size-5 shrink-0 text-muted" />
      <div className="flex flex-col">
        <Label>{receivedReport.number}</Label>
        <Description>{receivedReport.formatted_created_at}</Description>
      </div>
      <div className="ms-auto">
        <Label className="w-32 truncate text-right">
          {receivedReport.created_by.name}
        </Label>
      </div>
      <CircleChevronRightFill className="size-5 shrink-0 text-accent" />
    </>
  );
}
