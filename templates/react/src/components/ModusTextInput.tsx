import { useEffect, useRef } from "react";
import { ModusWcTextInput } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "./ModusInputFeedback";

/**
 * Props for the ModusTextInput component.
 */
interface ModusTextInputProps {
  /** The value of the text input. */
  value?: string;
  /** The type of the text input. */
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'url' | 'tel' | 'date' | 'time';
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
  autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  /** The autocomplete behavior for the input. */
  autoComplete?: string;
  /** The auto-correct behavior for the input. */
  autoCorrect?: 'on' | 'off';
  /** The enter key hint for the virtual keyboard. */
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  /** The input mode for the virtual keyboard. */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** The size of the text input. */
  size?: 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the text input. */
  customClass?: string;
  /** The label for the text input. */
  label?: string;
  /** The ARIA label for the text input. */
  'aria-label'?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus text input component.
 * @param {ModusTextInputProps} props - The component props.
 * @returns {JSX.Element} The rendered text input component.
 */
export default function ModusTextInput({
  value = '',
  type = 'text',
  placeholder = '',
  name = '',
  inputId,
  disabled = false,
  readOnly = false,
  required = false,
  bordered = true,
  includeClear = false,
  includeSearch = false,
  clearAriaLabel = 'Clear text',
  feedback,
  maxLength,
  minLength,
  pattern,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  enterkeyhint,
  inputMode = 'text',
  inputTabIndex,
  size = 'md',
  customClass = '',
  label,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusTextInputProps) {
  const textInputRef = useRef<HTMLModusWcTextInputElement>(null);

  useEffect(() => {
    const textInput = textInputRef.current;
    if (!textInput) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };

    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };

    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    // Add event listeners
    if (onInputChange) {
      textInput.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      textInput.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      textInput.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      // Cleanup event listeners
      if (onInputChange) {
        textInput.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        textInput.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        textInput.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcTextInput
      ref={textInputRef}
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      input-id={inputId}
      disabled={disabled}
      read-only={readOnly}
      required={required}
      bordered={bordered}
      include-clear={includeClear}
      include-search={includeSearch}
      clear-aria-label={clearAriaLabel}
      feedback={feedback}
      max-length={maxLength}
      min-length={minLength}
      pattern={pattern}
      auto-capitalize={autoCapitalize}
      auto-complete={autoComplete}
      auto-correct={autoCorrect}
      enterkeyhint={enterkeyhint}
      input-mode={inputMode}
      input-tab-index={inputTabIndex}
      size={size}
      custom-class={customClass}
      label={label}
      aria-label={ariaLabel}
    />
  );
}
