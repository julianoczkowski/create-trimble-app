import { onMount, onCleanup, type Component } from "solid-js";

/**
 * Represents the ARIA labels for the pagination component.
 */
export interface AriaLabelValues {
  firstPage?: string;
  previousPage?: string;
  page?: string;
  nextPage?: string;
  lastPage?: string;
}

/**
 * Props for the ModusPagination component.
 */
export interface ModusPaginationProps {
  ariaLabel?: string;
  ariaLabelValues?: AriaLabelValues;
  count?: number;
  customClass?: string;
  nextButtonText?: string;
  page?: number;
  prevButtonText?: string;
  size?: "sm" | "md" | "lg";
  onPageChange?: (event: CustomEvent<{ newPage: number; prevPage: number }>) => void;
}

/**
 * Renders a Modus pagination component.
 * @param {ModusPaginationProps} props - The component props.
 * @returns {JSX.Element} The rendered pagination component.
 */
const ModusPagination: Component<ModusPaginationProps> = (props) => {
  let paginationEl: HTMLElement | undefined;

  onMount(() => {
    if (!paginationEl || !props.onPageChange) return;

    const handlePageChange = (e: Event) => {
      props.onPageChange?.(e as CustomEvent<{ newPage: number; prevPage: number }>);
    };

    paginationEl.addEventListener("pageChange", handlePageChange);

    onCleanup(() => {
      paginationEl?.removeEventListener("pageChange", handlePageChange);
    });
  });

  return (
    <modus-wc-pagination
      ref={(el) => (paginationEl = el as HTMLElement)}
      aria-label={props.ariaLabel}
      ariaLabelValues={props.ariaLabelValues}
      count={props.count ?? 1}
      custom-class={props.customClass}
      nextButtonText={props.nextButtonText}
      page={props.page ?? 1}
      prevButtonText={props.prevButtonText}
      size={props.size ?? "md"}
    />
  );
};

export default ModusPagination;
