

import { ModusWcNumberInput } from "@trimble-oss/moduswebcomponents-react";
import { useCallback, useEffect, useRef } from "react";

// Type definitions for number input interfaces
interface InputFeedback {
  level: "error" | "info" | "success" | "warning";
  message?: string;
}

/**
 * Props for the ModusNumberInput component.
 */
interface ModusNumberInputProps {
  /** The label for the number input. */
  label?: string;
  /** The placeholder text for the number input. */
  placeholder?: string;
  /** The value of the number input. */
  value?: string;
  /** The name of the number input. */
  name?: string;
  /** The size of the number input. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the number input has a border. */
  bordered?: boolean;
  /** A custom CSS class to apply to the number input. */
  customClass?: string;
  /** The type of the number input. */
  type?: 'number' | 'range';
  /** The input mode for the number input. */
  inputMode?: 'decimal' | 'numeric' | 'none';
  /** Whether to enable autocomplete for the number input. */
  autoComplete?: 'on' | 'off';
  /** The minimum allowed value. */
  min?: number;
  /** The maximum allowed value. */
  max?: number;
  /** The step interval for the number input. */
  step?: number;
  /** Whether the number input is required. */
  required?: boolean;
  /** Whether the number input is disabled. */
  disabled?: boolean;
  /** Whether the number input is read-only. */
  readOnly?: boolean;
  /** The currency symbol to display. */
  currencySymbol?: string;
  /** Feedback to display for the number input. */
  feedback?: InputFeedback;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** The ARIA label for the number input. */
  ariaLabel?: string;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: FocusEvent) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: FocusEvent) => void;
  /** A callback function to handle input changes. */
  onInputChange?: (value: string) => void;
}

/**
 * Renders a Modus number input component.
 * @param {ModusNumberInputProps} props - The component props.
 * @returns {JSX.Element} The rendered number input component.
 */
export default function ModusNumberInput({
  label,
  placeholder = '',
  value = '',
  name,
  size = 'md',
  bordered = true,
  customClass,
  type = 'number',
  inputMode = 'numeric',
  autoComplete,
  min,
  max,
  step,
  required = false,
  disabled = false,
  readOnly = false,
  currencySymbol,
  feedback,
  inputId,
  inputTabIndex,
  ariaLabel,
  onInputFocus,
  onInputBlur,
  onInputChange,
}: ModusNumberInputProps) {
  const numberInputRef = useRef<HTMLElement>(null);

  // Event handlers with useCallback for performance
  const handleInputFocus = useCallback(
    (event: Event) => {
      const focusEvent = event as FocusEvent;
      onInputFocus?.(focusEvent);
    },
    [onInputFocus]
  );

  const handleInputBlur = useCallback(
    (event: Event) => {
      const focusEvent = event as FocusEvent;
      onInputBlur?.(focusEvent);
    },
    [onInputBlur]
  );

  const handleInputChange = useCallback(
    (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customEvent = event as any;
      onInputChange?.(
        customEvent.detail?.value || customEvent.target?.value || ""
      );
    },
    [onInputChange]
  );

  // Set up event listeners when component mounts
  useEffect(() => {
    const numberInput = numberInputRef.current;
    if (!numberInput) return;

    // Add event listeners
    numberInput.addEventListener("inputFocus", handleInputFocus);
    numberInput.addEventListener("inputBlur", handleInputBlur);
    numberInput.addEventListener("inputChange", handleInputChange);

    // Cleanup event listeners
    return () => {
      numberInput.removeEventListener("inputFocus", handleInputFocus);
      numberInput.removeEventListener("inputBlur", handleInputBlur);
      numberInput.removeEventListener("inputChange", handleInputChange);
    };
  }, [handleInputFocus, handleInputBlur, handleInputChange]);

  // Update number input properties when props change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const numberInput = numberInputRef.current as any;
    if (!numberInput) return;

    // Update basic properties
    numberInput.value = value;
    numberInput.label = label;
    numberInput.placeholder = placeholder;
    numberInput.size = size;
    numberInput.type = type;
    numberInput.inputMode = inputMode;
    numberInput.bordered = bordered;
    numberInput.required = required;
    numberInput.disabled = disabled;
    numberInput.readOnly = readOnly;

    // Update constraints
    if (min !== undefined) {
      numberInput.min = min;
    }
    if (max !== undefined) {
      numberInput.max = max;
    }
    if (step !== undefined) {
      numberInput.step = step;
    }

    // Update currency symbol
    if (currencySymbol) {
      numberInput.currencySymbol = currencySymbol;
    }

    // Update feedback
    if (feedback) {
      numberInput.feedback = feedback;
    }

    // Update accessibility
    if (inputId) {
      numberInput.inputId = inputId;
    }
    if (inputTabIndex !== undefined) {
      numberInput.inputTabIndex = inputTabIndex;
    }
    if (ariaLabel) {
      numberInput.ariaLabel = ariaLabel;
    }
    if (autoComplete) {
      numberInput.autoComplete = autoComplete;
    }
    if (name) {
      numberInput.name = name;
    }
  }, [
    value,
    label,
    placeholder,
    size,
    type,
    inputMode,
    bordered,
    required,
    disabled,
    readOnly,
    min,
    max,
    step,
    currencySymbol,
    feedback,
    inputId,
    inputTabIndex,
    ariaLabel,
    autoComplete,
    name,
  ]);

  return (
    <ModusWcNumberInput
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={numberInputRef as any}
      custom-class={customClass}
    />
  );
}
