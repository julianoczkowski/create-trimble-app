

import { useEffect, useRef } from "react";
import { ModusWcSelect } from "@trimble-oss/moduswebcomponents-react";

type SelectSize = "sm" | "md" | "lg";
type FeedbackLevel = "error" | "info" | "success" | "warning";

/**
 * Represents an option in a select component.
 */
export interface ModusSelectOption {
  /** The text to display for the option. */
  label: string;
  /** The value of the option. */
  value: string;
  /** Whether the option is disabled. */
  disabled?: boolean;
}

/**
 * Represents feedback for a select component.
 */
export interface ModusSelectFeedback {
  /** The severity level of the feedback. */
  level: FeedbackLevel;
  /** The message to display as feedback. */
  message?: string;
}

/**
 * Props for the ModusSelect component.
 */
export interface ModusSelectProps {
  /** The options to display in the select component. */
  options: ModusSelectOption[];
  /** The value of the select component. */
  value?: string;
  /** The label for the select component. */
  label?: string;
  /** The name of the select component. */
  name?: string;
  /** The size of the select component. */
  size?: SelectSize;
  /** Whether the select component is required. */
  required?: boolean;
  /** Whether the select component is disabled. */
  disabled?: boolean;
  /** Whether the select component has a border. */
  bordered?: boolean;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** A custom CSS class to apply to the select component. */
  customClass?: string;
  /** Feedback to display for the select component. */
  feedback?: ModusSelectFeedback;
  /** The ARIA label for the select component. */
  'aria-label'?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus select component.
 * @param {ModusSelectProps} props - The component props.
 * @returns {JSX.Element} The rendered select component.
 */
export default function ModusSelect({
  options,
  value = '',
  label,
  name,
  size = 'md',
  required = false,
  disabled = false,
  bordered = true,
  inputId,
  inputTabIndex,
  customClass,
  feedback,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusSelectProps) {
  const selectRef = useRef<HTMLModusWcSelectElement>(null);

  // Sync options array with the web component
  useEffect(() => {
    const select = selectRef.current;
    if (!select) {
      return;
    }

    // Assign a new array to trigger re-render within the component
    select.options = [...options];
  }, [options]);

  // Sync feedback (object set via property, not attribute)
  useEffect(() => {
    const select = selectRef.current;
    if (!select) {
      return;
    }

    select.feedback = feedback;
  }, [feedback]);

  // Wire up events
  useEffect(() => {
    const select = selectRef.current;
    if (!select) {
      return;
    }

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      select.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      select.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      select.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        select.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        select.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        select.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcSelect
      ref={selectRef}
      value={value}
      label={label}
      name={name}
      size={size}
      required={required}
      disabled={disabled}
      bordered={bordered}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
