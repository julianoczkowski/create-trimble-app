---
name: set-up-modus-event-listeners
description: Properly set up and clean up event listeners for Modus web components using useEffect patterns
---

# Set Up Modus Event Listeners

Properly set up and clean up event listeners for Modus web components following established patterns.

## When to Use

Use this skill when:
- Adding event handling to any Modus wrapper component
- Components need to respond to web component events
- You need to sync React state with web component state
- Handling user interactions from Modus components

## Pattern Overview

All Modus event listeners follow this pattern:

1. **Use `useRef`** to get component reference
2. **Use `useEffect`** to set up listeners
3. **Check for component existence** before adding listeners
4. **Create typed handler functions** for each event
5. **Conditionally attach listeners** based on prop existence
6. **Return cleanup function** to remove listeners

## Reference Examples

- **Simple events**: `src/components/ModusCheckbox.tsx:91-150`
- **Multiple events**: `src/components/ModusDropdownMenu.tsx:79-112`
- **Complex events**: `src/components/ModusNavbar.tsx` (multiple event handlers)

## Basic Template

```tsx
import { useEffect, useRef } from "react";
import { ModusWcComponent } from "@trimble-oss/moduswebcomponents-react";

export default function ModusComponent({
  onEventName,
}: {
  onEventName?: (event: CustomEvent<EventDetailType>) => void;
}) {
  const componentRef = useRef<HTMLModusWcComponentElement>(null);

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

  return <ModusWcComponent ref={componentRef} />;
}
```

## Multiple Event Handlers

```tsx
export default function ModusComponent({
  onInputChange,
  onInputFocus,
  onInputBlur,
  onValueChange,
}: {
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
  onValueChange?: (event: CustomEvent<boolean>) => void;
}) {
  const componentRef = useRef<HTMLModusWcComponentElement>(null);

  useEffect(() => {
    const component = componentRef.current;
    if (!component) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };
    const handleValueChange = (event: Event) => {
      onValueChange?.(event as CustomEvent<boolean>);
    };

    if (onInputChange)
      component.addEventListener("inputChange", handleInputChange);
    if (onInputFocus)
      component.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur)
      component.addEventListener("inputBlur", handleInputBlur);
    if (onValueChange)
      component.addEventListener("inputChange", handleValueChange);

    return () => {
      if (onInputChange)
        component.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        component.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur)
        component.removeEventListener("inputBlur", handleInputBlur);
      if (onValueChange)
        component.removeEventListener("inputChange", handleValueChange);
    };
  }, [onInputChange, onInputFocus, onInputBlur, onValueChange]);

  return <ModusWcComponent ref={componentRef} />;
}
```

## Key Patterns

### 1. Null Check First

Always check if component exists:

```tsx
useEffect(() => {
  const component = componentRef.current;
  if (!component) return; // ✅ Early return if no component
  
  // Set up listeners
}, [dependencies]);
```

### 2. Conditional Listener Attachment

Only attach listeners if handlers are provided:

```tsx
if (onEventName) {
  component.addEventListener("eventName", handleEventName);
}
```

### 3. Proper Cleanup

Always remove listeners in cleanup:

```tsx
return () => {
  if (onEventName) {
    component.removeEventListener("eventName", handleEventName);
  }
};
```

### 4. Type Casting

Cast events to proper CustomEvent types:

```tsx
const handleEvent = (event: Event) => {
  onEvent?.(event as CustomEvent<EventDetailType>);
};
```

### 5. Dependencies Array

Include all handler props in dependencies:

```tsx
useEffect(() => {
  // ...
}, [onEventName, onOtherEvent]); // ✅ Include all handlers
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

## Advanced Patterns

### Event with Side Effects

```tsx
const handleItemSelect = (event: Event) => {
  const customEvent = event as CustomEvent<{ value: string }>;
  onItemSelect?.(customEvent);

  // Close menu after selection
  const dropdown = dropdownRef.current;
  if (dropdown) {
    dropdown.menuVisible = false;
  }
};
```

Reference: `src/components/ModusDropdownMenu.tsx:86-94`

### Event Value Transformation

```tsx
const handleValueChange = (event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;
  
  // Transform or validate value
  const rawValue = (customEvent.target as HTMLModusWcComponentElement).value;
  const transformedValue = transformValue(rawValue);
  
  onValueChange?.(new CustomEvent("valueChange", {
    detail: transformedValue,
  }));
};
```

### Debounced Events

```tsx
import { useCallback } from "react";
import { debounce } from "lodash"; // or your debounce utility

useEffect(() => {
  const component = componentRef.current;
  if (!component) return;

  const debouncedHandler = debounce((event: Event) => {
    onSearchChange?.(event as CustomEvent<{ value: string }>);
  }, 300);

  component.addEventListener("searchChange", debouncedHandler);

  return () => {
    component.removeEventListener("searchChange", debouncedHandler);
    debouncedHandler.cancel(); // Cancel pending debounced calls
  };
}, [onSearchChange]);
```

## Common Mistakes

1. **Missing cleanup**: Always return cleanup function
2. **Wrong dependencies**: Include all handler props in dependency array
3. **Missing null check**: Always check `componentRef.current` exists
4. **Wrong event names**: Check Modus docs for exact event names
5. **Not removing listeners**: Must remove in cleanup to prevent memory leaks
6. **Type casting errors**: Use proper CustomEvent types

## Testing Checklist

- [ ] Event listeners are attached when component mounts
- [ ] Event listeners are removed when component unmounts
- [ ] Handlers are called when events fire
- [ ] Multiple handlers work correctly
- [ ] Cleanup prevents memory leaks
- [ ] TypeScript types are correct

## Related Files

- `src/components/ModusCheckbox.tsx` - Basic event handling
- `src/components/ModusDropdownMenu.tsx` - Multiple events
- `src/components/ModusNavbar.tsx` - Complex event handling
- `.cursor/rules/modus-react-integration.mdc` - Integration patterns
