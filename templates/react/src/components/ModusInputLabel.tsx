import { ModusWcInputLabel } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

/**
 * Props for the ModusInputLabel component.
 */
interface ModusInputLabelProps {
  /** The ID of the input element this label is for. */
  forId?: string;
  /** The text to display as the label. */
  labelText: string;
  /** The text to display as a sub-label. */
  subLabelText?: string;
  /** Whether the input is required. */
  required?: boolean;
  /** The size of the label. */
  size?: 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the label. */
  customClass?: string;
  /** The content to display inside the label. */
  children?: ReactNode;
}

/**
 * Renders a Modus input label component.
 * @param {ModusInputLabelProps} props - The component props.
 * @returns {JSX.Element} The rendered input label component.
 */
export default function ModusInputLabel({
  forId,
  labelText,
  subLabelText,
  required = false,
  size = 'md',
  customClass = '',
  children,
}: ModusInputLabelProps) {
  return (
    <ModusWcInputLabel
      for-id={forId}
      label-text={labelText}
      sub-label-text={subLabelText}
      required={required}
      size={size}
      custom-class={customClass}
    >
      {children}
    </ModusWcInputLabel>
  );
}
