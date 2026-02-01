import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcLoader } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, DaisySize, LoaderColor, LoaderVariant } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusLoaderComponent}.
 */
export interface ModusLoaderProps {
  /** Loader color token. */
  color?: LoaderColor;
  /** Optional CSS class applied to the loader element. */
  className?: Components.ModusWcLoader['customClass'];
  /** Loader size token. */
  size?: DaisySize;
  /** Loader variant (spinner style). */
  variant?: LoaderVariant;
}

/**
 * Angular wrapper for the Modus loader web component.
 */
@Component({
  selector: 'modus-loader',
  imports: [CommonModule, ModusWcLoader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-loader
      [color]="color()"
      [customClass]="className()"
      [size]="size()"
      [variant]="variant()"
    />
  `,
})
export class ModusLoaderComponent {
  /** Loader color token. */
  readonly color = input<LoaderColor | undefined>('primary');

  /** Optional CSS class applied to the loader element. */
  readonly className = input<string | undefined>();

  /** Loader size token. */
  readonly size = input<DaisySize | undefined>('md');

  /** Loader variant (spinner style). */
  readonly variant = input<LoaderVariant | undefined>('spinner');
}
