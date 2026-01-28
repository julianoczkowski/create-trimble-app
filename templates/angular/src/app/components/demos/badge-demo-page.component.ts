import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusBadgeComponent } from '../modus-badge.component';
import { ModusButtonComponent } from '../modus-button.component';
import { ModusAvatarComponent } from '../modus-avatar.component';

/**
 * Demo page showcasing the Modus Badge component.
 *
 * Demonstrates badge features including:
 * - Color variants (primary, secondary, tertiary, success, warning, danger, high-contrast)
 * - Badge variants (filled, text, counter)
 * - Different sizes (sm, md, lg)
 * - Usage with other components (buttons, avatars)
 */
@Component({
  selector: 'app-badge-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusBadgeComponent,
    ModusButtonComponent,
    ModusAvatarComponent,
  ],
  template: `
    <demo-page
      title="Modus Badge"
      description="Badges are small status indicators that display counts, labels, or states. Use badges to highlight important information or indicate status."
    >
      <demo-example
        title="Badge Colors"
        description="Different color variants for various semantic meanings."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-badge color="primary">Primary</modus-badge>
          <modus-badge color="secondary">Secondary</modus-badge>
          <modus-badge color="tertiary">Tertiary</modus-badge>
          <modus-badge color="success">Success</modus-badge>
          <modus-badge color="warning">Warning</modus-badge>
          <modus-badge color="danger">Danger</modus-badge>
          <modus-badge color="high-contrast">High Contrast</modus-badge>
        </div>
      </demo-example>

      <demo-example
        title="Badge Variants"
        description="Different visual styles for badges."
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <modus-badge variant="filled" color="primary">Filled</modus-badge>
            <modus-badge variant="outlined" color="primary">Outlined</modus-badge>
            <modus-badge variant="text" color="primary">Text</modus-badge>
            <modus-badge variant="counter" color="primary">Counter</modus-badge>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Badge Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-badge size="sm" color="primary">Small</modus-badge>
          <modus-badge size="md" color="primary">Medium</modus-badge>
          <modus-badge size="lg" color="primary">Large</modus-badge>
        </div>
      </demo-example>

      <demo-example
        title="Badges with Numbers"
        description="Use badges to display counts and numeric values."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-badge color="primary">5</modus-badge>
          <modus-badge color="success">12</modus-badge>
          <modus-badge color="warning">99+</modus-badge>
          <modus-badge color="danger">1,234</modus-badge>
        </div>
      </demo-example>

      <demo-example
        title="Badges on Buttons"
        description="Combine badges with buttons to show counts or status."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-button color="primary">
            Notifications
            <modus-badge color="danger" size="sm" variant="counter">3</modus-badge>
          </modus-button>
          <modus-button color="secondary">
            Messages
            <modus-badge color="primary" size="sm" variant="counter">12</modus-badge>
          </modus-button>
          <modus-button color="tertiary">
            Updates
            <modus-badge color="success" size="sm" variant="counter">5</modus-badge>
          </modus-button>
        </div>
      </demo-example>

      <demo-example
        title="Badges on Avatars"
        description="Use badges to indicate status or notifications on avatars."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="relative">
            <modus-avatar alt="User" initials="JD" size="md" shape="circle" />
            <div class="absolute -top-1 -right-1">
              <modus-badge color="success" size="sm" variant="counter">●</modus-badge>
            </div>
          </div>
          <div class="relative">
            <modus-avatar alt="User" initials="JS" size="md" shape="circle" />
            <div class="absolute -top-1 -right-1">
              <modus-badge color="danger" size="sm" variant="counter">3</modus-badge>
            </div>
          </div>
          <div class="relative">
            <modus-avatar alt="User" initials="BJ" size="md" shape="circle" />
            <div class="absolute -top-1 -right-1">
              <modus-badge color="warning" size="sm" variant="counter">!</modus-badge>
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Status Indicators"
        description="Use badges as status indicators for different states."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-badge color="success" variant="filled">Active</modus-badge>
          <modus-badge color="warning" variant="filled">Pending</modus-badge>
          <modus-badge color="danger" variant="filled">Inactive</modus-badge>
          <modus-badge color="primary" variant="filled">New</modus-badge>
          <modus-badge color="secondary" variant="filled">Draft</modus-badge>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class BadgeDemoPageComponent {}

