---
name: implement-modus-modal-with-refs
description: Create Modus modals using the forwardRef + useImperativeHandle pattern for programmatic control
---

# Implement Modus Modal with Refs

Create Modus modal components using the `forwardRef` + `useImperativeHandle` pattern for programmatic control.

## When to Use

Use this skill when:
- Creating modal dialogs that need to be opened/closed programmatically
- You need to control modal state from parent components
- Building modals with custom triggers (not just button clicks)

## Pattern Overview

Modus modals require:
1. **`forwardRef`** to expose methods to parent components
2. **`useImperativeHandle`** to define the API (`openModal`, `closeModal`)
3. **`querySelector("dialog")`** to access the native dialog element
4. **Event listeners** for dialog close events

## Reference Implementation

See `src/components/ModusModal.tsx` for the complete implementation.

## Complete Template

```tsx
import { ModusWcModal } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

/**
 * Props for the ModusModal component.
 */
interface ModusModalProps {
  /** A unique identifier for the modal. */
  modalId: string;
  /** The ARIA label for the modal. */
  ariaLabel?: string;
  
  /** The type of backdrop for the modal. */
  backdrop?: 'default' | 'static';
  /** The position of the modal. */
  position?: 'top' | 'center' | 'bottom';
  /** Whether the modal should be fullscreen. */
  fullscreen?: boolean;
  /** Whether to show the fullscreen toggle button. */
  showFullscreenToggle?: boolean;
  /** Whether to show the close button. */
  showClose?: boolean;
  /** A custom CSS class to apply to the modal. */
  customClass?: string;

  /** The header content of the modal. */
  header?: ReactNode;
  /** The main content of the modal. */
  children: ReactNode;
  /** The footer content of the modal. */
  footer?: ReactNode;

  /** A callback function to handle the close event. */
  onClose?: () => void;
}

/**
 * A ref object for the ModusModal component.
 */
export interface ModusModalRef {
  /** Opens the modal. */
  openModal: () => void;
  /** Closes the modal. */
  closeModal: () => void;
}

/**
 * Renders a Modus modal component.
 * @param {ModusModalProps} props - The component props.
 * @param {React.Ref<ModusModalRef>} ref - The ref object for the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const ModusModal = forwardRef<ModusModalRef, ModusModalProps>(
  (
    {
      modalId,
      ariaLabel,
      backdrop = 'default',
      position = 'center',
      fullscreen = false,
      showFullscreenToggle = false,
      showClose = true,
      customClass,
      header,
      children,
      footer,
      onClose,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLModusWcModalElement>(null);

    const openModal = () => {
      if (modalRef.current) {
        const dialog = modalRef.current.querySelector(
          "dialog"
        ) as HTMLDialogElement;
        if (dialog) {
          dialog.showModal();
        }
      }
    };

    const closeModal = () => {
      if (modalRef.current) {
        const dialog = modalRef.current.querySelector(
          "dialog"
        ) as HTMLDialogElement;
        if (dialog) {
          dialog.close();
        }
      }
    };

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    // Handle modal events
    useEffect(() => {
      const modal = modalRef.current;
      if (modal) {
        const handleClose = () => {
          onClose?.();
        };

        const dialogElement = modal.querySelector("dialog");
        if (dialogElement) {
          dialogElement.addEventListener("close", handleClose);
          return () => {
            dialogElement.removeEventListener("close", handleClose);
          };
        }
      }
    }, [onClose]);

    return (
      <ModusWcModal
        ref={modalRef}
        modal-id={modalId}
        aria-label={ariaLabel}
        backdrop={backdrop}
        position={position}
        fullscreen={fullscreen}
        show-fullscreen-toggle={showFullscreenToggle}
        show-close={showClose}
        custom-class={customClass}
      >
        {header && <div slot="header">{header}</div>}
        <div slot="content">{children}</div>
        {footer && <div slot="footer">{footer}</div>}
      </ModusWcModal>
    );
  }
);

ModusModal.displayName = "ModusModal";

export default ModusModal;
```

## Usage Pattern

```tsx
import { useRef } from "react";
import ModusButton from "./components/ModusButton";
import ModusModal, { type ModusModalRef } from "./components/ModusModal";

function MyComponent() {
  const modalRef = useRef<ModusModalRef>(null);

  return (
    <>
      <ModusButton
        onButtonClick={() => {
          modalRef.current?.openModal();
        }}
      >
        Open Modal
      </ModusButton>

      <ModusModal
        ref={modalRef}
        modalId="my-modal"
        ariaLabel="Example modal"
        onClose={() => {
          console.log("Modal closed");
        }}
        header={
          <div className="text-xl font-semibold text-foreground">
            Modal Title
          </div>
        }
        footer={
          <div className="flex gap-2">
            <ModusButton
              variant="borderless"
              onButtonClick={() => {
                modalRef.current?.closeModal();
              }}
            >
              Cancel
            </ModusButton>
            <ModusButton
              onButtonClick={() => {
                modalRef.current?.closeModal();
              }}
            >
              Confirm
            </ModusButton>
          </div>
        }
      >
        <div className="text-sm text-foreground opacity-80">
          Modal content goes here.
        </div>
      </ModusModal>
    </>
  );
}
```

## Key Patterns

### 1. forwardRef Pattern

```tsx
const ModusModal = forwardRef<ModusModalRef, ModusModalProps>(
  (props, ref) => {
    // Component implementation
  }
);
```

### 2. useImperativeHandle

```tsx
useImperativeHandle(ref, () => ({
  openModal,
  closeModal,
}));
```

### 3. Dialog Access

```tsx
const openModal = () => {
  if (modalRef.current) {
    const dialog = modalRef.current.querySelector(
      "dialog"
    ) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }
};
```

**Critical**: Always use `querySelector("dialog")` - don't try to access dialog methods directly on the web component.

### 4. Slot Structure

Modus modals use slots for content:

```tsx
<ModusWcModal>
  {header && <div slot="header">{header}</div>}
  <div slot="content">{children}</div>
  {footer && <div slot="footer">{footer}</div>}
</ModusWcModal>
```

### 5. Event Handling

Listen to the native dialog `close` event:

```tsx
useEffect(() => {
  const modal = modalRef.current;
  if (modal) {
    const dialogElement = modal.querySelector("dialog");
    if (dialogElement) {
      dialogElement.addEventListener("close", handleClose);
      return () => {
        dialogElement.removeEventListener("close", handleClose);
      };
    }
  }
}, [onClose]);
```

## Modal Variants

### Centered Modal (Default)

```tsx
<ModusModal
  ref={modalRef}
  modalId="centered-modal"
  position="center"
  // ... other props
/>
```

### Top Positioned Modal

```tsx
<ModusModal
  ref={modalRef}
  modalId="top-modal"
  position="top"
  // ... other props
/>
```

### Bottom Positioned Modal

```tsx
<ModusModal
  ref={modalRef}
  modalId="bottom-modal"
  position="bottom"
  // ... other props
/>
```

### Fullscreen Modal

```tsx
<ModusModal
  ref={modalRef}
  modalId="fullscreen-modal"
  fullscreen={true}
  showFullscreenToggle={true}
  // ... other props
/>
```

### Static Backdrop Modal

```tsx
<ModusModal
  ref={modalRef}
  modalId="static-modal"
  backdrop="static"
  // ... other props
/>
```

## Common Mistakes

1. **Missing displayName**: Always set `displayName` for forwardRef components
2. **Wrong dialog access**: Use `querySelector("dialog")`, not direct property access
3. **Missing null checks**: Always check `modalRef.current` before use
4. **Wrong event**: Listen to `close` event on dialog element, not web component
5. **Forgetting cleanup**: Always remove event listeners in cleanup function

## Testing Checklist

- [ ] Modal opens when `openModal()` is called
- [ ] Modal closes when `closeModal()` is called
- [ ] `onClose` callback fires when modal closes
- [ ] ESC key closes modal (if backdrop is default)
- [ ] Clicking outside closes modal (if backdrop is default)
- [ ] Static backdrop prevents outside clicks from closing
- [ ] Slots render correctly (header, content, footer)
- [ ] ARIA label is set for accessibility

## Related Files

- `src/components/ModusModal.tsx` - Complete implementation
- `src/demos/modal-demo/page.tsx` - Usage examples
- `.cursor/rules/modus-modal-implementation-react.mdc` - Detailed documentation
