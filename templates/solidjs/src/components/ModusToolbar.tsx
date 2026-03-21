import type { Component } from "solid-js";
import type { JSX } from "solid-js";
import { Show } from "solid-js";

/**
 * Props for the ModusToolbar component.
 */
export interface ModusToolbarProps {
  startContent?: JSX.Element;
  centerContent?: JSX.Element;
  endContent?: JSX.Element;
  children?: JSX.Element;
  ariaLabel?: string;
  customClass?: string;
  className?: string;
  role?: string;
  ref?: (el: HTMLElement) => void;
}

/**
 * Renders a Modus toolbar component.
 * @param {ModusToolbarProps} props - The component props.
 * @returns {JSX.Element} The rendered toolbar component.
 */
const ModusToolbar: Component<ModusToolbarProps> = (props) => {
  const combinedClass =
    [props.customClass, props.className].filter(Boolean).join(" ") || undefined;

  return (
    <modus-wc-toolbar
      ref={props.ref}
      aria-label={props.ariaLabel}
      role={props.role}
      custom-class={combinedClass}
    >
      <Show when={props.startContent}>
        <div slot="start">{props.startContent}</div>
      </Show>
      <Show when={props.centerContent}>
        <div slot="center">{props.centerContent}</div>
      </Show>
      <Show when={props.endContent}>
        <div slot="end">{props.endContent}</div>
      </Show>
      {props.children}
    </modus-wc-toolbar>
  );
};

export default ModusToolbar;
