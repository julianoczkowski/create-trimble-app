---
name: create-modus-wrapper-component
description: Scaffold a new Modus wrapper component following established SolidJS patterns with proper TypeScript interfaces, event handling, and cleanup
---

# Create Modus Wrapper Component

Scaffold a new Modus wrapper component following established SolidJS patterns from the codebase.

## When to Use

Use this skill when:
- Creating a new wrapper component for a Modus web component
- You need to integrate a Modus component that doesn't have a wrapper yet
- You want to ensure proper event handling and TypeScript types

## Pattern Overview

All Modus wrapper components in SolidJS follow this structure:

1. **Use vanilla web component** (`<modus-wc-[component]>`) from `@trimble-oss/moduswebcomponents`
2. **Define TypeScript props interface** with JSDoc comments
3. **Use `let ref`** for component reference (callback ref pattern)
4. **Use `createEffect`** for event listeners with proper cleanup
5. **Forward props** to the web component with conditional spreading
6. **Handle events** via event listeners, not SolidJS props

## Reference Examples

- **Simple wrapper**: `src/components/ModusButton.tsx` - No event listeners needed
- **With event listeners**: `src/components/ModusCheckbox.tsx` - Shows event handling pattern
- **With dropdown**: `src/components/ModusDropdownMenu.tsx` - Shows menu event handling

## Implementation Template

```tsx
import { createEffect } from "solid-js";
import type { Component } from "solid-js";

export interface Modus[ComponentName]Props {
  /** Description of prop */
  propName?: string;

  /** A callback function to handle events. */
  onEventName?: (event: CustomEvent<EventDetailType>) => void;

  /** A custom CSS class to apply to the component. */
  customClass?: string;

  /** The ARIA label for accessibility. */
  "aria-label"?: string;
}

/**
 * Renders a Modus [component name] component.
 *
 * @example
 * // Basic usage
 * <Modus[ComponentName] propName="value" />
 *
 * @example
 * // With event handler
 * <Modus[ComponentName]
 *   propName="value"
 *   onEventName={(event) => console.log(event.detail)}
 * />
 */
const Modus[ComponentName]: Component<Modus[ComponentName]Props> = (props) => {
  let componentEl: HTMLModusWc[ComponentName]Element | undefined;

  createEffect(() => {
    const component = componentEl;
    if (!component) return;

    const handleEventName = (event: Event) => {
      props.onEventName?.(event as CustomEvent<EventDetailType>);
    };

    if (props.onEventName) {
      component.addEventListener("eventName", handleEventName);
    }

    return () => {
      if (props.onEventName) {
        component.removeEventListener("eventName", handleEventName);
      }
    };
  });

  return (
    <modus-wc-[component-name]
      ref={(el) => (componentEl = el)}
      prop-name={props.propName}
      custom-class={props.customClass}
      aria-label={props["aria-label"]}
    />
  );
};

export default Modus[ComponentName];
```

## Key Patterns

### 1. Conditional Prop Spreading

For optional props that shouldn't be passed when undefined:

```tsx
// ✅ CORRECT: Conditional spreading
<modus-wc-component
  {...(props.color && { color: props.color })}
  {...(props.variant && { variant: props.variant })}
  size={props.size}
/>
```

### 2. Event Listener Setup

Always use `createEffect` with cleanup:

```tsx
createEffect(() => {
  const component = componentEl;
  if (!component) return;

  const handleEvent = (event: Event) => {
    props.onEvent?.(event as CustomEvent<EventDetailType>);
  };

  if (props.onEvent) {
    component.addEventListener("eventName", handleEvent);
  }

  return () => {
    if (props.onEvent) {
      component.removeEventListener("eventName", handleEvent);
    }
  };
});
```

### 3. TypeScript Types

Use proper types for web component elements:

```tsx
// ✅ CORRECT: Proper element type
let componentEl: HTMLModusWcButtonElement | undefined;
let componentEl: HTMLModusWcCheckboxElement | undefined;
let componentEl: HTMLModusWcDropdownMenuElement | undefined;

// Pattern: HTMLModusWc[ComponentName]Element
```

### 4. Prop Naming

Web components use kebab-case for props:

```tsx
// SolidJS prop: customClass
// Web component prop: custom-class
<modus-wc-component custom-class={props.customClass} />

// SolidJS prop: modalId
// Web component prop: modal-id
<modus-wc-modal modal-id={props.modalId} />
```

### 5. Callback Ref Pattern

```tsx
<modus-wc-component ref={(el) => (componentEl = el)} />
```

## Common Event Names

Modus components use these common event names:

- `inputChange` - For input value changes
- `inputFocus` - For focus events
- `inputBlur` - For blur events
- `buttonClick` - For button clicks
- `itemSelect` - For menu/dropdown item selection
- `menuVisibilityChange` - For dropdown menu visibility
- `expandedChange` - For accordion/collapse state

Check the Modus documentation for component-specific events.

## Accessibility

Always include:

- `aria-label` prop for icon-only or non-text components
- Proper ARIA attributes passed to web component
- Keyboard navigation support (usually handled by web component)

## Testing Checklist

- [ ] Component renders without errors
- [ ] Props are forwarded correctly to web component
- [ ] Event listeners are set up and cleaned up properly
- [ ] TypeScript types are correct
- [ ] Accessibility attributes are included
- [ ] Conditional props don't pass undefined values

## Common Mistakes to Avoid

1. **Missing cleanup**: Always return cleanup function from `createEffect`
2. **Wrong event names**: Check Modus docs for exact event names
3. **Passing undefined**: Use conditional spreading for optional props
4. **Wrong prop names**: Web components use kebab-case, SolidJS uses camelCase
5. **Missing null checks**: Always check `componentEl` before use
