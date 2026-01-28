import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusSkeletonComponent } from '../modus-skeleton.component';

/**
 * Demo page showcasing the Modus Skeleton component.
 *
 * Demonstrates skeleton loading features including:
 * - Basic skeleton
 * - Different shapes
 * - Custom sizes
 * - Real-world examples
 */
@Component({
  selector: 'app-skeleton-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusSkeletonComponent],
  template: `
    <demo-page
      title="Modus Skeleton"
      description="Skeleton components provide loading placeholders that mimic the shape of content being loaded. Use skeletons to improve perceived performance and provide visual feedback during data loading."
    >
      <demo-example
        title="Basic Skeleton"
        description="Simple skeleton with default rectangle shape."
      >
        <div class="flex flex-col gap-6">
          <modus-skeleton />
          <modus-skeleton />
          <modus-skeleton />
        </div>
      </demo-example>

      <demo-example
        title="Skeleton Shapes"
        description="Skeletons in different shapes."
      >
        <div class="flex flex-wrap gap-6 items-center">
          <div class="flex flex-col gap-2 items-center">
            <modus-skeleton shape="rectangle" width="200px" height="20px" />
            <p class="text-sm text-muted-foreground">Rectangle</p>
          </div>

          <div class="flex flex-col gap-2 items-center">
            <modus-skeleton shape="circle" width="64px" height="64px" />
            <p class="text-sm text-muted-foreground">Circle</p>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Custom Sizes"
        description="Skeletons with custom width and height."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Small</p>
            <modus-skeleton width="100px" height="12px" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Medium</p>
            <modus-skeleton width="200px" height="16px" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Large</p>
            <modus-skeleton width="300px" height="24px" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Real-World Example"
        description="Skeleton loading states for common UI patterns."
      >
        <div class="flex flex-col gap-6">
          <!-- Card skeleton -->
          <div class="p-6 rounded-lg bg-card border-default">
            <div class="flex gap-4">
              <modus-skeleton shape="circle" width="64px" height="64px" />
              <div class="flex flex-col gap-2 flex-1">
                <modus-skeleton width="60%" height="20px" />
                <modus-skeleton width="40%" height="16px" />
              </div>
            </div>
          </div>

          <!-- List skeleton -->
          <div class="flex flex-col gap-3">
            <modus-skeleton width="100%" height="16px" />
            <modus-skeleton width="90%" height="16px" />
            <modus-skeleton width="95%" height="16px" />
            <modus-skeleton width="85%" height="16px" />
          </div>

          <!-- Form skeleton -->
          <div class="flex flex-col gap-4">
            <modus-skeleton width="120px" height="14px" />
            <modus-skeleton width="100%" height="40px" />
            <modus-skeleton width="100px" height="14px" />
            <modus-skeleton width="100%" height="40px" />
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class SkeletonDemoPageComponent {}

