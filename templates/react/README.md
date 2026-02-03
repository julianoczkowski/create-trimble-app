# Modus React Boilerplate

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Modus](https://img.shields.io/badge/Modus-2.0-00A3E0)

A production-ready React 19 + Vite boilerplate with **Trimble Modus Design System** integration, featuring 49 wrapped components, comprehensive dev tools, and enforced design system compliance.

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
| **49 Wrapper Components** | React wrappers for all Modus Web Components with TypeScript support                    |
| **48 Component Demos**    | Interactive demos organized by category (Forms, Layout, Navigation, Display, Feedback, Overlays, Data) |
| **Dev Panel**             | Floating panel with theme switcher, color palette, icon browser, and component gallery |
| **8 Lint Scripts**        | Automated design system compliance checking (colors, icons, borders, opacity, styles)  |
| **40+ AI Rules**          | Cursor/Copilot rules for guided development with Modus patterns                        |
| **8 AI Skills**           | Pre-built skills for common Modus development tasks                                    |
| **6 Themes**              | Classic, Modern, and Connect themes in light/dark variants                             |
| **Pre-commit Hooks**      | Automatic linting on every commit via Husky                                            |

---

## Tech Stack

| Technology             | Version       | Package                                  |
| ---------------------- | ------------- | ---------------------------------------- |
| React                  | 19.1.1        | `react`                                  |
| Vite                   | 7.1.7         | `vite`                                   |
| Modus Web Components   | 1.0.6-react19 | `@trimble-oss/moduswebcomponents-react`  |
| Modus Icons            | 1.18.1        | `@trimble-oss/modus-icons`               |
| Tailwind CSS           | 3.4.18        | `tailwindcss`                            |
| TypeScript             | 5.9.3         | `typescript`                             |
| React Router           | 7.9.4         | `react-router-dom`                       |

---

## Project Structure

```
src/
├── pages/                 # Your application pages (START HERE)
│   └── HomePage.tsx       # Home page - edit to build your app
├── components/            # 49 Modus wrapper components (use as-is)
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
├── contexts/              # React contexts (ThemeContext)
├── hooks/                 # Custom React hooks
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
| **Components** | Gallery of all 49 wrapped components                               |
| **Demos**      | 48 interactive component demos                                     |

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

| Component      | Wrapper                | Description              |
| -------------- | ---------------------- | ------------------------ |
| Autocomplete   | `<ModusAutocomplete>`  | Search with suggestions  |
| Button         | `<ModusButton>`        | Action buttons           |
| Button Group   | `<ModusButtonGroup>`   | Grouped buttons          |
| Checkbox       | `<ModusCheckbox>`      | Checkbox inputs          |
| Date           | `<ModusDate>`          | Date picker              |
| File Dropzone  | `<ModusFileDropzone>`  | File upload area         |
| Input Feedback | `<ModusInputFeedback>` | Form validation messages |
| Input Label    | `<ModusInputLabel>`    | Form labels              |
| Number Input   | `<ModusNumberInput>`   | Numeric inputs           |
| Radio          | `<ModusRadio>`         | Radio buttons            |
| Rating         | `<ModusRating>`        | Star ratings             |
| Select         | `<ModusSelect>`        | Select dropdowns         |
| Slider         | `<ModusSlider>`        | Range sliders            |
| Switch         | `<ModusSwitch>`        | Toggle switches          |
| Text Input     | `<ModusTextInput>`     | Text fields              |
| Textarea       | `<ModusTextarea>`      | Multi-line text          |
| Time Input     | `<ModusTimeInput>`     | Time picker              |

### Layout (6)

| Component     | Wrapper               | Description          |
| ------------- | --------------------- | -------------------- |
| Accordion     | `<ModusAccordion>`    | Collapsible sections |
| Card          | `<ModusCard>`         | Content cards        |
| Handle        | `<ModusHandle>`       | Resize handles       |
| Panel         | `<ModusPanel>`        | Content panels       |
| Toolbar       | `<ModusToolbar>`      | Action toolbars      |
| Utility Panel | `<ModusUtilityPanel>` | Slide-out panels     |

### Navigation (8)

| Component       | Wrapper                 | Description          |
| --------------- | ----------------------- | -------------------- |
| Breadcrumbs     | `<ModusBreadcrumbs>`    | Navigation trail     |
| Dropdown Menu   | `<ModusDropdownMenu>`   | Dropdown selections  |
| Menu            | `<ModusMenu>`           | Dropdown menus       |
| Navbar          | `<ModusNavbar>`         | Top navigation bar   |
| Pagination      | `<ModusPagination>`     | Page navigation      |
| Side Navigation | `<ModusSideNavigation>` | Sidebar navigation   |
| Stepper         | `<ModusStepper>`        | Multi-step flow      |
| Tabs            | `<ModusTabs>`           | Tabbed content       |

### Display (6)

| Component      | Wrapper                | Description                        |
| -------------- | ---------------------- | ---------------------------------- |
| Avatar         | `<ModusAvatar>`        | User avatar with image or initials |
| Badge          | `<ModusBadge>`         | Status indicators and counters     |
| Chip           | `<ModusChip>`          | Tags and filter chips              |
| Icon           | `<ModusIcon>`          | 700+ Modus icons                   |
| Logo           | `<ModusLogo>`          | Trimble logo variants              |
| Theme Switcher | `<ModusThemeSwitcher>` | Theme selection                    |

### Feedback (6)

| Component | Wrapper           | Description                |
| --------- | ----------------- | -------------------------- |
| Alert     | `<ModusAlert>`    | Notifications and messages |
| Loader    | `<ModusLoader>`   | Loading spinners           |
| Progress  | `<ModusProgress>` | Progress bars              |
| Skeleton  | `<ModusSkeleton>` | Loading placeholders       |
| Toast     | `<ModusToast>`    | Temporary notifications    |
| Tooltip   | `<ModusTooltip>`  | Hover tooltips             |

### Overlays (1)

| Component | Wrapper        | Description    |
| --------- | -------------- | -------------- |
| Modal     | `<ModusModal>` | Dialog windows |

### Data (1)

| Component | Wrapper        | Description            |
| --------- | -------------- | ---------------------- |
| Table     | `<ModusTable>` | Data tables with sorting |

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

### Usage Example

```tsx
// Correct: Design system colors
<div className="bg-background text-foreground p-4">
  <div className="bg-card rounded-lg p-4 border-default">
    <div className="text-primary font-semibold">Title</div>
    <div className="text-muted-foreground">Description</div>
  </div>
</div>

// Wrong: Generic Tailwind colors (will fail lint)
<div className="bg-gray-100 text-gray-900"></div>
```

### Opacity Utilities

Use custom opacity classes instead of Tailwind's `/80` syntax:

```tsx
// Correct
<div className="text-foreground-80">80% opacity text</div>

// Wrong (doesn't work with CSS variables)
<div className="text-foreground/80"></div>
```

### Border Utilities

Use directional border utilities:

```tsx
// Correct
<div className="border-bottom-default">Bottom border</div>

// Wrong
<div className="border-b border-default"></div>
```

---

## Commands

### Development

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server on `localhost:5173` |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview production build             |
| `npm run lint`    | Run ESLint                           |

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

## Getting Started

### 1. Build Your App

Edit `src/pages/HomePage.tsx` to start building:

```tsx
import { ModusButton } from '@/components';

export default function HomePage() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="bg-background text-foreground p-8">
      <div className="text-2xl font-bold mb-4">My App</div>
      <ModusButton color="primary" onClick={handleClick}>
        Get Started
      </ModusButton>
    </div>
  );
}
```

### 2. Use Components

Import from `@/components`:

```tsx
import {
  ModusButton,
  ModusAlert,
  ModusIcon,
  ModusCard,
} from '@/components';
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
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
customHeaders:
  - pattern: '**/*'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '*.html'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=0, must-revalidate'
```

**Important:** Configure rewrite rules in Amplify Console for React Router:

| Source | Target        | Type          |
| ------ | ------------- | ------------- |
| `/<*>` | `/index.html` | 200 (Rewrite) |

### Static Hosting (Netlify, Vercel, GitHub Pages)

```bash
npm run build
# Deploy the dist/ folder
```

---

## AI-Powered Development

### Cursor/Copilot Rules

40+ development rules in `.cursor/rules/` covering:

- Component patterns and state management
- Design system compliance
- React 19 best practices
- Known issues and workarounds

### AGENTS.MD

Comprehensive guide for AI agents in `AGENTS.MD`:

- Commands reference
- Design system rules
- Critical bug fixes
- Boundaries (Always/Ask/Never)

### AI Skills

8 pre-built skills in `.cursor/skills/`:

| Skill                              | Description                        |
| ---------------------------------- | ---------------------------------- |
| `create-modus-wrapper-component`   | Scaffold new component wrappers    |
| `handle-modus-checkbox-value-bug`  | Handle checkbox value inversion    |
| `implement-modus-modal-with-refs`  | Implement modals with forwardRef   |
| `set-up-modus-event-listeners`     | Set up useEffect event listeners   |
| `integrate-modus-icons`            | Integrate Modus icons correctly    |
| `create-modus-form-component`      | Create form components             |
| `fix-modus-component-event-issues` | Debug event handling problems      |
| `style-modus-components-with-tailwind` | Apply custom utilities         |

### Cursor Commands

AI-powered scaffolding commands in `.cursor/commands/`:

| Command              | Description                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `scaffold-shell-app` | Create a complete app shell with ModusNavbar, ModusSideNavigation, and React Router nested routing    |

**Usage:** Open Cursor IDE, press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux), and run the command. The AI guides you through a conversational setup:

1. Enter your navigation menu labels (e.g., "Dashboard, Projects, Settings")
2. AI creates `AppShell.tsx` layout with navbar and side navigation
3. AI creates placeholder pages for each navigation item
4. AI updates `App.tsx` with nested routing

**Features:**
- SPA navigation (no page reloads)
- Hamburger menu synced with side navigation
- Push mode side nav with icon-only collapsed state
- Preserves all Dev Panel and demo content

### MCP Servers

Pre-configured Model Context Protocol servers:

| Server       | Purpose                            |
| ------------ | ---------------------------------- |
| `modus-docs` | Modus component documentation      |
| `context7`   | React, Tailwind, dependency docs   |

---

## React 19 Patterns

This boilerplate uses modern React patterns:

```tsx
// useRef + useEffect for web component events
const buttonRef = useRef<HTMLModusWcButtonElement>(null);

useEffect(() => {
  const button = buttonRef.current;
  const handleClick = (e: CustomEvent) => {
    console.log('Clicked!', e.detail);
  };

  button?.addEventListener('buttonClick', handleClick);
  return () => button?.removeEventListener('buttonClick', handleClick);
}, []);

// forwardRef for modal control
const ModusModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    open: () => dialog?.showModal(),
    close: () => dialog?.close(),
  }));
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

## Resources

| Resource                                                                                                                  | Description                      |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [Modus 2 Web Components](https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-getting-started--docs) | Official component documentation |
| [Modus Design System](https://modus.trimble.com/)                                                                         | Design guidelines and patterns   |
| [React 19 Documentation](https://react.dev/)                                                                              | React framework guide            |
| [Vite Documentation](https://vitejs.dev/)                                                                                 | Build tool documentation         |
| [Tailwind CSS v3](https://tailwindcss.com/docs)                                                                           | Utility-first CSS framework      |

---

## License

MIT
