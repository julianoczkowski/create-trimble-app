---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Patterns for Modus Components

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
(event: Event) => {
  const customEvent = event as CustomEvent<MouseEvent | KeyboardEvent>;
}

// Input change
(event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;
  const value = (customEvent.target as HTMLInputElement).value;
}

// Checkbox (remember value is inverted!)
(event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;
  const rawValue = (customEvent.target as HTMLModusWcCheckboxElement).value;
  const actualChecked = !rawValue; // Invert the value
}
```

## Component Ref Types

```tsx
import type { HTMLModusWcButtonElement } from "@trimble-oss/moduswebcomponents-react";

const buttonRef = useRef<HTMLModusWcButtonElement>(null);
const modalRef = useRef<HTMLModusWcModalElement>(null);
const checkboxRef = useRef<HTMLModusWcCheckboxElement>(null);
```

## Modal Ref Pattern

```tsx
interface ModusModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const modalRef = useRef<ModusModalRef>(null);
modalRef.current?.openModal();
```

## Props Interfaces

```tsx
interface ComponentProps {
  color?: "primary" | "secondary" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: React.ReactNode;
}
```

## Import Patterns

```tsx
// Use wrapper components
import { ModusButton, ModusAlert } from "@/components";

// Import types from the web components package
import type { 
  HTMLModusWcButtonElement,
  HTMLModusWcModalElement 
} from "@trimble-oss/moduswebcomponents-react";
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
