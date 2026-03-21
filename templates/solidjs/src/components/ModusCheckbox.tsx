import { createEffect } from "solid-js";
import type { Component } from "solid-js";

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
 * IMPORTANT: This component includes a workaround for a critical value inversion bug
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
 *   value={isSubscribed()}
 *   onValueChange={(event) => setSubscribed(event.detail)}
 * />
 *
 * @param props - The component props.
 * @returns The rendered checkbox component.
 * @see {@link https://modus.trimble.com/components/checkbox} - Modus Checkbox documentation
 */
const ModusCheckbox: Component<ModusCheckboxProps> = (props) => {
  let checkboxEl: HTMLModusWcCheckboxElement | undefined;

  createEffect(() => {
    const checkbox = checkboxEl;
    if (!checkbox) return;

    const handleInputChange = (event: Event) => {
      props.onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      props.onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      props.onInputBlur?.(event as CustomEvent<FocusEvent>);
    };
    const handleValueChange = (event: Event) => {
      const customEvent = event as CustomEvent<InputEvent>;
      const rawValue = (customEvent.target as HTMLModusWcCheckboxElement).value;
      const actualValue = !rawValue;
      const correctedEvent = new CustomEvent("valueChange", {
        detail: actualValue,
        bubbles: true,
        cancelable: true,
      });
      props.onValueChange?.(correctedEvent);
    };

    if (props.onInputChange)
      checkbox.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus)
      checkbox.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur)
      checkbox.addEventListener("inputBlur", handleInputBlur);
    if (props.onValueChange)
      checkbox.addEventListener("inputChange", handleValueChange);

    return () => {
      if (props.onInputChange)
        checkbox.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus)
        checkbox.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur)
        checkbox.removeEventListener("inputBlur", handleInputBlur);
      if (props.onValueChange)
        checkbox.removeEventListener("inputChange", handleValueChange);
    };
  });

  return (
    <modus-wc-checkbox
      ref={(el) => (checkboxEl = el)}
      value={props.value ?? false}
      disabled={props.disabled ?? false}
      indeterminate={props.indeterminate ?? false}
      label={props.label}
      name={props.name ?? ""}
      required={props.required ?? false}
      size={props.size ?? "md"}
      input-id={props.inputId}
      input-tab-index={props.inputTabIndex}
      custom-class={props.customClass}
      aria-label={props["aria-label"]}
    />
  );
};

export default ModusCheckbox;
