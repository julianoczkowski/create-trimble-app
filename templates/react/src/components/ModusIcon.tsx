

import { ModusWcIcon } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusIcon component.
 */
interface ModusIconProps {
  /** The name of the icon to display. */
  name: string;
  /** The size of the icon. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Whether the icon is decorative. */
  decorative?: boolean;
  /** A custom CSS class to apply to the icon. */
  customClass?: string;
  /** The ARIA label for the icon. */
  ariaLabel?: string;
  /** The color of the icon. */
  color?: string;
}

/**
 * Renders a Modus icon component.
 * @param {ModusIconProps} props - The component props.
 * @returns {JSX.Element} The rendered icon component.
 */
export default function ModusIcon({
  name,
  size = 'md',
  decorative = true,
  customClass = '',
  ariaLabel,
  color,
}: ModusIconProps) {
  // If decorative is false and no ariaLabel is provided, generate one
  const finalAriaLabel = !decorative && !ariaLabel ? `${name} icon` : ariaLabel;

  return (
    <ModusWcIcon
      name={name}
      size={size}
      decorative={decorative}
      custom-class={customClass}
      aria-label={finalAriaLabel}
      style={color ? { color } : undefined}
    />
  );
}
