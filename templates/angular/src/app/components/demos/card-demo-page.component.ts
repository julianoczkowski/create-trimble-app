import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusCardComponent } from '../modus-card.component';
import { ModusButtonComponent } from '../modus-button.component';

/**
 * Demo page showcasing the Modus Card component.
 *
 * Demonstrates card features including:
 * - Layout variants (vertical, horizontal)
 * - Bordered vs borderless styles
 * - Padding options (normal, compact)
 * - Header, title, subtitle, actions, footer slots
 * - Background figure examples
 * - Complex card compositions
 */
@Component({
  selector: 'app-card-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusCardComponent, ModusButtonComponent],
  template: `
    <demo-page
      title="Modus Card"
      description="Cards are flexible containers for grouping related content. Use cards to organize information, create visual hierarchy, and provide clear content boundaries."
    >
      <demo-example
        title="Basic Card"
        description="Simple card with basic content."
      >
        <modus-card>
          <div class="text-foreground">
            <p class="mb-2">This is a basic card with simple content.</p>
            <p>Cards provide a clean way to group and organize content.</p>
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Card with Header and Footer"
        description="Card with header, body content, and footer sections."
      >
        <modus-card>
          <div slot="header" class="text-lg font-semibold text-foreground">Card Title</div>
          <div class="text-foreground">
            <p>This card has a header, main content, and footer.</p>
            <p>Each section provides structure and visual hierarchy.</p>
          </div>
          <div slot="footer" class="text-sm text-muted-foreground">Last updated: 2 hours ago</div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Card with Title, Subtitle, and Actions"
        description="Card using title, subtitle, and actions slots for structured layout."
      >
        <modus-card>
          <div slot="title" class="text-xl font-semibold text-foreground">Project Overview</div>
          <div slot="subtitle" class="text-sm text-muted-foreground">Active project dashboard</div>
          <div slot="actions">
            <modus-button color="primary" size="sm">Edit</modus-button>
          </div>
          <div class="text-foreground">
            <p class="mb-2">Project statistics and overview information.</p>
            <ul class="list-disc list-inside text-sm">
              <li>12 active tasks</li>
              <li>5 team members</li>
              <li>80% completion rate</li>
            </ul>
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Bordered Card"
        description="Card with border for clearer visual separation."
      >
        <modus-card [bordered]="true">
          <div slot="title" class="text-lg font-semibold text-foreground">Bordered Card</div>
          <div class="text-foreground">
            <p>This card has a visible border that provides clear visual separation.</p>
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Card Layouts"
        description="Vertical and horizontal layout orientations."
      >
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Vertical Layout (Default)</h4>
            <modus-card [layout]="'vertical'">
              <div slot="title" class="text-lg font-semibold text-foreground">Vertical Card</div>
              <div class="text-foreground">
                <p>Content flows vertically in this card layout.</p>
              </div>
            </modus-card>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Horizontal Layout</h4>
            <modus-card [layout]="'horizontal'">
              <div slot="title" class="text-lg font-semibold text-foreground">Horizontal Card</div>
              <div class="text-foreground">
                <p>Content flows horizontally in this card layout.</p>
              </div>
            </modus-card>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Card Padding Options"
        description="Different padding densities for various content needs."
      >
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Normal Padding</h4>
            <modus-card [padding]="'normal'">
              <div class="text-foreground">
                <p>This card uses normal padding for comfortable spacing.</p>
              </div>
            </modus-card>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Compact Padding</h4>
            <modus-card [padding]="'compact'">
              <div class="text-foreground">
                <p>This card uses compact padding for tighter spacing.</p>
              </div>
            </modus-card>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Card Grid Layout"
        description="Multiple cards arranged in a grid for organized content display."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <modus-card [bordered]="true">
            <div slot="title" class="text-lg font-semibold text-foreground">Card 1</div>
            <div class="text-foreground">
              <p>First card in the grid layout.</p>
            </div>
          </modus-card>
          <modus-card [bordered]="true">
            <div slot="title" class="text-lg font-semibold text-foreground">Card 2</div>
            <div class="text-foreground">
              <p>Second card in the grid layout.</p>
            </div>
          </modus-card>
          <modus-card [bordered]="true">
            <div slot="title" class="text-lg font-semibold text-foreground">Card 3</div>
            <div class="text-foreground">
              <p>Third card in the grid layout.</p>
            </div>
          </modus-card>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Card with Actions"
        description="Card with multiple action buttons for user interactions."
      >
        <modus-card [bordered]="true">
          <div slot="title" class="text-lg font-semibold text-foreground">Task Card</div>
          <div slot="subtitle" class="text-sm text-muted-foreground">Due: Tomorrow</div>
          <div slot="actions" class="flex gap-2">
            <modus-button color="primary" size="sm">Complete</modus-button>
            <modus-button color="tertiary" size="sm">Edit</modus-button>
          </div>
          <div class="text-foreground">
            <p class="mb-2">Complete the project documentation and submit for review.</p>
            <div class="flex gap-2">
              <span class="px-2 py-1 rounded bg-primary text-primary-foreground text-xs">High Priority</span>
              <span class="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">Work</span>
            </div>
          </div>
          <div slot="footer" class="flex justify-between text-sm text-muted-foreground">
            <span>Assigned to: John Doe</span>
            <span>2 comments</span>
          </div>
        </modus-card>
      </demo-example>
    </demo-page>
  `,
})
export class CardDemoPageComponent {}

