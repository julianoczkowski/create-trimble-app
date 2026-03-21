import { createEffect, onCleanup, Show, For, type Component } from "solid-js";
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
  label: string;
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  dismissOnAction?: boolean;
  onClick?: (toastId: string) => void;
}

/**
 * Represents a single toast item.
 */
export interface ModusToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  dismissible?: boolean;
  delay?: number | null;
  position?: ToastPosition;
  customClass?: string;
  action?: ModusToastAction;
}

/**
 * Props for the ModusToast component.
 */
interface ModusToastProps {
  toasts: ModusToastItem[];
  defaultPosition?: ToastPosition;
  defaultDelay?: number | null;
  customClass?: string;
  className?: string;
  onDismiss?: (toastId: string) => void;
  onAction?: (toastId: string) => void;
}

/**
 * Renders a Modus toast component.
 * @param {ModusToastProps} props - The component props.
 * @returns {JSX.Element} The rendered toast component.
 */
const ModusToast: Component<ModusToastProps> = (props) => {
  const timers = new Map<string, number>();

  const handleDismiss = (toastId: string) => {
    const timeoutId = timers.get(toastId);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timers.delete(toastId);
    }
    props.onDismiss?.(toastId);
  };

  const handleActionClick = (toast: ModusToastItem) => {
    toast.action?.onClick?.(toast.id);
    props.onAction?.(toast.id);
    if (toast.action?.dismissOnAction !== false) {
      handleDismiss(toast.id);
    }
  };

  const resolveDelay = (toast: ModusToastItem) => {
    if (toast.delay === null) return undefined;
    if (typeof toast.delay === "number") return toast.delay;
    if (typeof props.defaultDelay === "number") return props.defaultDelay;
    return 4000;
  };

  createEffect(() => {
    const activeToastIds = new Set(props.toasts.map((t) => t.id));

    timers.forEach((timeoutId, storedId) => {
      if (!activeToastIds.has(storedId)) {
        window.clearTimeout(timeoutId);
        timers.delete(storedId);
      }
    });

    props.toasts.forEach((toast) => {
      const delayMs = resolveDelay(toast);
      if (typeof delayMs === "number" && delayMs > 0 && !timers.has(toast.id)) {
        const timeoutId = window.setTimeout(() => handleDismiss(toast.id), delayMs);
        timers.set(toast.id, timeoutId);
      }
    });
  });

  onCleanup(() => {
    timers.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timers.clear();
  });

  return (
    <div class={props.className ?? "relative w-full pointer-events-none"}>
      <For each={props.toasts}>
        {(toast) => {
          const resolvedDelay = resolveDelay(toast);
          const toastDelay =
            typeof resolvedDelay === "number" && resolvedDelay > 0 ? resolvedDelay : undefined;
          const toastPosition = toast.position ?? props.defaultPosition ?? "top-end";

          return (
            <div class="pointer-events-auto">
              <modus-wc-toast
                position={toastPosition}
                delay={toastDelay}
                custom-class={toast.customClass ?? props.customClass}
              >
                <ModusAlert
                  alertTitle={toast.title}
                  alertDescription={toast.description}
                  variant={toast.variant ?? "info"}
                  dismissible={toast.dismissible}
                  onDismissClick={() => handleDismiss(toast.id)}
                >
                  <Show when={toast.action}>
                    <modus-wc-button
                      slot="button"
                      color={toast.action!.color ?? "primary"}
                      variant={toast.action!.variant ?? "filled"}
                      size={toast.action!.size ?? "sm"}
                      on:buttonClick={() => handleActionClick(toast)}
                    >
                      {toast.action!.label}
                    </modus-wc-button>
                  </Show>
                </ModusAlert>
              </modus-wc-toast>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default ModusToast;
