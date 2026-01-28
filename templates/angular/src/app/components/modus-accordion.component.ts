import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcAccordion } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusAccordionComponent}.
 */
export interface ModusAccordionProps {
  /** Custom CSS class applied to the accordion element. */
  className?: Components.ModusWcAccordion['customClass'];
}

/**
 * Angular wrapper for the Modus accordion web component.
 *
 * The accordion supports projecting `<modus-collapse>` elements as children.
 * See the collapse component documentation for additional information.
 *
 * @example
 * ```html
 * <modus-accordion>
 *   <modus-collapse [options]="collapseOptions[0]">
 *     <div slot="content">Collapse content</div>
 *   </modus-collapse>
 * </modus-accordion>
 * ```
 */
@Component({
  selector: 'modus-accordion',
  imports: [CommonModule, ModusWcAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-accordion [customClass]="className()" (expandedChange)="handleExpandedChange($event)">
      <ng-content />
    </modus-wc-accordion>
  `,
})
export class ModusAccordionComponent {
  /** Custom CSS class applied to the accordion element. */
  readonly className = input<string | undefined>();

  /** Emits when a collapse expanded state is changed. */
  readonly expandedChange = output<{ expanded: boolean; index: number }>();

  /** Handles expanded change events from the Modus Accordion Web Component. */
  handleExpandedChange(event: CustomEvent<{ expanded: boolean; index: number }>): void {
    this.expandedChange.emit(event.detail);
  }
}
