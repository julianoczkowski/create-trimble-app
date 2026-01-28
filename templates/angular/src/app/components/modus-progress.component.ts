import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcProgress } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusProgressComponent}.
 */
export interface ModusProgressProps {
  /** Optional CSS class applied to the progress element. */
  className?: Components.ModusWcProgress['customClass'];
  /** Displays the indeterminate animation when true. */
  indeterminate?: Components.ModusWcProgress['indeterminate'];
  /** Label displayed within the progress track. */
  label?: Components.ModusWcProgress['label'];
  /** Maximum value of the progress component. */
  max?: Components.ModusWcProgress['max'];
  /** Current progress value. */
  value?: Components.ModusWcProgress['value'];
  /** Visual variant (default or radial). */
  variant?: Components.ModusWcProgress['variant'];
}

/**
 * Angular wrapper for the Modus progress web component.
 */
@Component({
  selector: 'modus-progress',
  imports: [CommonModule, ModusWcProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-progress
      [customClass]="className()"
      [indeterminate]="indeterminate()"
      [label]="label()"
      [max]="max()"
      [value]="value()"
      [variant]="variant()"
    >
      <ng-content />
    </modus-wc-progress>
  `,
})
export class ModusProgressComponent {
  /** Optional CSS class applied to the progress element. */
  readonly className = input<string | undefined>();

  /** Displays the indeterminate animation when true. */
  readonly indeterminate = input<boolean | undefined>(false);

  /** Label displayed within the progress track. */
  readonly label = input<string | undefined>();

  /** Maximum value of the progress component. */
  readonly max = input<number | undefined>(100);

  /** Current progress value. */
  readonly value = input<number | undefined>(0);

  /** Visual variant (default or radial). */
  readonly variant = input<'default' | 'radial' | undefined>('default');
}
