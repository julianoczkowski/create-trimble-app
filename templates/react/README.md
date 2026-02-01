<!-- ![Modus React + Vite Boilerplate Hero](readme_assets/hero.png) -->

[![CI](https://github.com/julianoczkowski/modus-react-app/actions/workflows/ci.yml/badge.svg)](https://github.com/julianoczkowski/modus-react-app/actions/workflows/ci.yml)
[![node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Modus React + Vite Boilerplate

A production-ready React 19 + Vite boilerplate/starter template with Modus 2 Web Components integration, featuring TypeScript support, comprehensive component examples, and modern development practices. Perfect for quickly bootstrapping new applications with the Modus Design System.

## Built-in Development Rules

This boilerplate comes with comprehensive development rules and standards to ensure code quality and consistency:

### Always Applied Rules

- **Color Usage** - Enforces the 9 approved Modus colors and prevents hardcoded values
- **Modus Web Components** - Guidelines for proper component implementation with MCP documentation
- **React Component Creation** - Best practices for React 19 component architecture and CSS patterns

### Context-Specific Rules

- **Modus Icons** - Complete icon system with 500+ validated icon names
- **Chrome DevTools Testing** - Browser debugging integration via MCP for implementation testing

> **Location:** All rules are stored in `.cursor/rules/` and automatically guide your development workflow through AI assistants.

<!-- ![Modus React + Vite Boilerplate Teaser](readme_assets/teaser.gif) -->

## AI Development Enhanced

This boilerplate comes pre-configured with powerful AI development tools to supercharge your workflow:

### MCP Servers Included

- **Context7** - Advanced context management for AI assistants
- **Chrome DevTools** - Browser debugging integration via MCP
- **Modus Documentation** - Direct access to complete Modus Web Components documentation through AI

### AI Skills (8 Skills)

Pre-built skills in `.cursor/skills/` for common development tasks:

- **create-modus-wrapper-component** - Scaffold new Modus component wrappers
- **handle-modus-checkbox-value-bug** - Handle the checkbox value inversion bug
- **implement-modus-modal-with-refs** - Implement modals with forwardRef pattern
- **set-up-modus-event-listeners** - Set up proper useEffect event listeners
- **integrate-modus-icons** - Integrate Modus icons correctly
- **create-modus-form-component** - Create form components with validation
- **fix-modus-component-event-issues** - Debug event handling problems
- **style-modus-components-with-tailwind** - Apply custom border/opacity utilities

### Development Rules & Standards

- **Cursor Rules** - 40+ pre-configured development patterns and best practices
- **Code Quality** - Automated linting, formatting, and type checking
- **AI-Optimized Workflow** - Seamless integration with modern AI coding assistants

> **Note:** The `.cursor/` directory contains MCP server configurations, development rules, and AI skills that enhance your AI-assisted development experience.

### GitHub Copilot Integration

This boilerplate includes GitHub Copilot instructions for VS Code and GitHub.com users:

- **Repository Instructions** - Located in `.github/copilot-instructions.md` with condensed development guidelines
- **Path-Specific Instructions** - Five specialized instruction files in `.github/instructions/`:
  - `components.instructions.md` - Wrapper component patterns, event handling
  - `demos.instructions.md` - Demo page structure and examples
  - `pages.instructions.md` - Application page patterns
  - `styles.instructions.md` - Custom CSS utilities and design system
  - `typescript.instructions.md` - TypeScript patterns and event types
- **Auto-Applied** - GitHub Copilot automatically reads these instructions to provide context-aware suggestions

> **Location:** All GitHub Copilot instructions are in `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`

## What's Included

This boilerplate provides a complete foundation for building React applications with Modus Web Components:

- **React 19 + Vite** - Modern framework with SWC for ultra-fast builds and full type safety
- **Modus 2 Web Components** - Complete integration with the latest Modus design system
- **49 Wrapper Components** - Pre-built React wrappers for all Modus components
- **48 Component Demos** - Built-in interactive demos for every component
- **Standard Icon Usage** - Official Modus icon implementation with CDN delivery (500+ icons)
- **Theme Switching** - Support for all 6 Modus themes (Classic/Modern, Light/Dark, Connect)
- **Accessibility** - WCAG 2.1 AA compliant with proper ARIA support
- **Performance Optimized** - Vite's lightning-fast HMR and optimized builds
- **Development Tools** - ESLint, TypeScript, comprehensive linting scripts
- **Production Ready** - Optimized build configuration and deployment setup
- **Dev Panel** - Floating development panel with theme switcher and demo navigation
- **Icon Gallery** - Complete icon showcase with click-to-copy functionality
- **Color Palette** - Visual reference for all 9 design system colors
- **AI Integration** - 40+ Cursor rules, 8 AI skills, and GitHub Copilot instructions

## Figma to Code Integration

![Modus Figma MCP](readme_assets/modus_figma_mcp.png)

If you're working with Figma designs and want AI-assisted coding that understands your design tokens and components, check out the official Modus Figma MCP integration. This powerful tool bridges the gap between design and development by providing direct access to your Figma designs through AI assistants.

**Learn more:** [Modus Figma MCP Integration Guide](https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-modus-figma-mcp-integration-guide--docs)

> **Perfect for:** Design-to-code workflows, maintaining design system consistency, and accelerating development with AI-powered Figma integration.

## Getting Started

![Modus React + Vite Boilerplate Getting Started](readme_assets/getting_started_header.png)

### Prerequisites

- Node.js 20+ (required for React 19 compatibility)
- npm or yarn

### Installation

1. **Clone or use this template:**

   ```bash
   # Clone the repository
   git clone <your-repo-url> my-modus-app
   cd my-modus-app

   # Or use as a template on GitHub
   # Click "Use this template" button
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to your localhost usually it is [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

This boilerplate follows React + Vite best practices with a clean, scalable architecture:

```text
modus-react-app/
├── src/
│   ├── components/         # 49 Modus wrapper components
│   │   ├── ModusButton.tsx
│   │   ├── ModusModal.tsx
│   │   ├── ModusIcon.tsx
│   │   └── ...
│   ├── pages/              # Your application pages
│   │   └── HomePage.tsx    # Start here for your app
│   ├── demos/              # 48 component demo pages (dev only)
│   │   ├── button-demo/
│   │   ├── modal-demo/
│   │   └── ...
│   ├── dev/                # Dev Panel infrastructure
│   │   ├── DevPanel.tsx
│   │   ├── DevPanelProvider.tsx
│   │   └── config.ts
│   ├── dev-pages/          # Reference pages (dev only)
│   │   ├── ColorPalettePage.tsx
│   │   ├── IconsPage.tsx
│   │   └── ComponentsGalleryPage.tsx
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.ts
│   ├── config/             # Configuration files
│   │   └── routes.ts
│   ├── data/               # Static data
│   │   └── modusIcons.ts   # 500+ icon definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and design system
├── scripts/                # Linting and utility scripts
├── docs/                   # Project documentation
├── .cursor/
│   ├── rules/              # 40+ development rules
│   └── skills/             # 8 AI development skills
├── .github/
│   ├── copilot-instructions.md  # GitHub Copilot instructions
│   ├── instructions/       # Path-specific Copilot instructions
│   └── workflows/          # CI/CD workflows
└── public/                 # Public assets
```

> **Dev Panel:** Toggle with `Ctrl+Shift+D` or the floating button. Only renders in development mode.

## Using This Boilerplate

### Customizing for Your Project

1. **Update project information:**

   - Modify `package.json` with your project details
   - Update the app title in `src/App.tsx`
   - Replace demo content in `src/pages/HomePage.tsx` with your application content

2. **Add your components:**

   - Create new components in `src/components/`
   - Add new pages in `src/pages/`
   - Use React Router for navigation

3. **Configure your build:**
   - Modify `vite.config.ts` for your deployment needs
   - Update environment variables as needed
   - Configure additional build optimizations

### Built-in Demos

![Modus Web Components Demo](readme_assets/teaser_comp.gif)

This boilerplate includes 48 comprehensive demo pages showcasing all Modus Web Components:

- **Interactive Component Demos** - Live examples of all 49 Modus components
- **Theme Showcases** - See components across all 6 supported themes
- **Code Examples** - Each demo shows proper usage patterns

Access demos via the Dev Panel or navigate to `/dev/demos/*` routes in development mode.

### Available Modus Components (49 Components)

![Modus Components](readme_assets/modus_comp.png)

This boilerplate includes 49 pre-built wrapper components ready to use:

#### **Form Components (15)**

- **ModusAutocomplete** - Input with suggestions and multi-select
- **ModusButton** - All variants, colors, sizes, and shapes
- **ModusButtonGroup** - Grouped button controls with shared styling
- **ModusCheckbox** - Multiple selection controls (note: value inversion bug)
- **ModusDate** - Date input with validation
- **ModusFileDropzone** - Drag-and-drop file upload area
- **ModusNumberInput** - Numeric input with currency support
- **ModusRadio** - Exclusive choice controls
- **ModusRating** - Star, smiley, heart, and thumb ratings
- **ModusSelect** - Single-select dropdown with dynamic options
- **ModusSlider** - Interactive range inputs
- **ModusSwitch** - Binary toggle controls
- **ModusTextarea** - Multi-line text fields with helper messages
- **ModusTextInput** - Single-line text fields with validation
- **ModusTimeInput** - Time picker with min/max limits

#### **Layout Components (7)**

- **ModusAccordion** - Collapsible content sections
- **ModusCard** - Content containers with headers and actions
- **ModusHandle** - Draggable handle for resizable elements
- **ModusPanel** - Content panel containers
- **ModusSkeleton** - Animated loading placeholders
- **ModusToolbar** - Three-slot layout containers
- **ModusUtilityPanel** - Collapsible side panels

#### **Navigation Components (9)**

- **ModusBreadcrumbs** - Hierarchical navigation trails
- **ModusDropdownMenu** - Contextual menus
- **ModusMenu** - Integrated menu systems
- **ModusMenuItem** - Individual menu item component
- **ModusNavbar** - Full-width application bars
- **ModusPagination** - Page navigation controls
- **ModusSideNavigation** - Collapsible left navigation
- **ModusStepper** - Multi-step workflow indicators
- **ModusTabs** - Tab navigation with icons

#### **Display Components (7)**

- **ModusAvatar** - User profile images
- **ModusBadge** - Status indicators and counters
- **ModusChip** - Compact tags and filters
- **ModusIcon** - Icon system with 500+ validated icons
- **ModusLogo** - Trimble and product logos
- **ModusProgress** - Linear and radial progress indicators
- **ModusTable** - Data tables with sorting and selection

#### **Feedback Components (6)**

- **ModusAlert** - Success, warning, error, and info messages
- **ModusInputFeedback** - Form field feedback
- **ModusInputLabel** - Form control labels
- **ModusLoader** - Visual loading indicators
- **ModusToast** - Transient notifications
- **ModusTooltip** - Contextual helper messages

#### **Overlay Components (1)**

- **ModusModal** - Blocking dialog overlays (use forwardRef pattern)

#### **Theme Components (4)**

- **ModusProvider** - Context provider for Modus components
- **ModusThemeSwitcher** - Theme toggle controls
- **ThemeSwitcherDropdown** - Dropdown theme selector
- **ThemeToggleSimple** - Simple light/dark toggle

## Modus Web Components Integration

### Basic Usage

Always use the wrapper components from `src/components/` instead of the web components directly:

```tsx
import { ModusButton, ModusIcon } from "@/components";

export default function MyComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="flex gap-4">
      {/* Use wrapper components */}
      <ModusButton color="primary" onClick={handleClick}>
        <i className="modus-icons mr-2">save_disk</i>
        Save Changes
      </ModusButton>

      {/* Icon wrapper with accessibility */}
      <ModusIcon
        name="settings"
        size="lg"
        decorative={false}
        ariaLabel="Settings"
      />
    </div>
  );
}
```

> **Important:** Never use `ModusWc*` components directly. The wrapper components handle event listeners, TypeScript types, and common patterns correctly.

### Component Usage Examples

This boilerplate includes comprehensive examples of:

- **Buttons** - All variants, colors, sizes, and shapes
- **Icons** - Complete icon system with standard Modus implementation
- **Alerts** - Success, warning, error, and info messages
- **Theme Switching** - Dynamic theme changes

## Icon System

### Standard Modus Icons

Icons are loaded from the Modus CDN and use the standard `<i class="modus-icons">icon_name</i>` pattern:

```typescript
import "@trimble-oss/modus-icons/dist/field-systems/fonts/modus-icons.css";
```

### Usage Examples

```tsx
import ModusIcon from "./components/ModusIcon";
import type { ModusIconName } from "./types/modus";

export default function IconExamples() {
  const iconName: ModusIconName = "settings";

  return (
    <div>
      {/* Basic icon usage */}
      <i className="modus-icons">settings</i>

      {/* Icon with styling */}
      <i className="modus-icons icon-lg icon-primary">{iconName}</i>

      {/* Using the ModusIcon wrapper */}
      <ModusIcon
        name="settings"
        size="lg"
        decorative={false}
        ariaLabel="Settings"
      />
    </div>
  );
}
```

### Available Icon Categories

The application now includes the complete list of all official Modus icons with full TypeScript support:

- **Actions**: add, edit_combination, delete, save_disk, download, upload, copy_content, refresh, sync
- **Navigation**: arrow_left, arrow_right, arrow_up, arrow_down, chevron_left, chevron_right, home, dashboard, menu, close
- **Interface**: search, filter, settings, launch, more_horizontal, more_vertical, sort, view_grid, view_list
- **Status**: check, check_circle, warning, info, alert, help, cancel_circle
- **Content**: file, folder_open, folder_closed, document, image, video, camera
- **User**: person, people_group, user_account, sign_in, sign_out, lock, lock_open
- **Communication**: email, phone, chat, comment, notifications
- **UI**: palette, brightness, visibility_on, visibility_off, toggle_on, toggle_off

**Total Icons Available**: 500+ official Modus icons with complete TypeScript definitions

## Theme System

### Available Themes

This boilerplate supports **6 themes** total:

#### Standard Modus Themes (4 themes)

- `modus-classic-light` (default)
- `modus-classic-dark`
- `modus-modern-light`
- `modus-modern-dark`

#### Trimble Connect Themes (2 themes)

- `connect-light` - For Trimble Connect Web Applications
- `connect-dark` - For Trimble Connect Web Applications

> **Note:** Connect themes should only be used when building Trimble Connect Web Applications. For general applications, use the standard Modus themes.

### Theme Switching

```typescript
// Programmatic theme switching
const changeTheme = (theme: string) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("modus-theme", theme);
};
```

## TypeScript Support

Full TypeScript support with:

- **Component Props** - Type-safe Modus component properties
- **Event Handlers** - Proper CustomEvent typing with type casting
- **Icon Names** - Validated icon name types
- **Theme Values** - Type-safe theme switching

```typescript
import { ModusButton } from "@/components";
import type { HTMLModusWcButtonElement } from "@trimble-oss/moduswebcomponents-react";

// Event handling with proper types
const handleEvent = (event: Event) => {
  const customEvent = event as CustomEvent<MouseEvent | KeyboardEvent>;
  console.log("Button clicked!", customEvent.detail);
};

// Theme types
type ThemeName =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

// Usage with wrapper components
export default function MyComponent() {
  return (
    <ModusButton color="primary" variant="filled" onClick={handleEvent}>
      Click me
    </ModusButton>
  );
}
```

## Performance Features

### Vite Optimization

- **Lightning-fast HMR** - Instant hot module replacement
- **Code splitting** - Automatic chunking for optimal loading
- **Tree shaking** - Unused code elimination
- **Asset optimization** - Images and fonts are optimized
- **Source maps** - Available for debugging

### Icon Optimization

- **Critical icon preloading** - Essential icons load immediately
- **Lazy loading** - Non-critical icons load on demand
- **Font display optimization** - `font-display: swap` for better performance

### Build Optimization

- **SWC compilation** - Ultra-fast TypeScript and JSX compilation
- **ESBuild** - Lightning-fast bundling
- **Rollup** - Optimized production builds
- **Source maps** - Available for debugging

## Browser Support

- **Modern browsers** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile support** - iOS Safari 14+, Chrome Mobile 90+
- **Accessibility** - Screen readers and assistive technologies
- **High contrast** - Windows high contrast mode support

## Development Scripts

```bash
# Development server with Vite
npm run dev

# Type checking
npm run type-check

# Production build
npm run build

# Preview production build
npm run preview

# Check for non-Modus color usage
npm run lint:colors

# Check for border violations
npm run lint:borders

# Run all linting checks
npm run lint:all
```

## Dev Panel Features

The boilerplate includes a floating Dev Panel (development mode only) with:

- **Theme Switcher** - Switch between all 6 Modus themes
- **Icon Gallery** - Browse 500+ icons with click-to-copy (5 icons per row)
- **Color Palette** - View all 9 design system colors with values
- **Component Gallery** - Browse all 49 available components
- **Component Demos** - 48 interactive demos for all components
- **Logo Showcase** - View all Trimble and Viewpoint product logos

Toggle the Dev Panel with `Ctrl+Shift+D` or the floating button in the bottom-right corner.

> **Note:** The Dev Panel only renders when `VITE_DEV_PANEL=true` (development mode). It is automatically excluded from production builds.

## Code Quality & Linting

### Modus Color Enforcement

This boilerplate includes comprehensive linting that automatically checks for non-Modus color usage:

- **Detects Tailwind colors** - Flags usage of `red-400`, `blue-500`, etc.
- **Detects hardcoded colors** - Catches hex codes like `#ff0000`, RGB values, and Modus hex values
- **Suggests Modus alternatives** - Provides proper Modus CSS custom properties
- **Runs on commit** - Automatically validates staged files before commit

**Example violations caught:**

```css
/* WRONG - Will be flagged */
.button {
  background-color: red-500; /* Tailwind color */
  color: #f1f1f6; /* Hardcoded Modus hex */
}
.text {
  color: rgb(23, 28, 30); /* RGB equivalent of Modus color */
}

/* CORRECT - Modus usage */
.button {
  background-color: var(--modus-wc-color-error);
  color: var(--modus-wc-color-base-100);
}
.text {
  color: var(--modus-wc-color-base-content);
}
```

**Available Modus Color Variables (9 colors total):**

**Base Colors (5 total):**

- `var(--modus-wc-color-base-page)` - Background: #fff (light) / #000 (dark)
- `var(--modus-wc-color-base-100)` - Light gray: #f1f1f6 (light) / #252a2e (dark)
- `var(--modus-wc-color-base-200)` - Medium gray: #cbcdd6 (light) / #464b52 (dark)
- `var(--modus-wc-color-base-300)` - Dark gray: #b7b9c3 (light) / #353a40 (dark)
- `var(--modus-wc-color-base-content)` - Text: #171c1e (light) / #cbcdd6 (dark)

**Semantic Colors (4 total - same in both themes):**

- `var(--modus-wc-color-info)` - Blue: #0063a3
- `var(--modus-wc-color-success)` - Green: #1e8a44
- `var(--modus-wc-color-error)` - Red: #da212c
- `var(--modus-wc-color-warning)` - Orange: #fbad26

> **Note:** Component props like `primary`, `secondary`, `tertiary`, and `danger` map to these CSS variables internally.

## Deployment

This boilerplate is ready for deployment to various platforms:

### Static Hosting (Netlify, Vercel, GitHub Pages)

```bash
npm run build
# Deploy the dist/ folder
```

## Customization

### Adding New Components

1. **Install additional Modus components** if needed
2. **Add TypeScript definitions** in `src/types/modus.d.ts`
3. **Create wrapper components** in `src/components/`
4. **Add examples** in the demo pages or remove demo content for production

### Custom Styling

Use Modus CSS custom properties for consistent theming:

```css
.custom-component {
  background-color: var(--modus-wc-color-base-100);
  color: var(--modus-wc-color-base-content);
  border: 1px solid var(--modus-wc-color-base-200);
}

/* Status-specific styling */
.success-message {
  color: var(--modus-wc-color-success);
  border-left: 3px solid var(--modus-wc-color-success);
}

.error-message {
  color: var(--modus-wc-color-error);
  border-left: 3px solid var(--modus-wc-color-error);
}
```

### Tailwind CSS Integration

This boilerplate includes Tailwind CSS 3 with design system integration:

```tsx
// Use Tailwind classes with design system colors
<div className="bg-card border-default rounded-lg p-6">
  <div className="text-2xl font-semibold text-foreground">Title</div>
  <div className="text-muted-foreground">Description</div>
</div>

// Use directional border utilities (not border-b border-default)
<div className="border-bottom-default">Bottom border only</div>
<div className="border-top-default">Top border only</div>

// Use custom opacity utilities (not text-foreground/80)
<div className="text-foreground-80">80% opacity text</div>
<div className="text-foreground-60">60% opacity text</div>
```

**Important:**

- Use directional border utilities (`border-bottom-default`, `border-top-default`) instead of `border-b border-default`
- Use opacity utilities (`text-foreground-80`) instead of Tailwind's `/80` syntax (CSS variables don't work with Tailwind opacity modifiers)
- Use `<div>` elements only (no `h1`, `p`, `section`) to avoid Tailwind CSS conflicts

## Troubleshooting

### Icons Not Displaying

1. **Check font loading** - Ensure Modus icons CSS is imported
2. **Verify icon names** - Use only valid Modus icon names
3. **Check network** - CDN may be blocked in some environments

### Components Not Rendering

1. **Verify imports** - Ensure Modus components are imported
2. **Check custom elements** - Vite should recognize `modus-wc-*` tags
3. **Browser support** - Ensure browser supports web components

### Theme Issues

1. **HTML attribute** - Ensure `data-theme` is set on `<html>`
2. **CSS loading order** - Modus styles should load before custom styles
3. **Local storage** - Theme preference should persist across sessions

## Contributing

When contributing to this boilerplate:

1. **Follow React 19 best practices**
2. **Maintain TypeScript strict mode**
3. **Use Modus design tokens**
4. **Test across all themes**
5. **Ensure accessibility compliance**
6. **Update documentation as needed**

## Support & Resources

- [Modus Web Components Documentation](https://trimble-oss.github.io/modus-wc-2.0/main/)
- [Vite Documentation](https://vitejs.dev/)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT License - see LICENSE file for details.

---

## Ready to Build

**Ready to build amazing applications with Modus Design System and React + Vite!**

This boilerplate provides everything you need to get started quickly while following best practices and maintaining high code quality.

---

## Creator

### Made by [Julian Oczkowski](https://github.com/julianoczkowski)

Lead Product Designer bridging UX & Code - Building AI-driven tools, design systems, and digital products

[YouTube](https://www.youtube.com/@julianoczkowski) | [LinkedIn](https://linkedin.com/in/julianoczkowski) | [Website](https://www.julianoczkowski.com)

Created for the Trimble community and developers worldwide
