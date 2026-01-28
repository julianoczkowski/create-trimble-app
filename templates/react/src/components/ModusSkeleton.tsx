

import { ModusWcSkeleton } from "@trimble-oss/moduswebcomponents-react";

type SkeletonShape = "circle" | "rectangle";

/**
 * Props for the ModusSkeleton component.
 */
export interface ModusSkeletonProps {
  /** The height of the skeleton. */
  height?: string;
  /** The width of the skeleton. */
  width?: string;
  /** The shape of the skeleton. */
  shape?: SkeletonShape;
  /** A custom CSS class to apply to the skeleton. */
  customClass?: string;
  /** The ARIA label for the skeleton. */
  ariaLabel?: string;
}

/**
 * Renders a Modus skeleton component.
 * @param {ModusSkeletonProps} props - The component props.
 * @returns {JSX.Element} The rendered skeleton component.
 */
export default function ModusSkeleton({
  height,
  width,
  shape = 'rectangle',
  customClass,
  ariaLabel = 'Loading placeholder',
}: ModusSkeletonProps) {
  return (
    <ModusWcSkeleton
      height={height}
      width={width}
      shape={shape}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
