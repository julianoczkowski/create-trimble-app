import { createSignal, createEffect, onMount, onCleanup, type Component } from "solid-js";
import ModusMenu from "./ModusMenu";
import type { MenuItem } from "./ModusMenu";

type SideNavSize = "sm" | "md" | "lg";

/**
 * Props for the ModusSideNavigation component.
 */
export interface ModusSideNavigationProps {
  items: MenuItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  collapseOnClickOutside?: boolean;
  maxWidth?: string;
  size?: SideNavSize;
  customClass?: string;
  autoCollapseOnSelect?: boolean;
  /** CSS selector for the content element whose margin adjusts when the nav expands. */
  targetContent?: string;
  onExpandedChange?: (expanded: boolean) => void;
  onItemSelect?: (item: MenuItem) => void;
}

/**
 * Renders a Modus side navigation component.
 * Note: `expanded` is set via createEffect (not JSX attribute) so that
 * `targetContent` is always applied first, preventing querySelector('') errors.
 */
const ModusSideNavigation: Component<ModusSideNavigationProps> = (props) => {
  const [internalExpanded, setInternalExpanded] = createSignal(props.defaultExpanded ?? false);
  let navEl: HTMLElement | undefined;

  const isControlled = () => props.expanded !== undefined;
  const currentExpanded = () =>
    isControlled() ? Boolean(props.expanded) : internalExpanded();

  createEffect(() => {
    const nav = navEl as Record<string, unknown> | undefined;
    if (!nav) return;

    nav.targetContent = props.targetContent ?? "[data-side-nav-content]";
    nav.collapseOnClickOutside = props.collapseOnClickOutside ?? true;
    nav.maxWidth = props.maxWidth ?? "256px";
    nav.customClass = props.customClass;

    const expanded = currentExpanded();
    if (nav.expanded !== expanded) {
      nav.expanded = expanded;
    }
  });

  const collapseNavigation = () => {
    const nav = navEl as { expanded?: boolean } | undefined;
    if (!nav) return;
    nav.expanded = false;
    if (!isControlled()) {
      setInternalExpanded(false);
    }
    props.onExpandedChange?.(false);
  };

  const handleItemSelect = (item: MenuItem) => {
    props.onItemSelect?.(item);
    if (props.autoCollapseOnSelect ?? true) {
      collapseNavigation();
    }
  };

  onMount(() => {
    if (!navEl) return;

    const handleExpandedChange = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      const newExpanded = ce.detail;
      if (!isControlled()) {
        setInternalExpanded(newExpanded);
      }
      props.onExpandedChange?.(newExpanded);
    };

    navEl.addEventListener("expandedChange", handleExpandedChange);

    onCleanup(() => {
      navEl?.removeEventListener("expandedChange", handleExpandedChange);
    });
  });

  return (
    <modus-wc-side-navigation
      ref={(el) => (navEl = el as HTMLElement)}
    >
      <ModusMenu
        items={props.items}
        size={props.size ?? "md"}
        orientation="vertical"
        bordered={false}
        onItemSelect={handleItemSelect}
      />
    </modus-wc-side-navigation>
  );
};

export type { MenuItem as ModusSideNavigationItem };
export default ModusSideNavigation;
