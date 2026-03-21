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

function BasicSideNav() {
  const [expanded, setExpanded] = createSignal(false);
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [selectedItem, setSelectedItem] = createSignal<string | null>(
    "dashboard",
  );

  const handleMainMenuOpenChange = (open: boolean) => {
    setMenuOpen(open);
    setExpanded(open);
  };

  const handleExpandedChange = (exp: boolean) => {
    setExpanded(exp);
    setMenuOpen(exp);
  };

  return (
    <DemoExample
      title="Basic Side Navigation"
      description="Side navigation with navbar and hamburger menu. Click the menu icon to expand."
    >
      <div class="overflow-hidden rounded-lg border-default" style="height: 320px">
        <ModusNavbar
          userCard={userCard}
          visibility={{
            mainMenu: true,
            search: true,
            notifications: false,
            apps: false,
            ai: false,
            help: false,
            user: true,
          }}
          mainMenuOpen={menuOpen()}
          onMainMenuOpenChange={handleMainMenuOpenChange}
          mainMenuContent={
            <ModusSideNavigation
              items={navItems}
              expanded={expanded()}
              targetContent="#basic-sidenav-content"
              onExpandedChange={handleExpandedChange}
              onItemSelect={(item) => setSelectedItem(item.value)}
            />
          }
        />
        <div class="flex" style="height: calc(100% - 56px)">
          <div
            id="basic-sidenav-content"
            class="flex-1 p-4 bg-card"
          >
            <div class="text-sm text-foreground font-semibold mb-1">
              Selected: {selectedItem() ?? "None"}
            </div>
            <div class="text-xs text-muted-foreground">
              Click the hamburger menu icon in the navbar to expand the
              side navigation panel.
            </div>
          </div>
        </div>
      </div>
    </DemoExample>
  );
}

function NavbarWithSideNav() {
  const [expanded, setExpanded] = createSignal(false);
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [selectedItem, setSelectedItem] = createSignal<string | null>(
    "dashboard",
  );

  const handleMainMenuOpenChange = (open: boolean) => {
    setMenuOpen(open);
    setExpanded(open);
  };

  const handleExpandedChange = (exp: boolean) => {
    setExpanded(exp);
    setMenuOpen(exp);
  };

  return (
    <DemoExample
      title="Side Navigation with All Navbar Controls"
      description="Side navigation with full navbar including search, notifications, help, and apps."
    >
      <div class="overflow-hidden rounded-lg border-default" style="height: 320px">
        <ModusNavbar
          userCard={userCard}
          visibility={{
            mainMenu: true,
            search: true,
            notifications: true,
            apps: true,
            ai: false,
            help: true,
            user: true,
          }}
          mainMenuOpen={menuOpen()}
          onMainMenuOpenChange={handleMainMenuOpenChange}
          mainMenuContent={
            <ModusSideNavigation
              items={navItems}
              expanded={expanded()}
              targetContent="#navbar-sidenav-content"
              onExpandedChange={handleExpandedChange}
              onItemSelect={(item) => setSelectedItem(item.value)}
            />
          }
        />
        <div class="flex" style="height: calc(100% - 56px)">
          <div
            id="navbar-sidenav-content"
            class="flex-1 p-4 bg-card"
          >
            <div class="text-sm text-foreground font-semibold mb-1">
              Selected: {selectedItem() ?? "None"}
            </div>
            <div class="text-xs text-muted-foreground">
              Click the hamburger menu icon in the navbar above to open the
              side navigation panel.
            </div>
          </div>
        </div>
      </div>
    </DemoExample>
  );
}

export default function SideNavigationDemoPage() {
  return (
    <DemoPage
      title="Modus Side Navigation"
      description="Side navigation provides hierarchical navigation for applications. It can be integrated with the navbar for a consistent layout."
    >
      <BasicSideNav />
      <NavbarWithSideNav />
    </DemoPage>
  );
}
