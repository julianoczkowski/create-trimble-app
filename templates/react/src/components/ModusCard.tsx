import type { ReactNode } from "react";
import { ModusWcCard } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusCard component.
 */
export interface ModusCardProps {
  /** The main content of the card. */
  children?: ReactNode;
  /** Whether to show a background figure. */
  backgroundFigure?: boolean;
  /** Whether the card has a border. */
  bordered?: boolean;
  /** The layout of the card. */
  layout?: 'vertical' | 'horizontal';
  /** The padding of the card. */
  padding?: 'normal' | 'compact';
  /** A custom CSS class to apply to the card. */
  customClass?: string;
  /** The ARIA label for the card. */
  'aria-label'?: string;
  /** The header content of the card. */
  header?: ReactNode;
  /** The title content of the card. */
  title?: ReactNode;
  /** The subtitle content of the card. */
  subtitle?: ReactNode;
  /** The actions content of the card. */
  actions?: ReactNode;
  /** The footer content of the card. */
  footer?: ReactNode;
}

/**
 * Renders a Modus card component.
 * @param {ModusCardProps} props - The component props.
 * @returns {JSX.Element} The rendered card component.
 */
export default function ModusCard({
  children,
  backgroundFigure = false,
  bordered = false,
  layout = 'vertical',
  padding = 'normal',
  customClass,
  'aria-label': ariaLabel,
  header,
  title,
  subtitle,
  actions,
  footer,
}: ModusCardProps) {
  return (
    <ModusWcCard
      backgroundFigure={backgroundFigure}
      bordered={bordered}
      layout={layout}
      padding={padding}
      customClass={customClass}
      aria-label={ariaLabel}
    >
      {header && <div slot="header">{header}</div>}
      {title && <div slot="title">{title}</div>}
      {subtitle && <div slot="subtitle">{subtitle}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
      {footer && <div slot="footer">{footer}</div>}
    </ModusWcCard>
  );
}
