import { Description, Drawer, Button, AlertDialog } from '@heroui/react';

import { useOverlayState } from '@heroui/react';

import { useMemo } from 'react';

import { useSelected } from '../contexts/SelectedContext';

import { SelectedListBox } from './SelectedListBox';

import { store } from "@/actions/App/Http/Controllers/ReceivedReportController";

export function SelectedDrawer() {
  const { form } = useSelected();

  const clearSelectedState = useOverlayState();
  const createState = useOverlayState();

  const isAllQuantitiesFilled = useMemo(() => {
    return (
      form.data.storeItems.length !== 0 &&
      form.data.storeItems.every((item) => item.received_quantity !== 0)
    );
  }, [form.data.storeItems]);

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
                  <Button
                    onPress={createState.open}
                    isDisabled={!isAllQuantitiesFilled}
                  >
                    Create Report
                  </Button>
                </div>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      {/* Confirm Clear Selected */}

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

      {/* Confirm Create */}

      <AlertDialog.Backdrop
        isDismissable={true}
        isOpen={createState.isOpen}
        onOpenChange={createState.setOpen}
      >
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger /> {/* Optional: Close button */}
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" /> {/* Optional: Status icon */}
              <AlertDialog.Heading>Create Report?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                A report will be created based on the selected items and their
                received quantities.
              </p>
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
                onPress={() => form.submit(store())}
              >
                Create Report
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </>
  );
}
