import { SidebarNavigation } from "./sidebar-navigation";

export function LargeScreenSidebar() {
  return (
    <div className="hidden grid-rows-[auto] border-r p-4 sm:grid">
      <nav aria-label="Primary">
        <SidebarNavigation />
      </nav>
    </div>
  );
}
