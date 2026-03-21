import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusMenu from "../../components/ModusMenu";

const verticalMenuItems = [
  { label: "Dashboard", value: "dashboard", selected: true },
  { label: "Projects", value: "projects" },
  { label: "Reports", value: "reports" },
  { label: "Settings", value: "settings" },
];

const horizontalMenuItems = [
  { label: "Home", value: "home" },
  { label: "Products", value: "products" },
  { label: "About", value: "about" },
  { label: "Contact", value: "contact" },
];

const selectedMenuItems = [
  { label: "All Projects", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived", selected: true },
  { label: "Deleted", value: "deleted" },
];

export default function MenuDemoPage() {
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
        <ModusMenu items={selectedMenuItems} bordered />
      </DemoExample>
    </DemoPage>
  );
}
