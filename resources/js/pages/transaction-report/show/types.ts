import { ReceivedReport, Movement, Enum } from '@/types';
import { StoreTree } from '../create/types';
import type { Key } from '@heroui/react';

export interface PageProps {
  [key: string]: unknown;
  receivedReport: ReceivedReport;
  movementsCount: number;
  filterOptions: {
    categories: Enum[];
    severities: Enum[];
    subcategories: Enum[];
    units: Enum[];
    stores: StoreTree[];
  };
}

export interface HttpRequest {
  cursor: string | null;
  filter: Filter;
  sort: string;
}

export interface HttpResponse {
  data: Movement[];
  meta: { next_cursor: string | null };
}

export interface Filter {
  movementable_id: string;
  type: string;
  categories: string[];
  severities: string[];
  subcategories: Key[];
  units: Key[];
  stores: Key[];
  name: string;
}
