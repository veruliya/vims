import type { useHttp } from '@inertiajs/react';
import { useContext, createContext } from 'react';

import type { StoreItem } from '@/types';
import type { HttpRequest } from '../types';

interface SelectionContext {
  storeItems: StoreItem[];
  storeItemsMap: Map<string, StoreItem>;
  hasMore: boolean;
  loadMore: () => void;
  http: ReturnType<typeof useHttp<HttpRequest>>;
}

export const SelectionContext = createContext<SelectionContext | null>(null);

export function useSelection() {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error(
      'useSelection must be used within SelectionContext.Provider',
    );
  }

  return context;
}
