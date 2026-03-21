import { createSignal } from "solid-js";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusNavbar from "../../components/ModusNavbar";
import ModusSideNavigation from "../../components/ModusSideNavigation";
import type { MenuItem } from "../../components/ModusMenu";

const navItems: MenuItem[] = [
  { label: "Dashboard", value: "dashboard", startIcon: "dashboard" },
  { label: "Projects", value: "projects", startIcon: "folder_open" },
  { label: "Team", value: "team", startIcon: "people_group" },
  { label: "Calendar", value: "calendar", startIcon: "calendar" },
  { label: "Documents", value: "documents", startIcon: "description" },
  { label: "Reports", value: "reports", startIcon: "bar_graph" },
];

const userCard = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarSrc: "",
  avatarAlt: "User Avatar",
};

export default function SideNavigationDemoPage() {
  const [sideNavExpanded, setSideNavExpanded] = createSignal(false);
  const [mainMenuOpen, setMainMenuOpen] = createSignal(false);
  const [selectedItem, setSelectedItem] = createSignal<string | null>("dashboard");

  const handleMainMenuOpenChange = (open: boolean) => {
    setMainMenuOpen(open);
    setSideNavExpanded(open);
  };

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item.value);
  };

  const handleExpandedChange = (expanded: boolean) => {
    setSideNavExpanded(expanded);
    setMainMenuOpen(expanded);
  };

  return (
    <DemoPage
      title="Modus Side Navigation"
      description="Side navigation provides hierarchical navigation for applications. It can be integrated with the navbar for a consistent layout."
    >
      <DemoExample
        title="Basic Side Navigation"
        description="Standalone side navigation with menu items."
      >
        <div class="flex gap-4">
          <ModusSideNavigation
            items={navItems}
            expanded={sideNavExpanded()}
            targetContent="#basic-sidenav-content"
            onExpandedChange={handleExpandedChange}
            onItemSelect={handleItemSelect}
          />
          <div
            id="basic-sidenav-content"
            class="flex-1 p-4 rounded-lg bg-card border-default overflow-hidden"
          >
            <div class="text-sm text-muted-foreground mb-2">
              Selected: {selectedItem() ?? "None"}
            </div>
            <ModusNavbar
              userCard={userCard}
              visibility={{
                mainMenu: true,
                search: false,
                notifications: false,
                apps: false,
                ai: false,
                help: false,
                user: true,
              }}
              mainMenuOpen={mainMenuOpen()}
              onMainMenuOpenChange={handleMainMenuOpenChange}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Side Navigation with Navbar"
        description="Side navigation integrated with navbar. Use the menu icon to toggle."
      >
        <div class="flex flex-col gap-4">
          <ModusNavbar
            userCard={userCard}
            visibility={{
              mainMenu: true,
              search: false,
              notifications: false,
              apps: false,
              ai: false,
              help: false,
              user: true,
            }}
            mainMenuOpen={mainMenuOpen()}
            onMainMenuOpenChange={handleMainMenuOpenChange}
            mainMenuContent={
              <ModusSideNavigation
                items={navItems}
                expanded={sideNavExpanded()}
                targetContent="#navbar-sidenav-content"
                onExpandedChange={handleExpandedChange}
                onItemSelect={handleItemSelect}
              />
            }
          />
          <div
            id="navbar-sidenav-content"
            class="p-4 rounded-lg bg-card border-default"
          >
            <div class="text-sm text-foreground">
              Main content area. Click the menu icon in the navbar to open the
              side navigation.
            </div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
