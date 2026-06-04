import { ArrowRightToSquare, CircleInfoFill } from '@gravity-ui/icons';

import { Accordion, Typography, Virtualizer, ListLayout } from '@heroui/react';
import { useState } from 'react';

import { ReportDetails } from './show/components/ReportDetails';
import { ShowListBox } from './show/components/ShowListBox';

import type { PageProps } from './show/types';

export default function Show({ receivedReport, movementsCount }: PageProps) {
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>(['report-details', 'received-items']),
  );

  const isReportDetailsExpanded = expandedKeys.has('report-details');
  const receivedItemsHeight = isReportDetailsExpanded
    ? 'h-[calc(100vh-22rem)]'
    : 'h-[calc(100vh-15rem)]';

  return (
    <Accordion
      className="h-full w-full flex-1"
      allowsMultipleExpanded
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
    >
      <Accordion.Item
        id="report-details"
        className="py-0"
      >
        <Accordion.Heading>
          <Accordion.Trigger>
            <div className="flex items-center gap-4">
              <CircleInfoFill className="size-5 shrink-0 text-muted" />
              <Typography type="body-sm">Report Details</Typography>
            </div>
            <Accordion.Indicator className="size-5" />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <div className="flex flex-col gap-3">
              <ReportDetails receivedReport={receivedReport} />
            </div>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item
        id="received-items"
        className="h-full py-0"
      >
        <Accordion.Heading>
          <Accordion.Trigger>
            <div className="flex items-center gap-4">
              <ArrowRightToSquare className="size-5 shrink-0 text-muted" />
              <Typography type="body-sm">Received Items</Typography>
            </div>
            <Accordion.Indicator className="size-5" />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="p-0">
            
            <div className={`relative ${receivedItemsHeight} p-0`}>
              <Virtualizer
                layout={ListLayout}
                layoutOptions={{ rowSize: 104 }}
              >
                <ShowListBox
                  movementableId={receivedReport.id}
                  movementType="RECEIVED"
                />
              </Virtualizer>
            </div>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
