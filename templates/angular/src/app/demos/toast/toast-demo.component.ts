import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusToastComponent, type ToastPosition } from '../../components/modus-toast.component';
import { ModusButtonComponent } from '../../components/modus-button.component';
import { ModusAlertComponent } from '../../components/modus-alert.component';

/**
 * Toast variant types for styling.
 */
export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

/**
 * Interface for a toast item in the toasts array.
 */
export interface ToastItem {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
  dismissible: boolean;
  position: ToastPosition;
  delay: number | null;
}

/**
 * Demo page showcasing the Modus Toast component.
 *
 * Demonstrates toast features including:
 * - Toast variants (success, warning, error, info)
 * - Toast positions (9 positions grouped by vertical position)
 * - Special features (clear all)
 * - Interactive examples
 */
@Component({
  selector: 'app-toast-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusToastComponent,
    ModusButtonComponent,
    ModusAlertComponent,
  ],
  template: `
    <demo-page
      title="Modus Toast"
      description="Toasts deliver lightweight confirmations or alerts without disrupting workflow. Keep the message brief and allow dismissal."
    >
      <demo-example
        title="Interactive Toast Triggers"
        description="Click the buttons below to trigger different toasts in various positions and variants."
      >
        <div class="space-y-6">
          <!-- Toast Variants -->
          <div>
            <div class="text-lg font-semibold text-foreground mb-4">Toast Variants</div>
            <div class="flex flex-wrap gap-3">
              <modus-button
                color="primary"
                variant="filled"
                (buttonClick)="
                  addToast('success', 'top-end', 'Success!', 'Your action completed successfully.')
                "
              >
                Success Toast
              </modus-button>
              <modus-button
                color="warning"
                variant="filled"
                (buttonClick)="
                  addToast('warning', 'top-end', 'Warning!', 'Please review your input.')
                "
              >
                Warning Toast
              </modus-button>
              <modus-button
                color="danger"
                variant="filled"
                (buttonClick)="addToast('error', 'top-end', 'Error!', 'Something went wrong.')"
              >
                Error Toast
              </modus-button>
              <modus-button
                color="secondary"
                variant="filled"
                (buttonClick)="
                  addToast('info', 'top-end', 'Info', 'Here\\'s some helpful information.')
                "
              >
                Info Toast
              </modus-button>
            </div>
          </div>

          <!-- Toast Positions -->
          <div>
            <div class="text-lg font-semibold text-foreground mb-4">Toast Positions</div>
            <div class="space-y-4">
              <!-- Top Positions -->
              <div class="bg-card border-default rounded-lg p-4">
                <div class="text-sm font-medium text-muted-foreground mb-3">Top</div>
                <div class="flex flex-wrap gap-3">
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('info', 'top-start', 'Top Start', 'Toast in top-left corner')
                    "
                  >
                    Top Start
                  </modus-button>
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="addToast('info', 'top-center', 'Top Center', 'Toast in top-center')"
                  >
                    Top Center
                  </modus-button>
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="addToast('info', 'top-end', 'Top End', 'Toast in top-right corner')"
                  >
                    Top End
                  </modus-button>
                </div>
              </div>

              <!-- Middle Positions -->
              <div class="bg-card border-default rounded-lg p-4">
                <div class="text-sm font-medium text-muted-foreground mb-3">Middle</div>
                <div class="flex flex-wrap gap-3">
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('success', 'middle-start', 'Middle Start', 'Toast in middle-left')
                    "
                  >
                    Middle Start
                  </modus-button>
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('success', 'middle-center', 'Middle Center', 'Toast in center')
                    "
                  >
                    Middle Center
                  </modus-button>
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('success', 'middle-end', 'Middle End', 'Toast in middle-right')
                    "
                  >
                    Middle End
                  </modus-button>
                </div>
              </div>

              <!-- Bottom Positions -->
              <div class="bg-card border-default rounded-lg p-4">
                <div class="text-sm font-medium text-muted-foreground mb-3">Bottom</div>
                <div class="flex flex-wrap gap-3">
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('warning', 'bottom-start', 'Bottom Start', 'Toast in bottom-left')
                    "
                  >
                    Bottom Start
                  </modus-button>
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('warning', 'bottom-center', 'Bottom Center', 'Toast in bottom-center')
                    "
                  >
                    Bottom Center
                  </modus-button>
                  <modus-button
                    color="secondary"
                    variant="outlined"
                    (buttonClick)="
                      addToast('warning', 'bottom-end', 'Bottom End', 'Toast in bottom-right')
                    "
                  >
                    Bottom End
                  </modus-button>
                </div>
              </div>
            </div>
          </div>

          <!-- Special Features -->
          <div>
            <div class="text-lg font-semibold text-foreground mb-4">Special Features</div>
            <div class="flex flex-wrap gap-3">
              <modus-button color="danger" variant="outlined" (buttonClick)="clearAllToasts()">
                Clear All Toasts
              </modus-button>
            </div>
          </div>

          <!-- Toast Display -->
          @for (toast of toasts(); track toast.id) {
            <modus-toast [position]="toast.position" [delay]="toast.delay ?? undefined">
              <modus-alert
                [alertTitle]="toast.title"
                [alertDescription]="toast.description"
                [variant]="toast.variant"
                [dismissible]="toast.dismissible"
                (dismiss)="removeToast(toast.id)"
              />
            </modus-toast>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ToastDemoPageComponent {
  readonly toasts = signal<ToastItem[]>([]);

  addToast(
    variant: ToastVariant,
    position: ToastPosition = 'top-end',
    title: string,
    description: string,
  ): void {
    const id = `toast-${variant}-${Date.now()}`;
    const newToast: ToastItem = {
      id,
      title,
      description,
      variant,
      dismissible: true,
      position,
      delay: variant === 'warning' ? null : 4000,
    };
    this.toasts.update((prev) => [...prev, newToast]);
  }

  removeToast(toastId: string): void {
    this.toasts.update((prev) => prev.filter((toast) => toast.id !== toastId));
  }

  clearAllToasts(): void {
    this.toasts.set([]);
  }
}
