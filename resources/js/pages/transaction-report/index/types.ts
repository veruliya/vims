import { ReceivedReport } from '@/types';
import { DateValue } from '@heroui/react';

export interface HttpRequest {
  cursor: string | null;
  filter: Filter;
  sort: string;
}

export interface HttpResponse {
  data: ReceivedReport[];
  meta: { next_cursor: string | null };
}

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export interface Filter {
  name: string;
  number: string;
  from: string;
  to: string; 
}
