import { useEffect, useRef } from "react";
import { ModusWcCheckbox } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusCheckbox component.
 */
export interface ModusCheckboxProps {
  /** The value of the checkbox. */
  value?: boolean;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Whether the checkbox is in an indeterminate state. */
  indeterminate?: boolean;
  /** The label for the checkbox. */
  label?: string;
  /** The name of the checkbox. */
  name?: string;
  /** Whether the checkbox is required. */
  required?: boolean;
  /** The size of the checkbox. */
  size?: "sm" | "md" | "lg";
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** A custom CSS class to apply to the checkbox. */
  customClass?: string;
  /** The ARIA label for the checkbox. */
  "aria-label"?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle value changes. */
  onValueChange?: (event: CustomEvent<boolean>) => void;
}

/**
 * Renders a Modus checkbox component with critical bug workaround.
 *
 * ⚠️ IMPORTANT: This component includes a workaround for a critical value inversion bug
 * in the underlying ModusWcCheckbox web component. The value property returns the
 * opposite of the actual checked state, which is automatically corrected.
 *
 * @example
 * // Basic checkbox
 * <ModusCheckbox label="Accept terms" />
 *
 * @example
 * // Controlled checkbox with value change handler
 * <ModusCheckbox
 *   label="Subscribe to newsletter"
 *   value={isSubscribed}
 *   onValueChange={(event) => setSubscribed(event.detail)}
 * />
 *
 * @example
 * // Indeterminate checkbox
 * <ModusCheckbox
 *   label="Select all"
 *   indeterminate={true}
 *   onValueChange={handleSelectAll}
 * />
 *
 * @param {ModusCheckboxProps} props - The component props.
 * @returns {JSX.Element} The rendered checkbox component.
 * @see {@link https://modus.trimble.com/components/checkbox} - Modus Checkbox documentation
 * @see {@link https://github.com/trimble-oss/modus-web-components/issues} - Known issues
 */
export default function ModusCheckbox({
  value = false,
  disabled = false,
  indeterminate = false,
  label,
  name = "",
  required = false,
  size = "md",
  inputId,
  inputTabIndex,
  customClass,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onValueChange,
}: ModusCheckboxProps) {
  const checkboxRef = useRef<HTMLModusWcCheckboxElement>(null);

  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (!checkbox) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };
    /**
     * Handles value change events with critical bug fix for value inversion.
     *
     * ⚠️ CRITICAL BUG WORKAROUND: The ModusWcCheckbox component has a value
     * inversion bug where the `value` property returns the opposite of the
     * actual checked state. This function corrects this by inverting the
     * raw value before passing it to the parent component.
     *
     * @param {Event} event - The input change event from the web component
     * @private
     * @see {@link https://github.com/trimble-oss/modus-web-components/issues} - Modus Web Components issue tracker
     */
    const handleValueChange = (event: Event) => {
      const customEvent = event as CustomEvent<InputEvent>;
      // 🚨 CRITICAL: Handle the value inversion bug
      // The value inversion bug is in the target.value, not the event detail
      const rawValue = (customEvent.target as HTMLModusWcCheckboxElement).value;
      const actualValue = !rawValue; // ✅ CORRECT: Invert the value

      // Create a new event with the corrected value
      const correctedEvent = new CustomEvent("valueChange", {
        detail: actualValue,
        bubbles: true,
        cancelable: true,
      });

      onValueChange?.(correctedEvent);
    };

    if (onInputChange)
      checkbox.addEventListener("inputChange", handleInputChange);
    if (onInputFocus) checkbox.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur) checkbox.addEventListener("inputBlur", handleInputBlur);
    if (onValueChange)
      checkbox.addEventListener("inputChange", handleValueChange);

    return () => {
      if (onInputChange)
        checkbox.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        checkbox.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur)
        checkbox.removeEventListener("inputBlur", handleInputBlur);
      if (onValueChange)
        checkbox.removeEventListener("inputChange", handleValueChange);
    };
  }, [onInputChange, onInputFocus, onInputBlur, onValueChange]);

  return (
    <ModusWcCheckbox
      ref={checkboxRef}
      value={value}
      disabled={disabled}
      indeterminate={indeterminate}
      label={label}
      name={name}
      required={required}
      size={size}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
