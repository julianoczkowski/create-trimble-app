"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTable, { type TableColumn } from "../../components/ModusTable";

// Basic team data
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

// Product inventory data for pagination example
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

// Employee data for selection example
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

// Task data for editable example
const taskColumns: TableColumn[] = [
  {
    id: "id",
    header: "ID",
    accessor: "id",
    width: "60px",
    // No editor property - makes this column non-editable
  },
  {
    id: "task",
    header: "Task",
    accessor: "task",
    width: "40%",
    editor: "custom",
    customEditorRenderer: (
      value: unknown,
      onCommit: (value: unknown) => void
    ) => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = String(value || "");
      input.style.width = "100%";
      input.style.border = "1px solid var(--border)";
      input.style.padding = "4px 8px";
      input.style.borderRadius = "4px";
      input.style.fontSize = "14px";

      // Auto-focus and select text
      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);

      // Commit on Enter or blur
      const commitValue = () => {
        onCommit(input.value);
      };

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitValue();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCommit(value); // Revert to original value
        }
      });

      input.addEventListener("blur", commitValue);

      return input;
    },
  },
  {
    id: "assignee",
    header: "Assignee",
    accessor: "assignee",
    editor: "custom",
    customEditorRenderer: (
      value: unknown,
      onCommit: (value: unknown) => void
    ) => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = String(value || "");
      input.style.width = "100%";
      input.style.border = "1px solid var(--border)";
      input.style.padding = "4px 8px";
      input.style.borderRadius = "4px";
      input.style.fontSize = "14px";

      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);

      const commitValue = () => {
        onCommit(input.value);
      };

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitValue();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCommit(value);
        }
      });

      input.addEventListener("blur", commitValue);

      return input;
    },
  },
  {
    id: "priority",
    header: "Priority",
    accessor: "priority",
    editor: "custom",
    customEditorRenderer: (
      value: unknown,
      onCommit: (value: unknown) => void
    ) => {
      const select = document.createElement("select");
      select.style.width = "100%";
      select.style.border = "1px solid var(--border)";
      select.style.padding = "4px 8px";
      select.style.borderRadius = "4px";
      select.style.fontSize = "14px";

      const options = ["Low", "Medium", "High"];
      options.forEach((option) => {
        const optionElement = document.createElement("option");
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

      select.addEventListener("change", commitValue);
      select.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitValue();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCommit(value);
        }
      });

      select.addEventListener("blur", commitValue);

      return select;
    },
  },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    editor: "custom",
    customEditorRenderer: (
      value: unknown,
      onCommit: (value: unknown) => void
    ) => {
      const select = document.createElement("select");
      select.style.width = "100%";
      select.style.border = "1px solid var(--border)";
      select.style.padding = "4px 8px";
      select.style.borderRadius = "4px";
      select.style.fontSize = "14px";

      const options = ["Pending", "In Progress", "Completed", "Scheduled"];
      options.forEach((option) => {
        const optionElement = document.createElement("option");
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

      select.addEventListener("change", commitValue);
      select.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitValue();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCommit(value);
        }
      });

      select.addEventListener("blur", commitValue);

      return select;
    },
  },
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
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [taskData, setTaskData] = useState(initialTaskData);

  const handleEmployeeSelection = (
    event: CustomEvent<{ selectedRows: unknown[]; selectedRowIds: string[] }>
  ) => {
    setSelectedEmployees(event.detail.selectedRowIds);
  };

  const handlePaginationChange = (
    event: CustomEvent<{ currentPage: number; pageSize: number }>
  ) => {
    setCurrentPage(event.detail.currentPage);
  };

  const handleCellEditStart = (
    event: CustomEvent<{ rowIndex: number; colId: string }>
  ) => {
    console.log("Cell edit started:", event.detail);
  };

  const handleCellEditCommit = (
    event: CustomEvent<{
      rowIndex: number;
      colId: string;
      newValue: unknown;
      updatedRow: unknown;
    }>
  ) => {
    console.log("Cell edited:", event.detail);
    const { rowIndex, colId, newValue, updatedRow } = event.detail;
    console.log(`Row ${rowIndex}, Column ${colId} updated to:`, newValue);
    console.log("Updated row:", updatedRow);

    // Create new data array with the updated row (immutable update)
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
          currentPage={currentPage}
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
          selectedRowIds={selectedEmployees}
          onRowSelectionChange={handleEmployeeSelection}
          density="comfortable"
          hover
        />
        {selectedEmployees.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">
              Selected {selectedEmployees.length} employee(s):{" "}
              {selectedEmployees.join(", ")}
            </div>
          </div>
        )}
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
          data={taskData}
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
