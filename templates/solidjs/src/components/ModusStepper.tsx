import { createEffect, type Component } from "solid-js";

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
  label?: string;
  color?: StepperColor;
  content?: string;
  customClass?: string;
}

/**
 * Props for the ModusStepper component.
 */
export interface ModusStepperProps {
  steps: ModusStepperItem[];
  orientation?: "horizontal" | "vertical";
  customClass?: string;
  ariaLabel?: string;
}

/**
 * Renders a Modus stepper component.
 * @param {ModusStepperProps} props - The component props.
 * @returns {JSX.Element} The rendered stepper component.
 */
const ModusStepper: Component<ModusStepperProps> = (props) => {
  let stepperEl: HTMLElement | undefined;

  createEffect(() => {
    const stepper = stepperEl as { steps?: ModusStepperItem[]; customClass?: string } | undefined;
    if (!stepper) return;
    stepper.steps = props.steps.map((step) => ({ ...step }));
  });

  createEffect(() => {
    const stepper = stepperEl as { customClass?: string } | undefined;
    if (!stepper) return;
    stepper.customClass = props.customClass;
  });

  return (
    <modus-wc-stepper
      ref={(el) => (stepperEl = el as HTMLElement)}
      orientation={props.orientation ?? "horizontal"}
      aria-label={props.ariaLabel ?? "Workflow progress"}
      custom-class={props.customClass}
    />
  );
};

export default ModusStepper;
