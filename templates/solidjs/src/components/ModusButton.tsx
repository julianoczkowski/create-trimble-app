import type { Component, JSX } from "solid-js";

/**
 * Props for the ModusButton component.
 */
interface ModusButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "rectangle" | "square" | "circle";
  disabled?: boolean;
  fullWidth?: boolean;
  pressed?: boolean;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element;
  icon?: string;
  iconPosition?: "left" | "right" | "only";
  iconSize?: string;
  ariaLabel?: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * Renders a Modus button component.
 *
 * @param {ModusButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered button component.
 */
const ModusButton: Component<ModusButtonProps> = (props) => {
  const getIconSizeClass = (): string => {
    if (props.iconSize) return props.iconSize;
    if (props.iconPosition === "only") {
      switch (props.size) {
        case "xs": return "text-sm";
        case "sm": return "text-base";
        case "md": return "text-xl";
        case "lg": return "text-2xl";
        default: return "text-xl";
      }
    }
    switch (props.size) {
      case "xs": return "text-xs";
      case "sm": return "text-sm";
      case "md": return "text-lg";
      case "lg": return "text-xl";
      default: return "text-lg";
    }
  };

  const renderIcon = (iconName: string, position: "left" | "right" | "only") => {
    const iconStyle =
      position === "left"
        ? { marginRight: "8px" }
        : position === "right"
          ? { marginLeft: "8px" }
          : {};
    return (
      <i class={`modus-icons ${getIconSizeClass()}`} style={iconStyle}>
        {iconName}
      </i>
    );
  };

  const renderContent = (): JSX.Element => {
    if (!props.icon) return props.children as JSX.Element;
    switch (props.iconPosition) {
      case "left":
        return (
          <>
            {renderIcon(props.icon, "left")}
            {props.children}
          </>
        );
      case "right":
        return (
          <>
            {props.children}
            {renderIcon(props.icon, "right")}
          </>
        );
      case "only":
        return renderIcon(props.icon, "only");
      default:
        return props.children as JSX.Element;
    }
  };

  const getAriaLabel = () => {
    if (props.ariaLabel) return props.ariaLabel;
    if (props.iconPosition === "only" && typeof props.children === "string") {
      return props.children;
    }
    return undefined;
  };

  return (
    <modus-wc-button
      {...(props.color && { color: props.color })}
      {...(props.variant && { variant: props.variant })}
      size={props.size ?? "md"}
      shape={props.shape ?? "rectangle"}
      disabled={props.disabled ?? false}
      fullWidth={props.fullWidth ?? false}
      pressed={props.pressed ?? false}
      type={props.type ?? "button"}
      aria-label={getAriaLabel()}
      custom-class={props.className}
      on:buttonClick={() => props.onButtonClick?.()}
    >
      {renderContent()}
    </modus-wc-button>
  );
};

export default ModusButton;
