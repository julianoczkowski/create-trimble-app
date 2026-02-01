"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusDropdownMenu from "../../components/ModusDropdownMenu";
import type { MenuItem } from "../../components/ModusMenu";

// Menu items for basic examples
const basicMenuItems: MenuItem[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const actionMenuItems: MenuItem[] = [
  { label: "Action 1", value: "action1" },
  { label: "Action 2", value: "action2" },
];

const itemMenuItems: MenuItem[] = [
  { label: "Item 1", value: "item1" },
  { label: "Item 2", value: "item2" },
];

export default function DropdownDemoPage() {
  return (
    <DemoPage
      title="Modus Dropdown Menu"
      description="Dropdown menus provide a compact way to display multiple actions or options in a menu that opens on demand."
    >
      {/* Button Colors */}
      <DemoExample
        title="Button Colors"
        description="Dropdown menus with different button colors."
      >
        <div className="flex flex-wrap gap-4">
          <ModusDropdownMenu
            buttonColor="primary"
            menuItems={basicMenuItems}
            buttonContent={<div>Primary</div>}
          />
          <ModusDropdownMenu
            buttonColor="secondary"
            menuItems={basicMenuItems}
            buttonContent={<div>Secondary</div>}
          />
          <ModusDropdownMenu
            buttonColor="tertiary"
            menuItems={basicMenuItems}
            buttonContent={<div>Tertiary</div>}
          />
        </div>
      </DemoExample>

      {/* Button Variants */}
      <DemoExample
        title="Button Variants"
        description="Dropdown menus with different button visual styles."
      >
        <div className="flex flex-wrap gap-4">
          <ModusDropdownMenu
            buttonVariant="filled"
            menuItems={actionMenuItems}
            buttonContent={<div>Filled</div>}
          />
          <ModusDropdownMenu
            buttonVariant="outlined"
            menuItems={actionMenuItems}
            buttonContent={<div>Outlined</div>}
          />
          <ModusDropdownMenu
            buttonVariant="borderless"
            menuItems={actionMenuItems}
            buttonContent={<div>Borderless</div>}
          />
        </div>
      </DemoExample>

      {/* Custom Button Content */}
      <DemoExample
        title="Custom Button Content"
        description="Dropdown menus with custom button content including icons."
      >
        <div className="flex flex-wrap gap-4">
          <ModusDropdownMenu
            menuItems={[
              { label: "Preferences", value: "prefs" },
              { label: "Account", value: "account" },
            ]}
            buttonContent={
              <div className="flex items-center gap-2">
                <i className="modus-icons text-lg">settings</i>
                <div>Settings</div>
              </div>
            }
          />
          <ModusDropdownMenu
            menuItems={[
              { label: "Profile", value: "profile" },
              { label: "Settings", value: "settings" },
              { label: "Log out", value: "logout" },
            ]}
            buttonContent={
              <div className="flex items-center gap-2">
                <i className="modus-icons text-lg">user_account</i>
                <div>User Menu</div>
                <i className="modus-icons text-sm">expand_more</i>
              </div>
            }
          />
        </div>
      </DemoExample>

      {/* Menu Placement */}
      <DemoExample
        title="Menu Placement"
        description="Different menu placement options relative to the button."
      >
        <div className="flex flex-wrap gap-4">
          <ModusDropdownMenu
            menuPlacement="bottom-start"
            menuItems={itemMenuItems}
            buttonContent={<div>Bottom Start</div>}
          />
          <ModusDropdownMenu
            menuPlacement="bottom-end"
            menuItems={itemMenuItems}
            buttonContent={<div>Bottom End</div>}
          />
          <ModusDropdownMenu
            menuPlacement="top-start"
            menuItems={itemMenuItems}
            buttonContent={<div>Top Start</div>}
          />
        </div>
      </DemoExample>

      {/* Disabled State */}
      <DemoExample
        title="Disabled State"
        description="Dropdown menu in disabled state."
      >
        <ModusDropdownMenu
          disabled={true}
          menuItems={itemMenuItems}
          buttonContent={<div>Disabled Menu</div>}
        />
      </DemoExample>
    </DemoPage>
  );
}
