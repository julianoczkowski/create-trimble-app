# Scaffold Shell Application

Create a shell application with navbar, side navigation, and routing for your Modus SolidJS app through a conversational setup flow.

## Overview

This command guides you through creating a complete application shell with:

- ModusNavbar with standard Trimble logo and user avatar
- ModusSideNavigation with customizable menu items
- @solidjs/router nested routing (SPA - no page reloads)
- Placeholder pages for each navigation item

**IMPORTANT:** This command preserves all dev panel and demo content. The dev panel (Ctrl+Shift+D) and all demo pages will continue to work.

---

## Step 1: Gather Requirements (Conversational)

### Navigation Menu Items

Ask the user ONE simple question:

> **What navigation menu labels would you like?**
>
> Enter labels separated by commas (e.g., Dashboard, Projects, Settings), or just tell me to use defaults.

**Default navigation items** (use if user skips or presses Enter). Format: label, startIcon, value (route):

```
Dashboard, dashboard, /dashboard
Projects, folder_open, /projects
Settings, settings, /settings
```

---

## Internal Reference: Icon Name Mapping (DO NOT SHOW TO USER)

When processing user input, automatically map labels to appropriate icons and routes.

**Icon mapping rules:**

- Dashboard -> `dashboard`
- Projects / Project -> `folder_open`
- Settings / Setting -> `settings`
- Home -> `home`
- Team / Teams / Users / People -> `people`
- Reports / Report / Analytics -> `bar_graph_line`
- Profile / Account / User -> `account_circle`
- Notifications / Alerts -> `notifications`
- Messages / Chat / Inbox -> `mail`
- Calendar / Schedule -> `calendar`
- Files / Documents -> `file_present`
- Help / Support -> `help`
- Search -> `search`
- Favorites / Bookmarks -> `star`
- History / Activity -> `history`

**CRITICAL icon naming rules (many icons require suffixes):**

- `folder` -> Use `folder_open` or `folder_closed`
- `visibility` -> Use `visibility_on` or `visibility_off`
- `bar_graph` -> Use `bar_graph_line` or `bar_graph_square`

**Route generation:** Convert label to lowercase, replace spaces with hyphens, prefix with `/`

- "User Profile" -> `/user-profile`
- "My Projects" -> `/my-projects`

**Always verify icon names against `.cursor/rules/modus-icon-names.mdc` before generating code.**

---

## Step 2: Create the layouts Directory

Create the directory `src/layouts/` if it doesn't exist.

---

## Step 3: Create AppShell.tsx

Create the file `src/layouts/AppShell.tsx` with the following content.

**IMPORTANT:** Replace the placeholder:

- `{{NAV_ITEMS}}` - The navigation items array from Step 1

**NOTE:** The navbar uses the standard Trimble logo and includes a bottom border via the `border-bottom-default` wrapper class.

```tsx
import { createSignal, createMemo } from "solid-js";
import { Outlet, useNavigate, useLocation } from "@solidjs/router";
import ModusNavbar from "../components/ModusNavbar";
import ModusSideNavigation, { type ModusSideNavigationItem } from "../components/ModusSideNavigation";

// Navigation items - generated based on user input (MenuItem: label, value, startIcon)
const NAV_ITEMS: ModusSideNavigationItem[] = [
  {{NAV_ITEMS}}
];

/**
 * AppShell - Main application layout with navbar and side navigation.
 *
 * Features:
 * - ModusNavbar with product logo and user avatar
 * - Collapsible side navigation synced with navbar hamburger menu
 * - @solidjs/router Outlet for nested route content
 * - SPA navigation (no page reloads)
 */
export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideNavExpanded, setSideNavExpanded] = createSignal(false);

  const userCard = {
    name: "User Name",
    email: "user@example.com",
    avatarSrc: "",
    avatarAlt: "User Avatar",
  };

  const handleNavbarMenuOpenChange = (isOpen: boolean) => {
    setSideNavExpanded(isOpen);
  };

  const isActiveRoute = (route: string) => {
    const pathname = location.pathname;
    if (route === "/" || route === "") {
      return pathname === "/" || pathname === "";
    }
    return pathname === route || pathname.startsWith(route + "/");
  };

  const navItems = createMemo(() =>
    NAV_ITEMS.map((item) => ({
      ...item,
      selected: isActiveRoute(item.value),
    }))
  );

  const handleItemSelect = (item: ModusSideNavigationItem) => {
    navigate(item.value);
  };

  return (
    <div class="h-screen flex flex-col bg-background">
      <div class="border-bottom-default">
        <ModusNavbar
          userCard={userCard}
          visibility={{ mainMenu: true, user: true }}
          onMainMenuOpenChange={handleNavbarMenuOpenChange}
        />
      </div>

      <div class="flex flex-1 overflow-hidden relative">
        <div class="h-full absolute left-0 top-0 z-50">
          <ModusSideNavigation
            items={navItems()}
            expanded={sideNavExpanded()}
            collapseOnClickOutside={true}
            maxWidth="256px"
            size="lg"
            onExpandedChange={setSideNavExpanded}
            onItemSelect={handleItemSelect}
          />
        </div>

        <div
          id="main-content"
          class="flex-1 overflow-auto ml-16 transition-all duration-200"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
```

**NAV_ITEMS format** (MenuItem: label, value, startIcon):

```typescript
const NAV_ITEMS: ModusSideNavigationItem[] = [
  { label: "Dashboard", value: "/dashboard", startIcon: "dashboard" },
  { label: "Projects", value: "/projects", startIcon: "folder_open" },
  { label: "Settings", value: "/settings", startIcon: "settings" },
];
```

**IMPORTANT:** Use valid Modus icon names. Check `.cursor/rules/modus-icon-names.mdc`.

---

## Step 4: Create Placeholder Pages

For each navigation item, create a placeholder page in `src/pages/`.

**Naming Convention:**

- Route `/dashboard` -> `DashboardPage.tsx`
- Route `/projects` -> `ProjectsPage.tsx`
- Route `/user-profile` -> `UserProfilePage.tsx`
- Route `/` (home) -> Use existing `HomePage.tsx`

**Placeholder Page Template (SolidJS):**

```tsx
import type { Component } from "solid-js";

/**
 * {{PAGE_TITLE}} Page
 *
 * Replace this placeholder with your actual page content.
 */
const {{COMPONENT_NAME}}: Component = () => {
  return (
    <div class="p-8">
      <div class="max-w-4xl">
        <div class="text-2xl font-bold text-foreground mb-4">
          {{PAGE_TITLE}}
        </div>
        <div class="text-foreground-60 mb-6">
          This is a placeholder page. Replace this content with your actual implementation.
        </div>
        <div class="bg-card border-default rounded-lg p-6">
          <div class="text-lg font-semibold text-foreground mb-2">
            Getting Started
          </div>
          <div class="text-sm text-foreground-60">
            Edit this file at <code class="px-1 py-0.5 bg-muted rounded text-sm">src/pages/{{COMPONENT_NAME}}.tsx</code> to build your page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default {{COMPONENT_NAME}};
```

**Replace placeholders:**

- `{{PAGE_TITLE}}` - The label from navigation (e.g., "Dashboard")
- `{{COMPONENT_NAME}}` - PascalCase page name (e.g., "DashboardPage")

---

## Step 5: Update HomePage.tsx

Replace the content of `src/pages/HomePage.tsx` with a clean placeholder:

```tsx
import type { Component } from "solid-js";

/**
 * Home Page - Application landing page.
 *
 * This page is part of the AppShell layout.
 * Customize the content for your application's home view.
 */
const HomePage: Component = () => {
  return (
    <div class="p-8">
      <div class="max-w-4xl">
        <div class="text-2xl font-bold text-foreground mb-4">Welcome</div>
        <div class="text-foreground-60 mb-6">
          Start building your application by editing this page.
        </div>
        <div class="bg-card border-default rounded-lg p-6">
          <div class="text-lg font-semibold text-foreground mb-2">
            Getting Started
          </div>
          <div class="text-sm text-foreground-60">
            Use the side navigation to explore different sections of your
            application. Press{" "}
            <code class="px-1 py-0.5 bg-muted rounded text-sm">
              Ctrl+Shift+D
            </code>{" "}
            to open the Dev Panel for component reference.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
```

---

## Step 6: Update App.tsx

Update `src/App.tsx` to use nested routing with AppShell.

**CRITICAL:** Keep all dev panel imports and usage intact!

```tsx
import { Router, Route } from "@solidjs/router";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DevPanelProvider, DevPanel, isDevPanelEnabled } from "./dev";
import { lazy } from "solid-js";

// Layouts
import AppShell from "./layouts/AppShell";

// Pages - add imports for each page created in Step 4
{{PAGE_IMPORTS}}

// Dev panel lazy imports (keep existing)
const ColorPalettePage = lazy(() => import("./dev-pages/ColorPalettePage"));
// ... other dev imports ...

export default function App() {
  const showDevPanel = isDevPanelEnabled();

  return (
    <ThemeProvider>
      <ModusProvider>
        <DevPanelProvider>
          <Router>
            <Route path="/" component={AppShell}>
              {{ROUTE_DEFINITIONS}}
            </Route>
            {showDevPanel && (
              <>
                <Route path="/dev/colors" component={ColorPalettePage} />
                {/* ... other dev routes ... */}
              </>
            )}
          </Router>
          {showDevPanel && <DevPanel />}
        </DevPanelProvider>
      </ModusProvider>
    </ThemeProvider>
  );
}
```

**Replace placeholders:**

`{{PAGE_IMPORTS}}` example:

```tsx
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import SettingsPage from "./pages/SettingsPage";
```

`{{ROUTE_DEFINITIONS}}` example (nested inside AppShell Route):

```tsx
<Route path="/" component={HomePage} />
<Route path="/dashboard" component={DashboardPage} />
<Route path="/projects" component={ProjectsPage} />
<Route path="/settings" component={SettingsPage} />
```

**Note:** AppShell must render `<Outlet />` to display nested route content. The parent Route wraps AppShell; child Routes define the nested paths.

---

## Preserved Content (DO NOT MODIFY)

The following MUST remain intact:

### Files and Directories

- `src/dev/` - Dev panel infrastructure
- `src/demos/` - 48 component demo pages
- `src/dev-pages/` - Colors, Icons, Components gallery pages

### Functionality to Preserve

- Dev Panel toggle (Ctrl+Shift+D)
- All dev routes (/dev/colors, /dev/icons, /dev/components, /dev/demos/*)
- Theme switching in Dev Panel

---

## Verification Checklist

After scaffolding, verify the following:

### Build & Runtime

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` passes
- [ ] No console errors in browser

### Navbar

- [ ] Standard Trimble logo displays correctly
- [ ] Navbar has bottom border (via `border-bottom-default` wrapper)
- [ ] Hamburger menu button is visible
- [ ] User avatar area is present

### Side Navigation

- [ ] Hamburger menu toggles side navigation
- [ ] All menu items display with correct labels and icons
- [ ] **Icons are visible** (if not, check icon names are valid)
- [ ] Side navigation collapses when clicking outside
- [ ] Active route is highlighted in menu

### Navigation (SPA Behavior)

- [ ] Clicking menu items navigates to correct routes
- [ ] Navigation happens WITHOUT full page reload
- [ ] Browser URL updates on navigation
- [ ] Browser back/forward buttons work

### Dev Panel (CRITICAL)

- [ ] Ctrl+Shift+D opens Dev Panel
- [ ] Dev Panel shows theme switcher
- [ ] `/dev/colors` route works
- [ ] `/dev/icons` route works
- [ ] `/dev/components` route works
- [ ] `/dev/demos/*` routes work

---

## Notes

- The AppShell uses @solidjs/router's `<Outlet />` for rendering nested routes
- Side navigation uses "push" mode to push content aside when expanded
- The collapsed side nav width is 64px (4rem), providing icon-only navigation
- All navigation is SPA-style using @solidjs/router - no page reloads
- The `useLocation()` hook tracks the active route for menu highlighting
- Event listeners properly sync navbar hamburger state with side nav expanded state
- **SolidJS:** Use `createSignal`, `createEffect`, `onMount`, `onCleanup` instead of React hooks
- **SolidJS:** Use `class` instead of `className`
- Verify Modus web component tag names (e.g., `modus-side-navigation`) match the SolidJS template's usage
