import { createSignal, type Component } from "solid-js";
import { For } from "solid-js";
import ModusMenuItem from "./ModusMenuItem";

/**
 * Represents a single item in a menu.
 */
export interface MenuItem {
  label: string;
  value: string;
  subLabel?: string;
  startIcon?: string;
  selected?: boolean;
  disabled?: boolean;
  bordered?: boolean;
}

/**
 * Props for the ModusMenu component.
 */
interface ModusMenuProps {
  items: MenuItem[];
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  customClass?: string;
  ariaLabel?: string;
  onItemSelect?: (item: MenuItem) => void;
}

/**
 * Renders a Modus menu component.
 * Selection is tracked internally via per-item itemSelect events.
 * Pass a stable (non-reactive) items array to avoid DOM recreation.
 */
const ModusMenu: Component<ModusMenuProps> = (props) => {
  const initialSelected = props.items.find((i) => i.selected)?.value ?? null;
  const [selectedValue, setSelectedValue] = createSignal<string | null>(initialSelected);

  const handleItemSelect = (e: CustomEvent<{ value: string }>) => {
    const item = props.items.find((i) => i.value === e.detail.value);
    if (item) {
      setSelectedValue(item.value);
      props.onItemSelect?.(item);
    }
  };

  return (
    <modus-wc-menu
      orientation={props.orientation ?? "vertical"}
      size={props.size ?? "md"}
      bordered={props.bordered ?? false}
      custom-class={props.customClass ?? ""}
      aria-label={props.ariaLabel ?? "Menu"}
    >
      <For each={props.items}>
        {(item) => (
          <ModusMenuItem
            label={item.label}
            value={item.value}
            subLabel={item.subLabel}
            startIcon={item.startIcon}
            selected={selectedValue() === item.value}
            disabled={item.disabled}
            bordered={item.bordered}
            onItemSelect={handleItemSelect}
          />
        )}
      </For>
    </modus-wc-menu>
  );
};

export default ModusMenu;
