import { ThemeSwitch } from './theme-switch';
import { SmallScreenSidebar } from './small-screen-sidebar';
import { LargeScreenSidebar } from "./large-screen-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-rows-[4rem_auto]">
      <header className="flex items-center border-b px-2">
        <SmallScreenSidebar />
        <ThemeSwitch />
      </header>
      <div className="sm:grid sm:grid-cols-[16rem_auto]">
        <LargeScreenSidebar />
        <main className="flex flex-col min-h-full">{children}</main>
      </div>
    </div>
  );
}
