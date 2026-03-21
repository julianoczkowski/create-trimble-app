import type { Component } from "solid-js";

/**
 * Props for the ModusLoader component.
 */
interface ModusLoaderProps {
  /** The variant of the loader. */
  variant?: "spinner" | "ball" | "bars" | "dots" | "infinity" | "ring";
  /** The color of the loader. */
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info";
  /** The size of the loader. */
  size?: "xs" | "sm" | "md" | "lg";
  /** A custom CSS class to apply to the loader. */
  customClass?: string;
  /** The ARIA label for the loader. */
  ariaLabel?: string;
}

/**
 * Renders a Modus loader component.
 * @param {ModusLoaderProps} props - The component props.
 * @returns {JSX.Element} The rendered loader component.
 */
const ModusLoader: Component<ModusLoaderProps> = (props) => {
  return (
    <modus-wc-loader
      variant={props.variant ?? "spinner"}
      color={props.color ?? "primary"}
      size={props.size ?? "md"}
      custom-class={props.customClass ?? ""}
      aria-label={props.ariaLabel ?? "Loading"}
    />
  );
};

export default ModusLoader;
