import {
  Plus,
  Tray,
  ArrowRightToSquare,
  CircleChevronRightFill,
} from '@gravity-ui/icons';
import {
  Button,
  ListBox,
  EmptyState,
  Collection,
  Label,
  Description,
} from '@heroui/react';
import { router } from '@inertiajs/react';

import {
  create,
  show,
} from '@/actions/App/Http/Controllers/ReceivedReportController';

import { ReceivedReport } from '@/types';

import { StickyBar } from '@/components/StickyBar';

interface PageProps {
  [key: string]: unknown;
  receivedReports: ReceivedReport[];
}

export default function Index({ receivedReports }: PageProps) {
  return (
    <>
      <StickyBar placement="top">
        <div className="flex items-center justify-between p-2">
          <Button
            className="ms-auto"
            onPress={() => router.get(create())}
          >
            <Plus />
            Create
          </Button>
        </div>
      </StickyBar>
      <ListBox
        aria-label="Received Reports"
        renderEmptyState={() => (
          <EmptyState className="flex h-24 flex-col items-center justify-center gap-4">
            <Tray className="size-8" />
            <span>No data available.</span>
          </EmptyState>
        )}
        onAction={(key) => router.get(show(key))}
      >
        <Collection items={receivedReports}>
          {(receivedReport) => (
            <ListBox.Item
              id={receivedReport.id}
              textValue={receivedReport.number}
            >
              <ListBoxItemContent receivedReport={receivedReport} />
            </ListBox.Item>
          )}
        </Collection>
      </ListBox>
    </>
  );
}

function ListBoxItemContent({
  receivedReport,
}: {
  receivedReport: ReceivedReport;
}) {
  return (
    <>
      <ArrowRightToSquare className="size-5 shrink-0 text-muted" />
      <div className="flex flex-col">
        <Label>{receivedReport.number}</Label>
        <Description>{receivedReport.formatted_created_at}</Description>
      </div>
      <div className="ms-auto">
        <Label className="w-32 truncate text-right">
          {receivedReport.created_by.name}
        </Label>
      </div>
      <CircleChevronRightFill className="size-5 shrink-0 text-accent" />
    </>
  );
}
