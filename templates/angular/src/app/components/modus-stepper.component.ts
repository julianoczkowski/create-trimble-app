import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcStepper } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, Orientation } from '@trimble-oss/moduswebcomponents';

/**
 * Props for a step item in the stepper component.
 */
export interface IStepperItem {
  /** The color theme of the step. */
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  /** Custom content to display in the step indicator. */
  content?: string;
  /** Custom CSS class to apply to the step. */
  customClass?: string;
  /** Text label for the step. */
  label?: string;
}

/**
 * Props supported by the {@link ModusStepperComponent}.
 */
export interface ModusStepperProps {
  /** Custom CSS class applied to the stepper element. */
  className?: Components.ModusWcStepper['customClass'];
  /** The orientation of the steps. */
  orientation?: Orientation;
  /** The steps to display. */
  steps: IStepperItem[];
}

/**
 * Angular wrapper for the Modus stepper web component.
 *
 * Used to show a list of steps in a process.
 *
 * @example
 * ```html
 * <modus-stepper
 *   [steps]="[
 *     { label: 'Step 1', color: 'primary' },
 *     { label: 'Step 2', color: 'info' },
 *     { label: 'Step 3' }
 *   ]"
 * />
 * ```
 */
@Component({
  selector: 'modus-stepper',
  imports: [CommonModule, ModusWcStepper],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-stepper [customClass]="className()" [orientation]="orientation()" [steps]="steps()" />
  `,
})
export class ModusStepperComponent {
  /** Custom CSS class applied to the stepper element. */
  readonly className = input<string | undefined>();

  /** The orientation of the steps. */
  readonly orientation = input<Orientation | undefined>();

  /** The steps to display. */
  readonly steps = input.required<IStepperItem[]>();
}
