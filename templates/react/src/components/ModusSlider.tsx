

import { useEffect, useRef } from "react";
import { ModusWcSlider } from "@trimble-oss/moduswebcomponents-react";

type SliderSize = "sm" | "md" | "lg";

/**
 * Props for the ModusSlider component.
 */
export interface ModusSliderProps {
  /** The current value of the slider. */
  value?: number;
  /** The minimum value of the slider. */
  min?: number;
  /** The maximum value of the slider. */
  max?: number;
  /** The step interval for the slider. */
  step?: number;
  /** The label for the slider. */
  label?: string;
  /** The name of the slider. */
  name?: string;
  /** The size of the slider. */
  size?: SliderSize;
  /** Whether the slider is required. */
  required?: boolean;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** A custom CSS class to apply to the slider. */
  customClass?: string;
  /** The ARIA label for the slider. */
  'aria-label'?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus slider component.
 * @param {ModusSliderProps} props - The component props.
 * @returns {JSX.Element} The rendered slider component.
 */
export default function ModusSlider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  label,
  name,
  size = 'md',
  required = false,
  disabled = false,
  inputId,
  inputTabIndex,
  customClass,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusSliderProps) {
  const sliderRef = useRef<HTMLModusWcSliderElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      slider.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      slider.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      slider.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        slider.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        slider.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        slider.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputBlur, onInputChange, onInputFocus]);

  return (
    <ModusWcSlider
      ref={sliderRef}
      value={value}
      min={min}
      max={max}
      step={step}
      label={label}
      name={name}
      size={size}
      required={required}
      disabled={disabled}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
