import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcSideNavigation } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusSideNavigationComponent}.
 */
export interface ModusSideNavigationProps {
  /** Whether the side navigation should collapse when clicking outside of it. */
  collapseOnClickOutside?: Components.ModusWcSideNavigation['collapseOnClickOutside'];
  /** Custom CSS class applied to the side navigation element. */
  className?: Components.ModusWcSideNavigation['customClass'];
  /** Whether the side navigation is expanded. */
  expanded?: Components.ModusWcSideNavigation['expanded'];
  /** Maximum width of the side navigation panel in an expanded state. */
  maxWidth?: Components.ModusWcSideNavigation['maxWidth'];
  /** Mode to make side navigation either overlay or push the content. */
  mode?: Components.ModusWcSideNavigation['mode'];
  /** Specify the selector for the page's content for which paddings and margins will be set. */
  targetContent?: Components.ModusWcSideNavigation['targetContent'];
}

/**
 * Angular wrapper for the Modus side navigation web component.
 *
 * Used for organizing primary navigation and content areas in an application.
 *
 * @example
 * ```html
 * <modus-side-navigation
 *   [expanded]="navExpanded()"
 *   mode="push"
 *   targetContent="#main-content"
 *   (expandedChange)="handleExpandedChange($event)"
 * >
 *   <nav-menu-items></nav-menu-items>
 * </modus-side-navigation>
 * ```
 */
@Component({
  selector: 'modus-side-navigation',
  imports: [CommonModule, ModusWcSideNavigation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-side-navigation
      [collapseOnClickOutside]="collapseOnClickOutside()"
      [attr.collapse-on-click-outside]="collapseOnClickOutside() ? '' : null"
      [customClass]="className()"
      [expanded]="expanded()"
      [attr.expanded]="expanded() ? '' : null"
      [maxWidth]="maxWidth()"
      [attr.max-width]="maxWidth()"
      [mode]="mode()"
      [attr.mode]="mode()"
      [targetContent]="targetContent()"
      [attr.target-content]="targetContent()"
      (expandedChange)="handleExpandedChange($event)"
    >
      <ng-content />
    </modus-wc-side-navigation>
  `,
})
export class ModusSideNavigationComponent {
  /** Whether the side navigation should collapse when clicking outside of it. */
  readonly collapseOnClickOutside = input<boolean>(true);

  /** Custom CSS class applied to the side navigation element. */
  readonly className = input<string | undefined>();

  /** Whether the side navigation is expanded. */
  readonly expanded = input<boolean>(false);

  /** Maximum width of the side navigation panel in an expanded state. */
  readonly maxWidth = input<string>('256px');

  /** Mode to make side navigation either overlay or push the content. */
  readonly mode = input<'overlay' | 'push' | undefined>('overlay');

  /** Specify the selector for the page's content for which paddings and margins will be set. */
  readonly targetContent = input<string>('');

  /** Emits when the expanded state changes (expanded/collapsed). */
  readonly expandedChange = output<boolean>();

  /** Handles expanded change events from the Modus Side Navigation Web Component. */
  handleExpandedChange(event: CustomEvent<boolean>): void {
    this.expandedChange.emit(event.detail);
  }
}
