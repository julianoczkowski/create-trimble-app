import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Renders a styled container for a demo example.
 *
 * Provides a card-based container with:
 * - Title and description
 * - Content projection for example content
 * - Consistent styling using design system colors
 *
 * @example
 * ```html
 * <demo-example title="Button Variants" description="Different button styles">
 *   <modus-button>Primary</modus-button>
 * </demo-example>
 * ```
 */
@Component({
  selector: 'demo-example',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4 rounded-lg p-6 border-default border-1px">
      <div class="flex flex-col gap-1">
        <div class="text-lg font-medium text-foreground">{{ title() }}</div>
        <div class="text-sm text-foreground-80">{{ description() }}</div>
      </div>
      <div class="flex flex-col gap-4">
        <ng-content />
      </div>
    </div>
  `,
})
export class DemoExampleComponent {
  /** The title of the demo example */
  readonly title = input.required<string>();

  /** A description of the demo example */
  readonly description = input<string>('');
}
