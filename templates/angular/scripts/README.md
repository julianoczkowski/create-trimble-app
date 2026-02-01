# Modus Design System Linting Scripts for Angular + Tailwind v4

This directory contains comprehensive linting scripts for enforcing Modus Design System compliance in the Angular + Tailwind v4 codebase. These scripts ensure consistent styling, proper component usage, and adherence to design system standards.

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
🔍 TypeScript Type Check for Angular App

🔍 Running TypeScript type checking...

✅ All TypeScript files are type-safe!
🎯 No type errors found in the codebase.

🎉 Type checking completed successfully!
```

**Error Output:**

```
❌ Found 3 TypeScript errors:

📄 app/components/my.component.ts:
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
- Raw Modus CSS variables (should use design system colors)

**What it suggests:**

- Proper design system Tailwind classes (`bg-background`, `text-foreground`, etc.)
- Design system compliant alternatives
- Links to official documentation

**Usage:**

```bash
npm run lint:colors
```

### 3. Inline Styles Compliance (`check-inline-styles.js`)

**Purpose**: Detects inline styles that should be replaced with Tailwind classes for better maintainability and design system consistency.

**What it detects:**

- Angular style attribute binding (`[style.*]`)
- Regular style attributes (`style=""`)
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
- Dynamic values (template expressions) are allowed

### 4. Icon Usage Compliance (`check-modus-icons.js`)

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

### 5. Border Violations Compliance (`check-border-violations.js`)

**Purpose**: Detects incorrect border patterns that violate Tailwind v4 + Modus design system rules.

**What it detects:**

- Border classes with Tailwind color classes (`border-red-500`, `border-gray-300`, etc.)
- Border classes with hardcoded hex colors
- Directional borders with Tailwind colors (`border-t-red-500`, etc.)
- Inline border styles that should use utility classes

**What it suggests:**

- Border utility classes: `border-default`, `border-thick`, `border-dashed`
- Design system colors: `border-primary`, `border-success`, `border-warning`, `border-error`
- Specific side borders: `border-top-default`, `border-bottom-default`, `border-left-default`, `border-right-default`

**Usage:**

```bash
npm run lint:borders
```

### 6. Opacity Utilities (`check-opacity-utilities.js`)

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

📁 src/app/components/my.component.html
  src/app/components/my.component.html:43:38
  Found Tailwind opacity syntax: text-foreground/80
  Use custom opacity utility: text-foreground-80
  Tailwind /80 syntax doesn't work with CSS variables. Use our custom opacity utilities instead.
```

**Key Features:**

- Detects Tailwind opacity syntax with design system colors
- Provides specific suggestions for each violation
- Supports all design system color combinations
- Explains why the syntax doesn't work
- Integrates with existing lint suite

### 7. Icon Names Validation (`check-icon-names.js`)

**Purpose**: Validates that all Modus icon names used in the codebase are correct and exist in the official Modus Icons list.

**What it checks:**

- `<modus-icon>` component usage with invalid icon names
- Direct icon class usage with invalid names
- Icon names in string literals and template literals
- Provides suggestions for similar/partial matches
- Validates against complete official icon list (700+ icons)

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

📁 src/app/components/my.component.html
  src/app/components/my.component.html:15:19
  Invalid Modus icon name: visibility
  Did you mean: visibility_off, visibility_on, visibility_part_outline
  The icon "visibility" is not found in the official Modus Icons list.
```

**Key Features:**

- Validates against complete official Modus Icons list
- Provides intelligent suggestions using Levenshtein distance
- Supports multiple icon usage patterns (Angular components, direct class usage)
- Shows icon categories and counts
- Integrates with existing lint suite
- Helps prevent typos and invalid icon names

## Comprehensive Linting

Run all linting checks at once:

```bash
# Run all design system compliance checks
npm run lint:all
```

## Pre-commit Integration

All scripts run automatically before each commit via pre-commit hooks to ensure design system consistency:

```bash
# Automatic check on commit (pre-commit hook)
git commit -m "your changes"
```

The pre-commit hooks will:

1. ✅ Run TypeScript type checking for type safety
2. ✅ Check for inline styles that should use Tailwind classes
3. ✅ Verify only approved Modus colors are used
4. ✅ Ensure only Modus Icons are used
5. ✅ Detect border violations (Tailwind color classes in borders)
6. ✅ Validate opacity utilities usage
7. ✅ Validate Modus icon names are correct

## Modus Color System (9 Colors Only)

### Base Colors (5 total):

1. **Background**: `bg-background` → `var(--modus-wc-color-base-page)` - #fff (light) / #000 (dark)
2. **Card**: `bg-card` → `var(--modus-wc-color-base-100)` - #f1f1f6 (light) / #252a2e (dark)
3. **Muted**: `bg-muted` → `var(--modus-wc-color-base-200)` - #cbcdd6 (light) / #464b52 (dark)
4. **Secondary**: `bg-secondary` → `var(--modus-wc-color-base-300)` - #b7b9c3 (light) / #353a40 (dark)
5. **Foreground**: `text-foreground` → `var(--modus-wc-color-base-content)` - #171c1e (light) / #cbcdd6 (dark)

### Status Colors (4 total - same in both themes):

6. **Primary/Info**: `bg-primary` → `var(--modus-wc-color-info)` - #0063a3
7. **Success**: `bg-success` → `var(--modus-wc-color-success)` - #1e8a44
8. **Error**: `bg-error` → `var(--modus-wc-color-error)` - #da212c
9. **Warning**: `bg-warning` → `var(--modus-wc-color-warning)` - #fbad26

### Component Props:

- **Buttons**: `color="primary"`, `color="secondary"`, `color="warning"`, `color="danger"`
- **Alerts**: `type="info"`, `type="success"`, `type="warning"`, `type="error"`

**Note**: All colors are defined locally in `src/styles.css` for LLM context awareness. Use Tailwind classes (`bg-background`, `text-foreground`, etc.) instead of raw Modus CSS variables.

## Angular-Specific Patterns

### Template Syntax

- Use `class=""` instead of `className=""` (React pattern)
- Use `[style.*]` for dynamic styles (only if truly dynamic)
- Use Tailwind classes for static styles
- Use `<modus-icon>` Angular component or `<i class="modus-icons">`

### File Patterns

- Component files: `src/app/**/*.ts`
- Template files: `src/app/**/*.html`
- Styles: `src/**/*.css`, `src/**/*.scss`

### Icon Usage

```html
<!-- ✅ CORRECT: Angular modus-icon component -->
<modus-icon name="add" size="md" [decorative]="true" />

<!-- ✅ CORRECT: Direct icon class -->
<i class="modus-icons text-lg" aria-hidden="true">add</i>

<!-- ❌ WRONG: React syntax -->
<ModusIcon name="add" size="md" decorative />
```

---

## 🪝 Pre-commit Hooks

This project uses **Husky** to automatically run all linting scripts before commits:

### Setup

```bash
# Install dependencies (includes Husky)
npm install

# Husky is automatically initialized via the "prepare" script
```

### What Runs on Pre-commit

The pre-commit hook (`.husky/pre-commit`) runs each linting script individually with clear step messages:

1. **📝 TypeScript Type Check** - `npm run type-check`
2. **🎨 Design System Colors** - `npm run lint:colors`
3. **💅 Inline Styles** - `npm run lint:styles`
4. **🔲 Border Patterns** - `npm run lint:borders`
5. **🌈 Opacity Utilities** - `npm run lint:opacity`
6. **🎨 Modus Icons Usage** - `npm run lint:icons`
7. **🏷️ Icon Names Validation** - `npm run lint:icon-names`

### Behavior

- ✅ **Commit allowed** if all checks pass
- ❌ **Commit blocked** if any check fails
- 📋 **Clear error messages** guide you to fix issues

### Manual Testing

```bash
# Test the pre-commit hook manually
./.husky/pre-commit

# Run individual checks
npm run lint:colors
npm run lint:icons
npm run type-check
```

## 🚀 GitHub Actions CI

The project includes a comprehensive CI workflow (`.github/workflows/ci.yml`) that runs on:
- **Push to main branch**
- **Pull requests to main branch**

### CI Pipeline Steps

1. **🔧 Setup** - Checkout code, setup Node.js 20, install dependencies
2. **📝 Type Checking** - Run TypeScript type validation
3. **🎨 Modus Linting Suite** - Run all design system compliance checks:
   - Color compliance
   - Inline styles validation
   - Border patterns check
   - Opacity utilities validation
   - Modus icons usage validation
   - Icon names validation
4. **🏗️ Build** - Compile the Angular application
5. **🧪 Tests** - Run unit tests (if available)

### Workflow Features

- **✅ Parallel execution** where possible for faster CI
- **🛡️ Quality gates** - Build fails if any check fails
- **📊 Clear reporting** - Each step shows detailed results
- **🔄 Automatic triggers** - Runs on every push and PR

---

**All scripts are updated for Angular + Tailwind v4 and work with the design system defined in `src/styles.css`.**
