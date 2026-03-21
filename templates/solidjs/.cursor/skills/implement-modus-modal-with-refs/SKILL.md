---
name: implement-modus-modal-with-refs
description: Create Modus modals using the callback ref pattern for programmatic control
---

# Implement Modus Modal with Refs

Create Modus modal components using the **callback ref pattern** for programmatic control in SolidJS.

## When to Use

Use this skill when:
- Creating modal dialogs that need to be opened/closed programmatically
- You need to control modal state from parent components
- Building modals with custom triggers (not just button clicks)

## Pattern Overview

Modus modals in SolidJS require:
1. **Callback ref prop** (`ref`) to expose methods to parent components
2. **`onMount`** to call the ref callback with `{ openModal, closeModal }`
3. **`querySelector("dialog")`** to access the native dialog element
4. **Event listeners** for dialog close events with `onCleanup`

## Reference Implementation

See `src/components/ModusModal.tsx` for the complete implementation.

## Complete Template

```tsx
import { onCleanup, onMount } from "solid-js";
import type { Component, JSX } from "solid-js";

interface ModusModalProps {
  modalId: string;
  ariaLabel?: string;
  backdrop?: "default" | "static";
  position?: "top" | "center" | "bottom";
  fullscreen?: boolean;
  showFullscreenToggle?: boolean;
  showClose?: boolean;
  customClass?: string;
  header?: JSX.Element;
  children: JSX.Element;
  footer?: JSX.Element;
  onClose?: () => void;
  ref?: (handle: ModusModalRef) => void;
}

export interface ModusModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const ModusModal: Component<ModusModalProps> = (props) => {
  let modalEl: HTMLModusWcModalElement | undefined;

  const openModal = () => {
    if (modalEl) {
      const dialog = modalEl.querySelector("dialog") as HTMLDialogElement;
      if (dialog) dialog.showModal();
    }
  };

  const closeModal = () => {
    if (modalEl) {
      const dialog = modalEl.querySelector("dialog") as HTMLDialogElement;
      if (dialog) dialog.close();
    }
  };

  onMount(() => {
    props.ref?.({ openModal, closeModal });

    const modal = modalEl;
    if (modal) {
      const handleClose = () => props.onClose?.();
      const dialogElement = modal.querySelector("dialog");
      if (dialogElement) {
        dialogElement.addEventListener("close", handleClose);
        onCleanup(() => {
          dialogElement.removeEventListener("close", handleClose);
        });
      }
    }
  });

  return (
    <modus-wc-modal
      ref={(el) => (modalEl = el)}
      modal-id={props.modalId}
      aria-label={props.ariaLabel}
      backdrop={props.backdrop ?? "default"}
      position={props.position ?? "center"}
      fullscreen={props.fullscreen ?? false}
      show-fullscreen-toggle={props.showFullscreenToggle ?? false}
      show-close={props.showClose ?? true}
      custom-class={props.customClass}
    >
      {props.header && <div slot="header">{props.header}</div>}
      <div slot="content">{props.children}</div>
      {props.footer && <div slot="footer">{props.footer}</div>}
    </modus-wc-modal>
  );
};

export default ModusModal;
```

## Usage Pattern

```tsx
import { createSignal } from "solid-js";
import ModusButton from "./components/ModusButton";
import ModusModal, { type ModusModalRef } from "./components/ModusModal";

function MyComponent() {
  let modalHandle: ModusModalRef | undefined;

  return (
    <>
      <ModusButton
        onButtonClick={() => {
          modalHandle?.openModal();
        }}
      >
        Open Modal
      </ModusButton>

      <ModusModal
        ref={(handle) => (modalHandle = handle)}
        modalId="my-modal"
        ariaLabel="Example modal"
        onClose={() => {
          console.log("Modal closed");
        }}
        header={
          <div class="text-xl font-semibold text-foreground">
            Modal Title
          </div>
        }
        footer={
          <div class="flex gap-2">
            <ModusButton
              variant="borderless"
              onButtonClick={() => {
                modalHandle?.closeModal();
              }}
            >
              Cancel
            </ModusButton>
            <ModusButton
              onButtonClick={() => {
                modalHandle?.closeModal();
              }}
            >
              Confirm
            </ModusButton>
          </div>
        }
      >
        <div class="text-sm text-foreground opacity-80">
          Modal content goes here.
        </div>
      </ModusModal>
    </>
  );
}
```

## Key Patterns

### 1. Callback Ref Pattern (SolidJS)

```tsx
// Parent stores handle
let modalHandle: ModusModalRef | undefined;

// Modal passes handle via ref callback
<ModusModal ref={(handle) => (modalHandle = handle)} ... />
```

### 2. Expose Methods via Ref Callback

```tsx
onMount(() => {
  props.ref?.({ openModal, closeModal });
  // ...
});
```

### 3. Dialog Access

```tsx
const openModal = () => {
  if (modalEl) {
    const dialog = modalEl.querySelector("dialog") as HTMLDialogElement;
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
<modus-wc-modal>
  {props.header && <div slot="header">{props.header}</div>}
  <div slot="content">{props.children}</div>
  {props.footer && <div slot="footer">{props.footer}</div>}
</modus-wc-modal>
```

### 5. Event Handling with onCleanup

```tsx
onMount(() => {
  const modal = modalEl;
  if (modal) {
    const dialogElement = modal.querySelector("dialog");
    if (dialogElement) {
      dialogElement.addEventListener("close", handleClose);
      onCleanup(() => {
        dialogElement.removeEventListener("close", handleClose);
      });
    }
  }
});
```

## Common Mistakes

1. **Wrong dialog access**: Use `querySelector("dialog")`, not direct property access
2. **Missing null checks**: Always check `modalEl` before use
3. **Wrong event**: Listen to `close` event on dialog element, not web component
4. **Forgetting cleanup**: Always use `onCleanup` to remove event listeners

## Related Files

- `src/components/ModusModal.tsx` - Complete implementation
- `src/demos/modal-demo/page.tsx` - Usage examples
