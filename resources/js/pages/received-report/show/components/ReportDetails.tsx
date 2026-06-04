import { Separator, Typography } from '@heroui/react';

import { ReceivedReport } from '@/types';

export function ReportDetails({
  receivedReport,
}: {
  receivedReport: ReceivedReport;
}) {
  return (
    <>
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
    </>
  );
}
