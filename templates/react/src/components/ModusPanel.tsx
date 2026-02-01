import { ModusWcPanel } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

/**
 * Props for the ModusPanel component.
 */
export interface ModusPanelProps {
  /** Custom CSS class to apply to the outer panel container. */
  customClass?: string;
  /** Width of the panel (accepts any valid CSS width value). */
  width?: string;
  /** Height of the panel (accepts any valid CSS height value). */
  height?: string;
  /** Enable floating mode with elevated shadow for overlay/modal-like appearance. */
  floating?: boolean;
  /** Content for the panel header section (typically navigation or title). */
  header?: ReactNode;
  /** Main content area of the panel. */
  body?: ReactNode;
  /** Content for the panel footer section (typically actions or secondary navigation). */
  footer?: ReactNode;
  /** Alternative way to pass body content as children. */
  children?: ReactNode;
  /** The ARIA label for the panel. */
  ariaLabel?: string;
}

/**
 * Renders a Modus panel component for organizing content in a structured layout.
 *
 * @example
 * // Basic panel with header, body, and footer
 * <ModusPanel
 *   width="250px"
 *   height="500px"
 *   header={<div>Header Content</div>}
 *   body={<div>Main Content</div>}
 *   footer={<div>Footer Content</div>}
 * />
 *
 * @example
 * // Floating panel with elevated shadow
 * <ModusPanel
 *   width="320px"
 *   height="auto"
 *   floating
 *   header={<div>Quick Actions</div>}
 *   body={
 *     <div>
 *       <ModusButton fullWidth>New Document</ModusButton>
 *       <ModusButton fullWidth>Upload File</ModusButton>
 *     </div>
 *   }
 * />
 *
 * @example
 * // Body-only panel using children
 * <ModusPanel width="250px" height="auto">
 *   <div>Content as children (placed in body slot)</div>
 * </ModusPanel>
 *
 * @param {ModusPanelProps} props - The component props.
 * @returns {JSX.Element} The rendered panel component.
 */
export default function ModusPanel({
  customClass,
  width = "350px",
  height = "700px",
  floating = false,
  header,
  body,
  footer,
  children,
  ariaLabel,
}: ModusPanelProps) {
  // If body is not provided but children are, use children as body content
  const bodyContent = body || children;

  return (
    <ModusWcPanel
      custom-class={customClass}
      width={width}
      height={height}
      floating={floating}
      aria-label={ariaLabel}
    >
      {header && <div slot="header">{header}</div>}
      {bodyContent && <div slot="body">{bodyContent}</div>}
      {footer && <div slot="footer">{footer}</div>}
    </ModusWcPanel>
  );
}
