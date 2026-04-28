import { Plus } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import { router } from '@inertiajs/react';

import { create } from "@/actions/App/Http/Controllers/Report/ReceivedController";

export default function Index() {
  return (
    <div className="flex-1 p-4">
      <div className="flex justify-end">
        <Button
          variant="secondary"
          onPress={() => router.get(create())}
        >
          <Plus />
          Create
        </Button>
      </div>
    </div>
  );
}
