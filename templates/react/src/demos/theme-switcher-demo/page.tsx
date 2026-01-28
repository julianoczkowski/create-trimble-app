"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusThemeSwitcher from "../../components/ModusThemeSwitcher";

export default function ThemeSwitcherDemoPage() {
  return (
    <DemoPage
      title="Modus Theme Switcher"
      description="The theme switcher toggles between Modus light and dark modes. Place it in the header or settings where users expect personalization controls."
    >
      <DemoExample
        title="Theme toggle"
        description="Use the default configuration to respect system preferences and allow quick switching."
      >
        <div className="flex items-center gap-4">
          <ModusThemeSwitcher ariaLabel="Switch theme" />
          <div className="text-sm text-foreground opacity-80">
            Toggle between light and dark experiences.
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
