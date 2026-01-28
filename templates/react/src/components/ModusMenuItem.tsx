import { useEffect, useRef } from "react";
import { ModusWcMenuItem } from "@trimble-oss/moduswebcomponents-react";

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
  size?: 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the menu item. */
  customClass?: string;
  /** A callback function to handle item selection. */
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * Renders a Modus menu item component.
 * @param {ModusMenuItemProps} props - The component props.
 * @returns {JSX.Element} The rendered menu item component.
 */
export default function ModusMenuItem({
  label,
  value,
  subLabel,
  startIcon,
  selected = false,
  disabled = false,
  bordered = false,
  focused = false,
  size = 'md',
  customClass,
  onItemSelect,
}: ModusMenuItemProps) {
  const menuItemRef = useRef<HTMLModusWcMenuItemElement>(null);

  useEffect(() => {
    const menuItem = menuItemRef.current;
    if (!menuItem) return;

    const handleItemSelect = (event: Event) => {
      onItemSelect?.(event as CustomEvent<{ value: string }>);
    };

    if (onItemSelect) {
      menuItem.addEventListener("itemSelect", handleItemSelect);
    }

    return () => {
      if (onItemSelect) {
        menuItem.removeEventListener("itemSelect", handleItemSelect);
      }
    };
  }, [onItemSelect]);

  return (
    <ModusWcMenuItem
      ref={menuItemRef}
      label={label}
      value={value}
      sub-label={subLabel}
      start-icon={startIcon}
      selected={selected}
      disabled={disabled}
      bordered={bordered}
      focused={focused}
      size={size}
      custom-class={customClass}
    />
  );
}
