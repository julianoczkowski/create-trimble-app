# AGENTS.MD - Modus Angular Application

This file provides guidance to AI agents (GitHub Copilot, Claude, Cursor, etc.) when working with this codebase.

## Agent Profile

**Name**: `modus-angular-agent`
**Role**: Angular 20 + Modus Web Components Specialist
**Description**: Expert in building Angular applications with Trimble Modus Design System, Tailwind CSS v4, and strict design system compliance.

## Tech Stack

| Technology | Version | Package |
|------------|---------|---------|
| Angular | 20.3.0 | `@angular/core` |
| Modus Web Components | 1.0.6 | `@trimble-oss/moduswebcomponents` |
| Modus Angular Wrappers | 1.0.6-ng19 | `@trimble-oss/moduswebcomponents-angular` |
| Modus Icons | 1.18.0 | `@trimble-oss/modus-icons` |
| Tailwind CSS | 4.1.16 | `tailwindcss` |
| TypeScript | 5.9.2 | `typescript` |

---

## Commands (Run Frequently)

### Lint Commands (Run Before Committing)

```bash
npm run lint:all        # Run ALL design system compliance checks
npm run type-check      # TypeScript type validation
npm run lint:colors     # Modus 9-color system compliance
npm run lint:styles     # Inline styles validation
npm run lint:borders    # Border pattern violations
npm run lint:opacity    # Opacity utilities validation
npm run lint:icons      # Modus Icons library validation
npm run lint:icon-names # Icon name validation (700+ icons)
```

### Development Commands

```bash
npm start               # Dev server on localhost:4200
npm run build           # Production build
npm test                # Run unit tests with Karma
```

### Pre-commit Hook

All lint commands run automatically on `git commit`. Fix all violations before committing.

---

## File Structure

| Directory | Purpose | Agent Action |
|-----------|---------|--------------|
| `src/app/pages/` | User application pages | WRITE - Build your app here |
| `src/app/components/` | Modus wrapper components | READ ONLY - Use as-is |
| `src/app/demos/` | Component demos | READ - Reference examples |
| `src/app/dev/` | Dev panel infrastructure | READ ONLY |
| `.cursor/rules/` | Detailed development rules | READ - Follow patterns |
| `scripts/` | Lint scripts | READ ONLY |
| `src/styles.css` | Design system definitions | READ - Color reference |

---

## Design System: 9 Colors Only

### Base Colors (5)

| Color | Class | Usage |
|-------|-------|-------|
| Background | `bg-background` | Page background |
| Card | `bg-card` | Card surfaces |
| Muted | `bg-muted` | Muted backgrounds |
| Secondary | `bg-secondary` | Secondary surfaces |
| Foreground | `text-foreground` | Primary text |

### Status Colors (4)

| Color | Class | Usage |
|-------|-------|-------|
| Primary | `bg-primary`, `text-primary` | Primary actions, info |
| Success | `bg-success`, `text-success` | Success states |
| Warning | `bg-warning`, `text-warning` | Warning states |
| Error | `bg-error`, `text-error` | Error states |

### Code Examples

```html
<!-- CORRECT: Design system colors -->
<div class="bg-background text-foreground p-4">
  <div class="bg-card text-foreground border-default rounded-lg">
    <div class="text-primary">Primary action</div>
    <div class="text-muted-foreground">Muted text</div>
  </div>
</div>

<!-- WRONG: Generic Tailwind colors - LINT WILL FAIL -->
<div class="bg-blue-500 text-white">
<div class="bg-gray-100 text-gray-600">
<div style="background-color: #ffffff">
```

---

## Critical Patterns & Bug Fixes

### 1. Checkbox Value Inversion Bug

**Problem**: `modus-wc-checkbox` returns inverted values in `inputChange` event.

```typescript
// CRITICAL: Always invert the value
handleChange(event: CustomEvent<InputEvent>): void {
  const value = (event.target as HTMLModusWcCheckboxElement).value;
  const actualChecked = !value; // INVERT: false means checked, true means unchecked
  this.isChecked.set(actualChecked);
}
```

### 2. Modal Access Pattern

**Use `getElementById` with native HTMLDialogElement API:**

```typescript
// CORRECT: Use getElementById with modalId
openModal(): void {
  const dialog = document.getElementById('my-modal') as HTMLDialogElement | null;
  if (dialog && typeof dialog.showModal === 'function') {
    dialog.showModal();
  }
}

closeModal(): void {
  const dialog = document.getElementById('my-modal') as HTMLDialogElement | null;
  if (dialog && typeof dialog.close === 'function') {
    dialog.close();
  }
}

// WRONG: Don't use querySelector or web component methods
const modal = document.querySelector('modus-wc-modal'); // WRONG
modal.open(); // WRONG - method doesn't exist
```

### 3. Signal Initialization

**Never use IIFE pattern with `signal()`:**

```typescript
// WRONG: Causes TypeScript parsing errors
readonly minDate = signal<string>(() => {
  return new Date().toISOString().split('T')[0];
}());

// CORRECT: Use helper method
private getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}
readonly minDate = signal<string>(this.getTodayDate());

// CORRECT: Simple inline computation
readonly today = signal<string>(new Date().toISOString().split('T')[0]);
```

### 4. Opacity Utilities

**Tailwind `/80` syntax doesn't work with CSS variables:**

```html
<!-- WRONG: Tailwind opacity syntax fails with design system colors -->
<div class="text-foreground/80">
<div class="bg-primary/20">

<!-- CORRECT: Custom opacity utilities -->
<div class="text-foreground-80">
<div class="bg-primary-20">

<!-- Available levels: 20, 40, 60, 80 -->
<div class="text-foreground-80 text-foreground-60 text-foreground-40 text-foreground-20">
```

### 5. Wrapper Component Usage

**Always use Angular wrappers, never web components directly:**

```html
<!-- CORRECT: Use wrapper selectors -->
<modus-button color="primary" (buttonClick)="handleClick($event)">
  Click Me
</modus-button>
<modus-alert alertTitle="Success" variant="success" />
<modus-icon name="add" size="md" />

<!-- WRONG: Never use modus-wc-* in application templates -->
<modus-wc-button color="primary">Click</modus-wc-button>
<modus-wc-alert alert-title="Success"></modus-wc-alert>
```

### 6. Divider Component

**Vertical dividers require `items-stretch` and explicit height:**

```html
<!-- CORRECT: Vertical divider -->
<div class="flex items-stretch gap-4 min-h-[60px]">
  <div>Left</div>
  <modus-divider [orientation]="'vertical'" />
  <div>Right</div>
</div>

<!-- WRONG: Won't render without items-stretch and height -->
<div class="flex items-center gap-4">
  <modus-divider [orientation]="'vertical'" />
</div>
```

---

## Angular 20 Patterns

### Required Patterns

```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush, // REQUIRED
  template: `
    @if (isVisible()) {
      <modus-button [color]="color()" (buttonClick)="handleClick($event)">
        {{ buttonText() }}
      </modus-button>
    }
    @for (item of items(); track item.id) {
      <div>{{ item.name }}</div>
    }
  `,
})
export class ExampleComponent {
  // Signal-based inputs (not @Input decorator)
  readonly color = input<ButtonColor>('primary');
  readonly disabled = input<boolean>(false);

  // Signal-based outputs (not @Output decorator)
  readonly buttonClick = output<MouseEvent>();

  // Writable signals for state
  readonly isVisible = signal(true);
  readonly items = signal<Item[]>([]);

  // Computed for derived state
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  // inject() for DI (not constructor injection)
  private readonly myService = inject(MyService);
}
```

### Forbidden Patterns

```typescript
// WRONG: @Input/@Output decorators
@Input() color: string;
@Output() buttonClick = new EventEmitter();

// WRONG: Constructor injection
constructor(private myService: MyService) {}

// WRONG: *ngIf/*ngFor directives
<div *ngIf="condition">
<div *ngFor="let item of items">

// WRONG: standalone: true (implicit in Angular 20)
@Component({ standalone: true, ... })
```

---

## Boundaries

### Always Do

- Run `npm run lint:all` before committing
- Use wrapper components (`<modus-button>` not `<modus-wc-button>`)
- Use design system colors only (9 colors)
- Use Modus Icons only (`<i class="modus-icons">icon_name</i>`)
- Invert checkbox values from `inputChange` events
- Use `getElementById` for modal access
- Use custom opacity utilities (`-80` not `/80`)
- Use `ChangeDetectionStrategy.OnPush`
- Use `input()`, `output()`, `signal()`, `computed()`
- Use `@if`, `@for`, `@switch` control flow
- Use `inject()` for dependency injection
- Test in all 6 themes (classic/modern, light/dark, connect)

### Ask First

- Creating new wrapper components in `src/app/components/`
- Modifying existing wrapper components
- Changes to `src/styles.css` (design system definitions)
- Changes to lint scripts in `scripts/`
- Adding new dependencies

### Never Do

- Use generic Tailwind colors (`bg-blue-500`, `text-gray-600`)
- Use hardcoded hex colors (`#ffffff`, `#000000`)
- Use inline styles (except truly dynamic values)
- Use other icon libraries (Font Awesome, Material Icons, Heroicons)
- Use semantic HTML (`h1`, `p`, `section`, `header`) - use `div` only
- Use Tailwind opacity syntax (`/80`) with design system colors
- Use web components directly (`modus-wc-*`) in app templates
- Use `@Input()`, `@Output()` decorators
- Use `*ngIf`, `*ngFor` directives
- Use constructor injection
- Skip lint checks before committing
- Commit with lint violations

---

## Icons

### Usage

```html
<!-- Angular component -->
<modus-icon name="add" size="md" />

<!-- Direct class usage -->
<i class="modus-icons">add</i>
<i class="modus-icons text-lg text-primary">save_disk</i>
```

### Naming

- Icon names use **underscores**: `save_disk`, `arrow_left`, `check_circle`
- Run `npm run lint:icon-names` to validate icon names
- 700+ icons available - check `/dev/icons` route for browser

---

## Themes

6 themes supported:
- `modus-classic-light` / `modus-classic-dark`
- `modus-modern-light` / `modus-modern-dark`
- `modus-connect-light` / `modus-connect-dark`

Toggle Dev Panel with `Ctrl+Shift+D` in development mode to test themes.

---

## Reference

For comprehensive patterns, examples, and edge cases:
- **Master Rule**: `.cursor/rules/modus-angular-master.mdc`
- **Essentials**: `.cursor/rules/modus-angular-essentials.mdc`
- **Component Rules**: `.cursor/rules/modus-angular-[component].mdc`
- **Design System**: `.cursor/rules/modus-angular-design-system.mdc`
- **Scripts README**: `scripts/README.md`

---

## Quick Checklist

Before completing any task:

- [ ] `npm run lint:all` passes with 0 violations
- [ ] Using wrapper components only (`<modus-button>` not `<modus-wc-button>`)
- [ ] Using design system colors only (no `bg-blue-500`)
- [ ] Using Modus Icons only (no Font Awesome)
- [ ] Using `div` elements only (no semantic HTML)
- [ ] Using custom opacity utilities (`-80` not `/80`)
- [ ] Using signal-based APIs (`input()`, `output()`, `signal()`)
- [ ] Using modern control flow (`@if`, `@for`)
- [ ] Tested in at least light and dark themes
