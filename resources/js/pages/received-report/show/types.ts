import { ReceivedReport } from '@/types';

export interface PageProps {
  [key: string]: unknown;
  receivedReport: ReceivedReport;
}
