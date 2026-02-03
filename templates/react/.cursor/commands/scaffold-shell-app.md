# Scaffold Shell Application

Create a shell application with navbar, side navigation, and routing for your Modus React app through a conversational setup flow.

## Overview

This command guides you through creating a complete application shell with:

- ModusNavbar with standard Trimble logo and user avatar
- ModusSideNavigation with customizable menu items
- React Router nested routing (SPA - no page reloads)
- Placeholder pages for each navigation item

**IMPORTANT:** This command preserves all dev panel and demo content. The dev panel (Ctrl+Shift+D) and all demo pages will continue to work.

---

## Step 1: Gather Requirements (Conversational)

### Navigation Menu Items

Ask the user ONE simple question:

> **What navigation menu labels would you like?**
>
> Enter labels separated by commas (e.g., Dashboard, Projects, Settings), or just tell me to use defaults.

**Default navigation items** (use if user skips or presses Enter):

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
import { useState, useRef, useEffect, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ModusNavbar from "../components/ModusNavbar";
import {
  ModusWcSideNavigation,
  ModusWcMenu,
  ModusWcMenuItem,
  ModusWcIcon,
} from "@trimble-oss/moduswebcomponents-react";

// Navigation items - generated based on user input
const NAV_ITEMS = [
  {{NAV_ITEMS}}
];

/**
 * AppShell - Main application layout with navbar and side navigation.
 *
 * Features:
 * - ModusNavbar with product logo and user avatar
 * - Collapsible side navigation synced with navbar hamburger menu
 * - React Router Outlet for nested route content
 * - Push mode layout for content area
 * - SPA navigation (no page reloads)
 */
export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideNavExpanded, setSideNavExpanded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sideNavRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef = useRef<any>(null);

  // User card configuration - customize for your application
  const userCard = {
    name: "User Name",
    email: "user@example.com",
    avatarSrc: "",
    avatarAlt: "User Avatar",
  };

  /**
   * Handles navbar main menu open state changes.
   * Syncs the hamburger menu button with side navigation expanded state.
   */
  const handleNavbarMenuOpenChange = useCallback((isOpen: boolean) => {
    setSideNavExpanded(isOpen);
  }, []);

  /**
   * Syncs React state to side navigation web component.
   */
  useEffect(() => {
    const sideNav = sideNavRef.current;
    if (sideNav && sideNav.expanded !== sideNavExpanded) {
      sideNav.expanded = sideNavExpanded;
    }
  }, [sideNavExpanded]);

  /**
   * Handles side navigation expanded state changes.
   * Syncs React state when side nav changes independently (e.g., click outside).
   */
  useEffect(() => {
    const sideNav = sideNavRef.current;
    if (!sideNav) return;

    const handleExpandedChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const isExpanded = customEvent.detail;

      setSideNavExpanded((prev) => {
        if (prev !== isExpanded) {
          return isExpanded;
        }
        return prev;
      });
    };

    sideNav.addEventListener("expandedChange", handleExpandedChange);

    return () => {
      sideNav.removeEventListener("expandedChange", handleExpandedChange);
    };
  }, []);

  /**
   * Handles menu item selection for navigation.
   */
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const handleItemSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>;
      const route = customEvent.detail?.value;
      if (route) {
        navigate(route);
        // Collapse side nav after selection
        setSideNavExpanded(false);
      }
    };

    menu.addEventListener("itemSelect", handleItemSelect);

    return () => {
      menu.removeEventListener("itemSelect", handleItemSelect);
    };
  }, [navigate]);

  /**
   * Get the currently active route for menu selection state.
   */
  const isActiveRoute = useCallback(
    (route: string) => {
      // Handle root route
      if (route === "/" || route === "") {
        return location.pathname === "/" || location.pathname === "";
      }
      return location.pathname === route || location.pathname.startsWith(route + "/");
    },
    [location.pathname]
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Navbar with bottom border */}
      <div className="border-bottom-default">
        <ModusNavbar
          userCard={userCard}
          visibility={{ mainMenu: true, user: true }}
          onMainMenuOpenChange={handleNavbarMenuOpenChange}
        />
      </div>

      {/* Main content area with side navigation */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Side Navigation */}
        <ModusWcSideNavigation
          ref={sideNavRef}
          expanded={sideNavExpanded}
          collapse-on-click-outside={true}
          max-width="256px"
          mode="push"
          target-content="#main-content"
          className="h-full absolute left-0 top-0 z-50"
        >
          <ModusWcMenu ref={menuRef} size="lg">
            {NAV_ITEMS.map((item) => (
              <ModusWcMenuItem
                key={item.route}
                label={item.label}
                value={item.route}
                selected={isActiveRoute(item.route)}
              >
                <ModusWcIcon
                  slot="start-icon"
                  name={item.icon}
                  decorative={true}
                />
              </ModusWcMenuItem>
            ))}
          </ModusWcMenu>
        </ModusWcSideNavigation>

        {/* Main Content with Outlet */}
        <div
          id="main-content"
          className="flex-1 overflow-auto ml-16 transition-all duration-200"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
```

**NAV_ITEMS format example:**

If user provided:

```
Dashboard, dashboard, /dashboard
Projects, folder_open, /projects
Settings, settings, /settings
```

Generate:

```typescript
const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", route: "/dashboard" },
  { label: "Projects", icon: "folder_open", route: "/projects" },
  { label: "Settings", icon: "settings", route: "/settings" },
];
```

**IMPORTANT:** Always use valid Modus icon names. Check `.cursor/rules/modus-icon-names.mdc` for the full list.

---

## Step 4: Create Placeholder Pages

For each navigation item, create a placeholder page in `src/pages/`.

**Naming Convention:**

- Route `/dashboard` -> `DashboardPage.tsx`
- Route `/projects` -> `ProjectsPage.tsx`
- Route `/user-profile` -> `UserProfilePage.tsx`
- Route `/` (home) -> Use existing `HomePage.tsx`

**Placeholder Page Template:**

```tsx
/**
 * {{PAGE_TITLE}} Page
 *
 * Replace this placeholder with your actual page content.
 */
export default function {{COMPONENT_NAME}}() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="text-2xl font-bold text-foreground mb-4">
          {{PAGE_TITLE}}
        </div>
        <div className="text-foreground-60 mb-6">
          This is a placeholder page. Replace this content with your actual implementation.
        </div>
        <div className="bg-card border-default rounded-lg p-6">
          <div className="text-lg font-semibold text-foreground mb-2">
            Getting Started
          </div>
          <div className="text-sm text-foreground-60">
            Edit this file at <code className="px-1 py-0.5 bg-muted rounded text-sm">src/pages/{{COMPONENT_NAME}}.tsx</code> to build your page.
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Replace placeholders:**

- `{{PAGE_TITLE}}` - The label from navigation (e.g., "Dashboard")
- `{{COMPONENT_NAME}}` - PascalCase page name (e.g., "DashboardPage")

---

## Step 5: Update HomePage.tsx

Replace the content of `src/pages/HomePage.tsx` with a clean placeholder:

```tsx
/**
 * Home Page - Application landing page.
 *
 * This page is part of the AppShell layout.
 * Customize the content for your application's home view.
 */
export default function HomePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="text-2xl font-bold text-foreground mb-4">Welcome</div>
        <div className="text-foreground-60 mb-6">
          Start building your application by editing this page.
        </div>
        <div className="bg-card border-default rounded-lg p-6">
          <div className="text-lg font-semibold text-foreground mb-2">
            Getting Started
          </div>
          <div className="text-sm text-foreground-60">
            Use the side navigation to explore different sections of your
            application. Press{" "}
            <code className="px-1 py-0.5 bg-muted rounded text-sm">
              Ctrl+Shift+D
            </code>{" "}
            to open the Dev Panel for component reference.
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Step 6: Update App.tsx

Update `src/App.tsx` to use nested routing with AppShell.

**CRITICAL:** Keep all dev panel imports and usage intact!

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  DevPanelProvider,
  DevPanel,
  DevRoutes,
  isDevPanelEnabled,
} from "./dev";

// Layouts
import AppShell from "./layouts/AppShell";

// Pages - add imports for each page created in Step 4
{
  {
    PAGE_IMPORTS;
  }
}

/**
 * Main Application Component.
 *
 * Structure:
 * - ThemeProvider: Manages Modus themes (6 themes available)
 * - ModusProvider: Provides Modus Web Components CSS
 * - DevPanelProvider: Manages Dev Panel state (development only)
 * - Router: React Router for navigation
 *
 * Routes:
 * - /dev/*: Development panel routes (demos, colors, icons) - dev only
 * - /*: Application routes wrapped in AppShell layout
 */
function App() {
  const showDevPanel = isDevPanelEnabled();

  return (
    <ThemeProvider>
      <ModusProvider>
        <DevPanelProvider>
          <Router>
            <Routes>
              {/* Development routes - only available when VITE_DEV_PANEL=true */}
              {showDevPanel && <Route path="/dev/*" element={<DevRoutes />} />}

              {/* Application routes wrapped in AppShell */}
              <Route element={<AppShell />}>{{ ROUTE_DEFINITIONS }}</Route>
            </Routes>

            {/* Dev Panel - floating panel for development reference */}
            {showDevPanel && <DevPanel />}
          </Router>
        </DevPanelProvider>
      </ModusProvider>
    </ThemeProvider>
  );
}

export default App;
```

**Replace placeholders:**

`{{PAGE_IMPORTS}}` example:

```tsx
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import SettingsPage from "./pages/SettingsPage";
```

`{{ROUTE_DEFINITIONS}}` example (based on NAV_ITEMS):

```tsx
<Route index element={<HomePage />} />
<Route path="dashboard" element={<DashboardPage />} />
<Route path="projects" element={<ProjectsPage />} />
<Route path="settings" element={<SettingsPage />} />
```

**Note:** If the first nav item has route `/`, use `<Route index element={...} />`. Otherwise, add an index route pointing to the first nav item's page.

---

## Preserved Content (DO NOT MODIFY)

The following MUST remain intact:

### Files and Directories

- `src/dev/` - Dev panel infrastructure
- `src/demos/` - 48 component demo pages
- `src/dev-pages/` - Colors, Icons, Components gallery pages

### In App.tsx - Keep These Lines

```tsx
import {
  DevPanelProvider,
  DevPanel,
  DevRoutes,
  isDevPanelEnabled,
} from "./dev";

const showDevPanel = isDevPanelEnabled();

{
  showDevPanel && <Route path="/dev/*" element={<DevRoutes />} />;
}

{
  showDevPanel && <DevPanel />;
}
```

### Functionality to Preserve

- Dev Panel toggle (Ctrl+Shift+D)
- All dev routes (/dev/colors, /dev/icons, /dev/components, /dev/demos/\*)
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

## Example Conversation Flow

**LLM:** What navigation menu labels would you like?

Enter labels separated by commas (e.g., Dashboard, Projects, Settings), or press Enter to use defaults.

**User:** Home, Projects, Team, Reports, Settings

**LLM:** I'll create a shell application with these navigation items:

| Label    | Route     |
| -------- | --------- |
| Home     | /         |
| Projects | /projects |
| Team     | /team     |
| Reports  | /reports  |
| Settings | /settings |

Now creating the files...

---

**Alternative - User skips (uses defaults):**

**LLM:** What navigation menu labels would you like?

Enter labels separated by commas (e.g., Dashboard, Projects, Settings), or press Enter to use defaults.

**User:** _(presses Enter or says "use defaults")_

**LLM:** I'll create a shell application with the default navigation:

| Label     | Route      |
| --------- | ---------- |
| Dashboard | /dashboard |
| Projects  | /projects  |
| Settings  | /settings  |

Now creating the files...

---

## Files Created Summary

After running this command, the following files will be created/modified:

### Created

- `src/layouts/AppShell.tsx` - Main shell layout
- `src/pages/ProjectsPage.tsx` - Projects placeholder
- `src/pages/TeamPage.tsx` - Team placeholder
- `src/pages/ReportsPage.tsx` - Reports placeholder
- `src/pages/SettingsPage.tsx` - Settings placeholder

### Modified

- `src/pages/HomePage.tsx` - Cleared to minimal placeholder
- `src/App.tsx` - Updated with nested routing

### Preserved (Unchanged)

- `src/dev/` - All dev panel files
- `src/demos/` - All 48 demo pages
- `src/dev-pages/` - Reference pages
- `src/components/` - All Modus wrapper components

---

## Notes

- The AppShell uses React Router's `<Outlet />` for rendering nested routes
- Side navigation uses "push" mode to push content aside when expanded
- The collapsed side nav width is 64px (4rem), providing icon-only navigation
- All navigation is SPA-style using React Router - no page reloads
- The `useLocation()` hook tracks the active route for menu highlighting
- Event listeners properly sync navbar hamburger state with side nav expanded state
- User card in navbar can be customized by editing the `userCard` object in AppShell.tsx
- **Navbar border:** The navbar is wrapped in a `border-bottom-default` div to add a bottom border

## Troubleshooting (Internal Reference)

### Icons Not Showing in Side Navigation

**Problem:** Menu items display labels but no icons.

**Cause:** Invalid Modus icon names. Many icons require suffixes.

**Solution:** Verify icon names against `.cursor/rules/modus-icon-names.mdc`:

- `folder` -> `folder_open` or `folder_closed`
- `visibility` -> `visibility_on` or `visibility_off`
- `bar_graph` -> `bar_graph_line` or `bar_graph_square`

User can browse `/dev/icons` in the browser to see all available icons.
