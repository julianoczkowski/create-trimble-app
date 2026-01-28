import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusLoaderComponent } from '../modus-loader.component';

/**
 * Demo page showcasing the Modus Loader component.
 *
 * Demonstrates loader features including:
 * - Loader variants (spinner, dots)
 * - Loader colors
 * - Loader sizes
 * - Contextual usage
 */
@Component({
  selector: 'app-loader-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusLoaderComponent],
  template: `
    <demo-page
      title="Modus Loader"
      description="Loaders indicate that an action is in progress. Use loaders to provide feedback during asynchronous operations and improve perceived performance."
    >
      <demo-example
        title="Loader Variants"
        description="Different loader variants: spinner (default) and dots."
      >
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" />
            <span class="text-sm text-muted-foreground">Spinner (Default)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="dots" />
            <span class="text-sm text-muted-foreground">Dots</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Loader Colors"
        description="Loaders with different semantic colors."
      >
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-loader />
            <span class="text-sm text-muted-foreground">Default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="primary" />
            <span class="text-sm text-muted-foreground">Primary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="success" />
            <span class="text-sm text-muted-foreground">Success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="warning" />
            <span class="text-sm text-muted-foreground">Warning</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="error" />
            <span class="text-sm text-muted-foreground">Error</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Loader Sizes"
        description="Loaders in different sizes."
      >
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-loader size="sm" />
            <span class="text-sm text-muted-foreground">Small</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader size="md" />
            <span class="text-sm text-muted-foreground">Medium (Default)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader size="lg" />
            <span class="text-sm text-muted-foreground">Large</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Combined Variants"
        description="Different combinations of variants, colors, and sizes."
      >
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="success" variant="dots" />
            <span class="text-sm text-muted-foreground">Success Dots</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="warning" variant="spinner" size="lg" />
            <span class="text-sm text-muted-foreground">Warning Spinner Large</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader color="primary" variant="dots" size="sm" />
            <span class="text-sm text-muted-foreground">Primary Dots Small</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Contextual Usage"
        description="Loaders used in different contexts with explanatory text."
      >
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-4 p-4 rounded-lg bg-card border-default">
            <modus-loader size="sm" />
            <span class="text-sm text-card-foreground">Loading data...</span>
          </div>

          <div class="flex items-center justify-center gap-4 p-8 rounded-lg bg-muted">
            <modus-loader color="primary" size="lg" />
            <span class="text-base font-medium text-foreground">Processing your request</span>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-lg bg-card border-default">
            <modus-loader color="success" variant="dots" />
            <span class="text-sm text-card-foreground">Saving changes...</span>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class LoaderDemoPageComponent {}
