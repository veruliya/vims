import { Card, Typography } from '@heroui/react';

import { PageProps } from './show/types';

import { ReportDetails } from './show/components/ReportDetails';

export default function Show({ receivedReport }: PageProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <Typography type="h6">Report Details</Typography>
      <Card>
        <ReportDetails receivedReport={receivedReport} />
      </Card>
    </div>
  );
}
