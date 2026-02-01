

import { useEffect, useRef } from "react";
import { ModusWcBreadcrumbs } from "@trimble-oss/moduswebcomponents-react";

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
  size?: 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the breadcrumbs. */
  customClass?: string;
  /** The ARIA label for the breadcrumbs. */
  'aria-label'?: string;
  /** A callback function to handle breadcrumb item clicks. */
  onBreadcrumbClick?: (event: CustomEvent<BreadcrumbItem>) => void;
}

/**
 * Renders a Modus breadcrumbs component.
 * @param {ModusBreadcrumbsProps} props - The component props.
 * @param {BreadcrumbItem[]} props.items - The items to display in the breadcrumb trail.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the breadcrumbs.
 * @param {string} [props.customClass] - A custom CSS class to apply to the breadcrumbs.
 * @param {string} [props.aria-label] - The ARIA label for the breadcrumbs.
 * @param {(event: CustomEvent<BreadcrumbItem>) => void} [props.onBreadcrumbClick] - A callback function to handle breadcrumb item clicks.
 * @returns {JSX.Element} The rendered breadcrumbs component.
 */
export default function ModusBreadcrumbs({
  items,
  size = 'md',
  customClass,
  'aria-label': ariaLabel,
  onBreadcrumbClick,
}: ModusBreadcrumbsProps) {
  const breadcrumbsRef = useRef<HTMLModusWcBreadcrumbsElement>(null);

  useEffect(() => {
    const breadcrumbs = breadcrumbsRef.current;
    if (!breadcrumbs || !onBreadcrumbClick) return;

    const handleBreadcrumbClick = (event: Event) => {
      const customEvent = event as CustomEvent<BreadcrumbItem>;
      onBreadcrumbClick(customEvent);
    };

    breadcrumbs.addEventListener("breadcrumbClick", handleBreadcrumbClick);
    return () => {
      breadcrumbs.removeEventListener("breadcrumbClick", handleBreadcrumbClick);
    };
  }, [onBreadcrumbClick]);

  return (
    <ModusWcBreadcrumbs
      ref={breadcrumbsRef}
      items={items}
      size={size}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
