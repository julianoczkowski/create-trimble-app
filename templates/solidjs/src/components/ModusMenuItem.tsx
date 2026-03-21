import { createEffect, Show } from "solid-js";
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
  /** An icon name to display at the start of the menu item (uses start-icon slot). */
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
 * Icons are rendered into the `start-icon` slot (the web component uses a named slot, not a prop).
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
      attr:label={props.label}
      attr:value={props.value}
      attr:sub-label={props.subLabel}
      attr:selected={props.selected ? "" : undefined}
      attr:disabled={props.disabled ? "" : undefined}
      attr:bordered={props.bordered ? "" : undefined}
      attr:focused={props.focused ? "" : undefined}
      attr:size={props.size ?? "md"}
      attr:custom-class={props.customClass}
    >
      <Show when={props.startIcon}>
        <i class="modus-icons" slot="start-icon">{props.startIcon}</i>
      </Show>
    </modus-wc-menu-item>
  );
};

export default ModusMenuItem;
