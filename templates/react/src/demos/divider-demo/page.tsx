"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusDivider from "../../components/ModusDivider";

export default function DividerDemoPage() {
  return (
    <DemoPage
      title="Modus Divider"
      description="Dividers create subtle separation between related groups of content. Use them sparingly to support visual rhythm."
    >
      <DemoExample
        title="Section break"
        description="Horizontal dividers work well between stacked card sections."
      >
        <div className="flex flex-col gap-4">
          <div className="text-base text-foreground font-medium">
            Sprint goals
          </div>
          <div className="text-sm text-foreground opacity-80">
            Align the launch checklist, finalize localization strings, and prep
            the enablement deck for field teams.
          </div>
          <ModusDivider />
          <div className="text-sm text-foreground opacity-80">
            Next review: Wednesday 10:00 AM Pacific with the cross-functional
            crew.
          </div>
        </div>
      </DemoExample>
      <DemoExample
        title="Compact layout"
        description="Vertical dividers help separate quick stats in a row."
      >
        <div className="flex items-center gap-4 rounded-lg bg-card p-4 border-default">
          <div className="flex flex-col">
            <div className="text-sm text-foreground opacity-80">Revenue</div>
            <div className="text-lg font-semibold text-foreground">$420k</div>
          </div>
          <ModusDivider orientation="vertical" thickness="md" />
          <div className="flex flex-col">
            <div className="text-sm text-foreground opacity-80">Conversion</div>
            <div className="text-lg font-semibold text-foreground">32%</div>
          </div>
          <ModusDivider orientation="vertical" thickness="md" />
          <div className="flex flex-col">
            <div className="text-sm text-foreground opacity-80">
              Active trials
            </div>
            <div className="text-lg font-semibold text-foreground">58</div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
