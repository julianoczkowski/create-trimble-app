import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusModalComponent } from '../modus-modal.component';
import { ModusButtonComponent } from '../modus-button.component';
import { ModusDividerComponent } from '../modus-divider.component';

/**
 * Demo page showcasing the Modus Modal component.
 *
 * Demonstrates modal features including:
 * - Basic modal
 * - Modal with header, content, and footer
 * - Modal positions
 * - Fullscreen modal
 * - Modal backdrop options
 * - Interactive modal examples
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
    ModusDividerComponent,
  ],
  template: `
    <demo-page
      title="Modus Modal"
      description="Modals provide focused interactions by overlaying content on top of the current page. Use modals for confirmations, forms, or detailed views that require user attention."
    >
      <demo-example
        title="Basic Modal"
        description="Simple modal with header, content, and footer slots."
      >
        <modus-button color="primary" (buttonClick)="openBasicModal()">Open Basic Modal</modus-button>
        <modus-modal modalId="basic-modal" [showClose]="true">
          <h3 slot="header" class="text-xl font-semibold text-foreground">Basic Modal</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">
              This is a basic modal with header, content, and footer sections.
            </p>
            <p class="text-sm text-muted-foreground">
              You can add any content here, including form inputs, buttons, and other components.
            </p>
          </div>
          <div slot="footer" class="flex gap-4">
            <modus-button color="secondary" (buttonClick)="closeBasicModal()">Cancel</modus-button>
            <modus-button color="primary" (buttonClick)="closeBasicModal()">Confirm</modus-button>
          </div>
        </modus-modal>
      </demo-example>

      <demo-example
        title="Modal Positions"
        description="Modals can be positioned at top, center (default), or bottom of the screen."
      >
        <div class="flex flex-wrap gap-4">
          <modus-button color="primary" (buttonClick)="openTopModal()">Open Top Modal</modus-button>
          <modus-button color="primary" (buttonClick)="openCenterModal()">Open Center Modal</modus-button>
          <modus-button color="primary" (buttonClick)="openBottomModal()">Open Bottom Modal</modus-button>
        </div>

        <modus-modal modalId="top-modal" [position]="'top'" [showClose]="true">
          <h3 slot="header" class="text-xl font-semibold text-foreground">Top Position Modal</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">This modal is positioned at the top of the screen.</p>
          </div>
          <div slot="footer">
            <modus-button color="secondary" (buttonClick)="closeTopModal()">Close</modus-button>
          </div>
        </modus-modal>

        <modus-modal modalId="center-modal" [position]="'center'" [showClose]="true">
          <h3 slot="header" class="text-xl font-semibold text-foreground">Center Position Modal</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">This modal is positioned at the center (default).</p>
          </div>
          <div slot="footer">
            <modus-button color="secondary" (buttonClick)="closeCenterModal()">Close</modus-button>
          </div>
        </modus-modal>

        <modus-modal modalId="bottom-modal" [position]="'bottom'" [showClose]="true">
          <h3 slot="header" class="text-xl font-semibold text-foreground">Bottom Position Modal</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">This modal is positioned at the bottom of the screen.</p>
          </div>
          <div slot="footer">
            <modus-button color="secondary" (buttonClick)="closeBottomModal()">Close</modus-button>
          </div>
        </modus-modal>
      </demo-example>

      <demo-example
        title="Fullscreen Modal"
        description="Modal with fullscreen toggle option."
      >
        <modus-button color="primary" (buttonClick)="openFullscreenModal()">Open Fullscreen Modal</modus-button>
        <modus-modal
          modalId="fullscreen-modal"
          [showFullscreenToggle]="true"
          [showClose]="true"
          backdrop="default"
        >
          <h3 slot="header" class="text-xl font-semibold text-foreground">Fullscreen Modal</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">
              This modal has a fullscreen toggle button in the header.
            </p>
            <p class="text-sm text-muted-foreground">
              Click the fullscreen icon to toggle between normal and fullscreen mode.
            </p>
            <modus-divider [orientation]="'horizontal'" />
            <p class="text-base text-foreground">
              Fullscreen modals are useful for forms, detailed views, or content that requires maximum
              screen space.
            </p>
          </div>
          <div slot="footer" class="flex gap-4">
            <modus-button color="secondary" (buttonClick)="closeFullscreenModal()">Cancel</modus-button>
            <modus-button color="primary" (buttonClick)="closeFullscreenModal()">Save</modus-button>
          </div>
        </modus-modal>
      </demo-example>

      <demo-example
        title="Modal Backdrop Options"
        description="Different backdrop behaviors: default (dismissible) and static (non-dismissible)."
      >
        <div class="flex flex-wrap gap-4">
          <modus-button color="primary" (buttonClick)="openDefaultBackdropModal()"
            >Default Backdrop</modus-button
          >
          <modus-button color="primary" (buttonClick)="openStaticBackdropModal()"
            >Static Backdrop</modus-button
          >
        </div>

        <modus-modal modalId="default-backdrop-modal" [backdrop]="'default'" [showClose]="true">
          <h3 slot="header" class="text-xl font-semibold text-foreground">Default Backdrop</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">
              Click outside the modal or press ESC to close (default behavior).
            </p>
          </div>
          <div slot="footer">
            <modus-button color="secondary" (buttonClick)="closeDefaultBackdropModal()">Close</modus-button>
          </div>
        </modus-modal>

        <modus-modal modalId="static-backdrop-modal" [backdrop]="'static'" [showClose]="true">
          <h3 slot="header" class="text-xl font-semibold text-foreground">Static Backdrop</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">
              This modal cannot be closed by clicking outside. You must use the close button.
            </p>
          </div>
          <div slot="footer">
            <modus-button color="secondary" (buttonClick)="closeStaticBackdropModal()">Close</modus-button>
          </div>
        </modus-modal>
      </demo-example>

      <demo-example
        title="Confirmation Modal"
        description="Example of a confirmation modal for destructive actions."
      >
        <modus-button color="danger" (buttonClick)="openConfirmationModal()">Delete Item</modus-button>
        <modus-modal modalId="confirmation-modal" [showClose]="true" backdrop="static">
          <h3 slot="header" class="text-xl font-semibold text-destructive">Confirm Deletion</h3>
          <div slot="content" class="flex flex-col gap-4">
            <p class="text-base text-foreground">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
          <div slot="footer" class="flex gap-4">
            <modus-button color="secondary" (buttonClick)="closeConfirmationModal()">Cancel</modus-button>
            <modus-button color="danger" (buttonClick)="handleDelete()">Delete</modus-button>
          </div>
        </modus-modal>
      </demo-example>
    </demo-page>
  `,
})
export class ModalDemoPageComponent {
  openBasicModal(): void {
    const dialog = document.getElementById('basic-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeBasicModal(): void {
    const dialog = document.getElementById('basic-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openTopModal(): void {
    const dialog = document.getElementById('top-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeTopModal(): void {
    const dialog = document.getElementById('top-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openCenterModal(): void {
    const dialog = document.getElementById('center-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeCenterModal(): void {
    const dialog = document.getElementById('center-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openBottomModal(): void {
    const dialog = document.getElementById('bottom-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeBottomModal(): void {
    const dialog = document.getElementById('bottom-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openFullscreenModal(): void {
    const dialog = document.getElementById('fullscreen-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeFullscreenModal(): void {
    const dialog = document.getElementById('fullscreen-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openDefaultBackdropModal(): void {
    const dialog = document.getElementById('default-backdrop-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeDefaultBackdropModal(): void {
    const dialog = document.getElementById('default-backdrop-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openStaticBackdropModal(): void {
    const dialog = document.getElementById('static-backdrop-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeStaticBackdropModal(): void {
    const dialog = document.getElementById('static-backdrop-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  openConfirmationModal(): void {
    const dialog = document.getElementById('confirmation-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  closeConfirmationModal(): void {
    const dialog = document.getElementById('confirmation-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }

  handleDelete(): void {
    alert('Item deleted!');
    this.closeConfirmationModal();
  }
}
