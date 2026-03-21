import { onMount, onCleanup, type Component } from "solid-js";

type SliderSize = "sm" | "md" | "lg";

/**
 * Props for the ModusSlider component.
 */
export interface ModusSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  name?: string;
  size?: SliderSize;
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
 * Renders a Modus slider component.
 * @param {ModusSliderProps} props - The component props.
 * @returns {JSX.Element} The rendered slider component.
 */
const ModusSlider: Component<ModusSliderProps> = (props) => {
  let sliderEl: HTMLElement | undefined;

  onMount(() => {
    if (!sliderEl) return;

    const handleInputChange = (e: Event) => props.onInputChange?.(e as CustomEvent<InputEvent>);
    const handleInputFocus = (e: Event) => props.onInputFocus?.(e as CustomEvent<FocusEvent>);
    const handleInputBlur = (e: Event) => props.onInputBlur?.(e as CustomEvent<FocusEvent>);

    if (props.onInputChange) sliderEl.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus) sliderEl.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur) sliderEl.addEventListener("inputBlur", handleInputBlur);

    onCleanup(() => {
      if (props.onInputChange) sliderEl?.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus) sliderEl?.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur) sliderEl?.removeEventListener("inputBlur", handleInputBlur);
    });
  });

  return (
    <modus-wc-slider
      ref={(el) => (sliderEl = el as HTMLElement)}
      value={props.value ?? 0}
      min={props.min ?? 0}
      max={props.max ?? 100}
      step={props.step ?? 1}
      label={props.label}
      name={props.name}
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

export default ModusSlider;
