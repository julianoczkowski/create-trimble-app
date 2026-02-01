"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAlert from "../../components/ModusAlert";

export default function AlertDemoPage() {
  return (
    <DemoPage
      title="Modus Alert"
      description="Alerts communicate important messages to users. Use alerts to notify users about success, warnings, errors, or informational messages."
    >
      <DemoExample
        title="Alert Variants"
        description="Different alert variants for various message types and contexts."
      >
        <div className="flex flex-col gap-4">
          <ModusAlert
            alertTitle="Info Alert"
            alertDescription="This is an informational message."
            variant="info"
          />
          <ModusAlert
            alertTitle="Success Alert"
            alertDescription="Your action was completed successfully."
            variant="success"
          />
          <ModusAlert
            alertTitle="Warning Alert"
            alertDescription="Please review this important warning."
            variant="warning"
          />
          <ModusAlert
            alertTitle="Error Alert"
            alertDescription="An error occurred. Please try again."
            variant="error"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Dismissible Alerts"
        description="Alerts that can be dismissed by users with a close button."
      >
        <div className="flex flex-col gap-4">
          <ModusAlert
            alertTitle="Dismissible Info Alert"
            alertDescription="You can close this alert."
            variant="info"
            dismissible
          />
          <ModusAlert
            alertTitle="Dismissible Success Alert"
            alertDescription="This alert can be dismissed."
            variant="success"
            dismissible
          />
          <ModusAlert
            alertTitle="Dismissible Warning Alert"
            alertDescription="Close this alert when you're done."
            variant="warning"
            dismissible
          />
          <ModusAlert
            alertTitle="Dismissible Error Alert"
            alertDescription="Dismiss this error alert after reviewing."
            variant="error"
            dismissible
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Alerts with Custom Icons"
        description="Enhance alerts with custom icons for better visual communication."
      >
        <div className="flex flex-col gap-4">
          <ModusAlert
            alertTitle="Notification"
            alertDescription="You have new messages."
            variant="info"
            icon="notifications"
          />
          <ModusAlert
            alertTitle="File Uploaded"
            alertDescription="Your file has been uploaded successfully."
            variant="success"
            icon="upload"
          />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
