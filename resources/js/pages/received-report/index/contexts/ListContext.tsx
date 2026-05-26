import type { useHttp } from '@inertiajs/react';
import { useContext, createContext } from 'react';

import type { ReceivedReport } from '@/types';
import type { HttpRequest } from '../types';

interface ListContext {
  receivedReports: ReceivedReport[];
  setReceivedReports: (
    value: ReceivedReport[] | ((prev: ReceivedReport[]) => ReceivedReport[]),
  ) => void;
  hasMore: boolean;
  setHasMore: (value: boolean | ((prev: boolean) => boolean)) => void;
  loadMore: () => void;
  http: ReturnType<typeof useHttp<HttpRequest>>;
}

export const ListContext = createContext<ListContext | null>(null);

export function useList() {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error('useList must be used within ListContext.Provider');
  }

  return context;
}
