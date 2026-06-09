import { Funnel } from '@gravity-ui/icons';

import { Drawer, Button } from '@heroui/react';

import { usePage } from '@inertiajs/react';

import { useState } from 'react';

import { useShow } from '../contexts/ShowContext';

import { Filters } from './Filters';

import type { Selection } from '@heroui/react';
import type { PageProps, Filter } from '../types';

export function FilterDrawer() {
  const { http, setHasMore, setMovements } = useShow();

  const { receivedReport } = usePage<PageProps>().props;

  const initialFilter = {
    movementable_id: receivedReport.id.toString(),
    type: 'RECEIVED',
    categories: [],
    severities: [],
    subcategories: [],
    units: [],
    stores: [],
    name: '',
  };

  const [filter, setFilter] = useState<Filter>(initialFilter);

  const [storeTableExpandedKeys, setStoreTableExpandedKeys] =
    useState<Selection>(new Set());

  const [showAllSubcategories, setShowAllSubcategories] =
    useState<boolean>(false);
  const [showAllUnits, setShowAllUnits] = useState<boolean>(false);

  function applyFilter() {
    http.setData((data) => ({
      ...data,
      cursor: null,
      filter: filter,
    }));
    setMovements([]);
    setHasMore(true);
  }

  function clearFilter() {
    http.setData((data) => ({
      ...data,
      cursor: null,
      filter: initialFilter,
    }));
    setFilter(initialFilter);
    setMovements([]);
    setHasMore(true);
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
                showAllSubcategories={showAllSubcategories}
                setShowAllSubcategories={setShowAllSubcategories}
                showAllUnits={showAllUnits}
                setShowAllUnits={setShowAllUnits}
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
