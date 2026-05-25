import { Drawer, Button } from '@heroui/react';

import { BarsDescendingAlignCenter } from '@gravity-ui/icons';

import { Sorts } from './Sorts';

export function SortDrawer() {
  return (
    <Drawer>
      <Button
        variant="secondary"
        isIconOnly
      >
        <BarsDescendingAlignCenter />
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="bottom">
          <Drawer.Dialog>
            <Drawer.CloseTrigger /> {/* Optional: Close button */}
            <Drawer.Header>
              <Drawer.Heading>Sort</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <Sorts />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
