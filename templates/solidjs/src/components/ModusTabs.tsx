import { createEffect, For } from "solid-js";
import type { Component, JSX } from "solid-js";

export type ModusTabsStyle = "bordered" | "boxed" | "lifted" | "none";
export type ModusTabsSize = "sm" | "md" | "lg";

/**
 * Represents a single tab in a tabs component.
 */
export interface ModusTab {
  /** The label for the tab. */
  label?: string;
  /** An icon to display in the tab. */
  icon?: string;
  /** The position of the icon relative to the label. */
  iconPosition?: "left" | "right";
  /** Whether the tab is disabled. */
  disabled?: boolean;
  /** A custom CSS class to apply to the tab. */
  customClass?: string;
}

/**
 * Props for the ModusTabs component.
 */
export interface ModusTabsProps {
  /** The tabs to display. */
  tabs: ModusTab[];
  /** The content panels for each tab. */
  panels: JSX.Element[];
  /** The index of the initially active tab. */
  activeTabIndex?: number;
  /** The size of the tabs. */
  size?: ModusTabsSize;
  /** The style of the tabs. */
  tabStyle?: ModusTabsStyle;
  /** A custom CSS class to apply to the tabs component. */
  customClass?: string;
  /** The ARIA label for the tabs component. */
  ariaLabel?: string;
  /** A callback function to handle tab changes. */
  onTabChange?: (detail: { previousTab: number; newTab: number }) => void;
}

/**
 * Renders a Modus tabs component.
 * @param props - The component props.
 * @returns The rendered tabs component.
 */
const ModusTabs: Component<ModusTabsProps> = (props) => {
  let tabsEl: HTMLModusWcTabsElement | undefined;

  createEffect(() => {
    const tabsElement = tabsEl;
    if (!tabsElement) return;

    tabsElement.activeTabIndex = props.activeTabIndex ?? 0;
  });

  createEffect(() => {
    const tabsElement = tabsEl;
    if (!tabsElement) return;

    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        previousTab: number;
        newTab: number;
      }>;
      props.onTabChange?.(customEvent.detail);
    };

    if (props.onTabChange) {
      tabsElement.addEventListener("tabChange", handleTabChange);
    }

    return () => {
      if (props.onTabChange) {
        tabsElement.removeEventListener("tabChange", handleTabChange);
      }
    };
  });

  return (
    <modus-wc-tabs
      ref={(el) => (tabsEl = el)}
      size={props.size ?? "md"}
      tabStyle={props.tabStyle ?? "bordered"}
      custom-class={props.customClass}
      active-tab-index={props.activeTabIndex ?? 0}
      aria-label={props.ariaLabel ?? "Tabs navigation"}
      tabs={props.tabs ?? []}
    >
      <For each={props.panels ?? []}>
        {(panel, index) => (
          <div slot={`tab-${index()}`}>{panel}</div>
        )}
      </For>
    </modus-wc-tabs>
  );
};

export default ModusTabs;
