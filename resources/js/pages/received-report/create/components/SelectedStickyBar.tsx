import { StickyBar } from '@/components/StickyBar';

import { useSelected } from '../contexts/SelectedContext';

import { SelectedDrawer } from './SelectedDrawer';

export function SelectedStickyBar() {
  const { form } = useSelected();

  return (
    <StickyBar placement="bottom">
      <div className="flex items-center justify-between p-4">
        <span className="text-sm font-semibold">{`${form.data.storeItems.length} items selected`}</span>
        <SelectedDrawer />
      </div>
    </StickyBar>
  );
}
