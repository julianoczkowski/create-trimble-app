import { Children, forwardRef, useMemo } from "react";
import type { ReactNode } from "react";
import { ModusWcTooltip } from "@trimble-oss/moduswebcomponents-react";

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
  children?: ReactNode;
}

/**
 * Renders a Modus tooltip component.
 * @param {ModusTooltipProps} props - The component props.
 * @param {React.Ref<HTMLModusWcTooltipElement>} ref - The ref object for the tooltip.
 * @returns {JSX.Element} The rendered tooltip component.
 */
const ModusTooltip = forwardRef<HTMLModusWcTooltipElement, ModusTooltipProps>(
  (
    {
      content,
      position = "auto",
      disabled = false,
      forceOpen = false,
      tooltipId,
      customClass,
      className,
      children,
    },
    ref
  ) => {
    /**
     * Normalizes children to ensure proper tooltip behavior.
     *
     * This memoized function handles different child scenarios:
     * - No children: Returns null
     * - Single child: Returns the child as-is
     * - Multiple children: Wraps them in a span with proper styling
     *
     * The normalization ensures that the tooltip can properly attach to
     * the child element(s) and handle hover events correctly.
     *
     * @returns {ReactNode | null} The normalized child element(s)
     * @private
     */
    const normalizedChild = useMemo(() => {
      const childArray = Children.toArray(children);
      if (childArray.length === 0) {
        return null;
      }
      if (childArray.length === 1) {
        return childArray[0];
      }
      return (
        <span className="inline-flex items-center gap-1">{childArray}</span>
      );
    }, [children]);

    const combinedClass =
      [customClass, className].filter(Boolean).join(" ") || undefined;

    return (
      <ModusWcTooltip
        ref={ref}
        content={content}
        position={position}
        disabled={disabled}
        force-open={forceOpen}
        tooltip-id={tooltipId}
        custom-class={combinedClass}
      >
        {normalizedChild}
      </ModusWcTooltip>
    );
  }
);

ModusTooltip.displayName = "ModusTooltip";

export default ModusTooltip;
