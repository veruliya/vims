import { Description, Drawer, Button } from '@heroui/react';

import { useSelected } from '../contexts/SelectedContext';

import { SelectedListBox } from './SelectedListBox';

export function SelectedDrawer() {
  const { form } = useSelected();

  return (
    <Drawer>
      <Button variant="secondary">Show Selected</Button>
      <Drawer.Backdrop>
        <Drawer.Content>
          <Drawer.Dialog>
            <Drawer.Handle /> {/* Optional: Drag handle */}
            <Drawer.CloseTrigger /> {/* Optional: Close button */}
            <Drawer.Header>
              <Drawer.Heading>
                {`${form.data.storeItems.length} items selected`}
              </Drawer.Heading>
              <Description className="text-sm">
                Set the quantity of the received items.
              </Description>
            </Drawer.Header>
            <Drawer.Body>
              <SelectedListBox />
            </Drawer.Body>
            <Drawer.Footer>
              <div className="flex w-full justify-between">
                <Button
                  variant="danger"
                  onPress={() => form.setData('storeItems', [])}
                >
                  Clear Selected
                </Button>
                <Button>Proceed</Button>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
