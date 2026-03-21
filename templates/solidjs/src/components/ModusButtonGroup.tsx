import type { Component } from "solid-js";
import type { JSX } from "solid-js";

/**
 * Props for the ModusButtonGroup component.
 */
export interface ModusButtonGroupProps {
  children?: JSX.Element;
  variant?: "borderless" | "filled" | "outlined";
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  selectionType?: "default" | "single" | "multiple";
  onButtonGroupClick?: (
    event: CustomEvent<{ button: HTMLElement; isSelected: boolean }>
  ) => void;
  onButtonSelectionChange?: (
    event: CustomEvent<{ selectedButtons: HTMLElement[] }>
  ) => void;
  customClass?: string;
  ariaLabel?: string;
}

/**
 * Renders a Modus button group component.
 *
 * @param {ModusButtonGroupProps} props - The component props.
 * @returns {JSX.Element} The rendered button group component.
 */
const ModusButtonGroup: Component<ModusButtonGroupProps> = (props) => {
  return (
    <modus-wc-button-group
      variant={props.variant ?? "outlined"}
      color={props.color}
      disabled={props.disabled ?? false}
      orientation={props.orientation ?? "horizontal"}
      selection-type={props.selectionType ?? "default"}
      on:buttonGroupClick={(e: CustomEvent) => props.onButtonGroupClick?.(e)}
      on:buttonSelectionChange={(e: CustomEvent) => props.onButtonSelectionChange?.(e)}
      custom-class={props.customClass}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </modus-wc-button-group>
  );
};

export default ModusButtonGroup;
