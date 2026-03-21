import { Show } from "solid-js";
import type { Component, JSX } from "solid-js";

/**
 * Props for the ModusCard component.
 */
export interface ModusCardProps {
  /** The main content of the card. */
  children?: JSX.Element;
  /** Whether to show a background figure. */
  backgroundFigure?: boolean;
  /** Whether the card has a border. */
  bordered?: boolean;
  /** The layout of the card. */
  layout?: "vertical" | "horizontal";
  /** The padding of the card. */
  padding?: "compact" | "comfortable";
  /** A custom CSS class to apply to the card. */
  customClass?: string;
  /** The ARIA label for the card. */
  "aria-label"?: string;
  /** The header content of the card. */
  header?: JSX.Element;
  /** The title content of the card. */
  title?: JSX.Element;
  /** The subtitle content of the card. */
  subtitle?: JSX.Element;
  /** The actions content of the card. */
  actions?: JSX.Element;
  /** The footer content of the card. */
  footer?: JSX.Element;
}

/**
 * Renders a Modus card component.
 * @param props - The component props.
 * @returns The rendered card component.
 */
const ModusCard: Component<ModusCardProps> = (props) => {
  return (
    <modus-wc-card
      backgroundFigure={props.backgroundFigure ?? false}
      bordered={props.bordered ?? false}
      layout={props.layout ?? "vertical"}
      padding={props.padding ?? "comfortable"}
      customClass={props.customClass}
      aria-label={props["aria-label"]}
    >
      <Show when={props.header}>
        <div slot="header">{props.header}</div>
      </Show>
      <Show when={props.title}>
        <div slot="title">{props.title}</div>
      </Show>
      <Show when={props.subtitle}>
        <div slot="subtitle">{props.subtitle}</div>
      </Show>
      {props.children}
      <Show when={props.actions}>
        <div slot="actions">{props.actions}</div>
      </Show>
      <Show when={props.footer}>
        <div slot="footer">{props.footer}</div>
      </Show>
    </modus-wc-card>
  );
};

export default ModusCard;
