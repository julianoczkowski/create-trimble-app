# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`create-trimble-app` is an interactive CLI tool that scaffolds Modus 2.0 web component applications for React and Angular. Templates are **bundled directly in the npm package** (not downloaded at runtime) for security, offline support, and consistency.

## Development Commands

```bash
# Run CLI locally
npm run dev

# Testing
npm test                  # Run all tests once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report

# Linting
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
          ├→ src/frameworks.js (loads templates/config.json)
          └→ src/utils/* (file, git, install, logger)
```

### Key Modules

**src/cli.js**: Parses CLI arguments with Commander.js. Validates framework option (react, angular). Handles all CLI flags (--framework, --current-folder, --dry-run, --verbose, --info, --no-install). Checks for updates non-blocking.

**src/scaffold.js**: Orchestrates the scaffolding flow:
1. Framework selection (interactive or CLI arg)
2. Installation location (current folder or new directory)
3. Project name validation
4. Dry-run preview (if enabled)
5. Template copying
6. package.json name update
7. Dependency installation (optional)
8. Success message

**src/frameworks.js**: Loads `templates/config.json` and returns enabled frameworks. Filters out any with `disabled: true`. Provides `getFrameworkById()` lookup.

**src/utils/file.js**: `validateProjectName()`, `updatePackageJson()`, `getCurrentFolderName()`

**src/utils/git.js**: `copyTemplate()` copies from bundled `templates/` directory to target (local file copy, no git operations). `getDetailedErrorMessage()` transforms errors (EACCES, ENOSPC, etc.) into user-friendly messages.

**src/utils/install.js**: Auto-detects package manager from lock files, runs install using execa.

**src/utils/logger.js**: Colored console output, welcome banner, security notice, next steps.

### Templates

Complete working projects in `templates/react/` and `templates/angular/`. Each includes .cursor/, .github/, .husky/, .vscode/, docs/, scripts/, src/, and full package.json.

`templates/config.json` defines framework metadata (name, description, badge, note) read by `src/frameworks.js`.

### Testing

Vitest tests in `tests/`:
- config.test.js
- frameworks.test.js
- utils/file.test.js
- utils/git.test.js

30s timeout for integration tests. Coverage excludes src/cli.js.

## Key Principles

**Bundled Templates**: Templates are in the npm package, not downloaded at runtime. Works offline, prevents supply chain attacks.

**Error Handling**: System errors transformed to actionable user messages in `src/utils/git.js:getDetailedErrorMessage()`.

**Dual Mode**: Interactive prompts (default) or full CLI arguments.

## Testing Locally

```bash
node bin/create-trimble-app.js --help
node bin/create-trimble-app.js my-app --framework react --dry-run
```

Use `--dry-run` to preview, `--verbose` for debug output.

## Adding a Framework

1. Create `templates/<framework-name>/` with complete project
2. Add to `templates/config.json`
3. Update `validateFramework()` in `src/cli.js`
4. Add tests

## Node.js Requirements

Node.js 18+ required. ES modules (type: "module").
