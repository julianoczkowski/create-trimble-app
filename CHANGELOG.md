# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Post-scaffold validation** - CLI now runs `lint:all` after dependency installation to verify template integrity before the developer starts coding
- **Template health report** - `TEMPLATE-HEALTH.md` auto-generated dashboard showing versions, component counts, lint script coverage, and status across all 3 templates. Run `node scripts/generate-template-health.js` to regenerate
- **Template validation CI** - New `template-validation.yml` workflow that scaffolds, installs, lints, and builds all 3 templates on every PR touching `templates/` or `src/`
- **Trimble Identity auth rules** - Cursor rules for adding TID authentication to React (`@trimble-oss/trimble-id-react`) and SolidJS (embedded wrapper around `TIDClient`) templates
- **SolidJS Template** - New SolidJS + Vite + Modus 2.0 Components template
  - SolidJS 1.9.5 with `@solidjs/router` for client-side routing
  - Direct Modus web component integration (no wrapper library needed)
  - SolidJS reactive primitives (`createSignal`, `createEffect`, `createContext`)
  - 51 Modus component wrappers with `on:eventName` and `attr:propName` patterns
  - 46 interactive demo pages showcasing every Modus component
  - Dev Panel with theme switching, color palette, icons gallery, and component gallery
  - 6 Modus theme variants (classic, modern, connect - light/dark)
  - 44 Cursor Rules adapted for SolidJS development patterns
  - 10 Cursor Skills for AI-assisted SolidJS development
  - Vitest + `@solidjs/testing-library` test setup
  - ESLint with `eslint-plugin-solid`
  - TypeScript with `jsx: "preserve"` and `jsxImportSource: "solid-js"`
  - GitHub Actions CI workflow
  - Code quality scripts (type-check, icon lint, semantic HTML, etc.)

### Fixed

- **Pre-commit hooks now block on failure** - All 3 templates: added `|| exit 1` to every check so failed lints actually prevent commits (previously hooks always exited 0)
- **Pre-commit hooks run all checks** - React/SolidJS now run 8 checks (added `lint:opacity` and `lint:icon-names`), Angular runs 7
- **`lint:all` runs all checks** - New `run-all-checks.js` script replaces `&&` chaining so all checks run even if some fail, with a summary table at the end
- **SolidJS `<span>` in ModusTooltip** - Changed to `<div>` to pass `lint:semantic` (verified tooltip still works via Playwright)
- **React `<span>` in ModusTooltip** - Same fix as SolidJS
- **Inline styles false positive** - Fixed exclusion path from `src/pages/ColorPalettePage.tsx` to `src/dev-pages/**` in all templates
- **SolidJS scripts said "Vite + React"** - All 8 scripts updated to say "Vite + SolidJS"
- **SolidJS semantic HTML script suggested `className=`** - Fixed to suggest `class=` (SolidJS syntax)
- **Angular semantic HTML script said "Vite + React"** - Fixed to say "Angular", suggestions use `class=`
- **SolidJS GitHub instructions used React patterns** - Rewrote all 5 `.github/instructions/` files with SolidJS patterns (`createSignal`, `onMount`, `class=`, `Component` type, `@solidjs/router`)
- **SolidJS CI missing from template verification** - Added `templates/solidjs/package.json` check to `ci.yml`

### Changed

- CLI now supports three frameworks: React, Angular, and SolidJS
- Framework validation updated to accept `solidjs` as a valid option
- Updated CLI security notice and help text to list all three templates
- CLI architecture now includes step 7 (post-scaffold validation) between dependency install and success message

### Cursor Rules Updated (SolidJS)

- `modus-checkbox-value-inversion-solidjs-short.mdc` - Wrapper prop is `value` not `checked`; use `onValueChange`
- `modus-checkbox-value-inversion-solidjs.mdc` - Added "Use the Wrapper" section with correct API
- `modus-navbar-side-navigation-solidjs-short.mdc` - Added navbar slots and SideNavigation flat-only limitation
- `modus-navbar-side-navigation-solidjs.mdc` - Added custom sidebar guidance for hierarchical navigation
- `modus-solidjs-integration-short.mdc` - Added "Common Wrapper Prop Gotchas" section
- `modus-solidjs-essentials.mdc` - Added TextInput, SideNavigation, Table limitation sections
- `modus-components-reference.mdc` - Added critical notes to Checkbox, TextInput, SideNavigation, Table entries

## [2.0.0] - 2026-01-28

### Added

- **Bundled Templates** - Templates now included directly in npm package
  - No external network dependencies at runtime
  - Works completely offline
  - Faster project creation (local file copy)
  - More secure - no supply chain risks from external repos

- **Developer Experience**
  - Commander.js for robust CLI argument parsing
  - `--dry-run` mode to preview changes without executing
  - `--verbose` flag for debugging output
  - `--info` flag to show CLI information
  - Update notifier for new CLI versions

- **Testing**
  - Comprehensive test suite with Vitest
  - Unit tests for utilities
  - Integration tests for templates

- **CI/CD**
  - GitHub Actions workflow for PR testing
  - Security audit in CI pipeline
  - Automated npm publishing with provenance

### Changed

- Templates are now bundled instead of downloaded from GitHub
- Simplified framework options to React and Angular only
- Removed `degit` dependency (no longer needed)
- Version bumped to 2.0.0 for architecture change

### Removed

- `--offline` flag (offline is now the default and only mode)
- External template downloads via degit
- SHA256 checksum verification (not needed with bundled templates)

## [1.0.0] - Previous Release

### Added

- Initial release
- Interactive CLI with framework selection
- Support for React, Vue, Angular, and HTML templates
- Template cloning via degit
- Automatic dependency installation
- Package manager detection (npm, yarn, pnpm)

---

For more information, see the [GitHub releases](https://github.com/julianoczkowski/create-trimble-app/releases).
