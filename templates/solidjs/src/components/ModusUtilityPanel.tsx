import { createEffect, onMount, createMemo, type Component } from "solid-js";
import type { JSX } from "solid-js";
import { Show } from "solid-js";

type UtilityPanelPosition = "left" | "right";

/**
 * Props for the ModusUtilityPanel component.
 */
export interface ModusUtilityPanelProps {
  expanded?: boolean;
  position?: UtilityPanelPosition;
  pushContent?: boolean;
  panelWidth?: string;
  className?: string;
  children?: JSX.Element;
  headerSlot?: JSX.Element;
  headerText?: string;
  footerSlot?: JSX.Element;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  onPanelOpened?: () => void;
  onPanelClosed?: () => void;
  onToggle?: (collapsed: boolean) => void;
  targetSelector?: string;
  targetElement?: HTMLElement | null;
}

/**
 * Renders a Modus utility panel component.
 * @param {ModusUtilityPanelProps} props - The component props.
 * @returns {JSX.Element} The rendered utility panel component.
 */
const ModusUtilityPanel: Component<ModusUtilityPanelProps> = (props) => {
  let panelEl: HTMLElement | undefined;

  const resolvedTarget = createMemo(() => {
    if (props.targetElement) return props.targetElement;
    if (typeof document === "undefined") return undefined;
    if (props.targetSelector) {
      return document.querySelector<HTMLElement>(props.targetSelector) ?? undefined;
    }
    return undefined;
  });

  onMount(() => {
    return () => {
      const target = resolvedTarget();
      if (target) {
        target.classList.remove("modus-wc-utility-panel-push-target-left");
      }
    };
  });

  createEffect(() => {
    const panel = panelEl as {
      expanded?: boolean;
      pushContent?: boolean;
      targetElement?: HTMLElement;
    } | undefined;
    if (!panel) return;

    const target = resolvedTarget();

    panel.expanded = props.expanded ?? false;
    panel.pushContent = props.pushContent ?? false;
    panel.targetElement = target ?? undefined;

    if (target) {
      if (props.position === "left" && props.pushContent) {
        target.classList.add("modus-wc-utility-panel-push-target-left");
      } else {
        target.classList.remove("modus-wc-utility-panel-push-target-left");
      }
    }
  });

  const handlePanelOpened = () => {
    props.onPanelOpened?.();
    props.onToggle?.(false);
  };

  const handlePanelClosed = () => {
    props.onPanelClosed?.();
    props.onToggle?.(true);
  };

  createEffect(() => {
    const panel = panelEl;
    if (!panel) return;

    panel.addEventListener("panelOpened", handlePanelOpened);
    panel.addEventListener("panelClosed", handlePanelClosed);

    return () => {
      panel.removeEventListener("panelOpened", handlePanelOpened);
      panel.removeEventListener("panelClosed", handlePanelClosed);
    };
  });

  const positionClass = props.position === "left" ? "modus-utility-panel--left" : undefined;
  const combinedClass = [props.className, positionClass].filter(Boolean).join(" ") || undefined;
  const style = props.panelWidth
    ? ({ "--modus-wc-utility-panel-width": props.panelWidth } as Record<string, string>)
    : undefined;

  const renderedHeader = () =>
    props.headerSlot ??
    (props.headerText ? (
      <div class="text-xl font-bold text-foreground">{props.headerText}</div>
    ) : null);

  return (
    <modus-wc-utility-panel
      ref={(el) => (panelEl = el as HTMLElement)}
      expanded={props.expanded ?? false}
      pushContent={props.pushContent ?? false}
      class={combinedClass}
      aria-label={props.ariaLabel}
      aria-expanded={props.ariaExpanded}
      style={style}
    >
      <Show when={renderedHeader()}>
        <div slot="header" class="w-full min-w-full max-w-full block">
          {renderedHeader()}
        </div>
      </Show>
      <div slot="body">{props.children}</div>
      <Show when={props.footerSlot}>
        <div slot="footer" class="w-full min-w-full max-w-full block">
          {props.footerSlot}
        </div>
      </Show>
    </modus-wc-utility-panel>
  );
};

export default ModusUtilityPanel;
