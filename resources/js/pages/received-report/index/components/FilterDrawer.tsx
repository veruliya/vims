import { Drawer, Button } from '@heroui/react';
import type { DateValue } from '@heroui/react';

import { useState } from 'react';

import { Filters } from './Filters';

import type { Filter } from '../types';

import { useIndex } from '../contexts/IndexContext';

import { Funnel } from '@gravity-ui/icons';

export const initialFilter = {
  name: '',
  number: '',
  from: '',
  to: '',
};

export function FilterDrawer() {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [from, setFrom] = useState<DateValue | null>(null);
  const [to, setTo] = useState<DateValue | null>(null);

  const { http, setReceivedReports, setHasMore } = useIndex();

  function applyFilter() {
    http.setData((data) => ({
      ...data,
      cursor: null,
      filter: filter,
    }));
    setReceivedReports([]);
    setHasMore(true);
  }

  function clearFilter() {
    http.setData((data) => ({
      ...data,
      cursor: null,
      filter: initialFilter,
    }));
    setFilter(initialFilter);
    setReceivedReports([]);
    setHasMore(true);
    setFrom(null)
    setTo(null)
  }

  return (
    <Drawer>
      <Button
        variant="secondary"
        isIconOnly
      >
        <Funnel />
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="bottom">
          <Drawer.Dialog>
            <Drawer.Handle />
            <Drawer.CloseTrigger /> {/* Optional: Close button */}
            <Drawer.Header>
              <Drawer.Heading>Filter</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <Filters
                filter={filter}
                setFilter={setFilter}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
              />
            </Drawer.Body>
            <Drawer.Footer>
              <div className="flex w-full justify-between">
                <Button
                  onPress={clearFilter}
                  variant="danger"
                  slot="close"
                >
                  Clear Filter
                </Button>
                <Button
                  slot="close"
                  onPress={applyFilter}
                >
                  Apply Filter
                </Button>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
