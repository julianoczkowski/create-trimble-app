import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusAccordionComponent } from '../../components/modus-accordion.component';
import { ModusCollapseComponent, type ICollapseOptions } from '../../components/modus-collapse.component';

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
    </demo-page>
  `,
})
export class AccordionDemoPageComponent {}
