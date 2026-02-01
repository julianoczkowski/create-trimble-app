import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcLogo } from '@trimble-oss/moduswebcomponents-angular';

/**
 * Available logo names for the ModusLogo component.
 *
 * Includes 19 Trimble product logos and 17 Viewpoint product logos.
 */
export type LogoName =
  // Trimble Products (19)
  | 'trimble'
  | 'siteworks'
  | 'earthworks'
  | 'financials'
  | 'worksmanager'
  | 'connect'
  | 'unity_construct'
  | 'trade_servicelive'
  | 'buildable'
  | 'livecount'
  | 'supplier_xchange'
  | 'app_xchange'
  | 'trimble_unity'
  | 'sketchup'
  | 'pc_miler'
  | 'copilot'
  | 'trimble_pay'
  | 'projectsight'
  | 'demand_planning'
  // Viewpoint Products (17)
  | 'viewpoint'
  | 'viewpoint_analytics'
  | 'viewpoint_epayments'
  | 'viewpoint_estimating'
  | 'viewpoint_field_management'
  | 'viewpoint_field_time'
  | 'viewpoint_financial_controls'
  | 'viewpoint_hr_management'
  | 'viewpoint_jobpac_connect'
  | 'viewpoint_procontractor'
  | 'viewpoint_spectrum'
  | 'viewpoint_team'
  | 'viewpoint_vista'
  | 'viewpoint_spectrum_service_tech'
  | 'viewpoint_for_projects'
  | 'viewpoint_vista_field_service'
  | 'viewpoint_field_view';

/**
 * Input properties for the ModusLogoComponent wrapper.
 */
export interface ModusLogoProps {
  /** The name of the logo to display (required). */
  name: LogoName;
  /** Show emblem version (icon only) instead of full logo. */
  emblem?: boolean;
  /** Custom CSS class to apply to the logo container (useful for sizing). */
  customClass?: string;
  /** Alt text for accessibility. If not provided, defaults to the logo name. */
  alt?: string;
}

/**
 * Angular wrapper for the Modus logo web component.
 *
 * Renders Trimble and Viewpoint product logos with support for full logos
 * and emblem (icon-only) variants. Automatically switches between light
 * and dark theme variants based on the current data-theme attribute.
 *
 * @example
 * ```html
 * <!-- Basic Trimble logo -->
 * <modus-logo name="trimble" />
 *
 * <!-- Emblem (icon-only) version -->
 * <modus-logo name="trimble" [emblem]="true" />
 *
 * <!-- With custom alt text and sizing -->
 * <modus-logo
 *   name="connect"
 *   alt="Trimble Connect Platform"
 *   customClass="w-32"
 * />
 *
 * <!-- Viewpoint product logo -->
 * <modus-logo name="viewpoint_vista" />
 * ```
 */
@Component({
  selector: 'modus-logo',
  imports: [CommonModule, ModusWcLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-logo
      [name]="name()"
      [emblem]="emblem()"
      [customClass]="customClass()"
      [alt]="alt()"
    />
  `,
})
export class ModusLogoComponent {
  /** The name of the logo to display (required). */
  readonly name = input.required<LogoName>();

  /** Show emblem version (icon only) instead of full logo. */
  readonly emblem = input<boolean>(false);

  /** Custom CSS class to apply to the logo container (useful for sizing). */
  readonly customClass = input<string | undefined>();

  /** Alt text for accessibility. If not provided, defaults to the logo name. */
  readonly alt = input<string | undefined>();
}
