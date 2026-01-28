"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusRadio from "../../components/ModusRadio";

export default function RadioDemoPage() {
  return (
    <DemoPage
      title="Modus Radio"
      description="Radio buttons let people choose exactly one option from a small set. Group them with a clear prompt."
    >
      <DemoExample
        title="Billing cycle"
        description="Lay out options vertically for best readability."
      >
        <div className="flex flex-col gap-3">
          <ModusRadio label="Monthly" value name="billing" />
          <ModusRadio label="Quarterly" name="billing" />
          <ModusRadio label="Annual" name="billing" />
        </div>
      </DemoExample>
      <DemoExample
        title="Compact layout"
        description="Use the small size in dense settings such as tables or cards."
      >
        <div className="flex items-center gap-4">
          <ModusRadio label="North" size="sm" name="region" />
          <ModusRadio label="Central" size="sm" name="region" value />
          <ModusRadio label="South" size="sm" name="region" />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
