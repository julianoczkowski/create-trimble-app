"use client";

import { useState, useMemo } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusDate from "../../components/ModusDate";

export default function DateDemoPage() {
  // Basic date input state
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Date constraints state
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Calculate min and max dates
  const minDate = useMemo(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }, []);

  const maxDate = useMemo(() => {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    return oneYearFromNow.toISOString().split("T")[0];
  }, []);

  const handleDateChange = (event: CustomEvent<InputEvent>) => {
    const target = event.detail.target as HTMLInputElement;
    setSelectedDate(target.value);
  };

  const handleStartDateChange = (event: CustomEvent<InputEvent>) => {
    const target = event.detail.target as HTMLInputElement;
    setStartDate(target.value);
  };

  const handleEndDateChange = (event: CustomEvent<InputEvent>) => {
    const target = event.detail.target as HTMLInputElement;
    setEndDate(target.value);
  };

  return (
    <DemoPage
      title="Modus Date"
      description="Date inputs allow users to select dates from a calendar picker or enter dates manually. Use date inputs for birth dates, appointment scheduling, date ranges, and any scenario requiring date selection."
    >
      <DemoExample
        title="Basic Date Input"
        description="Simple date input with label for date selection."
      >
        <div className="flex flex-col gap-4">
          <ModusDate
            label="Select Date"
            value={selectedDate}
            onInputChange={handleDateChange}
          />
          {selectedDate && (
            <div className="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
              <div className="font-semibold mb-2">Selected Date:</div>
              <div className="text-sm">{selectedDate}</div>
            </div>
          )}
        </div>
      </DemoExample>

      <DemoExample
        title="Date Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div className="flex flex-col gap-4">
          <ModusDate label="Small Date Input" size="sm" />
          <ModusDate label="Medium Date Input (Default)" size="md" />
          <ModusDate label="Large Date Input" size="lg" />
        </div>
      </DemoExample>

      <DemoExample
        title="Date Formats"
        description="Different date format options for various locales and preferences."
      >
        <div className="flex flex-col gap-4">
          <ModusDate label="YYYY-MM-DD Format" format="yyyy-mm-dd" />
          <ModusDate label="DD-MM-YYYY Format" format="dd-mm-yyyy" />
          <ModusDate label="YYYY/MM/DD Format" format="yyyy/mm/dd" />
          <ModusDate label="DD/MM/YYYY Format" format="dd/mm/yyyy" />
          <ModusDate label="MMM DD, YYYY Format" format="MMM DD, YYYY" />
        </div>
      </DemoExample>

      <DemoExample
        title="Date Constraints"
        description="Set minimum and maximum dates to restrict date selection."
      >
        <div className="flex flex-col gap-4">
          <ModusDate
            label="Start Date (Min: Today)"
            min={minDate}
            value={startDate}
            onInputChange={handleStartDateChange}
          />
          <ModusDate
            label="End Date (Max: 1 Year from Start)"
            min={startDate || minDate}
            max={maxDate}
            value={endDate}
            onInputChange={handleEndDateChange}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Feedback Messages"
        description="Display validation feedback with different severity levels."
      >
        <div className="flex flex-col gap-4">
          <ModusDate
            label="Date with Success Feedback"
            feedback={{
              level: "success",
              message: "Date is valid",
            }}
          />
          <ModusDate
            label="Date with Warning Feedback"
            feedback={{
              level: "warning",
              message: "Please verify the date",
            }}
          />
          <ModusDate
            label="Date with Error Feedback"
            feedback={{
              level: "error",
              message: "Invalid date format",
            }}
          />
          <ModusDate
            label="Date with Info Feedback"
            feedback={{
              level: "info",
              message: "Select a date within the next 30 days",
            }}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled and Read-Only States"
        description="Date inputs in disabled and read-only states."
      >
        <div className="flex flex-col gap-4">
          <ModusDate label="Disabled Date Input" disabled value="2024-01-15" />
          <ModusDate label="Read-Only Date Input" readOnly value="2024-06-20" />
        </div>
      </DemoExample>

      <DemoExample
        title="Required Field"
        description="Mark date inputs as required for form validation."
      >
        <div className="flex flex-col gap-4">
          <ModusDate label="Birth Date (Required)" required />
          <ModusDate label="Appointment Date (Required)" required />
        </div>
      </DemoExample>

      <DemoExample
        title="Bordered and Borderless"
        description="Date inputs with and without borders."
      >
        <div className="flex flex-col gap-4">
          <ModusDate label="Bordered Date Input (Default)" bordered />
          <ModusDate label="Borderless Date Input" bordered={false} />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
