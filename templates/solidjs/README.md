# Modus SolidJS App

![SolidJS](https://img.shields.io/badge/SolidJS-1.9.11-2c4f7c?logo=solid&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Modus](https://img.shields.io/badge/Modus-2.0-00A3E0)

A production-ready SolidJS 1.9.11 + Vite boilerplate with **Trimble Modus Design System** integration, featuring Modus Web Components, comprehensive dev tools, and enforced design system compliance.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:5173
```

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> to open the **Dev Panel** and explore components, themes, and icons.

---

## What's Included

| Feature                   | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Modus Web Components**  | Vanilla Modus components with SolidJS wrappers and TypeScript support                  |
| **48 Component Demos**    | Interactive demos organized by category (Forms, Layout, Navigation, Display, Feedback, Overlays, Data) |
| **Dev Panel**             | Floating panel with theme switcher, color palette, icon browser, and component gallery |
| **8 Lint Scripts**        | Automated design system compliance checking (colors, icons, borders, opacity, styles)    |
| **6 Themes**               | Classic, Modern, and Connect themes in light/dark variants                             |
| **Vitest Testing**        | Unit and component tests with @solidjs/testing-library                                 |
| **Pre-commit Hooks**      | Automatic linting on every commit via Husky                                            |

---

## Tech Stack

| Technology             | Version       | Package                                  |
| ---------------------- | ------------- | ---------------------------------------- |
| SolidJS                | 1.9.11        | `solid-js`                               |
| Vite                   | 7.x           | `vite`                                   |
| Modus Web Components   | 1.0.7         | `@trimble-oss/moduswebcomponents`        |
| Modus Icons            | 1.20.0        | `@trimble-oss/modus-icons`               |
| Tailwind CSS           | 3.4.18        | `tailwindcss`                            |
| TypeScript             | 5.9.3         | `typescript`                             |
| SolidJS Router         | 0.15.4        | `@solidjs/router`                        |
| Vitest                 | 3.0.8         | `vitest`                                 |

---

## Project Structure

```
src/
├── pages/                 # Your application pages (START HERE)
│   └── HomePage.tsx       # Home page - edit to build your app
├── components/            # Modus wrapper components (use as-is)
├── demos/                 # 48 component demos (reference only)
│   ├── button-demo/
│   ├── modal-demo/
│   └── ...
├── dev/                   # Dev Panel infrastructure
│   ├── DevPanel.tsx
│   └── DevPanelProvider.tsx
├── dev-pages/             # Reference pages (dev only)
│   ├── ColorPalettePage.tsx
│   ├── IconsPage.tsx
│   └── ComponentsGalleryPage.tsx
├── contexts/              # SolidJS contexts (ThemeContext)
└── data/                  # Shared data (icons list, etc.)
```

### Where to Build Your App

| Directory         | Action    | Description                     |
| ----------------- | --------- | ------------------------------- |
| `src/pages/`      | **WRITE** | Add your application pages here |
| `src/components/` | READ      | Use wrapper components as-is    |
| `src/demos/`      | READ      | Reference for component usage   |

---

## Dev Panel

Toggle with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> on Mac)

### Features

| Tab            | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| **Themes**     | Switch between 6 Modus themes (Classic/Modern/Connect, Light/Dark) |
| **Colors**     | View the 9-color design system palette with CSS variables          |
| **Icons**      | Browse 700+ Modus icons with click-to-copy functionality           |
| **Components** | Gallery of all wrapped components                                  |
| **Demos**      | 48 interactive component demos                                    |

### Dev Routes

| Route             | Description                |
| ----------------- | -------------------------- |
| `/dev/colors`     | Color palette reference    |
| `/dev/icons`      | Icon library browser       |
| `/dev/components` | Component gallery          |
| `/dev/demos/*`    | Individual component demos |

> **Note:** Dev Panel and dev routes are automatically excluded from production builds.

---

## Available Scripts

### Development

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server on `localhost:5173` |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview production build             |
| `npm run lint`    | Run ESLint                           |

### Testing

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run test`    | Run Vitest tests once          |
| `npm run test:watch` | Vitest watch mode            |

### Linting

| Command                   | Description                  |
| ------------------------- | ---------------------------- |
| `npm run lint:all`        | Run all design system checks |
| `npm run type-check`      | TypeScript validation        |
| `npm run lint:colors`     | Check color compliance       |
| `npm run lint:styles`     | Check for inline styles      |
| `npm run lint:borders`    | Check border patterns        |
| `npm run lint:opacity`    | Check opacity utilities      |
| `npm run lint:icons`      | Check icon library usage     |
| `npm run lint:icon-names` | Validate icon names (700+)   |
| `npm run lint:semantic`   | Check semantic HTML usage    |

### Pre-commit Hooks

All lint commands run automatically on `git commit` via Husky. Commits are blocked if any check fails.

---

## Theme System

6 Modus themes set via `data-theme` on `<html>`:

- **Modus Classic** - Light / Dark
- **Modus Modern** - Light / Dark
- **Connect** - Light / Dark

Use the Dev Panel theme switcher or set programmatically:

```tsx
document.documentElement.setAttribute('data-theme', 'modus-modern-light');
```

---

## Design System

### 9-Color Palette

#### Base Colors

| Color      | Tailwind Class    | Usage              |
| ---------- | ----------------- | ------------------ |
| Background | `bg-background`   | Page backgrounds   |
| Card       | `bg-card`         | Card surfaces      |
| Muted      | `bg-muted`        | Muted backgrounds  |
| Secondary  | `bg-secondary`    | Secondary surfaces |
| Foreground | `text-foreground` | Primary text       |

#### Status Colors

| Color   | Tailwind Class                | Usage                        |
| ------- | ----------------------------- | ---------------------------- |
| Primary | `bg-primary` / `text-primary` | Primary actions, info states |
| Success | `bg-success` / `text-success` | Success states               |
| Warning | `bg-warning` / `text-warning` | Warning states               |
| Error   | `bg-destructive` / `text-destructive` | Error states         |

### Opacity Utilities

Use custom opacity classes instead of Tailwind's `/80` syntax:

```tsx
// Correct
<div class="text-foreground-80">80% opacity text</div>

// Wrong (doesn't work with CSS variables)
<div class="text-foreground/80"></div>
```

### Border Utilities

Use directional border utilities:

```tsx
// Correct
<div class="border-bottom-default">Bottom border</div>

// Wrong
<div class="border-b border-default"></div>
```

---

## SolidJS Patterns

This boilerplate uses SolidJS reactive patterns:

```tsx
// createSignal for state
const [count, setCount] = createSignal(0);

// on:eventName for web component custom events
<ModusWcCheckbox on:inputChange={handleCheckboxChange} />

// onMount/onCleanup for event listeners
onMount(() => {
  const el = ref;
  el?.addEventListener('buttonClick', handleClick);
  onCleanup(() => el?.removeEventListener('buttonClick', handleClick));
});

// Let Modus components manage their own state
<ModusAccordion allowMultiple>
  <ModusAccordionItem header="Section 1">Content</ModusAccordionItem>
</ModusAccordion>
```

### Critical Bug: Checkbox Value Inversion

The `value` property from `inputChange` event is inverted. Always invert:

```tsx
const handleCheckboxChange = (event: CustomEvent) => {
  const actualChecked = !event.detail.value; // MUST invert
};
```

---

## Testing with Vitest

Run tests with Vitest and @solidjs/testing-library:

```bash
npm run test        # Run once
npm run test:watch  # Watch mode
```

---

## Resources

| Resource                                                                                                                  | Description                      |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [Modus 2 Web Components](https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-getting-started--docs) | Official component documentation |
| [Modus Design System](https://modus.trimble.com/)                                                                         | Design guidelines and patterns   |
| [SolidJS Documentation](https://www.solidjs.com/)                                                                        | SolidJS framework guide          |
| [Vite Documentation](https://vitejs.dev/)                                                                                 | Build tool documentation         |
| [Tailwind CSS v3](https://tailwindcss.com/docs)                                                                           | Utility-first CSS framework      |

---

## License

MIT
