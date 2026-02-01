import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTextInput } from '@trimble-oss/moduswebcomponents-angular';
import type {
  AutocompleteTypes,
  Components,
  IInputFeedbackProp,
  ModusSize,
  TextFieldTypes,
} from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusTextInputComponent}.
 */
export interface ModusTextInputProps {
  /** Controls automatic capitalization in inputted text. */
  autoCapitalize?: Components.ModusWcTextInput['autoCapitalize'];
  /** Hint for form autofill feature. */
  autoComplete?: AutocompleteTypes;
  /** Controls automatic correction in inputted text. */
  autoCorrect?: Components.ModusWcTextInput['autoCorrect'];
  /** Indicates that the input should have a border. */
  bordered?: Components.ModusWcTextInput['bordered'];
  /** Aria label for the clear icon button. */
  clearAriaLabel?: Components.ModusWcTextInput['clearAriaLabel'];
  /** Custom CSS class applied to the input. */
  className?: Components.ModusWcTextInput['customClass'];
  /** Disables the input. */
  disabled?: Components.ModusWcTextInput['disabled'];
  /** A hint to the browser for which enter key to display. */
  enterkeyhint?: Components.ModusWcTextInput['enterkeyhint'];
  /** Feedback configuration rendered below the input. */
  feedback?: IInputFeedbackProp;
  /** Show the clear button within the input field. */
  includeClear?: Components.ModusWcTextInput['includeClear'];
  /** Show the search icon within the input field. */
  includeSearch?: Components.ModusWcTextInput['includeSearch'];
  /** Identifier applied to the input element. */
  inputId?: Components.ModusWcTextInput['inputId'];
  /** Tab index applied to the input. */
  inputTabIndex?: Components.ModusWcTextInput['inputTabIndex'];
  /** Hint for mobile keyboard type. */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** Label text displayed above the input. */
  label?: Components.ModusWcTextInput['label'];
  /** Maximum length (number of characters) of value. */
  maxLength?: Components.ModusWcTextInput['maxLength'];
  /** Minimum length (number of characters) of value. */
  minLength?: Components.ModusWcTextInput['minLength'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcTextInput['name'];
  /** Pattern the value must match to be valid. */
  pattern?: Components.ModusWcTextInput['pattern'];
  /** Placeholder text displayed when empty. */
  placeholder?: Components.ModusWcTextInput['placeholder'];
  /** Prevents editing when true. */
  readOnly?: Components.ModusWcTextInput['readOnly'];
  /** Marks the field as required. */
  required?: Components.ModusWcTextInput['required'];
  /** Control size token. */
  size?: ModusSize;
  /** Type of form control. */
  type?: TextFieldTypes;
  /** Current input value. */
  value?: Components.ModusWcTextInput['value'];
}

/**
 * Angular wrapper for the Modus text input web component.
 *
 * @example
 * ```html
 * <modus-text-input
 *   label="Email"
 *   type="email"
 *   [value]="email()"
 *   (inputChange)="email.set($event.target.value)"
 * />
 * ```
 */
@Component({
  selector: 'modus-text-input',
  imports: [CommonModule, ModusWcTextInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-text-input
      [autoCapitalize]="autoCapitalize()"
      [autoComplete]="autoComplete()"
      [autoCorrect]="autoCorrect()"
      [bordered]="bordered()"
      [clearAriaLabel]="clearAriaLabel()"
      [customClass]="className()"
      [disabled]="disabled()"
      [enterkeyhint]="enterkeyhint()"
      [feedback]="feedback()"
      [includeClear]="includeClear()"
      [includeSearch]="includeSearch()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [attr.inputmode]="inputMode()"
      [label]="label()"
      [maxLength]="maxLength()"
      [minLength]="minLength()"
      [name]="name()"
      [pattern]="pattern()"
      [placeholder]="placeholder()"
      [readOnly]="readOnly()"
      [required]="required()"
      [size]="size()"
      [type]="type()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    >
      <ng-content select="[slot='custom-icon']" slot="custom-icon" />
    </modus-wc-text-input>
  `,
})
export class ModusTextInputComponent {
  /** Controls automatic capitalization in inputted text. */
  readonly autoCapitalize = input<
    'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | undefined
  >();

  /** Hint for form autofill feature. */
  readonly autoComplete = input<AutocompleteTypes | undefined>();

  /** Controls automatic correction in inputted text. */
  readonly autoCorrect = input<'on' | 'off' | undefined>();

  /** Indicates that the input should have a border. */
  readonly bordered = input<boolean | undefined>(true);

  /** Aria label for the clear icon button. */
  readonly clearAriaLabel = input<string | undefined>('Clear text');

  /** Custom CSS class applied to the input. */
  readonly className = input<string | undefined>();

  /** Disables the input. */
  readonly disabled = input<boolean | undefined>(false);

  /** A hint to the browser for which enter key to display. */
  readonly enterkeyhint = input<
    'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined
  >();

  /** Feedback configuration rendered below the input. */
  readonly feedback = input<IInputFeedbackProp | undefined>();

  /** Show the clear button within the input field. */
  readonly includeClear = input<boolean | undefined>(false);

  /** Show the search icon within the input field. */
  readonly includeSearch = input<boolean | undefined>(false);

  /** Identifier applied to the input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Hint for mobile keyboard type. */
  readonly inputMode = input<'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | undefined>('text');

  /** Label text displayed above the input. */
  readonly label = input<string | undefined>();

  /** Maximum length (number of characters) of value. */
  readonly maxLength = input<number | undefined>();

  /** Minimum length (number of characters) of value. */
  readonly minLength = input<number | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>();

  /** Pattern the value must match to be valid. */
  readonly pattern = input<string | undefined>();

  /** Placeholder text displayed when empty. */
  readonly placeholder = input<string>('');

  /** Prevents editing when true. */
  readonly readOnly = input<boolean | undefined>(false);

  /** Marks the field as required. */
  readonly required = input<boolean | undefined>(false);

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Type of form control. */
  readonly type = input<TextFieldTypes>('text');

  /** Current input value. */
  readonly value = input<string>('');

  /** Emits when the input loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the input gains focus. */
  readonly inputFocus = output<FocusEvent>();

  handleBlur(event: CustomEvent<FocusEvent>): void {
    this.inputBlur.emit(event.detail);
  }

  handleChange(event: CustomEvent<InputEvent>): void {
    this.inputChange.emit(event.detail);
  }

  handleFocus(event: CustomEvent<FocusEvent>): void {
    this.inputFocus.emit(event.detail);
  }
}

