import type { Component } from "solid-js";

/**
 * Available logo names for the ModusLogo component.
 */
export type LogoName =
  | "trimble"
  | "siteworks"
  | "earthworks"
  | "financials"
  | "worksmanager"
  | "connect"
  | "unity_construct"
  | "trade_servicelive"
  | "buildable"
  | "livecount"
  | "supplier_xchange"
  | "app_xchange"
  | "trimble_unity"
  | "sketchup"
  | "pc_miler"
  | "copilot"
  | "trimble_pay"
  | "projectsight"
  | "demand_planning"
  | "viewpoint"
  | "viewpoint_analytics"
  | "viewpoint_epayments"
  | "viewpoint_estimating"
  | "viewpoint_field_management"
  | "viewpoint_field_time"
  | "viewpoint_financial_controls"
  | "viewpoint_hr_management"
  | "viewpoint_jobpac_connect"
  | "viewpoint_procontractor"
  | "viewpoint_spectrum"
  | "viewpoint_team"
  | "viewpoint_vista"
  | "viewpoint_spectrum_service_tech"
  | "viewpoint_for_projects"
  | "viewpoint_vista_field_service"
  | "viewpoint_field_view";

/**
 * Props for the ModusLogo component.
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
 * Renders a Modus logo component for displaying Trimble/Viewpoint product logos.
 *
 * @param {ModusLogoProps} props - The component props.
 * @returns {JSX.Element} The rendered logo component.
 */
const ModusLogo: Component<ModusLogoProps> = (props) => {
  return (
    <modus-wc-logo
      name={props.name}
      emblem={props.emblem ?? false}
      custom-class={props.customClass}
      alt={props.alt}
    />
  );
};

export default ModusLogo;
