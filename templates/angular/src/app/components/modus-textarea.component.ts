import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTextarea } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IInputFeedbackProp, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusTextareaComponent}.
 */
export interface ModusTextareaProps {
  /** Controls automatic correction in inputted text. */
  autoCorrect?: Components.ModusWcTextarea['autoCorrect'];
  /** Indicates that the input should have a border. */
  bordered?: Components.ModusWcTextarea['bordered'];
  /** Custom CSS class applied to the textarea. */
  className?: Components.ModusWcTextarea['customClass'];
  /** Disables the textarea. */
  disabled?: Components.ModusWcTextarea['disabled'];
  /** A hint to the browser for which enter key to display. */
  enterkeyhint?: Components.ModusWcTextarea['enterkeyhint'];
  /** Feedback configuration rendered below the textarea. */
  feedback?: IInputFeedbackProp;
  /** Identifier applied to the textarea element. */
  inputId?: Components.ModusWcTextarea['inputId'];
  /** Tab index applied to the textarea. */
  inputTabIndex?: Components.ModusWcTextarea['inputTabIndex'];
  /** Label text displayed above the textarea. */
  label?: Components.ModusWcTextarea['label'];
  /** Maximum number of characters allowed. */
  maxLength?: Components.ModusWcTextarea['maxLength'];
  /** Minimum number of characters required. */
  minLength?: Components.ModusWcTextarea['minLength'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcTextarea['name'];
  /** Placeholder text displayed when empty. */
  placeholder?: Components.ModusWcTextarea['placeholder'];
  /** Prevents editing when true. */
  readonly?: Components.ModusWcTextarea['readonly'];
  /** Marks the field as required. */
  required?: Components.ModusWcTextarea['required'];
  /** Number of visible text lines. */
  rows?: Components.ModusWcTextarea['rows'];
  /** Control size token. */
  size?: ModusSize;
  /** Current textarea value. */
  value?: Components.ModusWcTextarea['value'];
}

/**
 * Angular wrapper for the Modus textarea web component.
 *
 * @example
 * ```html
 * <modus-textarea
 *   label="Comments"
 *   [rows]="4"
 *   [value]="comments()"
 *   (inputChange)="comments.set($event.target.value)"
 * />
 * ```
 */
@Component({
  selector: 'modus-textarea',
  imports: [CommonModule, ModusWcTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-textarea
      [autoCorrect]="autoCorrect()"
      [bordered]="bordered()"
      [customClass]="className()"
      [disabled]="disabled()"
      [enterkeyhint]="enterkeyhint()"
      [feedback]="feedback()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [label]="label()"
      [maxLength]="maxLength()"
      [minLength]="minLength()"
      [name]="name()"
      [placeholder]="placeholder()"
      [readonly]="readonly()"
      [required]="required()"
      [rows]="rows()"
      [size]="size()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    />
  `,
})
export class ModusTextareaComponent {
  /** Controls automatic correction in inputted text. */
  readonly autoCorrect = input<'on' | 'off' | undefined>();

  /** Indicates that the input should have a border. */
  readonly bordered = input<boolean | undefined>(true);

  /** Custom CSS class applied to the textarea. */
  readonly className = input<string | undefined>();

  /** Disables the textarea. */
  readonly disabled = input<boolean | undefined>(false);

  /** A hint to the browser for which enter key to display. */
  readonly enterkeyhint = input<
    'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined
  >();

  /** Feedback configuration rendered below the textarea. */
  readonly feedback = input<IInputFeedbackProp | undefined>();

  /** Identifier applied to the textarea element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the textarea. */
  readonly inputTabIndex = input<number | undefined>();

  /** Label text displayed above the textarea. */
  readonly label = input<string | undefined>();

  /** Maximum number of characters allowed. */
  readonly maxLength = input<number | undefined>();

  /** Minimum number of characters required. */
  readonly minLength = input<number | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>();

  /** Placeholder text displayed when empty. */
  readonly placeholder = input<string>('');

  /** Prevents editing when true. */
  readonly readonly = input<boolean | undefined>(false);

  /** Marks the field as required. */
  readonly required = input<boolean | undefined>(false);

  /** Number of visible text lines. */
  readonly rows = input<number | undefined>();

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Current textarea value. */
  readonly value = input<string>('');

  /** Emits when the textarea loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the textarea gains focus. */
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
