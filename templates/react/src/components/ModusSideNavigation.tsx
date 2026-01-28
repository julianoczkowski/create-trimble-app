import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModusWcSideNavigation } from "@trimble-oss/moduswebcomponents-react";
import ModusMenu from "./ModusMenu";
import type { MenuItem } from "./ModusMenu";

type SideNavSize = "sm" | "md" | "lg";

/**
 * Props for the ModusSideNavigation component.
 */
export interface ModusSideNavigationProps {
  /** The items to display in the side navigation. */
  items: MenuItem[];
  /** Whether the side navigation is expanded. */
  expanded?: boolean;
  /** The default expanded state of the side navigation. */
  defaultExpanded?: boolean;
  /** Whether to collapse the side navigation when clicking outside of it. */
  collapseOnClickOutside?: boolean;
  /** The maximum width of the side navigation. */
  maxWidth?: string;
  /** The size of the side navigation. */
  size?: SideNavSize;
  /** A custom CSS class to apply to the side navigation. */
  customClass?: string;
  /** Whether to automatically collapse the side navigation when an item is selected. */
  autoCollapseOnSelect?: boolean;
  /** A callback function to handle expanded state changes. */
  onExpandedChange?: (expanded: boolean) => void;
  /** A callback function to handle item selection. */
  onItemSelect?: (item: MenuItem) => void;
}

/**
 * Renders a Modus side navigation component.
 * @param {ModusSideNavigationProps} props - The component props.
 * @returns {JSX.Element} The rendered side navigation component.
 */
export default function ModusSideNavigation({
  items,
  expanded,
  defaultExpanded = false,
  collapseOnClickOutside = true,
  maxWidth = '256px',
  size = 'md',
  customClass,
  autoCollapseOnSelect = true,
  onExpandedChange,
  onItemSelect,
}: ModusSideNavigationProps) {
  const navRef = useRef<HTMLModusWcSideNavigationElement>(null);
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const currentExpanded = useMemo(
    () => (isControlled ? Boolean(expanded) : internalExpanded),
    [expanded, internalExpanded, isControlled]
  );

  // Synchronize expanded state to the web component
  useEffect(() => {
    const nav = navRef.current;
    if (nav && nav.expanded !== currentExpanded) {
      nav.expanded = currentExpanded;
    }
  }, [currentExpanded]);

  // Keep collapse-on-click-outside and max-width up to date
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    nav.collapseOnClickOutside = collapseOnClickOutside;
    nav.maxWidth = maxWidth;
    if (customClass) {
      nav.customClass = customClass;
    } else {
      nav.customClass = undefined;
    }
  }, [collapseOnClickOutside, maxWidth, customClass]);

  // Handle expanded change events from the component
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const handleExpandedChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const newExpanded = customEvent.detail;

      if (!isControlled) {
        setInternalExpanded(newExpanded);
      }
      onExpandedChange?.(newExpanded);
    };

    nav.addEventListener("expandedChange", handleExpandedChange);

    return () => {
      nav.removeEventListener("expandedChange", handleExpandedChange);
    };
  }, [isControlled, onExpandedChange]);

  const collapseNavigation = useCallback(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    nav.expanded = false;
    if (!isControlled) {
      setInternalExpanded(false);
    }
    onExpandedChange?.(false);
  }, [isControlled, onExpandedChange]);

  const handleItemSelect = useCallback(
    (item: MenuItem) => {
      onItemSelect?.(item);
      if (autoCollapseOnSelect) {
        collapseNavigation();
      }
    },
    [autoCollapseOnSelect, collapseNavigation, onItemSelect]
  );

  return (
    <ModusWcSideNavigation
      ref={navRef}
      custom-class={customClass}
      collapseOnClickOutside={collapseOnClickOutside}
      expanded={currentExpanded}
      maxWidth={maxWidth}
    >
      <ModusMenu
        items={items}
        size={size}
        orientation="vertical"
        bordered={false}
        onItemSelect={handleItemSelect}
      />
    </ModusWcSideNavigation>
  );
}

export type { MenuItem as ModusSideNavigationItem };
