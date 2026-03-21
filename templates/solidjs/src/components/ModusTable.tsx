import { createEffect, onMount, onCleanup, type Component } from "solid-js";

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
 * Renders a Modus table component.
 * Complex props (columns, data, editable) are set as JS properties via ref callback
 * and createEffect, since they are objects/arrays that cannot be HTML attributes.
 */
const ModusTable: Component<ModusTableProps> = (props) => {
  let tableEl: HTMLElement | undefined;

  const setTableProps = (table: Record<string, unknown>) => {
    table.columns = props.columns;
    table.data = props.data;
    if (props.editable !== undefined) table.editable = props.editable;
    if (props.selectedRowIds !== undefined) table.selectedRowIds = props.selectedRowIds;
    if (props.pageSizeOptions !== undefined) table.pageSizeOptions = props.pageSizeOptions;
    table.currentPage = props.currentPage ?? 1;
    table.paginated = props.paginated ?? false;
    table.showPageSizeSelector = props.showPageSizeSelector ?? true;
    table.selectable = props.selectable ?? "none";
    table.sortable = props.sortable ?? true;
    table.density = props.density ?? "comfortable";
    table.hover = props.hover ?? true;
    table.zebra = props.zebra ?? false;
    if (props.customClass) table.customClass = props.customClass;
  };

  onMount(() => {
    const table = tableEl as Record<string, unknown> | undefined;
    if (!table) return;

    // Set properties immediately on mount
    setTableProps(table);

    // Event listeners
    const handleCellEditStart = (e: Event) =>
      props.onCellEditStart?.(e as CustomEvent);
    const handleCellEditCommit = (e: Event) =>
      props.onCellEditCommit?.(e as CustomEvent);
    const handleSortChange = (e: Event) =>
      props.onSortChange?.(e as CustomEvent);
    const handlePaginationChange = (e: Event) =>
      props.onPaginationChange?.(e as CustomEvent);
    const handleRowClick = (e: Event) =>
      props.onRowClick?.(e as CustomEvent);
    const handleRowSelectionChange = (e: Event) =>
      props.onRowSelectionChange?.(e as CustomEvent);

    tableEl!.addEventListener("cellEditStart", handleCellEditStart);
    tableEl!.addEventListener("cellEditCommit", handleCellEditCommit);
    tableEl!.addEventListener("sortChange", handleSortChange);
    tableEl!.addEventListener("paginationChange", handlePaginationChange);
    tableEl!.addEventListener("rowClick", handleRowClick);
    tableEl!.addEventListener("rowSelectionChange", handleRowSelectionChange);

    onCleanup(() => {
      tableEl?.removeEventListener("cellEditStart", handleCellEditStart);
      tableEl?.removeEventListener("cellEditCommit", handleCellEditCommit);
      tableEl?.removeEventListener("sortChange", handleSortChange);
      tableEl?.removeEventListener("paginationChange", handlePaginationChange);
      tableEl?.removeEventListener("rowClick", handleRowClick);
      tableEl?.removeEventListener("rowSelectionChange", handleRowSelectionChange);
    });
  });

  // Reactively update complex properties when they change
  createEffect(() => {
    const table = tableEl as Record<string, unknown> | undefined;
    if (!table) return;
    setTableProps(table);
  });

  return (
    <modus-wc-table
      ref={(el) => (tableEl = el as HTMLElement)}
      attr:aria-label={props.ariaLabel}
    />
  );
};

export default ModusTable;
