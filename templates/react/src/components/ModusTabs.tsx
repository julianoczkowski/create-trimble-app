import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { ModusWcTabs } from "@trimble-oss/moduswebcomponents-react";

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
  iconPosition?: 'left' | 'right';
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
  panels: ReactNode[];
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
 * @param {ModusTabsProps} props - The component props.
 * @returns {JSX.Element} The rendered tabs component.
 */
export default function ModusTabs({
  tabs = [],
  panels = [],
  activeTabIndex = 0,
  size = 'md',
  tabStyle = 'bordered',
  customClass,
  ariaLabel = 'Tabs navigation',
  onTabChange,
}: ModusTabsProps) {
  const tabsRef = useRef<HTMLModusWcTabsElement>(null);

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (!tabsElement) {
      return;
    }

    tabsElement.activeTabIndex = activeTabIndex;
  }, [activeTabIndex]);

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (!tabsElement) {
      return;
    }

    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        previousTab: number;
        newTab: number;
      }>;
      onTabChange?.(customEvent.detail);
    };

    if (onTabChange) {
      tabsElement.addEventListener("tabChange", handleTabChange);
    }

    return () => {
      if (onTabChange) {
        tabsElement.removeEventListener("tabChange", handleTabChange);
      }
    };
  }, [onTabChange]);

  return (
    <ModusWcTabs
      ref={tabsRef}
      size={size}
      tabStyle={tabStyle}
      custom-class={customClass}
      active-tab-index={activeTabIndex}
      aria-label={ariaLabel}
      tabs={tabs}
    >
      {panels.map((panel, index) => (
        <div key={`tab-panel-${index}`} slot={`tab-${index}`}>
          {panel}
        </div>
      ))}
    </ModusWcTabs>
  );
}
