---
name: set-up-modus-event-listeners
description: Properly set up and clean up event listeners for Modus web components using createEffect and onCleanup patterns
---

# Set Up Modus Event Listeners

Properly set up and clean up event listeners for Modus web components following established SolidJS patterns.

## When to Use

Use this skill when:
- Adding event handling to any Modus wrapper component
- Components need to respond to web component events
- You need to sync SolidJS state with web component state
- Handling user interactions from Modus components

## Pattern Overview

All Modus event listeners follow this pattern:

1. **Use `let ref`** to get component reference
2. **Use `createEffect`** or **`onMount`** to set up listeners
3. **Use `onCleanup`** to remove listeners
4. **Check for component existence** before adding listeners
5. **Create typed handler functions** for each event
6. **Conditionally attach listeners** based on prop existence

## Reference Examples

- **Simple events**: `src/components/ModusCheckbox.tsx`
- **Multiple events**: `src/components/ModusDropdownMenu.tsx`
- **Complex events**: `src/components/ModusNavbar.tsx` (multiple event handlers)

## Basic Template

```tsx
import { createEffect } from "solid-js";
import type { Component } from "solid-js";

const ModusComponent: Component<{
  onEventName?: (event: CustomEvent<EventDetailType>) => void;
}> = (props) => {
  let componentEl: HTMLModusWcComponentElement | undefined;

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

  return <modus-wc-component ref={(el) => (componentEl = el)} />;
};
```

## Multiple Event Handlers

```tsx
const ModusComponent: Component<{
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
  onValueChange?: (event: CustomEvent<boolean>) => void;
}> = (props) => {
  let componentEl: HTMLModusWcComponentElement | undefined;

  createEffect(() => {
    const component = componentEl;
    if (!component) return;

    const handleInputChange = (event: Event) => {
      props.onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      props.onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      props.onInputBlur?.(event as CustomEvent<FocusEvent>);
    };
    const handleValueChange = (event: Event) => {
      props.onValueChange?.(event as CustomEvent<boolean>);
    };

    if (props.onInputChange)
      component.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus)
      component.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur)
      component.addEventListener("inputBlur", handleInputBlur);
    if (props.onValueChange)
      component.addEventListener("inputChange", handleValueChange);

    return () => {
      if (props.onInputChange)
        component.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus)
        component.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur)
        component.removeEventListener("inputBlur", handleInputBlur);
      if (props.onValueChange)
        component.removeEventListener("inputChange", handleValueChange);
    };
  });

  return <modus-wc-component ref={(el) => (componentEl = el)} />;
};
```

## Key Patterns

### 1. Null Check First

Always check if component exists:

```tsx
createEffect(() => {
  const component = componentEl;
  if (!component) return; // ✅ Early return if no component

  // Set up listeners
});
```

### 2. Conditional Listener Attachment

Only attach listeners if handlers are provided:

```tsx
if (props.onEventName) {
  component.addEventListener("eventName", handleEventName);
}
```

### 3. Proper Cleanup

Return cleanup function from createEffect:

```tsx
return () => {
  if (props.onEventName) {
    component.removeEventListener("eventName", handleEventName);
  }
};
```

### 4. Callback Ref Pattern

Use callback ref for web component elements:

```tsx
<modus-wc-component ref={(el) => (componentEl = el)} />
```

### 5. Type Casting

Cast events to proper CustomEvent types:

```tsx
const handleEvent = (event: Event) => {
  props.onEvent?.(event as CustomEvent<EventDetailType>);
};
```

## Common Event Names

Modus components use these event names:

| Component | Event Name | Detail Type |
|-----------|------------|-------------|
| Checkbox | `inputChange` | `InputEvent` |
| Checkbox | `inputFocus` | `FocusEvent` |
| Checkbox | `inputBlur` | `FocusEvent` |
| DropdownMenu | `itemSelect` | `{ value: string }` |
| DropdownMenu | `menuVisibilityChange` | `{ isVisible: boolean }` |
| Navbar | `searchClick` | `MouseEvent \| KeyboardEvent` |
| Navbar | `mainMenuOpenChange` | `boolean` |
| Accordion | `expandedChange` | `{ expanded: boolean; index: number }` |

Check Modus documentation for component-specific events.

## Related Files

- `src/components/ModusCheckbox.tsx` - Basic event handling
- `src/components/ModusDropdownMenu.tsx` - Multiple events
- `src/components/ModusNavbar.tsx` - Complex event handling
