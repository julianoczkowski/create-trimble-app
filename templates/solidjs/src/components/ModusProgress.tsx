import { createMemo, Show, type Component } from "solid-js";
import type { JSX } from "solid-js";

/**
 * Props for the ModusProgress component.
 */
interface ModusProgressProps {
  variant?: "default" | "radial";
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  customClass?: string;
  ariaLabel?: string;
  children?: JSX.Element;
}

/**
 * Renders a Modus progress component.
 * @param {ModusProgressProps} props - The component props.
 * @returns {JSX.Element} The rendered progress component.
 */
const ModusProgress: Component<ModusProgressProps> = (props) => {
  const normalizedValue = createMemo(() => {
    if (props.indeterminate) return undefined;
    const max = props.max ?? 100;
    if (max <= 0) return 0;
    const value = props.value ?? 0;
    const clampedValue = Math.min(Math.max(value, 0), max);
    return Number.isFinite(clampedValue) ? clampedValue : 0;
  });

  return (
    <modus-wc-progress
      variant={props.variant ?? "default"}
      value={normalizedValue()}
      max={props.max ?? 100}
      indeterminate={props.indeterminate ?? false}
      label={props.label ?? ""}
      custom-class={props.customClass ?? ""}
      aria-label={props.ariaLabel ?? "Progress status"}
    >
      <Show when={props.variant === "radial" && props.children}>{props.children}</Show>
    </modus-wc-progress>
  );
};

export default ModusProgress;
