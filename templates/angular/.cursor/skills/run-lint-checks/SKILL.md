---
name: run-lint-checks
description: Run comprehensive lint checks for Angular + Vite project to ensure design system compliance, type safety, and code quality. Use when making code changes, before completing tasks, or when the user requests lint checks.
---

# Run Lint Checks

Automatically run all linting and quality checks for the Angular + Vite project to ensure design system compliance, type safety, and code quality.

## When to Use

- **Before completing any task** - Always run lint checks before marking tasks as complete
- **After making code changes** - Run checks after modifying TypeScript, HTML, CSS, or SCSS files
- **Before committing code** - Ensure all quality gates pass before committing
- **When user requests** - Run checks when explicitly requested by the user
- **During code review** - Verify code quality and design system compliance

## Instructions

### Mandatory Pre-Completion Checklist

**CRITICAL**: Before marking any development task as complete, you MUST:

1. Run all lint checks using `npm run lint:all`
2. Fix any violations found
3. Verify TypeScript type checking passes
4. Ensure all design system compliance checks pass

### Running Lint Checks

Execute the comprehensive lint check command:

```bash
npm run lint:all
```

This command runs all checks in sequence:
- TypeScript type checking (`npm run type-check`)
- Color compliance (`npm run lint:colors`)
- Inline styles validation (`npm run lint:styles`)
- Border violations (`npm run lint:borders`)
- Opacity utilities (`npm run lint:opacity`)
- Icon usage (`npm run lint:icons`)
- Icon name validation (`npm run lint:icon-names`)

### Individual Lint Commands

If you need to run checks individually:

```bash
# TypeScript type checking
npm run type-check

# Design system color compliance
npm run lint:colors

# Inline styles validation
npm run lint:styles

# Border pattern violations
npm run lint:borders

# Opacity utilities validation
npm run lint:opacity

# Modus icons library validation
npm run lint:icons

# Icon name validation
npm run lint:icon-names
```

### Handling Violations

When violations are found:

1. **Read the error messages carefully** - Each lint script provides specific file locations and violation details
2. **Fix violations immediately** - Don't proceed until all violations are resolved
3. **Re-run checks** - After fixing, run `npm run lint:all` again to verify
4. **Document fixes** - If a fix requires architectural changes, explain the reasoning

### Common Violations to Fix

#### Inline Styles
```typescript
// ❌ VIOLATION
template: `<div style="background-color: var(--modus-wc-color-base-page)">`
template: `<div [style.margin-right.px]="8">`

// ✅ CORRECT
template: `<div class="bg-background mr-2 text-foreground">`
```

#### Color Usage
```typescript
// ❌ VIOLATION
template: `<div style="background-color: #ffffff">`
template: `<div class="bg-blue-500 text-red-400">`

// ✅ CORRECT
template: `<div class="bg-background text-foreground">`
```

#### Icon Usage
```typescript
// ❌ VIOLATION
template: `<i class="fa fa-home"></i>`
template: `<mat-icon>home</mat-icon>`

// ✅ CORRECT
template: `<i class="modus-icons">home</i>`
template: `<modus-icon name="home" />`
```

#### Border Violations
```html
<!-- ❌ VIOLATION -->
<div class="border border-red-500">Error message</div>

<!-- ✅ CORRECT -->
<div class="border-destructive">Error message</div>
```

#### Opacity Violations
```html
<!-- ❌ VIOLATION -->
<div class="text-foreground/80">Text with opacity</div>

<!-- ✅ CORRECT -->
<div class="text-foreground-80">Text with opacity</div>
```

## Quality Gates

All of these must pass before code is considered complete:

- [ ] `npm run type-check` - 0 TypeScript errors
- [ ] `npm run lint:colors` - 0 color violations
- [ ] `npm run lint:styles` - 0 inline style violations
- [ ] `npm run lint:borders` - 0 border violations
- [ ] `npm run lint:opacity` - 0 opacity violations
- [ ] `npm run lint:icons` - 0 icon violations
- [ ] `npm run lint:icon-names` - 0 invalid icon names

## Integration with Development Workflow

This skill integrates with the project's development workflow:

1. **During Development**: Run checks periodically to catch issues early
2. **Before Completion**: Always run `npm run lint:all` before marking tasks complete
3. **Pre-Commit**: All checks must pass before committing code
4. **CI/CD**: These same checks run in CI/CD pipelines

## Error Handling

If lint checks fail:

1. **Don't skip or ignore violations** - All violations must be fixed
2. **Provide clear error messages** - Show the user exactly what failed and where
3. **Suggest fixes** - When possible, provide specific guidance on how to fix violations
4. **Re-run after fixes** - Always verify fixes by running checks again

## Notes

- Lint checks are fast and should be run frequently during development
- Some violations may require architectural changes - discuss these with the user if needed
- The `lint:all` command stops on first failure - fix issues sequentially
- All lint scripts are located in `scripts/` directory
- These checks enforce the Modus Design System compliance requirements
