import { ModusWcButtonGroup } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

/**
 * Props for the ModusButtonGroup component.
 */
export interface ModusButtonGroupProps {
  /** The content to display inside the button group (ModusButton components). */
  children?: ReactNode;
  /** Style variant applied to all buttons within the group. */
  variant?: "borderless" | "filled" | "outlined";
  /** Color applied to all buttons within the group. */
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  /** Disables all buttons within the button group. */
  disabled?: boolean;
  /** Orientation of the button group: horizontal or vertical. */
  orientation?: "horizontal" | "vertical";
  /** Selection behavior - default (no selection), single (radio-like), or multiple (checkbox-like). */
  selectionType?: "default" | "single" | "multiple";
  /** Callback when any button in the group is clicked. */
  onButtonGroupClick?: (
    event: CustomEvent<{ button: HTMLElement; isSelected: boolean }>,
  ) => void;
  /** Callback when button selection changes. */
  onButtonSelectionChange?: (
    event: CustomEvent<{ selectedButtons: HTMLElement[] }>,
  ) => void;
  /** A custom CSS class to apply to the button group. */
  customClass?: string;
  /** The ARIA label for the button group. */
  ariaLabel?: string;
}

/**
 * Renders a Modus button group component that groups multiple buttons together.
 *
 * @example
 * // Basic horizontal button group
 * <ModusButtonGroup variant="outlined" color="primary">
 *   <ModusButton>Button 1</ModusButton>
 *   <ModusButton>Button 2</ModusButton>
 *   <ModusButton>Button 3</ModusButton>
 * </ModusButtonGroup>
 *
 * @example
 * // Single selection (radio-like behavior)
 * <ModusButtonGroup selectionType="single" variant="outlined">
 *   <ModusButton>Option 1</ModusButton>
 *   <ModusButton pressed>Option 2</ModusButton>
 *   <ModusButton>Option 3</ModusButton>
 * </ModusButtonGroup>
 *
 * @example
 * // Multiple selection (checkbox-like behavior)
 * <ModusButtonGroup selectionType="multiple" variant="outlined">
 *   <ModusButton pressed>Bold</ModusButton>
 *   <ModusButton>Italic</ModusButton>
 *   <ModusButton pressed>Underline</ModusButton>
 * </ModusButtonGroup>
 *
 * @param {ModusButtonGroupProps} props - The component props.
 * @returns {JSX.Element} The rendered button group component.
 */
export default function ModusButtonGroup({
  children,
  variant = "outlined",
  color,
  disabled = false,
  orientation = "horizontal",
  selectionType = "default",
  onButtonGroupClick,
  onButtonSelectionChange,
  customClass,
  ariaLabel,
}: ModusButtonGroupProps) {
  return (
    <ModusWcButtonGroup
      variant={variant}
      color={color}
      disabled={disabled}
      orientation={orientation}
      selection-type={selectionType}
      onButtonGroupClick={onButtonGroupClick}
      onButtonSelectionChange={onButtonSelectionChange}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {children}
    </ModusWcButtonGroup>
  );
}
