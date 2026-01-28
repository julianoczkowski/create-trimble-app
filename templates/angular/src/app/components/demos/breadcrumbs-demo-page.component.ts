import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusBreadcrumbsComponent } from '../modus-breadcrumbs.component';
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
        title="Interactive Breadcrumbs"
        description="Breadcrumbs with click handlers to track navigation events."
      >
        <modus-breadcrumbs
          [items]="interactiveItems()"
          (breadcrumbClick)="handleBreadcrumbClick($event)"
        />
        @if (lastClicked()) {
        <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
          <div class="font-semibold mb-2">Last Clicked:</div>
          <div class="text-sm">{{ lastClicked()?.label }}</div>
          @if (lastClicked()?.url) {
          <div class="text-xs mt-1 text-muted-foreground-60">URL: {{ lastClicked()?.url }}</div>
          }
        </div>
        }
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

      <demo-example
        title="Current Page Indicator"
        description="The last breadcrumb item represents the current page."
      >
        <modus-breadcrumbs [items]="currentPageItems()" />
        <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
          <div class="text-sm">
            The last breadcrumb item (Documents) represents the current page and is typically styled
            differently or disabled.
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Dynamic Breadcrumbs"
        description="Breadcrumbs that update based on user interaction."
      >
        <modus-breadcrumbs
          [items]="dynamicItems()"
          (breadcrumbClick)="handleDynamicClick($event)"
        />
        <div class="mt-4">
          <button
            class="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            (click)="resetBreadcrumbs()"
          >
            Reset Breadcrumbs
          </button>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class BreadcrumbsDemoPageComponent {
  readonly lastClicked = signal<IBreadcrumb | null>(null);
  readonly dynamicPath = signal<string[]>(['Home', 'Products']);

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

  readonly interactiveItems = signal<IBreadcrumb[]>([
    { label: 'Home', url: '/' },
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Settings', url: '/settings' },
    { label: 'Profile' },
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

  readonly currentPageItems = signal<IBreadcrumb[]>([
    { label: 'Home', url: '/' },
    { label: 'Documents', url: '/documents' },
    { label: 'Reports' },
  ]);

  readonly dynamicItems = signal<IBreadcrumb[]>(this.buildDynamicItems());

  handleBreadcrumbClick(breadcrumb: IBreadcrumb): void {
    this.lastClicked.set(breadcrumb);
    console.log('Breadcrumb clicked:', breadcrumb);
  }

  handleDynamicClick(breadcrumb: IBreadcrumb): void {
    const currentPath = this.dynamicPath();
    const clickedIndex = currentPath.findIndex((item) => item === breadcrumb.label);

    if (clickedIndex !== -1) {
      // Navigate back to clicked breadcrumb level
      const newPath = currentPath.slice(0, clickedIndex + 1);
      this.dynamicPath.set(newPath);
    } else {
      // Add new level
      this.dynamicPath.set([...currentPath, breadcrumb.label || '']);
    }

    this.dynamicItems.set(this.buildDynamicItems());
  }

  resetBreadcrumbs(): void {
    this.dynamicPath.set(['Home', 'Products']);
    this.dynamicItems.set(this.buildDynamicItems());
  }

  private buildDynamicItems(): IBreadcrumb[] {
    const path = this.dynamicPath();
    return path.map((label) => ({
      label,
      url: `/${label.toLowerCase()}`,
    }));
  }
}
