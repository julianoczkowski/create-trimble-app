# Demo Page Development Guide

This guide documents best practices, common pitfalls, and fixes applied when creating Angular demo pages for Modus Web Components.

## Table of Contents

1. [What Was Fixed](#what-was-fixed)
2. [What To Do](#what-to-do)
3. [What NOT To Do](#what-not-to-do)
4. [Icon Name Reference](#icon-name-reference)
5. [Component Color Reference](#component-color-reference)
6. [Common Patterns](#common-patterns)

---

## What Was Fixed

### 1. Invalid Modus Icon Names

**Issue**: Using icon names that don't exist in the Modus Icons library.

**Fixed Examples**:
- ❌ `error` → ✅ `alert`
- ❌ `edit` → ✅ `file_edit`
- ❌ `user` → ✅ `user_account`
- ❌ `chevron_down` → ✅ `expand_more`

**Files Fixed**:
- `dropdown-demo-page.component.ts`
- `icon-demo-page.component.ts`
- `input-feedback-demo-page.component.ts`

### 2. Invalid Component Colors

**Issue**: Using color values that don't exist for specific components.

**Fixed Example**:
- ❌ `modus-loader color="danger"` → ✅ `modus-loader color="error"`

**Files Fixed**:
- `loader-demo-page.component.ts`

### 3. Unused Imports

**Issue**: Importing components that are not used in the template.

**Fixed Example**:
- ❌ `ModusButtonComponent` imported but not used in `dropdown-demo-page.component.ts`

**Files Fixed**:
- `dropdown-demo-page.component.ts`

---

## What To Do

### ✅ Always Validate Icon Names

**Before using an icon**, verify it exists in the Modus Icons library:

```bash
# Run the icon name validator
npm run lint:icon-names
```

**Correct Usage**:
```html
<!-- ✅ Valid Modus icon names -->
<modus-icon name="alert" variant="solid" size="lg" />
<modus-icon name="file_edit" variant="outlined" size="md" />
<modus-icon name="user_account" variant="outlined" size="lg" />
<i class="modus-icons text-lg">expand_more</i>
```

### ✅ Use Correct Component Color Types

**Check the component wrapper** for valid color types before using:

```typescript
// ✅ Check modus-loader.component.ts for LoaderColor type
// Valid colors: 'primary' | 'success' | 'warning' | 'error' | undefined
<modus-loader color="error" />
<modus-loader color="success" />
<modus-loader color="primary" />
```

### ✅ Remove Unused Imports

**Always remove unused imports** to keep code clean:

```typescript
// ✅ Clean imports - only what's needed
@Component({
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusDropdownMenuComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
    // ❌ Don't include ModusButtonComponent if not used in template
  ],
})
```

### ✅ Follow Demo Page Structure

**Use the established demo page pattern**:

```typescript
@Component({
  selector: 'app-[component]-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    // Add only Modus components actually used in template
  ],
  template: `
    <demo-page
      title="Modus [Component]"
      description="Clear description of what the component does..."
    >
      <demo-example
        title="Example Title"
        description="Description of this specific example"
      >
        <!-- Demo content here -->
      </demo-example>
    </demo-page>
  `,
})
export class [Component]DemoPageComponent {
  // Add signals and methods only if needed for interactivity
}
```

### ✅ Use Signal-Based State Management

**For interactive examples**, use Angular signals:

```typescript
export class MenuDemoPageComponent {
  readonly selectedItem = signal<string | null>(null);

  handleItemSelect(event: { value: string }): void {
    this.selectedItem.set(event.value);
  }
}
```

### ✅ Organize Demo Links by Category

**Add demo links to `demos-page.component.ts`** in appropriate categories:

- **Layout**: Card, Accordion
- **Navigation**: Breadcrumbs, Dropdown Menu, Menu
- **Form**: Autocomplete, Checkbox, Date, Input Feedback, Input Label
- **Feedback**: Alert, Loader, Modal
- **Display**: Avatar, Badge, Chip, Divider, Icon
- **Actions**: Button

---

## What NOT To Do

### ❌ Don't Use Non-Existent Icon Names

**Common Mistakes**:

```html
<!-- ❌ WRONG: These icons don't exist -->
<modus-icon name="error" />
<modus-icon name="edit" />
<modus-icon name="user" />
<modus-icon name="chevron_down" />
<i class="modus-icons">delete_icon</i>
```

**Why**: Modus Icons library has specific icon names. Always verify icon names exist before using them.

**How to Check**: 
- Run `npm run lint:icon-names`
- Check `data/modusIcons.ts` for valid icon names
- Use similar icon suggestions from lint errors

### ❌ Don't Assume Color Names Are Universal

**Different components have different color types**:

```html
<!-- ❌ WRONG: 'danger' doesn't exist for modus-loader -->
<modus-loader color="danger" />

<!-- ❌ WRONG: Assuming all components use same color names -->
<modus-button color="error" />
```

**Why**: Each component wrapper defines its own color type. Always check the component's TypeScript definition.

**How to Check**:
- Read the component wrapper file (e.g., `modus-loader.component.ts`)
- Check the `LoaderColor` type definition
- Look for valid color values in component documentation

### ❌ Don't Import Unused Components

**Unused imports cause warnings**:

```typescript
// ❌ WRONG: Importing but not using
import { ModusButtonComponent } from '../modus-button.component';

@Component({
  imports: [
    ModusButtonComponent, // ❌ Not used in template
  ],
})
```

**Why**: 
- Creates build warnings
- Increases bundle size unnecessarily
- Makes code harder to maintain

**How to Fix**:
- Remove unused imports
- Only import components actually used in the template
- Angular compiler will warn about unused imports

### ❌ Don't Use Hardcoded Values When Signals Are Better

**For interactive examples**, avoid hardcoded state:

```typescript
// ❌ WRONG: Hardcoded selected state
<modus-menu-item label="Option 1" [selected]="true" />
<modus-menu-item label="Option 2" [selected]="false" />
```

**Better**:
```typescript
// ✅ CORRECT: Dynamic state with signals
readonly selectedItem = signal<string | null>(null);

<modus-menu-item
  label="Option 1"
  [selected]="selectedItem() === 'option1'"
  (itemSelect)="handleItemSelect($event)"
/>
```

### ❌ Don't Skip Route Registration

**Always add routes** for new demo pages:

```typescript
// ✅ CORRECT: Add route in app.routes.ts
{
  path: 'demos/[component-name]',
  loadComponent: () =>
    import('./components/demos/[component]-demo-page.component').then(
      (m) => m.[Component]DemoPageComponent
    ),
}
```

### ❌ Don't Forget to Export Components

**Always export** from `demos/index.ts`:

```typescript
// ✅ CORRECT: Export in index.ts
export * from './[component]-demo-page.component';
```

### ❌ Don't Use Generic Descriptions

**Write clear, specific descriptions**:

```html
<!-- ❌ WRONG: Generic description -->
<demo-page title="Modal" description="Modal component" />

<!-- ✅ CORRECT: Specific, helpful description -->
<demo-page
  title="Modus Modal"
  description="Modals provide focused interactions by overlaying content on top of the current page. Use modals for confirmations, forms, or detailed views that require user attention."
/>
```

---

## Icon Name Reference

### Common Icon Replacements

| ❌ Wrong Name | ✅ Correct Name | Usage |
|--------------|----------------|-------|
| `error` | `alert` | Error/warning states |
| `edit` | `file_edit` | Edit actions |
| `user` | `user_account` | User/profile icons |
| `chevron_down` | `expand_more` | Dropdown indicators |
| `delete_icon` | `delete` | Delete actions |
| `save_icon` | `save_disk` | Save actions |

### How to Find Valid Icons

1. **Run lint check**:
   ```bash
   npm run lint:icon-names
   ```

2. **Check icon data file**:
   ```typescript
   // File: data/modusIcons.ts
   // Contains all 710 valid Modus icons
   ```

3. **Use icon suggestions**: When lint fails, it provides similar icon suggestions

### Icon Naming Convention

- ✅ Use **underscores** (`file_edit`, `user_account`)
- ❌ Don't use **hyphens** (`file-edit`, `user-account`)
- ✅ Lowercase only (`alert`, `check_circle`)
- ❌ Don't use camelCase (`checkCircle`, `userAccount`)

---

## Component Color Reference

### Loader Colors

```typescript
// Valid colors for modus-loader
type LoaderColor = 'primary' | 'success' | 'warning' | 'error' | undefined;
```

**Valid Usage**:
```html
<modus-loader color="primary" />
<modus-loader color="success" />
<modus-loader color="warning" />
<modus-loader color="error" />
```

**Invalid Usage**:
```html
<!-- ❌ 'danger' doesn't exist -->
<modus-loader color="danger" />
```

### Button Colors

```typescript
// Valid colors for modus-button
type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
```

**Note**: Button uses `'danger'`, but Loader uses `'error'`. Each component has its own color type!

### How to Check Component Colors

1. **Read component wrapper**:
   ```typescript
   // File: src/app/components/modus-[component].component.ts
   // Check the color input type definition
   readonly color = input<[Component]Color | undefined>('primary');
   ```

2. **Check TypeScript types**:
   ```typescript
   import type { LoaderColor, ButtonColor } from '@trimble-oss/moduswebcomponents';
   ```

---

## Common Patterns

### Pattern 1: Interactive Demo with Signals

```typescript
export class InteractiveDemoComponent {
  readonly selectedValue = signal<string | null>(null);

  handleChange(event: { value: string }): void {
    this.selectedValue.set(event.value);
  }
}
```

**Template**:
```html
<modus-[component]
  [value]="selectedValue()"
  (change)="handleChange($event)"
/>
@if (selectedValue()) {
  <div class="p-4 bg-muted">
    Selected: {{ selectedValue() }}
  </div>
}
```

### Pattern 2: Multiple Variants Example

```html
<demo-example title="Variants" description="Different visual styles">
  <div class="flex flex-wrap gap-4">
    <modus-[component] variant="variant1">Option 1</modus-[component]>
    <modus-[component] variant="variant2">Option 2</modus-[component]>
    <modus-[component] variant="variant3">Option 3</modus-[component]>
  </div>
</demo-example>
```

### Pattern 3: Size Examples

```html
<demo-example title="Sizes" description="Different sizes">
  <div class="flex flex-wrap items-center gap-4">
    <modus-[component] size="sm">Small</modus-[component]>
    <modus-[component] size="md">Medium</modus-[component]>
    <modus-[component] size="lg">Large</modus-[component]>
  </div>
</demo-example>
```

### Pattern 4: Color Examples

```html
<demo-example title="Colors" description="Different semantic colors">
  <div class="flex flex-wrap gap-4">
    <modus-[component] color="primary">Primary</modus-[component]>
    <modus-[component] color="success">Success</modus-[component]>
    <modus-[component] color="warning">Warning</modus-[component]>
    <modus-[component] color="error">Error</modus-[component]>
  </div>
</demo-example>
```

---

## Checklist for New Demo Pages

Before completing a demo page, verify:

- [ ] All icon names are valid (run `npm run lint:icon-names`)
- [ ] All component colors are valid for that component
- [ ] No unused imports
- [ ] Route added in `app.routes.ts`
- [ ] Demo link added to `demos-page.component.ts`
- [ ] Component exported from `demos/index.ts`
- [ ] All linting passes (`npm run lint:all`)
- [ ] Build succeeds (`npm run build`)
- [ ] Descriptions are clear and helpful
- [ ] Examples demonstrate real-world usage

---

## Quick Reference: Validation Commands

```bash
# Check all linting (including icon names)
npm run lint:all

# Check only icon names
npm run lint:icon-names

# Verify TypeScript compilation
npm run type-check

# Verify build succeeds
npm run build
```

---

## Additional Resources

- **Modus Icons**: `data/modusIcons.ts` - Complete list of 710 valid icons
- **Component Wrappers**: `src/app/components/` - Check for valid prop types
- **Theme Demo**: `src/app/components/theme-demo.component.ts` - Reference examples
- **Existing Demos**: `src/app/components/demos/` - Pattern examples

---

**Last Updated**: Based on fixes applied during demo page creation (November 2025)

