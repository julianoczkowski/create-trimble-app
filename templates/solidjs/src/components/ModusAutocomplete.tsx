import { createEffect } from "solid-js";
import type { Component, JSX } from "solid-js";

/**
 * Represents an item in the autocomplete list.
 */
export interface AutocompleteItem {
  /** The label to display for the item. */
  label: string;
  /** The value of the item. */
  value: string;
  /** Whether the item is visible in the menu. */
  visibleInMenu: boolean;
  /** Whether the item is selected. */
  selected?: boolean;
}

/**
 * Represents the content to display when there are no results.
 */
export interface AutocompleteNoResults {
  /** The main label to display. */
  label: string;
  /** A sub-label to display. */
  subLabel: string;
  /** The severity of the message. */
  severity?: "error" | "info" | "success" | "warning";
}

/**
 * Props for the ModusAutocomplete component.
 */
export interface ModusAutocompleteProps {
  /** Whether the autocomplete has a border. */
  bordered?: boolean;
  /** Whether the autocomplete is disabled. */
  disabled?: boolean;
  /** Whether multiple items can be selected. */
  multiSelect?: boolean;
  /** The items to display in the autocomplete list. */
  items: AutocompleteItem[];
  /** The value of the autocomplete. */
  value?: string;
  /** The placeholder text for the input. */
  placeholder?: string;
  /** The label for the autocomplete. */
  label?: string;
  /** The size of the autocomplete. */
  size?: "sm" | "md" | "lg";
  /** The debounce time in milliseconds for input changes. */
  debounceMs?: number;
  /** The minimum number of characters to trigger the autocomplete. */
  minChars?: number;
  /** Whether to leave the menu open after an item is selected. */
  leaveMenuOpen?: boolean;
  /** Whether to show a spinner. */
  showSpinner?: boolean;
  /** The content to display when there are no results. */
  noResults?: AutocompleteNoResults;
  /** A custom CSS class to apply to the autocomplete. */
  customClass?: string;
  /** Whether the autocomplete is read-only. */
  readOnly?: boolean;
  /** Whether the autocomplete is required. */
  required?: boolean;
  /** The ID of the input element. */
  inputId?: string;
  /** The tab index of the input element. */
  inputTabIndex?: number;
  /** The name of the input element. */
  name?: string;
  /** The ARIA label for the autocomplete. */
  "aria-label"?: string;
  /** A callback function to handle input changes. */
  onInputChange?: (event: CustomEvent<Event>) => void;
  /** A callback function to handle input focus. */
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle input blur. */
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
  /** A callback function to handle item selection. */
  onItemSelect?: (event: CustomEvent<AutocompleteItem>) => void;
  /** A callback function to handle chip removal. */
  onChipRemove?: (event: CustomEvent<AutocompleteItem>) => void;
  /** The content to display inside the autocomplete. */
  children?: JSX.Element;
}

/**
 * Renders a Modus autocomplete component.
 * @param props - The component props.
 * @returns The rendered autocomplete component.
 */
const ModusAutocomplete: Component<ModusAutocompleteProps> = (props) => {
  let autocompleteEl: HTMLModusWcAutocompleteElement | undefined;

  createEffect(() => {
    const autocomplete = autocompleteEl;
    if (!autocomplete) return;

    const handleInputChange = (event: Event) => {
      props.onInputChange?.(event as CustomEvent<Event>);
    };
    const handleInputFocus = (event: Event) => {
      props.onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      props.onInputBlur?.(event as CustomEvent<FocusEvent>);
    };
    const handleItemSelect = (event: Event) => {
      props.onItemSelect?.(event as CustomEvent<AutocompleteItem>);
    };
    const handleChipRemove = (event: Event) => {
      props.onChipRemove?.(event as CustomEvent<AutocompleteItem>);
    };

    if (props.onInputChange)
      autocomplete.addEventListener("inputChange", handleInputChange);
    if (props.onInputFocus)
      autocomplete.addEventListener("inputFocus", handleInputFocus);
    if (props.onInputBlur)
      autocomplete.addEventListener("inputBlur", handleInputBlur);
    if (props.onItemSelect)
      autocomplete.addEventListener("itemSelect", handleItemSelect);
    if (props.onChipRemove)
      autocomplete.addEventListener("chipRemove", handleChipRemove);

    return () => {
      if (props.onInputChange)
        autocomplete.removeEventListener("inputChange", handleInputChange);
      if (props.onInputFocus)
        autocomplete.removeEventListener("inputFocus", handleInputFocus);
      if (props.onInputBlur)
        autocomplete.removeEventListener("inputBlur", handleInputBlur);
      if (props.onItemSelect)
        autocomplete.removeEventListener("itemSelect", handleItemSelect);
      if (props.onChipRemove)
        autocomplete.removeEventListener("chipRemove", handleChipRemove);
    };
  });

  return (
    <modus-wc-autocomplete
      ref={(el) => (autocompleteEl = el)}
      bordered={props.bordered ?? true}
      disabled={props.disabled ?? false}
      multiSelect={props.multiSelect ?? false}
      items={props.items}
      value={props.value ?? ""}
      placeholder={props.placeholder}
      label={props.label}
      size={props.size ?? "md"}
      debounceMs={props.debounceMs ?? 300}
      minChars={props.minChars ?? 0}
      leaveMenuOpen={props.leaveMenuOpen ?? false}
      showSpinner={props.showSpinner ?? false}
      noResults={props.noResults}
      customClass={props.customClass}
      readOnly={props.readOnly ?? false}
      required={props.required ?? false}
      inputId={props.inputId}
      inputTabIndex={props.inputTabIndex}
      name={props.name}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </modus-wc-autocomplete>
  );
};

export default ModusAutocomplete;
