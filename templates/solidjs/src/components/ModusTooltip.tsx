import { children, type Component, type JSX } from "solid-js";

export type TooltipPosition = "auto" | "top" | "bottom" | "left" | "right";

/**
 * Props for the ModusTooltip component.
 */
export interface ModusTooltipProps {
  /** The text to display in the tooltip. */
  content: string;
  /** The position of the tooltip. */
  position?: TooltipPosition;
  /** Whether the tooltip is disabled. */
  disabled?: boolean;
  /** Whether to force the tooltip to be open. */
  forceOpen?: boolean;
  /** A unique identifier for the tooltip. */
  tooltipId?: string;
  /** A custom CSS class to apply to the tooltip. */
  customClass?: string;
  /** A CSS class to apply to the tooltip. */
  className?: string;
  /** The content to display as the tooltip's target. */
  children?: JSX.Element;
}

/**
 * Renders a Modus tooltip component.
 * @param props - The component props.
 * @returns The rendered tooltip component.
 */
const ModusTooltip: Component<ModusTooltipProps> = (props) => {
  const resolved = children(() => props.children);
  const normalizedChild = () => {
    const c = resolved();
    if (c == null) return null;
    const arr = Array.isArray(c) ? c : [c];
    if (arr.length === 0) return null;
    if (arr.length === 1) return arr[0] as JSX.Element;
    return <div class="inline-flex items-center gap-1">{arr as JSX.Element[]}</div>;
  };

  const combinedClass = () =>
    [props.customClass, props.className].filter(Boolean).join(" ") || undefined;

  return (
    <modus-wc-tooltip
      content={props.content}
      position={props.position ?? "auto"}
      disabled={props.disabled ?? false}
      force-open={props.forceOpen ?? false}
      tooltip-id={props.tooltipId}
      custom-class={combinedClass()}
    >
      {normalizedChild()}
    </modus-wc-tooltip>
  );
};

export default ModusTooltip;
