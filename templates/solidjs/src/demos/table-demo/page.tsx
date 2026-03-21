import { createSignal } from "solid-js";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTable, { type TableColumn } from "../../components/ModusTable";
import { Show } from "solid-js";

const teamColumns = [
  { id: "name", header: "Name", accessor: "name", width: "40%" },
  { id: "role", header: "Role", accessor: "role" },
  { id: "status", header: "Status", accessor: "status" },
];

const teamData = [
  { id: "1", name: "Alex Rivera", role: "Project Lead", status: "Active" },
  { id: "2", name: "Brianna Lee", role: "UX Researcher", status: "In review" },
  { id: "3", name: "Chris Patel", role: "Developer", status: "Active" },
  { id: "4", name: "Morgan Diaz", role: "Analyst", status: "Blocked" },
];

const productColumns = [
  { id: "product", header: "Product", accessor: "product", width: "50%" },
  { id: "category", header: "Category", accessor: "category" },
  { id: "price", header: "Price", accessor: "price", sortable: true },
  { id: "stock", header: "Stock", accessor: "stock", sortable: true },
];

const productData = Array.from({ length: 25 }, (_, i) => ({
  id: `p${i + 1}`,
  product: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Books", "Home", "Sports"][i % 5],
  price: (i + 1) * 10,
  stock: Math.floor(Math.random() * 100) + 1,
}));

const employeeColumns = [
  { id: "name", header: "Name", accessor: "name", width: "30%" },
  { id: "department", header: "Department", accessor: "department" },
  { id: "salary", header: "Salary", accessor: "salary", sortable: true },
  {
    id: "experience",
    header: "Experience",
    accessor: "experience",
    sortable: true,
  },
];

const employeeData = [
  {
    id: "1",
    name: "Sarah Johnson",
    department: "Engineering",
    salary: 95000,
    experience: "5 years",
  },
  {
    id: "2",
    name: "Michael Chen",
    department: "Marketing",
    salary: 75000,
    experience: "3 years",
  },
  {
    id: "3",
    name: "Emily Davis",
    department: "Engineering",
    salary: 110000,
    experience: "8 years",
  },
  {
    id: "4",
    name: "David Wilson",
    department: "Sales",
    salary: 65000,
    experience: "2 years",
  },
  {
    id: "5",
    name: "Lisa Brown",
    department: "HR",
    salary: 70000,
    experience: "4 years",
  },
];

const taskColumns: TableColumn[] = [
  { id: "id", header: "ID", accessor: "id", width: "60px" },
  { id: "task", header: "Task", accessor: "task", width: "40%", editor: "text" },
  { id: "assignee", header: "Assignee", accessor: "assignee", editor: "text" },
  { id: "priority", header: "Priority", accessor: "priority", editor: "text" },
  { id: "status", header: "Status", accessor: "status", editor: "text" },
];

const initialTaskData = [
  {
    id: "1",
    task: "Design new dashboard",
    assignee: "Alex Rivera",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "2",
    task: "Update documentation",
    assignee: "Brianna Lee",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: "3",
    task: "Code review",
    assignee: "Chris Patel",
    priority: "High",
    status: "Completed",
  },
  {
    id: "4",
    task: "User testing",
    assignee: "Morgan Diaz",
    priority: "Low",
    status: "Scheduled",
  },
];

export default function TableDemoPage() {
  const [selectedEmployees, setSelectedEmployees] = createSignal<string[]>([]);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [taskData, setTaskData] = createSignal(initialTaskData);

  const handleEmployeeSelection = (
    event: CustomEvent<{ selectedRows: unknown[]; selectedRowIds: string[] }>,
  ) => {
    setSelectedEmployees(event.detail.selectedRowIds);
  };

  const handlePaginationChange = (
    event: CustomEvent<{ currentPage: number; pageSize: number }>,
  ) => {
    setCurrentPage(event.detail.currentPage);
  };

  const handleCellEditStart = (
    event: CustomEvent<{ rowIndex: number; colId: string }>,
  ) => {
    console.log("Cell edit started:", event.detail);
  };

  const handleCellEditCommit = (
    event: CustomEvent<{
      rowIndex: number;
      colId: string;
      newValue: unknown;
      updatedRow: unknown;
    }>,
  ) => {
    const { rowIndex, colId, newValue } = event.detail;
    setTaskData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = { ...newData[rowIndex], [colId]: newValue };
      return newData;
    });
  };

  return (
    <DemoPage
      title="Modus Table"
      description="Tables structure datasets for scanning and comparison. Limit the number of columns and prioritize the most actionable information."
    >
      <DemoExample
        title="Basic Table"
        description="Comfortable density balances readability with information density."
      >
        <ModusTable
          columns={teamColumns}
          data={teamData}
          density="comfortable"
          zebra
          hover
        />
      </DemoExample>

      <DemoExample
        title="Compact Density with Zebra Striping"
        description="Compact density maximizes information density for data-heavy tables."
      >
        <ModusTable
          columns={productColumns}
          data={productData.slice(0, 8)}
          density="compact"
          zebra
          hover={false}
        />
      </DemoExample>

      <DemoExample
        title="Paginated Table"
        description="Pagination helps manage large datasets by showing a subset of rows with navigation controls."
      >
        <ModusTable
          columns={productColumns}
          data={productData}
          paginated
          currentPage={currentPage()}
          pageSizeOptions={[5, 10, 15, 20]}
          showPageSizeSelector
          onPaginationChange={handlePaginationChange}
          density="comfortable"
          zebra
        />
      </DemoExample>

      <DemoExample
        title="Multi-Select Table"
        description="Enable row selection with checkboxes for bulk operations."
      >
        <ModusTable
          columns={employeeColumns}
          data={employeeData}
          selectable="multi"
          selectedRowIds={selectedEmployees()}
          onRowSelectionChange={handleEmployeeSelection}
          density="comfortable"
          hover
        />
        <Show when={selectedEmployees().length > 0}>
          <div class="mt-4 p-3 bg-muted rounded-lg">
            <div class="text-sm text-muted-foreground">
              Selected {selectedEmployees().length} employee(s):{" "}
              {selectedEmployees().join(", ")}
            </div>
          </div>
        </Show>
      </DemoExample>

      <DemoExample
        title="Single Select Table"
        description="Single selection mode uses radio buttons for choosing one row."
      >
        <ModusTable
          columns={employeeColumns}
          data={employeeData.slice(0, 4)}
          selectable="single"
          density="relaxed"
          hover
        />
      </DemoExample>

      <DemoExample
        title="Editable Table"
        description="Enable inline editing for data modification. Click on any cell to edit."
      >
        <ModusTable
          columns={taskColumns}
          data={taskData()}
          editable
          onCellEditStart={handleCellEditStart}
          onCellEditCommit={handleCellEditCommit}
          density="relaxed"
          hover
        />
      </DemoExample>

      <DemoExample
        title="Sortable Table"
        description="All columns are sortable by default. Click headers to sort data."
      >
        <ModusTable
          columns={employeeColumns}
          data={employeeData}
          sortable
          density="comfortable"
          zebra
        />
      </DemoExample>

      <DemoExample
        title="Relaxed Density"
        description="Relaxed density provides more spacing for better readability."
      >
        <ModusTable
          columns={teamColumns}
          data={teamData}
          density="relaxed"
          hover
        />
      </DemoExample>
    </DemoPage>
  );
}
