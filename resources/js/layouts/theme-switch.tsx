import { Tabs } from '@heroui/react';
import { Sun, Moon } from '@gravity-ui/icons';

import { useTheme } from '@heroui/react';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme('system');

  return (
    <Tabs
      className="ml-auto"
      selectedKey={theme}
      onSelectionChange={(key) => setTheme(key as string)}
    >
      <Tabs.ListContainer>
        <Tabs.List
          aria-label="Theme Switch"
          className="w-fit"
        >
          <Tabs.Tab id="light">
            <Sun />
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="dark">
            <Moon />
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
