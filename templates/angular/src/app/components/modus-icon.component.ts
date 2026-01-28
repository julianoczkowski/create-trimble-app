import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcIcon } from '@trimble-oss/moduswebcomponents-angular';

/**
 * Available variant styles for Modus icons.
 */
export type ModusIconVariant = 'outlined' | 'solid' | undefined;

/**
 * Supported icon size tokens.
 */
export type ModusIconSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Input properties for the ModusIconComponent wrapper.
 */
export interface ModusIconProps {
  /** The icon glyph name from the Modus icon font. */
  name: string;
  /** Optional variant that selects the icon font family. */
  variant?: ModusIconVariant;
  /** Configures the size utility applied to the icon element. */
  size?: ModusIconSize;
  /** Indicates whether the icon is decorative-only. */
  decorative?: boolean;
  /** Custom CSS class applied to the `<modus-wc-icon>` host. */
  className?: string;
  /** Accessible label exposed when `decorative` is false. */
  ariaLabel?: string;
}

/**
 * Angular wrapper for the Modus Web Component icon.
 *
 * Provides a typed, signal-driven API and supports projecting the icon name from Angular templates.
 *
 * @example
 * ```html
 * <modus-icon name="check_circle" variant="outlined" ariaLabel="Success" />
 * ```
 */
@Component({
  selector: 'modus-icon',
  imports: [CommonModule, ModusWcIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-icon
      [name]="name()"
      [variant]="variant()"
      [size]="size()"
      [decorative]="decorative()"
      [customClass]="className()"
      [attr.aria-label]="computedAriaLabel()"
    />
  `,
})
export class ModusIconComponent {
  /** The icon glyph name from the Modus icon font. */
  readonly name = input.required<string>();

  /** Optional variant that selects the icon font family. */
  readonly variant = input<ModusIconVariant>(undefined);

  /** Configures the size utility applied to the icon element. */
  readonly size = input<ModusIconSize>('md');

  /** Indicates whether the icon is decorative-only. */
  readonly decorative = input<boolean>(true);

  /** Custom CSS class applied to the `<modus-wc-icon>` host. */
  readonly className = input<string | undefined>();

  /** Accessible label exposed when `decorative` is false. */
  readonly ariaLabel = input<string | undefined>();

  /** Determines the correct aria-label binding based on decorative state. */
  readonly computedAriaLabel = computed(() =>
    this.decorative() ? undefined : this.ariaLabel() ?? `${this.name()} icon`
  );
}
