import { createEffect } from "solid-js";
import type { Component, JSX } from "solid-js";

/**
 * Props for the ModusChip component.
 */
export interface ModusChipProps {
  /** The content to display inside the chip. */
  children?: JSX.Element;
  /** Whether the chip is active. */
  active?: boolean;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** Whether the chip has an error. */
  hasError?: boolean;
  /** The label for the chip. */
  label?: string;
  /** Whether to show the remove button. */
  showRemove?: boolean;
  /** The size of the chip. */
  size?: "sm" | "md" | "lg";
  /** The variant of the chip. */
  variant?: "filled" | "outline";
  /** A custom CSS class to apply to the chip. */
  customClass?: string;
  /** The ARIA label for the chip. */
  "aria-label"?: string;
  /** A callback function to handle chip clicks. */
  onChipClick?: (event: CustomEvent<MouseEvent | KeyboardEvent>) => void;
  /** A callback function to handle chip removal. */
  onChipRemove?: (event: CustomEvent<MouseEvent | KeyboardEvent>) => void;
}

/**
 * Renders a Modus chip component.
 * @param props - The component props.
 * @returns The rendered chip component.
 */
const ModusChip: Component<ModusChipProps> = (props) => {
  let chipEl: HTMLModusWcChipElement | undefined;

  createEffect(() => {
    const chip = chipEl;
    if (!chip) return;

    const handleChipClick = (event: Event) => {
      props.onChipClick?.(event as CustomEvent<MouseEvent | KeyboardEvent>);
    };
    const handleChipRemove = (event: Event) => {
      props.onChipRemove?.(event as CustomEvent<MouseEvent | KeyboardEvent>);
    };

    if (props.onChipClick)
      chip.addEventListener("chipClick", handleChipClick);
    if (props.onChipRemove)
      chip.addEventListener("chipRemove", handleChipRemove);

    return () => {
      if (props.onChipClick)
        chip.removeEventListener("chipClick", handleChipClick);
      if (props.onChipRemove)
        chip.removeEventListener("chipRemove", handleChipRemove);
    };
  });

  return (
    <modus-wc-chip
      ref={(el) => (chipEl = el)}
      active={props.active ?? false}
      disabled={props.disabled ?? false}
      hasError={props.hasError ?? false}
      label={props.label ?? ""}
      showRemove={props.showRemove ?? false}
      size={props.size ?? "md"}
      variant={props.variant ?? "filled"}
      customClass={props.customClass}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </modus-wc-chip>
  );
};

export default ModusChip;
