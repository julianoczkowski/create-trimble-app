import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcModal } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusModalComponent}.
 */
export interface ModusModalProps {
  /** Modal backdrop behavior. */
  backdrop?: Components.ModusWcModal['backdrop'];
  /** Custom CSS class applied to the modal container. */
  className?: Components.ModusWcModal['customClass'];
  /** Renders the modal fullscreen. */
  fullscreen?: Components.ModusWcModal['fullscreen'];
  /** Required identifier applied to the underlying dialog element. */
  modalId: Components.ModusWcModal['modalId'];
  /** Vertical positioning of the modal. */
  position?: Components.ModusWcModal['position'];
  /** Toggles the close button in the header. */
  showClose?: Components.ModusWcModal['showClose'];
  /** Toggles the fullscreen icon button. */
  showFullscreenToggle?: Components.ModusWcModal['showFullscreenToggle'];
}

/**
 * Angular wrapper for the Modus modal web component.
 */
@Component({
  selector: 'modus-modal',
  imports: [CommonModule, ModusWcModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-modal
      [backdrop]="backdrop()"
      [customClass]="className()"
      [fullscreen]="fullscreen()"
      [modalId]="modalId()"
      [position]="position()"
      [showClose]="showClose()"
      [showFullscreenToggle]="showFullscreenToggle()"
    >
      <ng-content select="[slot='header']" slot="header" />
      <ng-content select="[slot='content']" slot="content" />
      <ng-content select="[slot='footer']" slot="footer" />
    </modus-wc-modal>
  `,
})
export class ModusModalComponent {
  /** Modal backdrop behavior. */
  readonly backdrop = input<'default' | 'static' | undefined>('default');

  /** Custom CSS class applied to the modal container. */
  readonly className = input<string | undefined>();

  /** Renders the modal fullscreen. */
  readonly fullscreen = input<boolean | undefined>(false);

  /** Required identifier applied to the underlying dialog element. */
  readonly modalId = input.required<string>();

  /** Vertical positioning of the modal. */
  readonly position = input<'bottom' | 'center' | 'top' | undefined>('center');

  /** Toggles the close button in the header. */
  readonly showClose = input<boolean | undefined>(true);

  /** Toggles the fullscreen icon button. */
  readonly showFullscreenToggle = input<boolean | undefined>(false);
}
