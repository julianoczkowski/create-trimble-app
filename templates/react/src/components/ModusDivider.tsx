

import { forwardRef } from "react";
import { ModusWcDivider } from "@trimble-oss/moduswebcomponents-react";

type DividerColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "high-contrast";

type DividerOrientation = "horizontal" | "vertical";
type DividerPosition = "start" | "center" | "end";
type DividerThickness = "sm" | "md" | "lg";

/**
 * Props for the ModusDivider component.
 */
export interface ModusDividerProps {
  /** The color of the divider. */
  color?: DividerColor;
  /** The content to display in the divider. */
  content?: string;
  /** The orientation of the divider. */
  orientation?: DividerOrientation;
  /** The position of the content in the divider. */
  position?: DividerPosition;
  /** Whether the divider is responsive. */
  responsive?: boolean;
  /** A custom CSS class to apply to the divider. */
  customClass?: string;
  /** A CSS class to apply to the divider. */
  className?: string;
  /** The ARIA label for the divider. */
  ariaLabel?: string;
  /** Whether the divider is hidden from screen readers. */
  ariaHidden?: boolean;
  /** The ARIA role of the divider. */
  role?: string;
  /** The thickness of the divider. */
  thickness?: DividerThickness;
}

/**
 * Renders a Modus divider component.
 * @param {ModusDividerProps} props - The component props.
 * @returns {JSX.Element} The rendered divider component.
 */
const ModusDivider = forwardRef<HTMLModusWcDividerElement, ModusDividerProps>(
  (
    {
      color = 'tertiary',
      content,
      orientation = 'horizontal',
      position = 'center',
      responsive = true,
      customClass,
      className,
      ariaLabel,
      ariaHidden,
      role,
      thickness = 'sm',
    },
    ref
  ) => {
    const thicknessClass =
      thickness !== "sm" ? `modus-divider-thickness-${thickness}` : undefined;
    const combinedClass =
      [customClass, className, thicknessClass].filter(Boolean).join(" ") ||
      undefined;

    return (
      <ModusWcDivider
        ref={ref}
        color={color}
        content={content}
        orientation={orientation}
        position={position}
        responsive={responsive}
        custom-class={combinedClass}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        role={role}
      />
    );
  }
);

ModusDivider.displayName = "ModusDivider";

export default ModusDivider;
