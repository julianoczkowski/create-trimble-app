# Modus Angular Boilerplate

![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Modus](https://img.shields.io/badge/Modus-2.0-00A3E0)

A production-ready Angular 20 boilerplate with **Trimble Modus Design System** integration, featuring 47 wrapped components, comprehensive dev tools, and enforced design system compliance.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
open http://localhost:4200
```

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> to open the **Dev Panel** and explore components, themes, and icons.

---

## What's Included

| Feature                   | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **47 Wrapper Components** | Angular wrappers for all Modus Web Components with signal-based APIs                   |
| **46 Component Demos**    | Interactive demos organized by category (Forms, Layout, Navigation, Display, Feedback, Overlays, Data) |
| **Dev Panel**             | Floating panel with theme switcher, color palette, icon browser, and component gallery |
| **8 Lint Scripts**        | Automated design system compliance checking (colors, icons, borders, opacity, styles)  |
| **52 AI Rules**           | Cursor/Copilot rules for guided development with Modus patterns                        |
| **6 Themes**              | Classic, Modern, and Connect themes in light/dark variants                             |
| **Pre-commit Hooks**      | Automatic linting on every commit via Husky                                            |

---

## Tech Stack

| Technology             | Version    | Package                                   |
| ---------------------- | ---------- | ----------------------------------------- |
| Angular                | 20.3.0     | `@angular/core`                           |
| Modus Web Components   | 1.0.6      | `@trimble-oss/moduswebcomponents`         |
| Modus Angular Wrappers | 1.0.6-ng19 | `@trimble-oss/moduswebcomponents-angular` |
| Modus Icons            | 1.18.0     | `@trimble-oss/modus-icons`                |
| Tailwind CSS           | 4.1.16     | `tailwindcss`                             |
| TypeScript             | 5.9.2      | `typescript`                              |

---

## Project Structure

```
src/app/
├── pages/                 # Your application pages (START HERE)
│   └── home/              # Home page - edit to build your app
├── components/            # 47 Modus wrapper components (use as-is)
├── demos/                 # 46 component demos (reference only)
│   ├── forms/             # Button, Checkbox, Input, Select, Slider...
│   ├── layout/            # Accordion, Card, Handle, Panel, Toolbar...
│   ├── navigation/        # Breadcrumbs, Menu, Navbar, Tabs, Stepper...
│   ├── display/           # Avatar, Badge, Icon, Logo, Theme Switcher...
│   ├── feedback/          # Alert, Loader, Progress, Skeleton, Toast...
│   ├── overlays/          # Modal
│   └── data/              # Table
├── dev/                   # Dev Panel infrastructure
│   ├── dev-panel/         # Floating panel UI
│   └── theme-switcher-dropdown/
├── dev-pages/             # Reference pages (dev only)
│   ├── color-palette/     # Design system colors
│   ├── icons/             # 700+ icons browser
│   └── components-gallery/
├── services/              # Theme service with localStorage persistence
└── data/                  # Shared data (icons list, etc.)
```

### Where to Build Your App

| Directory             | Action    | Description                     |
| --------------------- | --------- | ------------------------------- |
| `src/app/pages/`      | **WRITE** | Add your application pages here |
| `src/app/components/` | READ      | Use wrapper components as-is    |
| `src/app/demos/`      | READ      | Reference for component usage   |

---

## Dev Panel

Toggle with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> on Mac)

### Features

| Tab            | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| **Themes**     | Switch between 6 Modus themes (Classic/Modern/Connect, Light/Dark) |
| **Colors**     | View the 9-color design system palette with CSS variables          |
| **Icons**      | Browse 700+ Modus icons with click-to-copy functionality           |
| **Components** | Gallery of all 47 wrapped components                               |
| **Demos**      | 46 interactive component demos                                     |

### Dev Routes

| Route             | Description                |
| ----------------- | -------------------------- |
| `/dev/colors`     | Color palette reference    |
| `/dev/icons`      | Icon library browser       |
| `/dev/components` | Component gallery          |
| `/dev/demos/*`    | Individual component demos |

> **Note:** Dev Panel and dev routes are automatically excluded from production builds.

---

## Available Components

### Forms (17)

| Component      | Selector                 | Description              |
| -------------- | ------------------------ | ------------------------ |
| Autocomplete   | `<modus-autocomplete>`   | Search with suggestions  |
| Button         | `<modus-button>`         | Action buttons           |
| Button Group   | `<modus-button-group>`   | Grouped buttons          |
| Checkbox       | `<modus-checkbox>`       | Checkbox inputs          |
| Date           | `<modus-date>`           | Date picker              |
| File Dropzone  | `<modus-file-dropzone>`  | File upload area         |
| Input Feedback | `<modus-input-feedback>` | Form validation messages |
| Input Label    | `<modus-input-label>`    | Form labels              |
| Number Input   | `<modus-number-input>`   | Numeric inputs           |
| Radio          | `<modus-radio>`          | Radio buttons            |
| Rating         | `<modus-rating>`         | Star ratings             |
| Select         | `<modus-select>`         | Select dropdowns         |
| Slider         | `<modus-slider>`         | Range sliders            |
| Switch         | `<modus-switch>`         | Toggle switches          |
| Text Input     | `<modus-text-input>`     | Text fields              |
| Textarea       | `<modus-textarea>`       | Multi-line text          |
| Time Input     | `<modus-time-input>`     | Time picker              |

### Layout (6)

| Component     | Selector                | Description          |
| ------------- | ----------------------- | -------------------- |
| Accordion     | `<modus-accordion>`     | Collapsible sections |
| Card          | `<modus-card>`          | Content cards        |
| Handle        | `<modus-handle>`        | Resize handles       |
| Panel         | `<modus-panel>`         | Content panels       |
| Toolbar       | `<modus-toolbar>`       | Action toolbars      |
| Utility Panel | `<modus-utility-panel>` | Slide-out panels     |

### Navigation (8)

| Component       | Selector                  | Description          |
| --------------- | ------------------------- | -------------------- |
| Breadcrumbs     | `<modus-breadcrumbs>`     | Navigation trail     |
| Dropdown Menu   | `<modus-dropdown-menu>`   | Dropdown selections  |
| Menu            | `<modus-menu>`            | Dropdown menus       |
| Navbar          | `<modus-navbar>`          | Top navigation bar   |
| Pagination      | `<modus-pagination>`      | Page navigation      |
| Side Navigation | `<modus-side-navigation>` | Sidebar navigation   |
| Stepper         | `<modus-stepper>`         | Multi-step flow      |
| Tabs            | `<modus-tabs>`            | Tabbed content       |

### Display (6)

| Component      | Selector                 | Description                        |
| -------------- | ------------------------ | ---------------------------------- |
| Avatar         | `<modus-avatar>`         | User avatar with image or initials |
| Badge          | `<modus-badge>`          | Status indicators and counters     |
| Chip           | `<modus-chip>`           | Tags and filter chips              |
| Icon           | `<modus-icon>`           | 700+ Modus icons                   |
| Logo           | `<modus-logo>`           | Trimble logo variants              |
| Theme Switcher | `<modus-theme-switcher>` | Theme selection                    |

### Feedback (6)

| Component | Selector            | Description                |
| --------- | ------------------- | -------------------------- |
| Alert     | `<modus-alert>`     | Notifications and messages |
| Loader    | `<modus-loader>`    | Loading spinners           |
| Progress  | `<modus-progress>`  | Progress bars              |
| Skeleton  | `<modus-skeleton>`  | Loading placeholders       |
| Toast     | `<modus-toast>`     | Temporary notifications    |
| Tooltip   | `<modus-tooltip>`   | Hover tooltips             |

### Overlays (1)

| Component | Selector        | Description    |
| --------- | --------------- | -------------- |
| Modal     | `<modus-modal>` | Dialog windows |

### Data (1)

| Component | Selector        | Description |
| --------- | --------------- | ----------- |
| Table     | `<modus-table>` | Data tables |

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
| Error   | `bg-error` / `text-error`     | Error states                 |

### Usage Example

```html
<!-- Correct: Design system colors -->
<div class="bg-background text-foreground p-4">
  <div class="bg-card rounded-lg p-4 border-default">
    <div class="text-primary font-semibold">Title</div>
    <div class="text-muted-foreground">Description</div>
  </div>
</div>

<!-- Wrong: Generic Tailwind colors (will fail lint) -->
<div class="bg-gray-100 text-gray-900"></div>
```

### Opacity Utilities

Use custom opacity classes instead of Tailwind's `/80` syntax:

```html
<!-- Correct -->
<div class="text-foreground-80">80% opacity text</div>

<!-- Wrong (doesn't work with CSS variables) -->
<div class="text-foreground/80"></div>
```

---

## Commands

### Development

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Start dev server on `localhost:4200` |
| `npm run build` | Production build to `dist/`          |
| `npm test`      | Run unit tests with Vitest           |
| `npm run watch` | Build with watch mode                |

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

### Pre-commit Hooks

All lint commands run automatically on `git commit` via Husky. Commits are blocked if any check fails.

---

## Getting Started

### 1. Build Your App

Edit `src/app/pages/home/home.component.ts` to start building:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModusButtonComponent } from '@/app/components';

@Component({
  selector: 'app-home',
  imports: [ModusButtonComponent],
  template: `
    <div class="bg-background text-foreground p-8">
      <div class="text-2xl font-bold mb-4">My App</div>
      <modus-button color="primary" (buttonClick)="handleClick()"> Get Started </modus-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

### 2. Use Components

Import from `@/app/components`:

```typescript
import {
  ModusButtonComponent,
  ModusAlertComponent,
  ModusIconComponent,
  ModusCardComponent,
} from '@/app/components';
```

### 3. Test All Themes

Use the Dev Panel (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>) to test your UI in all 6 themes:

- Modus Classic Light / Dark
- Modus Modern Light / Dark
- Connect Light / Dark

---

## Deployment

### AWS Amplify

Pre-configured `amplify.yml` included:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist/modus-angular-app/browser
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**Important:** Configure rewrite rules in Amplify Console for Angular routing:

| Source | Target        | Type          |
| ------ | ------------- | ------------- |
| `/<*>` | `/index.html` | 200 (Rewrite) |

---

## AI-Powered Development

### Cursor/Copilot Rules

52 development rules in `.cursor/rules/` covering:

- Component patterns and state management
- Design system compliance
- Angular 20 best practices
- Known issues and workarounds

### AGENTS.MD

Comprehensive guide for AI agents in `AGENTS.MD`:

- Commands reference
- Design system rules
- Critical bug fixes
- Boundaries (Always/Ask/Never)

### MCP Servers

Pre-configured Model Context Protocol servers:

| Server       | Purpose                            |
| ------------ | ---------------------------------- |
| `modus-docs` | Modus component documentation      |
| `context7`   | Angular, Tailwind, dependency docs |

---

## Angular 20 Patterns

This boilerplate uses modern Angular patterns:

```typescript
// Signal-based inputs (not @Input decorator)
readonly color = input<ButtonColor>('primary');

// Signal-based outputs (not @Output decorator)
readonly buttonClick = output<MouseEvent>();

// inject() for DI (not constructor)
private readonly service = inject(MyService);

// Modern control flow (not *ngIf/*ngFor)
@if (isVisible()) {
  <div>Content</div>
}
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}

// OnPush change detection (required)
changeDetection: ChangeDetectionStrategy.OnPush
```

---

## Resources

| Resource                                                                                                                  | Description                      |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [Modus 2 Web Components](https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-getting-started--docs) | Official component documentation |
| [Modus Design System](https://modus.trimble.com/)                                                                         | Design guidelines and patterns   |
| [Angular Signals](https://angular.dev/guide/signals)                                                                      | Signal-based reactivity guide    |
| [Tailwind CSS v4](https://tailwindcss.com/docs)                                                                           | Utility-first CSS framework      |

---

## License

MIT
