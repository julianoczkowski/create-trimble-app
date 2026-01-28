

import { useEffect, useRef } from "react";
import { ModusWcDate } from "@trimble-oss/moduswebcomponents-react";

/**
 * Represents feedback for an input component.
 */
export interface InputFeedbackProp {
  /** The severity level of the feedback. */
  level: 'error' | 'info' | 'success' | 'warning';
  /** The message to display as feedback. */
  message?: string;
}

/**
 * Props for the ModusDate component.
 */
export interface ModusDateProps {
  /** The value of the date input (Format: YYYY-MM-DD). */
  value?: string;
  /** Whether the date input has a border. */
  bordered?: boolean;
  /** Whether the date input is disabled. */
  disabled?: boolean;
  /** Feedback to display for the date input. */
  feedback?: InputFeedbackProp;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** The label for the date input. */
  label?: string;
  /** The maximum allowed date (Format: YYYY-MM-DD). */
  max?: string;
  /** The minimum allowed date (Format: YYYY-MM-DD). */
  min?: string;
  /** The name of the input element. */
  name?: string;
  /** Whether the date input is read-only. */
  readOnly?: boolean;
  /** Whether the date input is required. */
  required?: boolean;
  /** The size of the date input. */
  size?: 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the date input. */
  customClass?: string;
  /** The ARIA label for the date input. */
  'aria-label'?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus date input component.
 * @param {ModusDateProps} props - The component props.
 * @returns {JSX.Element} The rendered date input component.
 */
export default function ModusDate({
  value = '',
  bordered = true,
  disabled = false,
  feedback,
  inputId,
  inputTabIndex,
  label,
  max,
  min,
  name = '',
  readOnly = false,
  required = false,
  size = 'md',
  customClass,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusDateProps) {
  const dateRef = useRef<HTMLModusWcDateElement>(null);

  useEffect(() => {
    const date = dateRef.current;
    if (!date) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) date.addEventListener("inputChange", handleInputChange);
    if (onInputFocus) date.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur) date.addEventListener("inputBlur", handleInputBlur);

    return () => {
      if (onInputChange)
        date.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        date.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur) date.removeEventListener("inputBlur", handleInputBlur);
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcDate
      ref={dateRef}
      value={value}
      bordered={bordered}
      disabled={disabled}
      feedback={feedback}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      label={label}
      max={max}
      min={min}
      name={name}
      readOnly={readOnly}
      required={required}
      size={size}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
