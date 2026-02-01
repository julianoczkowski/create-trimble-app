---
name: fix-modus-component-event-issues
description: Debug and fix common event handling problems with Modus web components
---

# Fix Modus Component Event Issues

Debug and fix common event handling problems with Modus web components.

## When to Use

Use this skill when:
- Events aren't firing on Modus components
- Components aren't responding to user interactions
- Event handlers aren't being called
- You suspect event listener setup issues

## Common Issues and Solutions

### Issue 1: Events Not Firing

**Symptoms**: Click handlers, change handlers, or other events don't fire.

**Causes**:
1. Missing event listener setup
2. Wrong event name
3. Component ref not set up
4. Handler not passed as prop

**Solution**:

```tsx
// ✅ CORRECT: Proper event listener setup
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
}, [onEvent]); // ✅ Include handler in dependencies
```

**Checklist**:
- [ ] Component ref is created: `const componentRef = useRef<HTMLModusWcComponentElement>(null)`
- [ ] Ref is passed to web component: `<ModusWcComponent ref={componentRef} />`
- [ ] Event listener is added in `useEffect`
- [ ] Event name matches Modus documentation
- [ ] Handler is included in dependency array
- [ ] Cleanup function removes listener

### Issue 2: Missing Cleanup

**Symptoms**: Memory leaks, events firing multiple times, component errors after unmount.

**Solution**:

```tsx
useEffect(() => {
  const component = componentRef.current;
  if (!component) return;

  const handleEvent = (event: Event) => {
    onEvent?.(event as CustomEvent<EventDetailType>);
  };

  component.addEventListener("eventName", handleEvent);

  // ✅ CRITICAL: Always return cleanup function
  return () => {
    component.removeEventListener("eventName", handleEvent);
  };
}, [onEvent]);
```

### Issue 3: Wrong Event Names

**Symptoms**: Events never fire, wrong event type received.

**Common Event Names**:

| Component | Event Name | Detail Type |
|-----------|------------|-------------|
| Checkbox | `inputChange` | `InputEvent` |
| TextInput | `inputChange` | `InputEvent` |
| DropdownMenu | `itemSelect` | `{ value: string }` |
| DropdownMenu | `menuVisibilityChange` | `{ isVisible: boolean }` |
| Navbar | `searchClick` | `MouseEvent \| KeyboardEvent` |
| Accordion | `expandedChange` | `{ expanded: boolean; index: number }` |

**Solution**: Check Modus documentation for exact event names. They're case-sensitive.

### Issue 4: Missing Ref

**Symptoms**: `Cannot read property 'addEventListener' of null`, events don't attach.

**Solution**:

```tsx
// ✅ CORRECT: Ref setup
const componentRef = useRef<HTMLModusWcComponentElement>(null);

useEffect(() => {
  const component = componentRef.current;
  if (!component) return; // ✅ Check before use
  
  // Set up listeners
}, []);

return (
  <ModusWcComponent ref={componentRef} /> // ✅ Pass ref
);
```

### Issue 5: Handler Not in Dependencies

**Symptoms**: Stale closures, handlers use old values.

**Solution**:

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
}, [onEvent]); // ✅ Include handler in dependencies
```

### Issue 6: Wrong Event Target

**Symptoms**: Can't access component properties, wrong value extracted.

**Solution**:

```tsx
// ✅ CORRECT: Cast to proper element type
const handleInputChange = (event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;
  const value = (customEvent.target as HTMLModusWcTextInputElement).value;
  onInputChange?.(value);
};

// ❌ WRONG: Don't use event.detail for input values
const handleInputChange = (event: Event) => {
  const value = event.detail; // Wrong for input components!
};
```

### Issue 7: Multiple Event Listeners

**Symptoms**: Events fire multiple times, duplicate handlers.

**Solution**:

```tsx
// ✅ CORRECT: Conditional attachment
if (onEvent) {
  component.addEventListener("eventName", handleEvent);
}

// ✅ CORRECT: Remove in cleanup
return () => {
  if (onEvent) {
    component.removeEventListener("eventName", handleEvent);
  }
};
```

## Debugging Checklist

When events aren't working, check:

1. **Ref Setup**
   - [ ] `useRef` is created with correct type
   - [ ] Ref is passed to web component
   - [ ] Ref is checked before use (`if (!component) return`)

2. **Event Listener Setup**
   - [ ] Listener is added in `useEffect`
   - [ ] Event name matches Modus documentation
   - [ ] Handler function is defined
   - [ ] Handler is conditionally attached (if prop exists)

3. **Cleanup**
   - [ ] Cleanup function is returned from `useEffect`
   - [ ] Listener is removed in cleanup
   - [ ] Same handler reference is used for add/remove

4. **Dependencies**
   - [ ] Handler props are in dependency array
   - [ ] No missing dependencies causing stale closures

5. **Event Handling**
   - [ ] Event is cast to correct `CustomEvent` type
   - [ ] Value is extracted correctly (`target.value` vs `detail`)
   - [ ] Handler is called with correct parameters

## Debugging Tools

### Console Logging

```tsx
useEffect(() => {
  const component = componentRef.current;
  if (!component) {
    console.error("Component ref is null");
    return;
  }

  console.log("Setting up event listener for:", component);

  const handleEvent = (event: Event) => {
    console.log("Event fired:", event);
    console.log("Event type:", event.type);
    console.log("Event target:", event.target);
    onEvent?.(event as CustomEvent<EventDetailType>);
  };

  component.addEventListener("eventName", handleEvent);
  console.log("Event listener attached");

  return () => {
    console.log("Cleaning up event listener");
    component.removeEventListener("eventName", handleEvent);
  };
}, [onEvent]);
```

### React DevTools

- Check if component ref is set
- Verify component is mounted
- Check if handlers are defined

### Browser DevTools

- Check Event Listeners panel for attached listeners
- Verify event names match
- Check for errors in console

## Common Patterns to Verify

### Pattern 1: Basic Event Setup

```tsx
// ✅ Verify this pattern
const componentRef = useRef<HTMLModusWcComponentElement>(null);

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

return <ModusWcComponent ref={componentRef} />;
```

### Pattern 2: Multiple Events

```tsx
// ✅ Verify all events are set up
useEffect(() => {
  const component = componentRef.current;
  if (!component) return;

  const handleEvent1 = (event: Event) => {
    onEvent1?.(event as CustomEvent<Type1>);
  };
  const handleEvent2 = (event: Event) => {
    onEvent2?.(event as CustomEvent<Type2>);
  };

  if (onEvent1) component.addEventListener("event1", handleEvent1);
  if (onEvent2) component.addEventListener("event2", handleEvent2);

  return () => {
    if (onEvent1) component.removeEventListener("event1", handleEvent1);
    if (onEvent2) component.removeEventListener("event2", handleEvent2);
  };
}, [onEvent1, onEvent2]); // ✅ All handlers in dependencies
```

## Quick Fixes

### Fix: Events Not Firing

1. Check if ref is set: `console.log(componentRef.current)`
2. Verify event name: Check Modus docs
3. Add console.log in handler to verify it's called
4. Check if handler prop is passed

### Fix: Events Firing Multiple Times

1. Check if cleanup is removing listeners
2. Verify handler isn't recreated on each render
3. Check dependency array includes handler

### Fix: Wrong Values

1. Verify event type casting
2. Check if using `target.value` vs `detail`
3. For checkboxes, verify value inversion is handled

## Related Files

- `src/components/ModusCheckbox.tsx` - Event handling example
- `src/components/ModusDropdownMenu.tsx` - Multiple events example
- `src/components/ModusNavbar.tsx` - Complex event handling
- `.cursor/rules/modus-react-integration.mdc` - Integration patterns
