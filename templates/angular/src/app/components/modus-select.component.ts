import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcSelect } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IInputFeedbackProp, ISelectOption, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusSelectComponent}.
 */
export interface ModusSelectProps {
  /** Indicates that the input should have a border. */
  bordered?: Components.ModusWcSelect['bordered'];
  /** Custom CSS class applied to the select element. */
  className?: Components.ModusWcSelect['customClass'];
  /** Disables the select. */
  disabled?: Components.ModusWcSelect['disabled'];
  /** Feedback configuration rendered below the select. */
  feedback?: IInputFeedbackProp;
  /** Identifier applied to the select element. */
  inputId?: Components.ModusWcSelect['inputId'];
  /** Tab index applied to the select. */
  inputTabIndex?: Components.ModusWcSelect['inputTabIndex'];
  /** Label text displayed above the select. */
  label?: Components.ModusWcSelect['label'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcSelect['name'];
  /** Options displayed in the select dropdown. */
  options: ISelectOption[];
  /** Marks the select as required. */
  required?: Components.ModusWcSelect['required'];
  /** Control size token. */
  size?: ModusSize;
  /** Current selected value. */
  value?: Components.ModusWcSelect['value'];
}

/**
 * Angular wrapper for the Modus select web component.
 *
 * @example
 * ```html
 * <modus-select
 *   label="Choose an option"
 *   [options]="selectOptions"
 *   [value]="selectedValue()"
 *   (inputChange)="handleChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'modus-select',
  imports: [CommonModule, ModusWcSelect],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-select
      [bordered]="bordered()"
      [customClass]="className()"
      [disabled]="disabled()"
      [feedback]="feedback()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [label]="label()"
      [name]="name()"
      [options]="options()"
      [required]="required()"
      [size]="size()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    />
  `,
})
export class ModusSelectComponent {
  /** Indicates that the input should have a border. */
  readonly bordered = input<boolean | undefined>(true);

  /** Custom CSS class applied to the select element. */
  readonly className = input<string | undefined>();

  /** Disables the select. */
  readonly disabled = input<boolean | undefined>(false);

  /** Feedback configuration rendered below the select. */
  readonly feedback = input<IInputFeedbackProp | undefined>();

  /** Identifier applied to the select element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the select. */
  readonly inputTabIndex = input<number | undefined>();

  /** Label text displayed above the select. */
  readonly label = input<string | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>();

  /** Options displayed in the select dropdown. */
  readonly options = input.required<ISelectOption[]>();

  /** Marks the select as required. */
  readonly required = input<boolean | undefined>(false);

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Current selected value. */
  readonly value = input<string>('');

  /** Emits when the select loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the select gains focus. */
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

