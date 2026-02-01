"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusBadge from "../../components/ModusBadge";
import ModusButton from "../../components/ModusButton";
import ModusAvatar from "../../components/ModusAvatar";

/**
 * Demo page showcasing the Modus Badge component.
 *
 * Demonstrates badge features including:
 * - Color variants (primary, secondary, tertiary, success, warning, danger, high-contrast)
 * - Badge variants (filled, outlined, text, counter)
 * - Different sizes (sm, md, lg)
 * - Usage with other components (buttons, avatars)
 */
export default function BadgeDemoPage() {
  return (
    <DemoPage
      title="Modus Badge"
      description="Badges are small status indicators that display counts, labels, or states. Use badges to highlight important information or indicate status."
    >
      <DemoExample
        title="Badge Colors"
        description="Different color variants for various semantic meanings."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusBadge color="primary">Primary</ModusBadge>
          <ModusBadge color="secondary">Secondary</ModusBadge>
          <ModusBadge color="tertiary">Tertiary</ModusBadge>
          <ModusBadge color="success">Success</ModusBadge>
          <ModusBadge color="warning">Warning</ModusBadge>
          <ModusBadge color="danger">Danger</ModusBadge>
          <ModusBadge color="high-contrast">High Contrast</ModusBadge>
        </div>
      </DemoExample>

      <DemoExample
        title="Badge Variants"
        description="Different visual styles for badges."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <ModusBadge variant="filled" color="primary">
              Filled
            </ModusBadge>
            <ModusBadge variant="outlined" color="primary">
              Outlined
            </ModusBadge>
            <ModusBadge variant="text" color="primary">
              Text
            </ModusBadge>
            <ModusBadge variant="counter" color="primary">
              Counter
            </ModusBadge>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Badge Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusBadge size="sm" color="primary">
            Small
          </ModusBadge>
          <ModusBadge size="md" color="primary">
            Medium
          </ModusBadge>
          <ModusBadge size="lg" color="primary">
            Large
          </ModusBadge>
        </div>
      </DemoExample>

      <DemoExample
        title="Badges with Numbers"
        description="Use badges to display counts and numeric values."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusBadge color="primary">5</ModusBadge>
          <ModusBadge color="success">12</ModusBadge>
          <ModusBadge color="warning">99+</ModusBadge>
          <ModusBadge color="danger">1,234</ModusBadge>
        </div>
      </DemoExample>

      <DemoExample
        title="Badges on Buttons"
        description="Combine badges with buttons to show counts or status."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusButton color="primary">
            Notifications
            <ModusBadge color="danger" size="sm" variant="counter">
              3
            </ModusBadge>
          </ModusButton>
          <ModusButton color="secondary">
            Messages
            <ModusBadge color="primary" size="sm" variant="counter">
              12
            </ModusBadge>
          </ModusButton>
          <ModusButton color="tertiary">
            Updates
            <ModusBadge color="success" size="sm" variant="counter">
              5
            </ModusBadge>
          </ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Badges on Avatars"
        description="Use badges to indicate status or notifications on avatars."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <ModusAvatar alt="User" initials="JD" size="md" shape="circle" />
            <div className="absolute -top-1 -right-1">
              <ModusBadge color="success" size="sm" variant="counter">
                <i className="modus-icons text-xs" aria-hidden="true">
                  circle
                </i>
              </ModusBadge>
            </div>
          </div>
          <div className="relative">
            <ModusAvatar alt="User" initials="JS" size="md" shape="circle" />
            <div className="absolute -top-1 -right-1">
              <ModusBadge color="danger" size="sm" variant="counter">
                3
              </ModusBadge>
            </div>
          </div>
          <div className="relative">
            <ModusAvatar alt="User" initials="BJ" size="md" shape="circle" />
            <div className="absolute -top-1 -right-1">
              <ModusBadge color="warning" size="sm" variant="counter">
                !
              </ModusBadge>
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Status Indicators"
        description="Use badges as status indicators for different states."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusBadge color="success" variant="filled">
            Active
          </ModusBadge>
          <ModusBadge color="warning" variant="filled">
            Pending
          </ModusBadge>
          <ModusBadge color="danger" variant="filled">
            Inactive
          </ModusBadge>
          <ModusBadge color="primary" variant="filled">
            New
          </ModusBadge>
          <ModusBadge color="secondary" variant="filled">
            Draft
          </ModusBadge>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
