import type { Component } from "solid-js";

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
 * <div class="flex h-[300px]">
 *   <div id="left-panel" class="w-[200px]">Left</div>
 *   <ModusHandle
 *     orientation="horizontal"
 *     leftTarget="#left-panel"
 *     rightTarget="#right-panel"
 *   />
 *   <div id="right-panel" class="flex-1">Right</div>
 * </div>
 *
 * @param {ModusHandleProps} props - The component props.
 * @returns {JSX.Element} The rendered handle component.
 */
const ModusHandle: Component<ModusHandleProps> = (props) => {
  return (
    <modus-wc-handle
      custom-class={props.customClass}
      default-split={props.defaultSplit ?? 50}
      density={props.density ?? "comfortable"}
      left-target={props.leftTarget}
      orientation={props.orientation ?? "horizontal"}
      right-target={props.rightTarget}
      size={props.size ?? "default"}
      type={props.type ?? "bar"}
      button-color={props.buttonColor ?? "tertiary"}
      button-size={props.buttonSize ?? "md"}
      button-variant={props.buttonVariant ?? "filled"}
      aria-label={props.ariaLabel}
    />
  );
};

export default ModusHandle;
