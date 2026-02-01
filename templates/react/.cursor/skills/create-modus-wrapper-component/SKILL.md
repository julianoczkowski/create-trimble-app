---
name: create-modus-wrapper-component
description: Scaffold a new Modus wrapper component following established patterns with proper TypeScript interfaces, event handling, and cleanup
---

# Create Modus Wrapper Component

Scaffold a new Modus wrapper component following established patterns from the codebase.

## When to Use

Use this skill when:
- Creating a new wrapper component for a Modus web component
- You need to integrate a Modus component that doesn't have a wrapper yet
- You want to ensure proper event handling and TypeScript types

## Pattern Overview

All Modus wrapper components follow this structure:

1. **Import the web component** from `@trimble-oss/moduswebcomponents-react`
2. **Define TypeScript props interface** with JSDoc comments
3. **Use `useRef`** for component reference
4. **Use `useEffect`** for event listeners with proper cleanup
5. **Forward props** to the web component with conditional spreading
6. **Handle events** via event listeners, not React props

## Reference Examples

- **Simple wrapper**: `src/components/ModusButton.tsx` - No event listeners needed
- **With event listeners**: `src/components/ModusCheckbox.tsx` - Shows event handling pattern
- **With dropdown**: `src/components/ModusDropdownMenu.tsx` - Shows menu event handling

## Implementation Template

```tsx
import { useEffect, useRef } from "react";
import { ModusWc[ComponentName] } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

/**
 * Props for the Modus[ComponentName] component.
 */
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
 *
 * @param {Modus[ComponentName]Props} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @see {@link https://modus.trimble.com/components/[component]} - Modus documentation
 */
export default function Modus[ComponentName]({
  propName,
  onEventName,
  customClass,
  "aria-label": ariaLabel,
}: Modus[ComponentName]Props) {
  const componentRef = useRef<HTMLModusWc[ComponentName]Element>(null);

  // Set up event listeners if needed
  useEffect(() => {
    const component = componentRef.current;
    if (!component) return;

    const handleEventName = (event: Event) => {
      onEventName?.(event as CustomEvent<EventDetailType>);
    };

    if (onEventName) {
      component.addEventListener("eventName", handleEventName);
    }

    return () => {
      if (onEventName) {
        component.removeEventListener("eventName", handleEventName);
      }
    };
  }, [onEventName]);

  return (
    <ModusWc[ComponentName]
      ref={componentRef}
      prop-name={propName}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
```

## Key Patterns

### 1. Conditional Prop Spreading

For optional props that shouldn't be passed when undefined:

```tsx
// ✅ CORRECT: Conditional spreading
<ModusWcComponent
  {...(color && { color })}
  {...(variant && { variant })}
  size={size} // Required prop, always pass
/>

// ❌ WRONG: Passing undefined
<ModusWcComponent
  color={color} // May be undefined
  variant={variant} // May be undefined
/>
```

Reference: `src/components/ModusButton.tsx:229-230`

### 2. Event Listener Setup

Always use `useEffect` with cleanup:

```tsx
useEffect(() => {
  const component = componentRef.current;
  if (!component) return;

  const handleEvent = (event: Event) => {
    onEvent?.(event as CustomEvent<EventDetailType>);
  };

  if (onEvent) {
    component.addEventListener("eventName", handleEvent);
  }

  return () => {
    if (onEvent) {
      component.removeEventListener("eventName", handleEvent);
    }
  };
}, [onEvent]);
```

Reference: `src/components/ModusCheckbox.tsx:91-150`

### 3. TypeScript Types

Use proper types for web component elements:

```tsx
// ✅ CORRECT: Proper element type
const componentRef = useRef<HTMLModusWcButtonElement>(null);
const componentRef = useRef<HTMLModusWcCheckboxElement>(null);
const componentRef = useRef<HTMLModusWcDropdownMenuElement>(null);

// Pattern: HTMLModusWc[ComponentName]Element
```

### 4. Prop Naming

Web components use kebab-case for props:

```tsx
// React prop: customClass
// Web component prop: custom-class
<ModusWcComponent custom-class={customClass} />

// React prop: modalId
// Web component prop: modal-id
<ModusWcModal modal-id={modalId} />
```

### 5. Event Handler Types

Always type event handlers properly:

```tsx
// ✅ CORRECT: Typed event handler
onEventName?: (event: CustomEvent<{ value: string }>) => void;

// In handler:
const handleEvent = (event: Event) => {
  onEventName?.(event as CustomEvent<{ value: string }>);
};
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

1. **Missing cleanup**: Always return cleanup function from `useEffect`
2. **Wrong event names**: Check Modus docs for exact event names
3. **Passing undefined**: Use conditional spreading for optional props
4. **Wrong prop names**: Web components use kebab-case, React uses camelCase
5. **Missing null checks**: Always check `componentRef.current` before use

## Next Steps

After creating the wrapper:

1. Export it from `src/components/index.ts` (if exists)
2. Create a demo page in `src/demos/[component]-demo/page.tsx`
3. Add to component reference documentation
4. Test all props and events
