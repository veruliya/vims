import { Plus } from '@gravity-ui/icons';
import { Button, Virtualizer, ListLayout } from '@heroui/react';
import { router } from '@inertiajs/react';

import { create } from '@/actions/App/Http/Controllers/ReceivedReportController';

import { IndexListBox } from './index/components/IndexListBox';

import { StickyBar } from '@/components/StickyBar';

export default function Index() {
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
      <div className="relative flex-1">
        <Virtualizer
          layout={ListLayout}
          layoutOptions={{ rowSize: 48, gap: 16, padding: 8 }}
        >
          <IndexListBox />
        </Virtualizer>
      </div>
    </>
  );
}
