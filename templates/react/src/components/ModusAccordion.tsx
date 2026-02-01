import {
  ModusWcAccordion,
  ModusWcCollapse,
} from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

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
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
  content: ReactNode;
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
  onExpandedChange?: (event: CustomEvent<{ expanded: boolean; index: number }>) => void;
  /** A CSS class to apply to the container element. */
  className?: string;
}

/**
 * Renders a Modus accordion component with a set of items.
 * @param {ModusAccordionProps} props - The component props.
 * @param {AccordionItem[]} props.items - The items to display in the accordion.
 * @param {string} [props.customClass=""] - A custom CSS class to apply to the accordion.
 * @param {(event: CustomEvent<{ expanded: boolean; index: number }>) => void} [props.onExpandedChange] - A callback function to handle the expanded change event.
 * @param {string} [props.className=""] - A CSS class to apply to the container element.
 * @returns {JSX.Element} The rendered accordion component.
 */
export default function ModusAccordion({
  items,
  customClass = '',
  onExpandedChange,
  className = '',
}: ModusAccordionProps) {
  return (
    <div className={className}>
      <ModusWcAccordion
        custom-class={customClass}
        onExpandedChange={onExpandedChange}
      >
        {items.map((item) => (
          <ModusWcCollapse
            key={item.id}
            id={`collapse-${item.id}`}
            collapse-id={item.id}
            bordered={item.bordered || false}
            options={item.options}
            expanded={item.expanded}
          >
            <div slot="content">{item.content}</div>
          </ModusWcCollapse>
        ))}
      </ModusWcAccordion>
    </div>
  );
}
