import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

/**
 * Props for the ModusButton component.
 */
interface ModusButtonProps {
  /** The color of the button. */
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  /** The variant of the button. */
  variant?: "filled" | "outlined" | "borderless";
  /** The size of the button. */
  size?: "xs" | "sm" | "md" | "lg";
  /** The shape of the button. */
  shape?: "rectangle" | "square" | "circle";

  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button should take up the full width of its container. */
  fullWidth?: boolean;
  /** Whether the button is pressed. */
  pressed?: boolean;
  /** The type of the button. */
  type?: "button" | "submit" | "reset";

  /** The content to display inside the button. */
  children?: ReactNode;
  /** An icon to display in the button. */
  icon?: string;
  /** The position of the icon relative to the button text. */
  iconPosition?: "left" | "right" | "only";

  /** The ARIA label for the button. */
  ariaLabel?: string;

  /** A callback function to handle button clicks. */
  onButtonClick?: () => void;

  /** A custom CSS class to apply to the button. */
  className?: string;
}

/**
 * Renders a Modus button component with full customization support.
 *
 * @example
 * // Basic button
 * <ModusButton>Click me</ModusButton>
 *
 * @example
 * // Icon button with custom styling
 * <ModusButton
 *   icon="add"
 *   iconPosition="left"
 *   color="primary"
 *   size="lg"
 * >
 *   Add Item
 * </ModusButton>
 *
 * @example
 * // Icon-only button with accessibility
 * <ModusButton
 *   icon="settings"
 *   iconPosition="only"
 *   ariaLabel="Open settings"
 * />
 *
 * @param {ModusButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered button component.
 * @see {@link https://modus.trimble.com/components/button} - Modus Button documentation
 */
export default function ModusButton({
  color = "primary",
  variant = "filled",
  size = "md",
  shape = "rectangle",
  disabled = false,
  fullWidth = false,
  pressed = false,
  type = "button",
  children,
  icon,
  iconPosition = "left",
  ariaLabel,
  onButtonClick,
  className,
}: ModusButtonProps) {
  /**
   * Renders an icon with proper positioning and styling based on its position.
   *
   * This helper function creates an icon element with appropriate margin spacing
   * based on the icon's position relative to the button text. Icons positioned
   * on the left get right margin, icons on the right get left margin, and
   * icon-only buttons have no margin.
   *
   * @param {string} iconName - The name of the Modus icon to render
   * @param {"left" | "right" | "only"} position - The position of the icon relative to text
   * @returns {JSX.Element} The rendered icon element with appropriate styling
   * @private
   */
  const renderIcon = (
    iconName: string,
    position: "left" | "right" | "only"
  ) => {
    const iconStyle =
      position === "left"
        ? { marginRight: "8px" }
        : position === "right"
        ? { marginLeft: "8px" }
        : {};

    return (
      <i className="modus-icons" style={iconStyle}>
        {iconName}
      </i>
    );
  };

  /**
   * Determines and renders the button content based on icon position.
   *
   * This function handles the complex logic of combining icons and text content
   * based on the iconPosition prop. It supports three modes:
   * - "left": Icon appears before text
   * - "right": Icon appears after text
   * - "only": Only the icon is displayed (text is hidden)
   *
   * @returns {ReactNode} The rendered content with proper icon and text arrangement
   * @private
   */
  const renderContent = () => {
    if (!icon) {
      return children;
    }

    switch (iconPosition) {
      case "left":
        return (
          <>
            {renderIcon(icon, "left")}
            {children}
          </>
        );
      case "right":
        return (
          <>
            {children}
            {renderIcon(icon, "right")}
          </>
        );
      case "only":
        return renderIcon(icon, "only");
      default:
        return children;
    }
  };

  /**
   * Generates appropriate ARIA label for accessibility.
   *
   * This function ensures proper accessibility by generating ARIA labels
   * for icon-only buttons. If no explicit ariaLabel is provided and the
   * button is icon-only, it uses the text content as the aria-label.
   * This ensures screen readers can properly announce the button's purpose.
   *
   * @returns {string | undefined} The appropriate ARIA label or undefined
   * @private
   */
  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (iconPosition === "only" && typeof children === "string") {
      return children; // Use text content as aria-label for icon-only buttons
    }
    return undefined;
  };

  return (
    <ModusWcButton
      color={color}
      variant={variant}
      size={size}
      shape={shape}
      disabled={disabled}
      fullWidth={fullWidth}
      pressed={pressed}
      type={type}
      aria-label={getAriaLabel()}
      onButtonClick={onButtonClick}
      custom-class={className}
    >
      {renderContent()}
    </ModusWcButton>
  );
}
