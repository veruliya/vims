import { ChevronRight, Pencil, MapPin } from '@gravity-ui/icons';

import {
  Button,
  Chip,
  Description,
  Label,
  Modal,
  NumberField,
  Separator,
} from '@heroui/react';

import { Fragment, useState } from 'react';

import { useSelected } from '../contexts/SelectedContext';

import type { StoreItemWithReceivedQuantity } from '../types';

export function SelectedModal({
  storeItem,
}: {
  storeItem: StoreItemWithReceivedQuantity;
}) {
  const { form } = useSelected();

  const [receivedQuantity, setReceivedQuantity] = useState<number>(
    storeItem.received_quantity,
  );

  const updatedQuantity = Number(storeItem.balance + receivedQuantity).toFixed(
    2,
  );

  return (
    <Modal>
      <Button
        isIconOnly
        className="shrink-0"
      >
        <Pencil />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="overscroll-contain">
            <Modal.CloseTrigger /> {/* Optional: Close button */}
            <Modal.Header>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {storeItem.store.breadcrumbs.map((breadcrumb, index) => (
                  <Fragment key={index}>
                    {index > 0 && <ChevronRight className="size-3" />}
                    <Description
                      className={`${storeItem.store.breadcrumbs.length === index + 1 && 'font-semibold'} text-sm`}
                    >
                      {breadcrumb}
                    </Description>
                  </Fragment>
                ))}
              </div>
              <Modal.Heading className="font-bold">
                {storeItem.item.name}
              </Modal.Heading>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Chip
                    size="sm"
                    color={storeItem.item.category.chipColor}
                    className="h-fit"
                  >
                    {storeItem.item.category.label}
                  </Chip>
                  <span>&bull;</span>
                  <Description className="text-right font-semibold">
                    {storeItem.item.subcategory}
                  </Description>
                </div>
                <Chip
                  variant="soft"
                  size="sm"
                  color={storeItem.item.severity.chipColor}
                  className="h-fit"
                >
                  {storeItem.item.severity.label}
                </Chip>
              </div>
              <Separator />
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4 p-1">
                <div className="grid grid-cols-[144px_1fr] gap-y-4">
                  <Label className="text-muted">Unit</Label>
                  <Description className="text-sm font-semibold text-surface-foreground">
                    {storeItem.item.unit.full_name}
                  </Description>
                  <Label className="text-muted">Minimum Quantity</Label>
                  <Description className="text-sm font-semibold text-surface-foreground">
                    {storeItem.minimum_quantity}
                  </Description>
                </div>

                <div className="flex flex-col rounded-2xl border">
                  <div className="flex items-center justify-between rounded-t-2xl p-3">
                    <Label className="text-muted">Balance</Label>
                    <Description className="text-sm font-semibold text-surface-foreground">
                      {storeItem.balance}
                    </Description>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-3">
                    <Label className="text-muted">Received Quantity</Label>
                    <Description className="text-sm font-semibold text-success">
                      + {receivedQuantity}
                    </Description>
                  </div>
                  <div className="flex items-center justify-between rounded-b-2xl bg-surface-secondary p-3">
                    <Label className="font-bold text-muted">Result</Label>
                    <Description className="text-sm font-bold text-accent">
                      {updatedQuantity}
                    </Description>
                  </div>
                </div>

                <NumberField
                  isRequired
                  step={
                    storeItem.item.unit.data_type === 'INTEGER'
                      ? Number(1)
                      : Number(0.01)
                  }
                  value={receivedQuantity}
                  onChange={(value) =>
                    setReceivedQuantity(Number.isFinite(value) ? value : 0)
                  }
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).select();
                  }}
                >
                  <Label className="pb-2 text-muted">Received Quantity</Label>
                  <NumberField.Group className="h-fit border border-border-secondary">
                    <NumberField.DecrementButton />
                    <NumberField.Input className="text-center" />
                    <NumberField.IncrementButton />
                  </NumberField.Group>
                </NumberField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                slot="close"
                variant="danger"
                onPress={() => setReceivedQuantity(storeItem.received_quantity)}
              >
                Cancel
              </Button>
              <Button
                slot="close"
                onPress={() => {
                  form.setData((data) => ({
                    ...data,
                    storeItems: data.storeItems.map((currentStoreItem) => {
                      if (currentStoreItem.id === storeItem.id) {
                        return {
                          ...currentStoreItem,
                          received_quantity: receivedQuantity,
                        };
                      }

                      return currentStoreItem;
                    }),
                  }));
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
