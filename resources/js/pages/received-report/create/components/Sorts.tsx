import { RadioGroup, Radio, Label } from '@heroui/react';

import { useSelection } from '../contexts/SelectionContext';

const options = [
  {
    value: 'id',
    label: 'Default',
  },
  {
    value: '-available_quantity',
    label: 'Highest Available Stock Quantity',
  },
  {
    value: 'available_quantity',
    label: 'Lowest Available Stock Quantity',
  },
  {
    value: 'name',
    label: 'A → Z Name',
  },
  {
    value: '-name',
    label: 'Z → A Name',
  },
  {
    value: 'unit',
    label: 'A → Z Unit',
  },
  {
    value: '-unit',
    label: 'Z → A Unit',
  },
  {
    value: 'subcategory',
    label: 'A → Z Subcategory',
  },
  {
    value: '-subcategory',
    label: 'Z → A Subcategory',
  },
];

export function Sorts() {
  const { http, setStoreItems, setHasMore } = useSelection();

  function applySort(value: string) {
    http.setData((data) => ({
      ...data,
      cursor: null,
      sort: value,
    }));
    setStoreItems([]);
    setHasMore(true);
  }

  return (
    <RadioGroup
      name="sort"
      variant="secondary"
      value={http.data.sort}
      onChange={applySort}
    >
      {options.map(({ value, label }) => (
        <Radio
          key={value}
          value={value}
        >
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>{label}</Label>
          </Radio.Content>
        </Radio>
      ))}
    </RadioGroup>
  );
}
