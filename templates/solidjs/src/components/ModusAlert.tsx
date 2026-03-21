import { onMount, onCleanup, type Component } from "solid-js";
import type { JSX } from "solid-js";

/**
 * Props for the ModusAlert component.
 */
export interface ModusAlertProps {
  alertTitle?: string;
  alertDescription?: string;
  variant?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
  icon?: string;
  role?: "alert" | "log" | "marquee" | "status" | "timer";
  customClass?: string;
  onDismissClick?: (event: CustomEvent<void>) => void;
  children?: JSX.Element;
}

/**
 * Renders a Modus alert component.
 * @param {ModusAlertProps} props - The component props.
 * @returns {JSX.Element} The rendered alert component.
 */
const ModusAlert: Component<ModusAlertProps> = (props) => {
  let alertEl: HTMLElement | undefined;

  onMount(() => {
    if (!alertEl || !props.onDismissClick) return;

    const handleDismissClick = (e: Event) => {
      props.onDismissClick?.(e as CustomEvent<void>);
    };

    alertEl.addEventListener("dismissClick", handleDismissClick);

    onCleanup(() => {
      alertEl?.removeEventListener("dismissClick", handleDismissClick);
    });
  });

  return (
    <modus-wc-alert
      ref={(el) => (alertEl = el as HTMLElement)}
      alert-title={props.alertTitle}
      alert-description={props.alertDescription}
      variant={props.variant ?? "info"}
      dismissible={props.dismissible ?? false}
      icon={props.icon}
      role={props.role ?? "status"}
      custom-class={props.customClass}
    >
      {props.children}
    </modus-wc-alert>
  );
};

export default ModusAlert;
