"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusChip from "../../components/ModusChip";

export default function ChipDemoPage() {
  return (
    <DemoPage
      title="Modus Chip"
      description="Chips represent filters, categories, or lightweight metadata. Keep text short and rely on the remove affordance sparingly."
    >
      <DemoExample
        title="Filter chips"
        description="Use the active state to show which filters are currently applied."
      >
        <div className="flex flex-wrap gap-3">
          <ModusChip label="Design" active />
          <ModusChip label="Research" />
          <ModusChip label="Field ops" />
          <ModusChip label="Marketing" />
        </div>
      </DemoExample>
      <DemoExample
        title="Removable selections"
        description="Allow people to clear individual selections instead of resetting everything."
      >
        <div className="flex flex-wrap gap-3">
          <ModusChip label="Austin" showRemove />
          <ModusChip label="Madrid" showRemove />
          <ModusChip label="Singapore" showRemove hasError />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
