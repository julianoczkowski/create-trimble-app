# Scaffold Shell Application

Create a shell application with navbar, side navigation, and routing for your Modus Angular app through a conversational setup flow.

## Overview

This command guides you through creating a complete application shell with:

- ModusNavbar with standard Trimble logo and user avatar
- ModusSideNavigation with customizable menu items
- Angular Router nested routing (SPA - no page reloads)
- Placeholder pages for each navigation item

**IMPORTANT:** This command preserves all dev panel and demo content. The dev panel (Ctrl+Shift+D) and all demo pages will continue to work.

---

## CRITICAL: Layout Structure & CSS Classes

### ⚠️ MUST USE Specific CSS Classes for Positioning

The side navigation relies on CSS classes defined in `src/styles.css` that handle positioning, z-index, and layout. **Using custom class names will cause the side navigation to not receive clicks or display incorrectly.**

**Required CSS class structure:**

```html
<div class="layout-with-navbar h-full flex flex-col">
  <!-- Navbar with border wrapper -->
  <div class="border-bottom-default">
    <modus-navbar ... />
  </div>

  <!-- Main content row - MUST have this class -->
  <div class="main-content-row">
    <!-- Side nav - MUST have side-navigation class -->
    <modus-side-navigation class="side-navigation" ...> ... </modus-side-navigation>

    <!-- Content - MUST have panel-content class -->
    <div id="content-id" class="panel-content">
      <router-outlet />
    </div>
  </div>
</div>
```

**These classes have positioning styles in `src/styles.css`:**

- `.layout-with-navbar` - Main flex container
- `.main-content-row` - Creates positioning context (`position: relative`, `min-height: 0`)
- `.side-navigation` - Absolute positioning with z-index 999
- `.panel-content` - Margin for collapsed nav width, full height

### ⚠️ App Shell Component Must Take Full Height

The `<app-shell>` component element itself must take full viewport height:

```typescript
@Component({
  selector: 'app-shell',
  host: {
    class: 'block h-screen',  // REQUIRED for full height
  },
  // ...
})
```

### ⚠️ Navbar Must Have Bottom Border

Wrap the navbar in a `border-bottom-default` div:

```html
<div class="border-bottom-default">
  <modus-navbar ... />
</div>
```

---

## CRITICAL: Navbar + Side Navigation Integration Pattern

### ⚠️ DO NOT USE Angular Two-Way Binding for State Sync

**PROBLEM:** Using Angular bindings like `[expanded]="sideNavExpanded()"` and `[mainMenuOpen]="sideNavExpanded()"` with `(expandedChange)` and `(mainMenuOpenChange)` outputs causes an **infinite change detection loop** (NG0103 error).

This happens because:

1. Modus Web Components fire change events when their properties are set programmatically
2. Angular bindings trigger change detection when signals update
3. This creates a circular loop: navbar changes → signal updates → side nav binding updates → side nav fires event → signal updates → navbar binding updates → navbar fires event → ...

### ✅ CORRECT PATTERN: DOM Event Listeners + Direct Property Access

Use the proven pattern from `src/app/demos/side-navigation/side-navigation-demo.component.ts`:

1. **Set initial `[expanded]="false"` only** - Don't bind to a signal
2. **Use `AfterViewInit` to set up DOM event listeners** - Listen for `mainMenuOpenChange` events bubbling from navbar
3. **Directly set `sideNav.expanded = value`** - Bypass Angular change detection by setting the web component property directly
4. **Use signals for UI tracking only** - Update signal after DOM manipulation for any UI that needs to reflect the state

### Reference Implementation

See `src/app/demos/side-navigation/side-navigation-demo.component.ts` for the working pattern, specifically the `setupNavbarSideNavigationIntegration()` method.

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

Create the directory `src/app/layouts/app-shell/` if it doesn't exist.

---

## Step 3: Create AppShell Component

Create the file `src/app/layouts/app-shell/app-shell.component.ts` with the following content.

**IMPORTANT:** Replace the placeholder:

- `{{NAV_ITEMS}}` - The navigation items array from Step 1

**NOTE:** The navbar uses the standard Trimble logo and includes a bottom border via the `border-bottom-default` wrapper class.

**CRITICAL:** This implementation uses DOM event listeners to avoid infinite change detection loops. Do NOT use Angular bindings for syncing navbar and side navigation state.

```typescript
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  ModusNavbarComponent,
  ModusSideNavigationComponent,
  ModusMenuComponent,
  ModusMenuItemComponent,
  ModusIconComponent,
  INavbarUserCard,
} from '../../components';

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
 * - Angular Router outlet for nested route content
 * - Push mode layout for content area
 * - SPA navigation (no page reloads)
 *
 * IMPORTANT: Uses DOM event listener pattern to avoid infinite change detection loops.
 * See: src/app/demos/side-navigation/side-navigation-demo.component.ts for reference.
 */
@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    ModusNavbarComponent,
    ModusSideNavigationComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
    ModusIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // CRITICAL: Host must have h-screen for full viewport height
  host: {
    class: 'block h-screen',
  },
  template: `
    <!-- CRITICAL: Must use these specific CSS class names for proper positioning -->
    <div class="layout-with-navbar h-full flex flex-col">
      <!-- Navbar with bottom border - REQUIRED wrapper -->
      <div class="border-bottom-default">
        <modus-navbar
          [userCard]="userCard"
          [visibility]="{ mainMenu: true, user: true }"
          class="navbar"
        />
      </div>

      <!-- Main content row - MUST have this class for positioning context -->
      <div class="main-content-row">
        <!-- Side Navigation - MUST have side-navigation class -->
        <modus-side-navigation
          [expanded]="false"
          [collapseOnClickOutside]="true"
          [maxWidth]="'256px'"
          mode="push"
          [targetContent]="'#app-panel-content'"
          class="side-navigation"
        >
          <modus-menu size="lg">
            <!-- Menu items with slotted icons -->
            {{MENU_ITEMS}}
          </modus-menu>
        </modus-side-navigation>

        <!-- Panel content - MUST have panel-content class and matching targetContent id -->
        <div id="app-panel-content" class="panel-content">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
})
export class AppShellComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  // Side navigation expanded state (for UI tracking only)
  readonly sideNavExpanded = signal<boolean>(false);

  // User card configuration - customize for your application
  readonly userCard: INavbarUserCard = {
    name: 'User Name',
    email: 'user@example.com',
  };

  // Store event listener references for cleanup
  private mainMenuOpenChangeHandler: ((event: Event) => void) | null = null;
  private expandedChangeHandler: ((event: Event) => void) | null = null;
  private menuItemSelectHandler: ((event: Event) => void) | null = null;

  ngAfterViewInit(): void {
    this.setupNavbarSideNavigationIntegration();
  }

  ngOnDestroy(): void {
    // Clean up event listeners - MUST use .layout-with-navbar selector
    const container = this.elementRef.nativeElement.querySelector('.layout-with-navbar');
    if (container) {
      if (this.mainMenuOpenChangeHandler) {
        container.removeEventListener('mainMenuOpenChange', this.mainMenuOpenChangeHandler);
      }
      if (this.menuItemSelectHandler) {
        container.removeEventListener('itemSelect', this.menuItemSelectHandler);
      }
    }
    const sideNav = this.elementRef.nativeElement.querySelector('modus-wc-side-navigation');
    if (sideNav && this.expandedChangeHandler) {
      sideNav.removeEventListener('expandedChange', this.expandedChangeHandler);
    }
  }

  /**
   * Sets up the navbar-side navigation integration using the proven Storybook pattern.
   *
   * CRITICAL: Uses DOM event listeners to directly control the web component's
   * expanded state, avoiding Angular's change detection loop issues.
   */
  private setupNavbarSideNavigationIntegration(): void {
    // MUST use .layout-with-navbar selector - this is the CSS class with positioning styles
    const container = this.elementRef.nativeElement.querySelector('.layout-with-navbar');
    if (!container) {
      console.error('AppShell: Container not found');
      return;
    }

    // Listen for navbar main menu open change events (bubbles up from navbar)
    this.mainMenuOpenChangeHandler = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const isOpen = customEvent.detail;
      const sideNav = container.querySelector('modus-wc-side-navigation') as any;
      if (sideNav) {
        sideNav.expanded = isOpen;
        this.sideNavExpanded.set(isOpen);
      }
    };
    container.addEventListener('mainMenuOpenChange', this.mainMenuOpenChangeHandler);

    // Listen for expandedChange from side navigation (e.g., click outside)
    const sideNav = container.querySelector('modus-wc-side-navigation') as any;
    if (sideNav) {
      this.expandedChangeHandler = (event: Event) => {
        const customEvent = event as CustomEvent<boolean>;
        this.sideNavExpanded.set(customEvent.detail);
      };
      sideNav.addEventListener('expandedChange', this.expandedChangeHandler);
    }

    // Listen for menu item selection
    this.menuItemSelectHandler = (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>;
      const value = customEvent.detail?.value;

      if (value) {
        // Navigate to the route (value is route name without leading /)
        this.router.navigate(['/' + value]);

        // Collapse side nav
        if (sideNav) {
          sideNav.expanded = false;
          this.sideNavExpanded.set(false);
        }
      }
    };
    container.addEventListener('itemSelect', this.menuItemSelectHandler);
  }

  /**
   * Determines if the given route is currently active.
   * Note: Uses indexOf() instead of startsWith() to avoid TypeScript lib configuration issues.
   */
  isActiveRoute(route: string): boolean {
    const currentUrl = this.router.url;
    if (route === '/' || route === '') {
      return currentUrl === '/' || currentUrl === '';
    }
    return currentUrl === route || currentUrl.indexOf(route + '/') === 0;
  }
}
```

**MENU_ITEMS template example:**

For navigation items Dashboard, Projects, Settings, generate static menu items with slotted icons:

```html
<modus-menu-item label="Dashboard" value="dashboard" [selected]="isActiveRoute('/dashboard')">
  <modus-icon slot="start-icon" name="dashboard" [decorative]="true"></modus-icon>
</modus-menu-item>
<modus-menu-item label="Projects" value="projects" [selected]="isActiveRoute('/projects')">
  <modus-icon slot="start-icon" name="folder_open" [decorative]="true"></modus-icon>
</modus-menu-item>
<modus-menu-item label="Settings" value="settings" [selected]="isActiveRoute('/settings')">
  <modus-icon slot="start-icon" name="settings" [decorative]="true"></modus-icon>
</modus-menu-item>
```

**CRITICAL:**

- Use `value="routename"` (without leading `/`) - the handler adds the `/`
- Use slotted `<modus-icon slot="start-icon">` - NOT the `[startIcon]` property
- Use static `label="..."` and `value="..."` attributes (not dynamic bindings)
- Check icon names against `.cursor/rules/modus-icon-names.mdc`

---

## Step 4: Create Placeholder Pages

For each navigation item, create a placeholder page in `src/app/pages/`.

**Naming Convention:**

- Route `/dashboard` -> `src/app/pages/dashboard/dashboard.component.ts`, class `DashboardComponent`
- Route `/projects` -> `src/app/pages/projects/projects.component.ts`, class `ProjectsComponent`
- Route `/user-profile` -> `src/app/pages/user-profile/user-profile.component.ts`, class `UserProfileComponent`
- Route `/` (home) -> Use existing `src/app/pages/home/home.component.ts`

**Placeholder Page Template:**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * {{PAGE_TITLE}} Page
 *
 * Replace this placeholder with your actual page content.
 */
@Component({
  selector: 'app-{{SELECTOR_NAME}}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
            Edit this file at <code class="px-1 py-0.5 bg-muted rounded text-sm">src/app/pages/{{FOLDER_NAME}}/{{FILE_NAME}}.component.ts</code> to build your page.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class {{COMPONENT_NAME}} {}
```

**Replace placeholders:**

- `{{PAGE_TITLE}}` - The label from navigation (e.g., "Dashboard")
- `{{SELECTOR_NAME}}` - Kebab-case selector (e.g., "dashboard", "user-profile")
- `{{FOLDER_NAME}}` - Kebab-case folder name (e.g., "dashboard", "user-profile")
- `{{FILE_NAME}}` - Kebab-case file name without extension (e.g., "dashboard", "user-profile")
- `{{COMPONENT_NAME}}` - PascalCase class name (e.g., "DashboardComponent", "UserProfileComponent")

---

## Step 5: Update HomePage

Replace the content of `src/app/pages/home/home.component.ts` with a clean placeholder:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Home Page - Application landing page.
 *
 * This page is part of the AppShell layout.
 * Customize the content for your application's home view.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8">
      <div class="max-w-4xl">
        <div class="text-2xl font-bold text-foreground mb-4">Welcome</div>
        <div class="text-foreground-60 mb-6">
          Start building your application by editing this page.
        </div>
        <div class="bg-card border-default rounded-lg p-6">
          <div class="text-lg font-semibold text-foreground mb-2">Getting Started</div>
          <div class="text-sm text-foreground-60">
            Use the side navigation to explore different sections of your application. Press
            <kbd class="px-1 py-0.5 bg-muted rounded text-sm">Ctrl+Shift+D</kbd>
            to open the Dev Panel for component reference.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
```

---

## Step 6: Update app.routes.ts

Update `src/app/app.routes.ts` to use child routes under AppShell.

**CRITICAL:** Keep all dev panel routes intact!

```typescript
import { Routes } from '@angular/router';
import { environment } from '../environments/environment.development';

/**
 * Application routes.
 *
 * Structure:
 * - /* : Application routes wrapped in AppShell layout
 * - /dev/* : Development routes (only available when devPanel is enabled)
 */
export const routes: Routes = [
  // Application routes wrapped in AppShell
  {
    path: '',
    loadComponent: () =>
      import('./layouts/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {{CHILD_ROUTES}}
    ],
  },

  // Dev routes - conditionally added based on environment (DO NOT MODIFY)
  ...(environment.devPanel
    ? [
        {
          path: 'dev',
          children: [
            // ... existing dev routes - keep everything unchanged
          ],
        },
      ]
    : []),
];
```

**Replace placeholders:**

`{{CHILD_ROUTES}}` example (based on NAV_ITEMS):

```typescript
{
  path: 'dashboard',
  loadComponent: () =>
    import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  title: 'Dashboard',
},
{
  path: 'projects',
  loadComponent: () =>
    import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
  title: 'Projects',
},
{
  path: 'settings',
  loadComponent: () =>
    import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
  title: 'Settings',
},
```

**Note:** The home route uses `path: ''` (empty string) to serve as the index route. If the first nav item has route `/`, use the home route. Otherwise, add the first nav item's route as a child.

---

## Preserved Content (DO NOT MODIFY)

The following MUST remain intact:

### Files and Directories

- `src/app/dev/` - Dev panel infrastructure
- `src/app/demos/` - 44 component demo pages
- `src/app/dev-pages/` - Colors, Icons, Components gallery pages
- `src/app/components/` - All Modus wrapper components

### In app.routes.ts - Keep This Block Unchanged

```typescript
// Dev routes - conditionally added based on environment
...(environment.devPanel
  ? [
      {
        path: 'dev',
        children: [
          // ... all existing dev routes
        ],
      },
    ]
  : []),
```

### Functionality to Preserve

- Dev Panel toggle (Ctrl+Shift+D)
- All dev routes (/dev/colors, /dev/icons, /dev/components, /dev/demos/\*)
- Theme switching in Dev Panel

---

## Verification Checklist

After scaffolding, verify the following:

### Build & Runtime

- [ ] `npm start` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` passes
- [ ] No console errors in browser (especially no NG0103 infinite change detection errors)

### Layout & Styling

- [ ] App takes full viewport height (no gap at bottom)
- [ ] Navbar has bottom border (via `border-bottom-default` wrapper)
- [ ] Side navigation takes full height of content area
- [ ] Content area fills remaining space after navbar

### Navbar

- [ ] Standard Trimble logo displays correctly
- [ ] Hamburger menu button is visible
- [ ] User avatar area is present

### Side Navigation

- [ ] Hamburger menu toggles side navigation
- [ ] All menu items display with correct labels and icons
- [ ] **Icons are visible** (using slotted `<modus-icon>` approach)
- [ ] **Clicking works when COLLAPSED** (icon-only mode)
- [ ] **Clicking works when EXPANDED** (full labels visible)
- [ ] Side navigation collapses when clicking outside
- [ ] Active route is highlighted in menu
- [ ] Hover states work on menu items

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

- `src/app/layouts/app-shell/app-shell.component.ts` - Main shell layout
- `src/app/pages/dashboard/dashboard.component.ts` - Dashboard placeholder (if using defaults)
- `src/app/pages/projects/projects.component.ts` - Projects placeholder
- `src/app/pages/settings/settings.component.ts` - Settings placeholder

### Modified

- `src/app/pages/home/home.component.ts` - Simplified to minimal placeholder
- `src/app/app.routes.ts` - Updated with child routes under AppShell

### Preserved (Unchanged)

- `src/app/dev/` - All dev panel files
- `src/app/demos/` - All 44 demo pages
- `src/app/dev-pages/` - Reference pages
- `src/app/components/` - All Modus wrapper components

---

## Notes

- The AppShell uses Angular Router's `<router-outlet />` for rendering child routes
- Side navigation uses "push" mode to push content aside when expanded
- The collapsed side nav width is 64px (4rem), providing icon-only navigation
- All navigation is SPA-style using Angular Router - no page reloads
- The `router.url` property tracks the active route for menu highlighting
- User card in navbar can be customized by editing the `userCard` object in AppShellComponent
- **Navbar border:** The navbar is wrapped in a `border-bottom-default` div to add a bottom border
- Uses Angular 20 patterns: `signal()` for state, `inject()` for DI, `@for`/`@if` control flow

## Angular 20 Patterns Used

This scaffold follows Angular 20 best practices:

```typescript
// Signals for reactive state (UI tracking only, not for binding to web components)
readonly sideNavExpanded = signal<boolean>(false);

// inject() for dependency injection (not constructor)
private readonly router = inject(Router);
private readonly elementRef = inject(ElementRef);

// OnPush change detection for performance
changeDetection: ChangeDetectionStrategy.OnPush,

// Built-in control flow (not *ngIf/*ngFor)
@for (item of navItems; track item.route) { ... }
@if (condition) { ... }

// Standalone components (no NgModules needed)
// standalone: true is implicit in Angular 20

// Lifecycle hooks for DOM event listener setup/cleanup
implements AfterViewInit, OnDestroy
```

---

## Troubleshooting (Internal Reference)

### ⚠️ CRITICAL: Infinite Change Detection Loop (NG0103)

**Problem:** Console shows `NG0103: Infinite change detection while trying to refresh views` when clicking the hamburger menu.

**Cause:** Using Angular bindings to sync state between navbar and side navigation:

```typescript
// ❌ DO NOT USE - causes infinite loop
<modus-navbar
  [mainMenuOpen]="sideNavExpanded()"
  (mainMenuOpenChange)="handleNavbarMenuOpenChange($event)"
/>

<modus-side-navigation
  [expanded]="sideNavExpanded()"
  (expandedChange)="handleSideNavExpandedChange($event)"
/>
```

**Why it happens:**

1. Modus Web Components fire change events when their properties are set programmatically
2. Setting `[expanded]="signal()"` triggers the web component to fire `expandedChange`
3. The handler updates the signal, which triggers Angular change detection
4. Change detection re-renders, setting the property again, which fires another event
5. This creates an infinite loop

**Solution:** Use DOM event listeners and direct property access:

```typescript
// ✅ CORRECT - use DOM event listeners
ngAfterViewInit(): void {
  const container = this.elementRef.nativeElement.querySelector('.app-shell-container');

  // Listen for events bubbling up from navbar
  container.addEventListener('mainMenuOpenChange', (event: Event) => {
    const isOpen = (event as CustomEvent<boolean>).detail;

    // Directly set web component property (bypasses Angular)
    const sideNav = container.querySelector('modus-wc-side-navigation') as any;
    if (sideNav) {
      sideNav.expanded = isOpen;
      this.sideNavExpanded.set(isOpen); // Update signal for UI tracking only
    }
  });
}
```

**Reference:** See `src/app/demos/side-navigation/side-navigation-demo.component.ts` for the working implementation.

---

### Icons Not Showing in Side Navigation

**Problem:** Menu items display labels but no icons.

**Cause 1:** Using `[startIcon]` property instead of slot approach.

**Solution:** Use the slot approach with `<modus-icon>` inside the menu item:

```html
<!-- ❌ DO NOT USE - startIcon property may not work reliably -->
<modus-menu-item [label]="item.label" [startIcon]="item.icon" />

<!-- ✅ CORRECT - use slot approach -->
<modus-menu-item [label]="item.label">
  <modus-icon slot="start-icon" [name]="item.icon" [decorative]="true"></modus-icon>
</modus-menu-item>
```

**Cause 2:** Invalid Modus icon names. Many icons require suffixes.

**Solution:** Verify icon names against `.cursor/rules/modus-icon-names.mdc`:

- `folder` -> `folder_open` or `folder_closed`
- `visibility` -> `visibility_on` or `visibility_off`
- `bar_graph` -> `bar_graph_line` or `bar_graph_square`

User can browse `/dev/icons` in the browser to see all available icons.

---

### Menu Item Clicks Not Working (Navigation Not Happening)

**Problem:** Clicking on menu items in the side navigation doesn't navigate to pages.

**Cause:** Using `(itemSelect)` Angular binding with slotted content (icons) - clicks on slotted content may not propagate correctly.

**Solution:** Use DOM event listeners instead of Angular event bindings:

```typescript
// ❌ DO NOT USE - Angular binding may not capture clicks on slotted content
<modus-menu-item
  [label]="item.label"
  [value]="item.route"
  (itemSelect)="handleItemSelect($event)"
>
  <modus-icon slot="start-icon" [name]="item.icon" [decorative]="true"></modus-icon>
</modus-menu-item>

// ✅ CORRECT - Remove (itemSelect) binding, use DOM listener
// In template:
<modus-menu-item [label]="item.label" [value]="item.route">
  <modus-icon slot="start-icon" [name]="item.icon" [decorative]="true"></modus-icon>
</modus-menu-item>

// In component:
private setupMenuItemClickHandlers(): void {
  const container = this.elementRef.nativeElement.querySelector('.app-shell-container');
  if (!container) return;

  this.menuItemSelectHandler = (event: Event) => {
    const customEvent = event as CustomEvent<{ value: string }>;
    const route = customEvent.detail?.value;

    if (route) {
      this.router.navigate([route]);

      // Collapse side nav after selection
      const sideNav = container.querySelector('modus-wc-side-navigation') as any;
      if (sideNav) {
        sideNav.expanded = false;
        this.sideNavExpanded.set(false);
      }
    }
  };
  container.addEventListener('itemSelect', this.menuItemSelectHandler);
}
```

**Key pattern:** Always use DOM `addEventListener` for Modus Web Component events when using slotted content.

---

### Side Navigation Not Syncing with Hamburger

**Problem:** Clicking hamburger doesn't toggle side nav, or vice versa.

**Cause:** DOM event listeners not set up correctly.

**Solution:** Ensure `setupNavbarSideNavigationIntegration()` is called in `ngAfterViewInit()` and:

- Container class `.app-shell-container` matches the template
- Event listener is attached to the container (events bubble up)
- Web component selector is `modus-wc-side-navigation` (the actual web component, not the wrapper)

---

### Routes Not Working

**Problem:** Navigation clicks don't change the page.

**Cause:** Routes not configured as children of AppShell.

**Solution:** Ensure routes are nested under the AppShell route:

```typescript
{
  path: '',
  loadComponent: () => import('./layouts/app-shell/app-shell.component').then(...),
  children: [
    // All page routes go here as children
  ],
},
```

---

### Side Navigation Clicks Don't Work When Expanded (But Work When Collapsed)

**Problem:** Clicking menu items works when side nav is collapsed (icons only), but doesn't work when expanded.

**Cause:** Missing or incorrect CSS class names. The side navigation positioning relies on specific CSS classes in `src/styles.css`.

**Solution:** Use the required CSS class structure:

```html
<div class="layout-with-navbar ...">
  <!-- Required class -->
  <div class="border-bottom-default">
    <!-- Navbar border -->
    <modus-navbar ... />
  </div>
  <div class="main-content-row">
    <!-- Required class -->
    <modus-side-navigation class="side-navigation" ...>
      <!-- Required class -->
      ...
    </modus-side-navigation>
    <div class="panel-content">
      <!-- Required class -->
      ...
    </div>
  </div>
</div>
```

**Do NOT use custom class names** like `app-shell-container` - these don't have the positioning styles.

---

### Content Area Has Gap at Bottom / Doesn't Take Full Height

**Problem:** The main content area doesn't fill the full viewport height.

**Cause 1:** App shell component doesn't have host styling.

**Solution:** Add host class to the component:

```typescript
@Component({
  selector: 'app-shell',
  host: {
    class: 'block h-screen',  // Makes <app-shell> element take full height
  },
  // ...
})
```

**Cause 2:** Inner container uses `h-screen` instead of `h-full`.

**Solution:** Use `h-full` on the layout div (inherits from host):

```html
<div class="layout-with-navbar h-full flex flex-col"><!-- h-full not h-screen --></div>
```

---

### Navbar Missing Bottom Border

**Problem:** No visual separation between navbar and content.

**Solution:** Wrap navbar in a border div:

```html
<div class="border-bottom-default">
  <modus-navbar ... />
</div>
```

---

### TypeScript Error: 'startsWith' does not exist on type 'string'

**Problem:** TypeScript error in `isActiveRoute` method:

```
Property 'startsWith' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
```

**Cause:** The `startsWith` method is ES2015+ and can trigger IDE/TypeScript errors depending on the `lib` configuration in `tsconfig.json`.

**Solution:** Use `indexOf() === 0` instead of `startsWith()`:

```typescript
// ❌ Can cause TypeScript lib errors
return currentUrl.startsWith(route + '/');

// ✅ Works universally without lib requirements
return currentUrl.indexOf(route + '/') === 0;
```

Both achieve the same result (checking if string starts with prefix), but `indexOf` is universally supported without any lib configuration requirements.

---

## Summary of Key Implementation Rules

### CSS & Layout (CRITICAL)

1. **MUST use specific CSS class names** - `layout-with-navbar`, `main-content-row`, `side-navigation`, `panel-content` - these have positioning styles in `src/styles.css`
2. **App shell component needs `host: { class: 'block h-screen' }`** - ensures the component element takes full viewport height
3. **Navbar needs border wrapper** - wrap in `<div class="border-bottom-default">`
4. **Menu item `value` should NOT have leading `/`** - use `value="dashboard"` not `value="/dashboard"` (handler adds the `/`)

### Event Handling (CRITICAL - Prevents Infinite Loop)

5. **NEVER use Angular bindings to sync navbar `mainMenuOpen` with side navigation `expanded`** - causes NG0103 infinite loop
6. **ALWAYS use DOM event listeners** via `AfterViewInit` to listen for `mainMenuOpenChange` and `itemSelect` events
7. **ALWAYS directly set `sideNav.expanded = value`** on the web component element
8. **Use signals for UI tracking only** - not for binding to Modus Web Components

### Icons (CRITICAL - Must Use Slot Approach)

9. **Use slot approach for menu item icons** - `<modus-icon slot="start-icon" name="..." [decorative]="true">` inside menu items
10. **Do NOT use `[startIcon]` property** - it doesn't work reliably with Angular wrappers
11. **Verify icon names** - check `.cursor/rules/modus-icon-names.mdc` for valid names

### Reference

12. **Working demo** at `src/app/demos/side-navigation/side-navigation-demo.component.ts`
