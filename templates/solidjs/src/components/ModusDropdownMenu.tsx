import { onMount, onCleanup, type Component } from "solid-js";
import type { JSX } from "solid-js";
import { Show, For } from "solid-js";
import ModusMenuItem from "./ModusMenuItem";
import type { MenuItem } from "./ModusMenu";

/**
 * Props for the ModusDropdownMenu component.
 */
export interface ModusDropdownMenuProps {
  children?: JSX.Element;
  menuItems?: MenuItem[];
  /** Reactively controls which item appears selected without replacing the items array. */
  selectedValue?: string;
  buttonColor?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  buttonSize?: "xs" | "sm" | "md" | "lg";
  buttonVariant?: "filled" | "outlined" | "borderless";
  customClass?: string;
  disabled?: boolean;
  menuBordered?: boolean;
  menuOffset?: number;
  menuPlacement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  menuSize?: "sm" | "md" | "lg";
  menuVisible?: boolean;
  buttonContent?: JSX.Element;
  onMenuVisibilityChange?: (event: CustomEvent<{ isVisible: boolean }>) => void;
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * Renders a Modus dropdown menu component.
 * @param {ModusDropdownMenuProps} props - The component props.
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
const ModusDropdownMenu: Component<ModusDropdownMenuProps> = (props) => {
  let dropdownEl: HTMLElement | undefined;

  onMount(() => {
    if (!dropdownEl) return;

    const handleMenuVisibilityChange = (e: Event) =>
      props.onMenuVisibilityChange?.(e as CustomEvent<{ isVisible: boolean }>);
    const handleItemSelect = (e: Event) => {
      props.onItemSelect?.(e as CustomEvent<{ value: string }>);
      const el = dropdownEl as { menuVisible?: boolean } | undefined;
      if (el) el.menuVisible = false;
    };

    if (props.onMenuVisibilityChange) {
      dropdownEl.addEventListener("menuVisibilityChange", handleMenuVisibilityChange);
    }
    if (props.onItemSelect) {
      dropdownEl.addEventListener("itemSelect", handleItemSelect);
    }

    onCleanup(() => {
      if (props.onMenuVisibilityChange) {
        dropdownEl?.removeEventListener("menuVisibilityChange", handleMenuVisibilityChange);
      }
      if (props.onItemSelect) {
        dropdownEl?.removeEventListener("itemSelect", handleItemSelect);
      }
    });
  });

  return (
    <modus-wc-dropdown-menu
      ref={(el) => (dropdownEl = el as HTMLElement)}
      buttonColor={props.buttonColor ?? "primary"}
      buttonSize={props.buttonSize ?? "md"}
      buttonVariant={props.buttonVariant ?? "filled"}
      customClass={props.customClass}
      disabled={props.disabled ?? false}
      menuBordered={props.menuBordered ?? true}
      menuOffset={props.menuOffset ?? 10}
      menuPlacement={props.menuPlacement ?? "bottom-start"}
      menuSize={props.menuSize ?? "md"}
      menuVisible={props.menuVisible ?? false}
    >
      <Show when={props.buttonContent}>
        <div slot="button">{props.buttonContent}</div>
      </Show>
      <div slot="menu">
        <Show
          when={props.menuItems}
          fallback={props.children}
        >
          <For each={props.menuItems}>
            {(item) => (
              <ModusMenuItem
                label={item.label}
                value={item.value}
                subLabel={item.subLabel}
                startIcon={item.startIcon}
                selected={
                  props.selectedValue != null
                    ? props.selectedValue === item.value
                    : (item.selected ?? false)
                }
                disabled={item.disabled}
                bordered={item.bordered}
              />
            )}
          </For>
        </Show>
      </div>
    </modus-wc-dropdown-menu>
  );
};

export default ModusDropdownMenu;
