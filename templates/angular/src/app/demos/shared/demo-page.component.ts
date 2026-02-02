import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Renders a standard layout for a demo page.
 *
 * Provides a consistent page structure with:
 * - Optional back button navigation
 * - Page title and description
 * - Content projection for demo examples
 *
 * @example
 * ```html
 * <demo-page title="Button Demo" description="Demonstrates button component features">
 *   <demo-example title="Variants">...</demo-example>
 * </demo-page>
 * ```
 */
@Component({
  selector: 'demo-page',
  standalone: true,
  imports: [CommonModule, ModusButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-6xl mx-auto p-8 bg-background">
      @if (showBackButton()) {
        <div class="flex items-center gap-4 mb-6">
          <modus-button
            variant="filled"
            color="tertiary"
            size="md"
            icon="arrow_left"
            iconPosition="left"
            (buttonClick)="handleBackClick()"
          >
            Component List
          </modus-button>
        </div>
      }
      <div class="text-center mb-12">
        <div class="text-4xl font-semibold mb-4 text-foreground">{{ title() }}</div>
        <div class="text-lg leading-relaxed text-foreground text-center">{{ description() }}</div>
      </div>
      <div class="flex flex-col gap-6">
        <ng-content />
      </div>

      <!-- Footer -->
      <div class="text-center pt-8 box-content">
        <div class="flex items-center justify-center gap-3 mb-3">
          <img
            src="/angular-icon.svg"
            alt="Angular"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </div>
        <div class="text-sm font-mono text-foreground-40">
          2026 Modus Angular App v1.0.0 + Angular 20 + Tailwind CSS -
          Created by Julian Oczkowski
        </div>
      </div>
    </div>
  `,
})
export class DemoPageComponent {
  private router = inject(Router);

  /** The title of the demo page */
  readonly title = input.required<string>();

  /** A description of the demo page */
  readonly description = input.required<string>();

  /** Whether to show the back button (default: true) */
  readonly showBackButton = input<boolean>(true);

  /** Optional URL to navigate to when back button is clicked (defaults to /dev/components) */
  readonly backUrl = input<string>('/dev/components');

  /**
   * Handles the click event for the "Component List" button, navigating to the components gallery.
   * Always navigates to /dev/components instead of using browser history.
   */
  handleBackClick(): void {
    this.router.navigate(['/dev/components']);
  }
}
