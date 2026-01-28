"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusMenu from "../../components/ModusMenu";

// Menu with icons using correct Modus icon names
const projectMenu = [
  {
    label: "Overview",
    value: "overview",
    selected: true,
    startIcon: "dashboard",
  },
  { label: "Tasks", value: "tasks", startIcon: "check" },
  { label: "Files", value: "files", startIcon: "folder_open" },
  { label: "Activity", value: "activity", startIcon: "history" },
];

// Menu without icons
const compactMenu = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly", selected: true },
  { label: "Monthly", value: "monthly" },
];

// Menu with mixed icons and no icons
const mixedMenu = [
  { label: "Dashboard", value: "dashboard", startIcon: "dashboard" },
  { label: "Projects", value: "projects" }, // No icon
  { label: "Settings", value: "settings", startIcon: "settings" },
  { label: "Help", value: "help", startIcon: "help" },
];

export default function MenuDemoPage() {
  return (
    <DemoPage
      title="Modus Menu"
      description="Menus list navigation destinations or quick filters. Keep item labels short and highlight only one selection at a time."
    >
      <DemoExample
        title="Navigation menu with icons"
        description="Vertical menus with icons help users quickly identify sections. Use consistent icon sizing and meaningful icons."
      >
        <ModusMenu items={projectMenu} bordered size="lg" />
      </DemoExample>

      <DemoExample
        title="Simple menu without icons"
        description="Clean menus without icons work well for simple navigation or when icons don't add value."
      >
        <ModusMenu items={compactMenu} orientation="horizontal" size="sm" />
      </DemoExample>

      <DemoExample
        title="Mixed menu (some with icons, some without)"
        description="You can mix items with and without icons in the same menu. This is useful when only some items benefit from visual identification."
      >
        <ModusMenu items={mixedMenu} bordered size="md" />
      </DemoExample>

      <DemoExample
        title="Vertical menu without icons"
        description="Simple vertical menu for basic navigation without visual clutter."
      >
        <ModusMenu items={compactMenu} size="md" />
      </DemoExample>
    </DemoPage>
  );
}
