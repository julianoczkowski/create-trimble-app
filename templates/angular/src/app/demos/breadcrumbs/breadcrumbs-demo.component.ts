import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusBreadcrumbsComponent } from '../../components/modus-breadcrumbs.component';
import type { IBreadcrumb } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Breadcrumbs component.
 *
 * Demonstrates breadcrumb features including:
 * - Basic breadcrumb navigation
 * - Different sizes (sm, md, lg)
 * - Interactive navigation examples
 * - Long path truncation examples
 * - Accessibility features demonstration
 */
@Component({
  selector: 'app-breadcrumbs-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusBreadcrumbsComponent],
  template: `
    <demo-page
      title="Modus Breadcrumbs"
      description="Breadcrumbs show the hierarchical path to the current page. Use breadcrumbs to help users understand their location and navigate back through the application structure."
    >
      <demo-example
        title="Basic Breadcrumbs"
        description="Simple breadcrumb navigation showing the current path."
      >
        <modus-breadcrumbs [items]="basicItems()" />
      </demo-example>

      <demo-example
        title="Breadcrumb Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Small (sm)</h4>
            <modus-breadcrumbs [items]="sizeItems()" size="sm" />
          </div>
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Medium (md)</h4>
            <modus-breadcrumbs [items]="sizeItems()" size="md" />
          </div>
          <div>
            <h4 class="text-base font-semibold mb-2 text-foreground">Large (lg)</h4>
            <modus-breadcrumbs [items]="sizeItems()" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Deep Navigation Path"
        description="Breadcrumbs showing a deep navigation hierarchy."
      >
        <modus-breadcrumbs [items]="deepPathItems()" />
      </demo-example>

      <demo-example
        title="Breadcrumbs with Long Labels"
        description="Breadcrumbs handle long labels gracefully with truncation."
      >
        <modus-breadcrumbs [items]="longLabelItems()" />
      </demo-example>
    </demo-page>
  `,
})
export class BreadcrumbsDemoPageComponent {
  readonly basicItems = signal<IBreadcrumb[]>([
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumbs' },
  ]);

  readonly sizeItems = signal<IBreadcrumb[]>([
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' },
  ]);

  readonly deepPathItems = signal<IBreadcrumb[]>([
    { label: 'Home', url: '/' },
    { label: 'Projects', url: '/projects' },
    { label: 'Project Alpha', url: '/projects/alpha' },
    { label: 'Settings', url: '/projects/alpha/settings' },
    { label: 'Team' },
  ]);

  readonly longLabelItems = signal<IBreadcrumb[]>([
    { label: 'Home', url: '/' },
    { label: 'This is a very long breadcrumb label', url: '/long' },
    { label: 'Another extremely long breadcrumb item name here' },
  ]);
}
