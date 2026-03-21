# Remove Dev Content

Remove all development and exploration content from this Modus SolidJS app, preparing it for production use while keeping all core Modus wrapper components intact.

## Overview

This command removes:
- Dev Panel (floating development panel)
- All 48 component demo pages
- Reference pages (colors, icons, components gallery)
- Dev-only helper components
- Icon reference data (`src/data/modusIcons.ts`)

And updates:
- Icon names validation script to handle missing icon reference file gracefully

While preserving:
- All Modus wrapper components
- Theme system (ThemeProvider, useTheme)
- Core infrastructure (ModusProvider, index.tsx, index.css)

---

## Step 1: Delete Entire Directories

Remove these directories completely:

```
src/demos/           # 48 component demo pages
src/dev/             # Dev panel infrastructure
src/dev-pages/       # Colors, Icons, Components gallery pages
src/data/            # modusIcons.ts (only used by IconsPage)
src/config/          # Deprecated routes.ts
```

---

## Step 2: Delete Dev-Only Files from src/components/

Remove these 4 files from `src/components/`:

```
src/components/DemoPage.tsx
src/components/DemoExample.tsx
src/components/ThemeSwitcherDropdown.tsx
src/components/ThemeToggleSimple.tsx
```

---

## Step 3: Update src/App.tsx

Remove all dev panel imports and usage. The file should become:

```tsx
import { Router, Route } from "@solidjs/router";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";

import HomePage from "./pages/HomePage";

/**
 * Main Application Component.
 *
 * Structure:
 * - ThemeProvider: Manages Modus themes (6 themes available)
 * - ModusProvider: Provides Modus Web Components CSS
 * - Router: @solidjs/router for navigation
 *
 * Add your routes below.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ModusProvider>
        <Router>
          <Route path="/" component={HomePage} />
          {/* Example: <Route path="/about" component={AboutPage} /> */}
        </Router>
      </ModusProvider>
    </ThemeProvider>
  );
}
```

**What was removed:**
- Import: `import { DevPanelProvider, DevPanel, isDevPanelEnabled } from "./dev";`
- Variable: `const showDevPanel = isDevPanelEnabled();`
- Component: `<DevPanelProvider>` wrapper
- All dev routes
- Component: `{showDevPanel && <DevPanel />}`

---

## Step 4: Update src/pages/HomePage.tsx

Remove all Dev Panel references from the HomePage. Specifically remove:

1. The "Open Dev Panel" button (the ModusButton that dispatches a keyboard event)
2. The "Use the Dev Panel" getting started item mentioning Ctrl+Shift+D
3. Any references to the Dev Panel keyboard shortcut

Keep the overall page structure as a starting template for the user's app.

**Example of cleaned HomePage structure (SolidJS):**

```tsx
import type { Component } from "solid-js";
import ModusButton from "../components/ModusButton";

const HomePage: Component = () => {
  return (
    <div class="min-h-screen flex flex-col bg-background">
      <div class="flex-1 flex flex-col items-center p-8">
        <div class="max-w-4xl w-full space-y-8">
          <div class="text-center space-y-4">
            <div class="flex items-center justify-center gap-3">
              <i class="modus-icons text-5xl text-primary">launch</i>
            </div>
            <div class="text-4xl font-bold text-foreground">
              Modus SolidJS App
            </div>
            <div class="text-xl text-foreground-60">
              A production-ready SolidJS boilerplate with Modus Design System
              integration.
            </div>
          </div>

          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">
              Getting Started
            </div>
            <div class="space-y-4 text-foreground-80">
              <div class="flex gap-3">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <div class="font-medium text-foreground">
                    Build Your App
                  </div>
                  <div class="text-sm text-foreground-60">
                    Start developing in src/pages/ - add your routes in App.tsx.
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <div class="font-medium text-foreground">
                    Use Modus Components
                  </div>
                  <div class="text-sm text-foreground-60">
                    Import components from src/components/ to build your UI.
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <div class="font-medium text-foreground">Deploy</div>
                  <div class="text-sm text-foreground-60">
                    Run npm run build for a production-ready bundle.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
```

---

## Step 5: Update Icon Names Validation Script

Since `src/data/modusIcons.ts` is deleted (it was only used by the dev panel's IconsPage), update the icon names validation script to handle the missing file gracefully.

Update `scripts/check-icon-names.js` to check if the file exists before reading it:

**Find this section near the top of the file:**

```javascript
import fs from "fs";
import path from "path";
import { glob } from "glob";

// Read and parse the Modus icons data from TypeScript file
const iconsContent = fs.readFileSync(
  path.join(process.cwd(), "src/data/modusIcons.ts"),
  "utf8"
);
```

**Replace it with:**

```javascript
import fs from "fs";
import path from "path";
import { glob } from "glob";

// Check if modusIcons.ts exists (it may have been removed in production builds)
const iconsFilePath = path.join(process.cwd(), "src/data/modusIcons.ts");
if (!fs.existsSync(iconsFilePath)) {
  console.log(
    "⚠️  Icon names validation skipped:"
  );
  console.log(
    "The icon reference file (src/data/modusIcons.ts) is not present."
  );
  console.log(
    "This is normal if dev content has been removed.\n"
  );
  process.exit(0);
}

// Read and parse the Modus icons data from TypeScript file
const iconsContent = fs.readFileSync(iconsFilePath, "utf8");
```

---

## Files to KEEP (Do Not Touch)

These are core production files that must remain:

### Modus Wrapper Components (in src/components/)
- All Modus wrapper components
- ModusProvider.tsx (required for Modus CSS)

### Theme System
- `src/contexts/ThemeContext.tsx`
- `src/contexts/ThemeContextData.tsx`
- `src/hooks/useTheme.ts`

### Core Infrastructure
- `src/index.tsx`
- `src/index.css`
- `src/App.css`
- `src/vite-env.d.ts`

### Configuration
- `vite.config.ts`
- `package.json`
- `tsconfig.json` and related
- `.env.development` / `.env.production`

### Cursor Rules and Skills
- `.cursor/rules/` (all files)
- `.cursor/skills/` (all files)

---

## Verification Checklist

After removal, verify:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` passes without errors
- [ ] `npm run lint:all` completes successfully (icon names validation will skip gracefully)
- [ ] No import errors in App.tsx
- [ ] HomePage renders without Dev Panel button
- [ ] All Modus wrapper components are still present
- [ ] Theme switching still works (if you kept ThemeSwitcher component usage)

---

## Notes

- The Dev Panel is automatically hidden in production builds anyway (controlled by VITE_DEV_PANEL env var)
- This command is for users who want a clean codebase without any dev exploration code
- All Modus wrapper components remain fully functional for building your app
- **SolidJS:** Use `class` instead of `className`, `Component` type for components
