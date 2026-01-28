"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAlert from "../../components/ModusAlert";

export default function AlertDemoPage() {
  return (
    <DemoPage
      title="Modus Alert"
      description="Alerts draw attention to short system messages. Keep the title direct, offer one sentence of context, and reserve dismissible alerts for notifications that do not require mandatory follow-up."
    >
      <DemoExample
        title="Success confirmation"
        description="Reassure people when an action completes successfully and note what happened."
      >
        <ModusAlert
          alertTitle="Data synced"
          alertDescription="All project changes are now reflected in the shared workspace."
          variant="success"
          icon="check_circle"
        />
      </DemoExample>
      <DemoExample
        title="Action required"
        description="Use warning alerts for tasks that still need attention and include the next step."
      >
        <ModusAlert
          alertTitle="Update billing details"
          alertDescription="Your payment method expires soon. Add a new card to avoid service interruptions."
          variant="warning"
          icon="warning"
          dismissible
        />
      </DemoExample>
    </DemoPage>
  );
}
