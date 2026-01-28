

import { useEffect, useRef } from "react";
import { ModusWcRadio } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusRadio component.
 */
export interface ModusRadioProps {
  /** The label for the radio button. */
  label?: string;
  /** The value of the radio button. */
  value?: boolean;
  /** The name of the radio button group. */
  name?: string;
  /** The size of the radio button. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the radio button is required. */
  required?: boolean;
  /** Whether the radio button is disabled. */
  disabled?: boolean;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** A custom CSS class to apply to the radio button. */
  customClass?: string;
  /** The ARIA label for the radio button. */
  'aria-label'?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus radio button component.
 * @param {ModusRadioProps} props - The component props.
 * @returns {JSX.Element} The rendered radio button component.
 */
export default function ModusRadio({
  label,
  value = false,
  name = '',
  size = 'md',
  required = false,
  disabled = false,
  inputId,
  inputTabIndex,
  customClass,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusRadioProps) {
  const radioRef = useRef<HTMLModusWcRadioElement>(null);

  useEffect(() => {
    const radio = radioRef.current;
    if (!radio) {
      return;
    }

    const handleChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      radio.addEventListener("inputChange", handleChange);
    }
    if (onInputFocus) {
      radio.addEventListener("inputFocus", handleFocus);
    }
    if (onInputBlur) {
      radio.addEventListener("inputBlur", handleBlur);
    }

    return () => {
      if (onInputChange) {
        radio.removeEventListener("inputChange", handleChange);
      }
      if (onInputFocus) {
        radio.removeEventListener("inputFocus", handleFocus);
      }
      if (onInputBlur) {
        radio.removeEventListener("inputBlur", handleBlur);
      }
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcRadio
      ref={radioRef}
      label={label}
      value={value}
      name={name}
      size={size}
      required={required}
      disabled={disabled}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
