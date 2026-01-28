

import { useEffect, useRef, useCallback } from "react";
import { ModusWcToast, ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusAlert from "./ModusAlert";

export type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-center"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export type ToastVariant = "info" | "success" | "warning" | "error";

/**
 * Represents an action button for a toast.
 */
export interface ModusToastAction {
  /** The label for the action button. */
  label: string;
  /** The color of the action button. */
  color?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
  /** The variant of the action button. */
  variant?: 'filled' | 'outlined' | 'borderless';
  /** The size of the action button. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Whether to dismiss the toast when the action is clicked. */
  dismissOnAction?: boolean;
  /** A callback function to handle action clicks. */
  onClick?: (toastId: string) => void;
}

/**
 * Represents a single toast item.
 */
export interface ModusToastItem {
  /** A unique identifier for the toast. */
  id: string;
  /** The title of the toast. */
  title: string;
  /** The description of the toast. */
  description?: string;
  /** The variant of the toast. */
  variant?: ToastVariant;
  /** Whether the toast can be dismissed. */
  dismissible?: boolean;
  /** The delay in milliseconds before the toast is automatically dismissed. */
  delay?: number | null;
  /** The position of the toast. */
  position?: ToastPosition;
  /** A custom CSS class to apply to the toast. */
  customClass?: string;
  /** An action button to display in the toast. */
  action?: ModusToastAction;
}

/**
 * Props for the ModusToast component.
 */
interface ModusToastProps {
  /** The toasts to display. */
  toasts: ModusToastItem[];
  /** The default position for toasts. */
  defaultPosition?: ToastPosition;
  /** The default delay in milliseconds before toasts are automatically dismissed. */
  defaultDelay?: number | null;
  /** A custom CSS class to apply to the toast container. */
  customClass?: string;
  /** A CSS class to apply to the toast container. */
  className?: string;
  /** A callback function to handle toast dismissals. */
  onDismiss?: (toastId: string) => void;
  /** A callback function to handle toast actions. */
  onAction?: (toastId: string) => void;
}

/**
 * Renders a Modus toast component.
 * @param {ModusToastProps} props - The component props.
 * @returns {JSX.Element} The rendered toast component.
 */
export default function ModusToast({
  toasts,
  defaultPosition = 'top-end',
  defaultDelay,
  customClass,
  className = 'relative w-full pointer-events-none',
  onDismiss,
  onAction,
}: ModusToastProps) {
  const timers = useRef<Map<string, number>>(new Map());

  const handleDismiss = useCallback(
    (toastId: string) => {
      const timeoutId = timers.current.get(toastId);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timers.current.delete(toastId);
      }
      onDismiss?.(toastId);
    },
    [onDismiss]
  );

  const handleActionClick = useCallback(
    (toast: ModusToastItem) => {
      toast.action?.onClick?.(toast.id);
      onAction?.(toast.id);

      if (toast.action?.dismissOnAction !== false) {
        handleDismiss(toast.id);
      }
    },
    [handleDismiss, onAction]
  );

  const resolveDelay = useCallback(
    (toast: ModusToastItem) => {
      if (toast.delay === null) {
        return undefined;
      }
      if (typeof toast.delay === "number") {
        return toast.delay;
      }
      if (typeof defaultDelay === "number") {
        return defaultDelay;
      }
      return 4000;
    },
    [defaultDelay]
  );

  useEffect(() => {
    const activeToastIds = new Set(toasts.map((toast) => toast.id));

    timers.current.forEach((timeoutId, storedId) => {
      if (!activeToastIds.has(storedId)) {
        window.clearTimeout(timeoutId);
        timers.current.delete(storedId);
      }
    });

    toasts.forEach((toast) => {
      const delayMs = resolveDelay(toast);
      if (typeof delayMs === "number" && delayMs > 0 && !timers.current.has(toast.id)) {
        const timeoutId = window.setTimeout(() => {
          handleDismiss(toast.id);
        }, delayMs);
        timers.current.set(toast.id, timeoutId);
      }
    });
  }, [toasts, resolveDelay, handleDismiss]);

  useEffect(() => {
    const timersMap = timers.current;
    return () => {
      timersMap.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timersMap.clear();
    };
  }, []);

  return (
    <div className={className}>
      {toasts.map((toast) => {
        const resolvedDelay = resolveDelay(toast);
        const toastDelay =
          typeof resolvedDelay === "number" && resolvedDelay > 0 ? resolvedDelay : undefined;
        const toastPosition = toast.position ?? defaultPosition;

        return (
          <div key={toast.id} className="pointer-events-auto">
            <ModusWcToast
              position={toastPosition}
              delay={toastDelay}
              custom-class={toast.customClass ?? customClass}
            >
              <ModusAlert
                alertTitle={toast.title}
                alertDescription={toast.description}
                variant={toast.variant ?? "info"}
                dismissible={toast.dismissible}
                onDismissClick={() => handleDismiss(toast.id)}
              >
                {toast.action && (
                  <ModusWcButton
                    slot="button"
                    color={toast.action.color ?? "primary"}
                    variant={toast.action.variant ?? "filled"}
                    size={toast.action.size ?? "sm"}
                    onButtonClick={() => handleActionClick(toast)}
                  >
                    {toast.action.label}
                  </ModusWcButton>
                )}
              </ModusAlert>
            </ModusWcToast>
          </div>
        );
      })}
    </div>
  );
}
