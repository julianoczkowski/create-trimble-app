import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcAlert } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusAlert component.
 */
export interface ModusAlertProps {
  /** The title of the alert. */
  alertTitle?: string;
  /** A description for the alert. */
  alertDescription?: string;
  /** The variant of the alert, controlling its color and icon. */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Whether the alert can be dismissed. */
  dismissible?: boolean;
  /** An icon to display in the alert. */
  icon?: string;
  /** The ARIA role of the alert. */
  role?: 'alert' | 'log' | 'marquee' | 'status' | 'timer';
  /** A custom CSS class to apply to the alert. */
  customClass?: string;
  /** A callback function to handle the dismiss click event. */
  onDismissClick?: (event: CustomEvent<void>) => void;
  /** The content to display inside the alert. */
  children?: ReactNode;
}

/**
 * Renders a Modus alert component.
 * @param {ModusAlertProps} props - The component props.
 * @param {string} [props.alertTitle] - The title of the alert.
 * @param {string} [props.alertDescription] - A description for the alert.
 * @param {'info' | 'success' | 'warning' | 'error'} [props.variant='info'] - The variant of the alert.
 * @param {boolean} [props.dismissible=false] - Whether the alert can be dismissed.
 * @param {string} [props.icon] - An icon to display in the alert.
 * @param {'alert' | 'log' | 'marquee' | 'status' | 'timer'} [props.role='status'] - The ARIA role of the alert.
 * @param {string} [props.customClass] - A custom CSS class to apply to the alert.
 * @param {(event: CustomEvent<void>) => void} [props.onDismissClick] - A callback function to handle the dismiss click event.
 * @param {ReactNode} [props.children] - The content to display inside the alert.
 * @returns {JSX.Element} The rendered alert component.
 */
export default function ModusAlert({
  alertTitle,
  alertDescription,
  variant = 'info',
  dismissible = false,
  icon,
  role = 'status',
  customClass,
  onDismissClick,
  children,
}: ModusAlertProps) {
  const alertRef = useRef<HTMLModusWcAlertElement>(null);

  useEffect(() => {
    const alert = alertRef.current;
    if (!alert || !onDismissClick) return;

    const handleDismissClick = (event: Event) => {
      const customEvent = event as CustomEvent<void>;
      onDismissClick(customEvent);
    };

    alert.addEventListener("dismissClick", handleDismissClick);
    return () => {
      alert.removeEventListener("dismissClick", handleDismissClick);
    };
  }, [onDismissClick]);

  return (
    <ModusWcAlert
      ref={alertRef}
      alert-title={alertTitle}
      alert-description={alertDescription}
      variant={variant}
      dismissible={dismissible}
      icon={icon}
      role={role}
      custom-class={customClass}
    >
      {children}
    </ModusWcAlert>
  );
}
