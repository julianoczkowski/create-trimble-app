import { useEffect, useRef, useState, useCallback } from "react";
import { ModusWcMenu } from "@trimble-oss/moduswebcomponents-react";
import ModusMenuItem from "./ModusMenuItem";

/**
 * Represents a single item in a menu.
 */
export interface MenuItem {
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
}

/**
 * Props for the ModusMenu component.
 */
interface ModusMenuProps {
  /** The items to display in the menu. */
  items: MenuItem[];
  /** The orientation of the menu. */
  orientation?: 'vertical' | 'horizontal';
  /** The size of the menu. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the menu has a border. */
  bordered?: boolean;
  /** A custom CSS class to apply to the menu. */
  customClass?: string;
  /** The ARIA label for the menu. */
  ariaLabel?: string;
  /** A callback function to handle item selection. */
  onItemSelect?: (item: MenuItem) => void;
}

/**
 * Renders a Modus menu component.
 * @param {ModusMenuProps} props - The component props.
 * @returns {JSX.Element} The rendered menu component.
 */
export default function ModusMenu({
  items,
  orientation = 'vertical',
  size = 'md',
  bordered = false,
  customClass = '',
  ariaLabel = 'Menu',
  onItemSelect,
}: ModusMenuProps) {
  const menuRef = useRef<HTMLModusWcMenuElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  // Handle item selection
  const handleItemSelect = useCallback(
    (event: CustomEvent<{ value: string }>) => {
      const selectedItem = items.find(
        (item) => item.value === event.detail.value
      );
      if (selectedItem) {
        setSelectedValue(selectedItem.value);
        onItemSelect?.(selectedItem);
      }
    },
    [items, onItemSelect]
  );

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    menu.addEventListener("itemSelect", handleItemSelect as EventListener);

    return () => {
      menu.removeEventListener("itemSelect", handleItemSelect as EventListener);
    };
  }, [items, onItemSelect, handleItemSelect]);

  // Initialize selected value from items
  useEffect(() => {
    const selectedItem = items.find((item) => item.selected);
    if (selectedItem) {
      setSelectedValue(selectedItem.value);
    }
  }, [items]);

  return (
    <ModusWcMenu
      ref={menuRef}
      orientation={orientation}
      size={size}
      bordered={bordered}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <ModusMenuItem
          key={`${item.value}-${index}`}
          label={item.label}
          value={item.value}
          subLabel={item.subLabel}
          startIcon={item.startIcon}
          selected={selectedValue === item.value || item.selected}
          disabled={item.disabled}
          bordered={item.bordered}
          onItemSelect={handleItemSelect}
        />
      ))}
    </ModusWcMenu>
  );
}
