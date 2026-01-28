

import { ModusWcLoader } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusLoader component.
 */
interface ModusLoaderProps {
  /** The variant of the loader. */
  variant?: 'spinner' | 'ball' | 'bars' | 'dots' | 'infinity' | 'ring';
  /** The color of the loader. */
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  /** The size of the loader. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the loader. */
  customClass?: string;
  /** The ARIA label for the loader. */
  ariaLabel?: string;
}

/**
 * Renders a Modus loader component.
 * @param {ModusLoaderProps} props - The component props.
 * @returns {JSX.Element} The rendered loader component.
 */
export default function ModusLoader({
  variant = 'spinner',
  color = 'primary',
  size = 'md',
  customClass = '',
  ariaLabel = 'Loading',
}: ModusLoaderProps) {
  return (
    <ModusWcLoader
      variant={variant}
      color={color}
      size={size}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
