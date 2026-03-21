---
name: fix-modus-component-event-issues
description: Debug and fix common event handling problems with Modus web components
---

# Fix Modus Component Event Issues

Debug and fix common event handling problems with Modus web components in SolidJS.

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
// ✅ CORRECT: Proper event listener setup (SolidJS)
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

**Checklist**:
- [ ] Component ref is created: `let componentEl: HTMLModusWcComponentElement | undefined`
- [ ] Callback ref is used: `<modus-wc-component ref={(el) => (componentEl = el)} />`
- [ ] Event listener is added in `createEffect`
- [ ] Event name matches Modus documentation
- [ ] Cleanup function removes listener

### Issue 2: Missing Cleanup

**Symptoms**: Memory leaks, events firing multiple times, component errors after unmount.

**Solution**:

```tsx
createEffect(() => {
  const component = componentEl;
  if (!component) return;

  const handleEvent = (event: Event) => {
    props.onEvent?.(event as CustomEvent<EventDetailType>);
  };

  component.addEventListener("eventName", handleEvent);

  // ✅ CRITICAL: Always return cleanup function
  return () => {
    component.removeEventListener("eventName", handleEvent);
  };
});
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
// ✅ CORRECT: Ref setup (SolidJS)
let componentEl: HTMLModusWcComponentElement | undefined;

createEffect(() => {
  const component = componentEl;
  if (!component) return; // ✅ Check before use

  // Set up listeners
});

return (
  <modus-wc-component ref={(el) => (componentEl = el)} /> // ✅ Callback ref
);
```

### Issue 5: Wrong Event Target

**Symptoms**: Can't access component properties, wrong value extracted.

**Solution**:

```tsx
// ✅ CORRECT: Cast to proper element type
const handleInputChange = (event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;
  const value = (customEvent.target as HTMLModusWcTextInputElement).value;
  props.onInputChange?.(value);
};

// ❌ WRONG: Don't use event.detail for input values
const handleInputChange = (event: Event) => {
  const value = event.detail; // Wrong for input components!
};
```

### Issue 6: Multiple Event Listeners

**Symptoms**: Events fire multiple times, duplicate handlers.

**Solution**:

```tsx
// ✅ CORRECT: Conditional attachment
if (props.onEvent) {
  component.addEventListener("eventName", handleEvent);
}

// ✅ CORRECT: Remove in cleanup
return () => {
  if (props.onEvent) {
    component.removeEventListener("eventName", handleEvent);
  }
};
```

## Debugging Checklist

When events aren't working, check:

1. **Ref Setup**
   - [ ] `let ref` is declared with correct type
   - [ ] Callback ref is passed to web component
   - [ ] Ref is checked before use (`if (!component) return`)

2. **Event Listener Setup**
   - [ ] Listener is added in `createEffect`
   - [ ] Event name matches Modus documentation
   - [ ] Handler function is defined
   - [ ] Handler is conditionally attached (if prop exists)

3. **Cleanup**
   - [ ] Cleanup function is returned from `createEffect`
   - [ ] Listener is removed in cleanup
   - [ ] Same handler reference is used for add/remove

4. **Event Handling**
   - [ ] Event is cast to correct `CustomEvent` type
   - [ ] Value is extracted correctly (`target.value` vs `detail`)
   - [ ] Handler is called with correct parameters

## Quick Fixes

### Fix: Events Not Firing

1. Check if ref is set: `console.log(componentEl)`
2. Verify event name: Check Modus docs
3. Add console.log in handler to verify it's called
4. Check if handler prop is passed

### Fix: Events Firing Multiple Times

1. Check if cleanup is removing listeners
2. Verify handler isn't recreated on each render
3. Ensure createEffect dependencies are correct

### Fix: Wrong Values

1. Verify event type casting
2. Check if using `target.value` vs `detail`
3. For checkboxes, verify value inversion is handled

## Related Files

- `src/components/ModusCheckbox.tsx` - Event handling example
- `src/components/ModusDropdownMenu.tsx` - Multiple events example
- `src/components/ModusNavbar.tsx` - Complex event handling
