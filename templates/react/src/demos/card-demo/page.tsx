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
            <div className="text-sm text-foreground-80">
              Updated 2 hours ago
            </div>
          }
          actions={
            <div className="flex gap-2">
              <ModusButton color="primary" size="sm">
                Open project
              </ModusButton>
              <ModusButton variant="outlined" size="sm">
                Share
              </ModusButton>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-sm text-foreground-80">
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
            <div className="text-sm text-foreground-80">
              Inventory: 18 units available
            </div>
          }
          actions={
            <ModusButton color="primary" size="sm">
              Reserve
            </ModusButton>
          }
        >
          <div className="text-sm text-foreground-80">
            Includes GPS, survey equipment, and safety checklist. Recommended
            for teams working on remote installs.
          </div>
        </ModusCard>
      </DemoExample>

      <DemoExample
        title="Card with Header Image"
        description="Add an image or figure in the header slot to provide visual context."
      >
        <ModusCard
          layout="horizontal"
          bordered
          header={
            <div className="w-full md:w-48 h-48 overflow-hidden">
              <img
                src="https://i.pravatar.cc/300?img=12"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          }
          title={
            <div className="text-lg font-medium text-foreground">
              Team Member
            </div>
          }
          subtitle={
            <div className="text-sm text-foreground-80">Senior Developer</div>
          }
          actions={
            <ModusButton color="primary" size="sm">
              Contact
            </ModusButton>
          }
        >
          <div className="text-sm text-foreground-80">
            Specializes in frontend architecture and design systems. Available for
            new projects starting next quarter.
          </div>
        </ModusCard>
      </DemoExample>

      <DemoExample
        title="Background Figure Card"
        description="Use background-figure to stretch header images across the entire card with overlaid text."
      >
        <ModusCard
          backgroundFigure
          header={
            <div className="w-full h-64 overflow-hidden">
              <img
                src="https://picsum.photos/id/1045/600/400"
                alt="Scenic view"
                className="w-full h-full object-cover"
              />
            </div>
          }
          title={
            <div className="text-2xl font-semibold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
              Featured Project
            </div>
          }
          subtitle={
            <div className="text-base text-white/80 [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
              Launching Q2 2024
            </div>
          }
          actions={
            <ModusButton color="primary" size="sm">
              Learn More
            </ModusButton>
          }
        >
          <div className="text-base text-white/80 [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
            This project showcases innovative design patterns and modern user
            experiences. Join us for the launch event.
          </div>
        </ModusCard>
      </DemoExample>

      <DemoExample
        title="Card with Footer"
        description="Use the footer slot for metadata, tags, or additional information outside the main content area."
      >
        <ModusCard
          bordered
          title={
            <div className="text-xl font-semibold text-foreground">
              Document Review
            </div>
          }
          subtitle={
            <div className="text-sm text-foreground-80">
              Last updated: 3 days ago
            </div>
          }
          actions={
            <ModusButton variant="outlined" size="sm">
              Edit
            </ModusButton>
          }
          footer={
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex gap-2">
                <div className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                  Draft
                </div>
                <div className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                  Review
                </div>
              </div>
              <div className="text-xs text-muted-foreground">3 reviewers</div>
            </div>
          }
        >
          <div className="text-sm text-foreground-80">
            This document contains important project specifications and
            requirements. Please review and provide feedback by end of week.
          </div>
        </ModusCard>
      </DemoExample>

      <DemoExample
        title="Compact Padding"
        description="Use compact padding for dense dashboards or when space is limited."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ModusCard
            padding="compact"
            bordered
            title={
              <div className="text-base font-medium text-foreground">
                Active Users
              </div>
            }
          >
            <div className="text-2xl font-bold text-foreground">1,234</div>
            <div className="text-xs text-muted-foreground">
              +12% from last month
            </div>
          </ModusCard>
          <ModusCard
            padding="compact"
            bordered
            title={
              <div className="text-base font-medium text-foreground">
                Revenue
              </div>
            }
          >
            <div className="text-2xl font-bold text-foreground">$45.6K</div>
            <div className="text-xs text-muted-foreground">
              +8% from last month
            </div>
          </ModusCard>
          <ModusCard
            padding="compact"
            bordered
            title={
              <div className="text-base font-medium text-foreground">Tasks</div>
            }
          >
            <div className="text-2xl font-bold text-foreground">89</div>
            <div className="text-xs text-muted-foreground">12 pending review</div>
          </ModusCard>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
