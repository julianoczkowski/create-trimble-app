import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Renders a clean, unstyled container for a demo example.
 *
 * Similar to DemoExampleComponent but with a cleaner background style
 * using dashed borders instead of solid card background.
 * Used primarily on the landing page for feature cards.
 *
 * @example
 * ```html
 * <demo-example-clean title="Modern Stack" description="Built with Angular 20">
 *   <div>Feature content here</div>
 * </demo-example-clean>
 * ```
 */
@Component({
  selector: 'demo-example-clean',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4 rounded-lg bg-background p-6 border-dashed">
      <div class="flex flex-col gap-1">
        <div class="text-lg font-medium text-foreground">{{ title() }}</div>
        <div class="text-sm text-foreground opacity-80">{{ description() }}</div>
      </div>
      <div class="flex flex-col gap-4">
        <ng-content />
      </div>
    </div>
  `,
})
export class DemoExampleCleanComponent {
  /** The title of the demo example */
  readonly title = input.required<string>();

  /** A description of the demo example */
  readonly description = input<string>('');
}
