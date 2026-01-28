"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTabs from "../../components/ModusTabs";

const overviewPanels = [
  <div key="summary" className="text-sm text-foreground opacity-80">
    Review highlights, key metrics, and quick actions for the current project.
  </div>,
  <div key="timeline" className="text-sm text-foreground opacity-80">
    Explore recent updates in chronological order to stay informed.
  </div>,
  <div key="files" className="text-sm text-foreground opacity-80">
    Access shared documents and media assets that support this initiative.
  </div>,
];

export default function TabsDemoPage() {
  return (
    <DemoPage
      title="Modus Tabs"
      description="Tabs organize content into logical sections without leaving the page. Keep labels short and related."
    >
      <DemoExample
        title="Project tabs"
        description="Bordered tabs pair well with dashboards and keep the content anchored."
      >
        <ModusTabs
          tabs={[
            { label: "Summary" },
            { label: "Activity" },
            { label: "Files" },
          ]}
          panels={overviewPanels}
        />
      </DemoExample>
      <DemoExample
        title="Compact tabs"
        description="Use the small size when tabs sit inside cards or sidebars."
      >
        <ModusTabs
          tabs={[{ label: "Plan" }, { label: "Deliver" }, { label: "Review" }]}
          panels={[
            <div key="plan" className="text-sm text-foreground opacity-80">
              Outline the work and align on timelines.
            </div>,
            <div key="deliver" className="text-sm text-foreground opacity-80">
              Track progress as each milestone is completed.
            </div>,
            <div key="review" className="text-sm text-foreground opacity-80">
              Capture lessons learned and share with the team.
            </div>,
          ]}
          size="sm"
          tabStyle="boxed"
        />
      </DemoExample>

      <DemoExample
        title="Icon-only tabs"
        description="Use icons without labels for compact navigation. Include aria-label for accessibility."
      >
        <ModusTabs
          tabs={[
            { icon: "dashboard" },
            { icon: "bar_graph" },
            { icon: "map" },
            { icon: "notifications" },
          ]}
          panels={[
            <div key="dashboard" className="text-sm text-foreground opacity-80">
              Overview of your key metrics and recent activity.
            </div>,
            <div key="analytics" className="text-sm text-foreground opacity-80">
              Detailed charts and performance insights.
            </div>,
            <div key="map" className="text-sm text-foreground opacity-80">
              Geographic data and location-based information.
            </div>,
            <div
              key="notifications"
              className="text-sm text-foreground opacity-80"
            >
              View your latest notifications and alerts.
            </div>,
          ]}
          size="sm"
          tabStyle="bordered"
        />
      </DemoExample>

      <DemoExample
        title="Icon + Label tabs"
        description="Combine icons with labels for clear navigation. Icons can be positioned left or right."
      >
        <ModusTabs
          tabs={[
            { icon: "dashboard", label: "Dashboard", iconPosition: "left" },
            { icon: "bar_graph", label: "Analytics", iconPosition: "left" },
            { icon: "settings", label: "Settings", iconPosition: "right" },
            { icon: "help", label: "Help", iconPosition: "right" },
          ]}
          panels={[
            <div key="dashboard" className="text-sm text-foreground opacity-80">
              Overview of your key metrics and recent activity.
            </div>,
            <div key="analytics" className="text-sm text-foreground opacity-80">
              Detailed charts and performance insights.
            </div>,
            <div key="settings" className="text-sm text-foreground opacity-80">
              Configure your application settings and preferences.
            </div>,
            <div key="help" className="text-sm text-foreground opacity-80">
              Find answers to common questions and get support.
            </div>,
          ]}
          size="md"
          tabStyle="bordered"
        />
      </DemoExample>

      <DemoExample
        title="Label-only tabs"
        description="Text-only tabs work well for simple navigation without visual clutter."
      >
        <ModusTabs
          tabs={[
            { label: "Overview" },
            { label: "Details" },
            { label: "History" },
            { label: "Settings" },
          ]}
          panels={[
            <div key="overview" className="text-sm text-foreground opacity-80">
              High-level summary of the current project status.
            </div>,
            <div key="details" className="text-sm text-foreground opacity-80">
              Comprehensive information about all project aspects.
            </div>,
            <div key="history" className="text-sm text-foreground opacity-80">
              Complete timeline of changes and updates.
            </div>,
            <div key="settings" className="text-sm text-foreground opacity-80">
              Configuration options and preferences.
            </div>,
          ]}
          size="lg"
          tabStyle="boxed"
        />
      </DemoExample>

      <DemoExample
        title="Disabled tabs"
        description="Disable tabs that are not currently available or relevant."
      >
        <ModusTabs
          tabs={[
            { label: "Active Tab", icon: "check" },
            { label: "Disabled Tab", icon: "lock", disabled: true },
            { label: "Another Active", icon: "star" },
            { label: "Also Disabled", disabled: true },
          ]}
          panels={[
            <div key="active" className="text-sm text-foreground opacity-80">
              This tab is currently active and functional.
            </div>,
            <div key="disabled" className="text-sm text-foreground opacity-80">
              This content is not accessible due to disabled tab.
            </div>,
            <div key="another" className="text-sm text-foreground opacity-80">
              Another active tab with different content.
            </div>,
            <div
              key="also-disabled"
              className="text-sm text-foreground opacity-80"
            >
              This content is also not accessible.
            </div>,
          ]}
          size="md"
          tabStyle="bordered"
        />
      </DemoExample>
    </DemoPage>
  );
}
