

import { useEffect, useRef } from "react";
import { ModusWcPagination } from "@trimble-oss/moduswebcomponents-react";

/**
 * Represents the ARIA labels for the pagination component.
 */
export interface AriaLabelValues {
  /** The ARIA label for the first page button. */
  firstPage?: string;
  /** The ARIA label for the previous page button. */
  previousPage?: string;
  /** The ARIA label for a page button. */
  page?: string;
  /** The ARIA label for the next page button. */
  nextPage?: string;
  /** The ARIA label for the last page button. */
  lastPage?: string;
}

/**
 * Props for the ModusPagination component.
 */
export interface ModusPaginationProps {
  /** The ARIA label for the pagination component. */
  ariaLabel?: string;
  /** The ARIA labels for the pagination buttons. */
  ariaLabelValues?: AriaLabelValues;
  /** The total number of pages. */
  count?: number;
  /** A custom CSS class to apply to the pagination component. */
  customClass?: string;
  /** The text to display for the next page button. */
  nextButtonText?: string;
  /** The current page number. */
  page?: number;
  /** The text to display for the previous page button. */
  prevButtonText?: string;
  /** The size of the pagination component. */
  size?: 'sm' | 'md' | 'lg';
  /** A callback function to handle page changes. */
  onPageChange?: (event: CustomEvent<{ newPage: number; prevPage: number }>) => void;
}

/**
 * Renders a Modus pagination component.
 * @param {ModusPaginationProps} props - The component props.
 * @returns {JSX.Element} The rendered pagination component.
 */
export default function ModusPagination({
  ariaLabel,
  ariaLabelValues,
  count = 1,
  customClass,
  nextButtonText,
  page = 1,
  prevButtonText,
  size = 'md',
  onPageChange,
}: ModusPaginationProps) {
  const paginationRef = useRef<HTMLModusWcPaginationElement>(null);

  useEffect(() => {
    const pagination = paginationRef.current;
    if (!pagination || !onPageChange) {
      return;
    }

    const handlePageChange = (event: Event) => {
      onPageChange(event as CustomEvent<{ newPage: number; prevPage: number }>);
    };

    pagination.addEventListener("pageChange", handlePageChange);

    return () => {
      pagination.removeEventListener("pageChange", handlePageChange);
    };
  }, [onPageChange]);

  return (
    <ModusWcPagination
      ref={paginationRef}
      aria-label={ariaLabel}
      ariaLabelValues={ariaLabelValues}
      count={count}
      custom-class={customClass}
      nextButtonText={nextButtonText}
      page={page}
      prevButtonText={prevButtonText}
      size={size}
    />
  );
}
