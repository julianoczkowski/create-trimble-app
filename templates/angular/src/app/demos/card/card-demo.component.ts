import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusCardComponent } from '../../components/modus-card.component';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Demo page showcasing the Modus Card component.
 *
 * Demonstrates card features including:
 * - Vertical and horizontal layouts
 * - Cards with header images
 * - Background figure cards with overlaid text
 * - Cards with footer slots
 * - Compact padding for dense layouts
 */
@Component({
  selector: 'app-card-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusCardComponent,
    ModusButtonComponent,
  ],
  template: `
    <demo-page
      title="Modus Card"
      description="Cards group related information into a contained surface. Keep each card focused on a single concept and align supporting actions to the bottom."
    >
      <demo-example
        title="Project summary"
        description="Vertical cards are ideal for key metrics or spotlighting a single project."
      >
        <modus-card>
          <div slot="title" class="text-xl font-semibold text-foreground">Atlas Renewal</div>
          <div slot="subtitle" class="text-sm text-foreground-80">Updated 2 hours ago</div>
          <div slot="actions" class="flex gap-2">
            <modus-button color="primary" size="sm">Open project</modus-button>
            <modus-button color="tertiary" size="sm">Share</modus-button>
          </div>
          <div class="flex flex-col gap-3 text-sm text-foreground-80">
            <div>Next milestone: Validate customer insights</div>
            <div>Owner: Priya Malhotra</div>
            <div>Team: Research, Field Ops</div>
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Horizontal layout"
        description="Use horizontal cards when imagery or a quick status pairs with copy."
      >
        <modus-card [layout]="'horizontal'" [padding]="'compact'" [bordered]="true">
          <div slot="title" class="text-lg font-medium text-foreground">Field kit</div>
          <div slot="subtitle" class="text-sm text-foreground-80">
            Inventory: 18 units available
          </div>
          <div slot="actions">
            <modus-button color="primary" size="sm">Reserve</modus-button>
          </div>
          <div class="text-sm text-foreground-80">
            Includes GPS, survey equipment, and safety checklist. Recommended for teams working on
            remote installs.
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Card with Header Image"
        description="Add an image or figure in the header slot to provide visual context."
      >
        <modus-card [layout]="'horizontal'" [bordered]="true">
          <figure slot="header" class="w-full md:w-48 h-48 overflow-hidden">
            <img
              src="https://i.pravatar.cc/300?img=12"
              alt="User avatar"
              class="w-full h-full object-cover"
            />
          </figure>
          <div slot="title" class="text-lg font-medium text-foreground">Team Member</div>
          <div slot="subtitle" class="text-sm text-foreground-80">Senior Developer</div>
          <div slot="actions">
            <modus-button color="primary" size="sm">Contact</modus-button>
          </div>
          <div class="text-sm text-foreground-80">
            Specializes in frontend architecture and design systems. Available for new projects
            starting next quarter.
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Background Figure Card"
        description="Use background-figure to stretch header images across the entire card with overlaid text."
      >
        <modus-card [backgroundFigure]="true">
          <figure slot="header" class="w-full h-64 overflow-hidden">
            <img
              src="https://picsum.photos/id/1045/600/400"
              alt="Scenic view"
              class="w-full h-full object-cover"
            />
          </figure>
          <div
            slot="title"
            class="text-2xl font-semibold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]"
          >
            Featured Project
          </div>
          <div
            slot="subtitle"
            class="text-base text-white/80 [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]"
          >
            Launching Q2 2024
          </div>
          <div slot="actions">
            <modus-button color="primary" size="sm">Learn More</modus-button>
          </div>
          <div
            class="text-base text-white/80 [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]"
          >
            This project showcases innovative design patterns and modern user experiences. Join us
            for the launch event.
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Card with Footer"
        description="Use the footer slot for metadata, tags, or additional information outside the main content area."
      >
        <modus-card [bordered]="true">
          <div slot="title" class="text-xl font-semibold text-foreground">Document Review</div>
          <div slot="subtitle" class="text-sm text-foreground-80">Last updated: 3 days ago</div>
          <div slot="actions">
            <modus-button color="tertiary" size="sm">Edit</modus-button>
          </div>
          <div class="text-sm text-foreground-80">
            This document contains important project specifications and requirements. Please review
            and provide feedback by end of week.
          </div>
          <div slot="footer" class="flex items-center justify-between pt-4 border-t border-border">
            <div class="flex gap-2">
              <span class="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">Draft</span>
              <span class="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">Review</span>
            </div>
            <div class="text-xs text-muted-foreground">3 reviewers</div>
          </div>
        </modus-card>
      </demo-example>

      <demo-example
        title="Compact Padding"
        description="Use compact padding for dense dashboards or when space is limited."
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <modus-card [padding]="'compact'" [bordered]="true">
            <div slot="title" class="text-base font-medium text-foreground">Active Users</div>
            <div class="text-2xl font-bold text-foreground">1,234</div>
            <div class="text-xs text-muted-foreground">+12% from last month</div>
          </modus-card>
          <modus-card [padding]="'compact'" [bordered]="true">
            <div slot="title" class="text-base font-medium text-foreground">Revenue</div>
            <div class="text-2xl font-bold text-foreground">$45.6K</div>
            <div class="text-xs text-muted-foreground">+8% from last month</div>
          </modus-card>
          <modus-card [padding]="'compact'" [bordered]="true">
            <div slot="title" class="text-base font-medium text-foreground">Tasks</div>
            <div class="text-2xl font-bold text-foreground">89</div>
            <div class="text-xs text-muted-foreground">12 pending review</div>
          </modus-card>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class CardDemoPageComponent {}
