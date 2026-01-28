import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcDivider } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, Orientation } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusDividerComponent}.
 */
export interface ModusDividerProps {
  /** Divider color token. */
  color?: Components.ModusWcDivider['color'];
  /** Optional text content rendered within the divider. */
  content?: Components.ModusWcDivider['content'];
  /** CSS class applied to the divider element. */
  className?: Components.ModusWcDivider['customClass'];
  /** Divider orientation for surrounding content. */
  orientation?: Orientation;
  /** Divider label alignment. */
  position?: Components.ModusWcDivider['position'];
  /** Enables responsive behavior for small viewports. */
  responsive?: Components.ModusWcDivider['responsive'];
}

/**
 * Angular wrapper for the Modus divider web component.
 */
@Component({
  selector: 'modus-divider',
  imports: [CommonModule, ModusWcDivider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-divider
      [color]="color()"
      [content]="content()"
      [customClass]="className()"
      [orientation]="orientation()"
      [position]="position()"
      [responsive]="responsive()"
      [attr.orientation]="orientation()"
      [attr.color]="color()"
      [attr.content]="content()"
      [attr.position]="position()"
      [attr.responsive]="responsive() ? 'true' : 'false'"
    />
  `,
})
export class ModusDividerComponent {
  /** Divider color token. */
  readonly color = input<Components.ModusWcDivider['color'] | undefined>('tertiary');

  /** Optional text content rendered within the divider. */
  readonly content = input<string | undefined>();

  /** CSS class applied to the divider element. */
  readonly className = input<string | undefined>();

  /** Divider orientation for surrounding content. */
  readonly orientation = input<Orientation | undefined>('vertical');

  /** Divider label alignment. */
  readonly position = input<'center' | 'end' | 'start' | undefined>('center');

  /** Enables responsive behavior for small viewports. */
  readonly responsive = input<boolean | undefined>(true);
}
