# create-trimble-app Template Deck

> Key insights into what's bundled in the React and Angular Modus 2.0 templates

---

## Overview

Each template ships as a **complete, production-ready starter kit** with AI-assisted development infrastructure. The templates are bundled directly in the npm package for security, offline support, and consistency.

| Feature | React Template | Angular Template |
|---------|----------------|------------------|
| Cursor Rules | 44 files | 51 files |
| Validation Scripts | 8 scripts | 8 scripts |
| Cursor Skills | 9 skills | 1 skill |
| Cursor Commands | 2 commands | 2 commands |
| Pre-Commit Checks | 7 checks | 8 checks |
| MCP Servers | 2 configured | 2 configured |
| Agent Documentation | CLAUDE.md + AGENTS.md | CLAUDE.md + AGENTS.md |

---

## AI Agent Documentation

Both templates include comprehensive documentation for AI coding assistants:

### CLAUDE.md
Project-specific instructions for Claude Code covering:
- Project architecture and file structure
- Dev panel functionality (toggleable via keyboard shortcut)
- Framework-specific patterns (React 19 / Angular 20)
- Design system integration rules

### AGENTS.md
Comprehensive agent profile defining:
- Code style guidelines and formatting rules
- Critical patterns and known bugs (checkbox inversion, modal access, opacity)
- Theme system integration (6 themes)
- Strict boundaries for what agents should/shouldn't modify
- Component-specific implementation patterns

**React:** 120 + 292 lines | **Angular:** 149 + 378 lines

---

## Cursor Rules (`.cursor/rules/`)

Extensive rule files structured with **short/full pattern** for optimal LLM context loading.

### Design System Rules
| Rule | Purpose |
|------|---------|
| `modus-color-usage` | 9-color system compliance |
| `modus-icons` | Modus icons library only |
| `modus-semantic-html` | div-only approach (no semantic elements) |
| `border-usage-guidelines` | Directional borders pattern |
| `modus-opacity-utilities` | Custom opacity utilities |
| `modus-themes` | 6 theme system integration |
| `modus-tailwind-usage` | Tailwind v3/v4 integration |

### Component-Specific Rules
- Accordion state management
- Button group usage
- Checkbox value inversion (bug workaround)
- Modal implementation (refs + event handling)
- Navbar + Side navigation patterns
- Select vs Dropdown menu guidance
- Table usage (Angular)
- Utility panel (Angular)

### Workflow Rules
- Development workflow patterns
- Chrome DevTools testing guidance
- Implementation guides

### Reference Files
- `modus-icon-names.mdc` - Complete 700+ icon list
- `modus-components-reference.mdc` - Component API reference

### UX Rules
- `ux-ui-foundations.mdc` - UX fundamentals
- `gestalt-laws-detailed.mdc` - Visual perception principles

---

## Validation Scripts (`scripts/`)

8 custom Node.js validation scripts (~3,245 LOC) enforcing Modus design system compliance:

| Script | Lines | Purpose |
|--------|-------|---------|
| `check-typescript.js` | 109 | TypeScript type checking with enhanced UX |
| `check-modus-colors.js` | 247 | Design system 9-color compliance |
| `check-modus-icons.js` | 256 | Modus icons library validation |
| `check-semantic-html.js` | 476 | div-only enforcement |
| `check-inline-styles.js` | 364 | Inline styles detection |
| `check-border-violations.js` | 483 | Directional border patterns |
| `check-opacity-utilities.js` | 481 | Custom opacity validation |
| `check-icon-names.js` | 486 | Icon name validation (700+ icons) |

### Package.json Integration

```json
"lint:all": "npm run type-check && npm run lint:colors && npm run lint:styles && npm run lint:borders && npm run lint:opacity && npm run lint:icons && npm run lint:icon-names"
```

---

## Pre-Commit Validation (`.husky/pre-commit`)

Automated quality gates run on every commit:

**React (7 checks):**
1. TypeScript type checking
2. Modus Icons compliance
3. Semantic HTML compliance
4. Design system colors
5. Inline styles validation
6. Border pattern violations
7. Icon names validation

**Angular (8 checks):**
- All React checks plus Opacity utilities validation

---

## Cursor Commands (`.cursor/commands/`)

### `remove-dev-content.md`
Interactive command to strip development panel and demo content for production deployment.
- React: 312 lines
- Angular: 394 lines

### `scaffold-shell-app.md`
Interactive shell application scaffolding with:
- Modus navbar configuration
- Side navigation setup
- Route configuration
- Layout structure

**React:** 653 lines | **Angular:** 1,066 lines (extended route configuration)

---

## MCP Server Configuration (`.cursor/mcp.json`)

Both templates ship with pre-configured MCP servers for enhanced AI context:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    },
    "modus-docs": {
      "command": "npx",
      "args": ["-y", "@julianoczkowski/mcp-modus"]
    }
  }
}
```

| Server | Purpose |
|--------|---------|
| **context7** | General documentation context provider |
| **modus-docs** | Modus design system documentation server |

---

## Cursor Skills (`.cursor/skills/`)

### React Template (9 Skills)
| Skill | Purpose |
|-------|---------|
| `create-modus-wrapper-component` | Component wrapper patterns |
| `create-modus-form-component` | Form component scaffolding |
| `fix-modus-component-event-issues` | Event handling fixes |
| `handle-modus-checkbox-value-bug` | Checkbox inversion workaround |
| `implement-modus-modal-with-refs` | Modal implementation with refs |
| `integrate-modus-icons` | Icon integration patterns |
| `run-lint-checks` | Quality gate enforcement |
| `set-up-modus-event-listeners` | Event listener setup |
| `style-modus-components-with-tailwind` | Tailwind styling patterns |

### Angular Template (1 Skill)
| Skill | Purpose |
|-------|---------|
| `run-lint-checks` | Quality gate enforcement |

> Angular relies more heavily on rules vs skills for AI guidance

---

## VSCode Configuration (`.vscode/`)

### React
- `extensions.json` - Recommended extensions

### Angular
- `extensions.json` - Recommended extensions
- `launch.json` - Chrome debugging configurations
- `tasks.json` - npm task configurations with problem matchers

---

## Key Differentiators

### Bundled Templates
Templates are packaged directly in npm (not downloaded at runtime):
- Works offline
- Prevents supply chain attacks
- Consistent versioning

### AI-First Development
- Comprehensive Cursor rules for context-aware assistance
- MCP servers for real-time documentation access
- Agent documentation (CLAUDE.md, AGENTS.md) for consistent AI behavior
- Reusable skills for common patterns

### Design System Enforcement
- Automated validation scripts
- Pre-commit hooks blocking non-compliant code
- 9-color palette enforcement
- Modus icons-only policy
- Custom opacity utilities (no Tailwind opacity)

### Production-Ready Patterns
- Known bug workarounds documented
- Component-specific implementation guides
- Shell app scaffolding commands
- Dev content removal commands

---

## Template Paths

```
templates/
├── react/
│   ├── .cursor/
│   │   ├── commands/
│   │   ├── mcp.json
│   │   ├── rules/
│   │   └── skills/
│   ├── .husky/pre-commit
│   ├── scripts/
│   ├── CLAUDE.md
│   └── AGENTS.md
│
└── angular/
    ├── .cursor/
    │   ├── commands/
    │   ├── mcp.json
    │   ├── rules/
    │   └── skills/
    ├── .husky/pre-commit
    ├── scripts/
    ├── CLAUDE.md
    └── AGENTS.md
```
