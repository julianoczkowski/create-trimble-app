"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTimeInput from "../../components/ModusTimeInput";

export default function TimeInputDemoPage() {
  return (
    <DemoPage
      title="Modus Time Input"
      description="Time inputs capture precise times for scheduling. Set sensible min and max values to keep entries valid."
    >
      <DemoExample
        title="Meeting time"
        description="Use the default format for typical scheduling scenarios."
      >
        <ModusTimeInput
          label="Start time"
          value="09:30"
          min="08:00"
          max="18:00"
        />
      </DemoExample>
      <DemoExample
        title="Include seconds"
        description="Enable seconds when capturing detailed logs."
      >
        <ModusTimeInput
          label="Sensor trigger"
          value="12:45:30"
          showSeconds
          size="sm"
        />
      </DemoExample>
    </DemoPage>
  );
}
