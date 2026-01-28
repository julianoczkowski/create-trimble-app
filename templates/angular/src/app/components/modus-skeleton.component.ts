import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcSkeleton } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusSkeletonComponent}.
 */
export interface ModusSkeletonProps {
  /** Custom CSS class applied to the skeleton element. */
  className?: Components.ModusWcSkeleton['customClass'];
  /** The height of the skeleton. */
  height?: Components.ModusWcSkeleton['height'];
  /** The shape of the skeleton. */
  shape?: Components.ModusWcSkeleton['shape'];
  /** The width of the skeleton. */
  width?: Components.ModusWcSkeleton['width'];
}

/**
 * Angular wrapper for the Modus skeleton web component.
 *
 * @example
 * ```html
 * <modus-skeleton shape="rectangle" width="200px" height="20px" />
 * ```
 */
@Component({
  selector: 'modus-skeleton',
  imports: [CommonModule, ModusWcSkeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-skeleton
      [customClass]="className()"
      [height]="height()"
      [shape]="shape()"
      [width]="width()"
    />
  `,
})
export class ModusSkeletonComponent {
  /** Custom CSS class applied to the skeleton element. */
  readonly className = input<string | undefined>();

  /** The height of the skeleton. */
  readonly height = input<string>('var(--modus-wc-line-height-md)');

  /** The shape of the skeleton. */
  readonly shape = input<'circle' | 'rectangle' | undefined>('rectangle');

  /** The width of the skeleton. */
  readonly width = input<string>('100%');
}

