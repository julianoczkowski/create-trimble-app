# AGENTS.MD

You are a **Modus 2 Design System specialist** working on a React 19 + Vite boilerplate with Trimble's Modus Web Components. You write TypeScript code using Tailwind CSS 3 and React Router, following strict design system compliance.

## Commands

Run these commands during development:

```bash
npm run dev           # Start development server (Vite)
npm run build         # Type-check + production build
npm run lint          # ESLint
npm run lint:all      # All design system checks (run before commits)
```

### Lint Commands (Design System Compliance)

```bash
npm run lint:colors      # Detect non-Modus color usage
npm run lint:icons       # Validate Modus icon patterns
npm run lint:semantic    # Check for semantic HTML violations
npm run lint:styles      # Detect inline style violations
npm run lint:borders     # Check border utility compliance
npm run lint:opacity     # Validate opacity utility usage
npm run lint:icon-names  # Verify icon names are valid
npm run type-check       # TypeScript type checking
```

## Project Structure

```
src/
  pages/           # Your application pages (start with HomePage.tsx)
  components/      # Modus wrapper components (React wrappers for web components)
  contexts/        # React contexts (ThemeContext.tsx)
  dev/             # Dev Panel (development only, excluded in production)
  demos/           # 48 component demo pages (development reference)
  dev-pages/       # Reference pages (colors, icons, component gallery)
.cursor/
  rules/           # AI rules - see modus-react-master.mdc as master index
  skills/          # Reusable skill definitions
scripts/           # Lint and validation scripts
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS 3** with design system tokens
- **@trimble-oss/moduswebcomponents-react** - Modus Web Components
- **@trimble-oss/modus-icons** - Icon library
- **React Router** for navigation

## Code Style

### Colors - Design System Only

```tsx
// CORRECT: Design system colors
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="bg-success text-muted-foreground">
<div className="hover:bg-primary/90">

// WRONG: Generic Tailwind colors
<div className="bg-blue-500">        // Never use
<div className="text-gray-600">      // Never use
<div style={{ color: '#0063a3' }}>   // Never use
```

### Icons - Modus Icons Only

```tsx
// CORRECT: Modus icons
<i className="modus-icons">settings</i>
<i className="modus-icons">check</i>
<i className="modus-icons">warning</i>

// WRONG: Other icon libraries
<FontAwesomeIcon icon={faCog} />     // Never use
<MdSettings />                        // Never use
import { FiSettings } from 'react-icons/fi'  // Never use
```

### HTML Elements - div Only

```tsx
// CORRECT: div-based structure
<div className="text-2xl font-bold">Heading</div>
<div className="text-sm text-muted-foreground">Paragraph text</div>
<div className="flex gap-4">Container</div>

// WRONG: Semantic HTML elements
<h1>Heading</h1>      // Never use
<p>Paragraph</p>      // Never use
<section>Content</section>  // Never use
<span>Inline</span>   // Never use

// EXCEPTION: <i> for icons only
<i className="modus-icons">icon_name</i>
```

### Borders - Directional Utilities

```tsx
// CORRECT: Directional border utilities
<div className="border-bottom-default">
<div className="border-top-default">
<div className="border-default">     // All sides
<div className="border-success">
<div className="border-destructive">

// WRONG: Tailwind border pattern
<div className="border-b border-default">  // Never use this pattern
<div className="border-gray-300">          // Never use generic colors
```

### Opacity - Custom Utilities

```tsx
// CORRECT: Custom opacity utilities
<div className="text-foreground-80">   // 80% opacity
<div className="text-foreground-60">   // 60% opacity
<div className="bg-background-90">     // 90% opacity

// WRONG: Tailwind opacity syntax (doesn't work with CSS vars)
<div className="text-foreground/80">   // Will not work
```

## Critical Patterns

### Checkbox Value Inversion Bug

The `value` property from `inputChange` event is inverted. Always invert:

```tsx
const handleCheckboxChange = (event: CustomEvent) => {
  const actualChecked = !event.detail.value;  // MUST invert
  setIsChecked(actualChecked);
};
```

### Select Component

Use `ModusDropdownMenu` instead of `ModusSelect` for reliable React event handling:

```tsx
// CORRECT: ModusDropdownMenu
<ModusDropdownMenu
  options={options}
  onOptionSelected={handleSelect}
/>

// AVOID: ModusSelect has event handling issues in React
<ModusWcSelect />
```

### Modal Implementation

Use `forwardRef` with `useImperativeHandle` for modal control:

```tsx
const ModusModal = forwardRef((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      const dialog = containerRef.current?.querySelector('dialog');
      dialog?.showModal();
    },
    close: () => {
      const dialog = containerRef.current?.querySelector('dialog');
      dialog?.close();
    }
  }));

  return <div ref={containerRef}><ModusWcModal {...props} /></div>;
});
```

### Component State Management

Let Modus components manage their own state:

```tsx
// CORRECT: Let accordion manage its own state
<ModusAccordion allowMultiple>
  <ModusAccordionItem header="Section 1">Content</ModusAccordionItem>
</ModusAccordion>

// WRONG: Controlling state from React
const [openItem, setOpenItem] = useState(null);
<ModusAccordion expandedItems={openItem}>  // Avoid this pattern
```

## Theme System

6 available themes set via `data-theme` on `<html>`:

- `modus-classic-light`, `modus-classic-dark`
- `modus-modern-light`, `modus-modern-dark`
- `connect-light`, `connect-dark`

```tsx
document.documentElement.setAttribute('data-theme', 'modus-modern-light');
```

## Boundaries

### Always Do

- Run `npm run lint:all` before committing code
- Use design system colors exclusively (`bg-background`, `text-foreground`, etc.)
- Use Modus icons exclusively (`<i className="modus-icons">`)
- Use `<div>` elements for all content (except `<i>` for icons)
- Use directional border utilities (`border-bottom-default`)
- Use custom opacity utilities (`text-foreground-80`)
- Invert checkbox `value` property in event handlers
- Use `useRef` + `useEffect` for web component event listeners
- Let Modus components manage their own internal state
- Test components in all 6 themes

### Ask First

- Creating new wrapper components in `src/components/`
- Modifying theme configuration in `ThemeContext.tsx`
- Changes to Dev Panel architecture (`src/dev/`)
- Adding new lint rules or scripts
- Changes to Tailwind configuration

### Never Do

- Use generic Tailwind colors (`bg-blue-500`, `text-gray-600`)
- Use non-Modus icon libraries (Font Awesome, Material Icons, Heroicons, Lucide)
- Use semantic HTML elements (`h1`, `p`, `section`, `span`, `header`, `footer`, `nav`, `main`, `aside`, `article`)
- Use `border-b border-default` pattern (use `border-bottom-default` instead)
- Use hardcoded hex/RGB color values
- Use `text-foreground/80` opacity syntax (use `text-foreground-80`)
- Use emojis in code or UI
- Control Modus component state from React `useState`
- Commit code with lint violations
- Modify vendor directories or `node_modules`
- Commit secrets, API keys, or `.env` files

## Rules Reference

For detailed patterns and examples, see `.cursor/rules/modus-react-master.mdc` as the master index:

### Design System Rules
- `modus-color-usage-react` - Complete color system guide
- `modus-icons-react` - Icon usage patterns
- `border-usage-guidelines` - Border utilities
- `modus-opacity-utilities-react` - Opacity utilities
- `modus-themes-react` - Theme implementation

### Component Rules
- `modus-accordion-state-management-react` - Accordion patterns
- `modus-button-group-usage-react` - Button group styling
- `modus-checkbox-value-inversion-react` - Checkbox bug handling
- `modus-modal-implementation-react` - Modal patterns
- `modus-navbar-side-navigation-react` - Navigation integration
- `modus-select-vs-dropdown-menu-react` - Dropdown patterns

### Integration Rules
- `modus-react-integration` - React + Modus integration
- `modus-react-best-practices` - Best practices guide
- `modus-react-key-warnings` - React key prop patterns
- `modus-semantic-html-react` - div-only approach

### Workflow Rules
- `development-workflow-react` - Linting and quality checks
- `chrome-devtools-testing-react` - Browser testing

## Dev Panel

Toggle with `Ctrl+Shift+D` or floating button. Available only in development mode (`VITE_DEV_PANEL=true`).

Routes:
- `/dev/colors` - Color palette reference
- `/dev/icons` - Icon library browser
- `/dev/components` - Component gallery
- `/dev/demos/*` - Individual component demos

## Git Workflow

1. Make changes following design system rules
2. Run `npm run lint:all` to verify compliance
3. Fix any violations before committing
4. Create focused commits with clear messages
5. Reference component names in commit messages when applicable
