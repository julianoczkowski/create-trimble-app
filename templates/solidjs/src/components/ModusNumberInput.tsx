import { createEffect, onMount, onCleanup, type Component } from "solid-js";

interface InputFeedback {
  level: "error" | "info" | "success" | "warning";
  message?: string;
}

/**
 * Props for the ModusNumberInput component.
 */
interface ModusNumberInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  customClass?: string;
  type?: "number" | "range";
  inputMode?: "decimal" | "numeric" | "none";
  autoComplete?: "on" | "off";
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  currencySymbol?: string;
  feedback?: InputFeedback;
  inputId?: string;
  inputTabIndex?: number;
  ariaLabel?: string;
  onInputFocus?: (event: FocusEvent) => void;
  onInputBlur?: (event: FocusEvent) => void;
  onInputChange?: (value: string) => void;
}

/**
 * Renders a Modus number input component.
 * @param {ModusNumberInputProps} props - The component props.
 * @returns {JSX.Element} The rendered number input component.
 */
const ModusNumberInput: Component<ModusNumberInputProps> = (props) => {
  let numberInputEl: HTMLElement | undefined;

  const handleInputFocus = (e: Event) => props.onInputFocus?.(e as FocusEvent);
  const handleInputBlur = (e: Event) => props.onInputBlur?.(e as FocusEvent);
  const handleInputChange = (e: Event) => {
    const ce = e as CustomEvent<{ value?: string }> & { target?: { value?: string } };
    props.onInputChange?.(ce.detail?.value ?? ce.target?.value ?? "");
  };

  onMount(() => {
    numberInputEl?.addEventListener("inputFocus", handleInputFocus);
    numberInputEl?.addEventListener("inputBlur", handleInputBlur);
    numberInputEl?.addEventListener("inputChange", handleInputChange);
  });

  onCleanup(() => {
    numberInputEl?.removeEventListener("inputFocus", handleInputFocus);
    numberInputEl?.removeEventListener("inputBlur", handleInputBlur);
    numberInputEl?.removeEventListener("inputChange", handleInputChange);
  });

  createEffect(() => {
    const input = numberInputEl as Record<string, unknown> | undefined;
    if (!input) return;

    input.value = props.value ?? "";
    input.label = props.label;
    input.placeholder = props.placeholder ?? "";
    input.size = props.size ?? "md";
    input.type = props.type ?? "number";
    input.inputMode = props.inputMode ?? "numeric";
    input.bordered = props.bordered ?? true;
    input.required = props.required ?? false;
    input.disabled = props.disabled ?? false;
    input.readOnly = props.readOnly ?? false;
    if (props.min !== undefined) input.min = props.min;
    if (props.max !== undefined) input.max = props.max;
    if (props.step !== undefined) input.step = props.step;
    if (props.currencySymbol) input.currencySymbol = props.currencySymbol;
    if (props.feedback) input.feedback = props.feedback;
    if (props.inputId) input.inputId = props.inputId;
    if (props.inputTabIndex !== undefined) input.inputTabIndex = props.inputTabIndex;
    if (props.ariaLabel) input.ariaLabel = props.ariaLabel;
    if (props.autoComplete) input.autoComplete = props.autoComplete;
    if (props.name) input.name = props.name;
  });

  return <modus-wc-number-input ref={(el) => (numberInputEl = el as HTMLElement)} custom-class={props.customClass} />;
};

export default ModusNumberInput;
