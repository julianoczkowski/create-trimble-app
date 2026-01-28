import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcCheckbox } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusCheckboxComponent}.
 */
export interface ModusCheckboxProps {
  /** Custom CSS class applied to the checkbox input. */
  className?: Components.ModusWcCheckbox['customClass'];
  /** Whether the checkbox is disabled. */
  disabled?: Components.ModusWcCheckbox['disabled'];
  /** Indeterminate visual state for tri-state checkboxes. */
  indeterminate?: Components.ModusWcCheckbox['indeterminate'];
  /** Identifier applied to the checkbox input element. */
  inputId?: Components.ModusWcCheckbox['inputId'];
  /** Tab index applied to the checkbox input. */
  inputTabIndex?: Components.ModusWcCheckbox['inputTabIndex'];
  /** Optional label rendered alongside the checkbox. */
  label?: Components.ModusWcCheckbox['label'];
  /** Name attribute submitted in form payloads. */
  name?: Components.ModusWcCheckbox['name'];
  /** Marks the checkbox as required. */
  required?: Components.ModusWcCheckbox['required'];
  /** Size token controlling checkbox dimensions. */
  size?: ModusSize;
  /** Bound value indicating whether the checkbox is selected. */
  value?: Components.ModusWcCheckbox['value'];
}

/**
 * Angular wrapper for the Modus checkbox web component.
 *
 * @example
 * ```html
 * <modus-checkbox
 *   label="Accept terms"
 *   [value]="acceptTerms()"
 *   (valueChange)="acceptTerms.set($event)"
 * />
 * ```
 */
@Component({
  selector: 'modus-checkbox',
  imports: [CommonModule, ModusWcCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-checkbox
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
export class ModusCheckboxComponent {
  /** Custom CSS class applied to the checkbox input. */
  readonly className = input<string | undefined>();

  /** Whether the checkbox is disabled. */
  readonly disabled = input<boolean | undefined>(false);

  /** Indeterminate visual state for tri-state checkboxes. */
  readonly indeterminate = input<boolean | undefined>(false);

  /** Identifier applied to the checkbox input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the checkbox input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Optional label rendered alongside the checkbox. */
  readonly label = input<string | undefined>();

  /** Name attribute submitted in form payloads. */
  readonly name = input<string | undefined>('');

  /** Marks the checkbox as required. */
  readonly required = input<boolean | undefined>(false);

  /** Size token controlling checkbox dimensions. */
  readonly size = input<ModusSize | undefined>('md');

  /** Bound value indicating whether the checkbox is selected. */
  readonly value = input<boolean | undefined>(false);

  /** Emits when the checkbox loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the checkbox value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the checkbox gains focus. */
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
