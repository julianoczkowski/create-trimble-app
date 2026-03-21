import { createSignal, createEffect, onMount, type Component } from "solid-js";
import { Show } from "solid-js";

/**
 * Represents a column in a table.
 */
export interface TableColumn {
  id: string;
  header: string;
  accessor: string;
  width?: string;
  sortable?: boolean;
  editor?: "number" | "text" | "autocomplete" | "date" | "custom";
  cellRenderer?: (value: unknown, row: unknown) => string | HTMLElement;
  customEditorRenderer?: (value: unknown, onCommit: (value: unknown) => void) => HTMLElement;
}

/**
 * Represents a row of data in a table.
 */
export interface TableData {
  [key: string]: unknown;
}

/**
 * Props for the ModusTable component.
 */
export interface ModusTableProps {
  columns: TableColumn[];
  data: TableData[];
  currentPage?: number;
  pageSizeOptions?: number[];
  paginated?: boolean;
  showPageSizeSelector?: boolean;
  selectable?: "none" | "single" | "multi";
  selectedRowIds?: string[];
  sortable?: boolean;
  density?: "compact" | "comfortable" | "relaxed";
  editable?: boolean | ((row: unknown) => boolean);
  hover?: boolean;
  zebra?: boolean;
  customClass?: string;
  ariaLabel?: string;
  onCellEditStart?: (event: CustomEvent<{ rowIndex: number; colId: string }>) => void;
  onCellEditCommit?: (
    event: CustomEvent<{
      rowIndex: number;
      colId: string;
      newValue: unknown;
      updatedRow: unknown;
    }>
  ) => void;
  onSortChange?: (
    event: CustomEvent<Array<{ columnId: string; direction: "asc" | "desc" }>>
  ) => void;
  onPaginationChange?: (event: CustomEvent<{ currentPage: number; pageSize: number }>) => void;
  onRowClick?: (event: CustomEvent<{ row: unknown; index: number }>) => void;
  onRowSelectionChange?: (
    event: CustomEvent<{ selectedRows: unknown[]; selectedRowIds: string[] }>
  ) => void;
}

/**
 * Renders a Modus table component with advanced features.
 *
 * @param {ModusTableProps} props - The component props.
 * @returns {JSX.Element} The rendered table component.
 */
const ModusTable: Component<ModusTableProps> = (props) => {
  const [mounted, setMounted] = createSignal(false);
  let tableEl: HTMLElement | undefined;

  onMount(() => {
    setMounted(true);
  });

  createEffect(() => {
    const table = tableEl;
    if (!table || !mounted()) return;

    const handleCellEditStart = (e: Event) =>
      props.onCellEditStart?.(e as CustomEvent<{ rowIndex: number; colId: string }>);
    const handleCellEditCommit = (e: Event) =>
      props.onCellEditCommit?.(e as CustomEvent<{
        rowIndex: number;
        colId: string;
        newValue: unknown;
        updatedRow: unknown;
      }>);
    const handleSortChange = (e: Event) =>
      props.onSortChange?.(e as CustomEvent<Array<{ columnId: string; direction: "asc" | "desc" }>>);
    const handlePaginationChange = (e: Event) =>
      props.onPaginationChange?.(e as CustomEvent<{ currentPage: number; pageSize: number }>);
    const handleRowClick = (e: Event) =>
      props.onRowClick?.(e as CustomEvent<{ row: unknown; index: number }>);
    const handleRowSelectionChange = (e: Event) =>
      props.onRowSelectionChange?.(e as CustomEvent<{
        selectedRows: unknown[];
        selectedRowIds: string[];
      }>);

    if (props.onCellEditStart) table.addEventListener("cellEditStart", handleCellEditStart);
    if (props.onCellEditCommit) table.addEventListener("cellEditCommit", handleCellEditCommit);
    if (props.onSortChange) table.addEventListener("sortChange", handleSortChange);
    if (props.onPaginationChange) table.addEventListener("paginationChange", handlePaginationChange);
    if (props.onRowClick) table.addEventListener("rowClick", handleRowClick);
    if (props.onRowSelectionChange) table.addEventListener("rowSelectionChange", handleRowSelectionChange);

    return () => {
      if (props.onCellEditStart) table.removeEventListener("cellEditStart", handleCellEditStart);
      if (props.onCellEditCommit) table.removeEventListener("cellEditCommit", handleCellEditCommit);
      if (props.onSortChange) table.removeEventListener("sortChange", handleSortChange);
      if (props.onPaginationChange) table.removeEventListener("paginationChange", handlePaginationChange);
      if (props.onRowClick) table.removeEventListener("rowClick", handleRowClick);
      if (props.onRowSelectionChange)
        table.removeEventListener("rowSelectionChange", handleRowSelectionChange);
    };
  });

  createEffect(() => {
    const table = tableEl as Record<string, unknown> | undefined;
    if (!table || !mounted()) return;

    if (props.columns?.length) table.columns = props.columns;
    if (props.data?.length) table.data = props.data;
    if (props.editable !== undefined) table.editable = props.editable;
  });

  return (
    <Show
      when={mounted()}
      fallback={<div class="animate-pulse h-32 bg-muted rounded" />}
    >
      <modus-wc-table
        ref={(el) => (tableEl = el as HTMLElement)}
        columns={props.columns}
        data={props.data}
        currentPage={props.currentPage ?? 1}
        pageSizeOptions={props.pageSizeOptions ?? [5, 10, 15]}
        paginated={props.paginated ?? false}
        showPageSizeSelector={props.showPageSizeSelector ?? true}
        selectable={props.selectable ?? "none"}
        selectedRowIds={props.selectedRowIds}
        sortable={props.sortable ?? true}
        density={props.density ?? "comfortable"}
        editable={props.editable ?? false}
        hover={props.hover ?? true}
        zebra={props.zebra ?? false}
        customClass={props.customClass}
        aria-label={props.ariaLabel}
      />
    </Show>
  );
};

export default ModusTable;
