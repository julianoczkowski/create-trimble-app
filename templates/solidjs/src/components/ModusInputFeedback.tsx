import type { Component } from "solid-js";

/**
 * Represents feedback for an input component.
 */
export interface InputFeedbackProp {
  /** The severity level of the feedback. */
  level: "error" | "info" | "success" | "warning";
  /** The message to display as feedback. */
  message?: string;
}

/**
 * Props for the ModusInputFeedback component.
 */
interface ModusInputFeedbackProps {
  /** The severity level of the feedback. */
  level: "error" | "info" | "success" | "warning";
  /** The message to display as feedback. */
  message?: string;
  /** An icon to display in the feedback. */
  icon?: string;
  /** The size of the feedback. */
  size?: "sm" | "md" | "lg";
  /** A custom CSS class to apply to the feedback. */
  customClass?: string;
}

/**
 * Renders a Modus input feedback component.
 * @param {ModusInputFeedbackProps} props - The component props.
 * @returns {JSX.Element} The rendered input feedback component.
 */
const ModusInputFeedback: Component<ModusInputFeedbackProps> = (props) => {
  return (
    <modus-wc-input-feedback
      level={props.level}
      message={props.message ?? ""}
      icon={props.icon}
      size={props.size ?? "md"}
      custom-class={props.customClass ?? ""}
    />
  );
};

export default ModusInputFeedback;
