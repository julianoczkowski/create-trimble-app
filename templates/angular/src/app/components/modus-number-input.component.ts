import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcNumberInput } from '@trimble-oss/moduswebcomponents-angular';
import type {
  Components,
  IInputFeedbackProp,
  ModusSize,
} from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusNumberInputComponent}.
 */
export interface ModusNumberInputProps {
  /** HTML autocomplete hint for the control. */
  autoComplete?: Components.ModusWcNumberInput['autoComplete'];
  /** Indicates that the input should render its border. */
  bordered?: Components.ModusWcNumberInput['bordered'];
  /** Currency symbol displayed before the input value. */
  currencySymbol?: Components.ModusWcNumberInput['currencySymbol'];
  /** Custom CSS class applied to the input. */
  className?: Components.ModusWcNumberInput['customClass'];
  /** Disables the input. */
  disabled?: Components.ModusWcNumberInput['disabled'];
  /** Feedback configuration rendered below the input. */
  feedback?: IInputFeedbackProp;
  /** Identifier applied to the underlying input element. */
  inputId?: Components.ModusWcNumberInput['inputId'];
  /** Tab index applied to the input. */
  inputTabIndex?: Components.ModusWcNumberInput['inputTabIndex'];
  /** Label text displayed above the input. */
  label?: Components.ModusWcNumberInput['label'];
  /** Maximum value accepted. */
  max?: Components.ModusWcNumberInput['max'];
  /** Minimum value accepted. */
  min?: Components.ModusWcNumberInput['min'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcNumberInput['name'];
  /** Hint for mobile keyboard type. */
  inputMode?: 'decimal' | 'numeric' | 'none';
  /** Placeholder text displayed when empty. */
  placeholder?: Components.ModusWcNumberInput['placeholder'];
  /** Prevents editing when true. */
  readOnly?: Components.ModusWcNumberInput['readOnly'];
  /** Marks the field as required. */
  required?: Components.ModusWcNumberInput['required'];
  /** Control size token. */
  size?: ModusSize;
  /** Step interval for the input value. */
  step?: Components.ModusWcNumberInput['step'];
  /** Input type variant. */
  type?: Components.ModusWcNumberInput['type'];
  /** Current input value. */
  value?: Components.ModusWcNumberInput['value'];
}

/**
 * Angular wrapper for the Modus number input web component.
 */
@Component({
  selector: 'modus-number-input',
  imports: [CommonModule, ModusWcNumberInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-number-input
      [autoComplete]="autoComplete()"
      [bordered]="bordered()"
      [currencySymbol]="currencySymbol()"
      [customClass]="className()"
      [disabled]="disabled()"
      [feedback]="feedback()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [label]="label()"
      [max]="max()"
      [min]="min()"
      [name]="name()"
      [attr.inputmode]="inputMode()"
      [placeholder]="placeholder()"
      [readOnly]="readOnly()"
      [required]="required()"
      [size]="size()"
      [step]="step()"
      [type]="type()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    >
      <ng-content />
    </modus-wc-number-input>
  `,
})
export class ModusNumberInputComponent {
  /** HTML autocomplete hint for the control. */
  readonly autoComplete = input<'on' | 'off' | undefined>();

  /** Indicates that the input should render its border. */
  readonly bordered = input<boolean | undefined>(true);

  /** Currency symbol displayed before the input value. */
  readonly currencySymbol = input<string | undefined>('');

  /** Custom CSS class applied to the input. */
  readonly className = input<string | undefined>();

  /** Disables the input. */
  readonly disabled = input<boolean | undefined>(false);

  /** Feedback configuration rendered below the input. */
  readonly feedback = input<IInputFeedbackProp | undefined>();

  /** Identifier applied to the underlying input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Label text displayed above the input. */
  readonly label = input<string | undefined>();

  /** Maximum value accepted. */
  readonly max = input<number | undefined>();

  /** Minimum value accepted. */
  readonly min = input<number | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>();

  /** Hint for mobile keyboard type. */
  readonly inputMode = input<'decimal' | 'numeric' | 'none' | undefined>('numeric');

  /** Placeholder text displayed when empty. */
  readonly placeholder = input<string | undefined>('');

  /** Prevents editing when true. */
  readonly readOnly = input<boolean | undefined>(false);

  /** Marks the field as required. */
  readonly required = input<boolean | undefined>(false);

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Step interval for the input value. */
  readonly step = input<number | undefined>();

  /** Input type variant. */
  readonly type = input<'number' | 'range' | undefined>('number');

  /** Current input value. */
  readonly value = input<string | undefined>('');

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
