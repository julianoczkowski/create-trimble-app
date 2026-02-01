# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 20 showcase application demonstrating Modus Web Components integration. Uses Tailwind CSS v4, strict TypeScript, and comprehensive design system enforcement through custom linting scripts.

## Commands

```bash
# Development
npm start                  # Dev server on localhost:4200
npm run build              # Production build
npm test                   # Run unit tests with Karma

# Linting (all run automatically on pre-commit)
npm run lint:all           # Run all design system compliance checks
npm run type-check         # TypeScript type validation
npm run lint:colors        # Modus color compliance
npm run lint:styles        # Inline styles validation
npm run lint:borders       # Border pattern violations
npm run lint:opacity       # Opacity utilities validation
npm run lint:icons         # Modus Icons library validation
npm run lint:icon-names    # Icon name validation (700+ icons)
```

## Architecture

### Core Technologies
- **Angular 20** with standalone components (no NgModules)
- **Modus Web Components** (`@trimble-oss/moduswebcomponents` + `@trimble-oss/moduswebcomponents-angular`)
- **Tailwind CSS v4** with design system colors only
- **Modus Icons** (`@trimble-oss/modus-icons`)

### Dev Panel Architecture

The boilerplate uses a **Dev Panel** architecture that separates demo/reference content from user application code:

- **Pages** (`src/app/pages/`): Your application pages - start with `home/home.component.ts`
- **Components** (`src/app/components/`): Reusable Modus wrapper components
- **Dev Panel** (`src/app/dev/`): Floating panel with demos, colors, icons, theme switcher
- **Demos** (`src/app/demos/`): 44 component demo pages (dev only)
- **Dev Pages** (`src/app/dev-pages/`): Reference pages (colors, icons, components gallery)

**Key Features:**
- Toggle Dev Panel with `Ctrl+Shift+D` or floating button
- Dev Panel only renders when `devPanel: true` in environment (development mode)
- In production, Dev Panel and dev routes are automatically excluded
- User's app and demos don't conflict - build your app without interference

**Routes:**
- `/` - Your home page (edit `src/app/pages/home/home.component.ts`)
- `/dev` - Redirects to `/dev/components`
- `/dev/colors` - Color palette reference
- `/dev/icons` - Icon library browser (click-to-copy functionality)
- `/dev/components` - Component gallery
- `/dev/demos/*` - Individual component demos

Add your routes directly in `src/app/app.routes.ts`.

### Component Pattern
All Modus Web Components are wrapped in Angular components at `src/app/components/modus-*.component.ts`. Never use Modus Web Components directly in templates - always use the wrapper components.

### File Structure
```
src/app/
├── pages/                    # User application pages
│   └── home/                 # Start here for your app
├── components/               # Modus wrapper components
│   └── modus-*.component.ts  # No changes needed
├── dev/                      # Dev Panel infrastructure
│   ├── dev-panel.service.ts  # State management
│   ├── dev-panel/            # Floating panel UI
│   ├── dev-config.ts         # Navigation config
│   └── theme-switcher-dropdown/
├── dev-pages/                # Reference pages (dev only)
│   ├── color-palette/
│   ├── icons/
│   └── components-gallery/
├── demos/                    # Component demos (dev only)
│   ├── shared/               # Demo utilities
│   └── [component-name]/     # Individual demos
├── data/                     # Shared data
└── services/                 # Application services
```

## Angular 20 Patterns (Required)

```typescript
// Use input()/output() functions, not decorators
color = input<ButtonColor>('primary');
buttonClick = output<void>();

// Use inject() for DI, not constructor
private myService = inject(MyService);

// Always use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})

// Don't set standalone: true (implicit in Angular 20)
```

### Template Control Flow
Use built-in control flow, not structural directives:
```html
@if (condition) { ... }
@for (item of items; track item.id) { ... }
```

## Design System Rules

### Color System (9 Colors Only)
**Base colors**: `bg-background`, `bg-card`, `bg-muted`, `bg-secondary`, `text-foreground`
**Status colors**: `bg-primary`, `bg-success`, `bg-warning`, `bg-error`

Never use generic Tailwind colors (e.g., `blue-500`, `gray-300`) or hardcoded hex values.

### Icons
Use Modus Icons only:
```html
<i class="modus-icons">icon-name</i>
<modus-icon name="icon-name" />
```
Never use Font Awesome, Material Icons, or other icon libraries.

### Opacity with Design System Colors
Use custom utilities, not Tailwind `/` syntax:
```html
<!-- Correct -->
<div class="text-foreground-80">

<!-- Wrong - doesn't work with CSS variables -->
<div class="text-foreground/80">
```

## Key Files

- `src/main.ts` - Modus Web Components initialization via `defineCustomElements()`
- `src/styles.css` - Design system color definitions and Dev Panel animations
- `src/app/app.routes.ts` - Route definitions with conditional dev routes
- `src/app/app.ts` - Main component with DevPanel integration
- `src/environments/` - Environment configs with `devPanel` flag
- `.cursor/rules/` - Detailed development guidelines (12 rule files)
- `AGENTS.MD` - Comprehensive AI agent guide with patterns and examples
