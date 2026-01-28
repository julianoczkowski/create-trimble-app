import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTimeInput } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IInputFeedbackProp, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusTimeInputComponent}.
 */
export interface ModusTimeInputProps {
  /** Hint for form autofill feature. */
  autoComplete?: Components.ModusWcTimeInput['autoComplete'];
  /** Indicates that the input should have a border. */
  bordered?: Components.ModusWcTimeInput['bordered'];
  /** Custom CSS class applied to the input. */
  className?: Components.ModusWcTimeInput['customClass'];
  /** The options to display in the time input dropdown. */
  datalistOptions?: Components.ModusWcTimeInput['datalistOptions'];
  /** Whether the form control is disabled. */
  disabled?: Components.ModusWcTimeInput['disabled'];
  /** Feedback configuration rendered below the input. */
  feedback?: IInputFeedbackProp;
  /** The ID of the input element. */
  inputId?: Components.ModusWcTimeInput['inputId'];
  /** Tab index applied to the input. */
  inputTabIndex?: Components.ModusWcTimeInput['inputTabIndex'];
  /** ID of a `<datalist>` element that contains pre-defined time options. */
  datalistId?: Components.ModusWcTimeInput['datalistId'];
  /** Label text displayed above the input. */
  label?: Components.ModusWcTimeInput['label'];
  /** Maximum value. Format: `HH:mm`, `HH:mm:ss`. */
  max?: Components.ModusWcTimeInput['max'];
  /** Minimum value. Format: `HH:mm`, `HH:mm:ss`. */
  min?: Components.ModusWcTimeInput['min'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcTimeInput['name'];
  /** Prevents editing when true. */
  readOnly?: Components.ModusWcTimeInput['readOnly'];
  /** Marks the field as required. */
  required?: Components.ModusWcTimeInput['required'];
  /** Displays the time input format as `HH:mm:ss` if `true`. */
  showSeconds?: Components.ModusWcTimeInput['showSeconds'];
  /** Control size token. */
  size?: ModusSize;
  /** Specifies the granularity that the `value` must adhere to. */
  step?: Components.ModusWcTimeInput['step'];
  /** Current time value. Format: `HH:mm` or `HH:mm:ss`. */
  value?: Components.ModusWcTimeInput['value'];
}

/**
 * Angular wrapper for the Modus time input web component.
 *
 * @example
 * ```html
 * <modus-time-input
 *   label="Start time"
 *   [value]="startTime()"
 *   (inputChange)="startTime.set($event.target.value)"
 * />
 * ```
 */
@Component({
  selector: 'modus-time-input',
  imports: [CommonModule, ModusWcTimeInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-time-input
      [autoComplete]="autoComplete()"
      [bordered]="bordered()"
      [customClass]="className()"
      [datalistOptions]="datalistOptions()"
      [disabled]="disabled()"
      [feedback]="feedback()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [datalistId]="datalistId()"
      [label]="label()"
      [max]="max()"
      [min]="min()"
      [name]="name()"
      [readOnly]="readOnly()"
      [required]="required()"
      [showSeconds]="showSeconds()"
      [size]="size()"
      [step]="step()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    />
  `,
})
export class ModusTimeInputComponent {
  /** Hint for form autofill feature. */
  readonly autoComplete = input<'on' | 'off' | undefined>();

  /** Indicates that the input should have a border. */
  readonly bordered = input<boolean | undefined>(true);

  /** Custom CSS class applied to the input. */
  readonly className = input<string | undefined>();

  /** The options to display in the time input dropdown. */
  readonly datalistOptions = input<string[]>([]);

  /** Whether the form control is disabled. */
  readonly disabled = input<boolean | undefined>(false);

  /** Feedback configuration rendered below the input. */
  readonly feedback = input<IInputFeedbackProp | undefined>();

  /** The ID of the input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the input. */
  readonly inputTabIndex = input<number | undefined>();

  /** ID of a `<datalist>` element that contains pre-defined time options. */
  readonly datalistId = input<string | undefined>();

  /** Label text displayed above the input. */
  readonly label = input<string | undefined>();

  /** Maximum value. Format: `HH:mm`, `HH:mm:ss`. */
  readonly max = input<string | undefined>();

  /** Minimum value. Format: `HH:mm`, `HH:mm:ss`. */
  readonly min = input<string | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>();

  /** Prevents editing when true. */
  readonly readOnly = input<boolean | undefined>(false);

  /** Marks the field as required. */
  readonly required = input<boolean | undefined>(false);

  /** Displays the time input format as `HH:mm:ss` if `true`. */
  readonly showSeconds = input<boolean | undefined>(false);

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Specifies the granularity that the `value` must adhere to. */
  readonly step = input<number | undefined>();

  /** Current time value. Format: `HH:mm` or `HH:mm:ss`. */
  readonly value = input<string>('');

  /** Emits when the input loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the value changes. */
  readonly inputChange = output<Event>();

  /** Emits when the input gains focus. */
  readonly inputFocus = output<FocusEvent>();

  handleBlur(event: CustomEvent<FocusEvent>): void {
    this.inputBlur.emit(event.detail);
  }

  handleChange(event: CustomEvent<Event>): void {
    this.inputChange.emit(event.detail);
  }

  handleFocus(event: CustomEvent<FocusEvent>): void {
    this.inputFocus.emit(event.detail);
  }
}

