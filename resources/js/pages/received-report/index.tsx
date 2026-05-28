import { Plus } from '@gravity-ui/icons';
import { Button, Virtualizer, ListLayout } from '@heroui/react';

import { router, useHttp } from '@inertiajs/react';
import { useState } from 'react';

import { index } from '@/actions/App/Http/Controllers/Api/ReceivedReportController';
import { create } from '@/actions/App/Http/Controllers/ReceivedReportController';

import { IndexListBox } from './index/components/IndexListBox';
import { IndexContext } from './index/contexts/IndexContext';
import { SortDrawer } from './index/components/SortDrawer';
import { FilterDrawer } from './index/components/FilterDrawer';

import { StickyBar } from '@/components/StickyBar';

import type { HttpRequest, HttpResponse } from './index/types';
import type { ReceivedReport } from '@/types';

import { initialFilter } from './index/components/FilterDrawer';

export default function Index() {
  const http = useHttp<HttpRequest>({
    cursor: null,
    filter: initialFilter,
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
    <IndexContext
      value={{
        receivedReports,
        setReceivedReports,
        hasMore,
        setHasMore,
        loadMore,
        http,
      }}
    >
      <StickyBar placement="top">
        <div className="flex items-center justify-between p-2">
          <div className="flex gap-2">
            <FilterDrawer />
            <SortDrawer />
          </div>
          <Button
            className="ms-auto"
            onPress={() => router.get(create())}
          >
            <Plus />
            Create
          </Button>
        </div>
      </StickyBar>
      <div className="relative flex-1">
        <Virtualizer
          layout={ListLayout}
          layoutOptions={{ rowSize: 52, gap: 16, padding: 8 }}
        >
          <IndexListBox />
        </Virtualizer>
      </div>
    </IndexContext>
  );
}
