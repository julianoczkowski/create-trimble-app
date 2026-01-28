import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcDate } from '@trimble-oss/moduswebcomponents-angular';
import type {
  Components,
  DaisySize,
  IInputFeedbackProp,
  WeekStartDay,
} from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusDateComponent}.
 */
export interface ModusDateProps {
  /** Enables the bordered input style. */
  bordered?: Components.ModusWcDate['bordered'];
  /** Custom CSS class applied to the host element. */
  className?: Components.ModusWcDate['customClass'];
  /** Disables input interaction. */
  disabled?: Components.ModusWcDate['disabled'];
  /** Feedback message displayed below the control. */
  feedback?: IInputFeedbackProp;
  /** Date format pattern. */
  format?: 'yyyy-mm-dd' | 'dd-mm-yyyy' | 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'MMM DD, YYYY';
  /** Identifier applied to the native input. */
  inputId?: Components.ModusWcDate['inputId'];
  /** Tab index applied to the native input. */
  inputTabIndex?: Components.ModusWcDate['inputTabIndex'];
  /** Input label text. */
  label?: Components.ModusWcDate['label'];
  /** Maximum allowed date value. */
  max?: Components.ModusWcDate['max'];
  /** Minimum allowed date value. */
  min?: Components.ModusWcDate['min'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcDate['name'];
  /** Puts the input in read-only mode. */
  readOnly?: Components.ModusWcDate['readOnly'];
  /** Marks the input as required. */
  required?: Components.ModusWcDate['required'];
  /** Control size token. */
  size?: DaisySize;
  /** Current date value. */
  value?: Components.ModusWcDate['value'];
  /** First day of the week for the calendar view. */
  weekStartDay?: WeekStartDay;
}

/**
 * Angular wrapper for the Modus date input web component.
 */
@Component({
  selector: 'modus-date',
  imports: [CommonModule, ModusWcDate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-date
      [bordered]="bordered()"
      [customClass]="className()"
      [disabled]="disabled()"
      [feedback]="feedback()"
      [format]="format()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [label]="label()"
      [max]="max()"
      [min]="min()"
      [name]="name()"
      [readOnly]="readOnly()"
      [required]="required()"
      [size]="size()"
      [value]="value()"
      [weekStartDay]="weekStartDay()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
      (calendarMonthChange)="handleCalendarMonthChange($event)"
      (calendarYearChange)="handleCalendarYearChange($event)"
    />
  `,
})
export class ModusDateComponent {
  /** Enables the bordered input style. */
  readonly bordered = input<boolean | undefined>(true);

  /** Custom CSS class applied to the host element. */
  readonly className = input<string | undefined>();

  /** Disables input interaction. */
  readonly disabled = input<boolean | undefined>(false);

  /** Feedback message displayed below the control. */
  readonly feedback = input<IInputFeedbackProp | undefined>();

  /** Date format pattern. */
  readonly format = input<'yyyy-mm-dd' | 'dd-mm-yyyy' | 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'MMM DD, YYYY' | undefined>('dd-mm-yyyy');

  /** Identifier applied to the native input. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the native input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Input label text. */
  readonly label = input<string | undefined>();

  /** Maximum allowed date value. */
  readonly max = input<string | undefined>();

  /** Minimum allowed date value. */
  readonly min = input<string | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>('');

  /** Puts the input in read-only mode. */
  readonly readOnly = input<boolean | undefined>(false);

  /** Marks the input as required. */
  readonly required = input<boolean | undefined>(false);

  /** Control size token. */
  readonly size = input<DaisySize | undefined>('md');

  /** Current date value. */
  readonly value = input<string | undefined>();

  /** First day of the week for the calendar view. */
  readonly weekStartDay = input<WeekStartDay | undefined>('sunday');

  /** Emits when the input loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the input gains focus. */
  readonly inputFocus = output<FocusEvent>();

  /** Emits when the calendar month selection changes. */
  readonly calendarMonthChange = output<number>();

  /** Emits when the calendar year selection changes. */
  readonly calendarYearChange = output<number>();

  handleBlur(event: CustomEvent<FocusEvent>): void {
    this.inputBlur.emit(event.detail);
  }

  handleChange(event: CustomEvent<InputEvent>): void {
    this.inputChange.emit(event.detail);
  }

  handleFocus(event: CustomEvent<FocusEvent>): void {
    this.inputFocus.emit(event.detail);
  }

  handleCalendarMonthChange(event: CustomEvent<number>): void {
    this.calendarMonthChange.emit(event.detail);
  }

  handleCalendarYearChange(event: CustomEvent<number>): void {
    this.calendarYearChange.emit(event.detail);
  }
}
