import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTooltip } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusTooltipComponent}.
 */
export interface ModusTooltipProps {
  /** The text content of the tooltip. */
  content?: Components.ModusWcTooltip['content'];
  /** Custom CSS class applied to the tooltip element. */
  className?: Components.ModusWcTooltip['customClass'];
  /** Disables displaying the tooltip on hover. */
  disabled?: Components.ModusWcTooltip['disabled'];
  /** Use this attribute to force the tooltip to remain open. */
  forceOpen?: Components.ModusWcTooltip['forceOpen'];
  /** The ID of the tooltip element. */
  tooltipId?: Components.ModusWcTooltip['tooltipId'];
  /** The position that the tooltip will render in relation to the element. */
  position?: Components.ModusWcTooltip['position'];
}

/**
 * Angular wrapper for the Modus tooltip web component.
 *
 * The tooltip can be dismissed by pressing the Escape key when hovering over it.
 * When forceOpen is enabled, the tooltip will remain open and can only be closed
 * by setting forceOpen to false.
 *
 * @example
 * ```html
 * <modus-tooltip content="This is a tooltip" position="top">
 *   <button>Hover me</button>
 * </modus-tooltip>
 * ```
 */
@Component({
  selector: 'modus-tooltip',
  imports: [CommonModule, ModusWcTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-tooltip
      [content]="content()"
      [customClass]="className()"
      [disabled]="disabled()"
      [forceOpen]="forceOpen()"
      [tooltipId]="tooltipId()"
      [position]="position()"
      (dismissEscape)="handleDismissEscape()"
    >
      <ng-content />
    </modus-wc-tooltip>
  `,
})
export class ModusTooltipComponent {
  /** The text content of the tooltip. */
  readonly content = input<string>('');

  /** Custom CSS class applied to the tooltip element. */
  readonly className = input<string | undefined>();

  /** Disables displaying the tooltip on hover. */
  readonly disabled = input<boolean | undefined>(false);

  /** Use this attribute to force the tooltip to remain open. */
  readonly forceOpen = input<boolean | undefined>();

  /** The ID of the tooltip element. */
  readonly tooltipId = input<string | undefined>();

  /** The position that the tooltip will render in relation to the element. */
  readonly position = input<'auto' | 'top' | 'right' | 'bottom' | 'left' | undefined>('auto');

  /** Emits when the tooltip is dismissed via Escape key. */
  readonly dismissEscape = output<void>();

  /** Handles tooltip dismissal via Escape key. */
  handleDismissEscape(): void {
    this.dismissEscape.emit();
  }
}

