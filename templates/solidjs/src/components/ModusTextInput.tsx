import { createEffect } from "solid-js";
import type { Component } from "solid-js";
import type { InputFeedbackProp } from "./ModusInputFeedback";

/**
 * Props for the ModusTextInput component.
 */
interface ModusTextInputProps {
  /** The value of the text input. */
  value?: string;
  /** The type of the text input. */
  type?: "text" | "password" | "email" | "number" | "search" | "url" | "tel" | "date" | "time";
  /** The placeholder text for the text input. */
  placeholder?: string;
  /** The name of the text input. */
  name?: string;
  /** The ID of the input element. */
  inputId?: string;
  /** Whether the text input is disabled. */
  disabled?: boolean;
  /** Whether the text input is read-only. */
  readOnly?: boolean;
  /** Whether the text input is required. */
  required?: boolean;
  /** Whether the text input has a border. */
  bordered?: boolean;
  /** Whether to include a clear button. */
  includeClear?: boolean;
  /** Whether to include a search icon. */
  includeSearch?: boolean;
  /** The ARIA label for the clear button. */
  clearAriaLabel?: string;
  /** Feedback to display for the text input. */
  feedback?: InputFeedbackProp;
  /** The maximum allowed length of the input. */
  maxLength?: number;
  /** The minimum allowed length of the input. */
  minLength?: number;
  /** A regular expression pattern to validate the input against. */
  pattern?: string;
  /** The auto-capitalize behavior for the input. */
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  /** The autocomplete behavior for the input. */
  autoComplete?: string;
  /** The auto-correct behavior for the input. */
  autoCorrect?: "on" | "off";
  /** The enter key hint for the virtual keyboard. */
  enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  /** The input mode for the virtual keyboard. */
  inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** The size of the text input. */
  size?: "sm" | "md" | "lg";
  /** A custom CSS class to apply to the text input. */
  customClass?: string;
  /** The label for the text input. */
  label?: string;
  /** The ARIA label for the text input. */
  "aria-label"?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus text input component.
 * @param props - The component props.
 * @returns The rendered text input component.
 */
const ModusTextInput: Component<ModusTextInputProps> = (props) => {
  let textInputEl: HTMLModusWcTextInputElement | undefined;

  createEffect(() => {
    const textInput = textInputEl;
    if (!textInput) return;

    const handleInputChange = (event: Event) => {
      props.onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      props.onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      props.onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (props.onInputChange)
      textInput.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus)
      textInput.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur)
      textInput.addEventListener("inputBlur", handleInputBlur);

    return () => {
      if (props.onInputChange)
        textInput.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus)
        textInput.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur)
        textInput.removeEventListener("inputBlur", handleInputBlur);
    };
  });

  return (
    <modus-wc-text-input
      ref={(el) => (textInputEl = el)}
      value={props.value ?? ""}
      type={props.type ?? "text"}
      placeholder={props.placeholder ?? ""}
      name={props.name ?? ""}
      input-id={props.inputId}
      disabled={props.disabled ?? false}
      read-only={props.readOnly ?? false}
      required={props.required ?? false}
      bordered={props.bordered ?? true}
      include-clear={props.includeClear ?? false}
      include-search={props.includeSearch ?? false}
      clear-aria-label={props.clearAriaLabel ?? "Clear text"}
      feedback={props.feedback}
      max-length={props.maxLength}
      min-length={props.minLength}
      pattern={props.pattern}
      auto-capitalize={props.autoCapitalize}
      auto-complete={props.autoComplete}
      auto-correct={props.autoCorrect}
      enterkeyhint={props.enterkeyhint}
      input-mode={props.inputMode ?? "text"}
      input-tab-index={props.inputTabIndex}
      size={props.size ?? "md"}
      custom-class={props.customClass ?? ""}
      label={props.label}
      aria-label={props["aria-label"]}
    />
  );
};

export default ModusTextInput;
