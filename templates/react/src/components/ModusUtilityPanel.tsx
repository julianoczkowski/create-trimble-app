import { useCallback, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import { ModusWcUtilityPanel } from "@trimble-oss/moduswebcomponents-react";

type UtilityPanelPosition = "left" | "right";

/**
 * Props for the ModusUtilityPanel component.
 */
export interface ModusUtilityPanelProps {
  /** Whether the utility panel is expanded. */
  expanded?: boolean;
  /** The position of the utility panel. */
  position?: UtilityPanelPosition;
  /** Whether the utility panel should push the content. */
  pushContent?: boolean;
  /** The width of the utility panel. */
  panelWidth?: string;
  /** A CSS class to apply to the utility panel. */
  className?: string;
  /** The main content of the utility panel. */
  children?: React.ReactNode;
  /** The content to display in the header slot. */
  headerSlot?: React.ReactNode;
  /** The text to display in the header. */
  headerText?: string;
  /** The content to display in the footer slot. */
  footerSlot?: React.ReactNode;
  /** The ARIA label for the utility panel. */
  ariaLabel?: string;
  /** The ARIA expanded state of the utility panel. */
  ariaExpanded?: boolean;
  /** A callback function to handle the panel opened event. */
  onPanelOpened?: () => void;
  /** A callback function to handle the panel closed event. */
  onPanelClosed?: () => void;
  /** A callback function to handle the toggle event. */
  onToggle?: (collapsed: boolean) => void;
  /** A CSS selector for the target element to push. */
  targetSelector?: string;
  /** The target element to push. */
  targetElement?: HTMLElement | null;
}

/**
 * Renders a Modus utility panel component.
 * @param {ModusUtilityPanelProps} props - The component props.
 * @returns {JSX.Element} The rendered utility panel component.
 */
export default function ModusUtilityPanel({
  expanded = false,
  position = "right",
  pushContent = false,
  panelWidth = "312px",
  className,
  children,
  headerSlot,
  headerText,
  footerSlot,
  ariaLabel,
  ariaExpanded,
  onPanelOpened,
  onPanelClosed,
  onToggle,
  targetSelector,
  targetElement,
}: ModusUtilityPanelProps) {
  const panelRef = useRef<HTMLModusWcUtilityPanelElement>(null);

  /**
   * Resolves the target element for content pushing functionality.
   *
   * This memoized function determines which element should be pushed when
   * the utility panel is expanded. It checks for targetElement first,
   * then falls back to querying the DOM using targetSelector.
   *
   * @returns {HTMLElement | undefined} The resolved target element or undefined
   * @private
   */
  const resolvedTarget = useMemo(() => {
    if (targetElement) return targetElement;
    if (typeof document === "undefined") return undefined;
    if (targetSelector) {
      return document.querySelector<HTMLElement>(targetSelector) ?? undefined;
    }
    return undefined;
  }, [targetElement, targetSelector]);

  useEffect(() => {
    return () => {
      if (resolvedTarget) {
        resolvedTarget.classList.remove(
          "modus-wc-utility-panel-push-target-left"
        );
      }
    };
  }, [resolvedTarget]);
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    panel.expanded = expanded;
    panel.pushContent = pushContent;
    panel.targetElement = resolvedTarget;

    if (resolvedTarget) {
      if (position === "left" && pushContent) {
        resolvedTarget.classList.add("modus-wc-utility-panel-push-target-left");
      } else {
        resolvedTarget.classList.remove(
          "modus-wc-utility-panel-push-target-left"
        );
      }
    }
  }, [expanded, pushContent, resolvedTarget, position]);

  /**
   * Handles the panel opened event and updates state accordingly.
   *
   * This callback is triggered when the utility panel opens and calls
   * the appropriate event handlers while updating the toggle state.
   *
   * @private
   */
  const handlePanelOpened = useCallback(() => {
    onPanelOpened?.();
    onToggle?.(false);
  }, [onPanelOpened, onToggle]);

  /**
   * Handles the panel closed event and updates state accordingly.
   *
   * This callback is triggered when the utility panel closes and calls
   * the appropriate event handlers while updating the toggle state.
   *
   * @private
   */
  const handlePanelClosed = useCallback(() => {
    onPanelClosed?.();
    onToggle?.(true);
  }, [onPanelClosed, onToggle]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    panel.addEventListener("panelOpened", handlePanelOpened);
    panel.addEventListener("panelClosed", handlePanelClosed);

    return () => {
      panel.removeEventListener("panelOpened", handlePanelOpened);
      panel.removeEventListener("panelClosed", handlePanelClosed);
    };
  }, [handlePanelClosed, handlePanelOpened]);

  const positionClass =
    position === "left" ? "modus-utility-panel--left" : undefined;

  const combinedClass =
    [className, positionClass].filter(Boolean).join(" ") || undefined;

  const style = useMemo<CSSProperties | undefined>(() => {
    if (!panelWidth) return undefined;
    return {
      "--modus-wc-utility-panel-width": panelWidth,
    } as CSSProperties;
  }, [panelWidth]);

  const renderedHeader =
    headerSlot ??
    (headerText ? (
      <div className="text-xl font-bold text-foreground">{headerText}</div>
    ) : null);

  return (
    <ModusWcUtilityPanel
      ref={panelRef}
      expanded={expanded}
      pushContent={pushContent}
      className={combinedClass}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      style={style}
    >
      {renderedHeader && (
        <div slot="header" className="w-full min-w-full max-w-full block">
          {renderedHeader}
        </div>
      )}
      <div slot="body">{children}</div>
      {footerSlot && (
        <div slot="footer" className="w-full min-w-full max-w-full block">
          {footerSlot}
        </div>
      )}
    </ModusWcUtilityPanel>
  );
}
