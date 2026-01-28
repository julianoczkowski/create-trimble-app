"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusDate from "../../components/ModusDate";

export default function DateDemoPage() {
  return (
    <DemoPage
      title="Modus Date Picker"
      description="Date inputs help people schedule events or set ranges. Provide helpful labels and respect local formatting rules."
    >
      <DemoExample
        title="Due date"
        description="Let people pick a single day with an optional helper message."
      >
        <ModusDate label="Due date" value="2025-03-18" />
      </DemoExample>
      <DemoExample
        title="Availability window"
        description="Use min and max boundaries to guide selections within a project timeline."
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <ModusDate
            label="Start"
            value="2025-04-01"
            min="2025-04-01"
            max="2025-06-30"
            size="sm"
          />
          <ModusDate
            label="End"
            value="2025-04-15"
            min="2025-04-01"
            max="2025-06-30"
            size="sm"
          />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
