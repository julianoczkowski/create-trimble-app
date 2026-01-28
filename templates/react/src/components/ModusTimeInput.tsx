import { useEffect, useRef } from "react";
import { ModusWcTimeInput } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "./ModusInputFeedback";

/**
 * Props for the ModusTimeInput component.
 */
export interface ModusTimeInputProps {
  /** The value of the time input. */
  value?: string;
  /** The label for the time input. */
  label?: string;
  /** The name of the time input. */
  name?: string;
  /** The ID of the input element. */
  inputId?: string;
  /** The minimum allowed time. */
  min?: string;
  /** The maximum allowed time. */
  max?: string;
  /** The step interval for the time input. */
  step?: number;
  /** Whether to show the seconds field. */
  showSeconds?: boolean;
  /** The ID of the datalist to use. */
  datalistId?: string;
  /** The options to display in the datalist. */
  datalistOptions?: string[];
  /** Whether to enable autocomplete for the time input. */
  autoComplete?: 'on' | 'off';
  /** Whether the time input has a border. */
  bordered?: boolean;
  /** Whether the time input is disabled. */
  disabled?: boolean;
  /** Whether the time input is read-only. */
  readOnly?: boolean;
  /** Whether the time input is required. */
  required?: boolean;
  /** The size of the time input. */
  size?: 'sm' | 'md' | 'lg';
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** A custom CSS class to apply to the time input. */
  customClass?: string;
  /** Feedback to display for the time input. */
  feedback?: InputFeedbackProp;
  /** The ARIA label for the time input. */
  ariaLabel?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<Event>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus time input component.
 * @param {ModusTimeInputProps} props - The component props.
 * @returns {JSX.Element} The rendered time input component.
 */
export default function ModusTimeInput({
  value = '',
  label,
  name,
  inputId,
  min,
  max,
  step,
  showSeconds = false,
  datalistId,
  datalistOptions = [],
  autoComplete,
  bordered = true,
  disabled = false,
  readOnly = false,
  required = false,
  size = 'md',
  inputTabIndex,
  customClass,
  feedback,
  ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusTimeInputProps) {
  const inputRef = useRef<HTMLModusWcTimeInputElement>(null);

  useEffect(() => {
    const timeInput = inputRef.current;
    if (!timeInput) {
      return;
    }

    if (Array.isArray(datalistOptions)) {
      timeInput.datalistOptions = [...datalistOptions];
    }
  }, [datalistOptions]);

  useEffect(() => {
    const timeInput = inputRef.current;
    if (!timeInput) {
      return;
    }

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<Event>);
    };

    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };

    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      timeInput.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      timeInput.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      timeInput.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        timeInput.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        timeInput.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        timeInput.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputBlur, onInputChange, onInputFocus]);

  useEffect(() => {
    const timeInput = inputRef.current;
    if (!timeInput) {
      return;
    }
    if (value !== undefined) {
      timeInput.value = value;
    }
  }, [value]);

  return (
    <ModusWcTimeInput
      ref={inputRef}
      value={value}
      label={label}
      name={name}
      inputId={inputId}
      min={min}
      max={max}
      step={step}
      showSeconds={showSeconds}
      datalistId={datalistId}
      datalistOptions={datalistOptions}
      autoComplete={autoComplete}
      bordered={bordered}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      size={size}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      feedback={feedback}
      aria-label={ariaLabel}
    />
  );
}
