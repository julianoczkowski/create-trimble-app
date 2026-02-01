import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusLogoComponent, LogoName } from '../../components/modus-logo.component';

/**
 * Demo page showcasing the Modus Logo component.
 *
 * Demonstrates logo features including:
 * - Trimble product logos (19 logos)
 * - Viewpoint product logos (17 logos)
 * - Full logos vs emblem (icon-only) variants
 * - Custom sizing with Tailwind classes
 * - Theme awareness (automatic light/dark switching)
 */
@Component({
  selector: 'app-logo-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusLogoComponent],
  template: `
    <demo-page
      title="Modus Logo"
      description="Display Trimble and Viewpoint product logos with consistent branding. Logos automatically switch between light and dark variants based on the current theme."
    >
      <demo-example
        title="Trimble Product Logos"
        description="Official Trimble product logos. Logos contain embedded brand colors and should not be modified."
      >
        <div class="grid grid-cols-2 gap-8">
          @for (logo of trimbleLogos; track logo.name) {
            <div
              class="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg"
            >
              <div class="h-20 flex items-center justify-center">
                <modus-logo [name]="logo.name" customClass="max-h-20 max-w-64" />
              </div>
              <div class="text-sm text-muted-foreground text-center">{{ logo.display }}</div>
              <code class="text-xs bg-background px-2 py-1 rounded">{{ logo.name }}</code>
            </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Viewpoint Product Logos"
        description="Official Viewpoint product logos with proper brand colors."
      >
        <div class="grid grid-cols-2 gap-8">
          @for (logo of viewpointLogos; track logo.name) {
            <div
              class="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg"
            >
              <div class="h-20 flex items-center justify-center">
                <modus-logo [name]="logo.name" customClass="max-h-20 max-w-64" />
              </div>
              <div class="text-sm text-muted-foreground text-center">{{ logo.display }}</div>
              <code class="text-xs bg-background px-2 py-1 rounded">{{ logo.name }}</code>
            </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Emblem Variants"
        description="Icon-only versions of logos for compact spaces like favicons, app icons, or navigation."
      >
        <div class="flex flex-wrap items-center gap-8">
          @for (logo of featuredLogos; track logo.name) {
            <div class="flex flex-col items-center gap-2">
              <div
                class="w-16 h-16 flex items-center justify-center bg-card rounded-lg border-default"
              >
                <modus-logo [name]="logo.name" [emblem]="true" customClass="w-10 h-10" />
              </div>
              <div class="text-xs text-foreground-60">{{ logo.display }}</div>
            </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Size Variations"
        description="Control logo size using Tailwind CSS classes via the customClass prop."
      >
        <div class="flex flex-wrap items-end gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-logo name="trimble" customClass="h-6 w-auto" />
            <div class="text-xs text-foreground-60">Small (h-6)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-logo name="trimble" customClass="h-10 w-auto" />
            <div class="text-xs text-foreground-60">Medium (h-10)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-logo name="trimble" customClass="h-16 w-auto" />
            <div class="text-xs text-foreground-60">Large (h-16)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-logo name="trimble" customClass="h-24 w-auto" />
            <div class="text-xs text-foreground-60">Extra Large (h-24)</div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Theme Awareness"
        description="Logos automatically switch between light and dark variants based on the data-theme attribute. Try switching themes to see the change."
      >
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border-default">
            <modus-logo name="trimble" customClass="h-12 w-auto" />
            <div class="text-sm text-foreground-60">Trimble</div>
          </div>
          <div class="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border-default">
            <modus-logo name="connect" customClass="h-12 w-auto" />
            <div class="text-sm text-foreground-60">Trimble Connect</div>
          </div>
          <div class="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border-default">
            <modus-logo name="viewpoint" customClass="h-12 w-auto" />
            <div class="text-sm text-foreground-60">Viewpoint</div>
          </div>
        </div>
        <div class="mt-4 p-4 bg-muted rounded-lg">
          <div class="text-sm text-foreground-80">
            <div class="font-semibold mb-1">How it works</div>
            <div>
              The logo component observes the data-theme attribute on the HTML element and
              automatically loads the appropriate light or dark SVG variant. No additional
              configuration is required.
            </div>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class LogoDemoPageComponent {
  /** Trimble product logos (19 logos) */
  readonly trimbleLogos: { name: LogoName; display: string }[] = [
    { name: 'trimble', display: 'Trimble' },
    { name: 'siteworks', display: 'Siteworks' },
    { name: 'earthworks', display: 'Earthworks' },
    { name: 'financials', display: 'Financials' },
    { name: 'worksmanager', display: 'WorksManager' },
    { name: 'connect', display: 'Connect' },
    { name: 'unity_construct', display: 'Unity Construct' },
    { name: 'trade_servicelive', display: 'Trade ServiceLive' },
    { name: 'buildable', display: 'Buildable' },
    { name: 'livecount', display: 'LiveCount' },
    { name: 'supplier_xchange', display: 'Supplier Xchange' },
    { name: 'app_xchange', display: 'App Xchange' },
    { name: 'trimble_unity', display: 'Trimble Unity' },
    { name: 'sketchup', display: 'SketchUp' },
    { name: 'pc_miler', display: 'PC Miler' },
    { name: 'copilot', display: 'CoPilot' },
    { name: 'trimble_pay', display: 'Trimble Pay' },
    { name: 'projectsight', display: 'ProjectSight' },
    { name: 'demand_planning', display: 'Demand Planning' },
  ];

  /** Viewpoint product logos (17 logos) */
  readonly viewpointLogos: { name: LogoName; display: string }[] = [
    { name: 'viewpoint', display: 'Viewpoint' },
    { name: 'viewpoint_analytics', display: 'Analytics' },
    { name: 'viewpoint_epayments', display: 'ePayments' },
    { name: 'viewpoint_estimating', display: 'Estimating' },
    { name: 'viewpoint_field_management', display: 'Field Management' },
    { name: 'viewpoint_field_time', display: 'Field Time' },
    { name: 'viewpoint_financial_controls', display: 'Financial Controls' },
    { name: 'viewpoint_hr_management', display: 'HR Management' },
    { name: 'viewpoint_jobpac_connect', display: 'Jobpac Connect' },
    { name: 'viewpoint_procontractor', display: 'ProContractor' },
    { name: 'viewpoint_spectrum', display: 'Spectrum' },
    { name: 'viewpoint_team', display: 'Team' },
    { name: 'viewpoint_vista', display: 'Vista' },
    { name: 'viewpoint_spectrum_service_tech', display: 'Spectrum Service Tech' },
    { name: 'viewpoint_for_projects', display: 'For Projects' },
    { name: 'viewpoint_vista_field_service', display: 'Vista Field Service' },
    { name: 'viewpoint_field_view', display: 'Field View' },
  ];

  /** Featured logos for emblem demonstration */
  readonly featuredLogos: { name: LogoName; display: string }[] = [
    { name: 'trimble', display: 'Trimble' },
    { name: 'connect', display: 'Connect' },
    { name: 'sketchup', display: 'SketchUp' },
    { name: 'viewpoint', display: 'Viewpoint' },
    { name: 'viewpoint_vista', display: 'Vista' },
  ];
}
