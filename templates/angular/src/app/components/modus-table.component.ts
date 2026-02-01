import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTable } from '@trimble-oss/moduswebcomponents-angular';
import type {
  Components,
  Density,
  ITableColumn,
  IPaginationChangeEventDetail,
} from '@trimble-oss/moduswebcomponents';
import type { SortingState, RowSelectionState } from '@tanstack/table-core';

/**
 * Props supported by the {@link ModusTableComponent}.
 */
export interface ModusTableProps {
  /** Enable cell editing. Either a boolean (all rows) or a predicate per row. */
  editable?: Components.ModusWcTable['editable'];
  /** An array of column definitions. */
  columns: ITableColumn[];
  /** Custom CSS class applied to the table element. */
  className?: Components.ModusWcTable['customClass'];
  /** An array of data objects. */
  data: Record<string, unknown>[];
  /** The density of the table. */
  density?: Density;
  /** Enable hover effect on table rows. */
  hover?: Components.ModusWcTable['hover'];
  /** The current page number in pagination (1-based index). */
  currentPage?: Components.ModusWcTable['currentPage'];
  /** Enable pagination for the table. */
  paginated?: Components.ModusWcTable['paginated'];
  /** Available options for the number of rows per page. */
  pageSizeOptions?: Components.ModusWcTable['pageSizeOptions'];
  /** Show/hide the page size selector in pagination. */
  showPageSizeSelector?: Components.ModusWcTable['showPageSizeSelector'];
  /** Enable sorting functionality for sortable columns. */
  sortable?: Components.ModusWcTable['sortable'];
  /** Row selection mode. */
  selectable?: Components.ModusWcTable['selectable'];
  /** Array of selected row IDs. */
  selectedRowIds?: Components.ModusWcTable['selectedRowIds'];
  /** Zebra striped tables differentiate rows by styling them in an alternating fashion. */
  zebra?: Components.ModusWcTable['zebra'];
  /** Accessibility caption for the table. */
  caption?: Components.ModusWcTable['caption'];
}

/**
 * Angular wrapper for the Modus table web component.
 *
 * A powerful table component with sorting, pagination, row selection, and cell editing capabilities.
 *
 * @example
 * ```html
 * <modus-table
 *   [columns]="tableColumns"
 *   [data]="tableData"
 *   [paginated]="true"
 *   [sortable]="true"
 *   (rowClick)="handleRowClick($event)"
 *   (sortChange)="handleSortChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'modus-table',
  imports: [CommonModule, ModusWcTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-table
      [editable]="editable()"
      [columns]="columns()"
      [customClass]="className()"
      [data]="data()"
      [density]="density()"
      [hover]="hover()"
      [currentPage]="currentPage()"
      [paginated]="paginated()"
      [pageSizeOptions]="pageSizeOptions()"
      [showPageSizeSelector]="showPageSizeSelector()"
      [sortable]="sortable()"
      [selectable]="selectable()"
      [selectedRowIds]="selectedRowIds()"
      [zebra]="zebra()"
      [caption]="caption()"
      (cellEditStart)="handleCellEditStart($event)"
      (cellEditCommit)="handleCellEditCommit($event)"
      (rowClick)="handleRowClick($event)"
      (sortChange)="handleSortChange($event)"
      (paginationChange)="handlePaginationChange($event)"
      (rowSelectionChange)="handleRowSelectionChange($event)"
    />
  `,
})
export class ModusTableComponent {
  /** Enable cell editing. Either a boolean (all rows) or a predicate per row. */
  readonly editable = input<boolean | ((row: Record<string, unknown>) => boolean) | undefined>(
    false
  );

  /** An array of column definitions. */
  readonly columns = input.required<ITableColumn[]>();

  /** Custom CSS class applied to the table element. */
  readonly className = input<string | undefined>();

  /** An array of data objects. */
  readonly data = input.required<Record<string, unknown>[]>();

  /** The density of the table. */
  readonly density = input<Density | undefined>('comfortable');

  /** Enable hover effect on table rows. */
  readonly hover = input<boolean | undefined>(true);

  /** The current page number in pagination (1-based index). */
  readonly currentPage = input<number>(1);

  /** Enable pagination for the table. */
  readonly paginated = input<boolean | undefined>(false);

  /** Available options for the number of rows per page. */
  readonly pageSizeOptions = input<number[] | undefined>([5, 10, 15]);

  /** Show/hide the page size selector in pagination. */
  readonly showPageSizeSelector = input<boolean | undefined>(true);

  /** Enable sorting functionality for sortable columns. */
  readonly sortable = input<boolean | undefined>(true);

  /** Row selection mode. */
  readonly selectable = input<'none' | 'single' | 'multi' | undefined>('none');

  /** Array of selected row IDs. */
  readonly selectedRowIds = input<string[] | undefined>();

  /** Zebra striped tables differentiate rows by styling them in an alternating fashion. */
  readonly zebra = input<boolean | undefined>(false);

  /** Accessibility caption for the table. */
  readonly caption = input<string | undefined>();

  /** Emits when cell editing starts. */
  readonly cellEditStart = output<{ rowIndex: number; colId: string }>();

  /** Emits when cell editing is committed with the new value. */
  readonly cellEditCommit = output<{
    rowIndex: number;
    colId: string;
    newValue: unknown;
    updatedRow: Record<string, unknown>;
  }>();

  /** Emits when a row is clicked. */
  readonly rowClick = output<{ row: Record<string, unknown>; index: number }>();

  /** Emits when sorting changes with the new sorting state. */
  readonly sortChange = output<SortingState>();

  /** Emits when pagination changes with the new pagination state. */
  readonly paginationChange = output<IPaginationChangeEventDetail>();

  /** Emits when row selection changes with the selected rows and their IDs. */
  readonly rowSelectionChange = output<{
    selectedRows: Record<string, unknown>[];
    selectedRowIds: string[];
  }>();

  handleCellEditStart(event: CustomEvent<{ rowIndex: number; colId: string }>): void {
    this.cellEditStart.emit(event.detail);
  }

  handleCellEditCommit(
    event: CustomEvent<{
      rowIndex: number;
      colId: string;
      newValue: unknown;
      updatedRow: Record<string, unknown>;
    }>
  ): void {
    this.cellEditCommit.emit(event.detail);
  }

  handleRowClick(event: CustomEvent<{ row: Record<string, unknown>; index: number }>): void {
    this.rowClick.emit(event.detail);
  }

  handleSortChange(event: CustomEvent<SortingState>): void {
    this.sortChange.emit(event.detail);
  }

  handlePaginationChange(event: CustomEvent<IPaginationChangeEventDetail>): void {
    this.paginationChange.emit(event.detail);
  }

  handleRowSelectionChange(
    event: CustomEvent<{
      selectedRows: Record<string, unknown>[];
      selectedRowIds: string[];
    }>
  ): void {
    this.rowSelectionChange.emit(event.detail);
  }
}
