import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcAvatar } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, DaisySize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusAvatarComponent}.
 */
export interface ModusAvatarProps {
  /** Accessible description for the avatar image or initials. */
  alt: Components.ModusWcAvatar['alt'];
  /** Optional CSS class applied to the host element. */
  className?: Components.ModusWcAvatar['customClass'];
  /** Optional image source displayed inside the avatar. */
  imgSrc?: Components.ModusWcAvatar['imgSrc'];
  /** Initials displayed when no image source is provided. */
  initials?: Components.ModusWcAvatar['initials'];
  /** Shape of the avatar container. */
  shape?: Components.ModusWcAvatar['shape'];
  /** Size token applied to the avatar. */
  size?: DaisySize;
}

/**
 * Angular wrapper for the Modus avatar web component.
 *
 * The avatar supports projecting arbitrary content and can display an image or initials.
 * Use the `shape` and `size` inputs to control the appearance.
 *
 * @example
 * ```html
 * <modus-avatar
 *   alt="Ada Lovelace"
 *   imgSrc="/assets/ada.png"
 *   shape="circle"
 *   size="lg"
 * />
 * ```
 */
@Component({
  selector: 'modus-avatar',
  imports: [CommonModule, ModusWcAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-avatar
      [alt]="alt()"
      [customClass]="className()"
      [imgSrc]="imgSrc()"
      [initials]="initials()"
      [shape]="shape()"
      [size]="size()"
    >
      <ng-content />
    </modus-wc-avatar>
  `,
})
export class ModusAvatarComponent {
  /** Accessible description for the avatar image or initials. */
  readonly alt = input.required<string>();

  /** Optional CSS class applied to the host element. */
  readonly className = input<string | undefined>();

  /** Optional image source displayed inside the avatar. */
  readonly imgSrc = input<string>('');

  /** Initials displayed when no image source is provided. */
  readonly initials = input<string>('');

  /** Shape of the avatar container. */
  readonly shape = input<'circle' | 'square'>('circle');

  /** Size token applied to the avatar. */
  readonly size = input<DaisySize>('md');
}
