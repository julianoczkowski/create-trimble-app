import { onMount, onCleanup, type Component } from "solid-js";

/**
 * Props for the ModusRadio component.
 */
export interface ModusRadioProps {
  label?: string;
  value?: boolean;
  name?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  inputId?: string;
  inputTabIndex?: number;
  customClass?: string;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus radio button component.
 * @param {ModusRadioProps} props - The component props.
 * @returns {JSX.Element} The rendered radio button component.
 */
const ModusRadio: Component<ModusRadioProps> = (props) => {
  let radioEl: HTMLElement | undefined;

  onMount(() => {
    if (!radioEl) return;

    const handleChange = (e: Event) => props.onInputChange?.(e as CustomEvent<InputEvent>);
    const handleFocus = (e: Event) => props.onInputFocus?.(e as CustomEvent<FocusEvent>);
    const handleBlur = (e: Event) => props.onInputBlur?.(e as CustomEvent<FocusEvent>);

    if (props.onInputChange) radioEl.addEventListener("inputChange", handleChange);
    if (props.onInputFocus) radioEl.addEventListener("inputFocus", handleFocus);
    if (props.onInputBlur) radioEl.addEventListener("inputBlur", handleBlur);

    onCleanup(() => {
      if (props.onInputChange) radioEl?.removeEventListener("inputChange", handleChange);
      if (props.onInputFocus) radioEl?.removeEventListener("inputFocus", handleFocus);
      if (props.onInputBlur) radioEl?.removeEventListener("inputBlur", handleBlur);
    });
  });

  return (
    <modus-wc-radio
      ref={(el) => (radioEl = el as HTMLElement)}
      label={props.label}
      value={props.value ?? false}
      name={props.name ?? ""}
      size={props.size ?? "md"}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      inputId={props.inputId}
      inputTabIndex={props.inputTabIndex}
      custom-class={props.customClass}
      aria-label={props["aria-label"]}
    />
  );
};

export default ModusRadio;
