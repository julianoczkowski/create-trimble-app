"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusDropdownMenu from "../../components/ModusDropdownMenu";
import type { MenuItem } from "../../components/ModusMenu";

// Interactive Actions Dropdown Component
function ActionsDropdown() {
  const [selectedAction, setSelectedAction] = useState<string>("");

  const handleItemSelect = (event: CustomEvent<{ value: string }>) => {
    const selectedValue = event.detail?.value;
    console.log("🎯 Action selected:", selectedValue);
    setSelectedAction(selectedValue || "");
  };

  const actionMenuItems: MenuItem[] = [
    { label: "Rename", value: "rename" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Archive", value: "archive" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <ModusDropdownMenu
        buttonColor="primary"
        buttonVariant="filled"
        menuItems={actionMenuItems}
        onItemSelect={handleItemSelect}
        buttonContent={
          <div className="flex items-center gap-2 ">
            <i className="modus-icons text-sm">more_vertical</i>
            <div>Actions</div>
          </div>
        }
      />
      {selectedAction && (
        <div className="text-sm text-muted-foreground">
          Last action: <div className="font-medium">{selectedAction}</div>
        </div>
      )}
    </div>
  );
}

// Interactive Filter Dropdown Component
function FilterDropdown() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleItemSelect = (event: CustomEvent<{ value: string }>) => {
    const selectedValue = event.detail?.value;
    console.log("🎯 Filter selected:", selectedValue);
    setSelectedFilter(selectedValue || "");
  };

  const getFilterLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      today: "Today",
      week: "This week",
      month: "This month",
    };
    return labels[value] || value;
  };

  const filterMenuItems: MenuItem[] = [
    { label: "Today", value: "today" },
    { label: "This week", value: "week" },
    { label: "This month", value: "month" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <ModusDropdownMenu
        buttonColor="secondary"
        buttonVariant="outlined"
        buttonSize="sm"
        menuPlacement="bottom-end"
        menuItems={filterMenuItems}
        onItemSelect={handleItemSelect}
        buttonContent={
          <div className="flex items-center gap-2 ">
            {selectedFilter ? getFilterLabel(selectedFilter) : "Filter"}
            <i className="modus-icons">expand_more</i>
          </div>
        }
      />
      {selectedFilter && (
        <div className="text-sm text-muted-foreground">
          Active filter:{" "}
          <div className="font-medium">{getFilterLabel(selectedFilter)}</div>
        </div>
      )}
    </div>
  );
}

export default function DropdownDemoPage() {
  return (
    <DemoPage
      title="Modus Dropdown"
      description="Dropdown menus reveal a short list of related actions. Use them for secondary commands or compact filters."
    >
      <DemoExample
        title="Interactive action list"
        description="Click items to see selection feedback. Menu closes automatically after selection."
      >
        <ActionsDropdown />
      </DemoExample>
      <DemoExample
        title="Dynamic filter dropdown"
        description="Button text updates to show selected filter. Menu closes automatically after selection."
      >
        <FilterDropdown />
      </DemoExample>
    </DemoPage>
  );
}
