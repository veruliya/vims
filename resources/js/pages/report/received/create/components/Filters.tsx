import {
  Label,
  ToggleButton,
  Select,
  ListBox,
  Collection,
  Table,
  SearchField,
  Checkbox,
  Button,
  Chip,
} from '@heroui/react';

import type { Selection } from '@heroui/react';

import { Plus, Minus } from '@gravity-ui/icons';

import { usePage } from '@inertiajs/react';

import { PageProps, Filter, StoreTree } from '../types';

export function Filters({
  filter,
  setFilter,
  storeTableExpandedKeys,
  setStoreTableExpandedKeys,
}: {
  filter: Filter;
  setFilter: (value: Filter | ((prev: Filter) => Filter)) => void;
  storeTableExpandedKeys: Selection;
  setStoreTableExpandedKeys: (
    value: Selection | ((prev: Selection) => Selection),
  ) => void;
}) {
  const { filterOptions } = usePage<PageProps>().props;
  const { categories, severities, subcategories, units, stores } =
    filterOptions;

  return (
    <div className="flex flex-col gap-4 pr-1">
      {/* Name */}

      <SearchField
        name="name"
        variant="secondary"
        value={filter.name}
        onChange={(value) =>
          setFilter((prev) => ({
            ...prev,
            name: value,
          }))
        }
      >
        <Label>Name</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            className="text-sm"
            placeholder="Filter by name"
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      {/* Severity */}

      <div className="flex flex-col gap-1">
        <Label>Severity</Label>

        <div className="flex flex-row gap-4">
          {severities.map((severity) => (
            <ToggleButton
              key={severity.value}
              size="sm"
              isSelected={filter.severities.includes(severity.value)}
              onChange={(value) => {
                if (value === true) {
                  setFilter((prev) => ({
                    ...prev,
                    severities: [...prev.severities, severity.value],
                  }));
                } else {
                  setFilter((prev) => ({
                    ...prev,
                    severities: prev.severities.filter(
                      (v) => v !== severity.value,
                    ),
                  }));
                }
              }}
            >
              {severity.label}
            </ToggleButton>
          ))}
        </div>
      </div>

      {/* Category */}

      <div className="flex flex-col gap-1">
        <Label>Category</Label>

        <div className="flex flex-row gap-4">
          {categories.map((category) => (
            <ToggleButton
              key={category.value}
              size="sm"
              isSelected={filter.categories.includes(category.value)}
              onChange={(value) => {
                if (value === true) {
                  setFilter((prev) => ({
                    ...prev,
                    categories: [...prev.categories, category.value],
                  }));
                } else {
                  setFilter((prev) => ({
                    ...prev,
                    categories: prev.categories.filter(
                      (v) => v !== category.value,
                    ),
                  }));
                }
              }}
            >
              {category.label}
            </ToggleButton>
          ))}
        </div>
      </div>

      {/* Subcategory */}

      <Select
        placeholder="Filter by subcategories"
        variant="secondary"
        selectionMode="multiple"
        value={filter.subcategories}
        onChange={(keys) =>
          setFilter((prev) => ({
            ...prev,
            subcategories: keys,
          }))
        }
      >
        <Label>Subcategories</Label>
        <Select.Trigger>
          <Select.Value className="text-sm" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="multiple">
            <Collection items={subcategories}>
              {({ value, label }) => (
                <ListBox.Item
                  id={value}
                  textValue={label}
                >
                  {label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </Collection>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Unit */}

      <Select
        placeholder="Filter by units"
        variant="secondary"
        selectionMode="multiple"
        value={filter.units}
        onChange={(keys) =>
          setFilter((prev) => ({
            ...prev,
            units: keys,
          }))
        }
      >
        <Label>Units</Label>
        <Select.Trigger>
          <Select.Value className="text-sm" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="multiple">
            <Collection items={units}>
              {({ value, label }) => (
                <ListBox.Item
                  id={value}
                  textValue={label}
                >
                  {label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </Collection>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Store */}
      
      <div className="flex flex-col gap-1">
        <Label>Stores</Label>

        <StoreTable
          stores={stores}
          filter={filter}
          setFilter={setFilter}
          expandedKeys={storeTableExpandedKeys}
          setExpandedKeys={setStoreTableExpandedKeys}
        />
      </div>
    </div>
  );
}

function StoreTable({
  stores,
  filter,
  setFilter,
  expandedKeys,
  setExpandedKeys,
}: {
  stores: StoreTree[];
  filter: Filter;
  setFilter: (value: Filter | ((prev: Filter) => Filter)) => void;
  expandedKeys: Selection;
  setExpandedKeys: (
    value: Selection | ((prev: Selection) => Selection),
  ) => void;
}) {
  const renderExpandableRow = (item: StoreTree) => {
    return (
      <Table.Row
        id={item.id}
        textValue={item.name}
      >
        <Table.Cell textValue={item.name}>
          {({ hasChildItems, isDisabled, isExpanded, isTreeColumn }) => (
            <span className="flex h-6 items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  aria-label="Select"
                  slot="selection"
                  variant="secondary"
                >
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>
                <span>{item.name}</span>
              </div>
              {hasChildItems && isTreeColumn && (
                <div className="flex items-center gap-2">
                  <Chip
                    size="sm"
                    color="accent"
                    variant="soft"
                  >
                    {item.descendants.length}
                  </Chip>
                  <Button
                    isIconOnly
                    aria-label="Toggle row"
                    isDisabled={isDisabled}
                    size="sm"
                    slot="chevron"
                    variant="ghost"
                  >
                    {isExpanded ? (
                      <Minus className="size-3 text-muted" />
                    ) : (
                      <Plus className="size-3 text-muted" />
                    )}
                  </Button>
                </div>
              )}
            </span>
          )}
        </Table.Cell>
        <Table.Collection items={item.descendants}>
          {renderExpandableRow}
        </Table.Collection>
      </Table.Row>
    );
  };

  return (
    <Table className="border p-0">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Stores"
          expandedKeys={expandedKeys}
          onExpandedChange={setExpandedKeys}
          treeColumn="name"
          selectionMode="multiple"
          selectedKeys={filter.stores}
          onSelectionChange={(keys) => {
            setFilter((prev) => ({
              ...prev,
              stores: Array.from(keys),
            }));
          }}
        >
          <Table.Header className="hidden">
            <Table.Column
              isRowHeader
              id="name"
            >
              Name
            </Table.Column>
          </Table.Header>
          <Table.Body items={stores}>{renderExpandableRow}</Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
