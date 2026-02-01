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

  /** A CSS class to apply to the modal. */
  className?: string;
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
      className,
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
        custom-class={customClass || className}
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
