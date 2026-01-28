import type { ReactNode } from "react";
import { ModusWcBadge } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusBadge component.
 */
export interface ModusBadgeProps {
  /** The content to display inside the badge. */
  children: ReactNode;
  /** The color of the badge. */
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'high-contrast';
  /** The variant of the badge. */
  variant?: 'filled' | 'text' | 'counter';
  /** The size of the badge. */
  size?: 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the badge. */
  customClass?: string;
}

/**
 * Renders a Modus badge component.
 * @param {ModusBadgeProps} props - The component props.
 * @param {ReactNode} props.children - The content to display inside the badge.
 * @param {'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'high-contrast'} [props.color='primary'] - The color of the badge.
 * @param {'filled' | 'text' | 'counter'} [props.variant='filled'] - The variant of the badge.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the badge.
 * @param {string} [props.customClass] - A custom CSS class to apply to the badge.
 * @returns {JSX.Element} The rendered badge component.
 */
export default function ModusBadge({
  children,
  color = 'primary',
  variant = 'filled',
  size = 'md',
  customClass,
}: ModusBadgeProps) {
  return (
    <ModusWcBadge
      color={color}
      variant={variant}
      size={size}
      customClass={customClass}
    >
      {children}
    </ModusWcBadge>
  );
}
