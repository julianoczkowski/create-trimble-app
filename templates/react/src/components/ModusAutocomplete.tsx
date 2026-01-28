import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcAutocomplete } from "@trimble-oss/moduswebcomponents-react";

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
  severity?: 'error' | 'info' | 'success' | 'warning';
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
  size?: 'sm' | 'md' | 'lg';
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
  'aria-label'?: string;
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
  children?: ReactNode;
}

/**
 * Renders a Modus autocomplete component.
 * @param {ModusAutocompleteProps} props - The component props.
 * @returns {JSX.Element} The rendered autocomplete component.
 */
export default function ModusAutocomplete({
  bordered = true,
  disabled = false,
  multiSelect = false,
  items,
  value = '',
  placeholder,
  label,
  size = 'md',
  debounceMs = 300,
  minChars = 0,
  leaveMenuOpen = false,
  showSpinner = false,
  noResults,
  customClass,
  readOnly = false,
  required = false,
  inputId,
  inputTabIndex,
  name,
  'aria-label': ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onItemSelect,
  onChipRemove,
  children,
}: ModusAutocompleteProps) {
  const autocompleteRef = useRef<HTMLModusWcAutocompleteElement>(null);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

    const handleInputChange = (event: Event) => {
      const customEvent = event as CustomEvent<Event>;
      onInputChange?.(customEvent);
    };

    const handleInputFocus = (event: Event) => {
      const customEvent = event as CustomEvent<FocusEvent>;
      onInputFocus?.(customEvent);
    };

    const handleInputBlur = (event: Event) => {
      const customEvent = event as CustomEvent<FocusEvent>;
      onInputBlur?.(customEvent);
    };

    const handleItemSelect = (event: Event) => {
      const customEvent = event as CustomEvent<AutocompleteItem>;
      onItemSelect?.(customEvent);
    };

    const handleChipRemove = (event: Event) => {
      const customEvent = event as CustomEvent<AutocompleteItem>;
      onChipRemove?.(customEvent);
    };

    // Add event listeners
    if (onInputChange)
      autocomplete.addEventListener("inputChange", handleInputChange);
    if (onInputFocus)
      autocomplete.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur)
      autocomplete.addEventListener("inputBlur", handleInputBlur);
    if (onItemSelect)
      autocomplete.addEventListener("itemSelect", handleItemSelect);
    if (onChipRemove)
      autocomplete.addEventListener("chipRemove", handleChipRemove);

    return () => {
      // Cleanup event listeners
      if (onInputChange)
        autocomplete.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        autocomplete.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur)
        autocomplete.removeEventListener("inputBlur", handleInputBlur);
      if (onItemSelect)
        autocomplete.removeEventListener("itemSelect", handleItemSelect);
      if (onChipRemove)
        autocomplete.removeEventListener("chipRemove", handleChipRemove);
    };
  }, [onInputChange, onInputFocus, onInputBlur, onItemSelect, onChipRemove]);

  return (
    <ModusWcAutocomplete
      ref={autocompleteRef}
      bordered={bordered}
      disabled={disabled}
      multiSelect={multiSelect}
      items={items}
      value={value}
      placeholder={placeholder}
      label={label}
      size={size}
      debounceMs={debounceMs}
      minChars={minChars}
      leaveMenuOpen={leaveMenuOpen}
      showSpinner={showSpinner}
      noResults={noResults}
      customClass={customClass}
      readOnly={readOnly}
      required={required}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      name={name}
      aria-label={ariaLabel}
    >
      {children}
    </ModusWcAutocomplete>
  );
}
