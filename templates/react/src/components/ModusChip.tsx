import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcChip } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusChip component.
 */
export interface ModusChipProps {
  /** The content to display inside the chip. */
  children?: ReactNode;
  /** Whether the chip is active. */
  active?: boolean;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** Whether the chip has an error. */
  hasError?: boolean;
  /** The label for the chip. */
  label?: string;
  /** Whether to show the remove button. */
  showRemove?: boolean;
  /** The size of the chip. */
  size?: 'sm' | 'md' | 'lg';
  /** The variant of the chip. */
  variant?: 'filled' | 'outline';
  /** A custom CSS class to apply to the chip. */
  customClass?: string;
  /** The ARIA label for the chip. */
  'aria-label'?: string;
  /** A callback function to handle chip clicks. */
  onChipClick?: (event: CustomEvent<MouseEvent | KeyboardEvent>) => void;
  /** A callback function to handle chip removal. */
  onChipRemove?: (event: CustomEvent<MouseEvent | KeyboardEvent>) => void;
}

/**
 * Renders a Modus chip component.
 * @param {ModusChipProps} props - The component props.
 * @returns {JSX.Element} The rendered chip component.
 */
export default function ModusChip({
  children,
  active = false,
  disabled = false,
  hasError = false,
  label = '',
  showRemove = false,
  size = 'md',
  variant = 'filled',
  customClass,
  'aria-label': ariaLabel,
  onChipClick,
  onChipRemove,
}: ModusChipProps) {
  const chipRef = useRef<HTMLModusWcChipElement>(null);

  useEffect(() => {
    const chip = chipRef.current;
    if (!chip) return;

    const handleChipClick = (event: Event) => {
      onChipClick?.(event as CustomEvent<MouseEvent | KeyboardEvent>);
    };
    const handleChipRemove = (event: Event) => {
      onChipRemove?.(event as CustomEvent<MouseEvent | KeyboardEvent>);
    };

    if (onChipClick) chip.addEventListener("chipClick", handleChipClick);
    if (onChipRemove) chip.addEventListener("chipRemove", handleChipRemove);

    return () => {
      if (onChipClick) chip.removeEventListener("chipClick", handleChipClick);
      if (onChipRemove)
        chip.removeEventListener("chipRemove", handleChipRemove);
    };
  }, [onChipClick, onChipRemove]);

  return (
    <ModusWcChip
      ref={chipRef}
      active={active}
      disabled={disabled}
      hasError={hasError}
      label={label}
      showRemove={showRemove}
      size={size}
      variant={variant}
      customClass={customClass}
      aria-label={ariaLabel}
    >
      {children}
    </ModusWcChip>
  );
}
