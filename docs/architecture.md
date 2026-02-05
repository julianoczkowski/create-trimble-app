# CLI Architecture

This document describes the architecture and internal workings of the `create-trimble-app` CLI tool.

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        create-trimble-app                       │
├─────────────────────────────────────────────────────────────────┤
│  bin/create-trimble-app.js  →  Entry point (shebang script)     │
│         ↓                                                       │
│  src/cli.js               →  Commander.js argument parsing      │
│         ↓                                                       │
│  src/scaffold.js          →  Main scaffolding orchestration     │
│         ↓                                                       │
│  src/utils/*              →  Utility modules                    │
│         ↓                                                       │
│  templates/*              →  Bundled project templates          │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
create-trimble-app/
├── bin/
│   └── create-trimble-app.js    # npm bin entry point
├── src/
│   ├── cli.js                 # CLI argument parsing (Commander.js)
│   ├── scaffold.js            # Main scaffolding logic (@clack/prompts)
│   ├── frameworks.js          # Framework configuration loader
│   └── utils/
│       ├── colors.js          # Trimble Blue colors & true color support
│       ├── file.js            # File operations, validation
│       ├── git.js             # Template copying
│       ├── install.js         # Silent dependency installation
│       └── logger.js          # Branded output (boxen, picocolors)
├── templates/
│   ├── config.json            # Framework metadata
│   ├── react/                 # Complete React template
│   └── angular/               # Complete Angular template
├── tests/                     # Vitest test suite
└── docs/                      # Documentation
```

## Data Flow

```
User runs: npx @julianoczkowski/create-trimble-app my-app --framework react

    ┌──────────────┐
    │   npm/npx    │
    └──────┬───────┘
           │ downloads package from npm registry
           ▼
    ┌──────────────┐
    │  bin/cli.js  │
    └──────┬───────┘
           │ imports and calls cli()
           ▼
    ┌──────────────┐
    │  src/cli.js  │  ← Commander.js parses arguments
    └──────┬───────┘    (--framework react, my-app, etc.)
           │
           │ calls scaffold(options)
           ▼
    ┌──────────────────┐
    │  src/scaffold.js │  ← Main orchestration
    └──────┬───────────┘
           │
           ├─── loadFrameworks() ──→ reads templates/config.json
           │
           ├─── Interactive prompts (if needed)
           │    └── @clack/prompts for threaded UI
           │
           ├─── copyTemplate() ──→ copies templates/react/ to ./my-app/
           │
           ├─── updatePackageJson() ──→ sets project name
           │
           └─── installDependencies() ──→ runs npm/yarn/pnpm install
                     │
                     ▼
              ┌─────────────┐
              │  Project    │
              │  Created!   │
              └─────────────┘
```

## Core Modules

### 1. `bin/create-trimble-app.js`

The npm bin entry point. Simple wrapper that imports and runs the CLI.

```javascript
#!/usr/bin/env node
import { cli } from "../src/cli.js";
cli();
```

### 2. `src/cli.js`

Handles command-line argument parsing using Commander.js.

**Responsibilities:**

- Define CLI options and arguments
- Validate framework option
- Check for updates (non-blocking)
- Call scaffold() with parsed options

**Key Options:**
| Option | Type | Description |
|--------|------|-------------|
| `[project-name]` | argument | Target directory name |
| `--framework` | option | react or angular |
| `--current-folder` | flag | Install in current directory |
| `--dry-run` | flag | Preview mode |
| `--verbose` | flag | Debug output |
| `--no-install` | flag | Skip npm install |

### 3. `src/scaffold.js`

Main orchestration module. Coordinates the entire scaffolding process.

**Flow:**

1. Show welcome banner
2. Handle `--info` flag if present
3. Framework selection (prompt or CLI arg)
4. Location selection (current folder or new)
5. Project name input/validation
6. Dry-run output (if enabled)
7. Copy template files
8. Update package.json
9. Install dependencies (if enabled)
10. Show success message with next steps

### 4. `src/frameworks.js`

Loads and manages framework configurations.

```javascript
// Reads templates/config.json
export function loadFrameworks() {
  // Returns array of enabled frameworks
}

export function getFrameworkById(frameworks, id) {
  // Returns specific framework config
}
```

### 5. `src/utils/file.js`

File system utilities.

**Functions:**

- `updatePackageJson(path, updates)` - Modify package.json fields
- `validateProjectName(name, isCurrentFolder)` - Validate project name
- `getCurrentFolderName()` - Get current directory name

### 6. `src/utils/git.js`

Template copying utilities.

**Functions:**

- `copyTemplate(templateName, targetPath)` - Copy bundled template
- `hasTemplate(templateName)` - Check if template exists
- `getDetailedErrorMessage(error)` - User-friendly error messages

### 7. `src/utils/install.js`

Dependency installation.

**Functions:**

- `installDependencies(projectPath)` - Run npm/yarn/pnpm install
- `detectPackageManager(projectPath)` - Auto-detect package manager

### 8. `src/utils/colors.js`

Trimble brand color utilities with true color (24-bit) terminal support.

**Features:**

- `colors.brand()` - Trimble Blue (#0063a3) with 256-color fallback
- `colors.brandBold()` - Bold brand blue for commands
- `colors.dimBlue()` - Dimmed blue for secondary text
- True color detection via COLORTERM environment variable

### 9. `src/utils/logger.js`

Branded console output using boxen and picocolors.

**Functions:**

- `logger.info/success/warning/error()` - Colored log messages
- `logger.welcome()` - Trimble ASCII art banner with boxen borders
- `logger.securityNotice()` - Security information box
- `logger.nextSteps()` - Beginner-friendly post-install instructions

## Templates

### Structure

Templates are complete, working projects bundled in the npm package.

```
templates/
├── config.json           # Framework metadata
├── react/
│   ├── .cursor/          # Cursor IDE rules
│   ├── .github/          # GitHub templates & workflows
│   ├── .husky/           # Git hooks
│   ├── .vscode/          # VS Code settings
│   ├── docs/             # Documentation
│   ├── scripts/          # Code quality scripts
│   ├── src/              # Source code
│   ├── package.json      # Dependencies
│   └── ...               # Config files
└── angular/
    ├── .cursor/          # Cursor IDE rules
    ├── .github/          # GitHub templates & workflows
    ├── .husky/           # Git hooks
    ├── .vscode/          # VS Code settings
    ├── docs/             # Documentation
    ├── scripts/          # Code quality scripts
    ├── src/              # Source code
    ├── package.json      # Dependencies
    └── ...               # Config files
```

### config.json

```json
{
  "frameworks": {
    "react": {
      "name": "React App",
      "description": "Build with React, Vite and Modus 2.0 Components",
      "badge": "●",
      "note": "Most Popular • Huge Ecosystem..."
    },
    "angular": {
      "name": "Angular",
      "description": "Build with Angular and Modus 2.0 Web Components",
      "badge": "■",
      "note": "Enterprise Grade • TypeScript First..."
    }
  },
  "meta": {
    "configVersion": "2.0.0",
    "templatesIncluded": true
  }
}
```

## Security Design

### Bundled Templates

Templates are **bundled directly in the npm package**, not downloaded at runtime.

**Benefits:**

- No network requests during project creation
- Works completely offline
- No supply chain attacks from external repos
- Consistent, version-locked templates
- Faster project creation (local file copy)

### No External Dependencies at Runtime

The CLI only requires network access for:

1. Initial `npx` download (one-time)
2. `npm install` for project dependencies (optional)

Template copying is entirely local.

## Dependencies

### Runtime Dependencies

| Package           | Purpose                                |
| ----------------- | -------------------------------------- |
| `@clack/prompts`  | Threaded interactive prompts           |
| `boxen`           | Unicode box borders for branded output |
| `commander`       | CLI argument parsing                   |
| `execa`           | Process execution (silent npm install) |
| `picocolors`      | Lightweight terminal colors            |
| `update-notifier` | Version update notifications           |

### Dev Dependencies

| Package  | Purpose           |
| -------- | ----------------- |
| `vitest` | Testing framework |
| `eslint` | Code linting      |

## Testing

Tests are located in `tests/` and use Vitest.

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Test Coverage:**

- `tests/config.test.js` - Config validation
- `tests/frameworks.test.js` - Framework loading
- `tests/utils/file.test.js` - File utilities
- `tests/utils/git.test.js` - Template copying

## Publishing

### npm Package Contents

The `files` field in package.json determines what's published:

```json
{
  "files": ["bin/", "src/", "templates/"]
}
```

### CI/CD

GitHub Actions workflow (`.github/workflows/_publish.yml`):

1. Run tests on Node 18, 20, 22
2. Security audit
3. Verify bundled templates
4. Publish with npm provenance
5. Create GitHub release

## Adding a New Framework

1. Create template directory: `templates/<framework-name>/`
2. Add complete working project files
3. Update `templates/config.json`:
   ```json
   "<framework-name>": {
     "name": "Display Name",
     "description": "Short description",
     "badge": "◆",
     "note": "Additional info"
   }
   ```
4. Update `src/cli.js` to include in validation
5. Add tests in `tests/`
6. Update documentation

## Error Handling

Errors are caught and transformed into user-friendly messages:

```javascript
// src/utils/git.js
export function getDetailedErrorMessage(error) {
  if (message.includes("EACCES")) {
    return "Permission denied...";
  }
  if (message.includes("ENOSPC")) {
    return "Not enough disk space...";
  }
  // etc.
}
```

## Performance

- **Template copy**: ~100ms (local file copy)
- **npm install**: Varies by network (optional)
- **Total cold start**: ~2-3s (without install)

The bundled approach is significantly faster than downloading from GitHub.
