import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusDividerComponent } from '../modus-divider.component';

/**
 * Demo page showcasing the Modus Divider component.
 *
 * Demonstrates divider features including:
 * - Horizontal and vertical dividers
 * - Dividers with content
 * - Content positioning (start, center, end)
 * - Different colors
 * - Responsive behavior
 */
@Component({
  selector: 'app-divider-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusDividerComponent],
  template: `
    <demo-page
      title="Modus Divider"
      description="Dividers separate content into clear sections. Use dividers to organize content, create visual hierarchy, and improve readability."
    >
      <demo-example
        title="Horizontal Dividers"
        description="Horizontal dividers for separating vertical content."
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <p class="text-foreground">Content above the divider</p>
            <modus-divider [orientation]="'horizontal'" />
            <p class="text-foreground">Content below the divider</p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-foreground">Another section</p>
            <modus-divider [orientation]="'horizontal'" color="primary" />
            <p class="text-foreground">More content</p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-foreground">Divider with content</p>
            <modus-divider [orientation]="'horizontal'" content="OR" />
            <p class="text-foreground">Content after labeled divider</p>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Vertical Dividers"
        description="Vertical dividers for separating horizontal content. Vertical dividers need a flex container with items-stretch to stretch to match the container height."
      >
        <div class="flex items-stretch gap-4 min-h-[60px]">
          <div class="text-foreground flex items-center">Left Content</div>
          <modus-divider [orientation]="'vertical'" />
          <div class="text-foreground flex items-center">Right Content</div>
        </div>
      </demo-example>

      <demo-example
        title="Vertical Dividers in Layout"
        description="Using vertical dividers to separate multiple sections in a layout."
      >
        <div class="flex items-stretch gap-4 min-h-[120px]">
          <div class="flex-1 p-4 rounded-lg bg-card border-default">
            <div class="font-semibold text-card-foreground mb-2">Left Section</div>
            <div class="text-sm text-muted-foreground">Content in the left section</div>
          </div>
          <modus-divider [orientation]="'vertical'" />
          <div class="flex-1 p-4 rounded-lg bg-card border-default">
            <div class="font-semibold text-card-foreground mb-2">Middle Section</div>
            <div class="text-sm text-muted-foreground">Content in the middle section</div>
          </div>
          <modus-divider [orientation]="'vertical'" />
          <div class="flex-1 p-4 rounded-lg bg-card border-default">
            <div class="font-semibold text-card-foreground mb-2">Right Section</div>
            <div class="text-sm text-muted-foreground">Content in the right section</div>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class DividerDemoPageComponent {}

