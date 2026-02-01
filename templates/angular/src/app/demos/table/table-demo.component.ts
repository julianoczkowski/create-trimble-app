import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusTableComponent } from '../../components/modus-table.component';
import type { ITableColumn, IPaginationChangeEventDetail } from '@trimble-oss/moduswebcomponents';

// Basic team data
const teamColumns: ITableColumn[] = [
  { id: 'name', header: 'Name', accessor: 'name', width: '40%' },
  { id: 'role', header: 'Role', accessor: 'role' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

const teamData = [
  { id: '1', name: 'Alex Rivera', role: 'Project Lead', status: 'Active' },
  { id: '2', name: 'Brianna Lee', role: 'UX Researcher', status: 'In review' },
  { id: '3', name: 'Chris Patel', role: 'Developer', status: 'Active' },
  { id: '4', name: 'Morgan Diaz', role: 'Analyst', status: 'Blocked' },
];

// Product inventory data for pagination example
const productColumns: ITableColumn[] = [
  { id: 'product', header: 'Product', accessor: 'product', width: '50%' },
  { id: 'category', header: 'Category', accessor: 'category' },
  { id: 'price', header: 'Price', accessor: 'price', sortable: true },
  { id: 'stock', header: 'Stock', accessor: 'stock', sortable: true },
];

const productData = Array.from({ length: 25 }, (_, i) => ({
  id: `p${i + 1}`,
  product: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'][i % 5],
  price: (i + 1) * 10,
  stock: Math.floor(Math.random() * 100) + 1,
}));

// Employee data for selection example
const employeeColumns: ITableColumn[] = [
  { id: 'name', header: 'Name', accessor: 'name', width: '30%' },
  { id: 'department', header: 'Department', accessor: 'department' },
  { id: 'salary', header: 'Salary', accessor: 'salary', sortable: true },
  { id: 'experience', header: 'Experience', accessor: 'experience', sortable: true },
];

const employeeData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    department: 'Engineering',
    salary: 95000,
    experience: '5 years',
  },
  { id: '2', name: 'Michael Chen', department: 'Marketing', salary: 75000, experience: '3 years' },
  {
    id: '3',
    name: 'Emily Davis',
    department: 'Engineering',
    salary: 110000,
    experience: '8 years',
  },
  { id: '4', name: 'David Wilson', department: 'Sales', salary: 65000, experience: '2 years' },
  { id: '5', name: 'Lisa Brown', department: 'HR', salary: 70000, experience: '4 years' },
];

// Helper function to create a text input editor
function createTextEditor(value: unknown, onCommit: (value: unknown) => void): HTMLElement {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = String(value || '');
  input.style.width = '100%';
  input.style.border = '1px solid var(--border)';
  input.style.padding = '4px 8px';
  input.style.borderRadius = '4px';
  input.style.fontSize = '14px';
  input.style.backgroundColor = 'var(--background)';
  input.style.color = 'var(--foreground)';

  // Auto-focus and select text
  setTimeout(() => {
    input.focus();
    input.select();
  }, 0);

  // Commit on Enter or blur
  const commitValue = () => {
    onCommit(input.value);
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitValue();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onCommit(value); // Revert to original value
    }
  });

  input.addEventListener('blur', commitValue);

  return input;
}

// Helper function to create a select dropdown editor
function createSelectEditor(
  value: unknown,
  onCommit: (value: unknown) => void,
  options: string[],
): HTMLElement {
  const select = document.createElement('select');
  select.style.width = '100%';
  select.style.border = '1px solid var(--border)';
  select.style.padding = '4px 8px';
  select.style.borderRadius = '4px';
  select.style.fontSize = '14px';
  select.style.backgroundColor = 'var(--background)';
  select.style.color = 'var(--foreground)';

  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    optionElement.selected = option === value;
    select.appendChild(optionElement);
  });

  setTimeout(() => {
    select.focus();
  }, 0);

  const commitValue = () => {
    onCommit(select.value);
  };

  select.addEventListener('change', commitValue);
  select.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitValue();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onCommit(value);
    }
  });

  select.addEventListener('blur', commitValue);

  return select;
}

// Task data for editable example
const taskColumns: ITableColumn[] = [
  {
    id: 'id',
    header: 'ID',
    accessor: 'id',
    width: '60px',
    // No editor property - makes this column non-editable
  },
  {
    id: 'task',
    header: 'Task',
    accessor: 'task',
    width: '40%',
    editor: 'custom',
    customEditorRenderer: (value: unknown, onCommit: (value: unknown) => void) =>
      createTextEditor(value, onCommit),
  },
  {
    id: 'assignee',
    header: 'Assignee',
    accessor: 'assignee',
    editor: 'custom',
    customEditorRenderer: (value: unknown, onCommit: (value: unknown) => void) =>
      createTextEditor(value, onCommit),
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    editor: 'custom',
    customEditorRenderer: (value: unknown, onCommit: (value: unknown) => void) =>
      createSelectEditor(value, onCommit, ['Low', 'Medium', 'High']),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    editor: 'custom',
    customEditorRenderer: (value: unknown, onCommit: (value: unknown) => void) =>
      createSelectEditor(value, onCommit, ['Pending', 'In Progress', 'Completed', 'Scheduled']),
  },
];

const initialTaskData = [
  {
    id: '1',
    task: 'Design new dashboard',
    assignee: 'Alex Rivera',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: '2',
    task: 'Update documentation',
    assignee: 'Brianna Lee',
    priority: 'Medium',
    status: 'Pending',
  },
  { id: '3', task: 'Code review', assignee: 'Chris Patel', priority: 'High', status: 'Completed' },
  { id: '4', task: 'User testing', assignee: 'Morgan Diaz', priority: 'Low', status: 'Scheduled' },
];

/**
 * Demo page showcasing the Modus Table component.
 *
 * Demonstrates table features including:
 * - Basic table with comfortable density
 * - Compact density with zebra striping
 * - Paginated tables with navigation
 * - Multi-select and single-select modes
 * - Editable cells with inline editing
 * - Sortable columns
 * - Relaxed density for better readability
 */
@Component({
  selector: 'app-table-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusTableComponent],
  template: `
    <demo-page
      title="Modus Table"
      description="Tables structure datasets for scanning and comparison. Limit the number of columns and prioritize the most actionable information."
    >
      <demo-example
        title="Basic Table"
        description="Comfortable density balances readability with information density."
      >
        <modus-table
          [columns]="teamColumns"
          [data]="teamData"
          density="comfortable"
          [zebra]="true"
          [hover]="true"
        />
      </demo-example>

      <demo-example
        title="Compact Density with Zebra Striping"
        description="Compact density maximizes information density for data-heavy tables."
      >
        <modus-table
          [columns]="productColumns"
          [data]="productDataSlice"
          density="compact"
          [zebra]="true"
          [hover]="false"
        />
      </demo-example>

      <demo-example
        title="Paginated Table"
        description="Pagination helps manage large datasets by showing a subset of rows with navigation controls."
      >
        <modus-table
          [columns]="productColumns"
          [data]="productData"
          [paginated]="true"
          [currentPage]="currentPage()"
          [pageSizeOptions]="[5, 10, 15, 20]"
          [showPageSizeSelector]="true"
          (paginationChange)="handlePaginationChange($event)"
          density="comfortable"
          [zebra]="true"
        />
      </demo-example>

      <demo-example
        title="Multi-Select Table"
        description="Enable row selection with checkboxes for bulk operations."
      >
        <modus-table
          [columns]="employeeColumns"
          [data]="employeeData"
          selectable="multi"
          [selectedRowIds]="selectedEmployees()"
          (rowSelectionChange)="handleEmployeeSelection($event)"
          density="comfortable"
          [hover]="true"
        />
        @if (selectedEmployees().length > 0) {
          <div class="mt-4 p-3 bg-muted rounded-lg">
            <div class="text-sm text-muted-foreground">
              Selected {{ selectedEmployees().length }} employee(s):
              {{ selectedEmployees().join(', ') }}
            </div>
          </div>
        }
      </demo-example>

      <demo-example
        title="Single Select Table"
        description="Single selection mode uses radio buttons for choosing one row."
      >
        <modus-table
          [columns]="employeeColumns"
          [data]="employeeDataSlice"
          selectable="single"
          density="relaxed"
          [hover]="true"
        />
      </demo-example>

      <demo-example
        title="Editable Table"
        description="Enable inline editing for data modification. Click on any cell to edit."
      >
        <modus-table
          [columns]="taskColumns"
          [data]="taskData()"
          [editable]="true"
          (cellEditStart)="handleCellEditStart($event)"
          (cellEditCommit)="handleCellEditCommit($event)"
          density="relaxed"
          [hover]="true"
        />
      </demo-example>

      <demo-example
        title="Sortable Table"
        description="All columns are sortable by default. Click headers to sort data."
      >
        <modus-table
          [columns]="employeeColumns"
          [data]="employeeData"
          [sortable]="true"
          density="comfortable"
          [zebra]="true"
        />
      </demo-example>

      <demo-example
        title="Relaxed Density"
        description="Relaxed density provides more spacing for better readability."
      >
        <modus-table [columns]="teamColumns" [data]="teamData" density="relaxed" [hover]="true" />
      </demo-example>
    </demo-page>
  `,
})
export class TableDemoPageComponent {
  // Column definitions
  readonly teamColumns = teamColumns;
  readonly productColumns = productColumns;
  readonly employeeColumns = employeeColumns;
  readonly taskColumns = taskColumns;

  // Data sets
  readonly teamData = teamData;
  readonly productData = productData;
  readonly productDataSlice = productData.slice(0, 8);
  readonly employeeData = employeeData;
  readonly employeeDataSlice = employeeData.slice(0, 4);

  // State management
  readonly selectedEmployees = signal<string[]>([]);
  readonly currentPage = signal<number>(1);
  readonly taskData = signal<Record<string, unknown>[]>([...initialTaskData]);

  handleEmployeeSelection(event: {
    selectedRows: Record<string, unknown>[];
    selectedRowIds: string[];
  }): void {
    this.selectedEmployees.set(event.selectedRowIds);
  }

  handlePaginationChange(event: IPaginationChangeEventDetail): void {
    this.currentPage.set(event.currentPage);
  }

  handleCellEditStart(event: { rowIndex: number; colId: string }): void {
    console.log('Cell edit started:', event);
  }

  handleCellEditCommit(event: {
    rowIndex: number;
    colId: string;
    newValue: unknown;
    updatedRow: Record<string, unknown>;
  }): void {
    console.log('Cell edited:', event);
    const { rowIndex, colId, newValue } = event;
    console.log(`Row ${rowIndex}, Column ${colId} updated to:`, newValue);

    // Create new data array with the updated row (immutable update)
    this.taskData.update((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = { ...newData[rowIndex], [colId]: newValue };
      return newData;
    });
  }
}
