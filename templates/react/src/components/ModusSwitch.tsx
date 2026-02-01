

import { useEffect, useRef } from "react";
import { ModusWcSwitch } from "@trimble-oss/moduswebcomponents-react";

type SwitchSize = "sm" | "md" | "lg";

/**
 * Props for the ModusSwitch component.
 */
export interface ModusSwitchProps {
  /** The value of the switch. */
  value?: boolean;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /** Whether the switch is in an indeterminate state. */
  indeterminate?: boolean;
  /** Whether the switch is required. */
  required?: boolean;
  /** The size of the switch. */
  size?: SwitchSize;
  /** The label for the switch. */
  label?: string;
  /** The name of the switch. */
  name?: string;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** A custom CSS class to apply to the switch. */
  customClass?: string;
  /** The ARIA label for the switch. */
  'aria-label'?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus switch component.
 * @param {ModusSwitchProps} props - The component props.
 *@returns {JSX.Element} The rendered switch component.
 */
export default function ModusSwitch({
  value = false,
  disabled = false,
  indeterminate = false,
  required = false,
  size = 'md',
  label,
  name,
  inputId,
  inputTabIndex,
  customClass,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusSwitchProps) {
  const switchRef = useRef<HTMLModusWcSwitchElement>(null);

  useEffect(() => {
    const switchElement = switchRef.current;
    if (!switchElement) {
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
      switchElement.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      switchElement.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      switchElement.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        switchElement.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        switchElement.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        switchElement.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputBlur, onInputChange, onInputFocus]);

  useEffect(() => {
    const switchElement = switchRef.current;
    if (!switchElement) {
      return;
    }

    switchElement.value = value;
    switchElement.indeterminate = indeterminate;
  }, [indeterminate, value]);

  return (
    <ModusWcSwitch
      ref={switchRef}
      value={value}
      disabled={disabled}
      indeterminate={indeterminate}
      required={required}
      size={size}
      label={label}
      name={name}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
