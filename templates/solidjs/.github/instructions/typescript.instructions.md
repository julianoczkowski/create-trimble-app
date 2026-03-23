---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Patterns for Modus Components in SolidJS

## Event Type Casting

Modus web components emit CustomEvents. Cast them properly:

```tsx
const handleEvent = (event: Event) => {
  const customEvent = event as CustomEvent<EventDetailType>;
  const detail = customEvent.detail;
  // Use detail
};
```

## Common Event Types

```tsx
// Button click
on:buttonClick={() => props.onButtonClick?.()}

// Input change - extract value from target, not detail
(event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;
  const value = (customEvent.target as HTMLInputElement).value;
}

// Checkbox (value is inverted - use the wrapper's onValueChange)
<ModusCheckbox
  value={isChecked()}
  onValueChange={(e) => setChecked(e.detail)}  // detail is already corrected
/>
```

## Component Ref Types

```tsx
let buttonEl: HTMLElement | undefined;
let modalEl: HTMLElement | undefined;
let checkboxEl: HTMLModusWcCheckboxElement | undefined;

// Assign via ref callback
<modus-wc-button ref={(el) => (buttonEl = el as HTMLElement)} />
```

## Modal Ref Pattern

```tsx
interface ModusModalRef {
  openModal: () => void;
  closeModal: () => void;
}

// Access dialog imperatively
const openModal = () => {
  const dialog = modalEl?.querySelector("dialog") as HTMLDialogElement;
  dialog?.showModal();
};
```

## Props Interfaces

```tsx
import { type Component } from "solid-js";
import type { JSX } from "solid-js";

interface ComponentProps {
  color?: "primary" | "secondary" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: JSX.Element;
}

const MyComponent: Component<ComponentProps> = (props) => {
  // ...
};
```

## Import Patterns

```tsx
// Use wrapper components
import ModusButton from "../components/ModusButton";
import ModusAlert from "../components/ModusAlert";

// SolidJS primitives
import { createSignal, createEffect, onMount, onCleanup, Show, For } from "solid-js";
import { type Component } from "solid-js";

// Router
import { useLocation, useNavigate, A } from "@solidjs/router";
```

## Design System Types

```tsx
type ThemeName =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

type ButtonColor = "primary" | "secondary" | "danger";
type ButtonVariant = "filled" | "outlined" | "borderless";
```
