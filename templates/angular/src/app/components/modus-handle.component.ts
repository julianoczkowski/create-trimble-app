import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcHandle } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusHandleComponent}.
 */
export interface ModusHandleProps {
  /** Custom CSS class applied to the handle. */
  className?: Components.ModusWcHandle['customClass'];
  /** Initial split percentage for the left/top panel. */
  defaultSplit?: Components.ModusWcHandle['defaultSplit'];
  /** Density token controlling handle spacing. */
  density?: Components.ModusWcHandle['density'];
  /** Left/top target element or selector. */
  leftTarget?: Components.ModusWcHandle['leftTarget'];
  /** Right/bottom target element or selector. */
  rightTarget?: Components.ModusWcHandle['rightTarget'];
  /** Orientation of the handle. */
  orientation?: Components.ModusWcHandle['orientation'];
  /** Size of the handle bar. */
  size?: Components.ModusWcHandle['size'];
  /** Handle type (bar or button). */
  type?: Components.ModusWcHandle['type'];
  /** Button color for button-style handles. */
  buttonColor?: Components.ModusWcHandle['buttonColor'];
  /** Button size for button-style handles. */
  buttonSize?: Components.ModusWcHandle['buttonSize'];
  /** Button variant for button-style handles. */
  buttonVariant?: Components.ModusWcHandle['buttonVariant'];
  /** Accessible label for the handle. */
  ariaLabel?: string;
}

/**
 * Angular wrapper for the Modus handle web component.
 */
@Component({
  selector: 'modus-handle',
  imports: [CommonModule, ModusWcHandle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-handle
      [customClass]="className()"
      [defaultSplit]="defaultSplit()"
      [density]="density()"
      [leftTarget]="leftTarget()"
      [rightTarget]="rightTarget()"
      [orientation]="orientation()"
      [size]="size()"
      [type]="type()"
      [buttonColor]="buttonColor()"
      [buttonSize]="buttonSize()"
      [buttonVariant]="buttonVariant()"
      [attr.aria-label]="ariaLabel()"
    />
  `,
})
export class ModusHandleComponent {
  /** Custom CSS class applied to the handle. */
  readonly className = input<string | undefined>();

  /** Initial split percentage for the left/top panel. */
  readonly defaultSplit = input<Components.ModusWcHandle['defaultSplit'] | undefined>();

  /** Density token controlling handle spacing. */
  readonly density = input<Components.ModusWcHandle['density'] | undefined>();

  /** Left/top target element or selector. */
  readonly leftTarget = input<Components.ModusWcHandle['leftTarget'] | undefined>();

  /** Right/bottom target element or selector. */
  readonly rightTarget = input<Components.ModusWcHandle['rightTarget'] | undefined>();

  /** Orientation of the handle. */
  readonly orientation = input<Components.ModusWcHandle['orientation'] | undefined>('horizontal');

  /** Size of the handle bar. */
  readonly size = input<Components.ModusWcHandle['size'] | undefined>('default');

  /** Handle type (bar or button). */
  readonly type = input<Components.ModusWcHandle['type'] | undefined>('bar');

  /** Button color for button-style handles. */
  readonly buttonColor = input<Components.ModusWcHandle['buttonColor'] | undefined>('tertiary');

  /** Button size for button-style handles. */
  readonly buttonSize = input<Components.ModusWcHandle['buttonSize'] | undefined>('md');

  /** Button variant for button-style handles. */
  readonly buttonVariant = input<Components.ModusWcHandle['buttonVariant'] | undefined>('filled');

  /** Accessible label for the handle. */
  readonly ariaLabel = input<string | undefined>();
}
