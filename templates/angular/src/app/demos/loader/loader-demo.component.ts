import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusLoaderComponent } from '../../components/modus-loader.component';

/**
 * Demo page showcasing the Modus Loader component.
 *
 * Demonstrates loader features including:
 * - All six loader variants (spinner, ball, bars, dots, infinity, ring)
 * - Color options with theme-aware colors
 * - Size options (xs, sm, md, lg)
 * - Usage examples in real application contexts
 */
@Component({
  selector: 'app-loader-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusLoaderComponent],
  template: `
    <demo-page
      title="Modus Loader"
      description="Loaders communicate that content is on the way. Select a variant that fits the space and avoid pairing multiple animations together."
    >
      <demo-example
        title="All Variants"
        description="Six different animation styles to choose from based on your use case."
      >
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" size="md" />
            <div class="text-sm text-foreground-80">Spinner</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="ball" size="md" />
            <div class="text-sm text-foreground-80">Ball</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="bars" size="md" />
            <div class="text-sm text-foreground-80">Bars</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="dots" size="md" />
            <div class="text-sm text-foreground-80">Dots</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="infinity" size="md" />
            <div class="text-sm text-foreground-80">Infinity</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="ring" size="md" />
            <div class="text-sm text-foreground-80">Ring</div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Color Options"
        description="Theme-aware colors that automatically adapt to light and dark themes."
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="primary" size="md" />
            <div class="text-sm text-foreground-80">Primary</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="secondary" size="md" />
            <div class="text-sm text-foreground-80">Secondary</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="accent" size="md" />
            <div class="text-sm text-foreground-80">Accent</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="success" size="md" />
            <div class="text-sm text-foreground-80">Success</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="warning" size="md" />
            <div class="text-sm text-foreground-80">Warning</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="error" size="md" />
            <div class="text-sm text-foreground-80">Error</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" color="info" size="md" />
            <div class="text-sm text-foreground-80">Info</div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Size Options"
        description="Four size tokens from extra small to large for different contexts."
      >
        <div class="flex items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" size="xs" />
            <div class="text-sm text-foreground-80">XS (16px)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" size="sm" />
            <div class="text-sm text-foreground-80">SM (20px)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" size="md" />
            <div class="text-sm text-foreground-80">MD (24px)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-loader variant="spinner" size="lg" />
            <div class="text-sm text-foreground-80">LG (32px)</div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Usage Examples"
        description="Common patterns for using loaders in real applications."
      >
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <modus-loader variant="spinner" size="md" />
            <div class="text-sm text-foreground-80">Syncing records…</div>
          </div>
          <div class="flex items-center gap-2">
            <modus-loader variant="dots" size="sm" color="secondary" />
            <div class="text-sm text-foreground-80">Preparing report</div>
          </div>
          <div class="flex items-center gap-3">
            <modus-loader variant="bars" size="sm" color="success" />
            <div class="text-sm text-foreground-80">Upload complete</div>
          </div>
          <div class="flex items-center gap-3">
            <modus-loader variant="ring" size="lg" color="warning" />
            <div class="text-lg text-foreground">Processing large dataset…</div>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class LoaderDemoPageComponent {}
