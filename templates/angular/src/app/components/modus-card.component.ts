import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcCard } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusCardComponent}.
 */
export interface ModusCardProps {
  /** Applies background coverage to figures provided in the header slot. */
  backgroundFigure?: Components.ModusWcCard['backgroundFigure'];
  /** Enables the bordered card style. */
  bordered?: Components.ModusWcCard['bordered'];
  /** Optional CSS class applied to the card. */
  className?: Components.ModusWcCard['customClass'];
  /** Layout orientation for the card content. */
  layout?: Components.ModusWcCard['layout'];
  /** Controls the internal padding density. */
  padding?: Components.ModusWcCard['padding'];
}

/**
 * Angular wrapper for the Modus card web component.
 *
 * Cards provide a flexible container for grouping related content with optional
 * header and footer slots.
 *
 * @example
 * ```html
 * <modus-card layout="vertical" padding="normal">
 *   <h3 slot="header">Project Overview</h3>
 *   <p>Important summary information lives here.</p>
 *   <div slot="footer">Updated 5 minutes ago</div>
 * </modus-card>
 * ```
 */
@Component({
  selector: 'modus-card',
  imports: [CommonModule, ModusWcCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-card
      [backgroundFigure]="backgroundFigure()"
      [bordered]="bordered()"
      [customClass]="className()"
      [layout]="layout()"
      [padding]="padding()"
    >
      <ng-content select="[slot='header']" slot="header" />
      <ng-content select="[slot='title']" slot="title" />
      <ng-content select="[slot='subtitle']" slot="subtitle" />
      <ng-content />
      <ng-content select="[slot='actions']" slot="actions" />
      <ng-content select="[slot='footer']" slot="footer" />
    </modus-wc-card>
  `,
})
export class ModusCardComponent {
  /** Applies background coverage to figures provided in the header slot. */
  readonly backgroundFigure = input<boolean | undefined>();

  /** Enables the bordered card style. */
  readonly bordered = input<boolean | undefined>();

  /** Optional CSS class applied to the card. */
  readonly className = input<string | undefined>();

  /** Layout orientation for the card content. */
  readonly layout = input<'vertical' | 'horizontal' | undefined>('vertical');

  /** Controls the internal padding density. */
  readonly padding = input<'normal' | 'compact' | undefined>('normal');
}
