import { ReceivedReport, Movement } from '@/types';

export interface PageProps {
  [key: string]: unknown;
  receivedReport: ReceivedReport;
  movementsCount: number;
}

export interface HttpRequest {
  cursor: string | null;
  filter: Filter;
}

export interface HttpResponse {
  data: Movement[];
  meta: { next_cursor: string | null };
}

export interface Filter {
  movementable_id: string;
  type: string;
}