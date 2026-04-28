import type { StoreItem } from '@/types';

export interface HttpRequest {
  cursor: string | null;
}

export interface HttpResponse {
  data: StoreItem[];
  meta: { next_cursor: string | null };
}

export interface StoreItemWithUpdatedQuantity extends StoreItem {
  updated_quantity: number;
}

export interface FormData {
  storeItems: StoreItemWithUpdatedQuantity[];
}

