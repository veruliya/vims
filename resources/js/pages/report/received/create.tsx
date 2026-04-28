import { ListLayout, Virtualizer } from '@heroui/react';
import type { Selection } from '@heroui/react';

import { useHttp, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import { index } from '@/actions/App/Http/Controllers/Api/StockController';

import type { Stock } from '@/types';

import { SelectedStickyBar } from './create/components/SelectedStickyBar';
import { SelectionListBox } from './create/components/SelectionListBox';
import { SelectedContext } from './create/contexts/SelectedContext';
import { SelectionContext } from './create/contexts/SelectionContext';

import type {
  HttpRequest,
  HttpResponse,
  FormData,
} from './create/types';

export default function Create() {
  const http = useHttp<HttpRequest>({
    cursor: null,
  });

  const form = useForm<FormData>({
    stocks: [],
  });

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stocksMap, setStocksMap] = useState<Map<string, Stock>>(new Map());
  const [hasMore, setHasMore] = useState(true);

  const selectedKeys = useMemo<Selection>(() => {
    return new Set(form.data.stocks.map((stock) => stock.id));
  }, [form.data.stocks]);

  function loadMore() {
    if (http.processing || !hasMore) {
      return;
    }

    http.get(index.url(), {
      onSuccess: (response) => {
        const { data, meta } = response as HttpResponse;

        setStocks((prev) => [...prev, ...data]);
        setStocksMap((prev) => {
          const next = new Map(prev);
          data.forEach((stock) => next.set(String(stock.id), stock));

          return next;
        });
        http.setData('cursor', meta.next_cursor);

        if (!meta.next_cursor) {
          setHasMore(false);
        }
      },
    });
  }

  return (
    <SelectionContext.Provider
      value={{
        stocks,
        stocksMap,
        hasMore,
        loadMore,
        http,
      }}
    >
      <SelectedContext.Provider
        value={{
          selectedKeys,
          form,
        }}
      >
        <div className="relative flex-1">
          <Virtualizer
            layout={ListLayout}
            layoutOptions={{ rowSize: 160, gap: 16, padding: 14 }}
          >
            <SelectionListBox />
          </Virtualizer>
        </div>
        <SelectedStickyBar />
      </SelectedContext.Provider>
    </SelectionContext.Provider>
  );
}
