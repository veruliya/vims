import { Description, Drawer, Button, AlertDialog } from '@heroui/react';

import { useOverlayState } from '@heroui/react';

import { useSelected } from '../contexts/SelectedContext';

import { SelectedListBox } from './SelectedListBox';

export function SelectedDrawer() {
  const { form } = useSelected();

  const clearSelectedState = useOverlayState();

  return (
    <>
      <Drawer>
        <Button>Show Selected</Button>
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
                    onPress={clearSelectedState.open}
                    isDisabled={form.data.storeItems.length === 0}
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
      <AlertDialog.Backdrop
        isDismissable={true}
        isOpen={clearSelectedState.isOpen}
        onOpenChange={clearSelectedState.setOpen}
      >
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger /> {/* Optional: Close button */}
            <AlertDialog.Header>
              <AlertDialog.Icon /> {/* Optional: Status icon */}
              <AlertDialog.Heading>Clear selected items?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>All selected items and quantity updates will be cleared.</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
              >
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                onPress={() => form.setData('storeItems', [])}
              >
                Clear Selected
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </>
  );
}
