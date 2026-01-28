import type { ReactNode } from "react";

/**
 * Props for the DemoExample component.
 */
interface DemoExampleProps {
  /** The title of the demo example. */
  title: string;
  /** A description of the demo example. */
  description: string | ReactNode;
  /** The content of the demo example. */
  children: ReactNode;
}

/**
 * Renders a styled container for a demo example.
 * @param {DemoExampleProps} props - The component props.
 * @param {string} props.title - The title of the demo example.
 * @param {string | ReactNode} props.description - A description of the demo example.
 * @param {ReactNode} props.children - The content of the demo example.
 * @returns {JSX.Element} The rendered demo example component.
 */
export default function DemoExample({
  title,
  description,
  children,
}: DemoExampleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card p-6 border-default">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-medium text-foreground">{title}</div>
        <div className="text-sm text-foreground opacity-80">{description}</div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/**
 * Renders a clean, unstyled container for a demo example.
 * @param {DemoExampleProps} props - The component props.
 * @param {string} props.title - The title of the demo example.
 * @param {string | ReactNode} props.description - A description of the demo example.
 * @param {ReactNode} props.children - The content of the demo example.
 * @returns {JSX.Element} The rendered clean demo example component.
 */
export function DemoExampleClean({
  title,
  description,
  children,
}: DemoExampleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6 border-dashed">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-medium text-foreground">{title}</div>
        <div className="text-sm text-foreground opacity-80">{description}</div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
