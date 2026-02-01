import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcCollapse } from '@trimble-oss/moduswebcomponents-angular';

/**
 * Collapse size variant
 */
export type CollapseSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Collapse options interface for configuring the collapse header
 */
export interface ICollapseOptions {
  /** The title to render in the collapse header */
  title: string;
  /** The description to render in the collapse header */
  description?: string;
  /** The Modus icon name to render in the collapse header */
  icon?: string;
  /** The icon's aria-label */
  iconAriaLabel?: string;
  /** The size of the collapse header */
  size?: CollapseSize;
}

/**
 * Props for the ModusCollapse component
 */
export interface ModusCollapseProps {
  /** Indicates that the component should have a border */
  bordered?: boolean;
  /** Custom CSS class to apply to the outer div */
  className?: string;
  /** Controls whether the collapse is expanded or not */
  expanded?: boolean;
  /** A unique identifier used to set the id attributes of various elements */
  collapseId?: string;
  /** Configuration options for rendering the pre-laid out collapse component */
  options?: ICollapseOptions;
}

/**
 * Renders a Modus collapse component for showing and hiding content.
 *
 * The collapse component supports two slots:
 * - `header` slot: For custom header content (when options is not set)
 * - `content` slot: For the collapsible content
 *
 * @example
 * ```html
 * <!-- Basic collapse with options -->
 * <modus-collapse [options]="collapseOptions">
 *   <div slot="content">Collapse content</div>
 * </modus-collapse>
 * ```
 *
 * @example
 * ```html
 * <!-- Custom header collapse -->
 * <modus-collapse>
 *   <div slot="header">Custom Header</div>
 *   <div slot="content">Collapse content</div>
 * </modus-collapse>
 * ```
 */
@Component({
  selector: 'modus-collapse',
  standalone: true,
  imports: [CommonModule, ModusWcCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-collapse
      [bordered]="bordered()"
      [customClass]="className()"
      [expanded]="expanded()"
      [collapseId]="collapseId()"
      [options]="options()"
      [attr.aria-label]="ariaLabel()"
      (expandedChange)="handleExpandedChange($event)"
    >
      <ng-content></ng-content>
    </modus-wc-collapse>
  `,
})
export class ModusCollapseComponent {
  /** Indicates that the component should have a border */
  readonly bordered = input<boolean | undefined>(false);

  /** Custom CSS class to apply to the outer div */
  readonly className = input<string | undefined>();

  /** Controls whether the collapse is expanded or not */
  readonly expanded = input<boolean | undefined>(false);

  /** A unique identifier used to set the id attributes of various elements */
  readonly collapseId = input<string | undefined>();

  /** Configuration options for rendering the pre-laid out collapse component */
  readonly options = input<ICollapseOptions | undefined>();

  /** The ARIA label for the collapse */
  readonly ariaLabel = input<string | undefined>();

  /**
   * Event emitted when the expanded prop is internally changed.
   * Emits an object with `expanded` (boolean) property.
   */
  readonly expandedChange = output<{ expanded: boolean }>();

  /**
   * Handles expanded change events from the Modus Collapse Web Component
   *
   * @param event - The custom event from the collapse containing expanded state
   */
  handleExpandedChange(event: CustomEvent<{ expanded: boolean }>): void {
    this.expandedChange.emit(event.detail);
  }
}
