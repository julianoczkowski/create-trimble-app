# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React 19 + Vite boilerplate with Modus 2 Web Components integration (Trimble Design System). Uses TypeScript, Tailwind CSS 3, and React Router.

## Commands

```bash
npm run dev          # Start development server (Vite)
npm run build        # Type-check + production build
npm run preview      # Preview production build
npm run lint         # ESLint
npm run lint:all     # All linting (type-check, icons, semantic HTML, colors, styles, borders, opacity, icon names)
npm run lint:colors  # Check for non-Modus color usage
npm run lint:icons   # Validate Modus icon usage
npm run lint:semantic # Check for semantic HTML violations
```

## Architecture

### Dev Panel Architecture

The boilerplate uses a **Dev Panel** architecture that separates demo/reference content from user application code:

- **Pages** (`src/pages/`): Your application pages - start with `HomePage.tsx`
- **Components** (`src/components/`): Reusable Modus wrapper components
- **Dev Panel** (`src/dev/`): Floating panel with demos, colors, icons, theme switcher
- **Demos** (`src/demos/`): 48 component demo pages (dev only)
- **Dev Pages** (`src/dev-pages/`): Reference pages (colors, icons, components gallery)

**Key Features:**
- Toggle Dev Panel with `Ctrl+Shift+D` or floating button
- Dev Panel only renders when `VITE_DEV_PANEL=true` (development mode)
- In production, Dev Panel is automatically excluded
- User's app and demos don't conflict - build your NavBar without interference

**Routes:**
- `/` - Your home page (edit `src/pages/HomePage.tsx`)
- `/dev` - Redirects to `/dev/components`
- `/dev/colors` - Color palette reference
- `/dev/icons` - Icon library browser (5 icons per row, click-to-copy functionality)
- `/dev/components` - Component gallery
- `/dev/demos/*` - Individual component demos
  - `/dev/demos/logo-demo` - Logo showcase (2 columns, larger logos)

Add your routes directly in `src/App.tsx`.

### Component Pattern
- React wrapper components in `src/components/` wrap `@trimble-oss/moduswebcomponents-react` web components
- Use `useRef` + `useEffect` for web component event listeners
- Let Modus components manage their own state (don't control accordion/modal state from React)

### Theme System
- 6 themes: `modus-classic-light`, `modus-classic-dark`, `modus-modern-light`, `modus-modern-dark`, `connect-light`, `connect-dark`
- Set via `data-theme` attribute on `<html>`
- ThemeContext in `src/contexts/ThemeContext.tsx`

### Styling
- Design system colors only: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, etc.
- **Never use** generic Tailwind colors (`bg-blue-500`, `text-gray-600`) or hardcoded hex/RGB
- Custom opacity utilities: `text-foreground-80` (not `text-foreground/80` - CSS vars don't work with Tailwind opacity)
- Border utilities: `border-default`, `border-success`, `border-warning`, `border-destructive`
- **Directional borders**: Use `border-bottom-default`, `border-top-default`, etc. (not `border-b border-default`)

### Modus CSS Variables (9 colors)
Base: `--modus-wc-color-base-page`, `--modus-wc-color-base-100/200/300`, `--modus-wc-color-base-content`
Semantic: `--modus-wc-color-info`, `--modus-wc-color-success`, `--modus-wc-color-error`, `--modus-wc-color-warning`

## Critical Patterns

### Icons
```tsx
<i className="modus-icons">icon_name</i>
// Or use ModusIcon wrapper component
```
Only use Modus icons - no Font Awesome, Material Icons, etc.

### Checkbox Value Inversion Bug
The `value` property from `inputChange` event is inverted. Always invert:
```tsx
const actualChecked = !event.detail.value;
```

### Select Component
Use `ModusDropdownMenu` instead of `ModusSelect` for reliable event handling in React.

### Modal Implementation
Use `forwardRef` pattern with `useImperativeHandle`. Access dialog via `querySelector("dialog")` for `showModal()`/`close()`.

### HTML Elements
Use `<div>` elements only (no `h1`, `p`, `section`, `span`, etc.) to avoid Tailwind CSS conflicts. Exception: `<i>` for icons.

## Don't
- Use emojis in code or UI
- Use semantic HTML elements (div-only approach)
- Control Modus component state from React useState
- Use generic Tailwind colors
- Use other icon libraries
- Use `border-b border-default` - use `border-bottom-default` instead

## Recent Updates

### Dev Panel Header
- Header displays text-only "Dev Panel" title (no icon)
- Uses `border-bottom-default` directional border utility
- Cleaner, simpler appearance

### Icons Page (`/dev/icons`)
- Fixed 5-column grid layout (always 5 icons per row)
- Informational text explaining click-to-copy functionality
- Improved visibility and consistent presentation

### Logo Demo Page (`/dev/demos/logo-demo`)
- Fixed 2-column grid layout (always 2 logos per row)
- Larger logos (80px height, 256px max width)
- Better spacing and visual hierarchy
