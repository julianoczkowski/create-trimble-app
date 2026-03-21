import { For, createEffect } from "solid-js";
import type { Component, JSX } from "solid-js";

/**
 * Represents the options for a collapse panel.
 */
interface CollapseOptions {
  /** The title of the collapse panel. */
  title: string;
  /** A description for the collapse panel. */
  description?: string;
  /** An icon to display in the collapse panel. */
  icon?: string;
  /** The ARIA label for the icon. */
  iconAriaLabel?: string;
  /** The size of the collapse panel. */
  size?: "xs" | "sm" | "md" | "lg";
}

/**
 * Represents an item in the accordion.
 */
interface AccordionItem {
  /** A unique identifier for the accordion item. */
  id: string;
  /** The options for the collapse panel. */
  options: CollapseOptions;
  /** The content to display when the accordion item is expanded. */
  content: JSX.Element;
  /** Whether the accordion item is expanded by default. */
  expanded?: boolean;
  /** Whether the accordion item has a border. */
  bordered?: boolean;
}

/**
 * Props for the ModusAccordion component.
 */
interface ModusAccordionProps {
  /** The items to display in the accordion. */
  items: AccordionItem[];
  /** A custom CSS class to apply to the accordion. */
  customClass?: string;
  /** A callback function to handle the expanded change event. */
  onExpandedChange?: (
    event: CustomEvent<{ expanded: boolean; index: number }>
  ) => void;
  /** A CSS class to apply to the container element. */
  className?: string;
}

/**
 * Renders a Modus accordion component with a set of items.
 * @param props - The component props.
 * @returns The rendered accordion component.
 */
const ModusAccordion: Component<ModusAccordionProps> = (props) => {
  let accordionEl: HTMLModusWcAccordionElement | undefined;

  createEffect(() => {
    const accordion = accordionEl;
    if (!accordion || !props.onExpandedChange) return;

    const handleExpandedChange = (event: Event) => {
      props.onExpandedChange?.(event as CustomEvent<{ expanded: boolean; index: number }>);
    };

    accordion.addEventListener("expandedChange", handleExpandedChange);
    return () => {
      accordion.removeEventListener("expandedChange", handleExpandedChange);
    };
  });

  return (
    <div class={props.className ?? ""}>
      <modus-wc-accordion ref={(el) => (accordionEl = el)} custom-class={props.customClass ?? ""}>
        <For each={props.items}>
          {(item) => (
            <modus-wc-collapse
              id={`collapse-${item.id}`}
              collapse-id={item.id}
              bordered={item.bordered ?? false}
              options={item.options}
              expanded={item.expanded}
            >
              <div slot="content">{item.content}</div>
            </modus-wc-collapse>
          )}
        </For>
      </modus-wc-accordion>
    </div>
  );
};

export default ModusAccordion;
