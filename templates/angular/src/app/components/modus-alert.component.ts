import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcAlert } from '@trimble-oss/moduswebcomponents-angular';

/**
 * Configuration options for the ModusAlertComponent.
 */
export interface ModusAlertProps {
  /**
   * The title text displayed at the top of the alert.
   */
  alertTitle: string;
  /**
   * Optional description text providing additional context for the alert.
   */
  alertDescription?: string;
  /**
   * Custom CSS class applied to the alert container for advanced styling needs.
   */
  className?: string;
  /**
   * Number of milliseconds before the alert automatically dismisses. When undefined, the alert remains visible.
   */
  delay?: number;
  /**
   * Enables a close button to allow the user to dismiss the alert manually.
   */
  dismissible?: boolean;
  /**
   * The Modus icon name rendered alongside the alert content.
   */
  icon?: string;
  /**
   * Visual variant that controls the alert color and semantics.
   */
  variant?: 'error' | 'info' | 'success' | 'warning';
  /**
   * ARIA role for the alert element.
   */
  role?: 'alert' | 'log' | 'marquee' | 'status' | 'timer';
  /**
   * Accessible label describing the purpose of the alert when no visible text is provided.
   */
  ariaLabel?: string;
  /**
   * Callback executed after the alert dispatches its dismiss event.
   */
  onDismiss?: () => void;
}

/**
 * Angular wrapper for the Modus Web Component alert.
 *
 * This component exposes a typed, signal-based API that mirrors the Stencil component while
 * providing a familiar Angular template syntax. Consumers can declaratively control the alert
 * content, attach to dismiss events, and project arbitrary HTML via the default slot.
 *
 * @example
 * ```html
 * <modus-alert
 *   alertTitle="Changes saved"
 *   alertDescription="Updates were applied successfully."
 *   variant="success"
 *   dismissible
 *   (dismiss)="handleDismiss()"
 * />
 * ```
 */
@Component({
  selector: 'modus-alert',
  imports: [CommonModule, ModusWcAlert],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-alert
      [alertTitle]="alertTitle()"
      [alertDescription]="alertDescription()"
      [customClass]="className()"
      [delay]="delay()"
      [dismissible]="dismissible()"
      [icon]="icon()"
      [variant]="variant()"
      [attr.role]="role()"
      [attr.aria-label]="ariaLabel()"
      (dismissClick)="handleDismissClick()"
    >
      <ng-content select="[slot='content']" slot="content" />
      <ng-content select="[slot='button']" slot="button" />
    </modus-wc-alert>
  `,
})
export class ModusAlertComponent {
  /** The title text displayed at the top of the alert. */
  readonly alertTitle = input.required<string>();

  /** Optional description text providing additional context for the alert. */
  readonly alertDescription = input<string | undefined>();

  /** Custom CSS class applied to the alert container for advanced styling needs. */
  readonly className = input<string | undefined>();

  /** Number of milliseconds before the alert automatically dismisses. */
  readonly delay = input<number | undefined>();

  /** Enables a close button to allow the user to dismiss the alert manually. */
  readonly dismissible = input<boolean>(false);

  /** The Modus icon name rendered alongside the alert content. */
  readonly icon = input<string | undefined>();

  /** Visual variant that controls the alert color and semantics. */
  readonly variant = input<'error' | 'info' | 'success' | 'warning'>('info');

  /** ARIA role for the alert element. */
  readonly role = input<'alert' | 'log' | 'marquee' | 'status' | 'timer' | undefined>();

  /** Accessible label describing the purpose of the alert when no visible text is provided. */
  readonly ariaLabel = input<string | undefined>();

  /** Callback executed after the alert dispatches its dismiss event. */
  readonly onDismiss = input<(() => void) | undefined>();

  /** Notifies consumers when the alert is dismissed. */
  readonly dismiss = output<void>();

  /** Handles the dismiss event emitted by the Modus Web Component. */
  handleDismissClick(): void {
    const callback = this.onDismiss();
    if (callback) {
      callback();
    }
    this.dismiss.emit();
  }
}
