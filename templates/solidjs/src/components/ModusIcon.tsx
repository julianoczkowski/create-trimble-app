import type { Component } from "solid-js";

/**
 * Props for the ModusIcon component.
 */
interface ModusIconProps {
  /** The name of the icon to display. */
  name: string;
  /** The size of the icon. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Whether the icon is decorative. */
  decorative?: boolean;
  /** A custom CSS class to apply to the icon. */
  customClass?: string;
  /** The ARIA label for the icon. */
  ariaLabel?: string;
  /** The color of the icon. */
  color?: string;
}

/**
 * Renders a Modus icon component.
 * @param props - The component props.
 * @returns The rendered icon component.
 */
const ModusIcon: Component<ModusIconProps> = (props) => {
  const finalAriaLabel = () =>
    !(props.decorative ?? true) && !props.ariaLabel
      ? `${props.name} icon`
      : props.ariaLabel;

  return (
    <modus-wc-icon
      name={props.name}
      size={props.size ?? "md"}
      decorative={props.decorative ?? true}
      custom-class={props.customClass ?? ""}
      aria-label={finalAriaLabel()}
      style={props.color ? { color: props.color } : undefined}
    />
  );
};

export default ModusIcon;
