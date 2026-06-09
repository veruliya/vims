import { ArrowRightToSquare, CircleInfoFill } from '@gravity-ui/icons';

import { Accordion, Typography, Virtualizer, ListLayout } from '@heroui/react';
import { useState } from 'react';
import { useHttp } from '@inertiajs/react';

import { ReportDetails } from './show/components/ReportDetails';
import { ShowListBox } from './show/components/ShowListBox';
import { FilterDrawer } from './show/components/FilterDrawer';
import { SortDrawer } from './show/components/SortDrawer';
import { ShowContext } from './show/contexts/ShowContext';

import { StickyBar } from '@/components/StickyBar';

import type { PageProps } from './show/types';

import type { Movement } from '@/types';

import type { HttpRequest, HttpResponse } from './show/types';

import { index } from '@/actions/App/Http/Controllers/Api/MovementController';

export default function Show({ receivedReport, movementsCount }: PageProps) {
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>(['report-details', 'received-items']),
  );

  const isReportDetailsExpanded = expandedKeys.has('report-details');
  const receivedItemsHeight = isReportDetailsExpanded
    ? 'h-[calc(100vh-25.5rem)]'
    : 'h-[calc(100vh-18.5rem)]';

  const http = useHttp<HttpRequest>({
    cursor: null,
    filter: {
      movementable_id: receivedReport.id.toString(),
      type: 'RECEIVED',
        categories: [],
        severities: [],
        subcategories: [],
        units: [],
        stores: [],
        name: '',
    },
    sort: 'id',
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
    <ShowContext.Provider
      value={{
        hasMore,
        setHasMore,
        loadMore,
        http,
        movements,
        setMovements,
      }}
    >
      <Accordion
        className="h-full w-full flex-1 border-t"
        allowsMultipleExpanded
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        <Accordion.Item
          id="report-details"
          className="py-0"
        >
          <Accordion.Heading>
            <Accordion.Trigger>
              <div className="flex items-center gap-4">
                <CircleInfoFill className="size-5 shrink-0 text-muted" />
                <Typography type="body-sm">Report Details</Typography>
              </div>
              <Accordion.Indicator className="size-5" />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>
              <div className="flex flex-col gap-3">
                <ReportDetails receivedReport={receivedReport} />
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item
          id="received-items"
          className="h-full py-0"
        >
          <Accordion.Heading>
            <Accordion.Trigger>
              <div className="flex items-center gap-4">
                <ArrowRightToSquare className="size-5 shrink-0 text-muted" />
                <Typography type="body-sm">{`Received Items: ${movementsCount}`}</Typography>
              </div>
              <Accordion.Indicator className="size-5" />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="p-0">
              <StickyBar placement="top">
                <div className="flex items-center gap-2 p-2">
                  <FilterDrawer />
                  <SortDrawer />
                </div>
              </StickyBar>
              <div className={`relative ${receivedItemsHeight} p-0`}>
                <Virtualizer
                  layout={ListLayout}
                  layoutOptions={{ rowSize: 104 }}
                >
                  <ShowListBox />
                </Virtualizer>
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </ShowContext.Provider>
  );
}
