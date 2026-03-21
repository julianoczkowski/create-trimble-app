import { onMount, onCleanup, createEffect } from "solid-js";
import type { Component } from "solid-js";

export interface ModusSwitchProps {
  value?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  name?: string;
  inputId?: string;
  customClass?: string;
  ariaLabel?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
}

const ModusSwitch: Component<ModusSwitchProps> = (props) => {
  let switchEl: HTMLModusWcSwitchElement | undefined;

  onMount(() => {
    const el = switchEl;
    if (!el || !props.onInputChange) return;
    const handler = (e: Event) => props.onInputChange?.(e as CustomEvent<InputEvent>);
    el.addEventListener("inputChange", handler);
    onCleanup(() => el.removeEventListener("inputChange", handler));
  });

  createEffect(() => {
    const el = switchEl;
    if (el) {
      el.value = props.value ?? false;
      el.indeterminate = props.indeterminate ?? false;
    }
  });

  return (
    <modus-wc-switch
      ref={(el) => (switchEl = el)}
      disabled={props.disabled ?? false}
      indeterminate={props.indeterminate ?? false}
      required={props.required ?? false}
      size={props.size ?? "md"}
      label={props.label}
      name={props.name}
      input-id={props.inputId}
      custom-class={props.customClass}
      aria-label={props.ariaLabel}
    />
  );
};

export default ModusSwitch;
