import type { StoreItem, Enum } from '@/types';
import type { Key } from '@heroui/react';

export interface HttpRequest {
  cursor: string | null;
  filter: Filter;
  sort: string;
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

export interface Filter {
  categories: string[];
  severities: string[];
  subcategories: Key[];
  units: Key[];
  stores: Key[];
  name: string;
}

export interface StoreTree {
  id: number;
  name: string;
  parent_id: number | null;
  descendants: StoreTree[];
}

export interface PageProps {
  [key: string]: unknown;
  filterOptions: {
    categories: Enum[];
    severities: Enum[];
    subcategories: Enum[];
    units: Enum[];
    stores: StoreTree[];
  };
}
