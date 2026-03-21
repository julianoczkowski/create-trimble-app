import type { Component, JSX } from "solid-js";

/**
 * Props for the DemoExample component.
 */
interface DemoExampleProps {
  /** The title of the demo example. */
  title: string;
  /** A description of the demo example. */
  description: string | JSX.Element;
  /** The content of the demo example. */
  children: JSX.Element;
}

/**
 * Renders a styled container for a demo example.
 * @param props - The component props.
 * @returns The rendered demo example component.
 */
const DemoExample: Component<DemoExampleProps> = (props) => {
  return (
    <div class="flex flex-col gap-4 rounded-lg bg-background p-6 border-default">
      <div class="flex flex-col gap-1">
        <div class="text-lg font-medium text-foreground">{props.title}</div>
        <div class="text-sm text-foreground opacity-80">{props.description}</div>
      </div>
      <div class="flex flex-col gap-4">{props.children}</div>
    </div>
  );
};

export default DemoExample;

/**
 * Renders a clean, unstyled container for a demo example.
 * @param props - The component props.
 * @returns The rendered clean demo example component.
 */
export function DemoExampleClean(props: DemoExampleProps) {
  return (
    <div class="flex flex-col gap-4 rounded-lg bg-background p-6 border-dashed">
      <div class="flex flex-col gap-1">
        <div class="text-lg font-medium text-foreground">{props.title}</div>
        <div class="text-sm text-foreground opacity-80">{props.description}</div>
      </div>
      <div class="flex flex-col gap-4">{props.children}</div>
    </div>
  );
}
