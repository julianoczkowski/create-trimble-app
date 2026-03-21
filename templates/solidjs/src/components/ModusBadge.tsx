import type { Component, JSX } from "solid-js";

export type ModusBadgeColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "high-contrast"
  | "success"
  | "warning"
  | "danger";

export type ModusBadgeSize = "sm" | "md" | "lg";

export type ModusBadgeVariant = "counter" | "filled" | "outlined" | "text";

export interface ModusBadgeProps {
  children: JSX.Element;
  color?: ModusBadgeColor;
  variant?: ModusBadgeVariant;
  size?: ModusBadgeSize;
  customClass?: string;
  ariaLabel?: string;
}

const ModusBadge: Component<ModusBadgeProps> = (props) => {
  return (
    <modus-wc-badge
      color={props.color ?? "primary"}
      variant={props.variant ?? "filled"}
      size={props.size ?? "md"}
      custom-class={props.customClass}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </modus-wc-badge>
  );
};

export default ModusBadge;
