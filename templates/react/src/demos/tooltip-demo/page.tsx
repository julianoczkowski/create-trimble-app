"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTooltip from "../../components/ModusTooltip";
import ModusButton from "../../components/ModusButton";

export default function TooltipDemoPage() {
  return (
    <DemoPage
      title="Modus Tooltip"
      description="Tooltips provide helpful context on hover or focus. Keep the copy short and avoid critical instructions."
    >
      <DemoExample
        title="Icon help"
        description="Pair an icon with a tooltip to explain unfamiliar concepts."
      >
        <ModusTooltip content="Forecasts update every 15 minutes.">
          <i className="modus-icons text-primary">info</i>
        </ModusTooltip>
      </DemoExample>
      <DemoExample
        title="Button tooltip"
        description="Tooltips can reinforce what an icon-only button does."
      >
        <ModusTooltip content="Refresh dashboard">
          <ModusButton
            icon="refresh"
            iconPosition="only"
            ariaLabel="Refresh dashboard"
          >
            Refresh
          </ModusButton>
        </ModusTooltip>
      </DemoExample>

      <DemoExample
        title="Tooltip positions"
        description="Tooltips can be positioned in different directions around the target element."
      >
        <div className="flex flex-wrap items-center gap-8 p-8 bg-card rounded-lg border-default">
          <ModusTooltip content="Tooltip on top" position="top">
            <ModusButton color="primary">Top</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Tooltip on bottom" position="bottom">
            <ModusButton color="secondary">Bottom</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Tooltip on left" position="left">
            <ModusButton color="tertiary">Left</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Tooltip on right" position="right">
            <ModusButton color="danger">Right</ModusButton>
          </ModusTooltip>

          <ModusTooltip
            content="Auto positioning (smart placement)"
            position="auto"
          >
            <ModusButton color="warning">Auto</ModusButton>
          </ModusTooltip>
        </div>
      </DemoExample>

      <DemoExample
        title="Icon tooltips with positions"
        description="Different tooltip positions work well with icons to provide contextual help."
      >
        <div className="flex flex-wrap items-center gap-6 p-6 bg-card rounded-lg border-default">
          <ModusTooltip content="This icon shows information" position="top">
            <i className="modus-icons text-2xl text-primary">info</i>
          </ModusTooltip>

          <ModusTooltip
            content="This icon indicates a warning"
            position="bottom"
          >
            <i className="modus-icons text-2xl text-warning">warning</i>
          </ModusTooltip>

          <ModusTooltip content="This icon shows an error" position="left">
            <i className="modus-icons text-2xl text-destructive">close</i>
          </ModusTooltip>

          <ModusTooltip content="This icon indicates success" position="right">
            <i className="modus-icons text-2xl text-success">check_circle</i>
          </ModusTooltip>
        </div>
      </DemoExample>

      <DemoExample
        title="Text with tooltips"
        description="Tooltips can provide additional context for text elements. Hover over the underlined text to see different positions."
      >
        <div className="space-y-6 p-6 bg-card rounded-lg border-default">
          <div className="flex items-center justify-center gap-8">
            <ModusTooltip
              content="This tooltip appears above the text"
              position="top"
            >
              <div className="text-foreground font-medium cursor-help underline decoration-2 underline-offset-2 hover:bg-muted px-3 py-2 rounded transition-colors">
                Hover me (top)
              </div>
            </ModusTooltip>

            <ModusTooltip
              content="This tooltip appears below the text"
              position="bottom"
            >
              <div className="text-foreground font-medium cursor-help underline decoration-2 underline-offset-2 hover:bg-muted px-3 py-2 rounded transition-colors">
                Hover me (bottom)
              </div>
            </ModusTooltip>
          </div>

          <div className="flex items-center justify-center gap-8">
            <ModusTooltip
              content="This tooltip appears to the left of the text"
              position="left"
            >
              <div className="text-foreground font-medium cursor-help underline decoration-2 underline-offset-2 hover:bg-muted px-3 py-2 rounded transition-colors">
                Hover me (left)
              </div>
            </ModusTooltip>

            <ModusTooltip
              content="This tooltip appears to the right of the text"
              position="right"
            >
              <div className="text-foreground font-medium cursor-help underline decoration-2 underline-offset-2 hover:bg-muted px-3 py-2 rounded transition-colors">
                Hover me (right)
              </div>
            </ModusTooltip>
          </div>

          <div className="flex items-center justify-center">
            <ModusTooltip
              content="Auto positioning intelligently places the tooltip where there's space"
              position="auto"
            >
              <div className="text-foreground font-medium cursor-help underline decoration-2 underline-offset-2 hover:bg-muted px-3 py-2 rounded transition-colors">
                Hover me (auto)
              </div>
            </ModusTooltip>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
