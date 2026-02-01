import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusModalComponent } from '../../components/modus-modal.component';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Demo page showcasing the Modus Modal component.
 *
 * Demonstrates modal features including:
 * - Centered dialog
 * - Position variants (top, bottom)
 * - Fullscreen modal
 * - Static backdrop
 * - Custom styling
 */
@Component({
  selector: 'app-modal-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusModalComponent,
    ModusButtonComponent,
  ],
  template: `
    <demo-page
      title="Modus Modal"
      description="Modals focus attention on a short, interruptive task. Keep content concise and provide a clear primary action."
    >
      <demo-example
        title="Centered Dialog"
        description="Default centered modal for quick confirmations or lightweight forms."
      >
        <div class="space-y-4">
          <modus-button
            color="primary"
            (buttonClick)="openModal('modal-centered')"
            >Open Centered Modal</modus-button
          >
          <modus-modal
            modalId="modal-centered"
            [showClose]="true"
            [backdrop]="'default'"
            [position]="'center'"
          >
            <div slot="header" class="text-xl font-semibold text-foreground">
              Archive project
            </div>
            <div slot="content" class="text-sm text-foreground-80">
              Archived projects are hidden from your active workspace. You can restore them later
              from the settings panel.
            </div>
            <div slot="footer" class="flex gap-2">
              <modus-button
                variant="borderless"
                (buttonClick)="closeModal('modal-centered')"
                >Cancel</modus-button
              >
              <modus-button
                color="danger"
                (buttonClick)="closeModal('modal-centered')"
                >Archive</modus-button
              >
            </div>
          </modus-modal>
        </div>
      </demo-example>

      <demo-example
        title="Position Variants"
        description="Different vertical positions for various use cases."
      >
        <div class="flex gap-4 flex-wrap">
          <modus-button
            color="primary"
            (buttonClick)="openModal('modal-top')"
            >Top Position</modus-button
          >
          <modus-button
            color="primary"
            (buttonClick)="openModal('modal-bottom')"
            >Bottom Position</modus-button
          >
        </div>

        <modus-modal
          modalId="modal-top"
          [showClose]="true"
          [backdrop]="'default'"
          [position]="'top'"
        >
          <div slot="header" class="text-xl font-semibold text-foreground">Top Modal</div>
          <div slot="content" class="text-sm text-foreground-80">
            This modal appears at the top of the screen. Useful for notifications or quick actions.
          </div>
          <div slot="footer" class="flex gap-2">
            <modus-button
              variant="borderless"
              (buttonClick)="closeModal('modal-top')"
              >Cancel</modus-button
            >
            <modus-button
              (buttonClick)="closeModal('modal-top')"
              >Confirm</modus-button
            >
          </div>
        </modus-modal>

        <modus-modal
          modalId="modal-bottom"
          [showClose]="true"
          [backdrop]="'default'"
          [position]="'bottom'"
        >
          <div slot="header" class="text-xl font-semibold text-foreground">Bottom Modal</div>
          <div slot="content" class="text-sm text-foreground-80">
            This modal appears at the bottom of the screen. Great for mobile interfaces.
          </div>
          <div slot="footer" class="flex gap-2">
            <modus-button
              variant="borderless"
              (buttonClick)="closeModal('modal-bottom')"
              >Cancel</modus-button
            >
            <modus-button
              (buttonClick)="closeModal('modal-bottom')"
              >Confirm</modus-button
            >
          </div>
        </modus-modal>
      </demo-example>

      <demo-example
        title="Fullscreen Modal"
        description="Full-screen modals for complex workflows or detailed content."
      >
        <div class="space-y-4">
          <modus-button
            color="primary"
            (buttonClick)="openModal('modal-fullscreen')"
            >Open Fullscreen Modal</modus-button
          >
          <modus-modal
            modalId="modal-fullscreen"
            [showClose]="true"
            [backdrop]="'default'"
            [fullscreen]="true"
            [showFullscreenToggle]="true"
          >
            <div slot="header" class="text-xl font-semibold text-foreground">
              Fullscreen Modal
            </div>
            <div slot="content" class="space-y-4">
              <div class="text-sm text-foreground-80">
                This is a fullscreen modal that covers the entire viewport. Perfect for complex
                forms or detailed content.
              </div>
              <div class="text-sm text-foreground-80">
                You can toggle between fullscreen and normal size using the button in the header.
              </div>
            </div>
            <div slot="footer" class="flex gap-2">
              <modus-button
                variant="borderless"
                (buttonClick)="closeModal('modal-fullscreen')"
                >Cancel</modus-button
              >
              <modus-button
                (buttonClick)="closeModal('modal-fullscreen')"
                >Save Changes</modus-button
              >
            </div>
          </modus-modal>
        </div>
      </demo-example>

      <demo-example
        title="Static Backdrop"
        description="Modal that doesn't close when clicking outside - user must use explicit actions."
      >
        <div class="space-y-4">
          <modus-button
            color="primary"
            (buttonClick)="openModal('modal-static')"
            >Open Static Modal</modus-button
          >
          <modus-modal
            modalId="modal-static"
            [showClose]="true"
            [backdrop]="'static'"
          >
            <div slot="header" class="text-xl font-semibold text-foreground">
              Important Action
            </div>
            <div slot="content" class="text-sm text-foreground-80">
              This modal has a static backdrop. Clicking outside won't close it - you must use the
              buttons or press Escape.
            </div>
            <div slot="footer" class="flex gap-2">
              <modus-button
                variant="borderless"
                (buttonClick)="closeModal('modal-static')"
                >Cancel</modus-button
              >
              <modus-button
                color="danger"
                (buttonClick)="closeModal('modal-static')"
                >Delete Forever</modus-button
              >
            </div>
          </modus-modal>
        </div>
      </demo-example>

      <demo-example
        title="Custom Styling"
        description="Modal with custom dimensions and styling."
      >
        <div class="space-y-4">
          <modus-button
            color="primary"
            (buttonClick)="openModal('modal-custom')"
            >Open Custom Modal</modus-button
          >
          <modus-modal
            modalId="modal-custom"
            [showClose]="true"
            [backdrop]="'default'"
            [className]="'expanded-modal'"
          >
            <div slot="header" class="text-xl font-semibold text-foreground">
              Custom Size Modal
            </div>
            <div slot="content" class="text-sm text-foreground-80">
              This modal has custom dimensions applied via CSS classes. The modal is wider and
              taller than the default.
            </div>
            <div slot="footer" class="flex gap-2">
              <modus-button
                variant="borderless"
                (buttonClick)="closeModal('modal-custom')"
                >Cancel</modus-button
              >
              <modus-button
                (buttonClick)="closeModal('modal-custom')"
                >Save</modus-button
              >
            </div>
          </modus-modal>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ModalDemoPageComponent {
  /**
   * Opens a modal by finding the dialog element using the modal ID.
   */
  openModal(modalId: string): void {
    const dialog = document.getElementById(modalId) as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  /**
   * Closes a modal by finding the dialog element using the modal ID.
   */
  closeModal(modalId: string): void {
    const dialog = document.getElementById(modalId) as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }
}
