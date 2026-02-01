

import { useEffect, useRef } from "react";
import { ModusWcStepper } from "@trimble-oss/moduswebcomponents-react";

export type StepperColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

/**
 * Represents a single step in a stepper component.
 */
export interface ModusStepperItem {
  /** The label for the step. */
  label?: string;
  /** The color of the step. */
  color?: StepperColor;
  /** The content of the step. */
  content?: string;
  /** A custom CSS class to apply to the step. */
  customClass?: string;
}

/**
 * Props for the ModusStepper component.
 */
export interface ModusStepperProps {
  /** The steps to display in the stepper. */
  steps: ModusStepperItem[];
  /** The orientation of the stepper. */
  orientation?: 'horizontal' | 'vertical';
  /** A custom CSS class to apply to the stepper. */
  customClass?: string;
  /** The ARIA label for the stepper. */
  ariaLabel?: string;
}

/**
 * Renders a Modus stepper component.
 * @param {ModusStepperProps} props - The component props.
 * @returns {JSX.Element} The rendered stepper component.
 */
export default function ModusStepper({
  steps,
  orientation = 'horizontal',
  customClass,
  ariaLabel = 'Workflow progress',
}: ModusStepperProps) {
  const stepperRef = useRef<HTMLModusWcStepperElement>(null);

  // Keep steps array in sync (assign new array for stencil change detection)
  useEffect(() => {
    const stepper = stepperRef.current;
    if (!stepper) {
      return;
    }

    stepper.steps = steps.map((step) => ({ ...step }));
  }, [steps]);

  // Keep custom class up to date
  useEffect(() => {
    const stepper = stepperRef.current;
    if (!stepper) {
      return;
    }

    stepper.customClass = customClass;
  }, [customClass]);

  return (
    <ModusWcStepper
      ref={stepperRef}
      orientation={orientation}
      aria-label={ariaLabel}
      custom-class={customClass}
    />
  );
}
