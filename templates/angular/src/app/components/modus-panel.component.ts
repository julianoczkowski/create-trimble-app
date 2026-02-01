import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcPanel } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusPanelComponent}.
 */
export interface ModusPanelProps {
  /** Custom CSS class applied to the panel. */
  className?: Components.ModusWcPanel['customClass'];
  /** Panel width (any valid CSS width value). */
  width?: Components.ModusWcPanel['width'];
  /** Panel height (any valid CSS height value). */
  height?: Components.ModusWcPanel['height'];
  /** Enable floating mode with elevated shadow. */
  floating?: Components.ModusWcPanel['floating'];
  /** Accessible label for the panel. */
  ariaLabel?: string;
}

/**
 * Angular wrapper for the Modus panel web component.
 */
@Component({
  selector: 'modus-panel',
  imports: [CommonModule, ModusWcPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-panel
      [customClass]="className()"
      [width]="width()"
      [height]="height()"
      [floating]="floating()"
      [attr.aria-label]="ariaLabel()"
    >
      <ng-content select="[slot='header']" slot="header" />
      <div slot="body" class="w-full">
        <ng-content select="[slot='body']" />
        <ng-content />
      </div>
      <ng-content select="[slot='footer']" slot="footer" />
    </modus-wc-panel>
  `,
})
export class ModusPanelComponent {
  /** Custom CSS class applied to the panel. */
  readonly className = input<string | undefined>();

  /** Panel width (any valid CSS width value). */
  readonly width = input<Components.ModusWcPanel['width'] | undefined>('350px');

  /** Panel height (any valid CSS height value). */
  readonly height = input<Components.ModusWcPanel['height'] | undefined>('700px');

  /** Enable floating mode with elevated shadow. */
  readonly floating = input<Components.ModusWcPanel['floating'] | undefined>(false);

  /** Accessible label for the panel. */
  readonly ariaLabel = input<string | undefined>();
}
