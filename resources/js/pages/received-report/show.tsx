import {
  Separator,
  Surface,
  Typography,
} from '@heroui/react';

import { ReceivedReport } from '@/types';

interface PageProps {
  [key: string]: unknown;
  receivedReport: ReceivedReport;
}

export default function Show({ receivedReport }: PageProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Typography type="h6">Report Details</Typography>
      <Surface className="flex flex-col gap-4 rounded-3xl p-6 text-sm">
        <div className="flex justify-between">
          <Typography
            type="body-sm"
            className="text-muted"
          >
            Report Number
          </Typography>
          <Typography
            type="body-sm"
            className="font-semibold"
          >
            {receivedReport.number}
          </Typography>
        </div>

        <Separator />

        <div className="flex justify-between">
          <Typography
            type="body-sm"
            className="text-muted"
          >
            Created At
          </Typography>
          <Typography
            type="body-sm"
            className="font-semibold"
          >
            {receivedReport.formatted_created_at}
          </Typography>
        </div>

        <Separator />

        <div className="flex justify-between">
          <Typography
            type="body-sm"
            className="text-muted"
          >
            Created By
          </Typography>
          <Typography
            type="body-sm"
            className="font-semibold"
          >
            {receivedReport.created_by.name}
          </Typography>
        </div>
      </Surface>
    </div>
  );
}
