import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTypography } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Typography hierarchy options.
 */
export type TypographyHierarchy = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

/**
 * Typography size options.
 */
export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Typography weight options.
 */
export type TypographyWeight = 'light' | 'normal' | 'semibold' | 'bold';

/**
 * Props supported by the {@link ModusTypographyComponent}.
 */
export interface ModusTypographyProps {
  /** Custom CSS class applied to the typography element. */
  className?: Components.ModusWcTypography['customClass'];
  /** The hierarchy of the typography component. */
  hierarchy?: TypographyHierarchy;
  /** The size of the font. */
  size?: TypographySize;
  /** The weight of the text. */
  weight?: TypographyWeight;
}

/**
 * Angular wrapper for the Modus typography web component.
 *
 * Used to render text with different sizes, hierarchy, and weights.
 *
 * Note: When using heading elements (h1-h6), the default heading CSS styling can be accessed
 * without modifying the default size (size="md") and weight (weight="normal") properties.
 * Default styling can be overridden by providing your own custom values for the size or weight
 * properties from the available options.
 *
 * @example
 * ```html
 * <modus-typography hierarchy="h1" size="xl" weight="bold">
 *   Heading Text
 * </modus-typography>
 * ```
 */
@Component({
  selector: 'modus-typography',
  imports: [CommonModule, ModusWcTypography],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-typography
      [customClass]="className()"
      [hierarchy]="hierarchy()"
      [size]="size()"
      [weight]="weight()"
    >
      <ng-content />
    </modus-wc-typography>
  `,
})
export class ModusTypographyComponent {
  /** Custom CSS class applied to the typography element. */
  readonly className = input<string | undefined>();

  /** The hierarchy of the typography component. */
  readonly hierarchy = input<TypographyHierarchy>('p');

  /** The size of the font. */
  readonly size = input<TypographySize | undefined>('md');

  /** The weight of the text. */
  readonly weight = input<TypographyWeight | undefined>('normal');
}
