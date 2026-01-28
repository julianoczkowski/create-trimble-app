"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAccordion from "../../components/ModusAccordion";

const onboardingItems = [
  {
    id: "intro",
    options: {
      title: "Project overview",
      description: "Summarize the goal before teammates dive in",
      icon: "dashboard",
      size: "md" as const,
    },
    bordered: true,
    content: (
      <div className="flex flex-col gap-2 text-foreground">
        <div className="text-sm opacity-80">
          Share the project intent, target audience, and expected outcomes to
          help everyone start with the same context.
        </div>
        <div className="text-sm opacity-80">
          Keep the copy focused so collaborators can scan the essentials in a
          few seconds.
        </div>
      </div>
    ),
  },
  {
    id: "plan",
    options: {
      title: "Key milestones",
      description: "List the checkpoints that keep work moving",
      icon: "calendar",
      size: "md" as const,
    },
    bordered: true,
    content: (
      <div className="flex flex-col gap-2 text-foreground">
        <div className="text-sm opacity-80">
          Outline the next three deliverables with owners and target dates.
          Include links to supporting briefs or documentation when possible.
        </div>
      </div>
    ),
  },
  {
    id: "resources",
    options: {
      title: "Reference material",
      description: "Surface the documents teammates revisit often",
      icon: "folder_open",
      size: "md" as const,
    },
    bordered: true,
    content: (
      <div className="flex flex-col gap-2 text-foreground">
        <div className="text-sm opacity-80">
          Provide quick links to design files, analytics dashboards, and shared
          folders so the team can jump in without searching.
        </div>
      </div>
    ),
  },
];

const compactItems = [
  {
    id: "specs",
    options: {
      title: "Specifications",
      description: "Give buyers a snapshot of the essentials",
      icon: "document",
      size: "sm" as const,
    },
    content: (
      <div className="text-sm text-foreground opacity-80">
        Dimensions, supported accessories, and compatibility details live here
        so shoppers can confirm fit before purchasing.
      </div>
    ),
  },
  {
    id: "shipping",
    options: {
      title: "Shipping",
      description: "Clarify timelines and regional availability",
      icon: "delivery_truck",
      size: "sm" as const,
    },
    content: (
      <div className="text-sm text-foreground opacity-80">
        Share typical processing times, carrier partners, and any regional
        limitations to set expectations early.
      </div>
    ),
  },
];

export default function AccordionDemoPage() {
  return (
    <DemoPage
      title="Modus Accordion"
      description="Use accordions to progressively disclose dense information without overwhelming the page. Each item should contain a short summary so readers understand what they will reveal."
    >
      <DemoExample
        title="Onboarding overview"
        description="Group foundational project context in a medium accordion so teammates can explore details in order."
      >
        <ModusAccordion items={onboardingItems} />
      </DemoExample>
      <DemoExample
        title="Compact product details"
        description="Use smaller accordion items inside product cards or side panels when space is limited."
      >
        <ModusAccordion items={compactItems} />
      </DemoExample>
    </DemoPage>
  );
}
