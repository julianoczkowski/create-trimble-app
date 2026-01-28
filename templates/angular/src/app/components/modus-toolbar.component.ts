import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcToolbar } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusToolbarComponent}.
 */
export interface ModusToolbarProps {
  /** Custom CSS class applied to the toolbar element. */
  className?: Components.ModusWcToolbar['customClass'];
}

/**
 * Angular wrapper for the Modus toolbar web component.
 *
 * Used to organize content across the entire page with start, center, and end slots.
 *
 * @example
 * ```html
 * <modus-toolbar>
 *   <button slot="start">Start</button>
 *   <div slot="center">Center Content</div>
 *   <button slot="end">End</button>
 * </modus-toolbar>
 * ```
 */
@Component({
  selector: 'modus-toolbar',
  imports: [CommonModule, ModusWcToolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-toolbar [customClass]="className()">
      <ng-content select="[slot='start']" slot="start" />
      <ng-content select="[slot='center']" slot="center" />
      <ng-content select="[slot='end']" slot="end" />
    </modus-wc-toolbar>
  `,
})
export class ModusToolbarComponent {
  /** Custom CSS class applied to the toolbar element. */
  readonly className = input<string | undefined>();
}
