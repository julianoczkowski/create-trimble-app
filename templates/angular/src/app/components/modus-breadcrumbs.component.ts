import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcBreadcrumbs } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IBreadcrumb, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusBreadcrumbsComponent}.
 */
export interface ModusBreadcrumbsProps {
  /** CSS class applied to the breadcrumbs host element. */
  className?: Components.ModusWcBreadcrumbs['customClass'];
  /** Items describing each breadcrumb entry. */
  items: IBreadcrumb[];
  /** Size token applied to the breadcrumb links. */
  size?: ModusSize;
}

/**
 * Angular wrapper for the Modus breadcrumbs web component.
 *
 * Use this component to render navigational breadcrumbs with Modus styling.
 * Each breadcrumb item can define text, href, icon, and click handlers.
 *
 * @example
 * ```html
 * <modus-breadcrumbs
 *   [items]="[
 *     { label: 'Home', href: '/' },
 *     { label: 'Library', href: '/library' },
 *     { label: 'Data', current: true }
 *   ]"
 * />
 * ```
 */
@Component({
  selector: 'modus-breadcrumbs',
  imports: [CommonModule, ModusWcBreadcrumbs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-breadcrumbs
      [customClass]="className()"
      [items]="items()"
      [size]="size()"
      (breadcrumbClick)="handleBreadcrumbClick($event)"
    />
  `,
})
export class ModusBreadcrumbsComponent {
  /** CSS class applied to the breadcrumbs host element. */
  readonly className = input<string | undefined>();

  /** Items describing each breadcrumb entry. */
  readonly items = input.required<IBreadcrumb[]>();

  /** Size token applied to the breadcrumb links. */
  readonly size = input<ModusSize | undefined>();

  /** Emits when a breadcrumb item is activated. */
  readonly breadcrumbClick = output<IBreadcrumb>();

  /** Handles the breadcrumb click event from the web component. */
  handleBreadcrumbClick(event: CustomEvent<IBreadcrumb>): void {
    this.breadcrumbClick.emit(event.detail);
  }
}
