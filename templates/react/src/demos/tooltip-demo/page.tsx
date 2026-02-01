"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTooltip from "../../components/ModusTooltip";
import ModusButton from "../../components/ModusButton";

export default function TooltipDemoPage() {
  return (
    <DemoPage
      title="Modus Tooltip"
      description="Tooltip components provide contextual information when users hover over or focus on elements. Use tooltips to provide helpful hints, additional context, or brief explanations."
    >
      <DemoExample
        title="Basic Tooltip"
        description="Simple tooltip with text content."
      >
        <div className="flex flex-wrap gap-4">
          <ModusTooltip content="This is a helpful tooltip">
            <ModusButton color="primary">Hover me</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Click to save your changes">
            <ModusButton
              color="secondary"
              icon="save_disk"
              iconPosition="left"
            >
              Save
            </ModusButton>
          </ModusTooltip>
        </div>
      </DemoExample>

      <DemoExample
        title="Tooltip Positions"
        description="Tooltips in different positions relative to the element."
      >
        <div className="flex flex-wrap gap-4">
          <ModusTooltip content="Tooltip on top" position="top">
            <ModusButton color="primary">Top</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Tooltip on right" position="right">
            <ModusButton color="primary">Right</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Tooltip on bottom" position="bottom">
            <ModusButton color="primary">Bottom</ModusButton>
          </ModusTooltip>

          <ModusTooltip content="Tooltip on left" position="left">
            <ModusButton color="primary">Left</ModusButton>
          </ModusTooltip>
        </div>
      </DemoExample>

      <DemoExample
        title="Tooltip with Icons"
        description="Tooltips on icon buttons and icon-only elements."
      >
        <div className="flex flex-wrap gap-4">
          <ModusTooltip content="Settings menu">
            <ModusButton
              color="tertiary"
              icon="settings"
              iconPosition="only"
              ariaLabel="Settings"
            />
          </ModusTooltip>

          <ModusTooltip content="Edit item">
            <ModusButton
              color="tertiary"
              icon="file_edit"
              iconPosition="only"
              ariaLabel="Edit"
            />
          </ModusTooltip>

          <ModusTooltip content="Delete item">
            <ModusButton
              color="danger"
              icon="delete"
              iconPosition="only"
              ariaLabel="Delete"
            />
          </ModusTooltip>

          <ModusTooltip content="Information icon">
            <i
              className="modus-icons text-lg text-primary"
              role="img"
              aria-label="Information"
            >
              info
            </i>
          </ModusTooltip>

          <ModusTooltip content="Help and support">
            <i
              className="modus-icons text-lg text-primary"
              role="img"
              aria-label="Help"
            >
              help
            </i>
          </ModusTooltip>
        </div>
      </DemoExample>

      <DemoExample
        title="Tooltip with Text Content"
        description="Tooltips on text and other content elements."
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-foreground">Hover over the</div>
            <ModusTooltip content="This term provides additional context when hovered">
              <div className="text-sm text-primary underline cursor-help">
                highlighted term
              </div>
            </ModusTooltip>
            <div className="text-sm text-foreground">for more information.</div>
          </div>

          <div className="flex items-center gap-2">
            <ModusTooltip content="This is a required field that must be completed">
              <div className="text-sm text-foreground flex items-center gap-1">
                Required Field
                <i
                  className="modus-icons text-xs text-destructive"
                  aria-hidden="true"
                >
                  alert
                </i>
              </div>
            </ModusTooltip>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Auto Position Tooltip"
        description="Tooltip with automatic position detection."
      >
        <div className="flex flex-wrap gap-4">
          <ModusTooltip
            content="Auto position adjusts based on available space"
            position="auto"
          >
            <ModusButton color="primary">Auto Position</ModusButton>
          </ModusTooltip>
        </div>
      </DemoExample>

      <DemoExample
        title="Real-World Example"
        description="Tooltips in a typical UI context."
      >
        <div className="flex flex-col gap-6 p-6 rounded-lg bg-card border-default">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-base font-medium text-foreground">
                Document Editor
              </div>
              <ModusTooltip content="Save your document (Ctrl+S)">
                <ModusButton
                  color="tertiary"
                  icon="save_disk"
                  iconPosition="only"
                  ariaLabel="Save"
                  size="sm"
                />
              </ModusTooltip>
              <ModusTooltip content="Print document (Ctrl+P)">
                <ModusButton
                  color="tertiary"
                  icon="printer"
                  iconPosition="only"
                  ariaLabel="Print"
                  size="sm"
                />
              </ModusTooltip>
              <ModusTooltip content="Share document">
                <ModusButton
                  color="tertiary"
                  icon="share"
                  iconPosition="only"
                  ariaLabel="Share"
                  size="sm"
                />
              </ModusTooltip>
            </div>
            <ModusTooltip content="Open settings menu">
              <ModusButton
                color="tertiary"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings"
                size="sm"
              />
            </ModusTooltip>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
