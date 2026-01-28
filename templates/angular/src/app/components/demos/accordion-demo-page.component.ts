import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusAccordionComponent } from '../modus-accordion.component';
import { ModusCollapseComponent, type ICollapseOptions } from '../modus-collapse.component';

/**
 * Demo page showcasing the Modus Accordion component.
 *
 * Demonstrates accordion features including:
 * - Basic accordion with multiple panels
 * - Bordered vs non-bordered variants
 * - Different sizes (xs, sm, md, lg)
 * - Icons and descriptions in headers
 * - Expanded/collapsed states
 * - Event handling examples
 */
@Component({
  selector: 'app-accordion-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusAccordionComponent,
    ModusCollapseComponent,
  ],
  template: `
    <demo-page
      title="Modus Accordion"
      description="Accordions organize and display collapsible content in a compact space. Use accordions to group related information and allow users to expand or collapse sections as needed."
    >
      <demo-example
        title="Basic Accordion"
        description="Simple accordion with multiple collapsible panels."
      >
        <modus-accordion>
          <modus-collapse
            [options]="{
              title: 'Getting Started',
              description: 'Learn the basics'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              This is the content for the getting started section. You can include any content here.
            </div>
          </modus-collapse>
          <modus-collapse
            [options]="{
              title: 'Components',
              description: 'Explore available components'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Discover all the available components in the Modus design system.
            </div>
          </modus-collapse>
          <modus-collapse
            [options]="{
              title: 'Styling',
              description: 'Customize your design'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Learn how to style and customize components to match your brand.
            </div>
          </modus-collapse>
        </modus-accordion>
      </demo-example>

      <demo-example
        title="Bordered Accordion"
        description="Accordion panels with borders for better visual separation."
      >
        <modus-accordion>
          <modus-collapse
            [bordered]="true"
            [options]="{
              title: 'Bordered Panel 1',
              description: 'This panel has a border'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Bordered panels provide clear visual separation between sections.
            </div>
          </modus-collapse>
          <modus-collapse
            [bordered]="true"
            [options]="{
              title: 'Bordered Panel 2',
              description: 'Another bordered panel'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Multiple bordered panels create a structured layout.
            </div>
          </modus-collapse>
        </modus-accordion>
      </demo-example>

      <demo-example
        title="Accordion Sizes"
        description="Different sizes for various contexts and spacing needs."
      >
        <div class="flex flex-col gap-6">
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Extra Small (xs)</h4>
            <modus-accordion>
              <modus-collapse
                [options]="{
                  title: 'Extra Small Panel',
                  description: 'Compact size for tight spaces',
                  size: 'xs'
                }"
              >
                <div slot="content" class="p-4 text-foreground">Extra small accordion content.</div>
              </modus-collapse>
            </modus-accordion>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Small (sm)</h4>
            <modus-accordion>
              <modus-collapse
                [options]="{
                  title: 'Small Panel',
                  description: 'Standard small size',
                  size: 'sm'
                }"
              >
                <div slot="content" class="p-4 text-foreground">Small accordion content.</div>
              </modus-collapse>
            </modus-accordion>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Medium (md)</h4>
            <modus-accordion>
              <modus-collapse
                [options]="{
                  title: 'Medium Panel',
                  description: 'Default medium size',
                  size: 'md'
                }"
              >
                <div slot="content" class="p-4 text-foreground">Medium accordion content.</div>
              </modus-collapse>
            </modus-accordion>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Large (lg)</h4>
            <modus-accordion>
              <modus-collapse
                [options]="{
                  title: 'Large Panel',
                  description: 'Prominent large size',
                  size: 'lg'
                }"
              >
                <div slot="content" class="p-4 text-foreground">Large accordion content.</div>
              </modus-collapse>
            </modus-accordion>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Icons in Headers"
        description="Enhance accordion headers with icons for better visual communication."
      >
        <modus-accordion>
          <modus-collapse
            [options]="{
              title: 'Settings',
              description: 'Configure your preferences',
              icon: 'settings',
              iconAriaLabel: 'Settings icon'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Settings panel with icon in the header.
            </div>
          </modus-collapse>
          <modus-collapse
            [options]="{
              title: 'Notifications',
              description: 'Manage your notifications',
              icon: 'notifications',
              iconAriaLabel: 'Notifications icon'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Notifications panel with icon in the header.
            </div>
          </modus-collapse>
          <modus-collapse
            [options]="{
              title: 'Security',
              description: 'Security and privacy settings',
              icon: 'lock',
              iconAriaLabel: 'Security icon'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              Security panel with icon in the header.
            </div>
          </modus-collapse>
        </modus-accordion>
      </demo-example>

      <demo-example
        title="Default Expanded State"
        description="Start with specific panels expanded by default."
      >
        <modus-accordion>
          <modus-collapse
            [expanded]="true"
            [options]="{
              title: 'Expanded by Default',
              description: 'This panel starts expanded'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              This panel is expanded by default when the page loads.
            </div>
          </modus-collapse>
          <modus-collapse
            [expanded]="false"
            [options]="{
              title: 'Collapsed by Default',
              description: 'This panel starts collapsed'
            }"
          >
            <div slot="content" class="p-4 text-foreground">
              This panel is collapsed by default when the page loads.
            </div>
          </modus-collapse>
        </modus-accordion>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Accordion with event handling to track expanded state changes."
      >
        <div class="p-6 rounded-lg bg-card text-card-foreground border-default">
          <modus-accordion (expandedChange)="handleAccordionChange($event)">
            <modus-collapse
              [options]="{
                title: 'Track Changes',
                description: 'Click to see events in action'
              }"
            >
              <div slot="content" class="p-4 text-foreground">
                Click this panel to see the event handler in action. Check the console or the
                message below.
              </div>
            </modus-collapse>
            <modus-collapse
              [options]="{
                title: 'Another Panel',
                description: 'Track this one too'
              }"
            >
              <div slot="content" class="p-4 text-foreground">
                Each panel expansion triggers an event that can be tracked.
              </div>
            </modus-collapse>
          </modus-accordion>
          @if (lastExpandedChange()) {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Last Event:</div>
            <div class="text-sm">
              Panel index: {{ lastExpandedChange()?.index }}, Expanded:
              {{ lastExpandedChange()?.expanded ? 'Yes' : 'No' }}
            </div>
          </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class AccordionDemoPageComponent {
  readonly lastExpandedChange = signal<{ expanded: boolean; index: number } | null>(null);

  handleAccordionChange(event: { expanded: boolean; index: number }): void {
    this.lastExpandedChange.set(event);
    console.log('Accordion expanded change:', event);
  }
}
