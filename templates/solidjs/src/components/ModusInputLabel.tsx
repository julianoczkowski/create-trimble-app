import type { Component, JSX } from "solid-js";

/**
 * Props for the ModusInputLabel component.
 */
interface ModusInputLabelProps {
  /** The ID of the input element this label is for. */
  forId?: string;
  /** The text to display as the label. */
  labelText: string;
  /** The text to display as a sub-label. */
  subLabelText?: string;
  /** Whether the input is required. */
  required?: boolean;
  /** The size of the label. */
  size?: "sm" | "md" | "lg";
  /** A custom CSS class to apply to the label. */
  customClass?: string;
  /** The content to display inside the label. */
  children?: JSX.Element;
}

/**
 * Renders a Modus input label component.
 * @param props - The component props.
 * @returns The rendered input label component.
 */
const ModusInputLabel: Component<ModusInputLabelProps> = (props) => {
  return (
    <modus-wc-input-label
      for-id={props.forId}
      label-text={props.labelText}
      sub-label-text={props.subLabelText}
      required={props.required ?? false}
      size={props.size ?? "md"}
      custom-class={props.customClass ?? ""}
    >
      {props.children}
    </modus-wc-input-label>
  );
};

export default ModusInputLabel;
