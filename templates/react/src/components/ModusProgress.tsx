

import type { ReactNode } from "react";
import { useMemo } from "react";
import { ModusWcProgress } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusProgress component.
 */
interface ModusProgressProps {
  /** The variant of the progress bar. */
  variant?: 'default' | 'radial';
  /** The current value of the progress bar. */
  value?: number;
  /** The maximum value of the progress bar. */
  max?: number;
  /** Whether the progress is indeterminate. */
  indeterminate?: boolean;
  /** The label for the progress bar. */
  label?: string;
  /** A custom CSS class to apply to the progress bar. */
  customClass?: string;
  /** The ARIA label for the progress bar. */
  ariaLabel?: string;
  /** The content to display inside the progress bar (for radial variant). */
  children?: ReactNode;
}

/**
 * Renders a Modus progress component.
 * @param {ModusProgressProps} props - The component props.
 * @returns {JSX.Element} The rendered progress component.
 */
export default function ModusProgress({
  variant = 'default',
  value = 0,
  max = 100,
  indeterminate = false,
  label = '',
  customClass = '',
  ariaLabel = 'Progress status',
  children,
}: ModusProgressProps) {
  const normalizedValue = useMemo(() => {
    if (indeterminate) {
      return undefined;
    }

    if (max <= 0) {
      return 0;
    }

    const clampedValue = Math.min(Math.max(value, 0), max);
    return Number.isFinite(clampedValue) ? clampedValue : 0;
  }, [indeterminate, max, value]);

  return (
    <ModusWcProgress
      variant={variant}
      value={normalizedValue}
      max={max}
      indeterminate={indeterminate}
      label={label}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {variant === "radial" ? children : null}
    </ModusWcProgress>
  );
}
