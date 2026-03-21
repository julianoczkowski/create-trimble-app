import { createEffect, onMount, onCleanup, type Component } from "solid-js";
import type { InputFeedbackProp } from "./ModusInputFeedback";

/**
 * Props for the ModusTimeInput component.
 */
export interface ModusTimeInputProps {
  value?: string;
  label?: string;
  name?: string;
  inputId?: string;
  min?: string;
  max?: string;
  step?: number;
  showSeconds?: boolean;
  datalistId?: string;
  datalistOptions?: string[];
  autoComplete?: "on" | "off";
  bordered?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  inputTabIndex?: number;
  customClass?: string;
  feedback?: InputFeedbackProp;
  ariaLabel?: string;
  onInputChange?: (event: CustomEvent<Event>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus time input component.
 * @param {ModusTimeInputProps} props - The component props.
 * @returns {JSX.Element} The rendered time input component.
 */
const ModusTimeInput: Component<ModusTimeInputProps> = (props) => {
  let inputEl: HTMLElement | undefined;

  createEffect(() => {
    const input = inputEl as { datalistOptions?: string[] } | undefined;
    if (!input || !Array.isArray(props.datalistOptions)) return;
    input.datalistOptions = [...(props.datalistOptions ?? [])];
  });

  onMount(() => {
    if (!inputEl) return;

    const handleInputChange = (e: Event) => props.onInputChange?.(e as CustomEvent<Event>);
    const handleInputFocus = (e: Event) => props.onInputFocus?.(e as CustomEvent<FocusEvent>);
    const handleInputBlur = (e: Event) => props.onInputBlur?.(e as CustomEvent<FocusEvent>);

    if (props.onInputChange) inputEl.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus) inputEl.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur) inputEl.addEventListener("inputBlur", handleInputBlur);

    onCleanup(() => {
      if (props.onInputChange) inputEl?.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus) inputEl?.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur) inputEl?.removeEventListener("inputBlur", handleInputBlur);
    });
  });

  createEffect(() => {
    const input = inputEl as { value?: string } | undefined;
    if (!input || props.value === undefined) return;
    input.value = props.value;
  });

  return (
    <modus-wc-time-input
      ref={(el) => (inputEl = el as HTMLElement)}
      value={props.value ?? ""}
      label={props.label}
      name={props.name}
      inputId={props.inputId}
      min={props.min}
      max={props.max}
      step={props.step}
      showSeconds={props.showSeconds ?? false}
      datalistId={props.datalistId}
      datalistOptions={props.datalistOptions ?? []}
      autoComplete={props.autoComplete}
      bordered={props.bordered ?? true}
      disabled={props.disabled ?? false}
      readOnly={props.readOnly ?? false}
      required={props.required ?? false}
      size={props.size ?? "md"}
      inputTabIndex={props.inputTabIndex}
      customClass={props.customClass}
      feedback={props.feedback}
      aria-label={props.ariaLabel}
    />
  );
};

export default ModusTimeInput;
