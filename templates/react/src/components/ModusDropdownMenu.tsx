import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcDropdownMenu } from "@trimble-oss/moduswebcomponents-react";
import ModusMenuItem from "./ModusMenuItem";
import type { MenuItem } from "./ModusMenu";

/**
 * Props for the ModusDropdownMenu component.
 */
export interface ModusDropdownMenuProps {
  /** The content to display inside the dropdown menu. */
  children?: ReactNode;
  /** The items to display in the dropdown menu. */
  menuItems?: MenuItem[];
  /** The color of the dropdown button. */
  buttonColor?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
  /** The size of the dropdown button. */
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  /** The variant of the dropdown button. */
  buttonVariant?: 'filled' | 'outlined' | 'borderless';
  /** A custom CSS class to apply to the dropdown menu. */
  customClass?: string;
  /** Whether the dropdown menu is disabled. */
  disabled?: boolean;
  /** Whether the dropdown menu has a border. */
  menuBordered?: boolean;
  /** The offset of the dropdown menu from the button. */
  menuOffset?: number;
  /** The placement of the dropdown menu. */
  menuPlacement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
  /** The size of the dropdown menu. */
  menuSize?: 'sm' | 'md' | 'lg';
  /** Whether the dropdown menu is visible. */
  menuVisible?: boolean;
  /** The content to display inside the dropdown button. */
  buttonContent?: ReactNode;
  /** A callback function to handle menu visibility changes. */
  onMenuVisibilityChange?: (event: CustomEvent<{ isVisible: boolean }>) => void;
  /** A callback function to handle item selection. */
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * Renders a Modus dropdown menu component.
 * @param {ModusDropdownMenuProps} props - The component props.
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
export default function ModusDropdownMenu({
  children,
  menuItems,
  buttonColor = 'primary',
  buttonSize = 'md',
  buttonVariant = 'filled',
  customClass,
  disabled = false,
  menuBordered = true,
  menuOffset = 10,
  menuPlacement = 'bottom-start',
  menuSize = 'md',
  menuVisible = false,
  buttonContent,
  onMenuVisibilityChange,
  onItemSelect,
}: ModusDropdownMenuProps) {
  const dropdownRef = useRef<HTMLModusWcDropdownMenuElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const handleMenuVisibilityChange = (event: Event) => {
      onMenuVisibilityChange?.(event as CustomEvent<{ isVisible: boolean }>);
    };
    const handleItemSelect = (event: Event) => {
      onItemSelect?.(event as CustomEvent<{ value: string }>);

      // Close the menu after item selection
      const dropdown = dropdownRef.current;
      if (dropdown) {
        dropdown.menuVisible = false;
      }
    };

    if (onMenuVisibilityChange)
      dropdown.addEventListener(
        "menuVisibilityChange",
        handleMenuVisibilityChange
      );
    if (onItemSelect) dropdown.addEventListener("itemSelect", handleItemSelect);

    return () => {
      if (onMenuVisibilityChange)
        dropdown.removeEventListener(
          "menuVisibilityChange",
          handleMenuVisibilityChange
        );
      if (onItemSelect)
        dropdown.removeEventListener("itemSelect", handleItemSelect);
    };
  }, [onMenuVisibilityChange, onItemSelect]);

  return (
    <ModusWcDropdownMenu
      ref={dropdownRef}
      buttonColor={buttonColor}
      buttonSize={buttonSize}
      buttonVariant={buttonVariant}
      customClass={customClass}
      disabled={disabled}
      menuBordered={menuBordered}
      menuOffset={menuOffset}
      menuPlacement={menuPlacement}
      menuSize={menuSize}
      menuVisible={menuVisible}
    >
      {buttonContent && <div slot="button">{buttonContent}</div>}
      <div slot="menu">
        {menuItems
          ? menuItems.map((item) => (
              <ModusMenuItem
                key={item.value}
                label={item.label}
                value={item.value}
                subLabel={item.subLabel}
                startIcon={item.startIcon}
                selected={item.selected}
                disabled={item.disabled}
                bordered={item.bordered}
                onItemSelect={onItemSelect}
              />
            ))
          : children}
      </div>
    </ModusWcDropdownMenu>
  );
}
