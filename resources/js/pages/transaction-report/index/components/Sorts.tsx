import { RadioGroup, Radio, Label } from '@heroui/react';

import { useIndex } from '../contexts/IndexContext';

const options = [
  {
    value: 'id',
    label: 'Lowest Report Number',
  },
  {
    value: '-id',
    label: 'Highest Report Number',
  },
  {
    value: 'created_at',
    label: 'Oldest First',
  },
  {
    value: '-created_at',
    label: 'Newest First',
  },
  {
    value: 'name',
    label: 'A → Z Creator Name',
  },
  {
    value: '-name',
    label: 'Z → A Creator Name',
  },
];

export function Sorts() {
  const { http, setReceivedReports, setHasMore } = useIndex();

  function applySort(value: string) {
    http.setData((data) => ({
      ...data,
      cursor: null,
      sort: value,
    }));
    setReceivedReports([]);
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
