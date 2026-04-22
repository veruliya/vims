import { Button, Drawer } from '@heroui/react';
import { Bars } from '@gravity-ui/icons';
import { SidebarNavigation } from "./sidebar-navigation";

export function SmallScreenSidebar() {
  return (
    <Drawer>
      <Button
        slot="trigger"
        isIconOnly
        variant="ghost"
        className="sm:hidden"
      >
        <Bars />
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.Body>
              <nav>
                <SidebarNavigation />
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
