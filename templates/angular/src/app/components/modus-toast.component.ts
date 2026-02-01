import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcToast } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Toast position in the parent container.
 */
export type ToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

/**
 * Props supported by the {@link ModusToastComponent}.
 */
export interface ModusToastProps {
  /** Custom CSS class applied to the toast element. */
  className?: Components.ModusWcToast['customClass'];
  /** Time taken to dismiss the toast in milliseconds. */
  delay?: Components.ModusWcToast['delay'];
  /** The position of the toast in the parent container. */
  position?: ToastPosition;
}

/**
 * Angular wrapper for the Modus toast web component.
 *
 * The toast component supports projecting arbitrary content inside the toast slot.
 *
 * @example
 * ```html
 * <modus-toast position="top-end" [delay]="5000">
 *   <div>Toast message content</div>
 * </modus-toast>
 * ```
 */
@Component({
  selector: 'modus-toast',
  imports: [CommonModule, ModusWcToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-toast [customClass]="className()" [delay]="delay()" [position]="position()">
      <ng-content />
    </modus-wc-toast>
  `,
})
export class ModusToastComponent {
  /** Custom CSS class applied to the toast element. */
  readonly className = input<string | undefined>();

  /** Time taken to dismiss the toast in milliseconds. */
  readonly delay = input<number | undefined>();

  /** The position of the toast in the parent container. */
  readonly position = input<ToastPosition | undefined>('top-end');
}
