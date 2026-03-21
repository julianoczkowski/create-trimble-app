# Modus Design System Linting Scripts for Vite + React

This directory contains comprehensive linting scripts for enforcing Modus Design System compliance in the Vite + React codebase. These scripts ensure consistent styling, proper component usage, and adherence to design system standards.

## Available Linting Scripts

### 1. TypeScript Type Checking (`check-typescript.js`)

**Purpose**: Enhanced TypeScript type checking with improved developer experience and clear error reporting.

**What it provides:**

- Clear success/failure messages with emojis
- Grouped error reporting by file
- Helpful error resolution tips
- Consistent UX with other linting scripts
- Pre-commit integration for type safety

**Usage:**

```bash
npm run type-check
```

**Success Output:**

```
🔍 TypeScript Type Check for Vite + React App

🔍 Running TypeScript type checking...

✅ All TypeScript files are type-safe!
🎯 No type errors found in the codebase.

🎉 Type checking completed successfully!
```

**Error Output:**

```
❌ Found 3 TypeScript errors:

📄 app/components/MyComponent.tsx:
  15:8 - TS2322: Type 'string' is not assignable to type 'number'
  22:12 - TS2345: Argument of type 'undefined' is not assignable to parameter of type 'string'

💡 TypeScript Error Resolution Tips:
  • Check for missing type annotations
  • Verify import/export statements
  • Ensure proper interface definitions
  • Check for null/undefined handling
  • Verify component prop types
```

### 2. Color Compliance (`check-modus-colors.js`)

**Purpose**: Ensures only approved Modus colors are used throughout the codebase.

**What it detects:**

- Tailwind color classes (`red-400`, `blue-500`, etc.)
- Hardcoded hex colors (`#ff0000`, `#ffffff`, etc.)
- RGB/RGBA values
- Background, text, and border color violations

**What it suggests:**

- Proper Modus CSS custom properties
- Design system compliant alternatives
- Links to official documentation

**Usage:**

```bash
npm run lint:colors
```

### 2. Inline Styles Compliance (`check-inline-styles.js`)

**Purpose**: Detects inline styles that should be replaced with Tailwind classes for better maintainability and design system consistency.

**What it detects:**

- Background colors (`backgroundColor`, `background`)
- Text colors (`color`)
- Spacing (`margin`, `padding`)
- Typography (`fontSize`, `fontWeight`, `lineHeight`, `textAlign`)
- Layout properties (`display`, `flexDirection`, `justifyContent`, `alignItems`)
- Positioning (`position`, `top`, `left`, `right`, `bottom`)
- Sizing (`width`, `height`, `maxWidth`, `minHeight`)

**What it suggests:**

- Equivalent Tailwind utility classes
- Design system compliant alternatives
- Performance and maintainability improvements

**Usage:**

```bash
npm run lint:styles
```

**Exceptions:**

- Border-related styles are allowed due to Tailwind v4 + Modus conflicts
- Dynamic values that can't be expressed as Tailwind classes

### 3. Icon Usage Compliance (`check-modus-icons.js`)

**Purpose**: Ensures only Modus Icons are used, preventing non-design-system icon libraries.

**What it detects:**

- Font Awesome icons (`fa-*`, `fas-*`, `far-*`, etc.)
- Material Icons (`material-icons`, `material-symbols`)
- Heroicons (`heroicons`)
- Lucide icons (`lucide`, `lucide-react`)
- React Icons imports (`react-icons`, `@heroicons`, `lucide-react`)
- Other icon libraries (`@ant-design/icons`, `@mui/icons-material`, `@tabler/icons`, `@phosphor-icons`)
- Custom SVG icons (non-Modus)
- Generic icon components (`<Icon>`, `<Icons>`, `<IconButton>`)

**What it suggests:**

- Modus Icons alternatives
- Proper Modus Icons usage patterns
- Design system compliance

**Usage:**

```bash
npm run lint:icons
```

### 4. Semantic HTML Compliance (`check-semantic-html.js`)

**Purpose**: Ensures semantic HTML elements are replaced with `div` elements and Tailwind classes to avoid browser default style conflicts and maintain consistent styling.

**What it detects:**

- Heading elements (`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`)
- Semantic sections (`<section>`, `<header>`, `<footer>`, `<main>`, `<article>`, `<aside>`, `<nav>`)
- Text elements (`<p>`, `<span>`)
- Lists (`<ul>`, `<ol>`, `<li>`)
- Interactive elements (`<button>`)
- Other semantic elements (`<blockquote>`, `<cite>`, `<address>`, `<time>`, `<mark>`, `<small>`, `<strong>`, `<em>`, `<b>`, `<i>`)
- Code elements (`<code>`, `<pre>`)

**What it suggests:**

- `div` element replacements with appropriate Tailwind classes
- Modus Web Components for interactive elements (e.g., `<ModusWcButton>`)
- Consistent styling patterns

**Usage:**

```bash
npm run lint:semantic
```

### 5. Border Violations Compliance (`check-border-violations.js`)

**Purpose**: Detects incorrect border patterns that violate Tailwind 3 + Modus design system rules.

**What it detects:**

- Border classes with Tailwind color classes (`border-red-500`, `border-gray-300`, etc.)
- Border classes with hardcoded hex colors
- Directional borders with Tailwind colors (`border-t-red-500`, etc.)

**What it suggests:**

- Border utility classes: `border-default`, `border-thick`, `border-dashed`
- Design system colors: `var(--border)` from your design system
- Specific side borders: `border-top-default`, `border-bottom-default`, `border-left-default`, `border-right-default`

**Usage:**

```bash
npm run lint:borders
```

## Comprehensive Linting

Run all linting checks at once:

```bash
# Run all design system compliance checks
npm run type-check && npm run lint:styles && npm run lint:colors && npm run lint:icons && npm run lint:semantic && npm run lint:borders
```

## Pre-commit Integration

All scripts run automatically before each commit via pre-commit hooks to ensure design system consistency:

```bash
# Automatic check on commit (pre-commit hook)
git commit -m "your changes"
```

### 7. Opacity Utilities (`check-opacity-utilities.js`)

**Purpose**: Validates opacity usage with design system colors to ensure custom opacity utilities are used instead of Tailwind's `/80` syntax.

**What it checks:**

- Tailwind opacity syntax with design system colors (e.g., `text-foreground/80`)
- Suggests custom opacity utilities (e.g., `text-foreground-80`)
- Validates all opacity levels: 20, 40, 60, 80
- Checks text, background, and border opacity usage

**Usage:**

```bash
npm run lint:opacity
```

**Success Output:**

```
🔍 Checking for Tailwind opacity syntax violations...

✅ No Tailwind opacity syntax violations found!
All design system colors are using custom opacity utilities.
```

**Error Output:**

```
❌ Found 3 Tailwind opacity syntax violations:

📁 src/pages/HomePage.tsx
  src/pages/HomePage.tsx:43:38
  Found Tailwind opacity syntax: text-foreground/80
  Use custom opacity utility: text-foreground-80
  Tailwind /80 syntax doesn't work with CSS variables. Use our custom opacity utilities instead.

📁 src/components/Card.tsx
  src/components/Card.tsx:15:23
  Found Tailwind opacity syntax: bg-primary/60
  Use custom opacity utility: bg-primary-60
  Tailwind /60 syntax doesn't work with CSS variables. Use our custom opacity utilities instead.
```

**Key Features:**

- Detects Tailwind opacity syntax with design system colors
- Provides specific suggestions for each violation
- Supports all design system color combinations
- Explains why the syntax doesn't work
- Integrates with existing lint suite

### 8. Icon Names Validation (`check-icon-names.js`)

**Purpose**: Validates that all Modus icon names used in the codebase are correct and exist in the official Modus Icons list.

**What it checks:**

- ModusIcon component usage with invalid icon names
- Direct icon class usage with invalid names
- Icon names in string literals and template literals
- Provides suggestions for similar/partial matches
- Validates against complete official icon list (710+ icons)

**Usage:**

```bash
npm run lint:icon-names
```

**Success Output:**

```
🔍 Validating Modus icon names...

✅ All Modus icon names are valid!
Found 710 valid Modus icons across 25 categories.
```

**Error Output:**

```
❌ Found 3 invalid Modus icon names:

📁 src/components/MyComponent.tsx
  src/components/MyComponent.tsx:15:19
  Invalid Modus icon name: visibility
  Similar icons: visibility_off, visibility_on, visibility_part_outline
  The icon "visibility" is not found in the official Modus Icons list.

📁 src/pages/Dashboard.tsx
  src/pages/Dashboard.tsx:22:13
  Invalid Modus icon name: more_vert
  Similar icons: more_vertical
  The icon "more_vert" is not found in the official Modus Icons list.
```

**Key Features:**

- Validates against complete official Modus Icons list
- Provides intelligent suggestions using Levenshtein distance
- Supports multiple icon usage patterns
- Shows icon categories and counts
- Integrates with existing lint suite
- Helps prevent typos and invalid icon names

## Pre-commit Integration

The pre-commit hooks will:

1. ✅ Run TypeScript type checking for type safety
2. ✅ Check for inline styles that should use Tailwind classes
3. ✅ Verify only approved Modus colors are used
4. ✅ Ensure only Modus Icons are used
5. ✅ Confirm semantic HTML elements are replaced with div elements
6. ✅ Detect border violations (Tailwind color classes in borders)
7. ✅ Validate opacity utilities usage
8. ✅ Validate Modus icon names are correct

## Modus Color System (9 Colors Only)

### Base Colors (5 total):

1. **Base Page**: `var(--modus-wc-color-base-page)` - #fff (light) / #000 (dark)
2. **Base 100**: `var(--modus-wc-color-base-100)` - #f1f1f6 (light) / #252a2e (dark)
3. **Base 200**: `var(--modus-wc-color-base-200)` - #cbcdd6 (light) / #464b52 (dark)
4. **Base 300**: `var(--modus-wc-color-base-300)` - #b7b9c3 (light) / #353a40 (dark)
5. **Base Content**: `var(--modus-wc-color-base-content)` - #171c1e (light) / #cbcdd6 (dark)

### Semantic Colors (4 total - same in both themes):

6. **Info**: `var(--modus-wc-color-info)` - #0063a3
7. **Success**: `var(--modus-wc-color-success)` - #1e8a44
8. **Error**: `var(--modus-wc-color-error)` - #da212c
9. **Warning**: `var(--modus-wc-color-warning)` - #fbad26

### Component Props:

- **Buttons**: `primary`, `secondary`, `tertiary`, `warning`, `danger`
- **Alerts**: `info`, `success`, `warning`, `error`

**Note**: `primary`, `secondary`, `tertiary`, and `danger` are component-specific color props that map to the CSS variables internally.
