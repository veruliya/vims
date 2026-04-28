import { ChevronRight, ArrowRight, Pencil } from '@gravity-ui/icons';

import {
  Button,
  Chip,
  Description,
  Label,
  Modal,
  NumberField,
  Separator,
} from '@heroui/react';

import { Fragment } from 'react';

import { useSelected } from '../contexts/SelectedContext';

import type { StoreItemWithUpdatedQuantity } from '../types';

export function SelectedModal({ storeItem }: { storeItem: StoreItemWithUpdatedQuantity }) {
  const { form } = useSelected();

  const updatedQuantity = Number(
    storeItem.available_quantity + storeItem.updated_quantity,
  ).toFixed(2);

  return (
    <Modal>
      <Button isIconOnly className="shrink-0">
        <Pencil />
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="overscroll-contain">
            <Modal.CloseTrigger /> {/* Optional: Close button */}
            <Modal.Header>
              <Modal.Heading>Update Item Quantity</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-4 p-2">
              <div className="grid grid-cols-2 gap-y-2.5">
                <Label>Item</Label>
                <Description>{storeItem.item.name}</Description>

                <Separator className="col-span-2" />

                <Label>Severity</Label>
                <Chip
                  size="sm"
                  variant="soft"
                  className="w-fit"
                  color={storeItem.item.severity.color}
                >
                  {storeItem.item.severity.label}
                </Chip>

                <Separator className="col-span-2" />

                <Label>Category</Label>
                <Chip
                  size="sm"
                  className="w-fit"
                  color={storeItem.item.category.color}
                >
                  {storeItem.item.category.label}
                </Chip>

                <Separator className="col-span-2" />

                <Label>Subcategory</Label>
                <Description>{storeItem.item.subcategory}</Description>

                <Separator className="col-span-2" />

                <Label>Store</Label>
                <div className="flex items-center gap-1">
                  {storeItem.store.breadcrumbs.map((breadcrumb, index) => (
                    <Fragment key={index}>
                      {index > 0 && <ChevronRight className="size-3" />}
                      <span
                        className={`text-xs text-nowrap ${storeItem.store.breadcrumbs.length === index + 1 && 'font-bold'}`}
                      >
                        {breadcrumb}
                      </span>
                    </Fragment>
                  ))}
                </div>

                <Separator className="col-span-2" />

                <Label>Condition</Label>

                <Separator className="col-span-2" />

                <Label>Unit</Label>
                <Description>{storeItem.item.unit.full_name}</Description>

                <Separator className="col-span-2" />

                <Label>Minimum Quantity</Label>
                <Description>{storeItem.minimum_quantity}</Description>

                <Separator className="col-span-2" />

                <Label>Available Quantity</Label>
                <Description>{storeItem.available_quantity}</Description>

                <Separator className="col-span-2" />

                <Label>Updated Quantity</Label>
                <div className="flex items-center gap-2 text-xs">
                  <span>{storeItem.available_quantity}</span>
                  <span>+</span>
                  <span className="text-success">
                    {storeItem.updated_quantity}
                  </span>
                  <ArrowRight />
                  <span className="text-accent">{updatedQuantity}</span>
                </div>

                <Separator className="col-span-2" />
              </div>
              <div className="flex flex-col gap-4">
                <NumberField
                  isRequired
                  step={
                    storeItem.item.unit.data_type === 'INTEGER'
                      ? Number(1)
                      : Number(0.01)
                  }
                  value={storeItem.updated_quantity}
                  onChange={(value) =>
                    form.setData((data) => ({
                      ...data,
                      storeItems: data.storeItems.map((currentStoreItem) => {
                        if (currentStoreItem.id === storeItem.id) {
                          return {
                            ...currentStoreItem,
                            updated_quantity: Number.isFinite(value) ? value : 0,
                          };
                        }

                        return currentStoreItem;
                      }),
                    }))
                  }
                >
                  <Label>Received Quantity</Label>
                  <NumberField.Group className="h-fit border border-border-secondary">
                    <NumberField.DecrementButton />
                    <NumberField.Input />
                    <NumberField.IncrementButton />
                  </NumberField.Group>
                </NumberField>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
