import { createEffect } from "solid-js";
import type { Component } from "solid-js";

/**
 * Props for the ModusMenuItem component.
 */
export interface ModusMenuItemProps {
  /** The text to display for the menu item. */
  label: string;
  /** The value of the menu item. */
  value: string;
  /** The text to display as a sub-label. */
  subLabel?: string;
  /** An icon to display at the start of the menu item. */
  startIcon?: string;
  /** Whether the menu item is selected. */
  selected?: boolean;
  /** Whether the menu item is disabled. */
  disabled?: boolean;
  /** Whether the menu item has a border. */
  bordered?: boolean;
  /** Whether the menu item is focused. */
  focused?: boolean;
  /** The size of the menu item. */
  size?: "sm" | "md" | "lg";
  /** A custom CSS class to apply to the menu item. */
  customClass?: string;
  /** A callback function to handle item selection. */
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * Renders a Modus menu item component.
 * @param props - The component props.
 * @returns The rendered menu item component.
 */
const ModusMenuItem: Component<ModusMenuItemProps> = (props) => {
  let menuItemEl: HTMLModusWcMenuItemElement | undefined;

  createEffect(() => {
    const menuItem = menuItemEl;
    if (!menuItem) return;

    const handleItemSelect = (event: Event) => {
      props.onItemSelect?.(event as CustomEvent<{ value: string }>);
    };

    if (props.onItemSelect) {
      menuItem.addEventListener("itemSelect", handleItemSelect);
    }

    return () => {
      if (props.onItemSelect) {
        menuItem.removeEventListener("itemSelect", handleItemSelect);
      }
    };
  });

  return (
    <modus-wc-menu-item
      ref={(el) => (menuItemEl = el)}
      label={props.label}
      value={props.value}
      sub-label={props.subLabel}
      start-icon={props.startIcon}
      selected={props.selected ?? false}
      disabled={props.disabled ?? false}
      bordered={props.bordered ?? false}
      focused={props.focused ?? false}
      size={props.size ?? "md"}
      custom-class={props.customClass}
    />
  );
};

export default ModusMenuItem;
