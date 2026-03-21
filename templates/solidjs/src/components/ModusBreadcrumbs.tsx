import { createEffect } from "solid-js";
import type { Component } from "solid-js";

/**
 * Represents a single item in the breadcrumb trail.
 */
export interface BreadcrumbItem {
  /** The text to display for the breadcrumb item. */
  label: string;
  /** The URL to navigate to when the breadcrumb item is clicked. */
  url?: string;
}

/**
 * Props for the ModusBreadcrumbs component.
 */
export interface ModusBreadcrumbsProps {
  /** The items to display in the breadcrumb trail. */
  items: BreadcrumbItem[];
  /** The size of the breadcrumbs. */
  size?: "sm" | "md" | "lg";
  /** A custom CSS class to apply to the breadcrumbs. */
  customClass?: string;
  /** The ARIA label for the breadcrumbs. */
  "aria-label"?: string;
  /** A callback function to handle breadcrumb item clicks. */
  onBreadcrumbClick?: (event: CustomEvent<BreadcrumbItem>) => void;
}

/**
 * Renders a Modus breadcrumbs component.
 * @param props - The component props.
 * @returns The rendered breadcrumbs component.
 */
const ModusBreadcrumbs: Component<ModusBreadcrumbsProps> = (props) => {
  let breadcrumbsEl: HTMLModusWcBreadcrumbsElement | undefined;

  createEffect(() => {
    const breadcrumbs = breadcrumbsEl;
    if (!breadcrumbs || !props.onBreadcrumbClick) return;

    const handleBreadcrumbClick = (event: Event) => {
      props.onBreadcrumbClick?.(event as CustomEvent<BreadcrumbItem>);
    };

    breadcrumbs.addEventListener("breadcrumbClick", handleBreadcrumbClick);

    return () => {
      breadcrumbs.removeEventListener("breadcrumbClick", handleBreadcrumbClick);
    };
  });

  return (
    <modus-wc-breadcrumbs
      ref={(el) => (breadcrumbsEl = el)}
      items={props.items}
      size={props.size ?? "md"}
      customClass={props.customClass}
      aria-label={props["aria-label"]}
    />
  );
};

export default ModusBreadcrumbs;
