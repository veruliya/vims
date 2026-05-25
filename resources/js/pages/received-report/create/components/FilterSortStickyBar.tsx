import { StickyBar } from '@/components/StickyBar';

import { FilterDrawer } from "./FilterDrawer";
import { SortDrawer } from "./SortDrawer";

export function FilterSortStickyBar() {

  return (
    <StickyBar placement="top">
      <div className="flex items-center gap-2 p-2">
        <FilterDrawer />
        <SortDrawer />
      </div>
    </StickyBar>
  )
}