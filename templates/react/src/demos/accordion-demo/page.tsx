"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAccordion from "../../components/ModusAccordion";

const basicItems = [
  {
    id: "getting-started",
    options: {
      title: "Getting Started",
      description: "Learn the basics",
    },
    content: (
      <div className="p-4 text-foreground">
        This is the content for the getting started section. You can include any content here.
      </div>
    ),
  },
  {
    id: "components",
    options: {
      title: "Components",
      description: "Explore available components",
    },
    content: (
      <div className="p-4 text-foreground">
        Discover all the available components in the Modus design system.
      </div>
    ),
  },
  {
    id: "styling",
    options: {
      title: "Styling",
      description: "Customize your design",
    },
    content: (
      <div className="p-4 text-foreground">
        Learn how to style and customize components to match your brand.
      </div>
    ),
  },
];

const sizeItemsXs = [
  {
    id: "xs-panel",
    options: {
      title: "Extra Small Panel",
      description: "Compact size for tight spaces",
      size: "xs" as const,
    },
    content: (
      <div className="p-4 text-foreground">Extra small accordion content.</div>
    ),
  },
];

const sizeItemsSm = [
  {
    id: "sm-panel",
    options: {
      title: "Small Panel",
      description: "Standard small size",
      size: "sm" as const,
    },
    content: (
      <div className="p-4 text-foreground">Small accordion content.</div>
    ),
  },
];

const sizeItemsMd = [
  {
    id: "md-panel",
    options: {
      title: "Medium Panel",
      description: "Default medium size",
      size: "md" as const,
    },
    content: (
      <div className="p-4 text-foreground">Medium accordion content.</div>
    ),
  },
];

const sizeItemsLg = [
  {
    id: "lg-panel",
    options: {
      title: "Large Panel",
      description: "Prominent large size",
      size: "lg" as const,
    },
    content: (
      <div className="p-4 text-foreground">Large accordion content.</div>
    ),
  },
];

const iconItems = [
  {
    id: "settings",
    options: {
      title: "Settings",
      description: "Configure your preferences",
      icon: "settings",
      iconAriaLabel: "Settings icon",
    },
    content: (
      <div className="p-4 text-foreground">
        Settings panel with icon in the header.
      </div>
    ),
  },
  {
    id: "notifications",
    options: {
      title: "Notifications",
      description: "Manage your notifications",
      icon: "notifications",
      iconAriaLabel: "Notifications icon",
    },
    content: (
      <div className="p-4 text-foreground">
        Notifications panel with icon in the header.
      </div>
    ),
  },
  {
    id: "security",
    options: {
      title: "Security",
      description: "Security and privacy settings",
      icon: "lock",
      iconAriaLabel: "Security icon",
    },
    content: (
      <div className="p-4 text-foreground">
        Security panel with icon in the header.
      </div>
    ),
  },
];

const expandedStateItems = [
  {
    id: "expanded-default",
    options: {
      title: "Expanded by Default",
      description: "This panel starts expanded",
    },
    expanded: true,
    content: (
      <div className="p-4 text-foreground">
        This panel is expanded by default when the page loads.
      </div>
    ),
  },
  {
    id: "collapsed-default",
    options: {
      title: "Collapsed by Default",
      description: "This panel starts collapsed",
    },
    expanded: false,
    content: (
      <div className="p-4 text-foreground">
        This panel is collapsed by default when the page loads.
      </div>
    ),
  },
];

export default function AccordionDemoPage() {
  return (
    <DemoPage
      title="Modus Accordion"
      description="Accordions organize and display collapsible content in a compact space. Use accordions to group related information and allow users to expand or collapse sections as needed."
    >
      <DemoExample
        title="Basic Accordion"
        description="Simple accordion with multiple collapsible panels."
      >
        <ModusAccordion items={basicItems} />
      </DemoExample>

      <DemoExample
        title="Accordion Sizes"
        description="Different sizes for various contexts and spacing needs."
      >
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Extra Small (xs)
            </div>
            <ModusAccordion items={sizeItemsXs} />
          </div>
          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Small (sm)
            </div>
            <ModusAccordion items={sizeItemsSm} />
          </div>
          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Medium (md)
            </div>
            <ModusAccordion items={sizeItemsMd} />
          </div>
          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Large (lg)
            </div>
            <ModusAccordion items={sizeItemsLg} />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Icons in Headers"
        description="Enhance accordion headers with icons for better visual communication."
      >
        <ModusAccordion items={iconItems} />
      </DemoExample>

      <DemoExample
        title="Default Expanded State"
        description="Start with specific panels expanded by default."
      >
        <ModusAccordion items={expandedStateItems} />
      </DemoExample>
    </DemoPage>
  );
}
