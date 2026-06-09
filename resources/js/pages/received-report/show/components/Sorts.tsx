import { RadioGroup, Radio, Label } from '@heroui/react';

import { useShow } from '../contexts/ShowContext';

const options = [
  {
    value: 'id',
    label: 'Default',
  },
  {
    value: '-quantity',
    label: 'Highest Received Quantity',
  },
  {
    value: 'quantity',
    label: 'Lowest Received Quantity',
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
  const { http, setMovements, setHasMore } = useShow();

  function applySort(value: string) {
    http.setData((data) => ({
      ...data,
      cursor: null,
      sort: value,
    }));
    setMovements([]);
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
