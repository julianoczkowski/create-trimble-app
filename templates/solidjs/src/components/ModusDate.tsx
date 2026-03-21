import { createEffect } from "solid-js";
import type { Component } from "solid-js";
import type { InputFeedbackProp } from "./ModusInputFeedback";

/** Date format options. */
export type DateFormat =
  | "yyyy-mm-dd"
  | "dd-mm-yyyy"
  | "yyyy/mm/dd"
  | "dd/mm/yyyy"
  | "MMM DD, YYYY";

/** Week start day options. */
export type WeekStartDay = "sunday" | "monday";

/**
 * Props for the ModusDate component.
 */
export interface ModusDateProps {
  /** The value of the date input (Format: YYYY-MM-DD). */
  value?: string;
  /** Whether the date input has a border. */
  bordered?: boolean;
  /** Whether the date input is disabled. */
  disabled?: boolean;
  /** Feedback to display for the date input. */
  feedback?: InputFeedbackProp;
  /** Date format pattern. */
  format?: DateFormat;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** The label for the date input. */
  label?: string;
  /** The maximum allowed date (Format: YYYY-MM-DD). */
  max?: string;
  /** The minimum allowed date (Format: YYYY-MM-DD). */
  min?: string;
  /** The name of the input element. */
  name?: string;
  /** Whether the date input is read-only. */
  readOnly?: boolean;
  /** Whether the date input is required. */
  required?: boolean;
  /** The size of the date input. */
  size?: "sm" | "md" | "lg";
  /** First day of the week for the calendar view. */
  weekStartDay?: WeekStartDay;
  /** A custom CSS class to apply to the date input. */
  customClass?: string;
  /** The ARIA label for the date input. */
  "aria-label"?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

/**
 * Renders a Modus date input component.
 * @param props - The component props.
 * @returns The rendered date input component.
 */
const ModusDate: Component<ModusDateProps> = (props) => {
  let dateEl: HTMLModusWcDateElement | undefined;

  createEffect(() => {
    const date = dateEl;
    if (!date) return;

    const handleInputChange = (event: Event) => {
      props.onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      props.onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      props.onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (props.onInputChange)
      date.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus)
      date.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur)
      date.addEventListener("inputBlur", handleInputBlur);

    return () => {
      if (props.onInputChange)
        date.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus)
        date.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur)
        date.removeEventListener("inputBlur", handleInputBlur);
    };
  });

  return (
    <modus-wc-date
      ref={(el) => (dateEl = el)}
      value={props.value ?? ""}
      bordered={props.bordered ?? true}
      disabled={props.disabled ?? false}
      feedback={props.feedback}
      inputId={props.inputId}
      inputTabIndex={props.inputTabIndex}
      label={props.label}
      max={props.max}
      min={props.min}
      name={props.name ?? ""}
      readOnly={props.readOnly ?? false}
      required={props.required ?? false}
      size={props.size ?? "md"}
      customClass={props.customClass}
      aria-label={props["aria-label"]}
      format={props.format}
      weekStartDay={props.weekStartDay}
    />
  );
};

export default ModusDate;
