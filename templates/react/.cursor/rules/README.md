# Cursor Rules Index

This directory contains all Cursor rules for the Modus React application. Rules provide persistent, reusable context to guide AI assistance.

## Rule Structure

### Rule Types

We use a **short/full rule pattern** for optimal performance and clarity:

1. **Short Rules** (`*-short.mdc`):
   - `alwaysApply: true` - Always included in chat context
   - Concise summaries (<50 lines)
   - Essential patterns only
   - Reference full rules for details

2. **Full Rules** (`*.mdc` without `-short`):
   - `alwaysApply: false` - Apply intelligently based on context
   - Detailed patterns and examples (<500 lines recommended)
   - Comprehensive guidance
   - Activated by file patterns (`globs`) or description matching

### Rule Application

Rules are applied in this order (per Cursor documentation):

1. **Team Rules** (if applicable)
2. **Project Rules** (this directory)
   - Always Apply rules (`alwaysApply: true`)
   - Apply Intelligently rules (`alwaysApply: false` with descriptions)
   - Apply to Specific Files (via `globs` patterns)
3. **User Rules** (global preferences)

### Rule File Format

All rules use frontmatter metadata:

```yaml
---
description: Brief contextual description for intelligent application
globs: ["**/*.tsx", "**/*.ts"]  # File patterns that trigger this rule
alwaysApply: false  # true = always apply, false = apply intelligently
---
```

## Rule Categories

### Component-Specific Rules

Rules for specific Modus components with targeted file patterns:

| Rule | Short | Full | Description |
|------|-------|------|-------------|
| Accordion | `modus-accordion-state-management-react-short.mdc` | `modus-accordion-state-management-react.mdc` | State management patterns |
| Button Group | `modus-button-group-usage-react-short.mdc` | `modus-button-group-usage-react.mdc` | Button group styling patterns |
| Checkbox | `modus-checkbox-value-inversion-react-short.mdc` | `modus-checkbox-value-inversion-react.mdc` | Value inversion bug handling |
| Modal | `modus-modal-implementation-react-short.mdc` | `modus-modal-implementation-react.mdc` | Modal implementation patterns |
| Navbar + Side Nav | `modus-navbar-side-navigation-react-short.mdc` | `modus-navbar-side-navigation-react.mdc` | Navigation integration |
| Select/Dropdown | `modus-select-vs-dropdown-menu-react-short.mdc` | `modus-select-vs-dropdown-menu-react.mdc` | Dropdown menu patterns |

**Globs Pattern**: `["**/components/Modus[Component]*.tsx", "**/demos/**/page.tsx"]`

### Design System Rules

Rules for design system usage (colors, icons, borders, etc.):

| Rule | Short | Full | Description |
|------|-------|------|-------------|
| Colors | `modus-color-usage-react-short.mdc` | `modus-color-usage-react.mdc` | Color system usage |
| Icons | `modus-icons-react-short.mdc` | `modus-icons-react.mdc` | Icon usage patterns |
| Borders | `border-usage-guidelines-short.mdc` | `border-usage-guidelines.mdc` | Border utilities |
| Opacity | `modus-opacity-utilities-react-short.mdc` | `modus-opacity-utilities-react.mdc` | Opacity utilities |
| Semantic HTML | `modus-semantic-html-react-short.mdc` | `modus-semantic-html-react.mdc` | HTML element usage |
| Tailwind | `modus-tailwind-usage-react-short.mdc` | `modus-tailwind-usage-react.mdc` | Tailwind integration |
| Themes | `modus-themes-react-short.mdc` | `modus-themes-react.mdc` | Theme implementation |

**Globs Pattern**: `["**/*.tsx", "**/*.ts"]` or `["**/*.tsx", "**/*.css"]`

### Integration & Best Practices

Rules for React integration and development patterns:

| Rule | Short | Full | Description |
|------|-------|------|-------------|
| Integration | `modus-react-integration-short.mdc` | `modus-react-integration.mdc` | React + Modus integration |
| Best Practices | `modus-react-best-practices-short.mdc` | `modus-react-best-practices.mdc` | React best practices |
| Key Warnings | `modus-react-key-warnings-short.mdc` | `modus-react-key-warnings.mdc` | React key prop patterns |
| Essentials | N/A | `modus-react-essentials.mdc` | Comprehensive essentials |

**Globs Pattern**: `["**/*.tsx", "**/*.ts"]`

### Workflow & Testing

Rules for development workflow and testing:

| Rule | Short | Full | Description |
|------|-------|------|-------------|
| Development Workflow | `development-workflow-react-short.mdc` | `development-workflow-react.mdc` | Linting and quality checks |
| Chrome DevTools | `chrome-devtools-testing-react-short.mdc` | `chrome-devtools-testing-react.mdc` | Browser testing patterns |
| Implementation Guides | `implementation-guides-react-short.mdc` | `implementation-guides-react.mdc` | Feature development guides |

**Globs Pattern**: `["**/*.tsx", "**/*.ts", "**/*.css"]` or specific patterns

### UX Rules

Rules in `ux/` subdirectory:

| Rule | Description |
|------|-------------|
| `ux-ui-foundations.mdc` | UI/UX foundations with Modus 2 + Tailwind |
| `gestalt-laws-detailed.mdc` | Gestalt Laws implementation guide |

**Globs Pattern**: `["**/*.tsx", "**/*.ts"]`

### Reference Files

Reference documentation (not rules, but referenced by rules):

| File | Purpose |
|------|---------|
| `modus-icon-names.mdc` | Complete list of valid Modus icon names |
| `modus-components-reference.mdc` | Component reference guide |

## Using Rules

### Automatic Application

- **Short rules** (`alwaysApply: true`) are always included
- **Full rules** apply when:
  - File matches `globs` pattern
  - Description matches context
  - Agent determines relevance

### Manual Application

Reference rules in chat using `@` mentions:

```
@modus-modal-implementation-react How do I implement a modal?
@modus-color-usage-react What colors should I use?
```

### Referencing Rules in Rules

Rules can reference other rules or files:

```markdown
For detailed patterns, see: `modus-button-group-usage-react`
For icon names, see: `modus-icon-names`
```

## Rule Best Practices

Based on [Cursor documentation](https://cursor.com/docs/context/rules):

### ✅ Do

- Keep rules focused and actionable
- Provide concrete examples
- Reference files instead of copying contents
- Keep rules under 500 lines (split if needed)
- Use clear, specific descriptions
- Cross-reference related rules

### ❌ Don't

- Copy entire style guides (use linters)
- Document every possible command
- Add instructions for rare edge cases
- Duplicate what's in your codebase

## Current Rule Status

### Rule Length Compliance

⚠️ **Rules exceeding 500 lines** (recommended limit):

- `modus-modal-implementation-react.mdc`: 831 lines
- `modus-react-key-warnings.mdc`: 805 lines
- `modus-tailwind-usage-react.mdc`: 642 lines
- `modus-react-integration.mdc`: 509 lines
- `modus-react-best-practices.mdc`: 508 lines
- `modus-themes-react.mdc`: 506 lines

**Recommendation**: Consider splitting these into focused sub-rules.

### Rule Coverage

- ✅ All short rules have `alwaysApply: true`
- ✅ All full rules have `alwaysApply: false`
- ✅ All rules have `description:` and `globs:`
- ✅ Descriptions match between short and full rules
- ✅ References point to correct full rules

## Quick Reference

### Most Common Rules

1. **Design System Colors**: `modus-color-usage-react-short.mdc` (always applied)
2. **Icons**: `modus-icons-react-short.mdc` (always applied)
3. **Component Patterns**: Component-specific rules apply when working with those components
4. **React Integration**: `modus-react-integration.mdc` (applies intelligently)

### Finding Rules

- **Component issues?** → Check component-specific rules
- **Styling questions?** → Check design system rules
- **React patterns?** → Check integration/best practices rules
- **Workflow help?** → Check workflow/testing rules

## Maintenance

### Adding New Rules

1. Create short rule (`*-short.mdc`) with `alwaysApply: true`
2. Create full rule (`.mdc`) with `alwaysApply: false`
3. Add `description:` and `globs:` to both
4. Update this README with new rule entry
5. Ensure descriptions match between short and full

### Updating Rules

1. Update short rule summary
2. Update full rule details
3. Keep descriptions synchronized
4. Verify globs patterns are appropriate
5. Test rule application

### Rule Naming Convention

- Short rules: `[name]-react-short.mdc`
- Full rules: `[name]-react.mdc`
- Reference files: `modus-[name].mdc`
- UX rules: `ux/[name].mdc`

## Related Documentation

- [Cursor Rules Documentation](https://cursor.com/docs/context/rules)
- [Modus Design System](https://modus-web-components.trimble.com/)
- [Project CLAUDE.md](../CLAUDE.md) - Project-specific guidance
