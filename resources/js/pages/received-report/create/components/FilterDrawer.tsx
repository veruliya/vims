import { Drawer, Button } from '@heroui/react';
import type { Selection } from '@heroui/react';

import { useState } from 'react';

import { Filters } from './Filters';

import type { Filter } from '../types';

import { useSelection } from '../contexts/SelectionContext';

import { Funnel } from '@gravity-ui/icons';

export const initialFilter = {
  categories: [],
  severities: [],
  subcategories: [],
  units: [],
  stores: [],
  name: '',
};

export function FilterDrawer() {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [storeTableExpandedKeys, setStoreTableExpandedKeys] =
    useState<Selection>(new Set());

  const { http, setStoreItems, setHasMore } = useSelection();

  function applyFilter() {
    http.setData((data) => ({
      ...data,
      cursor: null,
      filter: filter,
    }));
    setStoreItems([]);
    setHasMore(true);
  }

  function clearFilter() {
    http.setData((data) => ({
      ...data,
      cursor: null,
      filter: initialFilter,
    }));
    setFilter(initialFilter);
    setStoreItems([]);
    setHasMore(true);
  }

  return (
    <Drawer>
      <Button
        variant="secondary"
        fullWidth
      >
        <Funnel />
        Filter
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger /> {/* Optional: Close button */}
            <Drawer.Header>
              <Drawer.Heading>Filter</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <Filters
                filter={filter}
                setFilter={setFilter}
                storeTableExpandedKeys={storeTableExpandedKeys}
                setStoreTableExpandedKeys={setStoreTableExpandedKeys}
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
                <Button slot="close" onPress={applyFilter}>Apply Filter</Button>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
