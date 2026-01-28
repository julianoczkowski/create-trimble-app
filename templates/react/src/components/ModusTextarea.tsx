import { useEffect, useMemo, useRef } from "react";
import { ModusWcTextarea } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "./ModusInputFeedback";

type TextareaSize = "sm" | "md" | "lg";
type EnterKeyHint =
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send";

/**
 * Props for the ModusTextarea component.
 */
export interface ModusTextareaProps {
  /** The value of the textarea. */
  value?: string;
  /** The label for the textarea. */
  label?: string;
  /** The placeholder text for the textarea. */
  placeholder?: string;
  /** Helper text to display below the textarea. */
  helperText?: string;
  /** Error text to display below the textarea. */
  errorText?: string;
  /** Valid text to display below the textarea. */
  validText?: string;
  /** Feedback to display for the textarea. */
  feedback?: InputFeedbackProp;
  /** The size of the textarea. */
  size?: TextareaSize;
  /** The number of rows to display. */
  rows?: number;
  /** The maximum allowed length of the input. */
  maxLength?: number;
  /** The minimum allowed length of the input. */
  minLength?: number;
  /** Whether the textarea is required. */
  required?: boolean;
  /** Whether the textarea is disabled. */
  disabled?: boolean;
  /** Whether the textarea is read-only. */
  readOnly?: boolean;
  /** The enter key hint for the virtual keyboard. */
  enterkeyhint?: EnterKeyHint;
  /** The name of the textarea. */
  name?: string;
  /** A custom CSS class to apply to the textarea. */
  customClass?: string;
  /** The ARIA label for the textarea. */
  ariaLabel?: string;
  /** A callback function to handle value changes. */
  onValueChange?: (value: string) => void;
}

/**
 * Renders a Modus textarea component.
 * @param {ModusTextareaProps} props - The component props.
 * @returns {JSX.Element} The rendered textarea component.
 */
export default function ModusTextarea({
  value = "",
  label,
  placeholder,
  helperText,
  errorText,
  validText,
  feedback,
  size = "md",
  rows,
  maxLength,
  minLength,
  required = false,
  disabled = false,
  readOnly = false,
  enterkeyhint,
  name,
  customClass,
  ariaLabel,
  onValueChange,
}: ModusTextareaProps) {
  const textareaRef = useRef<HTMLModusWcTextareaElement>(null);

  /**
   * Computes the appropriate feedback configuration based on provided props.
   *
   * This memoized function determines the feedback level and message by
   * checking props in priority order: feedback > errorText > validText > helperText.
   * This ensures consistent feedback display while allowing flexible prop usage.
   *
   * @returns {InputFeedbackProp | undefined} The computed feedback configuration
   * @private
   */
  const computedFeedback = useMemo<InputFeedbackProp | undefined>(() => {
    if (feedback) {
      return feedback;
    }
    if (errorText) {
      return { level: "error", message: errorText };
    }
    if (validText) {
      return { level: "success", message: validText };
    }
    if (helperText) {
      return { level: "info", message: helperText };
    }
    return undefined;
  }, [errorText, feedback, helperText, validText]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const handleValueChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      onValueChange?.(customEvent.detail);
    };

    if (onValueChange) {
      textarea.addEventListener("valueChange", handleValueChange);
    }

    return () => {
      if (onValueChange) {
        textarea.removeEventListener("valueChange", handleValueChange);
      }
    };
  }, [onValueChange]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.value = value;
  }, [value]);

  return (
    <ModusWcTextarea
      ref={textareaRef}
      value={value}
      label={label}
      placeholder={placeholder}
      feedback={computedFeedback}
      size={size}
      rows={rows}
      max-length={maxLength}
      min-length={minLength}
      required={required}
      disabled={disabled}
      read-only={readOnly}
      enterkeyhint={enterkeyhint}
      name={name}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
