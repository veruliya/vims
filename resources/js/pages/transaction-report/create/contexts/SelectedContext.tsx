import type { Selection } from '@heroui/react';
import type { useForm } from '@inertiajs/react';
import { useContext, createContext } from 'react';

import type { FormData } from '../types';

interface SelectedContext {
  selectedKeys: Selection;
  form: ReturnType<typeof useForm<FormData>>;
}

export const SelectedContext = createContext<SelectedContext | null>(null);

export function useSelected() {
  const context = useContext(SelectedContext);

  if (!context) {
    throw new Error('useSelected must be used within SelectedContext.Provider');
  }

  return context;
}
