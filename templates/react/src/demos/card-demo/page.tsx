"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusCard from "../../components/ModusCard";

export default function CardDemoPage() {
  return (
    <DemoPage
      title="Modus Card"
      description="Cards group related information into a contained surface. Keep each card focused on a single concept and align supporting actions to the bottom."
    >
      <DemoExample
        title="Project summary"
        description="Vertical cards are ideal for key metrics or spotlighting a single project."
      >
        <ModusCard
          title={
            <div className="text-xl font-semibold text-foreground">
              Atlas Renewal
            </div>
          }
          subtitle={
            <div className="text-sm text-foreground opacity-80">
              Updated 2 hours ago
            </div>
          }
          actions={
            <div className="flex gap-2">
              <ModusButton size="sm">Open project</ModusButton>
              <ModusButton size="sm" variant="outlined">
                Share
              </ModusButton>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-sm text-foreground opacity-80">
            <div>Next milestone: Validate customer insights</div>
            <div>Owner: Priya Malhotra</div>
            <div>Team: Research, Field Ops</div>
          </div>
        </ModusCard>
      </DemoExample>
      <DemoExample
        title="Horizontal layout"
        description="Use horizontal cards when imagery or a quick status pairs with copy."
      >
        <ModusCard
          layout="horizontal"
          padding="compact"
          bordered
          title={
            <div className="text-lg font-medium text-foreground">Field kit</div>
          }
          subtitle={
            <div className="text-sm text-foreground opacity-80">
              Inventory: 18 units available
            </div>
          }
          actions={<ModusButton size="sm">Reserve</ModusButton>}
        >
          <div className="text-sm text-foreground opacity-80">
            Includes GPS, survey equipment, and safety checklist. Recommended
            for teams working on remote installs.
          </div>
        </ModusCard>
      </DemoExample>
    </DemoPage>
  );
}
