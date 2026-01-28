# Angular + Modus Web Components - AI Agent Guide

This guide consolidates Angular 20 best practices and Modus Web Components integration patterns for AI agents working on this project.

## Table of Contents

1. [Core Angular Principles](#core-angular-principles)
2. [Modus Web Components Integration](#modus-web-components-integration)
3. [Component Development](#component-development)
4. [TypeScript Standards](#typescript-standards)
5. [Templates and Styling](#templates-and-styling)
6. [State Management](#state-management)
7. [Forms Integration](#forms-integration)
8. [Accessibility](#accessibility)
9. [Testing](#testing)

---

## Core Angular Principles

### Standalone Components

- **Always use standalone components** - Never use `NgModules` for new features
- **Implicit Standalone**: Do NOT explicitly set `standalone: true` in decorators (it's implied by default)

```typescript
// ✅ GOOD
@Component({
  selector: 'app-button',
  imports: [ModusAngularComponentsModule],
  template: `...`
})
export class ButtonComponent {}

// ❌ BAD
@Component({
  standalone: true, // Not needed
  selector: 'app-button',
  // ...
})
```

### Change Detection

- **Always use `OnPush` strategy** for performance optimization

```typescript
@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

### Input/Output Functions

- **Prefer `input()` and `output()`** over `@Input()` and `@Output()` decorators

```typescript
import { input, output } from '@angular/core';

export class ButtonComponent {
  // ✅ NEW - Function syntax
  color = input<ButtonColor>('primary');
  buttonClick = output<void>();

  // ❌ OLD - Decorator syntax (avoid)
  // @Input() color: ButtonColor = 'primary';
  // @Output() buttonClick = new EventEmitter<void>();
}
```

### Dependency Injection

- **Prefer `inject()` function** over constructor injection

```typescript
import { inject } from '@angular/core';

export class MyComponent {
  private myService = inject(MyService);
  private http = inject(HttpClient);
}
```

### Control Flow

- **Use built-in control flow** (`@if`, `@for`, `@switch`) instead of structural directives

```html
<!-- ✅ NEW -->
@if (isVisible) {
  <section>Content</section>
}

@for (item of items; track item.id) {
  <section>{{ item }}</section>
}

<!-- ❌ OLD -->
<section *ngIf="isVisible">Content</section>
<section *ngFor="let item of items">{{ item }}</section>
```

---

## Modus Web Components Integration

### Installation and Setup

**Dependencies:**
```bash
npm install @trimble-oss/moduswebcomponents @trimble-oss/moduswebcomponents-angular@<version>-ng19
```

**CRITICAL**: Lock package versions matching your Angular version (e.g., `ng19` for Angular 20)

**Initialization (main.ts):**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { defineCustomElements } from '@trimble-oss/moduswebcomponents/loader';
import { AppComponent } from './app/app.component';

// Initialize Modus Web Components
defineCustomElements();

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```

**Styles (styles.css):**
```typescript
import '@trimble-oss/moduswebcomponents/modus-wc-styles.css';
```

**Module Import:**
```typescript
import { ModusAngularComponentsModule } from '@trimble-oss/moduswebcomponents-angular';

@Component({
  selector: 'app-root',
  imports: [ModusAngularComponentsModule],
  // ...
})
```

### Wrapping Components

**Always wrap Modus Web Components** to provide:
- Abstraction from library dependency
- Type safety with Angular-native interfaces
- Application-specific customization
- Consistent prop naming
- Future flexibility

**Component Wrapper Pattern:**
```typescript
import { Component, input, output } from '@angular/core';
import { ModusAngularComponentsModule } from '@trimble-oss/moduswebcomponents-angular';

export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
export type ButtonVariant = 'filled' | 'outlined' | 'borderless';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ModusButtonProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  ariaLabel?: string;
}

@Component({
  selector: 'app-modus-button',
  imports: [ModusAngularComponentsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-button
      [color]="color()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (buttonClick)="handleButtonClick()"
    >
      <ng-content></ng-content>
    </modus-wc-button>
  `,
})
export class ModusButtonComponent {
  color = input<ButtonColor>('primary');
  variant = input<ButtonVariant>('filled');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  ariaLabel = input<string | undefined>(undefined);

  buttonClick = output<void>();

  handleButtonClick(): void {
    if (!this.disabled()) {
      this.buttonClick.emit();
    }
  }
}
```

---

## Component Development

### Component Structure

- **Single Responsibility**: Keep components focused on one piece of functionality
- **Inline Templates**: Use inline templates for small components
- **External Templates**: Use external HTML files for larger templates
- **Small Components**: Keep components small and maintainable

### Type Safety

- **Define interfaces** for all component props
- **Export types** for reuse across components
- **Avoid `any`**: Use `unknown` when type is uncertain and handle safely
- **Type inference**: Allow TypeScript to infer types when obvious

```typescript
// ✅ GOOD - Type inference
let name = 'Angular';

// ❌ BAD - Unnecessary type annotation
let name: string = 'Angular';
```

---

## TypeScript Standards

### Strict Type Checking

- Always enable and adhere to strict type checking
- Prefer type inference when types are obvious
- Avoid `any` type unless absolutely necessary
- Use `unknown` for uncertain types and handle safely

### Type Definitions

```typescript
// ✅ GOOD - Proper type definitions
export interface User {
  id: string;
  name: string;
  email?: string; // Optional property
}

// ✅ GOOD - Union types for variants
export type Status = 'pending' | 'active' | 'inactive';

// ❌ BAD - Using any
function process(data: any) { // Avoid
  // ...
}
```

---

## Templates and Styling

### Template Guidelines

- **Keep templates simple** - Avoid complex logic in templates
- **Delegate logic** to component TypeScript code
- **Use `async` pipe** for observables (auto-subscribe/unsubscribe)

### Styling Rules

#### ✅ DO: Use Design System Colors (Tailwind)

```html
<div class="bg-background text-foreground">
  <div class="bg-card text-card-foreground border border-border">
    Content
  </div>
</div>
```

#### ❌ DON'T: Use Generic Tailwind Colors

```html
<!-- DON'T USE -->
<div class="bg-blue-500 text-white border-gray-300">
  Content
</div>
```

#### ❌ DON'T: Use Hardcoded Colors

```html
<!-- DON'T USE -->
<div style="background-color: #ffffff; color: #000000;">
  Content
</div>
```

#### ❌ DON'T: Use ngClass or ngStyle

```html
<!-- ❌ BAD -->
<section [ngClass]="{'active': isActive}"></section>
<section [ngStyle]="{'font-size': fontSize + 'px'}"></section>

<!-- ✅ GOOD -->
<section [class.active]="isActive"></section>
<section [style.font-size.px]="fontSize"></section>
```

### Tailwind Configuration

```typescript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        // ... use design system CSS variables
      },
    },
  },
};
```

---

## State Management

### Signals

- **Use signals** for local component state
- **Use `computed()`** for derived state based on signals
- **Never use `mutate()`** - Use `update()` or `set()` instead

```typescript
import { signal, computed } from '@angular/core';

export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1); // ✅ Use update
    // ❌ Don't use mutate: this.count.mutate(...)
  }
}
```

### Pure Functions

- Ensure state transformations are pure (no side effects)
- Make transformations predictable and testable

---

## Forms Integration

### Reactive Forms

- **Prefer Reactive Forms** over Template-driven forms
- Use `ControlValueAccessor` for form-compatible components
- Create directives for each form component type

### ControlValueAccessor Pattern

```typescript
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: 'modus-wc-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModusSelectDirective),
      multi: true,
    },
  ],
})
export class ModusSelectDirective implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  private _value: any;

  @HostListener('valueChange', ['$event.detail'])
  onValueChange(value: any): void {
    this.value = value;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
      this.onTouched();
      (this.elementRef.nativeElement as any).value = value;
    }
  }

  writeValue(value: any): void {
    if (value !== this._value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    (this.elementRef.nativeElement as any).disabled = isDisabled;
  }
}
```

---

## Event Handling

### Event Binding Pattern

Modus Web Components emit custom events that can be bound using Angular's event binding syntax:

```typescript
// In component template
<modus-wc-button (buttonClick)="handleClick($event)">
  Click Me
</modus-wc-button>

// In component class
handleClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
  console.log('Button clicked', event.detail);
}
```

### Common Events

- `buttonClick` - Button clicks (MouseEvent | KeyboardEvent)
- `valueChange` - Form input changes (CustomEvent<T>)
- `expandedChange` - Accordion/collapse state changes (CustomEvent<boolean>)
- `itemSelect` - Dropdown menu selections (CustomEvent<T>)

### Event Detail Access

```typescript
// Access event detail in template
<modus-wc-select (valueChange)="handleChange($event.detail)">
</modus-wc-select>

// Access in component
handleChange(value: any): void {
  // Handle the change
}
```

---

## Icon Usage

### Modus Icons Integration

Modus icons are loaded via CDN and use the `<i>` element with `modus-icons` class:

```html
<!-- Basic icon -->
<i class="modus-icons">add</i>

<!-- Icon with Tailwind sizing -->
<i class="modus-icons text-sm">settings</i>
<i class="modus-icons text-lg">user</i>

<!-- Icon with design system colors -->
<i class="modus-icons text-primary">check</i>
<i class="modus-icons text-destructive">delete</i>

<!-- Accessible icon -->
<i class="modus-icons" role="img" aria-label="Settings">settings</i>

<!-- Decorative icon (not announced) -->
<i class="modus-icons" aria-hidden="true">chevron-right</i>
```

### Icon Guidelines

- Use **kebab-case** for icon names (e.g., `user-add`, `file-upload`)
- Use Tailwind text utilities for sizing (`text-sm`, `text-base`, `text-lg`, `text-xl`)
- **Never use numeric pixel sizes** like `{24}` in Angular templates
- Never use other icon libraries (Font Awesome, Material Icons, etc.)

---

## Accessibility

### ARIA Labels

- **Always provide `aria-label`** for icon-only buttons
- Use semantic HTML where possible
- Ensure keyboard navigation works
- Test with screen readers

```typescript
// ✅ GOOD - Icon-only button with aria-label
<app-modus-button
  icon="settings"
  iconPosition="only"
  ariaLabel="Open settings"
  (buttonClick)="openSettings()"
></app-modus-button>
```

### Semantic HTML

- Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- Ensure proper heading hierarchy
- Maintain focus management
- Support keyboard-only navigation

---

## Services

### Service Guidelines

- **Single Responsibility**: Design services around one well-defined responsibility
- **`providedIn: 'root'`**: Use for singleton, tree-shakable services
- **Use `inject()`**: Prefer `inject()` function over constructor injection

```typescript
import { injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private http = inject(HttpClient);

  // Service methods
}
```

---

## Testing

### Test Coverage

- Write unit tests for component logic
- Test event handling and form integration
- Test accessibility features
- Test with different themes (light/dark)
- Test reactive forms validation and error states

### Testing Patterns

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModusButtonComponent } from './modus-button.component';

describe('ModusButtonComponent', () => {
  let component: ModusButtonComponent;
  let fixture: ComponentFixture<ModusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModusButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit buttonClick when clicked', () => {
    spyOn(component.buttonClick, 'emit');
    component.handleButtonClick();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
```

---

## Quick Reference Checklist

### Component Creation
- [ ] Use standalone component (implicit, no `standalone: true`)
- [ ] Set `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Use `input()` and `output()` functions (not decorators)
- [ ] Use `inject()` for dependencies (not constructor injection)
- [ ] Wrap Modus Web Components (don't use directly)
- [ ] Define TypeScript interfaces for all props
- [ ] Export types for reuse

### Templates
- [ ] Use built-in control flow (`@if`, `@for`, `@switch`)
- [ ] Avoid `ngClass` and `ngStyle`
- [ ] Use design system Tailwind colors only
- [ ] Use `async` pipe for observables
- [ ] Keep templates simple, delegate logic to component

### Styling
- [ ] Use design system CSS variables via Tailwind
- [ ] Never use generic Tailwind colors (blue-500, etc.)
- [ ] Never use hardcoded colors
- [ ] Use `margin-inline-start/end` for bidirectional support

### State Management
- [ ] Use signals for local state
- [ ] Use `computed()` for derived state
- [ ] Never use `mutate()` on signals
- [ ] Keep transformations pure and predictable

### Forms
- [ ] Prefer Reactive Forms
- [ ] Use `ControlValueAccessor` for form components
- [ ] Test validation and error states

### Accessibility
- [ ] Provide `aria-label` for icon-only buttons
- [ ] Use semantic HTML
- [ ] Ensure keyboard navigation
- [ ] Test with screen readers

### Icons
- [ ] Use Modus icons only (`<i class="modus-icons">icon-name</i>`)
- [ ] Use kebab-case for icon names
- [ ] Use Tailwind text utilities for sizing
- [ ] Never use pixel sizes in templates

---

## References

- [Modus Web Components Documentation](https://modus.trimble.com/components)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)
- [Angular Signals](https://angular.io/guide/signals)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)

---

## Migration Notes

When working with existing code:
1. Convert `@Input()` to `input()` functions
2. Convert `@Output()` to `output()` functions
3. Replace `*ngIf`, `*ngFor` with `@if`, `@for`
4. Replace `[ngClass]` with `[class.*]` bindings
5. Replace `[ngStyle]` with `[style.*]` bindings
6. Replace constructor injection with `inject()` function
7. Add `changeDetection: ChangeDetectionStrategy.OnPush` to all components
8. Remove explicit `standalone: true` from decorators
