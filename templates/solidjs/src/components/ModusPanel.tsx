import { type Component } from "solid-js";
import { Show } from "solid-js";
import type { JSX } from "solid-js";

/**
 * Props for the ModusPanel component.
 */
export interface ModusPanelProps {
  customClass?: string;
  width?: string;
  height?: string;
  floating?: boolean;
  header?: JSX.Element;
  body?: JSX.Element;
  footer?: JSX.Element;
  children?: JSX.Element;
  ariaLabel?: string;
}

/**
 * Renders a Modus panel component for organizing content in a structured layout.
 *
 * @param {ModusPanelProps} props - The component props.
 * @returns {JSX.Element} The rendered panel component.
 */
const ModusPanel: Component<ModusPanelProps> = (props) => {
  const bodyContent = () => props.body ?? props.children;

  return (
    <modus-wc-panel
      custom-class={props.customClass}
      width={props.width ?? "350px"}
      height={props.height ?? "700px"}
      floating={props.floating ?? false}
      aria-label={props.ariaLabel}
    >
      <Show when={props.header}>
        <div slot="header">{props.header}</div>
      </Show>
      <Show when={bodyContent()}>
        <div slot="body">{bodyContent()}</div>
      </Show>
      <Show when={props.footer}>
        <div slot="footer">{props.footer}</div>
      </Show>
    </modus-wc-panel>
  );
};

export default ModusPanel;
