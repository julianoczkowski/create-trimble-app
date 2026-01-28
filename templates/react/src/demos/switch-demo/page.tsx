"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSwitch from "../../components/ModusSwitch";

export default function SwitchDemoPage() {
  return (
    <DemoPage
      title="Modus Switch"
      description="Switches toggle persistent settings on or off. Use sentence case labels that describe the resulting state."
    >
      <DemoExample
        title="Notification control"
        description="Default switches to on when most people want the feature enabled."
      >
        <ModusSwitch label="Send email alerts" value />
      </DemoExample>
      <DemoExample
        title="Compact switch"
        description="Smaller switches work well in condensed layouts."
      >
        <ModusSwitch label="Enable beta" size="sm" />
      </DemoExample>
    </DemoPage>
  );
}
