import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcSlider } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusSliderComponent}.
 */
export interface ModusSliderProps {
  /** Custom CSS class applied to the slider element. */
  className?: Components.ModusWcSlider['customClass'];
  /** Disables the slider. */
  disabled?: Components.ModusWcSlider['disabled'];
  /** Identifier applied to the slider input element. */
  inputId?: Components.ModusWcSlider['inputId'];
  /** Tab index applied to the slider input. */
  inputTabIndex?: Components.ModusWcSlider['inputTabIndex'];
  /** Label text displayed above the slider. */
  label?: Components.ModusWcSlider['label'];
  /** Maximum slider value. */
  max?: Components.ModusWcSlider['max'];
  /** Minimum slider value. */
  min?: Components.ModusWcSlider['min'];
  /** Name attribute submitted in forms. */
  name?: Components.ModusWcSlider['name'];
  /** Marks the slider as required. */
  required?: Components.ModusWcSlider['required'];
  /** Control size token. */
  size?: ModusSize;
  /** The increment of the slider. */
  step?: Components.ModusWcSlider['step'];
  /** Current slider value. */
  value?: Components.ModusWcSlider['value'];
}

/**
 * Angular wrapper for the Modus slider web component.
 *
 * @example
 * ```html
 * <modus-slider
 *   label="Volume"
 *   [min]="0"
 *   [max]="100"
 *   [value]="volume()"
 *   (inputChange)="volume.set($event.target.value)"
 * />
 * ```
 */
@Component({
  selector: 'modus-slider',
  imports: [CommonModule, ModusWcSlider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-slider
      [customClass]="className()"
      [disabled]="disabled()"
      [inputId]="inputId()"
      [inputTabIndex]="inputTabIndex()"
      [label]="label()"
      [max]="max()"
      [min]="min()"
      [name]="name()"
      [required]="required()"
      [size]="size()"
      [step]="step()"
      [value]="value()"
      (inputBlur)="handleBlur($event)"
      (inputChange)="handleChange($event)"
      (inputFocus)="handleFocus($event)"
    />
  `,
})
export class ModusSliderComponent {
  /** Custom CSS class applied to the slider element. */
  readonly className = input<string | undefined>();

  /** Disables the slider. */
  readonly disabled = input<boolean | undefined>(false);

  /** Identifier applied to the slider input element. */
  readonly inputId = input<string | undefined>();

  /** Tab index applied to the slider input. */
  readonly inputTabIndex = input<number | undefined>();

  /** Label text displayed above the slider. */
  readonly label = input<string | undefined>();

  /** Maximum slider value. */
  readonly max = input<number | undefined>();

  /** Minimum slider value. */
  readonly min = input<number | undefined>();

  /** Name attribute submitted in forms. */
  readonly name = input<string>('');

  /** Marks the slider as required. */
  readonly required = input<boolean | undefined>(false);

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** The increment of the slider. */
  readonly step = input<number | undefined>();

  /** Current slider value. */
  readonly value = input<number>(0);

  /** Emits when the slider loses focus. */
  readonly inputBlur = output<FocusEvent>();

  /** Emits when the value changes. */
  readonly inputChange = output<InputEvent>();

  /** Emits when the slider gains focus. */
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

