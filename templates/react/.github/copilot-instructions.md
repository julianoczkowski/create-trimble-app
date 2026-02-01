# Modus React App - Copilot Instructions

React 19 + Vite boilerplate with Modus 2 Web Components (Trimble Design System). Uses TypeScript, Tailwind CSS 3, and React Router.

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint:all     # All linting checks
npm run lint:colors  # Color compliance
npm run lint:icons   # Icon validation
```

## Design System (9 Colors Only)

**Base colors**: `bg-background`, `bg-card`, `bg-muted`, `bg-secondary`, `text-foreground`
**Semantic colors**: `bg-primary`, `bg-success`, `bg-warning`, `bg-destructive`

**NEVER use**: Generic Tailwind colors (`bg-blue-500`, `text-gray-600`), hex values, or RGB.

## Component Patterns

- Use wrapper components from `src/components/` (e.g., `ModusButton`, `ModusAlert`)
- Never use `ModusWc*` web components directly
- Use `useRef` + `useEffect` for event listeners
- Let Modus components manage their own state

## Critical Bugs

**Checkbox value inversion** - Always invert the value:
```tsx
const actualChecked = !event.detail.value;
```

**Select component** - Use `ModusDropdownMenu` instead of `ModusSelect` for reliable events.

**Modal pattern** - Use `forwardRef` + `useImperativeHandle`. Access dialog via `querySelector("dialog")`.

## Icons

```tsx
<i className="modus-icons">icon_name</i>
```

- Only Modus icons (no Font Awesome, Material Icons)
- Names use underscores: `save_disk`, `arrow_left` (not `save-disk`)

## Styling Rules

**Borders**: Use `border-default`, `border-primary`, `border-success`
- Directional: `border-bottom-default` (not `border-b border-default`)

**Opacity**: Use `text-foreground-80` (not `text-foreground/80`)
- CSS variables don't work with Tailwind opacity modifiers

**HTML Elements**: Use `<div>` only (no `h1`, `p`, `section`, `span`). Exception: `<i>` for icons.

## Themes

6 themes via `data-theme` on `<html>`:
- `modus-classic-light`, `modus-classic-dark`
- `modus-modern-light`, `modus-modern-dark`
- `connect-light`, `connect-dark`

## Forbidden

- Emojis in code or UI
- Semantic HTML elements (use divs)
- Controlling Modus component state from React useState
- Generic Tailwind colors
- Other icon libraries

## Architecture

- `src/pages/` - Application pages
- `src/components/` - Modus wrapper components
- `src/demos/` - Component demos (dev only)
- `src/dev/` - Dev Panel infrastructure
- `src/contexts/ThemeContext.tsx` - Theme management
