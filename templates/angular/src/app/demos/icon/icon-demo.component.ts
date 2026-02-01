import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusIconComponent } from '../../components/modus-icon.component';

/**
 * Demo page showcasing the Modus Icon component.
 *
 * Demonstrates icon features including:
 * - Icon sizes
 * - Status icons
 */
@Component({
  selector: 'app-icon-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusIconComponent],
  template: `
    <demo-page
      title="Modus Icon"
      description="Icons provide visual communication and enhance user understanding. Use icons consistently to reinforce meaning and improve usability."
    >
      <demo-example
        title="Icon Sizes"
        description="Different icon sizes using the Modus font scale."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="star" size="sm" />
            <span class="text-xs text-muted-foreground">Small (sm)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="star" size="md" />
            <span class="text-xs text-muted-foreground">Medium (md)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="star" size="lg" />
            <span class="text-xs text-muted-foreground">Large (lg)</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Status Icons"
        description="Icons commonly used to indicate status or state."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="check_circle" variant="solid" size="lg" className="text-success" />
            <span class="text-xs text-muted-foreground">Success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="info" variant="solid" size="lg" className="text-primary" />
            <span class="text-xs text-muted-foreground">Info</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="warning" variant="solid" size="lg" className="text-warning" />
            <span class="text-xs text-muted-foreground">Warning</span>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class IconDemoPageComponent {}
