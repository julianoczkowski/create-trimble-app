"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTimeInput from "../../components/ModusTimeInput";

export default function TimeInputDemoPage() {
  return (
    <DemoPage
      title="Modus Time Input"
      description="Time input components allow users to enter or select a time value. Use time inputs for scheduling, appointments, or any scenario requiring time selection."
    >
      <DemoExample
        title="Basic Time Input"
        description="Simple time input with label."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="start-time-input"
              label="Start time"
              value="09:00"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="end-time-input"
              label="End time"
              value="17:00"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Time Input Sizes"
        description="Time inputs in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="small-time-input"
              label="Small"
              value="09:00"
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="medium-time-input"
              label="Medium"
              value="09:00"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="large-time-input"
              label="Large"
              value="09:00"
              size="lg"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Time Input with Seconds"
        description="Time inputs displaying seconds."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="seconds-time-input"
              label="Time with Seconds"
              value="09:30:45"
              showSeconds={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="seconds-default-time-input"
              label="Default Format"
              value="09:30"
              showSeconds={false}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Time Input with Constraints"
        description="Time inputs with min and max values."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="min-max-time-input"
              label="Business Hours"
              value="09:00"
              min="09:00"
              max="17:00"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="afternoon-time-input"
              label="Afternoon Hours"
              value="14:00"
              min="12:00"
              max="18:00"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Required and Disabled States"
        description="Time inputs in required and disabled states."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="required-time-input"
              label="Required"
              value="09:00"
              required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTimeInput
              inputId="disabled-time-input"
              label="Disabled"
              value="09:00"
              disabled={true}
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
