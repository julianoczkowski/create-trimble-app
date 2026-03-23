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
            <div class="text-xl font-semibold text-foreground">
              Atlas Renewal
            </div>
          }
          subtitle={
            <div class="text-sm text-foreground-80">
              Updated 2 hours ago
            </div>
          }
          actions={
            <div class="flex gap-2">
              <ModusButton color="primary" size="sm">
                Open project
              </ModusButton>
              <ModusButton variant="outlined" size="sm">
                Share
              </ModusButton>
            </div>
          }
        >
          <div class="flex flex-col gap-3 text-sm text-foreground-80">
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
            <div class="text-lg font-medium text-foreground">Field kit</div>
          }
          subtitle={
            <div class="text-sm text-foreground-80">
              Inventory: 18 units available
            </div>
          }
          actions={
            <ModusButton color="primary" size="sm">
              Reserve
            </ModusButton>
          }
        >
          <div class="text-sm text-foreground-80">
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
            <div class="w-full md:w-48 h-48 overflow-hidden">
              <img
                src="https://i.pravatar.cc/300?img=12"
                alt="User avatar"
                class="w-full h-full object-cover"
              />
            </div>
          }
          title={
            <div class="text-lg font-medium text-foreground">
              Team Member
            </div>
          }
          subtitle={
            <div class="text-sm text-foreground-80">Senior Developer</div>
          }
          actions={
            <ModusButton color="primary" size="sm">
              Contact
            </ModusButton>
          }
        >
          <div class="text-sm text-foreground-80">
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
            <div class="w-full h-64 overflow-hidden">
              <img
                src="https://picsum.photos/id/1045/600/400"
                alt="Scenic view"
                class="w-full h-full object-cover"
              />
            </div>
          }
          title={
            <div class="text-2xl font-semibold text-foreground">
              Featured Project
            </div>
          }
          subtitle={
            <div class="text-base text-foreground-60">
              Launching Q2 2024
            </div>
          }
          actions={
            <ModusButton color="primary" size="sm">
              Learn More
            </ModusButton>
          }
        >
          <div class="text-base text-foreground-80">
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
            <div class="text-xl font-semibold text-foreground">
              Document Review
            </div>
          }
          subtitle={
            <div class="text-sm text-foreground-80">
              Last updated: 3 days ago
            </div>
          }
          actions={
            <ModusButton variant="outlined" size="sm">
              Edit
            </ModusButton>
          }
          footer={
            <div class="flex items-center justify-between pt-3 border-top-default">
              <div class="flex gap-2">
                <div class="px-2 py-0.5 text-xs font-medium rounded bg-muted text-foreground-80">
                  Draft
                </div>
                <div class="px-2 py-0.5 text-xs font-medium rounded bg-primary-20 text-primary">
                  Review
                </div>
              </div>
              <div class="text-xs text-foreground-60">3 reviewers</div>
            </div>
          }
        >
          <div class="text-sm text-foreground-80">
            This document contains important project specifications and
            requirements. Please review and provide feedback by end of week.
          </div>
        </ModusCard>
      </DemoExample>

      <DemoExample
        title="Compact Padding"
        description="Use compact padding for dense dashboards or when space is limited."
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ModusCard
            padding="compact"
            bordered
            title={
              <div class="text-base font-medium text-foreground">
                Active Users
              </div>
            }
          >
            <div class="text-2xl font-bold text-foreground">1,234</div>
            <div class="text-xs text-muted-foreground">
              +12% from last month
            </div>
          </ModusCard>
          <ModusCard
            padding="compact"
            bordered
            title={
              <div class="text-base font-medium text-foreground">
                Revenue
              </div>
            }
          >
            <div class="text-2xl font-bold text-foreground">$45.6K</div>
            <div class="text-xs text-muted-foreground">
              +8% from last month
            </div>
          </ModusCard>
          <ModusCard
            padding="compact"
            bordered
            title={
              <div class="text-base font-medium text-foreground">Tasks</div>
            }
          >
            <div class="text-2xl font-bold text-foreground">89</div>
            <div class="text-xs text-muted-foreground">12 pending review</div>
          </ModusCard>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
