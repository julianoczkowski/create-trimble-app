import { onMount, onCleanup, createEffect } from "solid-js";
import type { Component } from "solid-js";
import type { InputFeedbackProp } from "./ModusInputFeedback";

type TextareaSize = "sm" | "md" | "lg";

export interface ModusTextareaProps {
  value?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  validText?: string;
  feedback?: InputFeedbackProp;
  size?: TextareaSize;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  customClass?: string;
  ariaLabel?: string;
  onValueChange?: (value: string) => void;
}

const ModusTextarea: Component<ModusTextareaProps> = (props) => {
  let textareaEl: HTMLModusWcTextareaElement | undefined;

  const computedFeedback = (): InputFeedbackProp | undefined => {
    if (props.feedback) return props.feedback;
    if (props.errorText) return { level: "error", message: props.errorText };
    if (props.validText) return { level: "success", message: props.validText };
    if (props.helperText) return { level: "info", message: props.helperText };
    return undefined;
  };

  onMount(() => {
    const el = textareaEl;
    if (!el || !props.onValueChange) return;
    const handleInputChange = (event: Event) => {
      const customEvent = event as CustomEvent<InputEvent>;
      const target = customEvent.detail?.target as HTMLTextAreaElement | undefined;
      if (target) props.onValueChange?.(target.value);
    };
    el.addEventListener("inputChange", handleInputChange);
    onCleanup(() => el.removeEventListener("inputChange", handleInputChange));
  });

  createEffect(() => {
    const el = textareaEl;
    if (el) {
      el.value = props.value ?? "";
      el.feedback = computedFeedback();
    }
  });

  return (
    <modus-wc-textarea
      ref={(el) => (textareaEl = el)}
      label={props.label}
      placeholder={props.placeholder}
      size={props.size ?? "md"}
      rows={props.rows}
      max-length={props.maxLength}
      min-length={props.minLength}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      read-only={props.readOnly ?? false}
      name={props.name}
      custom-class={props.customClass}
      aria-label={props.ariaLabel}
    />
  );
};

export default ModusTextarea;
