# Remove Dev Content

Remove all development and exploration content from this Modus React app, preparing it for production use while keeping all core Modus wrapper components intact.

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
- All 45 Modus wrapper components
- Theme system (ThemeProvider, useTheme)
- Core infrastructure (ModusProvider, main.tsx, index.css)

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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";

// Your pages
import HomePage from "./pages/HomePage";

/**
 * Main Application Component.
 *
 * Structure:
 * - ThemeProvider: Manages Modus themes (6 themes available)
 * - ModusProvider: Provides Modus Web Components CSS
 * - Router: React Router for navigation
 *
 * Add your routes below.
 */
function App() {
  return (
    <ThemeProvider>
      <ModusProvider>
        <Router>
          <Routes>
            {/* Your application routes */}
            <Route path="/" element={<HomePage />} />
            {/* Example: <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </Router>
      </ModusProvider>
    </ThemeProvider>
  );
}

export default App;
```

**What was removed:**
- Import: `import { DevPanelProvider, DevPanel, DevRoutes, isDevPanelEnabled } from "./dev";`
- Variable: `const showDevPanel = isDevPanelEnabled();`
- Component: `<DevPanelProvider>` wrapper
- Route: `{showDevPanel && <Route path="/dev/*" element={<DevRoutes />} />}`
- Component: `{showDevPanel && <DevPanel />}`

---

## Step 4: Update src/pages/HomePage.tsx

Remove all Dev Panel references from the HomePage. Specifically remove:

1. The "Open Dev Panel" button (the ModusButton that dispatches a keyboard event)
2. The "Use the Dev Panel" getting started item mentioning Ctrl+Shift+D
3. Any references to the Dev Panel keyboard shortcut

Keep the overall page structure as a starting template for the user's app.

**Example of cleaned HomePage structure:**

```tsx
import ModusButton from "../components/ModusButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center p-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <i className="modus-icons text-5xl text-primary">launch</i>
            </div>
            <div className="text-4xl font-bold text-foreground">
              Modus React App
            </div>
            <div className="text-xl text-foreground-60">
              A production-ready React boilerplate with Modus Design System
              integration.
            </div>
          </div>

          {/* Getting Started - without Dev Panel references */}
          <div className="bg-card border-default rounded-lg p-6 space-y-4">
            <div className="text-lg font-semibold text-foreground">
              Getting Started
            </div>
            <div className="space-y-4 text-foreground-80">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Build Your App
                  </div>
                  <div className="text-sm text-foreground-60">
                    Start developing in src/pages/ - add your routes in App.tsx.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Use Modus Components
                  </div>
                  <div className="text-sm text-foreground-60">
                    Import components from src/components/ to build your UI.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <div className="font-medium text-foreground">Deploy</div>
                  <div className="text-sm text-foreground-60">
                    Run npm run build for a production-ready bundle.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keep other sections as needed */}
        </div>
      </div>
    </div>
  );
}
```

---

## Step 5: Update Icon Names Validation Script

Since `src/data/modusIcons.ts` is deleted (it was only used by the dev panel's IconsPage), we need to update the icon names validation script to handle the missing file gracefully.

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

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

// Check if modusIcons.ts exists (it may have been removed in production builds)
const iconsFilePath = path.join(process.cwd(), "src/data/modusIcons.ts");
if (!fs.existsSync(iconsFilePath)) {
  console.log(
    `${colors.bold}${colors.yellow}⚠️  Icon names validation skipped:${colors.reset}`
  );
  console.log(
    `${colors.dim}The icon reference file (src/data/modusIcons.ts) is not present.${colors.reset}`
  );
  console.log(
    `${colors.dim}This is normal if dev content has been removed.${colors.reset}\n`
  );
  process.exit(0);
}

// Read and parse the Modus icons data from TypeScript file
const iconsContent = fs.readFileSync(iconsFilePath, "utf8");
```

**Also remove the duplicate colors definition** that appears later in the file (around line 46-58), since we've moved it to the top.

**What this does:**
- Moves the `colors` object definition to the top (before it's used)
- Checks if `modusIcons.ts` exists before trying to read it
- Gracefully skips validation with an informative message if the file is missing
- Exits with code 0 (success) so `npm run lint:all` continues without errors

---

## Files to KEEP (Do Not Touch)

These are core production files that must remain:

### Modus Wrapper Components (45 files in src/components/)
- `ModusAccordion.tsx` through `ModusUtilityPanel.tsx`
- `ModusProvider.tsx` (required for Modus CSS)

### Theme System
- `src/contexts/ThemeContext.tsx`
- `src/contexts/ThemeContextData.tsx`
- `src/hooks/useTheme.ts`

### Core Infrastructure
- `src/main.tsx`
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
