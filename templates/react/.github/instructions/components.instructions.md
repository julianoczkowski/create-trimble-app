---
applyTo: "src/components/**/*.tsx"
---

# Modus Wrapper Component Patterns

These are wrapper components that wrap `@trimble-oss/moduswebcomponents-react` web components.

## Event Handling Pattern

Always use `useRef` + `useEffect` for web component events:

```tsx
const componentRef = useRef<HTMLModusWcButtonElement>(null);

useEffect(() => {
  const element = componentRef.current;
  if (!element) return;

  const handleEvent = (event: Event) => {
    const customEvent = event as CustomEvent<EventDetail>;
    // Handle event
  };

  element.addEventListener('eventName', handleEvent);
  return () => element.removeEventListener('eventName', handleEvent);
}, []);
```

## State Management

- Let Modus components manage their own internal state
- Don't control accordion/modal expanded state from React useState
- Use refs for programmatic control when needed

## Props Pattern

Use conditional prop spreading to avoid overriding defaults:

```tsx
<ModusWcButton
  {...(color && { color })}
  {...(variant && { variant })}
  size={size}
>
  {children}
</ModusWcButton>
```

## Modal Implementation

Use `forwardRef` with `useImperativeHandle`:

```tsx
const ModusModal = forwardRef<ModusModalRef, Props>((props, ref) => {
  const modalRef = useRef<HTMLModusWcModalElement>(null);

  const openModal = () => {
    const dialog = modalRef.current?.querySelector("dialog");
    dialog?.showModal();
  };

  useImperativeHandle(ref, () => ({ openModal, closeModal }));
  // ...
});
```

## Checkbox Bug

The `value` property is inverted. Always invert:

```tsx
const actualChecked = !event.detail.value;
```

## Select Component

Use `ModusDropdownMenu` instead of `ModusSelect` for reliable event handling.

## Button Group

Don't set default `variant` or `color` on buttons inside groups - let the group control styling.
