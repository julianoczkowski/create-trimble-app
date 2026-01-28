import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcSwitch } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusSwitchComponent}.
 */
export interface ModusSwitchProps {
  /** Custom CSS class applied to the switch element. */
  className?: Components.ModusWcSwitch['customClass'];
  /** Disables the switch. */
  disabled?: Components.ModusWcSwitch['disabled'];
  /** Indeterminate visual state for tri-state switches. */
  indeterminate?: Components.ModusWcSwitch['indeterminate'];
  /** Identifier applied to the switch input element. */
  inputId?: Components.ModusWcSwitch['inputId'];
  /** Tab index applied to the switch input. */
  inputTabIndex?: Components.ModusWcSwitch['inputTabIndex'];
  /** Optional label rendered alongside the switch. */
  label?: Components.ModusWcSwitch['label'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcSwitch['name'];
  /** Marks the switch as required. */
  required?: Components.ModusWcSwitch['required'];
  /** Size token controlling switch dimensions. */
  size?: ModusSize;
  /** Bound value indicating whether the switch is selected. */
  value?: Components.ModusWcSwitch['value'];
}

/**
 * Angular wrapper for the Modus switch web component.
 *
 * @example
 * ```html
 * <modus-switch
 *   label="Enable notifications"
 *   [value]="enabled()"
 *   (inputChange)="enabled.set($event.target.checked)"
 * />
 * ```
 */
@Component({
  selector: 'modus-switch',
  imports: [CommonModule, ModusWcSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-switch
      [customClass]="className()"
      [disabled]="disabled()"
      [indeterminate]="indeterminate()"
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
export class ModusSwitchComponent {
  /** Custom CSS class applied to the switch element. */
  readonly className = input<string | undefined>();

  /** Disables the switch. */
  readonly disabled = input<boolean | undefined>(false);

  /** Indeterminate visual state for tri-state switches. */
  readonly indeterminate = input<boolean | undefined>(false);

  /** Identifier applied to the switch input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the switch input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Optional label rendered alongside the switch. */
  readonly label = input<string | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string>('');

  /** Marks the switch as required. */
  readonly required = input<boolean | undefined>(false);

  /** Size token controlling switch dimensions. */
  readonly size = input<ModusSize | undefined>('md');

  /** Bound value indicating whether the switch is selected. */
  readonly value = input<boolean | undefined>(false);

  /** Emits when the switch loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the switch value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the switch gains focus. */
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

