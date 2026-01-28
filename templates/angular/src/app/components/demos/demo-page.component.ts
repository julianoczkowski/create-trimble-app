import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ModusButtonComponent } from '../modus-button.component';

/**
 * Renders a standard layout for a demo page.
 *
 * Provides a consistent page structure with:
 * - Back button navigation
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
    <div class="flex flex-col gap-6 p-6">
      <div class="flex items-center gap-4">
        <modus-button
          variant="filled"
          color="tertiary"
          size="md"
          icon="arrow_left"
          iconPosition="left"
          (buttonClick)="handleBackClick()"
        >
          Back
        </modus-button>
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-3xl font-semibold text-foreground">{{ title() }}</div>
        <div class="text-base text-foreground-80">{{ description() }}</div>
      </div>
      <div class="flex flex-col gap-6">
        <ng-content />
      </div>
    </div>
  `,
})
export class DemoPageComponent {
  /** The title of the demo page */
  readonly title = input.required<string>();

  /** A description of the demo page */
  readonly description = input.required<string>();

  constructor(private location: Location) {}

  /**
   * Handles the click event for the "Back" button, navigating to the previous page in the browser's history.
   */
  handleBackClick(): void {
    this.location.back();
  }
}
