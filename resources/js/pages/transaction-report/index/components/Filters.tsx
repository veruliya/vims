import {
  Description,
  SearchField,
  Label,
  I18nProvider,
  DateField,
  Calendar,
  DatePicker,
} from '@heroui/react';

import type { DateValue } from '@heroui/react';

import { Filter } from '../types';

export function Filters({
  filter,
  setFilter,
  from,
  setFrom,
  to,
  setTo,
}: {
  filter: Filter;
  setFilter: (value: Filter | ((prev: Filter) => Filter)) => void;
  from: DateValue | null;
  setFrom: (value: DateValue | null) => void;
  to: DateValue | null;
  setTo: (value: DateValue | null) => void;
}) {
  function updateFrom(value: DateValue | null) {
    setFilter((prev) => ({
      ...prev,
      from: value !== null ? value.toString() : '',
    }));

    setFrom(value);
  }

  function updateTo(value: DateValue | null) {
    setFilter((prev) => ({
      ...prev,
      to: value !== null ? value.toString() : '',
    }));

    setTo(value);
  }

  return (
    <I18nProvider locale="en-GB">
      <div className="flex flex-col gap-4">
        <DatePicker
          name="from"
          value={from}
          onChange={updateFrom}
        >
          <Label>From</Label>
          <DateField.Group
            fullWidth
            variant="secondary"
          >
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="From Date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>
                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>
              <Calendar.Grid>
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>
              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>

        <DatePicker
          name="to"
          value={to}
          onChange={updateTo}
        >
          <Label>To</Label>
          <DateField.Group
            fullWidth
            variant="secondary"
          >
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="To date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>
                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>
              <Calendar.Grid>
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>
              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>

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
          <Label>Creator Name</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="text-sm"
              placeholder="Filter by Creator Name"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <SearchField
          name="number"
          variant="secondary"
          value={filter.number}
          onChange={(value) =>
            setFilter((prev) => ({
              ...prev,
              number: value,
            }))
          }
        >
          <Label>Report Number</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="text-sm"
              placeholder="Filter by Report Number"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>e.g. 24, 8, 720</Description>
        </SearchField>
      </div>
    </I18nProvider>
  );
}
