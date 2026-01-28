import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcUtilityPanel } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusUtilityPanelComponent}.
 */
export interface ModusUtilityPanelProps {
  /** Whether the panel is expanded. */
  expanded?: Components.ModusWcUtilityPanel['expanded'];
  /** Determines if the panel pushes content or displays an overlay. */
  pushContent?: Components.ModusWcUtilityPanel['pushContent'];
  /** Target element reference to push content when panel opens. */
  targetElement?: Components.ModusWcUtilityPanel['targetElement'];
}

/**
 * Angular wrapper for the Modus utility panel web component.
 *
 * The utility panel supports projecting content into header, body, and footer slots.
 *
 * @example
 * ```html
 * <modus-utility-panel [expanded]="panelOpen()" (panelOpened)="handleOpen()">
 *   <div slot="header">Header Content</div>
 *   <div slot="body">Body Content</div>
 *   <div slot="footer">Footer Content</div>
 * </modus-utility-panel>
 * ```
 */
@Component({
  selector: 'modus-utility-panel',
  imports: [CommonModule, ModusWcUtilityPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-utility-panel
      [expanded]="expanded()"
      [pushContent]="pushContent()"
      [targetElement]="targetElement()"
      (panelOpened)="handlePanelOpened()"
      (panelClosed)="handlePanelClosed()"
    >
      <ng-content select="[slot='header']" slot="header" />
      <ng-content select="[slot='body']" slot="body" />
      <ng-content select="[slot='footer']" slot="footer" />
    </modus-wc-utility-panel>
  `,
})
export class ModusUtilityPanelComponent {
  /** Whether the panel is expanded. */
  readonly expanded = input<boolean>(false);

  /** Determines if the panel pushes content or displays an overlay. */
  readonly pushContent = input<boolean>(false);

  /** Target element reference to push content when panel opens. */
  readonly targetElement = input<HTMLElement | undefined>();

  /** Emits when the panel is opened. */
  readonly panelOpened = output<void>();

  /** Emits when the panel is closed. */
  readonly panelClosed = output<void>();

  /** Handles panel opened event. */
  handlePanelOpened(): void {
    this.panelOpened.emit();
  }

  /** Handles panel closed event. */
  handlePanelClosed(): void {
    this.panelClosed.emit();
  }
}
