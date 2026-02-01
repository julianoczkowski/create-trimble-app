import { ModusWcHandle } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusHandle component.
 */
export interface ModusHandleProps {
  /** Custom CSS class to apply to the handle element. */
  customClass?: string;
  /** Initial split percentage (1-100) for the left/top panel. */
  defaultSplit?: number;
  /** Spacing/density of the handle container. */
  density?: "compact" | "comfortable" | "relaxed";
  /** CSS selector or HTMLElement reference for the left/top panel to resize. */
  leftTarget?: string;
  /** Orientation of the handle (horizontal resizes left/right, vertical resizes top/bottom). */
  orientation?: "horizontal" | "vertical";
  /** CSS selector or HTMLElement reference for the right/bottom panel to resize. */
  rightTarget?: string;
  /** Size of the handle bar. */
  size?: "default" | "lg" | "xl" | "2xl";
  /** Type of handle to display - simple bar or button with drag icon. */
  type?: "bar" | "button";
  /** Color of the button (only applies when type="button"). */
  buttonColor?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  /** Size of the button (only applies when type="button"). */
  buttonSize?: "xs" | "sm" | "md" | "lg";
  /** Variant of the button (only applies when type="button"). */
  buttonVariant?: "borderless" | "filled" | "outlined";
  /** The ARIA label for the handle. */
  ariaLabel?: string;
}

/**
 * Renders a Modus handle component for resizing adjacent elements.
 *
 * @example
 * // Basic horizontal handle
 * <div className="flex h-[300px]">
 *   <div id="left-panel" className="w-[200px]">Left</div>
 *   <ModusHandle
 *     orientation="horizontal"
 *     leftTarget="#left-panel"
 *     rightTarget="#right-panel"
 *   />
 *   <div id="right-panel" className="flex-1">Right</div>
 * </div>
 *
 * @example
 * // Button type handle
 * <ModusHandle
 *   type="button"
 *   orientation="horizontal"
 *   buttonColor="primary"
 *   buttonVariant="outlined"
 *   leftTarget="#panel-a"
 *   rightTarget="#panel-b"
 * />
 *
 * @example
 * // With custom split percentage
 * <ModusHandle
 *   orientation="horizontal"
 *   defaultSplit={30}
 *   leftTarget="#left"
 *   rightTarget="#right"
 * />
 *
 * @param {ModusHandleProps} props - The component props.
 * @returns {JSX.Element} The rendered handle component.
 */
export default function ModusHandle({
  customClass,
  defaultSplit = 50,
  density = "comfortable",
  leftTarget,
  orientation = "horizontal",
  rightTarget,
  size = "default",
  type = "bar",
  buttonColor = "tertiary",
  buttonSize = "md",
  buttonVariant = "filled",
  ariaLabel,
}: ModusHandleProps) {
  return (
    <ModusWcHandle
      custom-class={customClass}
      default-split={defaultSplit}
      density={density}
      left-target={leftTarget}
      orientation={orientation}
      right-target={rightTarget}
      size={size}
      type={type}
      button-color={buttonColor}
      button-size={buttonSize}
      button-variant={buttonVariant}
      aria-label={ariaLabel}
    />
  );
}
