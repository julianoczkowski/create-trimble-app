import type { ReactNode } from "react";
import { ModusWcBadge } from "@trimble-oss/moduswebcomponents-react";

/**
 * Available color tokens for the Modus badge component.
 */
export type ModusBadgeColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "high-contrast"
  | "success"
  | "warning"
  | "danger";

/**
 * Badge sizing tokens supported by the underlying web component.
 */
export type ModusBadgeSize = "sm" | "md" | "lg";

/**
 * Render variants that control badge appearance.
 */
export type ModusBadgeVariant = "counter" | "filled" | "outlined" | "text";

/**
 * Props for the ModusBadge component.
 */
export interface ModusBadgeProps {
  /** The content to display inside the badge. */
  children: ReactNode;
  /** The color of the badge. */
  color?: ModusBadgeColor;
  /** The variant of the badge. */
  variant?: ModusBadgeVariant;
  /** The size of the badge. */
  size?: ModusBadgeSize;
  /** A custom CSS class to apply to the badge. */
  customClass?: string;
  /** Accessible label describing the badge when used without text. */
  ariaLabel?: string;
}

/**
 * Renders a Modus badge component.
 *
 * Consumers can use the strongly typed props and project arbitrary content inside the badge.
 *
 * @example
 * ```tsx
 * <ModusBadge color="success" variant="filled">Ready</ModusBadge>
 * ```
 *
 * @param {ModusBadgeProps} props - The component props.
 * @param {ReactNode} props.children - The content to display inside the badge.
 * @param {ModusBadgeColor} [props.color='primary'] - The color of the badge.
 * @param {ModusBadgeVariant} [props.variant='filled'] - The variant of the badge.
 * @param {ModusBadgeSize} [props.size='md'] - The size of the badge.
 * @param {string} [props.customClass] - A custom CSS class to apply to the badge.
 * @param {string} [props.ariaLabel] - Accessible label describing the badge when used without text.
 * @returns {JSX.Element} The rendered badge component.
 */
export default function ModusBadge({
  children,
  color = "primary",
  variant = "filled",
  size = "md",
  customClass,
  ariaLabel,
}: ModusBadgeProps) {
  return (
    <ModusWcBadge
      color={color}
      variant={variant}
      size={size}
      customClass={customClass}
      aria-label={ariaLabel}
    >
      {children}
    </ModusWcBadge>
  );
}
