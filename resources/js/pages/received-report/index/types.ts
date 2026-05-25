import { ReceivedReport } from '@/types';

export interface HttpRequest {
  cursor: string | null;
  filter: Filter;
  sort: string;
}

export interface HttpResponse {
  data: ReceivedReport[];
  meta: { next_cursor: string | null };
}

export interface Filter {}
