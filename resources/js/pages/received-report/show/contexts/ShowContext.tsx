import type { useHttp } from '@inertiajs/react';
import { useContext, createContext } from 'react';

import type { Movement } from '@/types';
import type { HttpRequest } from '../types';

interface ShowContext {
  movements: Movement[];
  setMovements: (
    value: Movement[] | ((prev: Movement[]) => Movement[]),
  ) => void;
  hasMore: boolean;
  setHasMore: (value: boolean | ((prev: boolean) => boolean)) => void;
  loadMore: () => void;
  http: ReturnType<typeof useHttp<HttpRequest>>;
}

export const ShowContext = createContext<ShowContext | null>(null);

export function useShow() {
  const context = useContext(ShowContext);

  if (!context) {
    throw new Error('useShow must be used within ShowContext.Provider');
  }

  return context;
}
