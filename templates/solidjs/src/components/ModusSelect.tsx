import { onMount, onCleanup, createEffect } from "solid-js";
import type { Component } from "solid-js";

export interface ModusSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ModusSelectProps {
  options: ModusSelectOption[];
  value?: string;
  label?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  inputId?: string;
  customClass?: string;
  ariaLabel?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
}

const ModusSelect: Component<ModusSelectProps> = (props) => {
  let selectEl: HTMLModusWcSelectElement | undefined;

  onMount(() => {
    const el = selectEl;
    if (!el || !props.onInputChange) return;
    const handler = (e: Event) => props.onInputChange?.(e as CustomEvent<InputEvent>);
    el.addEventListener("inputChange", handler);
    onCleanup(() => el.removeEventListener("inputChange", handler));
  });

  createEffect(() => {
    const el = selectEl;
    if (el) {
      el.options = [...(props.options ?? [])];
    }
  });

  return (
    <modus-wc-select
      ref={(el) => (selectEl = el)}
      value={props.value ?? ""}
      label={props.label}
      name={props.name}
      size={props.size ?? "md"}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      bordered={props.bordered ?? true}
      input-id={props.inputId}
      custom-class={props.customClass}
      aria-label={props.ariaLabel}
    />
  );
};

export default ModusSelect;
