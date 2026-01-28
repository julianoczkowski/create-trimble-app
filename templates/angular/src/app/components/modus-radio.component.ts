import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcRadio } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusRadioComponent}.
 */
export interface ModusRadioProps {
  /** Custom CSS class applied to the radio input. */
  className?: Components.ModusWcRadio['customClass'];
  /** Disables the radio control. */
  disabled?: Components.ModusWcRadio['disabled'];
  /** Identifier applied to the input element. */
  inputId?: Components.ModusWcRadio['inputId'];
  /** Tab index applied to the input. */
  inputTabIndex?: Components.ModusWcRadio['inputTabIndex'];
  /** Label displayed alongside the radio. */
  label?: Components.ModusWcRadio['label'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcRadio['name'];
  /** Marks the control as required. */
  required?: Components.ModusWcRadio['required'];
  /** Radio size token. */
  size?: ModusSize;
  /** Boolean value representing the checked state. */
  value?: Components.ModusWcRadio['value'];
}

/**
 * Angular wrapper for the Modus radio web component.
 */
@Component({
  selector: 'modus-radio',
  imports: [CommonModule, ModusWcRadio],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-radio
      [customClass]="className()"
      [disabled]="disabled()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [label]="label()"
      [name]="name()"
      [required]="required()"
      [size]="size()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    />
  `,
})
export class ModusRadioComponent {
  /** Custom CSS class applied to the radio input. */
  readonly className = input<string | undefined>();

  /** Disables the radio control. */
  readonly disabled = input<boolean | undefined>(false);

  /** Identifier applied to the input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Label displayed alongside the radio. */
  readonly label = input<string | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string | undefined>('');

  /** Marks the control as required. */
  readonly required = input<boolean | undefined>(false);

  /** Radio size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Boolean value representing the checked state. */
  readonly value = input<boolean | undefined>(false);

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
