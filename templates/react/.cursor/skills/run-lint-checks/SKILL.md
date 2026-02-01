---
name: run-lint-checks
description: Run comprehensive lint checks for React + Vite project to ensure design system compliance, type safety, and code quality. Use when making code changes, before completing tasks, or when the user requests lint checks.
---

# Run Lint Checks

Automatically run all linting and quality checks for the React + Vite project to ensure design system compliance, type safety, and code quality.

## When to Use

- **Before completing any task** - Always run lint checks before marking tasks as complete
- **After making code changes** - Run checks after modifying TypeScript, TSX, or CSS files
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
- Modus icons validation (`npm run lint:icons`)
- Semantic HTML compliance (`npm run lint:semantic`)
- Color compliance (`npm run lint:colors`)
- Inline styles validation (`npm run lint:styles`)
- Border violations (`npm run lint:borders`)
- Opacity utilities (`npm run lint:opacity`)
- Icon name validation (`npm run lint:icon-names`)

### Individual Lint Commands

If you need to run checks individually:

```bash
# ESLint (React/TypeScript)
npm run lint

# TypeScript type checking
npm run type-check

# Modus icons library validation
npm run lint:icons

# Semantic HTML compliance
npm run lint:semantic

# Design system color compliance
npm run lint:colors

# Inline styles validation
npm run lint:styles

# Border pattern violations
npm run lint:borders

# Opacity utilities validation
npm run lint:opacity

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
```tsx
// ❌ VIOLATION
<div style={{ backgroundColor: 'var(--modus-wc-color-base-page)' }}>
<div style={{ marginRight: '8px' }}>

// ✅ CORRECT
<div className="bg-background mr-2 text-foreground">
```

#### Color Usage
```tsx
// ❌ VIOLATION
<div style={{ backgroundColor: '#ffffff' }}>
<div className="bg-blue-500 text-red-400">

// ✅ CORRECT
<div className="bg-background text-foreground">
```

#### Icon Usage
```tsx
// ❌ VIOLATION
<i className="fa fa-home"></i>
<i className="material-icons">home</i>

// ✅ CORRECT
<i className="modus-icons">home</i>
```

#### Semantic HTML
```tsx
// ❌ VIOLATION
<h1>Title</h1>
<p>Content</p>
<section>Section</section>

// ✅ CORRECT (use div elements only)
<div className="text-4xl font-bold">Title</div>
<div className="text-base">Content</div>
<div className="bg-card">Section</div>
```

#### Border Violations
```tsx
// ❌ VIOLATION
<div className="border border-red-500">Error message</div>

// ✅ CORRECT
<div className="border-destructive">Error message</div>
```

#### Opacity Violations
```tsx
// ❌ VIOLATION
<div className="text-foreground/80">Text with opacity</div>

// ✅ CORRECT
<div className="text-foreground-80">Text with opacity</div>
```

## Quality Gates

All of these must pass before code is considered complete:

- [ ] `npm run lint` - 0 ESLint errors
- [ ] `npm run type-check` - 0 TypeScript errors
- [ ] `npm run lint:icons` - 0 icon violations
- [ ] `npm run lint:semantic` - 0 semantic HTML violations
- [ ] `npm run lint:colors` - 0 color violations
- [ ] `npm run lint:styles` - 0 inline style violations
- [ ] `npm run lint:borders` - 0 border violations
- [ ] `npm run lint:opacity` - 0 opacity violations
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

## React-Specific Patterns

### Component Patterns
- Use wrapper components from `src/components/` not web components directly
- Use `useRef` + `useEffect` for event listeners with proper cleanup
- Let Modus components manage their own state (don't control from React state)

### Event Handling
```tsx
// ✅ CORRECT: Event listener pattern
useEffect(() => {
  const component = componentRef.current;
  if (!component) return;

  const handleEvent = (event: Event) => {
    onEvent?.(event as CustomEvent<EventDetailType>);
  };

  if (onEvent) {
    component.addEventListener('eventName', handleEvent);
  }

  return () => {
    if (onEvent) {
      component.removeEventListener('eventName', handleEvent);
    }
  };
}, [onEvent]);
```

### Conditional Props
```tsx
// ✅ CORRECT: Conditional spreading
<ModusWcComponent
  {...(color && { color })}
  {...(variant && { variant })}
/>

// ❌ WRONG: Passing undefined
<ModusWcComponent
  color={color} // May be undefined
/>
```

## Notes

- Lint checks are fast and should be run frequently during development
- Some violations may require architectural changes - discuss these with the user if needed
- The `lint:all` command stops on first failure - fix issues sequentially
- All lint scripts are located in `scripts/` directory
- These checks enforce the Modus Design System compliance requirements
- React-specific patterns (hooks, event handling) are validated through ESLint
