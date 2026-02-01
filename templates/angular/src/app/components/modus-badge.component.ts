import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcBadge } from '@trimble-oss/moduswebcomponents-angular';

/**
 * Available color tokens for the Modus badge component.
 */
export type ModusBadgeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'high-contrast'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Badge sizing tokens supported by the underlying web component.
 */
export type ModusBadgeSize = 'sm' | 'md' | 'lg';

/**
 * Render variants that control badge appearance.
 */
export type ModusBadgeVariant = 'counter' | 'filled' | 'outlined' | 'text';

/**
 * Input properties for the ModusBadgeComponent wrapper.
 */
export interface ModusBadgeProps {
  /** Sets the badge color palette. */
  color?: ModusBadgeColor;
  /** Custom CSS class applied to the badge element. */
  className?: string;
  /** Controls the badge size token. */
  size?: ModusBadgeSize;
  /** Selects the badge visual variant. */
  variant?: ModusBadgeVariant;
  /** Accessible label describing the badge when used without text. */
  ariaLabel?: string;
}

/**
 * Angular wrapper for the Modus Web Component badge.
 *
 * Consumers can bind to the strongly typed inputs and project arbitrary content inside the badge slot.
 *
 * @example
 * ```html
 * <modus-badge color="success" variant="filled">Ready</modus-badge>
 * ```
 */
@Component({
  selector: 'modus-badge',
  imports: [CommonModule, ModusWcBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-badge
      [color]="color()"
      [customClass]="className()"
      [size]="size()"
      [variant]="variant()"
      [attr.aria-label]="ariaLabel()"
    >
      <ng-content />
    </modus-wc-badge>
  `,
})
export class ModusBadgeComponent {
  /** Sets the badge color palette. */
  readonly color = input<ModusBadgeColor>('primary');

  /** Custom CSS class applied to the badge element. */
  readonly className = input<string | undefined>();

  /** Controls the badge size token. */
  readonly size = input<ModusBadgeSize>('md');

  /** Selects the badge visual variant. */
  readonly variant = input<ModusBadgeVariant>('filled');

  /** Accessible label describing the badge when used without text. */
  readonly ariaLabel = input<string | undefined>();
}
