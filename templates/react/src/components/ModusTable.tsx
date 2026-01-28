import { useEffect, useRef, useState } from "react";
import { ModusWcTable } from "@trimble-oss/moduswebcomponents-react";

/**
 * Represents a column in a table.
 */
export interface TableColumn {
  /** A unique identifier for the column. */
  id: string;
  /** The header text for the column. */
  header: string;
  /** The key to access the data for this column in a row object. */
  accessor: string;
  /** The width of the column. */
  width?: string;
  /** Whether the column is sortable. */
  sortable?: boolean;
  /** The type of editor to use for this column. */
  editor?: "number" | "text" | "autocomplete" | "date" | "custom";
  /** A function to render the cell content. */
  cellRenderer?: (value: unknown, row: unknown) => string | HTMLElement;
  /** A function to render a custom editor. */
  customEditorRenderer?: (
    value: unknown,
    onCommit: (value: unknown) => void
  ) => HTMLElement;
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
  /** The columns to display in the table. */
  columns: TableColumn[];
  /** The data to display in the table. */
  data: TableData[];
  /** The current page number. */
  currentPage?: number;
  /** The available page size options. */
  pageSizeOptions?: number[];
  /** Whether the table is paginated. */
  paginated?: boolean;
  /** Whether to show the page size selector. */
  showPageSizeSelector?: boolean;
  /** The row selection mode. */
  selectable?: "none" | "single" | "multi";
  /** The IDs of the selected rows. */
  selectedRowIds?: string[];
  /** Whether the table is sortable. */
  sortable?: boolean;
  /** The density of the table. */
  density?: "compact" | "comfortable" | "relaxed";
  /** Whether the table is editable. */
  editable?: boolean | ((row: unknown) => boolean);
  /** Whether to show a hover effect on rows. */
  hover?: boolean;
  /** Whether to show zebra striping on rows. */
  zebra?: boolean;
  /** A custom CSS class to apply to the table. */
  customClass?: string;
  /** The ARIA label for the table. */
  ariaLabel?: string;
  /** A callback function to handle the start of a cell edit. */
  onCellEditStart?: (
    event: CustomEvent<{ rowIndex: number; colId: string }>
  ) => void;
  /** A callback function to handle the commit of a cell edit. */
  onCellEditCommit?: (
    event: CustomEvent<{
      rowIndex: number;
      colId: string;
      newValue: unknown;
      updatedRow: unknown;
    }>
  ) => void;
  /** A callback function to handle sort changes. */
  onSortChange?: (
    event: CustomEvent<Array<{ columnId: string; direction: "asc" | "desc" }>>
  ) => void;
  /** A callback function to handle pagination changes. */
  onPaginationChange?: (
    event: CustomEvent<{ currentPage: number; pageSize: number }>
  ) => void;
  /** A callback function to handle row clicks. */
  onRowClick?: (event: CustomEvent<{ row: unknown; index: number }>) => void;
  /** A callback function to handle row selection changes. */
  onRowSelectionChange?: (
    event: CustomEvent<{ selectedRows: unknown[]; selectedRowIds: string[] }>
  ) => void;
}

/**
 * Renders a Modus table component with advanced features.
 *
 * This component provides a comprehensive data table with sorting, pagination,
 * selection, editing, and other advanced features. It supports both controlled
 * and uncontrolled modes for maximum flexibility.
 *
 * @example
 * // Basic table
 * <ModusTable
 *   columns={columns}
 *   data={data}
 * />
 *
 * @example
 * // Paginated table with selection
 * <ModusTable
 *   columns={columns}
 *   data={data}
 *   paginated={true}
 *   selectable="single"
 *   onRowSelectionChange={handleSelection}
 * />
 *
 * @example
 * // Editable table with custom cell renderers
 * <ModusTable
 *   columns={columns}
 *   data={data}
 *   editable={true}
 *   onCellEditCommit={handleCellEdit}
 *   density="compact"
 *   zebra={true}
 * />
 *
 * @param {ModusTableProps} props - The component props.
 * @returns {JSX.Element} The rendered table component.
 * @see {@link https://modus.trimble.com/components/table} - Modus Table documentation
 * @see {@link TableColumn} - Column configuration interface
 * @see {@link TableData} - Data row interface
 */
export default function ModusTable({
  columns,
  data,
  currentPage = 1,
  pageSizeOptions = [5, 10, 15],
  paginated = false,
  showPageSizeSelector = true,
  selectable = "none",
  selectedRowIds,
  sortable = true,
  density = "comfortable",
  editable = false,
  hover = true,
  zebra = false,
  customClass,
  ariaLabel,
  onCellEditStart,
  onCellEditCommit,
  onSortChange,
  onPaginationChange,
  onRowClick,
  onRowSelectionChange,
}: ModusTableProps) {
  const tableRef = useRef<HTMLModusWcTableElement>(null);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Event handlers setup - moved to after component initialization
  useEffect(() => {
    const table = tableRef.current;
    if (!table || !mounted) return;

    console.log("Setting up event listeners on initialized table");

    const handleCellEditStart = (event: Event) => {
      console.log("Cell edit start event received:", event);
      const customEvent = event as CustomEvent<{
        rowIndex: number;
        colId: string;
      }>;
      onCellEditStart?.(customEvent);
    };

    const handleCellEditCommit = (event: Event) => {
      console.log("Cell edit commit event received:", event);
      const customEvent = event as CustomEvent<{
        rowIndex: number;
        colId: string;
        newValue: unknown;
        updatedRow: unknown;
      }>;
      onCellEditCommit?.(customEvent);
    };

    const handleSortChange = (event: Event) => {
      const customEvent = event as CustomEvent<
        Array<{ columnId: string; direction: "asc" | "desc" }>
      >;
      onSortChange?.(customEvent);
    };

    const handlePaginationChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        currentPage: number;
        pageSize: number;
      }>;
      onPaginationChange?.(customEvent);
    };

    const handleRowClick = (event: Event) => {
      const customEvent = event as CustomEvent<{ row: unknown; index: number }>;
      onRowClick?.(customEvent);
    };

    const handleRowSelectionChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        selectedRows: unknown[];
        selectedRowIds: string[];
      }>;
      onRowSelectionChange?.(customEvent);
    };

    // Add event listeners
    if (onCellEditStart)
      table.addEventListener("cellEditStart", handleCellEditStart);
    if (onCellEditCommit)
      table.addEventListener("cellEditCommit", handleCellEditCommit);
    if (onSortChange) table.addEventListener("sortChange", handleSortChange);
    if (onPaginationChange)
      table.addEventListener("paginationChange", handlePaginationChange);
    if (onRowClick) table.addEventListener("rowClick", handleRowClick);
    if (onRowSelectionChange)
      table.addEventListener("rowSelectionChange", handleRowSelectionChange);

    return () => {
      // Cleanup event listeners
      if (onCellEditStart)
        table.removeEventListener("cellEditStart", handleCellEditStart);
      if (onCellEditCommit)
        table.removeEventListener("cellEditCommit", handleCellEditCommit);
      if (onSortChange)
        table.removeEventListener("sortChange", handleSortChange);
      if (onPaginationChange)
        table.removeEventListener("paginationChange", handlePaginationChange);
      if (onRowClick) table.removeEventListener("rowClick", handleRowClick);
      if (onRowSelectionChange)
        table.removeEventListener(
          "rowSelectionChange",
          handleRowSelectionChange
        );
    };
  }, [
    mounted,
    onCellEditStart,
    onCellEditCommit,
    onSortChange,
    onPaginationChange,
    onRowClick,
    onRowSelectionChange,
  ]);

  // Ensure props are set on the web component after mounting
  useEffect(() => {
    const table = tableRef.current;
    if (!table || !mounted) return;

    console.log("Setting props on web component:", { columns, data, editable });

    // Force update the web component with the props
    if (columns && columns.length > 0) {
      table.columns = columns;
    }
    if (data && data.length > 0) {
      table.data = data;
    }
    if (editable !== undefined) {
      table.editable = editable;
    }
  }, [mounted, columns, data, editable]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <div className="animate-pulse h-32 bg-muted rounded"></div>;
  }

  return (
    <ModusWcTable
      ref={tableRef}
      columns={columns}
      data={data}
      currentPage={currentPage}
      pageSizeOptions={pageSizeOptions}
      paginated={paginated}
      showPageSizeSelector={showPageSizeSelector}
      selectable={selectable}
      selectedRowIds={selectedRowIds}
      sortable={sortable}
      density={density}
      editable={editable}
      hover={hover}
      zebra={zebra}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
