import { onCleanup, onMount } from "solid-js";
import type { Component, JSX } from "solid-js";

/**
 * Props for the ModusModal component.
 */
interface ModusModalProps {
  /** A unique identifier for the modal. */
  modalId: string;
  /** The ARIA label for the modal. */
  ariaLabel?: string;

  /** The type of backdrop for the modal. */
  backdrop?: "default" | "static";
  /** The position of the modal. */
  position?: "top" | "center" | "bottom";
  /** Whether the modal should be fullscreen. */
  fullscreen?: boolean;
  /** Whether to show the fullscreen toggle button. */
  showFullscreenToggle?: boolean;
  /** Whether to show the close button. */
  showClose?: boolean;
  /** A custom CSS class to apply to the modal. */
  customClass?: string;

  /** The header content of the modal. */
  header?: JSX.Element;
  /** The main content of the modal. */
  children: JSX.Element;
  /** The footer content of the modal. */
  footer?: JSX.Element;

  /** A callback function to handle the close event. */
  onClose?: () => void;

  /** A CSS class to apply to the modal. */
  className?: string;

  /** Callback to receive ref handle for programmatic open/close. */
  ref?: (handle: ModusModalRef) => void;
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
 * @param props - The component props.
 * @returns The rendered modal component.
 */
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
      custom-class={props.customClass ?? props.className}
    >
      {props.header && <div slot="header">{props.header}</div>}
      <div slot="content">{props.children}</div>
      {props.footer && <div slot="footer">{props.footer}</div>}
    </modus-wc-modal>
  );
};

export default ModusModal;
