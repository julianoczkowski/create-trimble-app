

import type { ReactNode } from "react";
import { forwardRef } from "react";
import { ModusWcToolbar } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusToolbar component.
 */
export interface ModusToolbarProps {
  /** The content to display at the start of the toolbar. */
  startContent?: ReactNode;
  /** The content to display in the center of the toolbar. */
  centerContent?: ReactNode;
  /** The content to display at the end of the toolbar. */
  endContent?: ReactNode;
  /** The main content of the toolbar. */
  children?: ReactNode;
  /** The ARIA label for the toolbar. */
  ariaLabel?: string;
  /** A custom CSS class to apply to the toolbar. */
  customClass?: string;
  /** A CSS class to apply to the toolbar. */
  className?: string;
  /** The ARIA role of the toolbar. */
  role?: string;
}

/**
 * Renders a Modus toolbar component.
 * @param {ModusToolbarProps} props - The component props.
 * @param {React.Ref<HTMLModusWcToolbarElement>} ref - The ref object for the toolbar.
 * @returns {JSX.Element} The rendered toolbar component.
 */
const ModusToolbar = forwardRef<HTMLModusWcToolbarElement, ModusToolbarProps>(
  (
    {
      startContent,
      centerContent,
      endContent,
      children,
      ariaLabel,
      customClass,
      className,
      role,
    },
    ref
  ) => {
    const combinedClass =
      [customClass, className].filter(Boolean).join(" ") || undefined;

    return (
      <ModusWcToolbar
        ref={ref}
        aria-label={ariaLabel}
        role={role}
        custom-class={combinedClass}
      >
        {startContent && <div slot="start">{startContent}</div>}
        {centerContent && <div slot="center">{centerContent}</div>}
        {endContent && <div slot="end">{endContent}</div>}
        {children}
      </ModusWcToolbar>
    );
  }
);

ModusToolbar.displayName = "ModusToolbar";

export default ModusToolbar;
