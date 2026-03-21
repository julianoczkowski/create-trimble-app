import type { Component } from "solid-js";

type SkeletonShape = "circle" | "rectangle";

/**
 * Props for the ModusSkeleton component.
 */
export interface ModusSkeletonProps {
  height?: string;
  width?: string;
  shape?: SkeletonShape;
  customClass?: string;
  ariaLabel?: string;
}

/**
 * Renders a Modus skeleton component.
 * @param {ModusSkeletonProps} props - The component props.
 * @returns {JSX.Element} The rendered skeleton component.
 */
const ModusSkeleton: Component<ModusSkeletonProps> = (props) => {
  return (
    <modus-wc-skeleton
      height={props.height ?? "var(--modus-wc-line-height-md)"}
      width={props.width ?? "100%"}
      shape={props.shape ?? "rectangle"}
      custom-class={props.customClass}
      aria-label={props.ariaLabel ?? "Loading placeholder"}
    />
  );
};

export default ModusSkeleton;
