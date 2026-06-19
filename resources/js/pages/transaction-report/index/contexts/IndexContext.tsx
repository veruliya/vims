import type { useHttp } from '@inertiajs/react';
import { useContext, createContext } from 'react';

import type { ReceivedReport } from '@/types';
import type { HttpRequest } from '../types';

interface IndexContext {
  receivedReports: ReceivedReport[];
  setReceivedReports: (
    value: ReceivedReport[] | ((prev: ReceivedReport[]) => ReceivedReport[]),
  ) => void;
  hasMore: boolean;
  setHasMore: (value: boolean | ((prev: boolean) => boolean)) => void;
  loadMore: () => void;
  http: ReturnType<typeof useHttp<HttpRequest>>;
}

export const IndexContext = createContext<IndexContext | null>(null);

export function useIndex() {
  const context = useContext(IndexContext);

  if (!context) {
    throw new Error('useIndex must be used within IndexContext.Provider');
  }

  return context;
}
