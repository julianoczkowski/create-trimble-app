import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcAutocomplete } from '@trimble-oss/moduswebcomponents-angular';
import type {
  Components,
  IAutocompleteItem,
  IAutocompleteNoResults,
  ModusSize,
} from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusAutocompleteComponent}.
 */
export interface ModusAutocompleteProps {
  /** Indicates that the autocomplete should have a border. */
  bordered?: Components.ModusWcAutocomplete['bordered'];
  /** Custom CSS class applied to the host element. */
  className?: Components.ModusWcAutocomplete['customClass'];
  /** The debounce timeout in milliseconds. Set to 0 to disable debouncing. */
  debounceMs?: Components.ModusWcAutocomplete['debounceMs'];
  /** Disables the autocomplete. */
  disabled?: Components.ModusWcAutocomplete['disabled'];
  /** Show the clear button within the input field. */
  includeClear?: Components.ModusWcAutocomplete['includeClear'];
  /** Show the search icon within the input field. */
  includeSearch?: Components.ModusWcAutocomplete['includeSearch'];
  /** The ID of the input element. */
  inputId?: Components.ModusWcAutocomplete['inputId'];
  /** Tab index applied to the input. */
  inputTabIndex?: Components.ModusWcAutocomplete['inputTabIndex'];
  /** The items to display in the menu. */
  items?: IAutocompleteItem[];
  /** Label text displayed above the autocomplete. */
  label?: Components.ModusWcAutocomplete['label'];
  /** Whether the menu should remain open after an item is selected. */
  leaveMenuOpen?: Components.ModusWcAutocomplete['leaveMenuOpen'];
  /** The minimum number of characters required to render the menu. */
  minChars?: Components.ModusWcAutocomplete['minChars'];
  /** Whether the input allows multiple items to be selected. */
  multiSelect?: Components.ModusWcAutocomplete['multiSelect'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcAutocomplete['name'];
  /** The content to display when no results are found. */
  noResults?: IAutocompleteNoResults;
  /** Placeholder text displayed when empty. */
  placeholder?: Components.ModusWcAutocomplete['placeholder'];
  /** Prevents editing when true. */
  readOnly?: Components.ModusWcAutocomplete['readOnly'];
  /** Marks the field as required. */
  required?: Components.ModusWcAutocomplete['required'];
  /** Whether to show the menu whenever the input has focus. */
  showMenuOnFocus?: Components.ModusWcAutocomplete['showMenuOnFocus'];
  /** The size of the autocomplete (input and menu). */
  size?: ModusSize;
  /** A spinner that appears when set to true. */
  showSpinner?: Components.ModusWcAutocomplete['showSpinner'];
  /** Current input value. */
  value?: Components.ModusWcAutocomplete['value'];
  /** Maximum number of chips to display. */
  maxChips?: Components.ModusWcAutocomplete['maxChips'];
  /** Custom item selection handler. */
  customItemSelect?: Components.ModusWcAutocomplete['customItemSelect'];
  /** Custom input change handler. */
  customInputChange?: Components.ModusWcAutocomplete['customInputChange'];
  /** Custom key down handler. */
  customKeyDown?: Components.ModusWcAutocomplete['customKeyDown'];
  /** Custom blur handler. */
  customBlur?: Components.ModusWcAutocomplete['customBlur'];
  /** Minimum width for the text input in pixels. */
  minInputWidth?: Components.ModusWcAutocomplete['minInputWidth'];
}

/**
 * Angular wrapper for the Modus autocomplete web component.
 *
 * The autocomplete component supports custom menu items and custom icons via slots:
 * - `menu-items` slot: For custom menu item content
 * - `custom-icon` slot: For custom icon in the input field
 *
 * @example
 * ```html
 * <modus-autocomplete
 *   label="Search"
 *   [items]="searchItems"
 *   [value]="searchValue()"
 *   (itemSelect)="handleItemSelect($event)"
 * />
 * ```
 */
@Component({
  selector: 'modus-autocomplete',
  imports: [CommonModule, ModusWcAutocomplete],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-autocomplete
      [bordered]="bordered()"
      [customClass]="className()"
      [debounceMs]="debounceMs()"
      [disabled]="disabled()"
      [includeClear]="includeClear()"
      [includeSearch]="includeSearch()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [items]="items()"
      [label]="label()"
      [leaveMenuOpen]="leaveMenuOpen()"
      [minChars]="minChars()"
      [multiSelect]="multiSelect()"
      [name]="name()"
      [noResults]="noResults()"
      [placeholder]="placeholder()"
      [readOnly]="readOnly()"
      [required]="required()"
      [showMenuOnFocus]="showMenuOnFocus()"
      [size]="size()"
      [showSpinner]="showSpinner()"
      [value]="value()"
      [maxChips]="maxChips()"
      [customItemSelect]="customItemSelect()"
      [customInputChange]="customInputChange()"
      [customKeyDown]="customKeyDown()"
      [customBlur]="customBlur()"
      [minInputWidth]="minInputWidth()"
      (chipRemove)="handleChipRemove($event)"
      (chipsExpansionChange)="handleChipsExpansionChange($event)"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
      (itemSelect)="handleItemSelect($event)"
    >
      <ng-content select="[slot='menu-items']" slot="menu-items" />
      <ng-content select="[slot='custom-icon']" slot="custom-icon" />
    </modus-wc-autocomplete>
  `,
})
export class ModusAutocompleteComponent {
  /** Indicates that the autocomplete should have a border. */
  readonly bordered = input<boolean | undefined>(true);

  /** Custom CSS class applied to the host element. */
  readonly className = input<string | undefined>();

  /** The debounce timeout in milliseconds. Set to 0 to disable debouncing. */
  readonly debounceMs = input<number | undefined>(300);

  /** Disables the autocomplete. */
  readonly disabled = input<boolean | undefined>(false);

  /** Show the clear button within the input field. */
  readonly includeClear = input<boolean | undefined>(false);

  /** Show the search icon within the input field. */
  readonly includeSearch = input<boolean | undefined>(false);

  /** The ID of the input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the input. */
  readonly inputTabIndex = input<number | undefined>();

  /** The items to display in the menu. */
  readonly items = input<IAutocompleteItem[] | undefined>([]);

  /** Label text displayed above the autocomplete. */
  readonly label = input<string | undefined>();

  /** Whether the menu should remain open after an item is selected. */
  readonly leaveMenuOpen = input<boolean | undefined>(false);

  /** The minimum number of characters required to render the menu. */
  readonly minChars = input<number>(0);

  /** Whether the input allows multiple items to be selected. */
  readonly multiSelect = input<boolean | undefined>(false);

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>();

  /** The content to display when no results are found. */
  readonly noResults = input<IAutocompleteNoResults | undefined>();

  /** Placeholder text displayed when empty. */
  readonly placeholder = input<string>('');

  /** Prevents editing when true. */
  readonly readOnly = input<boolean | undefined>(false);

  /** Marks the field as required. */
  readonly required = input<boolean | undefined>(false);

  /** Whether to show the menu whenever the input has focus. */
  readonly showMenuOnFocus = input<boolean | undefined>(false);

  /** The size of the autocomplete (input and menu). */
  readonly size = input<ModusSize | undefined>('md');

  /** A spinner that appears when set to true. */
  readonly showSpinner = input<boolean | undefined>(false);

  /** Current input value. */
  readonly value = input<string>('');

  /** Maximum number of chips to display. */
  readonly maxChips = input<number | undefined>(-1);

  /** Custom item selection handler. */
  readonly customItemSelect = input<((item: IAutocompleteItem) => void) | undefined>();

  /** Custom input change handler. */
  readonly customInputChange = input<((value: string) => void) | undefined>();

  /** Custom key down handler. */
  readonly customKeyDown = input<((event: KeyboardEvent) => void) | undefined>();

  /** Custom blur handler. */
  readonly customBlur = input<((event: FocusEvent) => void) | undefined>();

  /** Minimum width for the text input in pixels. */
  readonly minInputWidth = input<number | undefined>(10);

  /** Emits when a selected item chip is removed. */
  readonly chipRemove = output<IAutocompleteItem>();

  /** Emits when chips expansion state changes. */
  readonly chipsExpansionChange = output<{ expanded: boolean }>();

  /** Emits when the input loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the input value changes. */
  readonly inputChange = output<Event>();

  /** Emits when the input gains focus. */
  readonly inputFocus = output<FocusEvent>();

  /** Emits when a menu item is selected. */
  readonly itemSelect = output<IAutocompleteItem>();

  handleChipRemove(event: CustomEvent<IAutocompleteItem>): void {
    this.chipRemove.emit(event.detail);
  }

  handleChipsExpansionChange(event: CustomEvent<{ expanded: boolean }>): void {
    this.chipsExpansionChange.emit(event.detail);
  }

  handleBlur(event: CustomEvent<FocusEvent>): void {
    this.inputBlur.emit(event.detail);
  }

  handleChange(event: CustomEvent<Event>): void {
    this.inputChange.emit(event.detail);
  }

  handleFocus(event: CustomEvent<FocusEvent>): void {
    this.inputFocus.emit(event.detail);
  }

  handleItemSelect(event: CustomEvent<IAutocompleteItem>): void {
    this.itemSelect.emit(event.detail);
  }
}
