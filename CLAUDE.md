# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`create-trimble-app` is an interactive CLI tool that scaffolds Modus 2.0 web component applications for React, Angular, and SolidJS. Templates are **bundled directly in the npm package** (not downloaded at runtime) for security, offline support, and consistency.

## Development Commands

```bash
# Run CLI locally
npm run dev

# Testing
npm test                  # Run all tests once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npx vitest run tests/utils/file.test.js  # Run a single test file

# Linting (ESLint flat config, excludes templates/)
npm run lint

# Pre-publish (runs tests + audit)
npm run prepublishOnly
```

## Architecture

### Flow
```
bin/create-trimble-app.js (entry point)
  └→ src/cli.js (Commander.js argument parsing)
      └→ src/scaffold.js (main orchestration)
          ├→ src/utils/prerequisites.js (environment checks)
          ├→ src/frameworks.js (loads templates/config.json)
          └→ src/utils/* (file, git, install, logger)
```

### Key Modules

**src/cli.js**: Parses CLI arguments with Commander.js. Validates framework option (react, angular, solidjs). Handles all CLI flags (--framework, --current-folder, --dry-run, --verbose, --info, --no-install, --skip-checks). Checks for updates non-blocking.

**src/scaffold.js**: Orchestrates the scaffolding flow:
1. Prerequisites check (Git, Node.js >= 18, npm — skippable with `--skip-checks`)
2. GitHub account prompt (interactive only, skipped in CI/non-TTY)
3. Framework selection (interactive or CLI arg)
4. Installation location (current folder or new directory)
5. Project name validation
6. Dry-run preview (if enabled)
7. Template copying
8. package.json name update
9. Dependency installation (optional)
10. Success message

**src/frameworks.js**: Loads `templates/config.json` and returns enabled frameworks. Filters out any with `disabled: true`. Provides `getFrameworkById()` lookup.

**src/utils/file.js**: `validateProjectName()`, `updatePackageJson()`, `getCurrentFolderName()`

**src/utils/git.js**: `copyTemplate()` copies from bundled `templates/` directory to target (local file copy, no git operations despite the filename). Skips `node_modules`, `dist`, `.angular`, `.git`, `coverage`, `.nyc_output` directories and lock files during copy. Renames `dot-npmrc` → `.npmrc` and `gitignore` → `.gitignore` (npm strips these during publish). `getDetailedErrorMessage()` transforms errors (EACCES, ENOSPC, etc.) into user-friendly messages.

**src/utils/prerequisites.js**: `runPrerequisites()` checks the development environment before scaffolding: verifies Git is installed (with platform-specific install guide if missing for macOS/Windows/Linux), validates Node.js >= 18 (with nvm/fnm/nodejs.org upgrade instructions), confirms npm is available, and prompts about GitHub account (shows signup guide with boxen if needed). Skipped in CI/non-TTY mode for the GitHub prompt. All checks use `execa` with hardcoded arguments (no user input in commands). Exports individual check functions for testing.

**src/utils/install.js**: Auto-detects package manager from lock files, runs install using execa.

**src/utils/colors.js**: Trimble Brand Blue (#0063a3) with true color/256-color fallback via picocolors. All color functions used throughout the CLI.

**src/utils/logger.js**: Colored console output, welcome banner, security notice, next steps.

### Templates

Complete working projects in `templates/react/`, `templates/angular/`, and `templates/solidjs/`. Each includes .cursor/, .github/, .husky/, .vscode/, scripts/, src/, and full package.json.

`templates/config.json` defines framework metadata (name, description, badge, note) read by `src/frameworks.js`.

All three templates include Trimble Identity (TID) authentication Cursor commands (`.cursor/commands/trimble-id.md`) and rules (`.cursor/rules/add-trimble-identity-auth.mdc`). React uses `@trimble-oss/trimble-id-react`, SolidJS wraps `TIDClient` in a SolidJS context, Angular uses `@trimble-oss/trimble-id` core SDK with signals-based `AuthService`, functional guard, and HTTP interceptor.

#### SolidJS Template

SolidJS 1.9 + Vite + TypeScript + Tailwind CSS 3 + @solidjs/router. Uses `@trimble-oss/moduswebcomponents` (vanilla web components, no React wrapper).

**Dev Panel Architecture**: Toggle with `Ctrl+Shift+D` or floating button. Only renders when `VITE_DEV_PANEL=true` (dev mode). Contains:
- 44 component demo pages (`src/demos/`)
- Reference pages: Color Palette, Icons Gallery (710+ icons), Components Gallery
- Theme switcher with 6 themes (classic/modern/connect x light/dark)

**Key SolidJS Patterns**:
- `createSignal` for state, `onMount`/`onCleanup` for lifecycle
- `on:eventName` for custom web component events
- Refs with `onMount` for web component event listeners
- Let Modus components manage their own state (don't control accordion/modal from SolidJS)

**Stencil Web Component Interop** (critical for SolidJS wrapper components):
- **Complex props** (objects, arrays, functions) must be set as JS properties via `ref` + `onMount`/`createEffect`, never as JSX attributes (they serialize to `[object Object]`)
- **Named slots** (e.g., `start-icon`) require child elements (`<i class="modus-icons" slot="start-icon">name</i>`), not prop values
- **Simple string/boolean attrs** use `attr:` prefix (e.g., `attr:label={props.label}`, `attr:disabled={props.disabled ? "" : undefined}`)
- **Table `customEditorRenderer`** must return vanilla DOM elements (`document.createElement`), not JSX. Use `editor: "custom"`, not `editor: "text"`
- **Trimble logo assets** require `defineCustomElements(window, { resourcesUrl: origin + "/" })` in `index.tsx` and static copy to both `modus-wc/assets` and `assets` in `vite.config.ts`

**Routes**: `/` (HomePage), `/dev/colors`, `/dev/icons`, `/dev/components`, `/dev/demos/*` (44 demo pages)

### Testing

Vitest tests in `tests/`:
- config.test.js
- frameworks.test.js
- utils/file.test.js
- utils/git.test.js
- utils/prerequisites.test.js

30s timeout for integration tests. Coverage excludes src/cli.js.

## Key Principles

**Bundled Templates**: Templates are in the npm package, not downloaded at runtime. Works offline, prevents supply chain attacks.

**Error Handling**: System errors transformed to actionable user messages in `src/utils/git.js:getDetailedErrorMessage()`.

**Dual Mode**: Interactive prompts (default) or full CLI arguments.

## Testing Locally

```bash
node bin/create-trimble-app.js --help
node bin/create-trimble-app.js my-app --framework react --dry-run
node bin/create-trimble-app.js my-app --framework solidjs --dry-run
```

Use `--dry-run` to preview, `--verbose` for debug output.

## Adding a Framework

1. Create `templates/<framework-name>/` with complete project
2. Add to `templates/config.json`
3. Update `validateFramework()` in `src/cli.js`
4. Add tests

## Node.js Requirements

Node.js 18+ required. ES modules (type: "module").
