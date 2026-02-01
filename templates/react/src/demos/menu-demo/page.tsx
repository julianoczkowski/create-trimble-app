"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusMenu from "../../components/ModusMenu";

export default function MenuDemoPage() {
  const [selectedMenu, setSelectedMenu] = useState<string>("all");

  // Vertical Menu items
  const verticalMenuItems = [
    { label: "Dashboard", value: "dashboard", selected: true },
    { label: "Projects", value: "projects" },
    { label: "Reports", value: "reports" },
    { label: "Settings", value: "settings" },
  ];

  // Horizontal Menu items
  const horizontalMenuItems = [
    { label: "Home", value: "home" },
    { label: "Products", value: "products" },
    { label: "About", value: "about" },
    { label: "Contact", value: "contact" },
  ];

  // Selected Menu Items
  const selectedMenuItems = [
    { label: "All Projects", value: "all", selected: selectedMenu === "all" },
    { label: "Active", value: "active", selected: selectedMenu === "active" },
    { label: "Archived", value: "archived", selected: selectedMenu === "archived" },
    { label: "Deleted", value: "deleted", selected: selectedMenu === "deleted" },
  ];

  const handleSelectedMenuChange = (item: { label: string; value: string }) => {
    setSelectedMenu(item.value);
  };

  return (
    <DemoPage
      title="Modus Menu"
      description="Menus provide navigation and action lists. Use menus to organize related actions or navigation items in a consistent, accessible way."
    >
      <DemoExample
        title="Vertical Menu"
        description="Default vertical menu orientation for navigation lists."
      >
        <ModusMenu items={verticalMenuItems} bordered />
      </DemoExample>

      <DemoExample
        title="Horizontal Menu"
        description="Horizontal menu orientation for top navigation."
      >
        <ModusMenu items={horizontalMenuItems} orientation="horizontal" />
      </DemoExample>

      <DemoExample
        title="Selected Menu Items"
        description="Menu with selected items to indicate current state."
      >
        <ModusMenu
          items={selectedMenuItems}
          bordered
          onItemSelect={handleSelectedMenuChange}
        />
      </DemoExample>
    </DemoPage>
  );
}
