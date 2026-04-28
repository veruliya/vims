import type { Stock } from '@/types';

export interface HttpRequest {
  cursor: string | null;
}

export interface HttpResponse {
  data: Stock[];
  meta: { next_cursor: string | null };
}

export interface StockWithUpdatedQuantity extends Stock {
  updated_quantity: number;
}

export interface FormData {
  stocks: StockWithUpdatedQuantity[];
}

