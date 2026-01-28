"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusBadge from "../../components/ModusBadge";

export default function BadgeDemoPage() {
  return (
    <DemoPage
      title="Modus Badge"
      description="Badges highlight quick status indicators or counts. Choose a concise label and keep the color aligned with meaning."
    >
      <DemoExample
        title="Status indicators"
        description="Filled badges stand out on dashboards or tables."
      >
        <div className="flex flex-wrap gap-3">
          <ModusBadge color="success">Active</ModusBadge>
          <ModusBadge color="warning">Pending</ModusBadge>
          <ModusBadge color="danger">Blocked</ModusBadge>
        </div>
      </DemoExample>
      <DemoExample
        title="Counters"
        description="Use the counter variant to show the number of items that need attention."
      >
        <div className="flex items-center gap-3">
          <div className="text-base text-foreground">Messages</div>
          <ModusBadge color="secondary" variant="counter">
            8
          </ModusBadge>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
