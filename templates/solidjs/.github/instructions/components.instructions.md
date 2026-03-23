---
applyTo: "src/components/**/*.tsx"
---

# Modus Wrapper Component Patterns

These are wrapper components that wrap `@trimble-oss/moduswebcomponents` web components for SolidJS.

## Event Handling Pattern

Use refs with `onMount`/`onCleanup` for web component events:

```tsx
let componentEl: HTMLElement | undefined;

onMount(() => {
  if (!componentEl) return;

  const handleEvent = (event: Event) => {
    const customEvent = event as CustomEvent<EventDetail>;
    // Handle event
  };

  componentEl.addEventListener("eventName", handleEvent);

  onCleanup(() => {
    componentEl?.removeEventListener("eventName", handleEvent);
  });
});
```

## State Management

- Let Modus components manage their own internal state
- Don't control accordion/modal expanded state from SolidJS signals
- Use refs for programmatic control when needed

## Props Pattern

Use conditional prop spreading to avoid overriding defaults:

```tsx
<modus-wc-button
  {...(props.color && { color: props.color })}
  {...(props.variant && { variant: props.variant })}
  size={props.size ?? "md"}
>
  {props.children}
</modus-wc-button>
```

## Complex Props via Refs

Objects and arrays must be set as JS properties, not JSX attributes:

```tsx
let navbarEl: HTMLElement | undefined;

createEffect(() => {
  const navbar = navbarEl as Record<string, unknown> | undefined;
  if (!navbar) return;
  navbar.userCard = props.userCard;      // Object - must use ref
  navbar.visibility = props.visibility;  // Object - must use ref
});
```

## Modal Implementation

Use callback ref pattern with imperative control:

```tsx
const openModal = () => {
  const dialog = modalEl?.querySelector("dialog") as HTMLDialogElement;
  dialog?.showModal();
};

onMount(() => {
  props.ref?.({ openModal, closeModal });
});
```

## Checkbox Bug

The wrapper prop is `value`, NOT `checked`. Use `onValueChange` for the corrected boolean:

```tsx
<ModusCheckbox
  value={isChecked()}
  onValueChange={(e) => setChecked(e.detail)}
/>
```

## Select Component

Use `ModusDropdownMenu` instead of `ModusSelect` for reliable event handling in SolidJS.

## Button Group

Don't set default `variant` or `color` on buttons inside groups - let the group control styling.
