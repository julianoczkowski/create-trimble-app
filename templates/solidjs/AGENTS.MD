# AGENTS.MD

You are a **Modus 2 Design System specialist** working on a SolidJS 1.9.5 + Vite boilerplate with Trimble's Modus Web Components. You write TypeScript code using Tailwind CSS 3 and @solidjs/router, following strict design system compliance.

## Commands

Run these commands during development:

```bash
npm run dev           # Start development server (Vite)
npm run build         # Production build
npm run lint          # ESLint
npm run lint:all      # All design system checks (run before commits)
npm run test          # Run Vitest tests
npm run test:watch    # Vitest watch mode
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
  components/      # Modus wrapper components (SolidJS wrappers for web components)
  contexts/        # SolidJS contexts (ThemeContext.tsx)
  dev/             # Dev Panel (development only, excluded in production)
  demos/           # 48 component demo pages (development reference)
  dev-pages/       # Reference pages (colors, icons, component gallery)
.cursor/
  rules/           # AI rules
  skills/          # Reusable skill definitions
scripts/           # Lint and validation scripts
```

## Tech Stack

- **SolidJS 1.9.5** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS 3** with design system tokens
- **@trimble-oss/moduswebcomponents** - Modus Web Components (vanilla)
- **@trimble-oss/modus-icons** - Icon library
- **@solidjs/router** for navigation
- **Vitest** + **@solidjs/testing-library** for testing

## Code Style

### Colors - Design System Only

```tsx
// CORRECT: Design system colors
<div class="bg-background text-foreground">
<div class="bg-primary text-primary-foreground">
<div class="bg-destructive text-destructive-foreground">
<div class="bg-success text-muted-foreground">
<div class="hover:bg-primary/90">

// WRONG: Generic Tailwind colors
<div class="bg-blue-500">        // Never use
<div class="text-gray-600">      // Never use
<div style="color: #0063a3">     // Never use
```

### Icons - Modus Icons Only

```tsx
// CORRECT: Modus icons
<i class="modus-icons">settings</i>
<i class="modus-icons">check</i>
<i class="modus-icons">warning</i>

// WRONG: Other icon libraries
<FontAwesomeIcon icon={faCog} />     // Never use
<MdSettings />                        // Never use
```

### HTML Elements - div Only

```tsx
// CORRECT: div-based structure
<div class="text-2xl font-bold">Heading</div>
<div class="text-sm text-muted-foreground">Paragraph text</div>
<div class="flex gap-4">Container</div>

// WRONG: Semantic HTML elements
<h1>Heading</h1>      // Never use
<p>Paragraph</p>     // Never use
<section>Content</section>  // Never use
<span>Inline</span>   // Never use

// EXCEPTION: <i> for icons only
<i class="modus-icons">icon_name</i>
```

### Borders - Directional Utilities

```tsx
// CORRECT: Directional border utilities
<div class="border-bottom-default">
<div class="border-top-default">
<div class="border-default">     // All sides
<div class="border-success">
<div class="border-destructive">

// WRONG: Tailwind border pattern
<div class="border-b border-default">  // Never use this pattern
<div class="border-gray-300">          // Never use generic colors
```

### Opacity - Custom Utilities

```tsx
// CORRECT: Custom opacity utilities
<div class="text-foreground-80">   // 80% opacity
<div class="text-foreground-60">   // 60% opacity
<div class="bg-background-90">     // 90% opacity

// WRONG: Tailwind opacity syntax (doesn't work with CSS vars)
<div class="text-foreground/80">   // Will not work
```

## Critical Patterns

### Checkbox Value Inversion Bug

The `value` property from `inputChange` event is inverted. Always invert:

```tsx
const handleCheckboxChange = (event: CustomEvent) => {
  const actualChecked = !event.detail.value;  // MUST invert
  setChecked(actualChecked);
};
```

### Select Component

Use `ModusDropdownMenu` instead of `ModusSelect` for reliable SolidJS event handling:

```tsx
// CORRECT: ModusDropdownMenu
<ModusDropdownMenu
  options={options}
  onOptionSelected={handleSelect}
/>

// AVOID: ModusSelect has event handling issues in SolidJS
<ModusWcSelect />
```

### Modal Implementation

Use ref pattern for modal control:

```tsx
let containerRef: HTMLDivElement | undefined;

const api = {
  open: () => {
    const dialog = containerRef?.querySelector('dialog');
    dialog?.showModal();
  },
  close: () => {
    const dialog = containerRef?.querySelector('dialog');
    dialog?.close();
  }
};

return (
  <div ref={containerRef}>
    <ModusWcModal {...props} />
  </div>
);
```

### Component State Management

Let Modus components manage their own state:

```tsx
// CORRECT: Let accordion manage its own state
<ModusAccordion allowMultiple>
  <ModusAccordionItem header="Section 1">Content</ModusAccordionItem>
</ModusAccordion>

// WRONG: Controlling state from SolidJS
const [openItem, setOpenItem] = createSignal(null);
<ModusAccordion expandedItems={openItem()}>  // Avoid this pattern
```

### SolidJS Event Handling

Use `on:eventName` for web component custom events:

```tsx
<ModusWcCheckbox on:inputChange={handleCheckboxChange} />
```

Use refs with `onMount`/`onCleanup` for imperative event listeners when needed.

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
- Use Modus icons exclusively (`<i class="modus-icons">`)
- Use `<div>` elements for all content (except `<i>` for icons)
- Use directional border utilities (`border-bottom-default`)
- Use custom opacity utilities (`text-foreground-80`)
- Invert checkbox `value` property in event handlers
- Use refs with `onMount`/`onCleanup` for web component event listeners
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
- Control Modus component state from SolidJS signals
- Commit code with lint violations
- Modify vendor directories or `node_modules`
- Commit secrets, API keys, or `.env` files

## Rules Reference

For detailed patterns and examples, see `.cursor/rules/` if available.

### Design System Rules
- Color system usage
- Icon usage patterns
- Border utilities
- Opacity utilities
- Theme implementation

### Component Rules
- Accordion patterns
- Button group styling
- Checkbox bug handling
- Modal patterns
- Navigation integration
- Dropdown patterns

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
