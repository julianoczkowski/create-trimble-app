"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusInputFeedback from "../../components/ModusInputFeedback";

export default function InputFeedbackDemoPage() {
  return (
    <DemoPage
      title="Modus Input Feedback"
      description="Feedback messages reinforce input state and guide corrections. Keep the message concise and actionable."
    >
      <DemoExample
        title="Success feedback"
        description="Confirm when an entry is valid or passes validation."
      >
        <ModusInputFeedback
          level="success"
          message="Looks great—this slug is available."
          icon="check_circle"
        />
      </DemoExample>
      <DemoExample
        title="Error feedback"
        description="Explain what went wrong and how to fix it."
      >
        <ModusInputFeedback
          level="error"
          message="Enter a date within the active project window."
          icon="cancel_circle"
        />
      </DemoExample>
    </DemoPage>
  );
}
