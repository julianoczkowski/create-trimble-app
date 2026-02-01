# Remove Dev Content

Remove all development and exploration content from this Modus Angular app, preparing it for production use while keeping all core Modus wrapper components intact.

## Overview

This command removes:
- Dev Panel (floating development panel with toggle button)
- All 44 component demo pages
- Reference pages (colors, icons, components gallery)
- Dev-only helper components and data files
- Icon reference data (`data/modusIcons.ts` and `src/app/data/`)

And updates:
- Icon names validation script to handle missing icon reference file gracefully

While preserving:
- All 48 Modus wrapper components
- Theme system (ThemeService)
- Core infrastructure (main.ts, styles.css, app.config.ts)

---

## Step 1: Delete Entire Directories

Remove these directories completely:

```
src/app/demos/       # 44 component demo pages + shared/
src/app/dev/         # Dev panel infrastructure (service, component, config)
src/app/dev-pages/   # Colors, Icons, Components gallery pages
src/app/data/        # component-demos.ts, modus-icons.ts (dev-only data)
data/                # modusIcons.ts (root level, used by dev IconsPage)
```

---

## Step 2: Delete Dev-Only Files from src/app/components/

Remove this file from `src/app/components/`:

```
src/app/components/theme-demo.component.ts
```

Keep all other files - the 48 modus-*.component.ts wrappers, index.ts, and README.md.

---

## Step 3: Update src/app/app.ts

Remove all dev panel imports and usage. The file should become:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

/**
 * Main Application Component.
 *
 * Structure:
 * - Router outlet for application pages
 *
 * Getting Started:
 * 1. Edit src/app/pages/home/home.component.ts for your landing page
 * 2. Add new pages in src/app/pages/
 * 3. Add routes in src/app/app.routes.ts
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  host: {
    class: 'min-h-screen flex flex-col',
  },
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // Initialize theme service - loads theme from localStorage
    this.themeService.getThemeConfig();
  }
}
```

**What was removed:**
- Import: `import { DevPanelService, DevPanelComponent } from './dev';`
- Component import: `DevPanelComponent` from imports array
- Property: `readonly devPanelService = inject(DevPanelService);`
- Template: `@if (devPanelService.isEnabled()) { <app-dev-panel /> }`
- Comments referencing Dev Panel

---

## Step 4: Update src/app/app.routes.ts

Remove all dev routes and the conditional spread logic:

```typescript
import { Routes } from '@angular/router';

/**
 * Application routes.
 *
 * Getting Started:
 * 1. Add your application routes below the home route
 * 2. Use lazy loading with loadComponent for optimal performance
 */
export const routes: Routes = [
  // User routes - add your application routes here
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  // Example: Add more routes here
  // {
  //   path: 'about',
  //   loadComponent: () =>
  //     import('./pages/about/about.component').then((m) => m.AboutComponent),
  //   title: 'About',
  // },
];
```

**What was removed:**
- Import: `import { environment } from '../environments/environment.development';`
- The entire conditional spread: `...(environment.devPanel ? [...] : [])`
- All dev route definitions (colors, icons, components, demos/*)

---

## Step 5: Update src/app/pages/home/home.component.ts

Remove all Dev Panel references from the HomePage. Specifically remove:

1. The "Open Dev Panel" button (the modus-button that dispatches a keyboard event)
2. The `openDevPanel()` method
3. The "Use the Dev Panel" getting started item mentioning Ctrl+Shift+D
4. The `ModusButtonComponent` import (if no longer needed)
5. The `CommonModule` import (if no longer needed)

Keep the overall page structure as a starting template for the user's app.

**Example of cleaned HomePage structure:**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Home page component.
 *
 * This is the main landing page for the user's application.
 * Edit this component to create your own home page.
 *
 * Getting Started:
 * 1. Customize the hero section with your app's branding
 * 2. Add your own features and content
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col bg-background">
      <div class="flex-1 flex flex-col items-center p-8">
        <div class="max-w-4xl w-full space-y-8">
          <!-- Header -->
          <div class="text-center space-y-4">
            <div class="flex items-center justify-center gap-3">
              <i class="modus-icons text-5xl text-primary">launch</i>
            </div>
            <div class="text-4xl font-bold text-foreground">Modus Angular App</div>
            <div class="text-xl text-foreground-60">
              A production-ready Angular boilerplate with Modus Design System integration.
            </div>
          </div>

          <!-- Getting Started - without Dev Panel references -->
          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">Getting Started</div>
            <div class="space-y-4 text-foreground-80">
              <div class="flex gap-3">
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold"
                >
                  1
                </div>
                <div>
                  <div class="font-medium text-foreground">Build Your App</div>
                  <div class="text-sm text-foreground-60">
                    Start developing in
                    <code class="px-1 py-0.5 bg-muted rounded text-sm">src/app/pages/</code>
                    - add your routes in
                    <code class="px-1 py-0.5 bg-muted rounded text-sm">app.routes.ts</code>.
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold"
                >
                  2
                </div>
                <div>
                  <div class="font-medium text-foreground">Use Modus Components</div>
                  <div class="text-sm text-foreground-60">
                    Import components from
                    <code class="px-1 py-0.5 bg-muted rounded text-sm">src/app/components/</code>
                    to build your UI.
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold"
                >
                  3
                </div>
                <div>
                  <div class="font-medium text-foreground">Deploy</div>
                  <div class="text-sm text-foreground-60">
                    Run
                    <code class="px-1 py-0.5 bg-muted rounded text-sm">npm run build</code>
                    for a production-ready bundle.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Keep MCP Servers section -->
          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">MCP Servers Included</div>
            <div class="text-sm text-foreground-60 mb-4">
              Pre-configured Model Context Protocol servers for AI-assisted development.
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-muted rounded-lg">
                <div class="font-medium text-foreground mb-1">Modus Docs MCP</div>
                <div class="text-sm text-foreground-60">
                  Access Modus Web Components documentation directly in your AI assistant. Get
                  component props, usage examples, and best practices.
                </div>
              </div>
              <div class="p-4 bg-muted rounded-lg">
                <div class="font-medium text-foreground mb-1">Context7 MCP</div>
                <div class="text-sm text-foreground-60">
                  Up-to-date library documentation for Angular, Vite, Tailwind, and other
                  dependencies.
                </div>
              </div>
            </div>
          </div>

          <!-- Keep other sections as needed -->
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
```

---

## Step 6: Update Icon Names Validation Script

Since `data/modusIcons.ts` is deleted (it was only used by the dev panel's IconsPage), we need to update the icon names validation script to handle the missing file gracefully.

Update `scripts/check-icon-names.js` to check if the file exists before reading it:

**Find this section near the top of the file (lines 12-33):**

```javascript
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { glob } = require('glob');

// Read and parse the Modus icons data from TypeScript file
const iconsContent = fs.readFileSync(path.join(process.cwd(), 'data/modusIcons.ts'), 'utf8');
```

**Replace it with:**

```javascript
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { glob } = require('glob');

// Colors for console output (moved to top)
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

// Check if modusIcons.ts exists (it may have been removed in production builds)
const iconsFilePath = path.join(process.cwd(), 'data/modusIcons.ts');
if (!fs.existsSync(iconsFilePath)) {
  console.log(
    `${colors.bold}${colors.yellow}Icon names validation skipped:${colors.reset}`
  );
  console.log(
    `${colors.dim}The icon reference file (data/modusIcons.ts) is not present.${colors.reset}`
  );
  console.log(
    `${colors.dim}This is normal if dev content has been removed.${colors.reset}\n`
  );
  process.exit(0);
}

// Read and parse the Modus icons data from TypeScript file
const iconsContent = fs.readFileSync(iconsFilePath, 'utf8');
```

**Also remove the duplicate colors definition** that appears later in the file (around lines 38-49), since we've moved it to the top.

**What this does:**
- Moves the `colors` object definition to the top (before it's used)
- Checks if `modusIcons.ts` exists before trying to read it
- Gracefully skips validation with an informative message if the file is missing
- Exits with code 0 (success) so `npm run lint:all` continues without errors

---

## Files to KEEP (Do Not Touch)

These are core production files that must remain:

### Modus Wrapper Components (48 files in src/app/components/)
- `modus-accordion.component.ts` through `modus-utility-panel.component.ts`
- `index.ts` (barrel exports)
- `README.md`

### Theme System
- `src/app/services/theme.service.ts`

### Core Infrastructure
- `src/main.ts`
- `src/styles.css`
- `src/app/app.config.ts`
- `src/app/app.css`
- `src/app/app.html`
- `src/app/app.spec.ts`

### Configuration
- `angular.json`
- `package.json`
- `tsconfig.json` and related
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

### Cursor Rules
- `.cursor/rules/` (all files)

---

## Verification Checklist

After removal, verify:

- [ ] `npm start` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` passes without errors
- [ ] `npm run lint:all` completes successfully (icon names validation will skip gracefully)
- [ ] No import errors in app.ts or app.routes.ts
- [ ] HomePage renders without Dev Panel button
- [ ] All Modus wrapper components are still present
- [ ] Theme switching still works via ThemeService

---

## Notes

- The Dev Panel is automatically hidden in production builds anyway (controlled by `environment.devPanel` flag)
- This command is for users who want a clean codebase without any dev exploration code
- All Modus wrapper components remain fully functional for building your app
- The environment files are kept but no longer referenced in routes (they can still be used for other purposes)
